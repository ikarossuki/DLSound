package com.github.anrimian.musicplayer.ui.v12

import android.app.Dialog
import android.content.res.ColorStateList
import android.graphics.drawable.ColorDrawable
import android.view.WindowManager
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.graphics.drawable.RippleDrawable
import android.text.TextUtils
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.recyclerview.widget.RecyclerView
import com.github.anrimian.musicplayer.R
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import kotlin.math.roundToInt

internal data class NativeRow(
    val title: String, val detail: String = "", val icon: Int = 0, val meta: String = "",
    val extraIcon: Int = 0, val extraLabel: String = "", val active: Boolean = false,
    val extra: (() -> Unit)? = null, val trackId:String = "", val identity:String = "",
    val number: Int = 0, val chevron: Boolean = false, val profile: Boolean = false,
    val artwork: org.json.JSONObject? = null, val open: () -> Unit = {}
)

internal open class NativeWidgets(val host: PlayerV12Activity) {
    val dark get() = when (host.state.optJSONObject("prefs")?.text("theme")) {
        "dark" -> true; "light" -> false; else -> host.state.optBoolean("systemDark")
    }
    val paper get() = color(if (dark) "#151719" else "#ffffff")
    val ink get() = color(if (dark) "#edf0f2" else "#202427")
    val muted get() = color(if (dark) "#a0a7ad" else "#656c72")
    val green get() = color(if (dark) "#46d994" else "#00884e")
    val wash get() = color(if (dark) "#282d2a" else "#eef4f0")
    val line get() = color(if (dark) "#2c3034" else "#e9ebed")
    val accentSurface get() = color(if (dark) "#26342d" else "#eef5f1")
    val secondary get() = color(if (dark) "#1d2023" else "#f4f5f6")
    fun color(hex: String) = Color.parseColor(hex)
    fun dp(value: Int) = (host.resources.displayMetrics.density * value).roundToInt()
    fun lp(w: Int = -1, h: Int = -2, weight: Float = 0f) = LinearLayout.LayoutParams(if(w<0) w else dp(w),if(h<0) h else dp(h),weight)
    fun column() = LinearLayout(host).apply { orientation = LinearLayout.VERTICAL }
    fun bar() = LinearLayout(host).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL }
    fun shape(fill: Int, radius: Int = 0) = GradientDrawable().apply { setColor(fill); cornerRadius = dp(radius).toFloat() }
    fun click(view: View, fill: Int = Color.TRANSPARENT, radius: Int = 0, action: () -> Unit) {
        view.background = RippleDrawable(ColorStateList.valueOf(if (dark) 0x36ffffff else 0x17000000),shape(fill,radius),shape(Color.WHITE,radius))
        view.isFocusable = true
        view.setOnClickListener { action() }
    }
    fun label(value: String, size: Int = 15, tint: Int = ink, bold: Boolean = false) = TextView(host).apply {
        text = value; textSize = size.toFloat(); setTextColor(tint); includeFontPadding = false
        if (bold) typeface = Typeface.create("sans-serif-medium",Typeface.NORMAL)
        gravity = Gravity.CENTER_VERTICAL
    }
    fun TextView.oneLine() { isSingleLine = true; ellipsize = TextUtils.TruncateAt.END }
    fun icon(symbol: Int, description: String, action: () -> Unit) = ImageButton(host).apply {
        setImageResource(symbol); imageTintList = ColorStateList.valueOf(ink)
        contentDescription = description; setPadding(0, 0, 0, 0); scaleType = ImageView.ScaleType.CENTER
        click(this,action = action)
    }
    fun button(title: String, action: () -> Unit, primary: Boolean = false) = label(title,15,if (primary) Color.WHITE else ink,true).apply {
        gravity = Gravity.CENTER; minHeight = dp(46); setPadding(dp(9),dp(5),dp(9),dp(5))
        click(this,if(primary) color("#00884e") else Color.TRANSPARENT,6,action)
    }
    fun divider(parent: LinearLayout) {
        parent.addView(View(host).apply { setBackgroundColor(line) },LinearLayout.LayoutParams(-1,1))
    }
    fun glyph(symbol: Int, tint: Int = muted) = ImageView(host).apply {
        setImageResource(symbol)
        imageTintList = ColorStateList.valueOf(tint)
        importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO
    }

    fun outline(view: View, action: () -> Unit) {
        val background = shape(paper, 6).apply { setStroke(dp(1), line) }
        view.background = RippleDrawable(ColorStateList.valueOf(0x18000000), background, null)
        view.isFocusable = true
        view.setOnClickListener { action() }
    }

    fun fieldStyle(field: EditText) = with(field) {
        background = shape(paper, 7).apply { setStroke(dp(1), line) }
        setTextColor(ink)
        setHintTextColor(muted)
        setPadding(dp(12), 0, dp(12), 0)
        textSize = 14f
    }

    fun choiceRow(title: String, value: String, action: () -> Unit) = bar().apply {
        minimumHeight = dp(50)
        addView(label(title, 14), lp(0, -2, 1f))
        addView(label(value, 14).apply { oneLine() })
        addView(glyph(R.drawable.dls_down), lp(20, 15))
        contentDescription = "$title，$value"
        click(this, action = action)
    }

    fun sheetDialog(panel: LinearLayout): Dialog {
        val theme = if (dark) android.R.style.Theme_Material_NoActionBar else android.R.style.Theme_Material_Light_NoActionBar
        val dialog = Dialog(host, theme)
        dialog.window?.apply {
            setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            clearFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND)
            setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.MATCH_PARENT)
            setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE)
            androidx.core.view.WindowCompat.setDecorFitsSystemWindows(this, false)
            androidx.core.view.WindowCompat.getInsetsController(this, decorView).apply {
                isAppearanceLightStatusBars = !dark
                isAppearanceLightNavigationBars = !dark
            }
            statusBarColor = Color.TRANSPARENT
            navigationBarColor = Color.TRANSPARENT
            if (android.os.Build.VERSION.SDK_INT >= 29) {
                isStatusBarContrastEnforced = false
                isNavigationBarContrastEnforced = false
            }
        }
        setSheetContent(dialog, panel)
        return dialog
    }

    fun setSheetContent(dialog: Dialog, panel: LinearLayout) {
        val container = FrameLayout(host)
        val shade = View(host).apply {
            setBackgroundColor(0x80000000.toInt()); setOnClickListener { dialog.dismiss() }
            importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO
        }
        container.addView(shade, FrameLayout.LayoutParams(-1,-1))
        panel.isClickable = true
        val width = minOf(host.resources.displayMetrics.widthPixels, dp(520))
        container.addView(panel, FrameLayout.LayoutParams(width,-2,Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL))
        androidx.core.view.ViewCompat.setOnApplyWindowInsetsListener(container) { view, insets ->
            val bars = insets.getInsets(androidx.core.view.WindowInsetsCompat.Type.systemBars() or
                androidx.core.view.WindowInsetsCompat.Type.ime() or androidx.core.view.WindowInsetsCompat.Type.displayCutout())
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            insets
        }
        dialog.setContentView(container)
    }

    fun sheetPanel(): LinearLayout = object : LinearLayout(host) {
        init {
            orientation = VERTICAL
            val radius = dp(16).toFloat()
            background = shape(paper).apply { cornerRadii = floatArrayOf(radius,radius,radius,radius,0f,0f,0f,0f) }
            setPadding(dp(18), dp(16), dp(18), dp(40))
        }
        override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
            val limit = (MeasureSpec.getSize(heightMeasureSpec) * .86f).toInt()
            super.onMeasure(widthMeasureSpec, MeasureSpec.makeMeasureSpec(limit, MeasureSpec.AT_MOST))
        }
    }

    fun sheetHeading(panel: LinearLayout, title: String, closeLabel: String, close: () -> Unit): TextView {
        val top = bar()
        val heading = label(title, 17, bold = true).apply { oneLine() }
        top.addView(heading, lp(0, -2, 1f))
        top.addView(icon(R.drawable.dls_close, closeLabel, close), lp(44, 44))
        panel.addView(top, lp())
        return heading
    }

    private fun optionsSheet(title: String, labels: List<String>, selected: Int?, onPick: (Int) -> Unit) {
        if (labels.isEmpty()) return
        val panel = sheetPanel()
        val dialog = sheetDialog(panel)
        sheetHeading(panel, title, "关闭面板") { dialog.dismiss() }
        val options = column().apply { setPadding(0, dp(10), 0, dp(4)) }
        val scroll = ScrollView(host)
        scroll.addView(options)
        panel.addView(scroll, lp())
        labels.forEachIndexed { index, name ->
            val row = bar().apply { minimumHeight = dp(48); setPadding(dp(12), 0, dp(8), 0) }
            val symbol = when (name) {
                "作品库" -> R.drawable.dls_library
                "手选音频文件夹" -> R.drawable.dls_folder
                "加入歌单", "加入播放队列" -> R.drawable.dls_queue
                "收藏音轨", "取消收藏" -> R.drawable.dls_heart
                "本曲字幕" -> R.drawable.dls_book
                else -> 0
            }
            if (selected == null && symbol != 0) {
                row.addView(glyph(symbol, ink), lp(17, 17))
                row.addView(Space(host), lp(10, 1))
            }
            row.addView(label(name, 14), lp(0, -2, 1f))
            if (selected != null) {
                val dot = View(host).apply {
                    background = shape(if (selected == index) green else paper, 10).apply {
                        setStroke(dp(1), if (selected == index) green else muted)
                    }
                }
                row.addView(dot, lp(16, 16))
                row.isSelected = index == selected
            }
            row.contentDescription = name
            click(row) { dialog.dismiss(); onPick(index) }
            options.addView(row, lp())
            if (selected != null) divider(options)
        }
        dialog.show()
    }

    fun menu(title: String, options: List<Pair<String, () -> Unit>>) {
        optionsSheet(title, options.map { it.first }, null) { options[it].second() }
    }
    fun choose(title: String, labels: List<String>, selected: Int, action: (Int) -> Unit) {
        optionsSheet(title, labels, selected, action)
    }
    fun confirm(title: String, detail: String, action:()->Unit) {
        MaterialAlertDialogBuilder(host.dialogContext()).setTitle(title).setMessage(detail)
            .setPositiveButton("确认") { _,_ -> action() }.setNegativeButton("取消",null).show()
    }
    fun input(title: String, value: String, commit:(String)->Boolean) {
        val field = EditText(host.dialogContext()).apply { isSingleLine = true; setText(value); selectAll(); hint=title }
        val wrap = column().apply { setPadding(dp(22),dp(8),dp(22),0); addView(field) }
        val dialog = MaterialAlertDialogBuilder(host.dialogContext()).setTitle(title).setView(wrap)
            .setNegativeButton("取消",null).setPositiveButton("保存",null).create()
        dialog.setOnShowListener { dialog.getButton(-1).setOnClickListener {
            val name = field.text.toString().trim()
            if(name.isEmpty()) field.error = "请填写名称" else if(commit(name)) dialog.dismiss()
        } }
        dialog.show()
    }
}

