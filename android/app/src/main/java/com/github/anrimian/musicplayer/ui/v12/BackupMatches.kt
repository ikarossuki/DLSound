package com.github.anrimian.musicplayer.ui.v12

import org.json.JSONArray
import org.json.JSONObject
import kotlin.math.abs

internal data class LocalBackupTrack(val id: Long, val path: String, val name: String, val size: Long, val duration: Long) {
    // MediaStore IDs are device-local and can be reused after a rescan.
    val selection: String get() = JSONArray().put(path).put(size).put(duration).toString()
    val folder: String get() = path.substringBeforeLast('/')
}

internal data class BackupTrackMatch(val key: String, val name: String, val path: String,
    val candidates: List<LocalBackupTrack>, val automatic: LocalBackupTrack?, val chosen: LocalBackupTrack?) {
    val resolved get() = chosen ?: automatic
}

internal class BackupMatches(doc: JSONObject, rows: Map<Long, JSONObject>, choices: Map<String, String>) {
    val local = rows.map { (id, row) ->
        val name = row.getString("fileName")
        LocalBackupTrack(id, LibraryBackup.folderPath(row) + "/" + name, name, row.getLong("size"), row.getLong("duration"))
    }.sortedBy { it.path }
    val tracks: List<BackupTrackMatch>
    init {
        require(doc.optString("format") == "DLSound/1") { "无法识别此备份版本" }
        val byName = local.groupBy { it.name to it.size }
        val selected = if (choices.isEmpty()) emptyMap() else local.groupBy { it.selection }
        val catalog = doc.getJSONObject("tracks")
        val keys = catalog.keys().asSequence().toCollection(linkedSetOf())
        // Older snapshots can retain a playlist slot after its audio disappeared from the source catalog.
        val lists = doc.optJSONArray("playlists") ?: JSONArray()
        for (i in 0 until lists.length()) {
            val members = lists.getJSONObject(i).getJSONArray("members")
            for (j in 0 until members.length()) keys.add(members.getString(j))
        }
        tracks = keys.map { key ->
            val source = if (catalog.has(key)) catalog.getJSONObject(key) else null
            val fields = source?.let { JSONArray(it.getString("identity")) }
            val name = fields?.getString(0) ?: "备份音轨 #$key"
            val path = source?.optString("path").orEmpty()
            val candidates = if (fields == null) emptyList() else {
                val duration = fields.getLong(2)
                byName[name to fields.getLong(1)].orEmpty().filter { abs(it.duration - duration) <= 1000 }
            }
            val automatic = candidates.singleOrNull { it.path == path } ?: candidates.singleOrNull()
            val chosen = choices[key]?.let { selected[it]?.singleOrNull() }
            val fallback = automatic.takeUnless { choices.containsKey(key) && chosen == null }
            BackupTrackMatch(key, name, path, candidates, fallback, chosen)
        }
    }
    val unresolved get() = tracks.filter { it.resolved == null }
    val review get() = tracks.filter { it.automatic == null || it.chosen != null }
}
