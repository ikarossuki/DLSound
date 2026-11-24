package com.github.anrimian.musicplayer.ui.v12

import com.github.anrimian.musicplayer.data.database.entities.play_queue.FilePositionEntity
import com.github.anrimian.musicplayer.di.Components
import com.github.anrimian.musicplayer.domain.models.composition.Composition
import com.github.anrimian.musicplayer.ui.learning.LearningStore
import kotlinx.coroutines.rx3.await
import org.json.JSONArray
import org.json.JSONObject

/** User-selected backups use file identity, never the destination's media IDs. */
internal class LibraryBackup(private val store: LearningStore, private val rows: Map<Long,JSONObject>,
                             private val tracks: Map<Long,Composition>) {
    private val component = Components.getAppComponent()
    private val playlists = component.playlistsInteractor()
    private val progress = LibraryProgress(store, component.compositionsDao(), rows)
    private fun identity(row:JSONObject)=JSONArray().put(row.getString("fileName")).put(row.getLong("size")).put(row.getLong("duration")).toString()
    private fun path(row:JSONObject) = folderPath(row) + "/" + row.optString("fileName")
    private fun uris():Map<Long,String> = rows.keys.chunked(400).flatMap { ids ->
        component.storageSourceRepository().getStorageSources(ids).blockingGet().map { (id,source) -> id to component.contentSourceHelper().createUri(source).toString() }
    }.toMap()

    suspend fun export(prefs:JSONObject,favorites:Set<String>, live: FilePositionEntity? = null):JSONObject {
        val sources=uris()
        val catalog=JSONObject()
        rows.forEach { (id,row) -> catalog.put(id.toString(),JSONObject().put("identity",identity(row))
            .put("path",path(row)).put("origins",sources[id]?.let(store::backupOrigins) ?: JSONArray())) }
        val lists=JSONArray()
        for(list in playlists.getPlaylistsObservable().firstOrError().await()){
            val members=playlists.getCompositionsObservable(list.id,null).firstOrError().await()
            lists.put(JSONObject().put("name",list.name).put("members",JSONArray(members.map { it.id.toString() })))
        }
        return JSONObject().put("format","DLSound/1").put("tracks",catalog).put("favorites",JSONArray(favorites))
            .put("folderProgress",store.folderPositions.export()).put("progress",progress.export(live)).put("study",store.study.export()).put("playlists",lists).put("preferences",prefs).put("readings",store.backupReadings())
    }

    data class Result(val favorites:Set<String>,val preferences:JSONObject,val missing:List<String>,val deferredLists:List<String>)
    companion object {
        fun folderPath(row:JSONObject):String {
            val path = "/" + row.optString("folder").trim('/')
            return if (path == "/sdcard" || path.startsWith("/sdcard/")) "/storage/emulated/0" + path.removePrefix("/sdcard") else path
        }
        fun mergedFavorites(preferences: android.content.SharedPreferences, imported: Set<String>) =
            preferences.getStringSet("favorites", emptySet()).orEmpty() + imported
    }

    private fun validatePreferences(prefs: JSONObject) {
        for (key in prefs.keys()) {
            val value = prefs.get(key)
            val valid = when (key) {
                "theme" -> value in listOf("light", "dark", "system")
                "language" -> value in listOf("ja", "zh", "both")
                "repeat" -> value in listOf("off", "one", "all")
                "librarySort" -> value == "default" || value is String && value.matches(Regex("(title|artist|album|duration)-(asc|desc)"))
                "font" -> value is Number && value.toDouble() in 16.0..40.0 && value.toDouble() == value.toInt().toDouble()
                "rubyScale" -> value is Number && value.toDouble() in 0.25..0.75
                "speed" -> value is Number && value.toDouble() in 0.5..2.0
                "ruby", "depth", "shuffle", "treeMode" -> value is Boolean
                else -> true
            }
            require(valid) { "备份设置无效：$key" }
        }
    }

    fun validateDraft(doc: JSONObject) {
        validatePreferences(doc.getJSONObject("preferences"))
        val catalog = doc.getJSONObject("tracks")
        val readings = doc.getJSONObject("readings")
        for (key in catalog.keys()) store.validateOrigins(readings, catalog.getJSONObject(key).getJSONArray("origins"))
        store.prepareReadings(readings, emptyMap())
        doc.getJSONArray("favorites")
        val lists = doc.getJSONArray("playlists")
        for (i in 0 until lists.length()) {
            val list = lists.getJSONObject(i)
            require(list.getString("name").isNotBlank()) { "歌单名称无效" }
            val members = list.getJSONArray("members")
            for (j in 0 until members.length()) members.getString(j)
        }
        if (doc.has("folderProgress")) com.github.anrimian.musicplayer.ui.learning.FolderPositions.read(doc.getJSONArray("folderProgress"))
        if (doc.has("progress")) LibraryProgress.read(doc.getJSONArray("progress"))
        if (doc.has("study")) store.study.check(doc.getJSONObject("study"))
    }
    suspend fun restore(doc:JSONObject, choices:Map<String,String> = emptyMap()):Result {
        require(doc.optString("format")=="DLSound/1") { "无法识别此备份版本" }
        val folderProgress = if (doc.has("folderProgress")) com.github.anrimian.musicplayer.ui.learning.FolderPositions.read(doc.getJSONArray("folderProgress")) else null
        val incomingProgress = if (doc.has("progress")) LibraryProgress.read(doc.getJSONArray("progress")) else null
        val study = if (doc.has("study")) doc.getJSONObject("study").also(store.study::check) else null
        val trackPaths = mutableMapOf<String,String>()
        val matches=BackupMatches(doc, rows, choices)
        val chosenPaths=mutableMapOf<Triple<String,Long,Long>,Long>()
        val catalog=doc.getJSONObject("tracks")
        val sources=uris()
        val aliases=mutableMapOf<String,JSONArray>()
        val missing=linkedSetOf<String>()
        val mapped=mutableMapOf<String,Long>()
        for(match in matches.tracks){
            val old=match.key
            val row=catalog.optJSONObject(old)
            val origins = row?.getJSONArray("origins") ?: JSONArray()
            store.validateOrigins(doc.getJSONObject("readings"), origins)
            val target=match.resolved
            if(target==null){missing.add(old);continue}
            val id=target.id
            if (match.path.isNotEmpty()) {
                trackPaths[match.path] = target.path
                if (match.chosen != null && row != null) {
                    val original = JSONArray(row.getString("identity"))
                    chosenPaths[Triple(match.path, original.getLong(1), original.getLong(2))] = id
                }
            }
            mapped[old]=id
            sources[id]?.let { source ->
                val group = aliases.getOrPut(source) { JSONArray() }
                for (i in 0 until origins.length()) group.put(origins.get(i))
            }
        }
        fun ids(array:JSONArray)=(0 until array.length()).mapNotNull { mapped[array.getString(it)] }
        val prefs=doc.getJSONObject("preferences").also(::validatePreferences)
        val favorites=ids(doc.getJSONArray("favorites")).map(Long::toString).toSet()
        val lists=doc.getJSONArray("playlists")
        val deferred=mutableListOf<String>()
        val planned=(0 until lists.length()).map { lists.getJSONObject(it) }.mapNotNull { list ->
            val name=list.getString("name")
            require(name.isNotBlank()) { "歌单名称无效" }
            val members=list.getJSONArray("members")
            val keys=(0 until members.length()).map { members.getString(it) }
            if(keys.any { it !in mapped }) { deferred+=name; null }
            else name to keys.map(mapped::getValue)
        }
        val readingEdit = store.prepareReadings(doc.getJSONObject("readings"),aliases)
        val existing=playlists.getPlaylistsObservable().firstOrError().await().associateBy { it.name }.toMutableMap()
        val createdIds = mutableListOf<Long>()
        try {
            for((name,members) in planned){
                // Preserve a conflicting local list and reuse an identical previous import.
                var suffix=0
                while(true){
                    val candidate=when(suffix){0->name;1->name+"（导入）";else->name+"（导入 "+suffix+"）"}
                    val list=existing[candidate]
                    val entries=list?.let { playlists.getCompositionsObservable(it.id,null).firstOrError().await().map { entry->entry.id } }
                    if(entries==members) break
                    if(list==null){
                        val created=playlists.createPlaylist(candidate).await()
                        createdIds += created.id
                        val additions=members.map { tracks.getValue(it) }
                        if(additions.isNotEmpty()) playlists.addCompositionsToPlaylist(additions,created,false,false).await()
                        existing[created.name]=created
                        break
                    }
                    suffix++
                }
            }
            study?.let { store.study.merge(it, trackPaths, matches.unresolved.map { it.path }.toSet(), chosenPaths.keys.map { it.first }.toSet()) }
            if (incomingProgress != null) progress.restore(incomingProgress, chosenPaths)
            if (folderProgress != null) store.folderPositions.merge(folderProgress)
            readingEdit.apply()
        } catch (error: Exception) {
            kotlinx.coroutines.withContext(kotlinx.coroutines.NonCancellable) {
                for (id in createdIds.asReversed()) {
                    try { playlists.deletePlaylist(id) }
                    catch (rollback: Exception) {
                        error.addSuppressed(rollback)
                    }
                }
            }
            if (error.suppressed.isNotEmpty()) throw IllegalStateException("部分歌单未能撤销，请检查导入的歌单", error)
            throw error
        }
        return Result(favorites,prefs,missing.toList(),deferred)
    }
}
