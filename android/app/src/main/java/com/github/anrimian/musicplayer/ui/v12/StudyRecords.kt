package com.github.anrimian.musicplayer.ui.v12

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

/** One row per preference, shared by both players. Imports and directory moves use one editor. */
internal class StudyRecords(context: Context) {
    private val prefs = context.getSharedPreferences("dlsound-study", Context.MODE_PRIVATE)
    companion object {
        private val lock = Any()
        private val rj = Regex("RJ[0-9]{5,}", RegexOption.IGNORE_CASE)
        val collections = listOf("bookmarks", "works")
    }

    private fun rows(collection: String): List<JSONObject> {
        require(collection in collections)
        return prefs.all.filterKeys { it.startsWith("$collection/") }.values.map {
            normalizeSource(collection, JSONObject(it as String))
        }
    }
    private fun normalizeSource(collection: String, row: JSONObject): JSONObject {
        if (collection == "bookmarks") row.put("source", canonicalTrackSource(row.getString("source")))
        return row
    }
    fun list(collection: String) = synchronized(lock) { JSONArray(rows(collection)) }
    fun export() = synchronized(lock) { JSONObject().apply {
        for (collection in collections) put(collection,list(collection))
    } }

    private fun inferredWork(source: String): JSONObject? {
        var parent = source.substringBeforeLast('/', "")
        while (parent.startsWith("/")) {
            if (prefs.contains("works/$parent")) return null
            val name = parent.substringAfterLast('/')
            if (rj.containsMatchIn(name)) return JSONObject().put("key",parent).put("name",name)
                .put("actor","").put("circle","").put("version","")
            parent = parent.substringBeforeLast('/', "")
        }
        return null
    }

    private fun validate(collection: String, row: JSONObject) {
        fun text(field: String): String {
            val value = row.get(field)
            require(value is String && value.length <= 8192) { "备份中的文字字段无效" }
            return value
        }
        fun milliseconds(field: String): Long {
            val value = row.get(field)
            require(value is Number && value.toLong() >= 0 && value.toDouble() == value.toLong().toDouble()) { "时间无效" }
            return value.toLong()
        }
        require(collection in collections && text("key").isNotBlank() && text("name").isNotBlank())
        if (collection == "works") {
            require(row.getString("key").startsWith("/"))
            text("actor"); text("circle"); text("version")
            if (row.has("origin")) text("origin")
        } else {
            require(text("source").isNotBlank())
            text("title"); milliseconds("created")
            val start = milliseconds("start")
            if (row.has("end")) require(milliseconds("end") > start)
        }
    }
    fun update(collection: String, key: String, raw: String?, onlyNew: Boolean): Boolean = synchronized(lock) {
        require(collection in collections && key.isNotEmpty())
        val id = "$collection/$key"
        val edit = prefs.edit()
        if (raw == null) edit.remove(id) else {
            val row = JSONObject(raw)
            validate(collection, row)
            normalizeSource(collection, row)
            require(row.getString("key") == key)
            if (onlyNew && prefs.contains(id)) return@synchronized true
            edit.putString(id, row.toString())
            if (collection == "bookmarks") inferredWork(row.getString("source"))?.let { work ->
                edit.putString("works/" + work.getString("key"),work.toString())
            }
        }
        edit.commit()
    }
    /** A previous importer could infer a blank RJ work before reading that work's real row. */
    fun importLegacy(collection: String, key: String, row: JSONObject, repairOnly: Boolean): Boolean = synchronized(lock) {
        val existing = prefs.getString("$collection/$key", null)
        if (repairOnly) {
            if (collection != "works" || existing == null || !rj.containsMatchIn(key.substringAfterLast('/'))) return false
            val stored = JSONObject(existing)
            if (stored.optString("name") != key.substringAfterLast('/') || stored.has("origin") ||
                listOf("actor", "circle", "version").any { stored.optString(it).isNotEmpty() }) return false
            if (listOf("name", "actor", "circle", "version", "origin").all {
                    stored.optString(it) == row.optString(it)
                }) return false
        } else if (existing != null) return false
        check(update(collection, key, row.toString(), onlyNew = false)) { "未能写入旧版作品或书签" }
        true
    }

    fun check(doc: JSONObject) {
        for (collection in collections) {
            val array = doc.getJSONArray(collection)
            for (i in 0 until array.length()) validate(collection, array.getJSONObject(i))
        }
    }
    fun merge(doc: JSONObject, trackPaths: Map<String,String>) = synchronized(lock) {
        val edit = prefs.edit()
        val works = rows("works").associateBy { it.optString("origin", it.getString("key")) }
        val imported = doc.getJSONArray("works")
        val roots = mutableMapOf<String,String>()
        for (i in 0 until imported.length()) {
            val work = imported.getJSONObject(i)
            val key = work.getString("key")
            roots[key] = work.optString("origin", key)
            if (!prefs.contains("works/$key") && work.optString("origin", key) !in works)
                edit.putString("works/$key", work.toString())
        }
        val bookmarks = doc.getJSONArray("bookmarks")
        for (i in 0 until bookmarks.length()) {
            val row = normalizeSource("bookmarks", JSONObject(bookmarks.getJSONObject(i).toString()))
            val id = "bookmarks/" + row.getString("key")
            if (prefs.contains(id)) continue
            val source = row.getString("source")
            val root = roots.keys.filter { source.startsWith(it + "/") }.maxByOrNull { it.length }
            if (root == null) trackPaths[source]?.let { row.put("source", it) }
            else {
                works[roots[root]]?.let { row.put("source", it.getString("key") + source.removePrefix(root)) }
            }
            edit.putString(id, row.toString())
        }
        check(edit.commit()) { "未能保存作品和书签" }
    }
    fun move(old: String, dest: String): Boolean = synchronized(lock) {
        require(dest.startsWith("/") && old != dest && !dest.startsWith("$old/"))
        val work = JSONObject(requireNotNull(prefs.getString("works/$old", null)))
        require(!prefs.contains("works/$dest")) { "目标目录已有作品资料" }
        val edit = prefs.edit().remove("works/$old")
        if (!work.has("origin")) work.put("origin", old)
        edit.putString("works/$dest", work.put("key", dest).toString())
        val nested = rows("works").map { it.getString("key") }.filter { it.startsWith("$old/") }
        for (mark in rows("bookmarks")) {
            val source = mark.getString("source")
            if (source.startsWith("$old/") && nested.none { source.startsWith("$it/") }) {
                mark.put("source", dest + source.removePrefix(old))
                edit.putString("bookmarks/" + mark.getString("key"), mark.toString())
            }
        }
        edit.commit()
    }
}
