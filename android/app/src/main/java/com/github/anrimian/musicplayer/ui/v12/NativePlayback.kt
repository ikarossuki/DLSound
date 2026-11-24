package com.github.anrimian.musicplayer.ui.v12

import android.content.Context
import android.content.res.ColorStateList
import android.graphics.Color
import android.os.Bundle
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.widget.*
import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.ui.learning.CueKind
import com.github.anrimian.musicplayer.ui.learning.RenderedCue
import kotlin.math.abs

internal class NativePlayback(private val ui:NativePlayerScreen,saved:Bundle?) {
    var tab = saved?.getString("native.tab") ?: if(ui.external) "lyrics" else "cover"
    private val tabs=listOf("info","cover","lyrics")
    private var seek:SeekBar?=null
    private var elapsed:TextView?=null
    private var durationLabel:TextView?=null
    private var toggle:ImageButton?=null
    private var practice:TextView?=null
    private var lyrics:NativeLyrics?=null
    private var scene:TextView?=null
    private var scenes:List<RenderedCue> = emptyList()
    private var dragging=false
    fun save(out:Bundle){out.putString("native.tab",tab)}
    fun clearViews(){seek=null; elapsed=null; durationLabel=null; toggle=null; practice=null; lyrics=null; scene=null; dragging=false}
    private fun change(next:String){if(next!=tab){tab=next;ui.render()}}
    fun show()=with(ui) {
        val track=transport.current
        val top=bar().apply { setPadding(dp(8),0,dp(8),0) }
        tool(top,R.drawable.dls_down,if(folderPlayer) "返回音频文件夹" else if(external) "返回文件管理器" else "收起播放器，返回曲库"){ if(!back()) host.finish() }
        top.addView(label(track?.title ?: "暂无播放",15,bold=true).apply { oneLine();gravity=Gravity.CENTER },lp(0,48,1f))
        tool(top,R.drawable.dls_more,"音轨操作") {
            if(track==null) return@tool
            if(external) go("track") else menu(track.title,listOf("本曲字幕" to {go("track")},
                library.favoriteTitle(track.metadata) to {act("favorite","id" to track.id)},"加入歌单" to {library.addToPlaylist(track.metadata)}))
        }
        body.addView(top,lp())
        val tools = bar().apply { setPadding(dp(8), 0, dp(8), 0) }
        fun shortcut(text: String, description: String, selected: Boolean = false, action: () -> Unit) =
            label(text, 13, if (selected) green else muted, selected).apply {
                gravity = Gravity.CENTER; oneLine(); contentDescription = description; isSelected = selected
                if (selected) paintFlags = paintFlags or android.graphics.Paint.UNDERLINE_TEXT_FLAG
                click(this, action = action)
            }
        val left = bar()
        left.addView(shortcut(settings.speedLabel(), "调整播放速度") { settings.speed() }, lp(0, 44, 1f))
        if (!external) left.addView(icon(R.drawable.dls_clock, "睡眠定时") { settings.sleep() }, lp(0, 44, 1f))
        else left.addView(Space(host), lp(0, 1, 1f))
        tools.addView(left, lp(0, 48, 1f))
        val middle = bar()
        tabs.zip(listOf("简介", "封面", "歌词")).forEach { (key, name) ->
            middle.addView(shortcut(name, name, key == tab) { change(key) }, lp(48, 48))
        }
        tools.addView(middle)
        val right = bar()
        if (tab == "lyrics") {
            val mode = prefs.text("language", "ja")
            val cycle = FrameLayout(host).apply {
                contentDescription = "字幕语言：" + settings.languageName()
                click(this) {
                    val choices = listOf("ja", "zh", "both"); pref("language", choices[(choices.indexOf(mode)+1)%3])
                }
            }
            val chip = label(mapOf("ja" to "日", "zh" to "中", "both" to "双")[mode] ?: "日", 12, green).apply {
                gravity = Gravity.CENTER; background = shape(accentSurface, 7)
            }
            cycle.addView(chip, FrameLayout.LayoutParams(dp(26), dp(26), Gravity.CENTER))
            right.addView(cycle, lp(0, 44, 1f))
            right.addView(icon(R.drawable.dls_sliders, "字幕显示") { go("display") }, lp(0, 44, 1f))
        }
        tools.addView(right, lp(0, 48, 1f))
        body.addView(tools, lp())
        val pager=SwipeBox(host) { step->change(tabs[(tabs.indexOf(tab)+step).coerceIn(0,2)]) }
        body.addView(pager,lp(-1,0,1f))
        val page=column()
        pager.addView(page,FrameLayout.LayoutParams(-1,-1))
        when(tab) {
            "cover" -> {
                val group=column().apply { gravity=Gravity.CENTER; setPadding(dp(24),dp(10),dp(24),dp(10)) }
                page.gravity=Gravity.CENTER; page.addView(group,lp(-1,-1))
                val image=ImageView(host)
                if(track!=null) cover(image,track.metadata,850) else image.setImageResource(R.drawable.dls_record_cover)
                val size=minOf(300,host.resources.configuration.screenWidthDp-60,(host.resources.configuration.screenHeightDp*.38).toInt()).coerceAtLeast(60)
                group.addView(image,lp(size,size))
                group.addView(label(track?.title ?: "还没有播放音轨",20,bold=true).apply {
                    gravity=Gravity.CENTER;setPadding(0,dp(24),0,dp(6));maxLines=2 },lp())
                group.addView(label(track?.artist.orEmpty(),13,muted).apply {gravity=Gravity.CENTER},lp())
            }
            "info" -> {
                val scroll=ScrollView(host);page.addView(scroll);val copy=column();scroll.addView(copy)
                copy.setPadding(dp(20), dp(20), dp(20), dp(16))
                val identity = bar()
                val image = ImageView(host)
                if (track != null) cover(image, track.metadata, 192)
                identity.addView(image, lp(64, 64))
                val names = column().apply {
                    setPadding(dp(14), 0, 0, 0)
                    addView(label(track?.title ?: "暂无音轨", 17, bold=true))
                    addView(label(track?.artist.orEmpty(), 12, muted).apply { setPadding(0,dp(4),0,0) })
                }
                identity.addView(names, lp(0,-2,1f)); copy.addView(identity)
                copy.addView(label(track?.comment.orEmpty().ifEmpty { "本地音频" }, 14).apply { setPadding(0, dp(20), 0, dp(20)) })
                for ((name, value) in listOf("专辑" to track?.album, "时长" to clock(transport.duration),
                    "来源" to track?.fileName, "字幕" to state.text("subtitleName").ifEmpty { state.text("subtitleStatus") })) {
                    val row = bar().apply { minimumHeight=dp(42) }
                    row.addView(label(name,12,muted),lp(56,-2))
                    row.addView(label(value.orEmpty().ifEmpty { "—" },12),lp(0,-2,1f))
                    copy.addView(row); divider(copy)
                }
            }
            else -> {
                val model=host.learning
                val hasLines=model.rendered.any { it.cue.kind==CueKind.DIALOGUE }
                if(hasLines && !model.audioFailed && !host.libraryAudioFailed) {
                    scenes=model.rendered.filter { it.cue.kind==CueKind.SCENE }
                    scene=label("",13,muted).apply { gravity=Gravity.CENTER; page.addView(this,lp()) }
                    val style=LyricStyle(prefs.text("language","ja"),prefs.optBoolean("ruby",true),
                        prefs.optInt("font",23),prefs.optDouble("rubyScale",.42).toFloat(),prefs.optBoolean("depth",true),
                        state.optBoolean("reducedMotion"),ink,color(if(dark) "#c9cdd0" else "#3e464b"),green,wash,paper)
                    lyrics=NativeLyrics(host,style,model.rendered,model.document?.id=="parallel",
                        {r->host.seekTo((r.cue.startMs+state.optLong("offset")).coerceIn(0,transport.duration.coerceAtLeast(0)))},
                        {r->host.correctReading(state.text("offsetKey"),r.cue.id)})
                    page.addView(lyrics,lp(-1,0,1f))
                } else {
                    val message = LyricPlaceholder.forState(model, host.libraryAudioFailed)
                    val scroll = ScrollView(host).apply { isFillViewport = true }
                    val block = column().apply { gravity = Gravity.CENTER; setPadding(dp(24),dp(12),dp(24),dp(12)) }
                    block.addView(label(message.title,18,bold=true).apply { gravity=Gravity.CENTER },lp())
                    if (message.detail.isNotBlank()) block.addView(label(message.detail,14,muted).apply {
                        gravity=Gravity.CENTER; setPadding(0,dp(8),0,dp(12))
                    },lp())
                    when (message.action) {
                        LyricRecovery.DIRECTORY -> block.addView(button("授权当前音乐文件夹", host::requestSubtitleDirectory, true),lp(-2,-2))
                        LyricRecovery.SUBTITLE -> block.addView(button(if (model.subtitleStatus == R.string.himitsu_subtitle_missing) "选择字幕" else "重新选择字幕", host::selectSubtitle, true),lp(-2,-2))
                        LyricRecovery.AUDIO -> block.addView(button("重新选择音频", {
                            if (folderPlayer) { if (!back()) host.finish() }
                            else if (external) host.chooseIncomingAudio() else selectSection("folders")
                        }, true),lp(-2,-2))
                        null -> Unit
                    }
                    scroll.addView(block); page.addView(scroll,lp(-1,0,1f))
                }
                if(hasLines && state.optBoolean("readingBusy")) textBlock(page,"读音生成中")
                if(hasLines && state.optBoolean("readingFailed")) page.addView(button("自动读音失败，点此重试",{pref("ruby",true)}))
            }
        }
        seek=slider("播放进度",{ drag,ms->dragging=drag; elapsed?.text=clock(ms) }) { ms->host.seekTo(ms) }
        val transportPanel = column().apply { setPadding(dp(22),0,dp(22),dp(2)) }
        seek?.setPadding(dp(6), 0, dp(6), 0)
        transportPanel.addView(seek,lp(-1,48))
        val times=bar()
        elapsed=label("",11,muted);durationLabel=label("",11,muted)
        times.addView(elapsed);practice=button("复听与书签",{ if(track!=null) go("practice") }).apply {textSize=13f;minHeight=dp(28)}
        times.addView(practice,lp(0,28,1f));times.addView(durationLabel);transportPanel.addView(times,lp())
        val controls=bar().apply { gravity=Gravity.CENTER }
        fun transport(symbol:Int,name:String,enabled:Boolean=true,action:()->Unit) {
            val b=icon(symbol,name,action).apply {isEnabled=enabled;alpha=if(enabled) 1f else .36f}
            if (controls.childCount > 0) controls.addView(Space(host), if (external) lp(30,1) else lp(0,1,1f))
            controls.addView(b,lp(44,46))
        }
        if(!external) transport(if(prefs.optBoolean("shuffle")) R.drawable.dls_shuffle else R.drawable.dls_repeat,settings.orderName()){settings.order()}
        if(!external || folderPlayer) transport(R.drawable.dls_previous,"上一首",track!=null && (!folderPlayer || state.optBoolean("folderCanPrevious"))){host.skipTrack(true)}
        toggle=icon(R.drawable.dls_play,"播放"){host.togglePlayback()}.apply {
            imageTintList=ColorStateList.valueOf(Color.WHITE);setPadding(dp(15),dp(15),dp(15),dp(15)); scaleType=ImageView.ScaleType.FIT_CENTER
            click(this,green,32){host.togglePlayback()};isEnabled=track!=null
        }
        if (controls.childCount > 0) controls.addView(Space(host), if (external) lp(30,1) else lp(0,1,1f))
        controls.addView(toggle,lp(56,56))
        if(!external || folderPlayer) transport(R.drawable.dls_next,"下一首",track!=null && (!folderPlayer || state.optBoolean("folderCanNext"))){host.skipTrack(false)}
        if(!external) transport(R.drawable.dls_queue,"打开播放队列"){go("queue")}
        transportPanel.addView(controls,lp(-1,74)); body.addView(transportPanel,lp()); tick()
    }
    fun slider(title:String,preview:(Boolean,Long)->Unit,commit:(Long)->Unit) = SeekBar(ui.host).apply {
        max=10000;contentDescription=title;progressTintList=ColorStateList.valueOf(ui.green);thumbTintList=ColorStateList.valueOf(ui.green)
        val rail = ui.shape(ui.line, 2)
        val fill = android.graphics.drawable.ClipDrawable(ui.shape(ui.green, 2), Gravity.START, android.graphics.drawable.ClipDrawable.HORIZONTAL)
        progressDrawable = android.graphics.drawable.LayerDrawable(arrayOf(rail, fill)).apply {
            setId(0, android.R.id.background); setId(1, android.R.id.progress)
            for (i in 0..1) { setLayerHeight(i, ui.dp(3)); setLayerGravity(i, Gravity.FILL_HORIZONTAL or Gravity.CENTER_VERTICAL) }
        }
        thumb = ui.shape(ui.green, 6).apply { setSize(ui.dp(12), ui.dp(12)) }
        splitTrack = false
        fun position(value:Int)=value.toLong()*ui.transport.duration/max
        setOnSeekBarChangeListener(object:SeekBar.OnSeekBarChangeListener {
            private var tracking = false

            override fun onStartTrackingTouch(s: SeekBar) {
                tracking = true
                preview(true, position(s.progress))
            }
            override fun onProgressChanged(s:SeekBar,v:Int,user:Boolean) {
                if (!user) return
                val at = position(v)
                preview(tracking, at)
                if (!tracking) commit(at)
            }
            override fun onStopTrackingTouch(s: SeekBar) {
                tracking = false
                val value = position(s.progress)
                preview(false, value)
                commit(value)
            }
        })
    }
    private fun TextView.setIfChanged(next: String) {
        if (text != next) text = next
    }
    fun tick()=with(ui) {
        if(seek==null) return@with
        val time=transport.position;val duration=transport.duration;val offset=state.optLong("offset")
        if (!dragging) {
            elapsed?.setIfChanged(clock(time))
            seek?.progress = (time * 10000 / duration.coerceAtLeast(1)).toInt()
        }
        durationLabel?.setIfChanged(clock(duration))
        val playing=transport.playing
        toggle?.let { if(it.tag!=playing) {it.tag=playing;it.contentDescription=if(playing) "暂停" else "播放"
            it.setImageResource(if(playing) R.drawable.dls_pause else R.drawable.dls_play_solid)} }
        practice?.setIfChanged(if (state.optJSONObject("listenRange") != null) "复听中 · 管理" else "复听与书签")
        lyrics?.time(time,offset,duration)
        scene?.let { view->
            val text=scenes.filter { it.cue.activeAt(time-offset,duration) }.joinToString(" · ") { row->
                when(prefs.text("language")) { "zh"->row.cue.chinese.orEmpty(); "both"->listOfNotNull(row.cue.japaneseText,row.cue.chinese).filter(String::isNotEmpty).joinToString(" / ");else->row.cue.japaneseText }
            };view.setIfChanged(text);view.visibility=if(text.isEmpty()) View.GONE else View.VISIBLE
        }
    }
}
private class SwipeBox(context:Context,val swipe:(Int)->Unit):FrameLayout(context) {
    private var downX=0f;private var downY=0f
    override fun dispatchTouchEvent(e:MotionEvent):Boolean {
        if(e.actionMasked==MotionEvent.ACTION_DOWN){downX=e.x;downY=e.y}
        if(e.actionMasked==MotionEvent.ACTION_UP && abs(e.x-downX)>64*resources.displayMetrics.density && abs(e.x-downX)>abs(e.y-downY)*1.5f) {
            val cancelled=MotionEvent.obtain(e);cancelled.action=MotionEvent.ACTION_CANCEL;super.dispatchTouchEvent(cancelled);cancelled.recycle()
            swipe(if(e.x<downX) 1 else -1);return true
        }
        return super.dispatchTouchEvent(e)
    }
    override fun onTouchEvent(e:MotionEvent)=true
}
