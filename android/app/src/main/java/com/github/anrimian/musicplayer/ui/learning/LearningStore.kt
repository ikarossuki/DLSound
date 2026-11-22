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
    // Keep portable display settings separate from URI grants and private subtitle bindings.
    private val display=context.getSharedPreferences("dlsound-display",Context.MODE_PRIVATE)
    init {
        if (!display.contains("initialized")) {
            val edit=display.edit()
            for(key in listOf("mode","furigana","font-size","ruby-scale","depth-enabled")){
                when(val value=preferences.all[key]){
                    is String->edit.putString(key,value)
                    is Boolean->edit.putBoolean(key,value)
                    is Int->edit.putInt(key,value)
                    is Float->edit.putFloat(key,value)
                }
            }
            val theme=context.getSharedPreferences("dlsound-player",Context.MODE_PRIVATE).getString("theme","system")
            edit.putString("theme",theme).putBoolean("initialized",true).apply()
        }
    }
    var theme:String
        get()=display.getString("theme","system") ?: "system"
        set(value){display.edit().putString("theme",value).apply()}
    private val migrated = context.getSharedPreferences("dlsound-imported-readings", Context.MODE_PRIVATE)
    private val backupId: String by lazy {
        preferences.getString("backup-origin",null) ?: java.util.UUID.randomUUID().toString().also {
            preferences.edit().putString("backup-origin",it).apply()
        }
    }
    fun backupReadings(): org.json.JSONObject {
        val result = org.json.JSONObject()
        migrated.all.filterKeys { it.startsWith("records-") }.forEach { (key,value) -> result.put(key.removePrefix("records-"), org.json.JSONObject(value as String)) }
        val local = org.json.JSONObject()
        preferences.all.filterKeys { it.startsWith("reading-") || it.startsWith("offset-") }.forEach { (key,value) -> local.put(key,value) }
        if(result.has(backupId)){
            val combined=result.getJSONObject(backupId); for(key in local.keys())combined.put(key,local.get(key))
        }else result.put(backupId,local)
        return result
    }
    fun backupOrigins(uri: String): JSONArray {
        val local=JSONArray().put(JSONArray().put(backupId).put(uri))
        val previous=JSONArray(migrated.getString("origins-"+textFingerprint(uri),"[]"))
        for(i in 0 until previous.length()) local.put(previous.getJSONArray(i))
        return local
    }
    fun restoreReadings(records: org.json.JSONObject, sources: Map<String,JSONArray>) {
        val edit=migrated.edit()
        val keyPattern=Regex("(reading|offset)-[a-f0-9]{64}")
        for(id in records.keys()) {
            require(runCatching { java.util.UUID.fromString(id) }.isSuccess) { "备份来源无效" }
            val values=records.getJSONObject(id)
            val merged=org.json.JSONObject(migrated.getString("records-"+id,"{}"))
            for(key in values.keys()) {
                require(key.matches(keyPattern)) { "备份含无效读音记录" }
                if(key.startsWith("reading-")){
                    val value=values.getString(key)
                    require(value.isEmpty()||validReading(value)) { "读音值无效" }
                    edit.putString(id+key,value); merged.put(key,value)
                }else{
                    val value=values.getLong(key).coerceIn(-5000,5000)
                    edit.putLong(id+key,value); merged.put(key,value)
                }
            }
            edit.putString("records-"+id,merged.toString())
        }
        for((uri,aliases) in sources){
            val list=linkedSetOf<String>()
            val existing=JSONArray(migrated.getString("origins-"+textFingerprint(uri),"[]"))
            for(array in listOf(aliases,existing)) for(i in 0 until array.length()){
                val pair=array.getJSONArray(i)
                if(records.has(pair.getString(0)) || array===existing) list.add(pair.toString())
            }
            edit.putString("origins-"+textFingerprint(uri),JSONArray(list.map { JSONArray(it) }).toString())
        }
        edit.apply()
    }
    private fun imported(track:String, makeKey:(String)->String):String? {
        val raw=migrated.getString("origins-"+textFingerprint(track),null)?:return null
        val origins=JSONArray(raw)
        for(i in 0 until origins.length()){
            val pair=origins.getJSONArray(i)
            val key=pair.getString(0)+makeKey(pair.getString(1))
            if(migrated.contains(key))return key
        }
        return null
    }
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
        get() = SubtitleMode.restore(display.getString("mode", null))
        set(value) { display.edit().putString("mode", value.name).apply() }
    var furigana: Boolean
        get() = display.getBoolean("furigana", true)
        set(value) { display.edit().putBoolean("furigana", value).apply() }
    var fontSize: Int
        get() = display.getInt("font-size", 20).coerceIn(16, 40)
        set(value) { display.edit().putInt("font-size", value.coerceIn(16, 40)).apply() }

    var rubyScale: Float
        get() = display.getFloat("ruby-scale", .42f).coerceIn(.25f, .75f)
        set(value) { if (value.isFinite()) display.edit().putFloat("ruby-scale", value.coerceIn(.25f, .75f)).apply() }
    var depthEnabled: Boolean
        get() = display.getBoolean("depth-enabled", true)
        set(value) { display.edit().putBoolean("depth-enabled", value).apply() }
    fun offsetKey(track: String, fingerprint: String) = "offset-" + textFingerprint("$track\u0000$fingerprint")
    fun offset(track: String, fingerprint: String): Long {
        val key=offsetKey(track,fingerprint)
        return if(preferences.contains(key)) preferences.getLong(key,0) else imported(track){offsetKey(it,fingerprint)}?.let { migrated.getLong(it,0) } ?: 0
    }
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
    fun correction(track: String, document: SubtitleDocument, cue: SubtitleCue, piece: ReadingPiece): String? {
        val key=correctionKey(track,document,cue,piece)
        val value=preferences.getString(key,null) ?: imported(track){correctionKey(it,document,cue,piece)}?.let { migrated.getString(it,null) }
        return value?.takeIf { it.isNotEmpty() }
    }
    fun correct(track: String, document: SubtitleDocument, cue: SubtitleCue, piece: ReadingPiece, reading: String?) {
        val edit = preferences.edit()
        val key = correctionKey(track, document, cue, piece)
        edit.putString(key, reading.orEmpty())
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
            if (track.scheme == "content" && context.checkUriPermission(track, android.os.Process.myPid(),
                    android.os.Process.myUid(), android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION) ==
                    android.content.pm.PackageManager.PERMISSION_GRANTED) return@runCatching true
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
