@file:Suppress("INVISIBLE_MEMBER", "INVISIBLE_REFERENCE")

package com.github.anrimian.musicplayer.qa

import android.app.Application
import android.app.Instrumentation
import android.net.Uri
import android.os.FileObserver
import android.os.SystemClock
import com.github.anrimian.musicplayer.ui.learning.*
import com.github.anrimian.musicplayer.ui.v12.LibraryBackup
import kotlinx.coroutines.runBlocking
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.util.UUID
import java.util.concurrent.atomic.AtomicInteger

/** Runs inside the debug app on the dedicated phone AVD with the DLSoundMatrix audio fixtures. */
object ReviewRegression {
    @JvmStatic fun run(test: Instrumentation): String {
        val context = test.targetContext
        val store = LearningStore(context)
        val component = com.github.anrimian.musicplayer.di.Components.getAppComponent()
        val output = StringBuilder()
        fun passed(name: String) { output.appendLine("PASS $name"); android.util.Log.i("DLReview", name) }
        // Keep the real Android volume list and vary only its query cursor.
        var readable = false
        val provider = object : android.content.ContentProvider() {
            override fun onCreate() = true
            override fun getType(uri: Uri): String? = null
            override fun insert(uri: Uri, values: android.content.ContentValues?): Uri? = null
            override fun delete(uri: Uri, selection: String?, args: Array<out String>?) = 0
            override fun update(uri: Uri, values: android.content.ContentValues?, selection: String?, args: Array<out String>?) = 0
            override fun query(uri: Uri, columns: Array<out String>?, selection: String?, args: Array<out String>?, order: String?) =
                if (readable) android.database.MatrixCursor(columns) else null
        }
        provider.attachInfo(context, android.content.pm.ProviderInfo().apply { authority = "media" })
        val resolver = android.content.ContentResolver.wrap(provider)
        val volumeContext = object : android.content.ContextWrapper(context) {
            override fun getContentResolver() = resolver
        }
        val catalog = com.github.anrimian.musicplayer.data.storage.providers.music.SystemAudioCatalogProvider(volumeContext, component.analytics())
        check(catalog.getAudioFiles(0, true, emptySet()) == null)
        readable = true
        check(catalog.getAudioFiles(0, true, emptySet())?.isEmpty() == true)
        passed("02 Android volume query distinguishes unavailable cursor from successful empty result")
        val origin = UUID.randomUUID().toString()
        val track = "review://$origin"
        val malformed = JSONArray().put(JSONArray().put(origin))
        val records = JSONObject().put(origin, JSONObject())
        check(runCatching { store.validateOrigins(records, malformed) }.isFailure)
        val imported = context.getSharedPreferences("dlsound-imported-readings", 0)
        val key = "origins-" + textFingerprint(track)
        imported.edit().putString(key, malformed.toString()).commit()
        try {
            check(LearningStore(context).offset(track, "doc") == 0L)
            check(store.backupOrigins(track).length() == 1)
        } finally { imported.edit().remove(key).commit() }
        passed("03 malformed incoming and persisted aliases")

        val backup = LibraryBackup(store, emptyMap(), emptyMap())
        runBlocking {
            val doc = backup.export(JSONObject().put("theme", "invalid"), emptySet())
            val listName = "review-$origin"
            doc.put("playlists", JSONArray().put(JSONObject().put("name", listName).put("members", JSONArray())))
            check(runCatching { backup.restore(doc) }.isFailure)
            val lists = backup.export(JSONObject(), emptySet()).getJSONArray("playlists")
            check((0 until lists.length()).none { lists.getJSONObject(it).getString("name") == listName })
        }
        passed("04 invalid late preference leaves playlists untouched")
        val prefs = context.getSharedPreferences("review-$origin", 0)
        try {
            prefs.edit().putStringSet("favorites", setOf("removed")).commit()
            prefs.edit().putStringSet("favorites", setOf("new")).commit()
            check(LibraryBackup.mergedFavorites(prefs, setOf("imported")) == setOf("new", "imported"))
        } finally { context.deleteSharedPreferences("review-$origin") }
        passed("05 merge uses live favorites")

        lateinit var model: LearningViewModel
        test.runOnMainSync { model = LearningViewModel(context.applicationContext as Application, incoming = true) }
        val file = File.createTempFile("review-", ".lrc", context.cacheDir)
        val closes = AtomicInteger()
        val observer = object : FileObserver(file.path, CLOSE_NOWRITE) {
            override fun onEvent(event: Int, path: String?) { closes.incrementAndGet() }
        }
        fun awaitState(predicate: () -> Boolean) {
            val end = SystemClock.elapsedRealtime() + 45000
            while (!predicate() && SystemClock.elapsedRealtime() < end) SystemClock.sleep(50)
            check(predicate()) { "Timed out at track " + model.state.value.track?.uri + ", rendered=" + model.state.value.rendered.size }
        }
        fun open(name: String): String {
            val uri = Uri.fromFile(File("/storage/emulated/0/Music/DLSoundReview", name))
            test.runOnMainSync { model.openIncoming(uri) }
            awaitState { model.state.value.track?.uri == uri.toString() && !model.state.value.openingAudio }
            return uri.toString()
        }
        try {
            file.writeText((0 until 1600).joinToString("\n") { "[${it}:00.000]{山|やま}｜山" })
            observer.startWatching()
            val a = open("DLMatrix-mp3-vtt.mp3")
            test.runOnMainSync { model.selectSubtitle(Uri.fromFile(file), a) }
            awaitState { model.state.value.rendered.size == 1600 }
            val first = model.state.value
            val cue = first.rendered.first()
            check(cue.pieces.first().reading == "やま")
            check(closes.get() == 1) { "Manual import closed source ${closes.get()} times" }
            passed("08 and 10 render 1600 Ruby cues and read manual source once")
            val b = open("DLMatrix-wav-vtt.wav")
            test.runOnMainSync { model.selectSubtitle(Uri.fromFile(file), b) }
            awaitState { model.state.value.rendered.size == 1600 }
            val doc = requireNotNull(first.document)
            val piece = cue.pieces.first()
            test.runOnMainSync { model.correct(a, doc.fingerprint, cue.cue.id, 0, "かわ", piece) }
            check(store.correctionsFor(b, doc)(cue.cue, piece) != "かわ")
            passed("07 stale correction refused on second track with identical subtitles")
        } finally {
            observer.stopWatching()
            test.runOnMainSync { model.automaticSubtitle() }
            file.delete()
        }
        runBlocking {
            val songs = component.libraryRepository().getAllCompositionsObservable(null).firstOrError().blockingGet()
                .filter { it.title.startsWith("DLMatrix-") }.distinctBy { it.id }.take(2)
            check(songs.size == 2)
            val playlists = component.playlistsInteractor()
            val name = "QA-review-" + origin
            val list = playlists.createPlaylist(name).blockingGet()
            playlists.addCompositionsToPlaylist(listOf(songs[0], songs[1], songs[0]), list, false, false).blockingGet()
            output.appendLine("TEST_PLAYLIST=" + list.id)
        }
        val max = 9_007_199_254_740_991L
        check(LrcDecoder.decode("[offset:-$max]\n[00:00.000]人").cues.single().startMs == max)
        check(LrcDecoder.decode("[offset:-$max]\n[00:00.001]人").cues.isEmpty())
        passed("19 offset safe-integer boundary")
        return output.toString()
    }
}
