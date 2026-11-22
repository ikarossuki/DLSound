package com.github.anrimian.musicplayer.ui.learning

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import android.text.InputType
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.*
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.github.anrimian.musicplayer.R
import com.google.android.material.color.MaterialColors
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject
import java.io.ByteArrayInputStream
import java.util.Locale

import androidx.fragment.app.Fragment
import android.view.LayoutInflater

class RubyLyricsFragment : Fragment() {
    private lateinit var model: LearningViewModel
    private lateinit var root: LinearLayout
    private lateinit var scene: TextView
    private lateinit var web: WebView
    private var latest = LearningState()
    private var webReady = false
    private var sentRevision = -1
    private var sentOptions = ""
    private var noticeSequence = 0
    private var viewGeneration = 0
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, state: Bundle?): View {
        viewGeneration++
        model = libraryLearningModel()
        root = column()
        scene = label("", 14f).apply { setPadding(dp(24), dp(8), dp(24), dp(8)); maxLines = 3 }
        root.addView(scene)
        web = WebView(requireContext())
        configureWebView()
        root.addView(web, LinearLayout.LayoutParams(-1, 0, 1f))
        return root
    }

    override fun onViewCreated(view: View, state: Bundle?) {
        parentFragmentManager.setFragmentResultListener("resume-lyrics", viewLifecycleOwner) { _, _ ->
            script("resumeFollow()")
        }
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) { model.state.collect(::render) }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebView() {
        if (requireContext().applicationInfo.flags and android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE != 0) {
            WebView.setWebContentsDebuggingEnabled(true)
        }
        web.setBackgroundColor(color(com.google.android.material.R.attr.colorSurface))
        web.settings.apply {
            javaScriptEnabled = true; blockNetworkLoads = true; allowContentAccess = false; allowFileAccess = false
            domStorageEnabled = false; defaultTextEncodingName = "UTF-8"; textZoom = 100
        }
        val generation = viewGeneration
        val main = android.os.Handler(android.os.Looper.getMainLooper())
        fun dispatch(action: () -> Unit) {
            main.post {
                // A destroyed WebView may already have queued a callback during rotation.
                if (generation == viewGeneration && isAdded && this@RubyLyricsFragment.view != null) action()
            }
        }
        web.addJavascriptInterface(object {
            @JavascriptInterface fun ready() = dispatch { webReady = true; sentRevision = -1; sentOptions = ""; render(latest) }
            @JavascriptInterface fun seek(fingerprint: String, id: String) = dispatch { model.seekCue(fingerprint, id) }
            @JavascriptInterface fun correct(fingerprint: String, id: String, index: Int) = dispatch { editReading(fingerprint, id, index) }
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
        val scenes = state.document?.cues.orEmpty().filter { it.kind == CueKind.SCENE && it.activeAt(state.position) }
        val sceneSeparator = "\n"
        scene.updateText(scenes.joinToString(sceneSeparator) { cue -> listOfNotNull(cue.japaneseText.takeIf { state.mode.japanese && it.isNotEmpty() }, cue.chinese?.takeIf { state.mode.chinese }).joinToString(sceneSeparator) })
        scene.visibility = if (scene.text.isEmpty()) View.GONE else View.VISIBLE
        if (state.noticeSequence != noticeSequence) { noticeSequence = state.noticeSequence; if (state.notice != 0) Snackbar.make(root, state.notice, Snackbar.LENGTH_LONG).show() }
        if (!webReady) return
        val options = JSONObject().put("mode", state.mode.name).put("furigana", state.furigana)
            .put("fontSize", state.fontSize * resources.configuration.fontScale)
            .put("emptyMessage", getString(state.subtitleStatus) + if (state.track != null && state.rendered.isEmpty() && !state.openingAudio) "\n在右下角播放设置中选择字幕或授权文件夹" else "")
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

    private fun script(command: String) { if (webReady) web.evaluateJavascript("window.HimitsuReader.$command".replace("\u2028", "\\u2028").replace("\u2029", "\\u2029"), null) }
    private fun TextView.updateText(value: CharSequence) {
        if (text.toString() != value.toString()) text = value
    }
    private fun column() = LinearLayout(requireContext()).apply { orientation = LinearLayout.VERTICAL }
    private fun label(value: String, size: Float) = TextView(requireContext()).apply { text = value; textSize = size; gravity = Gravity.CENTER_VERTICAL; setTextColor(color(com.google.android.material.R.attr.colorOnSurface)) }
    private fun dp(value: Int) = (value * resources.displayMetrics.density).toInt()
    private fun color(attribute: Int) = MaterialColors.getColor(requireContext(), attribute, Color.BLACK)
    private fun hex(value: Int) = String.format(Locale.ROOT, "#%06X", value and 0xffffff)
    override fun onDestroyView() {
        viewGeneration++
        webReady = false
        web.removeJavascriptInterface("Himitsu")
        web.destroy()
        super.onDestroyView()
    }
    private companion object { const val ASSETS = "file:///android_asset/himitsu/" }
}
