package com.github.anrimian.musicplayer.ui.v12

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
    private fun identity(row:JSONObject)=JSONArray().put(row.getString("fileName")).put(row.getLong("size")).put(row.getLong("duration")).toString()
    private fun uris():Map<Long,String> = rows.keys.chunked(400).flatMap { ids ->
        component.storageSourceRepository().getStorageSources(ids).blockingGet().map { (id,source) -> id to component.contentSourceHelper().createUri(source).toString() }
    }.toMap()

    suspend fun export(prefs:JSONObject,favorites:Set<String>):JSONObject {
        val sources=uris()
        val catalog=JSONObject()
        rows.forEach { (id,row) -> catalog.put(id.toString(),JSONObject().put("identity",identity(row))
            .put("origins",sources[id]?.let(store::backupOrigins) ?: JSONArray())) }
        val lists=JSONArray()
        for(list in playlists.getPlaylistsObservable().firstOrError().await()){
            val members=playlists.getCompositionsObservable(list.id,null).firstOrError().await()
            lists.put(JSONObject().put("name",list.name).put("members",JSONArray(members.map { it.id.toString() })))
        }
        return JSONObject().put("format","DLSound/1").put("tracks",catalog).put("favorites",JSONArray(favorites))
            .put("playlists",lists).put("preferences",prefs).put("readings",store.backupReadings())
    }

    data class Result(val favorites:Set<String>,val preferences:JSONObject,val missing:List<String>)
    suspend fun restore(doc:JSONObject):Result {
        require(doc.optString("format")=="DLSound/1") { "无法识别此备份版本" }
        val byFile=rows.entries.groupBy { it.value.getString("fileName") to it.value.getLong("size") }
        val catalog=doc.getJSONObject("tracks")
        val sources=uris()
        val aliases=mutableMapOf<String,JSONArray>()
        val missing=linkedSetOf<String>()
        val mapped=mutableMapOf<String,Long>()
        for(old in catalog.keys()){
            val row=catalog.getJSONObject(old)
            val key=row.getString("identity")
            val fields=JSONArray(key)
            val matches=byFile[fields.getString(0) to fields.getLong(1)]?.filter { kotlin.math.abs(it.value.getLong("duration")-fields.getLong(2))<=1000 }
            val id=matches?.singleOrNull()?.key
            if(id==null){missing.add(JSONArray(key).getString(0)+if(matches.isNullOrEmpty()) "（未找到）" else "（有多个匹配）");continue}
            mapped[old]=id
            sources[id]?.let { aliases[it]=row.getJSONArray("origins") }
        }
        fun ids(array:JSONArray)=(0 until array.length()).mapNotNull { mapped[array.getString(it)] }
        val prefs=doc.getJSONObject("preferences")
        val favorites=ids(doc.getJSONArray("favorites")).map(Long::toString).toSet()
        val lists=doc.getJSONArray("playlists")
        val planned=(0 until lists.length()).map { lists.getJSONObject(it) }.map { list ->
            val name=list.getString("name")
            require(name.isNotBlank()) { "歌单名称无效" }
            name to ids(list.getJSONArray("members"))
        }
        store.restoreReadings(doc.getJSONObject("readings"),aliases)
        val existing=playlists.getPlaylistsObservable().firstOrError().await().associateBy { it.name }.toMutableMap()
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
                    try {
                        val additions=members.map { tracks.getValue(it) }
                        if(additions.isNotEmpty()) playlists.addCompositionsToPlaylist(additions,created,false,false).await()
                        existing[created.name]=created
                    }catch(e:Exception){playlists.deletePlaylist(created.id);throw e}
                    break
                }
                suffix++
            }
        }
        return Result(favorites,prefs,missing.toList())
    }
}
