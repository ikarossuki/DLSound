package com.github.anrimian.musicplayer.ui.v12

import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.text.SpannableStringBuilder
import android.text.Spanned
import android.text.style.ReplacementSpan
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.github.anrimian.musicplayer.ui.learning.*
import kotlin.math.abs
import kotlin.math.ceil
import kotlin.math.roundToInt

/** Each annotated word is a single line-breaking unit. Both baselines are measured in the current font. */
internal class NativeRubySpan(private val reading: String, private val scale: Float) : ReplacementSpan() {
    private fun small(base: Paint) = Paint(base).apply {
        typeface = android.graphics.Typeface.create(base.typeface, android.graphics.Typeface.NORMAL)
        isFakeBoldText = false
        textSize = base.textSize * scale
    }
    override fun getSize(paint: Paint, text: CharSequence, start: Int, end: Int, fm: Paint.FontMetricsInt?): Int {
        val kana = small(paint)
        if (fm != null) {
            paint.getFontMetricsInt(fm)
            val extra = ceil(kana.descent() - kana.ascent() + paint.textSize * .06f).toInt()
            fm.ascent -= extra; fm.top -= extra
        }
        return ceil(maxOf(paint.measureText(text,start,end), kana.measureText(reading))).toInt()
    }
    override fun draw(canvas: Canvas, text: CharSequence, start: Int, end: Int, x: Float, top: Int, y: Int, bottom: Int, paint: Paint) {
        val kana = small(paint)
        val word = paint.measureText(text,start,end)
        val annotation = kana.measureText(reading)
        val width = maxOf(word,annotation)
        canvas.drawText(text,start,end,x + (width-word)/2,y.toFloat(),paint)
        canvas.drawText(reading,x + (width-annotation)/2,y + paint.ascent() - kana.descent() - paint.textSize*.06f,kana)
    }
}
internal fun rubyText(pieces: List<ReadingPiece>, show: Boolean, scale: Float): CharSequence =
    SpannableStringBuilder().apply {
        pieces.forEach { piece ->
            val start = length
            append(piece.text)
            if (show && !piece.reading.isNullOrBlank() && length > start)
                setSpan(NativeRubySpan(piece.reading,scale), start,length, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
        }
    }

internal data class LyricStyle(val language: String, val ruby: Boolean, val font: Int, val rubyScale: Float,
    val depth: Boolean, val reduced: Boolean, val ink: Int, val muted: Int, val accent: Int, val wash: Int, val surface: Int)

internal class NativeLyrics(context: Context, val style: LyricStyle, rendered: List<RenderedCue>, val parallel: Boolean,
    private val onSeek: (RenderedCue)->Unit, private val onCorrect: (RenderedCue)->Unit) : FrameLayout(context) {
    private val rows = rendered.filter { line -> line.cue.kind == CueKind.DIALOGUE && (!parallel ||
        style.language == "both" || if (style.language == "zh") !line.cue.chinese.isNullOrEmpty() else line.pieces.isNotEmpty()) }
    private val prefixEnd = LongArray(rows.size)
    private val followY get() = ((height - dp(12)) * .46f).roundToInt()
    private val layout = LinearLayoutManager(context)
    private val lyrics = RecyclerView(context)
    private val resume = Button(context, null, android.R.attr.borderlessButtonStyle)
    private val preview = TextView(context)
    private var active = emptySet<Int>()
    private var follow = true
    private var dragging = false
    private var lastFocus = -1
    private var offsetMs = 0L
    private val density = resources.displayMetrics.density
    private fun dp(v: Int) = (v*density).roundToInt()

    init {
        rows.forEachIndexed { i,row -> prefixEnd[i] = maxOf(if(i==0) 0 else prefixEnd[i-1], row.cue.endMs ?: Long.MAX_VALUE) }
        lyrics.layoutManager = layout; lyrics.adapter = Lines(); lyrics.itemAnimator = null
        lyrics.clipToPadding = false; lyrics.overScrollMode = View.OVER_SCROLL_NEVER
        addView(lyrics, LayoutParams(-1,-1).apply { bottomMargin = dp(12) })
        fun edge(size: Int, top: Boolean) {
            val transparent = style.surface and 0x00ffffff
            val colors = if (top) intArrayOf(style.surface,transparent) else intArrayOf(transparent,style.surface)
            val fade = View(context).apply {
                background = android.graphics.drawable.GradientDrawable(android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM, colors)
                importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO
            }
            addView(fade,LayoutParams(-1,dp(size), if (top) Gravity.TOP else Gravity.BOTTOM))
        }
        edge(30,true); edge(20,false)
        resume.apply { text="回到当前"; setTextColor(style.accent); textSize=13f; visibility=GONE
            setOnClickListener { follow=true; visibility=GONE; center(active.firstOrNull() ?: lastFocus,false) } }
        addView(resume,LayoutParams(-2,dp(40),Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL))
        preview.apply { setTextColor(style.accent); setBackgroundColor(style.wash); setPadding(dp(8),dp(3),dp(8),dp(3)); visibility=GONE }
        addView(preview,LayoutParams(-2,-2,Gravity.END or Gravity.CENTER_VERTICAL))
        lyrics.addOnScrollListener(object: RecyclerView.OnScrollListener() {
            override fun onScrollStateChanged(rv: RecyclerView, state: Int) {
                if (state == RecyclerView.SCROLL_STATE_DRAGGING) {
                    follow=false; dragging=true; resume.visibility=VISIBLE
                }
            }
            override fun onScrolled(rv: RecyclerView, dx: Int, dy: Int) { paintDistance() }
        })
        lyrics.addOnItemTouchListener(object: RecyclerView.SimpleOnItemTouchListener() {
            override fun onInterceptTouchEvent(rv: RecyclerView,e: MotionEvent): Boolean {
                if (e.actionMasked==MotionEvent.ACTION_UP || e.actionMasked==MotionEvent.ACTION_CANCEL) {
                    dragging=false; preview.visibility=GONE
                }
                return false
            }
        })
    }
    override fun onSizeChanged(w: Int,h: Int,oldw: Int,oldh: Int) {
        super.onSizeChanged(w,h,oldw,oldh)
        lyrics.setPadding(0,(h/2-dp(38)).coerceAtLeast(0),0,(h/2-dp(38)).coerceAtLeast(0))
        if (follow) post { center(active.firstOrNull() ?: 0,false) }
    }
    private fun paintDistance() {
        val middle=followY.toFloat()
        for (i in 0 until lyrics.childCount) {
            val child=lyrics.getChildAt(i)
            val d=((child.top+child.height/2f-middle)/maxOf(dp(110).toFloat(),height*.42f)).coerceIn(-1f,1f)
            val distance=abs(d)
            child.scaleX=if(style.depth && !style.reduced) 1f-distance*.10f else 1f
            child.scaleY=child.scaleX
            child.rotationX=if(style.depth && !style.reduced) d * -9f else 0f
            child.alpha=if(style.depth && !style.reduced) 1f-distance*.32f else 1f
            if (dragging && height/2 in child.top..child.bottom) {
                rows.getOrNull(lyrics.getChildAdapterPosition(child))?.let {
                    preview.text=clock(it.cue.startMs+offsetMs); preview.visibility=VISIBLE
                }
            }
        }
    }
    private fun center(index:Int, smooth:Boolean) {
        if(index !in rows.indices || height==0) return
        val child=layout.findViewByPosition(index)
        if(child==null) {
            layout.scrollToPositionWithOffset(index,0)
            lyrics.post { layout.findViewByPosition(index)?.let { lyrics.scrollBy(0,it.top + it.height/2 - followY) }; paintDistance() }
        } else {
            val dy=child.top+child.height/2-followY
            if(smooth && !style.reduced) lyrics.smoothScrollBy(0,dy) else lyrics.scrollBy(0,dy)
        }
    }
    fun time(position:Long,offset:Long,duration:Long) {
        offsetMs=offset
        val at=position-offset
        var low=0; var high=rows.size
        while(low<high) { val mid=(low+high) ushr 1; if(rows[mid].cue.startMs<=at) low=mid+1 else high=mid }
        val now=mutableListOf<Int>()
        var cursor=low-1
        while(cursor>=0 && prefixEnd[cursor]>at) {
            if(rows[cursor].cue.activeAt(at,duration.takeIf { it>0 } ?: Long.MAX_VALUE)) now+=cursor
            cursor--
        }
        val next=now.asReversed().toSet()
        if(next==active) return
        val previous=active
        active=next
        for (i in previous+next) if ((i in previous)!=(i in next)) lyrics.adapter?.notifyItemChanged(i)
        val focus=next.firstOrNull() ?: return
        if(follow && focus!=lastFocus) center(focus,lastFocus>=0)
        lastFocus=focus
    }
    private class Holder(val box: LinearLayout,val ja: TextView,val zh: TextView):RecyclerView.ViewHolder(box)
    private inner class Lines : RecyclerView.Adapter<Holder>() {
        override fun getItemCount()=rows.size
        override fun onCreateViewHolder(parent:ViewGroup,type:Int):Holder {
            val box=LinearLayout(context).apply {
                layoutParams = RecyclerView.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
                orientation=LinearLayout.VERTICAL; gravity=Gravity.CENTER
                setPadding(dp(20),dp(12),dp(20),dp(12)); minimumHeight=dp(64); isFocusable=true }
            fun line()=TextView(context).apply {
                breakStrategy=android.graphics.text.LineBreaker.BREAK_STRATEGY_SIMPLE
                hyphenationFrequency=android.text.Layout.HYPHENATION_FREQUENCY_NONE
                gravity=Gravity.CENTER; includeFontPadding=true; setLineSpacing(dp(2).toFloat(),1f)
                importantForAccessibility=View.IMPORTANT_FOR_ACCESSIBILITY_NO }
            val ja=line(); val zh=line()
            box.addView(ja,LinearLayout.LayoutParams(-1,-2)); box.addView(zh,LinearLayout.LayoutParams(-1,-2))
            return Holder(box,ja,zh)
        }
        override fun onBindViewHolder(h:Holder,i:Int) {
            val entry=rows[i]; val cue=entry.cue
            val jp=entry.pieces.isNotEmpty()
            val jaVisible=(cue.unlabelledText || style.language!="zh") && (!parallel || jp)
            val zhVisible=!cue.unlabelledText && style.language!="ja" && (!parallel || !cue.chinese.isNullOrBlank())
            h.ja.visibility=if(jaVisible) VISIBLE else GONE; h.zh.visibility=if(zhVisible) VISIBLE else GONE
            h.ja.textSize=style.font.toFloat(); h.zh.textSize=if(style.language=="zh") style.font.toFloat() else style.font*.85f
            h.ja.text=if(jp) rubyText(entry.pieces,style.ruby,style.rubyScale) else "暂无日文"
            h.zh.text=cue.chinese ?: "暂无中文翻译"
            val current=i in active
            val face = if (current) android.graphics.Typeface.DEFAULT_BOLD else android.graphics.Typeface.DEFAULT
            h.ja.typeface = face; h.zh.typeface = face
            h.zh.setPadding(0, if (jaVisible) dp(5) else 0, 0, 0)
            if (current) {
                val marker = android.graphics.drawable.GradientDrawable().apply {
                    setColor(style.accent); cornerRadius = dp(2).toFloat()
                }
                h.box.background = android.graphics.drawable.LayerDrawable(arrayOf(
                    android.graphics.drawable.ColorDrawable(style.wash), marker
                )).apply {
                    setLayerSize(1, dp(3), dp(20))
                    setLayerInsetLeft(1, dp(7))
                    setLayerGravity(1, Gravity.LEFT or Gravity.CENTER_VERTICAL)
                }
            } else h.box.setBackgroundColor(android.graphics.Color.TRANSPARENT)
            h.ja.setTextColor(if(current) style.ink else style.muted); h.zh.setTextColor(if(current) style.ink else style.muted)
            h.box.contentDescription=listOfNotNull(if(current) "当前台词" else null,if(jaVisible) entry.pieces.joinToString("") { p ->
                if(style.ruby && !p.reading.isNullOrBlank()) p.text+"（"+p.reading+"）" else p.text } else null,
                if(zhVisible) h.zh.text.toString() else null).joinToString("，")
            h.box.setOnClickListener { follow=true; resume.visibility=GONE; onSeek(entry); center(i,true) }
            h.box.setOnLongClickListener { onCorrect(entry); true }
        }
    }
}
