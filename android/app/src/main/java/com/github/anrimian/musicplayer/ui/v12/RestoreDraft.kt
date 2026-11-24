package com.github.anrimian.musicplayer.ui.v12

import android.content.Context
import android.util.AtomicFile
import com.github.anrimian.musicplayer.ui.learning.SafLearningFiles
import java.io.File

/** Keep the selected source independent of the document provider across process restarts. */
internal class RestoreDraft(context: Context) {
    private val file = AtomicFile(File(context.filesDir, "library-restore-draft.json"))
    private val prefs = context.getSharedPreferences("library-restore-draft", Context.MODE_PRIVATE)
    val exists get() = file.baseFile.exists() || File(file.baseFile.path + ".bak").exists()
    fun source(): String = file.openRead().use(SafLearningFiles::readText)
    fun keyMissing(key: String) = prefs.getString("source", null) != key
    fun saveSource(text: String, key: String) {
        val out = file.startWrite()
        try {
            out.write(text.toByteArray(Charsets.UTF_8))
            file.finishWrite(out)
        } catch (e: Exception) { file.failWrite(out); throw e }
        if (prefs.getString("source", null) != key) check(prefs.edit().clear().putString("source",key).commit())
    }
    fun choices(key: String): Map<String,String> {
        if (key != prefs.getString("source", null)) return emptyMap()
        return prefs.all.entries.filter { it.key.startsWith("track/") && it.value is String }
            .associate { it.key.removePrefix("track/") to it.value as String }
    }
    fun choose(key: String, old: String, track: LocalBackupTrack) {
        check(prefs.getString("source", null) == key)
        prefs.edit().putString("track/" + old, track.selection).apply()
    }
    fun alreadyApplied(key: String) = key == prefs.getString("applied", null)
    fun markApplied(key: String) { check(prefs.edit().putString("applied", key).commit()) }
    fun clear() { file.delete(); prefs.edit().clear().apply() }
}
