@file:Suppress("INVISIBLE_MEMBER", "INVISIBLE_REFERENCE")

package com.github.anrimian.musicplayer.qa

import android.app.Instrumentation
import android.content.ContentValues
import android.content.Context
import android.content.ContextWrapper
import android.content.pm.ApplicationInfo
import android.database.sqlite.SQLiteDatabase
import android.net.Uri
import android.provider.DocumentsContract
import androidx.room.Room
import com.github.anrimian.musicplayer.data.database.LibraryDatabase
import com.github.anrimian.musicplayer.data.database.dao.play_queue.PlayQueueDaoWrapper
import com.github.anrimian.musicplayer.data.database.entities.play_queue.PlayQueueEntity
import com.github.anrimian.musicplayer.domain.models.composition.InitialSource
import com.github.anrimian.musicplayer.domain.models.composition.LocalFileStatus
import com.github.anrimian.musicplayer.ui.learning.LearningFile
import com.github.anrimian.musicplayer.ui.learning.LearningStore
import com.github.anrimian.musicplayer.ui.v12.LegacyUiPreferences
import com.github.anrimian.musicplayer.ui.v12.StudyRecords
import com.github.anrimian.musicplayer.ui.v12.canonicalTrackSource
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.util.UUID

object Review143Regression {
    @JvmStatic fun run(test: Instrumentation): String {
        val base = test.targetContext
        val prefix = "review143-" + UUID.randomUUID()
        val directory = File(base.cacheDir, prefix).apply { check(mkdir()) }
        val used = mutableSetOf<String>()
        val context = object : ContextWrapper(base) {
            override fun getApplicationInfo() = ApplicationInfo(base.applicationInfo).also { it.dataDir = directory.path }
            override fun getSharedPreferences(name: String, mode: Int) =
                base.getSharedPreferences("$prefix-$name", mode).also { used.add("$prefix-$name") }
        }
        return try {
            migrationAndBookmarks(context, directory)
            folderResume(context)
            queue(base)
            "PASS WebView first migration and earlier-import repair\n" +
                "PASS bookmark URI identity and preservation of edits and deletions\n" +
                "PASS portable progress, missing metadata and file replacement\n" +
                "PASS sparse ordered and shuffled queue, move, undo and clear\n"
        } finally {
            used.forEach(base::deleteSharedPreferences)
            directory.deleteRecursively()
        }
    }

    private fun migrationAndBookmarks(context: Context, directory: File) {
        val root = "/storage/emulated/0/Music/RJ123456"
        val other = "/storage/emulated/0/Music/RJ999999"
        val filename = "100% 日本語.wav"
        val authority = "com.android.externalstorage.documents"
        val tree = DocumentsContract.buildTreeDocumentUri(authority, "primary:Music")
        val documentId = "primary:Music/RJ123456/$filename"
        val treeUri = DocumentsContract.buildDocumentUriUsingTree(tree, documentId).toString()
        val singleUri = DocumentsContract.buildDocumentUri(authority, documentId).toString()
        val source = "$root/$filename"
        for (uri in listOf(treeUri, singleUri, Uri.fromFile(File(source)).toString(), "/sdcard/Music/RJ123456/$filename")) {
            check(canonicalTrackSource(uri) == source)
        }
        val opaque = "content://example.other/documents/12"
        check(canonicalTrackSource(opaque) == opaque)
        fun work(key: String, name: String, actor: String) = JSONObject().put("key", key)
            .put("name", name).put("actor", actor).put("version", "").put("circle", "")
        val saved = work(root, "原来的作品名", "原来的声优")
        val second = work(other, "另一部作品", "另一位声优")
        val bookmark = JSONObject().put("key", "b1").put("name", "书签").put("source", treeUri)
            .put("title", filename).put("created", 2000L).put("start", 1000L)
        val folder = File(directory, "app_webview/Default/Local Storage").apply { check(mkdirs()) }
        SQLiteDatabase.openOrCreateDatabase(File(folder, "https_app.dlsound.local_0.localstorage"), null).use { db ->
            db.execSQL("CREATE TABLE ItemTable (key TEXT, value TEXT)")
            for ((key, row) in listOf("bookmarks/b1" to bookmark, "works/$root" to saved, "works/$other" to second)) {
                db.insertOrThrow("ItemTable", null, ContentValues().apply {
                    put("key", "dlsound/$key")
                    put("value", row.toString())
                })
            }
        }
        val study = StudyRecords(context)
        fun record(key: String): JSONObject {
            val works = study.list("works")
            return (0 until works.length()).map(works::getJSONObject).single { it.getString("key") == key }
        }
        check(LegacyUiPreferences.migrate(context, study))
        check(record(root).getString("name") == saved.getString("name"))
        check(study.export().getJSONArray("bookmarks").getJSONObject(0).getString("source") == source)
        check(study.update("works", root, work(root, "RJ123456", "").toString(), false))
        check(study.update("works", other, work(other, "用户改过", "保留").toString(), false))
        check(study.update("bookmarks", "b1", null, false))
        val prefs = context.getSharedPreferences("dlsound-player", 0)
        check(prefs.edit().remove("native-ui-import-2").commit())
        check(LegacyUiPreferences.migrate(context, study))
        check(record(root).getString("actor") == saved.getString("actor"))
        check(record(other).getString("name") == "用户改过")
        check(study.list("bookmarks").length() == 0)
        check(!LegacyUiPreferences.migrate(context, study))
        check(study.update("works", root, null, false))
        check(prefs.edit().remove("native-ui-import-2").commit())
        check(!LegacyUiPreferences.migrate(context, study))
        check(study.list("works").length() == 1)
    }

