package com.github.anrimian.musicplayer.ui.v12

import com.github.anrimian.musicplayer.data.database.dao.compositions.CompositionsDao
import com.github.anrimian.musicplayer.data.database.entities.play_queue.FilePositionEntity
import com.github.anrimian.musicplayer.ui.learning.LearningStore
import org.json.JSONArray
import org.json.JSONObject
import kotlin.math.abs

/** Paths distinguish alternate editions whose audio has the same name, size and duration. */
internal class LibraryProgress(private val store: LearningStore, private val dao: CompositionsDao,
                               private val tracks: Map<Long, JSONObject>) {
    data class Record(val path: String, val size: Long, val duration: Long, val position: Long,
                      val heard: Long, val root: String, val duplicate: Boolean) {
        fun json() = JSONObject().put("path", path).put("size", size).put("duration", duration)
            .put("position", position).put("heard", heard).put("root", root).put("duplicate", duplicate)
    }

    private fun path(track: JSONObject) = LibraryBackup.folderPath(track) + "/" + track.getString("fileName")
    private val candidates = tracks.entries.groupBy { it.value.getString("fileName") to it.value.getLong("size") }
    private fun works(): Map<String,String> {
        val works = store.study.list("works")
        return buildMap {
            for (i in 0 until works.length()) {
                val work = works.getJSONObject(i)
                val key = work.getString("key")
                put(key, key)
                put(work.optString("origin", key), key)
            }
        }
    }
    private fun workRoot(path: String, known: Set<String>): String {
        var dir = path.substringBeforeLast('/', "")
        while (dir.isNotEmpty()) {
            if (dir in known || rj.containsMatchIn(dir.substringAfterLast('/'))) return dir
            dir = dir.substringBeforeLast('/', "")
        }
        return ""
    }
    fun export(live: FilePositionEntity?): JSONArray {
        val known = works().values.toSet()
        val records = read(store.pendingProgress).toMutableList()
        for (entry in dao.filePositions() + listOfNotNull(live)) {
            val track = tracks[entry.audioId] ?: continue
            val path = path(track)
            val size = track.getLong("size")
            val key = track.getString("fileName") to size
            records += Record(path, size, track.getLong("duration"), entry.trackPosition.coerceAtLeast(0),
                entry.lastHeard, workRoot(path, known), candidates.getValue(key).size > 1)
        }
        return JSONArray(newest(records).map(Record::json))
    }

    fun restore(incoming: List<Record>, choices: Map<Triple<String,Long,Long>, Long> = emptyMap()) {
        val roots = works()
        val pending = JSONArray()
        val missingRoots = mutableSetOf<String>()
        val mapped = mutableListOf<FilePositionEntity>()
        for (record in newest(read(store.pendingProgress) + incoming)) {
            val possible = candidates[record.path.substringAfterLast('/') to record.size].orEmpty()
                .filter { abs(it.value.getLong("duration") - record.duration) <= 1000 }
            val relative = record.path.removePrefix(record.root)
            val destination = roots[record.root]?.let { it + relative }
            val match = possible.singleOrNull { path(it.value) == (destination ?: record.path) }
                ?: if (destination != null && destination != record.path) null else {
                    val suffix = "/" + record.root.substringAfterLast('/') + relative
                    possible.singleOrNull { record.root.isNotEmpty() && path(it.value).endsWith(suffix) }
                        ?: possible.singleOrNull()?.takeUnless { record.duplicate }
                }
            val id = choices[Triple(record.path, record.size, record.duration)] ?: match?.key
            if (id == null) {
                pending.put(record.json())
                if (record.root.isNotEmpty() && record.root !in roots) missingRoots += record.root
            } else {
                val duration = tracks.getValue(id).getLong("duration")
                val ms = if (duration > 0 && record.position >= duration) 0L else record.position
                mapped += FilePositionEntity(id, ms, record.heard)
            }
        }
        dao.restorePositions(mapped)
        store.pendingProgress = pending
        // Automatically recognised RJ works can have listening history before any metadata is edited.
        for (root in missingRoots) {
            val work = JSONObject().put("key", root).put("name", root.substringAfterLast('/'))
                .put("actor", "").put("circle", "").put("version", "")
            check(store.study.update("works", root, work.toString(), onlyNew = true))
        }
    }

    companion object {
        private val rj = Regex("RJ[0-9]{5,}", RegexOption.IGNORE_CASE)
        private fun newest(records: List<Record>) = records.groupBy { Triple(it.path, it.size, it.duration) }
            .values.map { group -> group.maxBy { it.heard } }
        fun read(rows: JSONArray): List<Record> = (0 until rows.length()).map { i ->
            val row = rows.getJSONObject(i)
            fun number(key: String): Long {
                val value = row.get(key) as? Number ?: error("续听数据无效")
                require((value is Long || value is Int) && value.toLong() >= 0) { "备份中的续听时间或文件信息无效" }
                return value.toLong()
            }
            val path = row.get("path") as? String ?: error("续听文件路径无效")
            val root = row.get("root") as? String ?: error("续听作品目录无效")
            require(path.startsWith('/') && path.substringAfterLast('/').isNotBlank() &&
                (root.isEmpty() || (root.startsWith('/') && path.startsWith(root + "/"))))
            val duplicate = row.get("duplicate") as? Boolean ?: error("续听文件信息无效")
            Record(path, number("size"), number("duration"), number("position"), number("heard"), root, duplicate)
        }
    }
}
