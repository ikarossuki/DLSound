package com.github.anrimian.musicplayer.ui.learning

import android.content.Context
import android.os.SystemClock
import com.github.anrimian.musicplayer.data.models.composition.source.ExternalCompositionSource
import com.github.anrimian.musicplayer.domain.interactors.player.ExternalPlayerInteractor
import io.reactivex.rxjava3.disposables.CompositeDisposable
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers
import java.io.File
import org.json.JSONArray

internal class LearningStore(context: Context) {
    val folderPositions = FolderPositions(context)
    val study = com.github.anrimian.musicplayer.ui.v12.StudyRecords(context)
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
    private fun validOrigin(pair: JSONArray?) = pair != null && pair.length() == 2 &&
        pair.opt(0) is String && runCatching { java.util.UUID.fromString(pair.getString(0)) }.isSuccess &&
        pair.opt(1) is String && pair.getString(1).isNotBlank()

    private fun savedOrigins(uri: String): List<JSONArray> {
        val raw = migrated.getString("origins-" + textFingerprint(uri), null) ?: return emptyList()
        val array = runCatching { JSONArray(raw) }.getOrNull() ?: return emptyList()
        return (0 until array.length()).mapNotNull { array.optJSONArray(it) }.filter(::validOrigin)
    }

    fun backupOrigins(uri: String): JSONArray {
        val local=JSONArray().put(JSONArray().put(backupId).put(uri))
        savedOrigins(uri).forEach { local.put(it) }
        return local
    }
    fun validateOrigins(records: org.json.JSONObject, aliases: JSONArray) {
        for (i in 0 until aliases.length()) {
            val pair = aliases.optJSONArray(i)
            require(pair != null && validOrigin(pair) && records.has(pair.getString(0))) { "备份中的读音来源关联无效" }
        }
    }

    fun prepareReadings(records: org.json.JSONObject, sources: Map<String,JSONArray>): android.content.SharedPreferences.Editor {
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
            for(i in 0 until aliases.length()) {
                list.add(aliases.getJSONArray(i).toString())
            }
            savedOrigins(uri).forEach { list.add(it.toString()) }
            edit.putString("origins-"+textFingerprint(uri),JSONArray(list.map { JSONArray(it) }).toString())
        }
        return edit
    }
    private fun imported(track:String, makeKey:(String)->String):String? {
        for(pair in savedOrigins(track)){
            val key=pair.getString(0)+makeKey(pair.getString(1))
            if(migrated.contains(key))return key
        }
        return null
    }
    val directory = File(context.filesDir, "himitsu-subtitles").apply { mkdirs() }
    var pendingProgress: JSONArray
        get() = JSONArray(preferences.getString("pending-progress", "[]"))
        set(value) { check(preferences.edit().putString("pending-progress", value.toString()).commit()) }
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

    fun position(uri: String): Long = folderPositions.position(uri)
        ?: preferences.getLong("position-" + textFingerprint(uri), 0).coerceAtLeast(0)
    fun savePosition(uri: String, position: Long) {
        val ms = position.coerceAtLeast(0)
        preferences.edit().putLong("position-" + textFingerprint(uri), ms).apply()
        folderPositions.remember(uri, ms)
    }
    fun checkFileVersion(file: LearningFile, preserveBoundProgress: Boolean = false): Boolean {
        val key = "file-version-" + textFingerprint(file.uri)
        val previous = preferences.getString(key, null).orEmpty()
        val oldSize = previous.substringBefore(':').toLongOrNull() ?: 0
        val oldModified = previous.substringAfter(':', "").toLongOrNull() ?: 0
        val changed = (file.size > 0 && oldSize > 0 && file.size != oldSize) ||
                (file.modified > 0 && oldModified > 0 && file.modified != oldModified)
        if (changed && !preserveBoundProgress) savePosition(file.uri, 0)
        val size = file.size.takeIf { it > 0 } ?: if (changed) 0 else oldSize
        val modified = file.modified.takeIf { it > 0 } ?: if (changed) 0 else oldModified
        val version = "$size:$modified"
        if (version != previous) preferences.edit().putString(key, version).apply()
        return changed
    }
    fun correctionsFor(track: String, document: SubtitleDocument): (SubtitleCue, ReadingPiece) -> String? {
        val origins = savedOrigins(track)
        return { cue, piece ->
            val local = preferences.getString(correctionKey(track, document, cue, piece), null)
            val value = local ?: origins.firstNotNullOfOrNull { pair ->
                migrated.getString(pair.getString(0) + correctionKey(pair.getString(1), document, cue, piece), null)
            }
            value?.takeIf(String::isNotEmpty)
        }
    }
    fun correct(track: String, document: SubtitleDocument, cue: SubtitleCue, piece: ReadingPiece, reading: String?) {
        val edit = preferences.edit()
        val key = correctionKey(track, document, cue, piece)
        edit.putString(key, reading.orEmpty())
        edit.apply()
    }
    private fun correctionKey(track: String, document: SubtitleDocument, cue: SubtitleCue, piece: ReadingPiece): String =
        "reading-" + textFingerprint("$track\u0000${document.fingerprint}\u0000${cue.id}\u0000${piece.start}:${piece.end}\u0000${piece.text}")
    fun pairBinding(scope:String, key:String): JSONArray? =
        preferences.getString("pair-$scope-" + textFingerprint(key),null)?.let(::JSONArray)
    fun setPairBinding(scope:String, key:String, value:JSONArray?) {
        preferences.edit().putString("pair-$scope-" + textFingerprint(key),value?.toString()).apply()
    }
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
    private lateinit var store: LearningStore
    private var activeUri: String? = null
    private var duration = 0L
    private var latest: Long? = null
    private var saved: Long? = null
    private var savedAt = 0L
    private var playing = false

    fun flush(uri: String) {
        if (uri != activeUri) return
        val position = latest ?: return
        if (position == saved) return
        store.savePosition(uri, position)
        saved = position
        savedAt = SystemClock.elapsedRealtime()
    }

    fun saveSeek(uri: String, position: Long) {
        if (uri == activeUri) {
            latest = resumePosition(position)
            flush(uri)
        }
    }

    private fun resumePosition(position: Long) =
        if (duration > 0 && position >= duration) 0L else position.coerceAtLeast(0)

    @Synchronized
    fun start(context: Context, player: ExternalPlayerInteractor) {
        if (started) return
        started = true
        store = LearningStore(context.applicationContext)
        subscriptions.add(player.getCurrentSourceObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ source ->
            val external = source.value as? ExternalCompositionSource
            val uri = external?.uri?.toString()?.takeIf { it == store.trackUri }
            if (uri != activeUri) {
                activeUri?.let(::flush)
                activeUri = uri
                latest = null
                saved = null
            }
            duration = external?.duration ?: 0
        }, { activeUri = null }))
        subscriptions.add(player.getIsPlayingStateObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ value ->
            playing = value
            if (!playing) activeUri?.let(::flush)
        }, {}))
        subscriptions.add(player.getTrackPositionObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ position ->
            val uri = activeUri ?: return@subscribe
            latest = resumePosition(position)
            if (!playing || saved == null || latest == 0L || SystemClock.elapsedRealtime() - savedAt >= 5_000L) flush(uri)
        }, {}))
    }
}