    private fun folderResume(context: Context) {
        val store = LearningStore(context)
        val positions = store.folderPositions
        val uri = "content://review143/track"
        fun file(size: Long, modified: Long = 0L) = LearningFile(uri, "test.wav", false, size, modified)
        check(!positions.bind(uri, "provider", "dir/test.wav", 0, 1500))
        store.savePosition(uri, 3400)
        check(!store.checkFileVersion(file(0)))
        check(!positions.bind(uri, "provider", "dir/test.wav", 100, 3400))
        check(!store.checkFileVersion(file(100, 10)))
        check(store.position(uri) == 3400L)
        check(!positions.bind(uri, "provider", "dir/test.wav", 0, 0))
        check(!store.checkFileVersion(file(0)))
        check(store.position(uri) == 3400L)
        positions.merge(listOf(JSONArray(listOf("provider", "dir/test.wav", 200, 8100, 1234))))
        val restored = positions.rebindKnownFile(uri, 200)
        check(restored && store.checkFileVersion(file(200, 11), restored))
        check(store.position(uri) == 8100L)
        check(!positions.rebindKnownFile(uri, 300))
        check(store.checkFileVersion(file(300, 12)))
        check(store.position(uri) == 0L)
        check(positions.rebindKnownFile(uri, 100))
        check(store.position(uri) == 3400L)
    }

    private fun queue(context: Context) {
        val db = Room.inMemoryDatabaseBuilder(context, LibraryDatabase::class.java).build()
        try {
            val sql = db.openHelper.writableDatabase
            val dao = db.playQueueDao()
            val queue = PlayQueueDaoWrapper(db, dao)
            val normal = listOf(0, 5, 15, 24, 80)
            val shuffled = listOf(60, 48, 9, 2, 0)
            for (i in normal.indices) {
                val id = (i + 1).toLong()
                sql.execSQL("""INSERT INTO compositions (id,fileName,duration,size,addedTime,modifiedTime,
                    storageModifyTime,lastScanTime,missingTime,coverModifyTime,localFileStatus,initialSource)
                    VALUES (?, ?, 1000, 10, 0, 0, 0, 0, 0, 0, ?, ?)""",
                    arrayOf<Any>(id, "track-$id", LocalFileStatus.AVAILABLE.id, InitialSource.LOCAL.id))
                dao.insertItem(PlayQueueEntity(id, id, normal[i], shuffled[i]))
            }
            fun window(random: Boolean) = queue.getWindowPlayQueueObservable(3, random, true, 1, 2)
                .blockingFirst().map { it.itemId }
            check(window(false) == listOf(2L, 3L, 4L))
            check(window(true) == listOf(4L, 3L, 2L))
            queue.moveItem(3, 5, false)
            check(window(false) == listOf(5L, 3L))
            queue.deleteItem(3)
            dao.insertItem(PlayQueueEntity(6, 1, 80, 9))
            check(queue.restoreDeletedItem() == 3L)
            check(dao.getPosition(6) == 81 && dao.getShuffledPosition(6) == 10)
            check(queue.restoreDeletedItem() == null)
            queue.deleteItem(3)
            queue.deletePlayQueue()
            check(queue.restoreDeletedItem() == null && dao.getPlayQueueSize() == 0)
        } finally {
            db.close()
        }
    }
}