internal class NativeRows(private val ui: NativeWidgets) : RecyclerView.Adapter<NativeRows.Holder>() {
    var rows: List<NativeRow> = emptyList()
        private set
    class Holder(val body: LinearLayout, val main: LinearLayout, val glyph: ImageView, val number: TextView,
                 val name: TextView, val detail: TextView, val meta: TextView, val chevron: ImageView,
                 val more: ImageButton, val sort: TextView, val rule: View) : RecyclerView.ViewHolder(body)
    fun replace(next: List<NativeRow>) { rows = next; notifyDataSetChanged() }
    fun highlight(id:String?) {
        val changes=rows.indices.filter { i -> val row=rows[i];row.trackId.isNotEmpty() && row.active!=(row.trackId==id) }
        if(changes.isEmpty()) return
        val next=rows.toMutableList()
        for(i in changes) next[i]=next[i].copy(active=next[i].trackId==id, icon=if(next[i].trackId==id) R.drawable.dls_volume else 0)
        rows=next
        changes.forEach(::notifyItemChanged)
    }
    fun updateQueue(next:List<NativeRow>) {
        val old=rows
        val diff=androidx.recyclerview.widget.DiffUtil.calculateDiff(object:androidx.recyclerview.widget.DiffUtil.Callback(){
            override fun getOldListSize()=old.size
            override fun getNewListSize()=next.size
            override fun areItemsTheSame(a:Int,b:Int)=old[a].identity==next[b].identity
            override fun areContentsTheSame(a:Int,b:Int)=old[a].active==next[b].active && old[a].title==next[b].title && old[a].detail==next[b].detail && old[a].number==next[b].number
        })
        rows=next;diff.dispatchUpdatesTo(this)
    }
    fun move(from:Int,to:Int) {
        val next=rows.toMutableList(); val item=next.removeAt(from); next.add(to,item); rows=next; notifyItemMoved(from,to)
    }
    override fun getItemCount() = rows.size
    override fun onCreateViewHolder(parent: ViewGroup, type: Int): Holder = with(ui) {
        val body = column().apply {
            layoutParams = RecyclerView.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        }
        val row = bar()
        val main = bar()
        val glyph = ImageView(host).apply { importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO }
        main.addView(glyph, lp(21, 21))
        val number = label("", 13, muted).apply { gravity = Gravity.CENTER }
        main.addView(number, lp(22, -2))
        val copy = column()
        val name = label("", 15, bold = true).apply { oneLine() }
        val detail = label("", 12, muted).apply { setPadding(0, dp(2), 0, 0) }
        copy.addView(name); copy.addView(detail)
        main.addView(copy, lp(0, -2, 1f))
        val meta = label("", 12, muted).apply { oneLine(); setPadding(dp(5), 0, 0, 0) }
        main.addView(meta)
        val chevron = glyph(R.drawable.dls_right)
        main.addView(chevron, lp(14, 14).apply { marginStart = dp(14) })
        row.addView(main, lp(0, -2, 1f))
        val more = icon(R.drawable.dls_horizontal_more, "更多操作") {}
        row.addView(more, lp(44, 46))
        val sort = label("排序",14).apply { gravity=Gravity.CENTER }
        row.addView(sort, lp(-2,46))
        body.addView(row, lp()); divider(body)
        Holder(body, main, glyph, number, name, detail, meta, chevron, more, sort, body.getChildAt(1))
    }

