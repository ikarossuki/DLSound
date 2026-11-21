package com.github.anrimian.musicplayer.ui.learning

import android.content.Context
import com.github.anrimian.musicplayer.data.models.composition.source.ExternalCompositionSource
import com.github.anrimian.musicplayer.domain.interactors.player.ExternalPlayerInteractor
import io.reactivex.rxjava3.disposables.CompositeDisposable
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers
import java.io.File
import org.json.JSONArray

internal class LearningStore(context: Context) {
    private val preferences = context.getSharedPreferences("himitsu-learning-v1", Context.MODE_PRIVATE)
    val directory = File(context.filesDir, "himitsu-subtitles").apply { mkdirs() }
    var treeUri: String?
        get() = preferences.getString("tree", null)
        set(value) { preferences.edit().putString("tree", value).apply() }
    var trackUri: String?
        get() = preferences.getString("track", null)
        set(value) { preferences.edit().putString("track", value).apply() }
    var trackName: String
        get() = preferences.getString("track-name", "").orEmpty()
        set(value) { preferences.edit().putString("track-name", value).apply() }
    var trackFolder: String?
        get() = preferences.getString("track-folder", null)
        set(value) { preferences.edit().putString("track-folder", value).apply() }
    var browserStack: List<String>
        get() = runCatching { val array = JSONArray(preferences.getString("browser-stack", "[]")); (0 until array.length()).map { array.getString(it) } }.getOrDefault(emptyList())
        set(value) { preferences.edit().putString("browser-stack", JSONArray(value).toString()).apply() }
    var mode: SubtitleMode
        get() = SubtitleMode.restore(preferences.getString("mode", null))
        set(value) { preferences.edit().putString("mode", value.name).apply() }
    var furigana: Boolean
        get() = preferences.getBoolean("furigana", true)
        set(value) { preferences.edit().putBoolean("furigana", value).apply() }
    var fontSize: Int
        get() = preferences.getInt("font-size", 20).coerceIn(16, 40)
        set(value) { preferences.edit().putInt("font-size", value.coerceIn(16, 40)).apply() }

    var rubyScale: Float
        get() = preferences.getFloat("ruby-scale", .42f).coerceIn(.25f, .75f)
        set(value) { if (value.isFinite()) preferences.edit().putFloat("ruby-scale", value.coerceIn(.25f, .75f)).apply() }
    var depthEnabled: Boolean
        get() = preferences.getBoolean("depth-enabled", true)
        set(value) { preferences.edit().putBoolean("depth-enabled", value).apply() }
    fun offsetKey(track: String, fingerprint: String) = "offset-" + textFingerprint("$track\u0000$fingerprint")
    fun offset(track: String, fingerprint: String): Long = preferences.getLong(offsetKey(track, fingerprint), 0).coerceIn(-5000, 5000)
    fun setOffset(track: String, fingerprint: String, value: Long) {
        preferences.edit().putLong(offsetKey(track, fingerprint), value.coerceIn(-5000, 5000)).apply()
    }

    fun position(uri: String): Long = preferences.getLong("position-" + textFingerprint(uri), 0).coerceAtLeast(0)
    fun savePosition(uri: String, position: Long) { preferences.edit().putLong("position-" + textFingerprint(uri), position.coerceAtLeast(0)).apply() }
    fun checkFileVersion(file: LearningFile): Boolean {
        val key = "file-version-" + textFingerprint(file.uri)
        val version = "${file.size}:${file.modified}"
        val previous = preferences.getString(key, null)
        if (previous != null && previous != version) savePosition(file.uri, 0)
        preferences.edit().putString(key, version).apply()
        return previous != null && previous != version
    }
    fun correction(track: String, document: SubtitleDocument, cue: SubtitleCue, piece: ReadingPiece): String? =
        preferences.getString(correctionKey(track, document, cue, piece), null)
    fun correct(track: String, document: SubtitleDocument, cue: SubtitleCue, piece: ReadingPiece, reading: String?) {
        val edit = preferences.edit()
        val key = correctionKey(track, document, cue, piece)
        if (reading == null) edit.remove(key) else edit.putString(key, reading)
        edit.apply()
    }
    private fun correctionKey(track: String, document: SubtitleDocument, cue: SubtitleCue, piece: ReadingPiece): String =
        "reading-" + textFingerprint("$track\u0000${document.fingerprint}\u0000${cue.id}\u0000${piece.start}:${piece.end}\u0000${piece.text}")
    fun manualFile(uri: String) = File(directory, textFingerprint(uri) + ".manual")
    fun manualUri(uri: String): String? = preferences.getString("manual-uri-" + textFingerprint(uri), null)
    fun setManualUri(uri: String, subtitleUri: String?) {
        val edit = preferences.edit()
        val key = "manual-uri-" + textFingerprint(uri)
        if (subtitleUri == null) edit.remove(key) else edit.putString(key, subtitleUri)
        edit.apply()
    }

    companion object {
        /** A SAF tree grant is sufficient for playback of a user-selected learning track. */
        @JvmStatic
        fun hasAudioReadGrant(context: Context): Boolean = runCatching {
            val saved = context.getSharedPreferences("himitsu-learning-v1", Context.MODE_PRIVATE)
                .getString("track", null) ?: return@runCatching false
            val track = android.net.Uri.parse(saved)
            val treeId = android.provider.DocumentsContract.getTreeDocumentId(track)
            context.contentResolver.persistedUriPermissions.any { permission ->
                permission.isReadPermission && permission.uri.authority == track.authority &&
                    android.provider.DocumentsContract.isTreeUri(permission.uri) &&
                    android.provider.DocumentsContract.getTreeDocumentId(permission.uri) == treeId
            }
        }.getOrDefault(false)
    }
}

/** Saves progress while the upstream playback service outlives its screen. */
internal object LearningProgressRecorder {
    private var started = false
    private val subscriptions = CompositeDisposable()
    @Synchronized
    fun start(context: Context, player: ExternalPlayerInteractor) {
        if (started) return
        started = true
        val store = LearningStore(context.applicationContext)
        var activeUri: String? = null
        var duration = 0L
        var lastSaved = -1L
        subscriptions.add(player.getCurrentSourceObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ source ->
            val external = source.value as? ExternalCompositionSource
            activeUri = external?.uri?.toString()?.takeIf { it == store.trackUri }
            duration = external?.duration ?: 0
            lastSaved = -1
        }, { activeUri = null }))
        subscriptions.add(player.getTrackPositionObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ position ->
            val uri = activeUri?.takeIf { it == store.trackUri } ?: return@subscribe
            val clamped = if (duration > 0) position.coerceIn(0, duration) else position.coerceAtLeast(0)
            if (clamped / 1_000 != lastSaved / 1_000 || clamped == 0L) {
                store.savePosition(uri, if (duration > 0 && clamped >= duration) 0 else clamped)
                lastSaved = clamped
            }
        }, {}))
    }
}
