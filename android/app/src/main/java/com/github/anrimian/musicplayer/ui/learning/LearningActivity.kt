package com.github.anrimian.musicplayer.ui.learning

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.res.Configuration
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.text.InputType
import android.text.TextUtils
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.*
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.graphics.ColorUtils
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.ui.common.activity.BaseAppCompatActivity
import com.github.anrimian.musicplayer.ui.main.MainActivity
import com.google.android.material.button.MaterialButton
import com.google.android.material.button.MaterialButtonToggleGroup
import com.google.android.material.checkbox.MaterialCheckBox
import com.google.android.material.color.DynamicColors
import com.google.android.material.color.MaterialColors
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.tabs.TabLayout
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject
import java.io.ByteArrayInputStream
import java.util.Locale

/** Native file/playback controls, with a local-only ruby renderer for the transcript. */
class LearningActivity : BaseAppCompatActivity() {
    private lateinit var model: LearningViewModel
    private lateinit var root: LinearLayout
    private lateinit var heading: TextView
    private lateinit var tabs: TabLayout
    private lateinit var browser: LinearLayout
    private lateinit var reader: LinearLayout
    private lateinit var folder: TextView
    private lateinit var empty: TextView
    private lateinit var list: ListView
    private lateinit var adapter: ArrayAdapter<String>
    private lateinit var up: MaterialButton
    private lateinit var modes: MaterialButtonToggleGroup
    private lateinit var kana: MaterialCheckBox
    private lateinit var subtitleStatus: TextView
    private lateinit var scene: TextView
    private lateinit var web: WebView
    private lateinit var title: TextView
    private lateinit var time: TextView
    private lateinit var seek: SeekBar
    private lateinit var play: MaterialButton
    private lateinit var previous: MaterialButton
    private lateinit var next: MaterialButton
    private var webReady = false
    private var sentRevision = -1
    private var sentOptions = ""
    private var latest = LearningState()
    private var shownFiles = emptyList<LearningFile>()
    private var noticeSequence = 0
    private var pickingForTrack: String? = null
    private var dragging = false
    private val modeIds = SubtitleMode.entries.associateWith { View.generateViewId() }
    private val compact: Boolean get() = resources.configuration.orientation == Configuration.ORIENTATION_LANDSCAPE