    override fun onBindViewHolder(holder: Holder, position: Int) = with(ui) {
        val row = rows[position]
        val queue = row.identity.isNotEmpty()
        val visibleIcon = row.icon != 0 || row.artwork != null
        val albumTile = row.artwork != null || row.icon in setOf(R.drawable.dls_heart, R.drawable.dls_record_cover)
        val showNumber = row.number > 0 && !visibleIcon
        holder.main.minimumHeight = dp(when {
            queue -> 58
            albumTile -> 66
            row.profile && row.detail.isNotEmpty() -> 59
            row.profile -> 50
            row.trackId.isNotEmpty() -> 54
            else -> 48
        })
        holder.main.setPadding(0, dp(if (row.profile) 8 else 5), 0, dp(if (row.profile) 8 else 5))
        holder.name.text = row.title
        holder.name.textSize = if (queue) 13f else 15f
        holder.name.setTextColor(if (row.active) green else ink)
        holder.detail.text = row.detail
        holder.detail.maxLines = if (row.profile) 3 else 1
        holder.detail.ellipsize = TextUtils.TruncateAt.END
        holder.detail.textSize = if (queue) 11f else 12f
        holder.detail.visibility = if (row.detail.isEmpty()) View.GONE else View.VISIBLE
        holder.meta.text = row.meta
        holder.number.text = if (queue) row.number.toString().padStart(2, '0') else row.number.toString()
        holder.number.visibility = if (showNumber) View.VISIBLE else View.GONE
        holder.glyph.visibility = if (visibleIcon) View.VISIBLE else View.GONE
        holder.glyph.tag = null
        holder.glyph.background=null
        holder.glyph.scaleType=ImageView.ScaleType.FIT_CENTER
        holder.glyph.setPadding(0,0,0,0)
        holder.glyph.clipToOutline = false
        holder.glyph.imageTintList = null
        val glyphSize = if (albumTile) 44 else 21
        holder.glyph.layoutParams = lp(glyphSize, glyphSize).apply { marginEnd = dp(when { queue -> 9; row.profile -> 14; else -> 13 }) }
        holder.number.layoutParams = lp(22, -2).apply { marginEnd = dp(if (queue) 9 else 12) }
        if (row.artwork != null && ui is NativePlayerScreen) ui.cover(holder.glyph, row.artwork, 128)
        else if (row.icon != 0) {
            holder.glyph.setImageResource(row.icon)
            if (row.icon == R.drawable.dls_heart) {
                holder.glyph.background=shape(accentSurface,5)
                holder.glyph.setPadding(dp(11),dp(11),dp(11),dp(11))
            }
            if (row.icon != R.drawable.dls_record_cover) holder.glyph.imageTintList =
                ColorStateList.valueOf(if (row.active || row.icon==R.drawable.dls_heart) green else muted)
        }
        holder.chevron.visibility = if (row.chevron || row.profile) View.VISIBLE else View.GONE
        holder.rule.visibility = if (row.profile) View.GONE else View.VISIBLE
        holder.main.contentDescription = listOf(row.title, row.detail, row.meta).filter(String::isNotEmpty).joinToString("，")
        click(holder.main, action = row.open)
        holder.more.visibility = if (row.extra == null) View.GONE else View.VISIBLE
        val isSort = row.extraIcon == R.drawable.dls_sort && row.extra != null
        holder.sort.visibility = if (isSort) View.VISIBLE else View.GONE
        if (isSort) click(holder.sort) { row.extra?.invoke() }
        holder.more.layoutParams = lp(if (isSort) 32 else 44, 46)
        if (row.extra != null) {
            holder.more.setImageResource(row.extraIcon)
            holder.more.contentDescription = row.extraLabel
            click(holder.more, action = row.extra)
        }
    }
}
