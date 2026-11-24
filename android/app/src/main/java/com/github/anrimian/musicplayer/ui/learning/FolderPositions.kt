package com.github.anrimian.musicplayer.ui.learning

import android.content.Context
import org.json.JSONArray

/** A document grant is device-specific. Match by the provider's root, relative names and size. */
internal class FolderPositions(context: Context) {
    private val prefs = context.getSharedPreferences("dlsound-folder-progress", Context.MODE_PRIVATE)
    private fun key(row: JSONArray) = "file-" + textFingerprint(JSONArray().put(row.getString(0))
        .put(row.getString(1)).put(row.getLong(2)).toString())

    /** Return true if switching to an identity that already has its own saved progress. */
    fun bind(uri: String, root: String, relativeName: String, size: Long, local: Long): Boolean = synchronized(lock) {
        val previous = binding(uri)
        val sameFile = previous?.let { prefs.getString(it, null) }?.let(::JSONArray)
            ?.takeIf { it.getString(0) == root && it.getString(1) == relativeName }
        val knownSize = if (size > 0) size else sameFile?.getLong(2) ?: 0L
        val row = JSONArray().put(root).put(relativeName).put(knownSize).put(local).put(0L)
        val key = key(row)
        val exists = prefs.contains(key)
        val editor = prefs.edit().putString("uri-" + textFingerprint(uri), key)
        if (!exists) {
            if (sameFile != null && sameFile.getLong(2) == 0L) {
                row.put(3, sameFile.getLong(3)).put(4, sameFile.getLong(4))
            } else if (previous != null && previous != key) {
                row.put(3, 0L)
            }
            editor.putString(key, row.toString())
        }
        editor.apply()
        previous != key && exists
    }
    fun rebindKnownFile(uri: String, size: Long): Boolean = synchronized(lock) {
        if (size <= 0) return false
        val stored = binding(uri)?.let { prefs.getString(it, null) } ?: return false
        val old = JSONArray(stored)
        old.getLong(2) != size && bind(uri, old.getString(0), old.getString(1), size, 0L)
    }
    private fun binding(uri: String) = prefs.getString("uri-" + textFingerprint(uri), null)
    fun position(uri: String): Long? = synchronized(lock) {
        binding(uri)?.let { prefs.getString(it, null) }?.let { JSONArray(it).getLong(3) }
    }
    fun remember(uri: String, position: Long) = synchronized(lock) {
        val key = binding(uri) ?: return@synchronized
        val row = JSONArray(prefs.getString(key, null) ?: return@synchronized)
        row.put(3, position).put(4, System.currentTimeMillis())
        prefs.edit().putString(key, row.toString()).apply()
    }
    fun export() = synchronized(lock) {
        JSONArray(prefs.all.filterKeys { it.startsWith("file-") }.values.map { JSONArray(it as String) })
    }
    fun merge(rows: List<JSONArray>) = synchronized(lock) {
        val edit = prefs.edit()
        for (row in rows.groupBy(::key).values.map { group -> group.maxBy { it.getLong(4) } }) {
            val key = key(row)
            val local = prefs.getString(key, null)
            if (local == null || JSONArray(local).getLong(4) < row.getLong(4)) edit.putString(key, row.toString())
        }
        check(edit.commit()) { "手选文件夹的进度保存失败" }
    }
    companion object {
        private val lock = Any()
        fun read(array: JSONArray) = (0 until array.length()).map { i ->
            array.getJSONArray(i).also { row ->
                require(row.length() == 5 && (row.get(0) as? String)?.isNotBlank() == true &&
                    (row.get(1) as? String)?.isNotBlank() == true &&
                    (2..4).all { n -> val value = row.get(n); (value is Int || value is Long) && row.getLong(n) >= 0 }) {
                    "手选文件夹的续听记录无效"
                }
            }
        }
    }
}