    private val folderPicker = registerForActivityResult(ActivityResultContracts.OpenDocumentTree()) { uri ->
        if (uri != null) {
            runCatching { contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION) }
                .onSuccess { model.chooseTree(uri) }
                .onFailure { model.notice(R.string.himitsu_directory_permission) }
        }
    }
    private val subtitlePicker = registerForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        val track = pickingForTrack
        pickingForTrack = null
        if (uri != null && track != null) {
            runCatching { contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION) }
            model.selectSubtitle(uri, track)
        }
    }
    private val notificationPermission = registerForActivityResult(ActivityResultContracts.RequestPermission()) { }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        DynamicColors.applyToActivityIfAvailable(this)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        model = ViewModelProvider(this)[LearningViewModel::class.java]
        pickingForTrack = savedInstanceState?.getString("subtitle-track")
        buildUi()
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                when {
                    latest.readerPage -> model.page(false)
                    latest.canGoUp -> model.up()
                    else -> { isEnabled = false; onBackPressedDispatcher.onBackPressed() }
                }
            }
        })
        lifecycleScope.launch { repeatOnLifecycle(Lifecycle.State.STARTED) { model.state.collect(::render) } }
        if (Build.VERSION.SDK_INT >= 33 && savedInstanceState == null) notificationPermission.launch(Manifest.permission.POST_NOTIFICATIONS)
    }

    private fun buildUi() {
        root = column().apply { setBackgroundColor(color(com.google.android.material.R.attr.colorSurface)) }
        setContentView(root)
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val safe = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout() or WindowInsetsCompat.Type.ime())
            view.setPadding(safe.left, safe.top, safe.right, safe.bottom)
            insets
        }
        val dark = ColorUtils.calculateLuminance(color(com.google.android.material.R.attr.colorSurface)) < .5
        WindowCompat.getInsetsController(window, root).apply { isAppearanceLightStatusBars = !dark; isAppearanceLightNavigationBars = !dark }
        root.addView(row().apply {
            heading = label(getString(R.string.himitsu_app_name), 22f).apply {
                setPadding(dp(16), 0, 0, 0)
                maxLines = 1
                ellipsize = TextUtils.TruncateAt.MIDDLE
            }
            addView(heading, LinearLayout.LayoutParams(0, dp(56), 1f))
            addView(button(R.string.himitsu_choose_folder) { folderPicker.launch(null) })
            addView(button(R.string.himitsu_more) { menu(it) })
        })
        tabs = TabLayout(this).apply {
            addTab(newTab().setText(R.string.himitsu_files)); addTab(newTab().setText(R.string.himitsu_captions))
            addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
                override fun onTabSelected(tab: TabLayout.Tab) { model.page(tab.position == 1) }
                override fun onTabUnselected(tab: TabLayout.Tab) { }
                override fun onTabReselected(tab: TabLayout.Tab) { }
            })
        }
        root.addView(tabs)
        val pages = FrameLayout(this)
        root.addView(pages, LinearLayout.LayoutParams(-1, 0, 1f))
        browser = column()
        pages.addView(browser, FrameLayout.LayoutParams(-1, -1))
        browser.addView(row().apply {
            up = button(R.string.himitsu_up) { model.up() }; addView(up)
            folder = label("", 14f).apply { maxLines = 2; ellipsize = TextUtils.TruncateAt.MIDDLE }
            addView(folder, LinearLayout.LayoutParams(0, -2, 1f))
        })
        val fileBody = FrameLayout(this)
        browser.addView(fileBody, LinearLayout.LayoutParams(-1, 0, 1f))
        empty = label("", 16f).apply { gravity = Gravity.CENTER; setPadding(dp(24), dp(24), dp(24), dp(24)) }
        fileBody.addView(empty, FrameLayout.LayoutParams(-1, -1))
        adapter = object : ArrayAdapter<String>(this, android.R.layout.simple_list_item_1) {
            override fun getView(position: Int, convertView: View?, parent: ViewGroup): View =
                (super.getView(position, convertView, parent) as TextView).apply {
                    minHeight = dp(64); maxLines = 2; ellipsize = TextUtils.TruncateAt.MIDDLE
                    setPadding(dp(20), dp(12), dp(20), dp(12)); setTextColor(color(com.google.android.material.R.attr.colorOnSurface))
                }
        }
        list = ListView(this).apply { adapter = this@LearningActivity.adapter; setOnItemClickListener { _, _, position, _ -> shownFiles.getOrNull(position)?.let(model::open) } }
        fileBody.addView(list, FrameLayout.LayoutParams(-1, -1))
        reader = column()
        pages.addView(reader, FrameLayout.LayoutParams(-1, -1))
        val readerTools = LinearLayout(this).apply {
            orientation = if (compact) LinearLayout.HORIZONTAL else LinearLayout.VERTICAL
        }
        reader.addView(readerTools)
        val controls = row().apply { setPadding(dp(12), dp(4), dp(12), 0) }
        modes = MaterialButtonToggleGroup(this).apply {
            isSingleSelection = true; isSelectionRequired = true
            listOf(SubtitleMode.CHINESE, SubtitleMode.JAPANESE, SubtitleMode.BILINGUAL).forEach { mode ->
                val label = when (mode) { SubtitleMode.CHINESE -> R.string.himitsu_zh; SubtitleMode.JAPANESE -> R.string.himitsu_ja; SubtitleMode.BILINGUAL -> R.string.himitsu_both }
                val description = when (mode) { SubtitleMode.CHINESE -> R.string.himitsu_zh_description; SubtitleMode.JAPANESE -> R.string.himitsu_ja_description; SubtitleMode.BILINGUAL -> R.string.himitsu_both_description }
                addView(MaterialButton(context, null, com.google.android.material.R.attr.materialButtonOutlinedStyle).apply {
                    id = modeIds.getValue(mode); setText(label); contentDescription = getString(description)
                    minWidth = dp(52); minimumWidth = dp(52); minHeight = dp(48)
                    setPaddingRelative(dp(8), 0, dp(8), 0)
                }, LinearLayout.LayoutParams(dp(56), dp(52)))
            }
            addOnButtonCheckedListener { _, id, checked -> if (checked) modeIds.entries.firstOrNull { it.value == id }?.let { model.mode(it.key) } }
        }
        controls.addView(modes)
        kana = MaterialCheckBox(this).apply { setText(R.string.himitsu_furigana); minHeight = dp(48); setOnCheckedChangeListener { _, checked -> if (checked != latest.furigana) model.furigana(checked) } }
        controls.addView(kana)
        controls.addView(button(R.string.himitsu_follow) { script("resumeFollow()") }.apply { contentDescription = getString(R.string.himitsu_follow_description) })
        readerTools.addView(HorizontalScrollView(this).apply {
            isHorizontalScrollBarEnabled = false
            addView(controls)
        }, LinearLayout.LayoutParams(if (compact) 0 else -1, -2, if (compact) 1f else 0f))
        readerTools.addView(row().apply {
            setPadding(dp(12), 0, dp(12), 0)
            addView(button(R.string.himitsu_captions) { chooseSubtitle() })
            addView(buttonText("A−", R.string.himitsu_smaller) { model.font(-2) })
            addView(buttonText("A+", R.string.himitsu_larger) { model.font(2) })
            subtitleStatus = label("", 12f).apply {
                maxLines = 2
                ellipsize = TextUtils.TruncateAt.END
                minHeight = dp(48)
                minWidth = dp(48)
                isFocusable = true
            }
            addView(subtitleStatus, LinearLayout.LayoutParams(0, -2, 1f))
        }, LinearLayout.LayoutParams(if (compact) 0 else -1, -2, if (compact) 1f else 0f))
        scene = label("", 14f).apply {
            setPadding(dp(24), dp(8), dp(24), dp(8))
            minHeight = dp(48)
            val collapsedLines = if (compact) 1 else 3
            maxLines = collapsedLines
            ellipsize = TextUtils.TruncateAt.END
            setOnClickListener { maxLines = if (maxLines == collapsedLines) 12 else collapsedLines }
        }
        reader.addView(scene)
        web = WebView(this)
        configureWebView()
        reader.addView(web, LinearLayout.LayoutParams(-1, 0, 1f))
        root.addView(column().apply {
            setPadding(dp(16), dp(4), dp(16), dp(4))
            title = label("", 16f).apply { maxLines = 1; ellipsize = TextUtils.TruncateAt.MIDDLE }
            if (!compact) addView(title)
            seek = SeekBar(context).apply {
                max = 1000; contentDescription = getString(R.string.himitsu_seek_label)
                setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
                    override fun onStartTrackingTouch(bar: SeekBar) { dragging = true }
                    override fun onProgressChanged(bar: SeekBar, progress: Int, fromUser: Boolean) {
                        if (fromUser) {
                            val position = latest.duration * progress / 1000
                            time.updateText("${formatTime(position)} / ${formatTime(latest.duration)}")
                            if (!dragging) model.seek(position)
                        }
                    }
                    override fun onStopTrackingTouch(bar: SeekBar) { model.seek(latest.duration * bar.progress / 1000); dragging = false }
                })
            }
            if (!compact) addView(seek, LinearLayout.LayoutParams(-1, dp(48)))
            addView(row().apply {
                time = label("", 12f)
                if (compact) {
                    addView(time)
                    addView(seek, LinearLayout.LayoutParams(0, dp(48), 1f))
                } else {
                    addView(time, LinearLayout.LayoutParams(0, -2, 1f))
                }
                previous = iconButton(android.R.drawable.ic_media_previous, R.string.himitsu_previous) { model.previous() }; addView(previous)
                play = iconButton(android.R.drawable.ic_media_play, R.string.himitsu_play) { model.playPause() }; addView(play)
                next = iconButton(android.R.drawable.ic_media_next, R.string.himitsu_next) { model.next() }; addView(next)
            })
        })
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebView() {
        if (applicationInfo.flags and android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE != 0) {
            WebView.setWebContentsDebuggingEnabled(true)
        }
        web.setBackgroundColor(color(com.google.android.material.R.attr.colorSurface))
        web.settings.apply {
            javaScriptEnabled = true; blockNetworkLoads = true; allowContentAccess = false; allowFileAccess = false
            domStorageEnabled = false; defaultTextEncodingName = "UTF-8"; textZoom = 100
        }
        web.addJavascriptInterface(object {
            @JavascriptInterface fun ready() = runOnUiThread { webReady = true; sentRevision = -1; sentOptions = ""; render(latest) }
            @JavascriptInterface fun seek(fingerprint: String, id: String) = runOnUiThread { model.seekCue(fingerprint, id) }
            @JavascriptInterface fun correct(fingerprint: String, id: String, index: Int) = runOnUiThread { editReading(fingerprint, id, index) }
        }, "Himitsu")
        web.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest) = true
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? {
                val path = request.url.toString()
                return if (path in setOf("${ASSETS}reader.html", "${ASSETS}reader.css", "${ASSETS}reader.js")) null
                else WebResourceResponse("text/plain", "UTF-8", ByteArrayInputStream(ByteArray(0)))
            }
        }
        web.loadUrl("${ASSETS}reader.html")
    }

    private fun render(state: LearningState) {
        latest = state
        tabs.visibility = if (compact && state.readerPage) View.GONE else View.VISIBLE
        heading.updateText(if (compact && state.readerPage) state.track?.name.orEmpty().ifEmpty { getString(R.string.himitsu_app_name) } else getString(R.string.himitsu_app_name))
        browser.visibility = if (state.readerPage) View.GONE else View.VISIBLE
        reader.visibility = if (state.readerPage) View.VISIBLE else View.GONE
        val tab = if (state.readerPage) 1 else 0
        if (tabs.selectedTabPosition != tab) tabs.getTabAt(tab)?.select()
        up.isEnabled = state.canGoUp && !state.browsing
        folder.updateText(state.folderLabel)
        if (shownFiles != state.files) {
            shownFiles = state.files; adapter.clear()
            adapter.addAll(shownFiles.map { if (it.directory) "${it.name}  /" else it.name }); adapter.notifyDataSetChanged()
        }
        list.visibility = if (state.files.isEmpty() || state.browsing) View.GONE else View.VISIBLE
        empty.visibility = if (list.visibility == View.GONE) View.VISIBLE else View.GONE
        empty.updateText(getString(if (state.browsing) R.string.himitsu_folder_loading else if (state.folder == null) R.string.himitsu_no_track else R.string.himitsu_folder_empty))
        if (modes.checkedButtonId != modeIds.getValue(state.mode)) modes.check(modeIds.getValue(state.mode))
        if (kana.isChecked != state.furigana) kana.isChecked = state.furigana
        title.updateText(state.track?.name.orEmpty())
        title.visibility = if (state.track == null) View.GONE else View.VISIBLE
        title.contentDescription = title.text
        if (play.isActivated != state.playing) {
            play.isActivated = state.playing
            play.setIconResource(if (state.playing) android.R.drawable.ic_media_pause else android.R.drawable.ic_media_play)
        }
        play.contentDescription = getString(if (state.playing) R.string.himitsu_pause else R.string.himitsu_play)
        play.isEnabled = state.track != null && !state.openingAudio
        previous.isEnabled = play.isEnabled; next.isEnabled = play.isEnabled
        seek.isEnabled = state.duration > 0 && !state.openingAudio
        if (!dragging) {
            seek.progress = if (state.duration > 0) (state.position * 1000 / state.duration).toInt() else 0
            time.updateText("${formatTime(state.position)} / ${formatTime(state.duration)}")
        }
        val status = when {
            state.openingAudio -> getString(R.string.himitsu_audio_loading)
            state.readingBusy -> getString(R.string.himitsu_reading_busy)
            state.readingFailed -> getString(R.string.himitsu_reading_failed)
            else -> getString(state.subtitleStatus) + if (state.document?.warningCount?.let { it > 0 } == true) " · " + getString(R.string.himitsu_warning_count, state.document.warningCount) else ""
        }
        subtitleStatus.updateText(status)
        subtitleStatus.contentDescription = getString(R.string.himitsu_subtitle_details, status)
        subtitleStatus.setOnClickListener { MaterialAlertDialogBuilder(this).setMessage(status + "\n" + state.subtitleName + "\n\n" + getString(R.string.himitsu_reading_hint)).setPositiveButton(android.R.string.ok, null).show() }
        val scenes = state.document?.cues.orEmpty().filter { it.kind == CueKind.SCENE && it.activeAt(state.position) }
        val sceneSeparator = if (compact) " · " else "\n"
        scene.updateText(scenes.joinToString(sceneSeparator) { cue -> listOfNotNull(cue.japaneseText.takeIf { state.mode.japanese && it.isNotEmpty() }, cue.chinese?.takeIf { state.mode.chinese }).joinToString(sceneSeparator) })
        scene.visibility = if (scene.text.isEmpty()) View.GONE else View.VISIBLE
        if (state.noticeSequence != noticeSequence) { noticeSequence = state.noticeSequence; if (state.notice != 0) Snackbar.make(root, state.notice, Snackbar.LENGTH_LONG).show() }
        if (!webReady) return
        val options = JSONObject().put("mode", state.mode.name).put("furigana", state.furigana)
            .put("fontSize", state.fontSize * resources.configuration.fontScale)
            .put("emptyMessage", getString(state.subtitleStatus))
            .put("labels", JSONObject().put("missingJapanese", getString(R.string.himitsu_missing_ja)).put("missingChinese", getString(R.string.himitsu_missing_zh)).put("seek", getString(R.string.himitsu_seek_label)))
            .put("colors", JSONObject().put("surface", hex(color(com.google.android.material.R.attr.colorSurface)))
                .put("ink", hex(color(com.google.android.material.R.attr.colorOnSurface)))
                .put("secondary", hex(color(com.google.android.material.R.attr.colorOnSurfaceVariant)))
                .put("active-surface", hex(color(com.google.android.material.R.attr.colorSecondaryContainer)))).toString()
        if (options != sentOptions) { sentOptions = options; script("setOptions($options)") }
        if (sentRevision != state.revision) {
            sentRevision = state.revision
            val cues = JSONArray()
            state.rendered.forEach { rendered ->
                val cue = rendered.cue
                cues.put(JSONObject().put("id", cue.id).put("kind", cue.kind.name).put("startMs", cue.startMs)
                    .put("endMs", cue.endMs ?: JSONObject.NULL).put("chinese", cue.chinese ?: "").put("unlabelledText", cue.unlabelledText)
                    .put("pieces", JSONArray().apply { rendered.pieces.forEach { put(JSONObject().put("text", it.text).put("reading", it.reading ?: JSONObject.NULL)) } }))
            }
            script("setDocument(${JSONObject().put("fingerprint", state.document?.fingerprint ?: "").put("cues", cues)})")
        }
        script("setPosition(${state.position},${state.duration})")
    }

    private fun chooseSubtitle() {
        val track = latest.track ?: return
        pickingForTrack = track.uri; subtitlePicker.launch(arrayOf("*/*"))
    }

    private fun menu(anchor: View) {
        PopupMenu(this, anchor).apply {
            listOf(R.string.himitsu_subtitle_choose, R.string.himitsu_subtitle_reset, R.string.himitsu_reading_edit, R.string.himitsu_original_player, R.string.himitsu_licenses).forEach { menu.add(0, it, 0, it) }
            setOnMenuItemClickListener {
                when (it.itemId) {
                    R.string.himitsu_subtitle_choose -> chooseSubtitle()
                    R.string.himitsu_subtitle_reset -> model.automaticSubtitle()
                    R.string.himitsu_reading_edit -> chooseReading()
                    R.string.himitsu_original_player -> startActivity(Intent(this@LearningActivity, MainActivity::class.java))
                    R.string.himitsu_licenses -> licenses()
                }; true
            }; show()
        }
    }

    private fun chooseReading() {
        val current = latest.rendered.filter { it.cue.kind == CueKind.DIALOGUE && it.cue.activeAt(latest.position) }
            .ifEmpty { latest.rendered.filter { it.cue.kind == CueKind.DIALOGUE }.sortedBy { kotlin.math.abs(it.cue.startMs - latest.position) }.take(1) }
        val choices = current.flatMap { rendered -> rendered.pieces.mapIndexedNotNull { index, piece -> if (containsKanji(piece.text)) Triple(rendered.cue.id, index, piece) else null } }
        if (choices.isEmpty()) { model.notice(R.string.himitsu_reading_none); return }
        val fingerprint = latest.document?.fingerprint ?: return
        MaterialAlertDialogBuilder(this).setTitle(R.string.himitsu_reading_edit)
            .setItems(choices.map { "${it.third.text}  ${it.third.reading.orEmpty()}" }.toTypedArray()) { _, which -> val item = choices[which]; editReading(fingerprint, item.first, item.second) }
            .setNegativeButton(R.string.himitsu_cancel, null).show()
    }

    private fun editReading(fingerprint: String, id: String, index: Int) {
        val trackUri = latest.track?.uri ?: return
        if (latest.document?.fingerprint != fingerprint) return
        val piece = latest.rendered.firstOrNull { it.cue.id == id }?.pieces?.getOrNull(index) ?: return
        val origin = when (piece.origin) { ReadingOrigin.SUBTITLE -> R.string.himitsu_reading_subtitle; ReadingOrigin.AUTOMATIC -> R.string.himitsu_reading_auto; ReadingOrigin.CORRECTION -> R.string.himitsu_reading_personal; ReadingOrigin.NONE -> R.string.himitsu_reading_unset }
        val field = TextInputLayout(this).apply { setPadding(dp(24), dp(8), dp(24), 0); hint = getString(R.string.himitsu_reading_input) }
        val input = TextInputEditText(field.context).apply { inputType = InputType.TYPE_CLASS_TEXT; setText(piece.reading.orEmpty()); selectAll() }; field.addView(input)
        val dialog = MaterialAlertDialogBuilder(this).setTitle(piece.text).setMessage(getString(origin)).setView(field)
            .setPositiveButton(R.string.himitsu_save, null).setNegativeButton(R.string.himitsu_cancel, null)
            .setNeutralButton(R.string.himitsu_reading_restore) { _, _ -> model.correct(trackUri, fingerprint, id, index, null, piece) }.create()
        dialog.setOnShowListener { dialog.getButton(androidx.appcompat.app.AlertDialog.BUTTON_POSITIVE).setOnClickListener {
            val reading = input.text.toString().trim()
            if (!validReading(reading)) field.error = getString(R.string.himitsu_invalid_reading)
            else { model.correct(trackUri, fingerprint, id, index, reading, piece); dialog.dismiss() }
        } }
        dialog.show()
    }

    private fun licenses() {
        val texts = listOf("GPL-3.0.txt", "kuromoji-LICENSE.md", "kuromoji-NOTICE.md")
        val body = texts.joinToString("\n\n") { name -> assets.open("himitsu/licenses/$name").bufferedReader().use { it.readText() } }
        val text = label(body, 14f).apply { setPadding(dp(24), dp(16), dp(24), dp(16)); setTextIsSelectable(true) }
        MaterialAlertDialogBuilder(this).setTitle(R.string.himitsu_licenses).setView(ScrollView(this).apply { addView(text) }).setPositiveButton(android.R.string.ok, null).show()
    }

    private fun script(command: String) { if (webReady) web.evaluateJavascript("window.HimitsuReader.$command".replace("\u2028", "\\u2028").replace("\u2029", "\\u2029"), null) }
    private fun TextView.updateText(value: CharSequence) {
        if (text.toString() != value.toString()) text = value
    }
    private fun column() = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
    private fun row() = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL }
    private fun label(value: String, size: Float) = TextView(this).apply { text = value; textSize = size; gravity = Gravity.CENTER_VERTICAL; setTextColor(color(com.google.android.material.R.attr.colorOnSurface)) }
    private fun button(resource: Int, action: (View) -> Unit) = buttonText(getString(resource), resource, action)
    private fun buttonText(value: String, description: Int, action: (View) -> Unit) = MaterialButton(this).apply {
        text = value; contentDescription = getString(description); minHeight = dp(48); minimumHeight = dp(48); minWidth = dp(48); minimumWidth = dp(48); setOnClickListener(action)
    }
    private fun iconButton(drawable: Int, description: Int, action: (View) -> Unit) = buttonText("", description, action).apply { setIconResource(drawable); iconGravity = MaterialButton.ICON_GRAVITY_TEXT_START; iconPadding = 0; layoutParams = LinearLayout.LayoutParams(dp(56), dp(48)) }
    private fun dp(value: Int) = (value * resources.displayMetrics.density).toInt()
    private fun color(attribute: Int) = MaterialColors.getColor(this, attribute, Color.BLACK)
    private fun hex(value: Int) = String.format(Locale.ROOT, "#%06X", value and 0xffffff)
    private fun formatTime(millis: Long): String { val seconds = millis.coerceAtLeast(0) / 1000; return String.format(Locale.ROOT, "%d:%02d", seconds / 60, seconds % 60) }
    override fun onSaveInstanceState(outState: Bundle) { outState.putString("subtitle-track", pickingForTrack); super.onSaveInstanceState(outState) }
    override fun onStop() { model.savePosition(); super.onStop() }
    override fun onDestroy() { webReady = false; web.removeJavascriptInterface("Himitsu"); web.destroy(); super.onDestroy() }
    private companion object { const val ASSETS = "file:///android_asset/himitsu/" }
}
