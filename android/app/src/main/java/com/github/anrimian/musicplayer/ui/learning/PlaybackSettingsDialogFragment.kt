package com.github.anrimian.musicplayer.ui.learning

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.os.bundleOf
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.di.Components
import com.github.anrimian.musicplayer.domain.models.player.modes.RepeatMode
import com.github.anrimian.musicplayer.ui.sleep_timer.SleepTimerDialogFragment
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.button.MaterialButton
import com.google.android.material.button.MaterialButtonToggleGroup
import com.google.android.material.checkbox.MaterialCheckBox
import com.google.android.material.color.MaterialColors
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.tabs.TabLayout
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers
import io.reactivex.rxjava3.disposables.CompositeDisposable
import kotlinx.coroutines.launch
import java.util.Locale

/** The only settings entry on the full player; changing settings never creates another player. */
class PlaybackSettingsDialogFragment : BottomSheetDialogFragment() {
    private lateinit var model: LearningViewModel
    private val player = Components.getAppComponent().libraryPlayerInteractor()
    private val subscriptions = CompositeDisposable()
    private var latest = LearningState()
    private lateinit var modes: MaterialButtonToggleGroup
    private lateinit var kana: MaterialCheckBox
    private lateinit var font: TextView
    private lateinit var subtitleStatus: TextView
    private lateinit var speed: TextView
    private lateinit var order: TextView
    private lateinit var selectFile: View
    private lateinit var automatic: View
    private lateinit var correction: View
    private var settingsTab = 0
    companion object {
        fun newInstance(lyrics: Boolean) = PlaybackSettingsDialogFragment().apply {
            arguments = bundleOf("lyrics" to lyrics)
        }
    }
    private var pickingForTrack: String? = null
    private val modeIds = SubtitleMode.entries.associateWith { View.generateViewId() }
    private val subtitlePicker = registerForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        val track = pickingForTrack
        pickingForTrack = null
        if (uri != null && track != null) {
            runCatching { requireContext().contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION) }
            model.selectSubtitle(uri, track)
        }
    }
    private val folderPicker = registerForActivityResult(ActivityResultContracts.OpenDocumentTree()) { uri ->
        if (uri != null) {
            runCatching { requireContext().contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION) }
                .onSuccess { model.chooseTree(uri) }
                .onFailure { model.notice(R.string.himitsu_directory_permission) }
        }
    }


    private fun chooseSubtitle() {
        pickingForTrack = latest.track?.uri ?: return
        subtitlePicker.launch(arrayOf("*/*"))
    }

    private fun chooseReading() {
        val fingerprint = latest.document?.fingerprint ?: return
        val track = latest.track ?: return
        val captionTime = latest.position - LearningStore(requireContext()).offset(track.uri, fingerprint)
        val current = latest.rendered.filter { it.cue.kind == CueKind.DIALOGUE && it.cue.activeAt(captionTime) }
            .ifEmpty { latest.rendered.filter { it.cue.kind == CueKind.DIALOGUE }.sortedBy { kotlin.math.abs(it.cue.startMs - captionTime) }.take(1) }
        val choices = current.flatMap { rendered -> rendered.pieces.mapIndexedNotNull { index, piece -> if (containsKanji(piece.text)) Triple(rendered.cue.id, index, piece) else null } }
        if (choices.isEmpty()) { model.notice(R.string.himitsu_reading_none); return }
        MaterialAlertDialogBuilder(requireContext()).setTitle(R.string.himitsu_reading_edit)
            .setItems(choices.map { "${it.third.text}  ${it.third.reading.orEmpty()}" }.toTypedArray()) { _, which -> val item = choices[which]; editReading(fingerprint, item.first, item.second) }
            .setNegativeButton(R.string.himitsu_cancel, null).show()
    }

    private fun editReading(fingerprint: String, id: String, index: Int) {
        val trackUri = latest.track?.uri ?: return
        if (latest.document?.fingerprint != fingerprint) return
        val piece = latest.rendered.firstOrNull { it.cue.id == id }?.pieces?.getOrNull(index) ?: return
        val origin = when (piece.origin) { ReadingOrigin.SUBTITLE -> R.string.himitsu_reading_subtitle; ReadingOrigin.AUTOMATIC -> R.string.himitsu_reading_auto; ReadingOrigin.CORRECTION -> R.string.himitsu_reading_personal; ReadingOrigin.NONE -> R.string.himitsu_reading_unset }
        val field = TextInputLayout(requireContext()).apply { setPadding(dp(24), dp(8), dp(24), 0); hint = getString(R.string.himitsu_reading_input) }
        val input = TextInputEditText(field.context).apply { inputType = InputType.TYPE_CLASS_TEXT; setText(piece.reading.orEmpty()); selectAll() }; field.addView(input)
        val dialog = MaterialAlertDialogBuilder(requireContext()).setTitle(piece.text).setMessage(getString(origin)).setView(field)
            .setPositiveButton(R.string.himitsu_save, null).setNegativeButton(R.string.himitsu_cancel, null)
            .setNeutralButton(R.string.himitsu_reading_restore) { _, _ -> model.correct(trackUri, fingerprint, id, index, null, piece) }.create()
        dialog.setOnShowListener { dialog.getButton(androidx.appcompat.app.AlertDialog.BUTTON_POSITIVE).setOnClickListener {
            val reading = input.text.toString().trim()
            if (!validReading(reading)) field.error = getString(R.string.himitsu_invalid_reading)
            else { model.correct(trackUri, fingerprint, id, index, reading, piece); dialog.dismiss() }
        } }
        dialog.show()
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        model = libraryLearningModel()
        latest = model.state.value
        pickingForTrack = savedInstanceState?.getString("subtitle-track")
        settingsTab = savedInstanceState?.getInt("settings-tab") ?: if (arguments?.getBoolean("lyrics") == true) 1 else 0
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, state: Bundle?): View {
        val root = column().apply { setPadding(dp(24), dp(8), dp(24), dp(12)) }
        val header = row()
        header.addView(label("播放设置", 22f), LinearLayout.LayoutParams(0, -2, 1f))
        header.addView(MaterialButton(requireContext()).apply {
            text = ""; contentDescription = "关闭播放设置"
            setIconResource(R.drawable.ic_close); iconSize = dp(24); iconPadding = 0
            iconGravity = MaterialButton.ICON_GRAVITY_TEXT_START
            minWidth = 0; minimumWidth = 0; setPadding(dp(12), 0, dp(12), 0)
            setOnClickListener { dismiss() }
        }, LinearLayout.LayoutParams(dp(48), dp(48)))
        root.addView(header)
        val tabs = TabLayout(requireContext()).apply {
            addTab(newTab().setText("播放")); addTab(newTab().setText("字幕"))
        }
        root.addView(tabs)
        val scroll = androidx.core.widget.NestedScrollView(requireContext()).apply { isFillViewport = false }
        root.addView(scroll, LinearLayout.LayoutParams(-1, 0, 1f))
        val pages = FrameLayout(requireContext())
        scroll.addView(pages)
        val playback = column()
        speed = action("播放速度") { chooseSpeed() }; playback.addView(speed)
        order = action("播放顺序") { chooseOrder() }; playback.addView(order)
        playback.addView(action("定时关闭") {
            dismiss()
            SleepTimerDialogFragment().show(parentFragmentManager, "sleep-timer")
        })
        val subtitles = column()
        subtitles.addView(label("字幕语言", 14f).apply { setPadding(0, dp(16), 0, dp(8)) })
        modes = MaterialButtonToggleGroup(requireContext()).apply {
            isSingleSelection = true; isSelectionRequired = true
            listOf(SubtitleMode.CHINESE, SubtitleMode.JAPANESE, SubtitleMode.BILINGUAL).forEach { mode ->
                addView(MaterialButton(context, null, com.google.android.material.R.attr.materialButtonOutlinedStyle).apply {
                    id = modeIds.getValue(mode)
                    text = when(mode) { SubtitleMode.CHINESE -> "中"; SubtitleMode.JAPANESE -> "日"; SubtitleMode.BILINGUAL -> "双" }
                    contentDescription = when(mode) { SubtitleMode.CHINESE -> "仅中文"; SubtitleMode.JAPANESE -> "仅日文"; SubtitleMode.BILINGUAL -> "双语歌词" }
                    minWidth = 0; minimumWidth = 0; minHeight = dp(48)
                    setPadding(dp(8), 0, dp(8), 0)
                }, LinearLayout.LayoutParams(0, dp(52), 1f))
            }
            addOnButtonCheckedListener { _, id, checked ->
                if (checked) modeIds.entries.firstOrNull { it.value == id }?.let { if (it.key != model.state.value.mode) model.mode(it.key) }
            }
        }
        subtitles.addView(modes)
        kana = MaterialCheckBox(requireContext()).apply {
            text = "显示假名"; minHeight = dp(56)
            setOnCheckedChangeListener { _, checked -> if (checked != model.state.value.furigana) model.furigana(checked) }
        }
        subtitles.addView(kana)
        font = action("字幕字号") { chooseFont() }; subtitles.addView(font)
        subtitles.addView(action("回到当前句") {
            parentFragmentManager.setFragmentResult("resume-lyrics", Bundle.EMPTY)
            dismiss()
        })
        subtitleStatus = label("", 14f).apply { setPadding(0, dp(16), 0, dp(8)); setTextIsSelectable(true) }
        subtitles.addView(subtitleStatus)
        selectFile = action("选择字幕文件") { chooseSubtitle() }; subtitles.addView(selectFile)
        subtitles.addView(action("授权字幕文件夹") { folderPicker.launch(null) })
        automatic = action("恢复自动匹配") { model.automaticSubtitle() }; subtitles.addView(automatic)
        correction = action("修正当前句读音") { chooseReading() }; subtitles.addView(correction)
        pages.addView(playback); pages.addView(subtitles)
        fun selectTab(index: Int) {
            settingsTab = index
            playback.visibility = if (index == 0) View.VISIBLE else View.GONE
            subtitles.visibility = if (index == 1) View.VISIBLE else View.GONE
            scroll.scrollTo(0, 0)
        }
        tabs.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab) = selectTab(tab.position)
            override fun onTabUnselected(tab: TabLayout.Tab) {}
            override fun onTabReselected(tab: TabLayout.Tab) {}
        })
        tabs.getTabAt(settingsTab)?.select(); selectTab(settingsTab)
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            view.setPadding(dp(24) + bars.left, dp(8), dp(24) + bars.right, dp(12) + bars.bottom)
            insets
        }
        return root
    }

    override fun onStart() {
        super.onStart()
        dialog?.window?.let { window ->
            val light = androidx.core.graphics.ColorUtils.calculateLuminance(
                MaterialColors.getColor(requireContext(), com.google.android.material.R.attr.colorSurface, 0)) > .5
            androidx.core.view.WindowCompat.getInsetsController(window, window.decorView).apply {
                isAppearanceLightStatusBars = light
                isAppearanceLightNavigationBars = light
            }
        }
        (dialog as? BottomSheetDialog)?.behavior?.apply {
            // Stay below the status bar; both tabs scroll on short/landscape screens.
            val height = (resources.displayMetrics.heightPixels * .75f).toInt()
            view?.layoutParams = view?.layoutParams?.apply { this.height = height }
            state = BottomSheetBehavior.STATE_EXPANDED
            skipCollapsed = true
        }
    }

    override fun onViewCreated(view: View, state: Bundle?) {
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                model.timedLibraryState.collect { value ->
                    latest = value
                    if (modes.checkedButtonId != modeIds.getValue(value.mode)) modes.check(modeIds.getValue(value.mode))
                    if (kana.isChecked != value.furigana) kana.isChecked = value.furigana
                    font.text = "字幕字号   ${value.fontSize}"
                    subtitleStatus.text = getString(when { value.readingBusy -> R.string.himitsu_reading_busy; value.readingFailed -> R.string.himitsu_reading_failed; else -> value.subtitleStatus }) +
                        value.subtitleName.takeIf { it.isNotBlank() }?.let { "\n$it" }.orEmpty()
                    selectFile.isEnabled = value.track != null
                    automatic.isEnabled = value.track != null
                    correction.isEnabled = value.rendered.any { cue -> cue.pieces.any { containsKanji(it.text) } }
                }
            }
        }
        subscriptions.add(player.getPlaybackSpeedObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ updatePlayback() }, {}))
        subscriptions.add(player.getRepeatModeObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ updatePlayback() }, {}))
        subscriptions.add(player.getRandomPlayingObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ updatePlayback() }, {}))
        updatePlayback()
    }
    private fun updatePlayback() {
        speed.text = "播放速度   " + String.format(Locale.ROOT, "%.2f×", player.getPlaybackSpeed())
        order.text = "播放顺序   " + arrayOf("顺序播放", "列表循环", "单曲循环", "随机播放")[orderIndex()]
    }
    private fun orderIndex() = if (player.isRandomPlayingEnabled()) 3 else when(player.getRepeatMode()) {
        RepeatMode.REPEAT_PLAY_QUEUE -> 1; RepeatMode.REPEAT_COMPOSITION -> 2; else -> 0
    }
    private fun chooseSpeed() {
        val values = listOf(.5f, .75f, 1f, 1.25f, 1.5f, 2f)
        MaterialAlertDialogBuilder(requireContext()).setTitle("播放速度")
            .setSingleChoiceItems(values.map { "${it}×" }.toTypedArray(), values.indexOf(player.getPlaybackSpeed())) { dialog, which ->
                player.setPlaybackSpeed(values[which]); dialog.dismiss()
            }.setNegativeButton(R.string.himitsu_cancel, null).show()
    }
    private fun chooseOrder() {
        MaterialAlertDialogBuilder(requireContext()).setTitle("播放顺序")
            .setSingleChoiceItems(arrayOf("顺序播放", "列表循环", "单曲循环", "随机播放"), orderIndex()) { dialog, which ->
                player.setRandomPlayingEnabled(which == 3)
                player.setRepeatMode(when(which) { 1 -> RepeatMode.REPEAT_PLAY_QUEUE; 2 -> RepeatMode.REPEAT_COMPOSITION; else -> RepeatMode.NONE })
                dialog.dismiss()
            }.setNegativeButton(R.string.himitsu_cancel, null).show()
    }
    private fun chooseFont() {
        val values = (listOf(16, 19, 23, 27, 31, 35, 40) + model.state.value.fontSize).distinct().sorted()
        MaterialAlertDialogBuilder(requireContext()).setTitle("字幕字号")
            .setSingleChoiceItems(values.map { it.toString() }.toTypedArray(), values.indexOf(model.state.value.fontSize)) { dialog, which ->
                model.font(values[which] - model.state.value.fontSize); dialog.dismiss()
            }.setNegativeButton(R.string.himitsu_cancel, null).show()
    }
    private fun action(text: String, block: () -> Unit) = MaterialButton(requireContext()).apply {
        this.text = text; textSize = 16f; gravity = Gravity.CENTER_VERTICAL or Gravity.START
        minHeight = dp(56); setPadding(0, dp(8), 0, dp(8)); isAllCaps = false
        layoutParams = LinearLayout.LayoutParams(-1, -2)
        setOnClickListener { block() }
    }
    private fun label(text: String, size: Float) = TextView(requireContext()).apply {
        this.text = text; textSize = size
        setTextColor(MaterialColors.getColor(this, com.google.android.material.R.attr.colorOnSurface))
    }
    private fun column() = LinearLayout(requireContext()).apply { orientation = LinearLayout.VERTICAL }
    private fun row() = LinearLayout(requireContext()).apply { gravity = Gravity.CENTER_VERTICAL }
    private fun dp(value: Int) = (value * resources.displayMetrics.density).toInt()
    override fun onSaveInstanceState(outState: Bundle) {
        outState.putString("subtitle-track", pickingForTrack)
        outState.putInt("settings-tab", settingsTab)
        super.onSaveInstanceState(outState)
    }
    override fun onDestroyView() { subscriptions.clear(); super.onDestroyView() }
}
