package com.github.anrimian.musicplayer.ui.v12

import com.github.anrimian.musicplayer.domain.interactors.player.PlayerType
import com.github.anrimian.musicplayer.data.models.composition.source.ExternalCompositionSource
import com.github.anrimian.musicplayer.domain.models.composition.source.LibraryCompositionSource
import android.Manifest
import android.content.Intent
import android.content.res.Configuration
import android.graphics.Color
import android.media.MediaMetadataRetriever
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.widget.Toast
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.widget.doAfterTextChanged
import android.widget.LinearLayout
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.data.utils.Permissions
import com.github.anrimian.musicplayer.di.Components
import com.github.anrimian.musicplayer.domain.Constants.PLAY_QUEUE_MAX_ITEMS_COUNT
import com.github.anrimian.musicplayer.domain.models.composition.Composition
import com.github.anrimian.musicplayer.domain.models.composition.CompositionModel
import com.github.anrimian.musicplayer.domain.models.play_queue.PlayQueueItem
import com.github.anrimian.musicplayer.domain.models.player.PlayerState
import com.github.anrimian.musicplayer.ui.learning.*
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers
import io.reactivex.rxjava3.core.Single
import io.reactivex.rxjava3.disposables.CompositeDisposable
import io.reactivex.rxjava3.disposables.Disposable
import io.reactivex.rxjava3.schedulers.Schedulers
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.rx3.await
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.TimeUnit

/** APK-only presentation. All playback/queue/library/subtitle state remains in Android. */
open class PlayerV12Activity : AppCompatActivity() {
    protected open val externalView = false
    protected open val folderView = false
    protected open val restoreExternal = false
    internal val restoresExternal get() = restoreExternal
    private var externalSpeed = 1f
    private var externalRepeat = 0
    private val component get() = Components.getAppComponent()
    private val player get() = component.libraryPlayerInteractor()
    private val playlistService get() = component.playlistsInteractor()
    private val playbackType get() = if (externalView) PlayerType.EXTERNAL else PlayerType.LIBRARY
    private val timer get() = component.sleepTimerInteractor()
    private val subscriptions = CompositeDisposable()
    private val librarySubscriptions = CompositeDisposable()
    private lateinit var screen: NativePlayerScreen
    private lateinit var model: LearningViewModel
    private lateinit var store: LearningStore
    private val appInfo by lazy { packageManager.getPackageInfo(packageName, 0) }
    private val preferences by lazy { getSharedPreferences("dlsound-player", MODE_PRIVATE) }
    private val snapshot = JSONObject()
    private val tracks = ConcurrentHashMap<Long, Composition>()
    internal var catalog = NativeCatalog(emptyList())
        private set
    private val trackJson = ConcurrentHashMap<Long, JSONObject>()
    private var queue = emptyList<PlayQueueItem>()
    internal val transport = NativeTransport()
    private var currentItem: Long? = null
    private var positionUpdates: Disposable? = null
    internal val state: JSONObject get() = snapshot
    internal val learning: LearningState get() = model.state.value
    internal val records: StudyRecords get() = store.study
    internal val isExternal get() = externalView
    internal val isFolderPlayer get() = folderView
    internal fun browser() = JSONObject(preferences.getString("folderBrowser", "{}") ?: "{}")
    internal fun saveBrowser(tree: Boolean, path: String) {
        preferences.edit().putString("folderBrowser", obj("tree" to tree, "path" to path).toString()).apply()
    }
    private var started = false
    private var pickingTrack: String? = null
    private var lastDocument: SubtitleDocument? = null
    private var lastRendered: List<RenderedCue>? = null
    private var lastSubtitleStatus = ""
    private var lastNotice = 0
    internal var libraryAudioFailed = false
        private set

    private val mediaPermission = registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { grants ->
        grants.forEach { (permission,granted) -> preferences.edit().putBoolean("asked-"+permission,!granted).apply() }
        publishPermission(); if (!externalView && Permissions.hasFilePermission(this)) { if (started) component.storageScannerInteractor().rescanStorage() else startLibrary() }
    }
    private var backupBusy=false
    private fun requireBackupCatalog() {
        check(Permissions.hasFilePermission(this) && started && !snapshot.optBoolean("libraryLoading",true)
                && snapshot.optString("sourceError").isEmpty()) { "请先授权并等候曲库成功加载" }
    }
    private val draft by lazy { RestoreDraft(this) }
    internal var restoreSession: RestoreSession? = null
        private set
    private fun libraryBackup() = LibraryBackup(store, trackJson.toMap(), tracks.toMap())
    private fun backupOperation(block: suspend () -> Unit) {
        if (backupBusy) return
        backupBusy = true
        lifecycleScope.launch {
            try { requireBackupCatalog(); block() }
            catch (e: kotlinx.coroutines.CancellationException) { throw e }
            catch (e: Exception) { error("备份操作未完成：" + (e.localizedMessage ?: "请检查文件权限")) }
            finally { backupBusy = false }
        }
    }
    private val saveBackup = registerForActivityResult(ActivityResultContracts.CreateDocument("application/json")) { uri ->
        if (uri != null) backupOperation {
            val backup = libraryBackup()
            val prefs = JSONObject(snapshot.getJSONObject("prefs").toString())
            prefs.put("treeMode", JSONObject(preferences.getString("folderBrowser","{}")).optBoolean("tree"))
            val exportFavorites = preferences.getStringSet("favorites",emptySet()).orEmpty().toSet()
            val activeId = queue.find { it.itemId == currentItem }?.id
            val live = if (activeId != null && transport.playing &&
                component.playerCoordinator().isPlayingLibrarySource(activeId)) {
                val ms = player.getTrackPosition().await()
                if (ms >= 0 && component.playerCoordinator().isPlayingLibrarySource(activeId))
                    com.github.anrimian.musicplayer.data.database.entities.play_queue.FilePositionEntity(activeId, ms, System.currentTimeMillis())
                else null
            } else null
            withContext(Dispatchers.IO){
                val bytes=backup.export(prefs,exportFavorites,live).toString().toByteArray()
                require(bytes.size<=SafLearningFiles.MAX_BYTES) { "备份超过 8 MB，无法导出" }
                contentResolver.openOutputStream(uri,"wt")?.use { it.write(bytes) } ?: throw IllegalStateException("无法写入备份文件")
            }

            MaterialAlertDialogBuilder(dialogContext()).setTitle("导出备份").setMessage("备份文件已保存。").setPositiveButton("完成",null).show()
        }
    }
    private fun pickBackup() = openBackup.launch(arrayOf("application/json","text/plain","application/octet-stream"))
    private fun startRestore() {
        if (!draft.exists) pickBackup()
        else screen.menu("恢复备份", listOf("继续上次匹配" to { reviewBackup(null) }, "选择其他备份" to ::pickBackup))
    }
    internal val hasRestoreDraft get() = draft.exists
    internal fun resumeRestore() {
        if (draft.exists && !snapshot.optBoolean("libraryLoading",true) && snapshot.text("sourceError").isEmpty())
            reviewBackup(null, reopen = true)
    }
    private fun reviewBackup(uri: Uri?, reopen: Boolean = false) = backupOperation {
        val rows = trackJson.toMap()
        val backup = libraryBackup()
        val session = withContext(Dispatchers.IO) {
            val text = if (uri == null) draft.source() else contentResolver.openInputStream(uri)?.use(SafLearningFiles::readText)
                ?: throw IllegalStateException("无法读取备份文件")
            val doc = JSONObject(text)
            val key = textFingerprint(text)
            val matches = BackupMatches(doc, rows, draft.choices(key))
            backup.validateDraft(doc)
            if (uri != null || draft.keyMissing(key)) draft.saveSource(text,key)
            RestoreSession(key, doc, matches)
        }
        restoreSession = session
        if (reopen) { if (screen.route.name in setOf("restoreReview","restoreTrack")) screen.render() }
        else if (uri != null && session.matches.unresolved.isEmpty()) applyRestore(session)
        else if (screen.route.name == "restoreReview") screen.render() else screen.go("restoreReview")
    }
    internal fun chooseBackupTrack(old: String, local: LocalBackupTrack) = backupOperation {
        val session = restoreSession ?: return@backupOperation
        val rows = trackJson.toMap()
        val matches = withContext(Dispatchers.IO) {
            draft.choose(session.key, old, local)
            BackupMatches(session.doc, rows, draft.choices(session.key))
        }
        restoreSession = session.copy(matches = matches)
        if (screen.route == NativePage("restoreTrack", old)) screen.back()
    }
    internal fun finishRestore() = backupOperation { restoreSession?.let { applyRestore(it) } }
    private suspend fun applyRestore(session: RestoreSession) {
        val backup = libraryBackup()
        val result = withContext(Dispatchers.IO) { backup.restore(session.doc, draft.choices(session.key)) }
        if (!draft.alreadyApplied(session.key)) {
            for(key in listOf("theme","language","font","ruby","rubyScale","depth","speed","repeat","shuffle","librarySort")){
                if(result.preferences.has(key)) preference(obj("key" to key,"value" to result.preferences.get(key)))
            }
            if (result.preferences.has("treeMode")) preferences.edit().putString("folderBrowser",
                obj("tree" to result.preferences.optBoolean("treeMode"),"path" to "").toString()).apply()
        }
        preferences.edit().putStringSet("favorites",LibraryBackup.mergedFavorites(preferences,result.favorites)).apply()
        publishPreferences(); publishOffset(); model.reloadSubtitle()
        emit(obj("studyRevision" to System.nanoTime().toString(), "browserRevision" to System.nanoTime().toString()))
        val locations = trackJson.values.map(LibraryBackup::folderPath).toSet()
        val roots = mutableSetOf<String>()
        for (location in locations) {
            var path = location
            while (path.isNotEmpty() && roots.add(path)) path = path.substringBeforeLast('/', "")
        }
        val works = store.study.list("works")
        val lostWorks = (0 until works.length()).map(works::getJSONObject).filter { it.getString("key") !in roots }
        val partial = result.missing.isNotEmpty()
        val message = buildString {
            append(if(partial) "已恢复可匹配的资料，剩余音轨可继续补选。" else "恢复完成。")
            if (result.deferredLists.isNotEmpty()) append("\n等待补选的歌单：" + result.deferredLists.joinToString("、"))
            if (lostWorks.isNotEmpty()) append("\n请在作品库重新关联目录：" + lostWorks.joinToString("、") { it.getString("name") })
            if (store.pendingProgress.length() > 0) append("\n仍有 ${store.pendingProgress.length()} 条续听进度等待匹配。")
        }
        if (partial) {
            val rows = trackJson.toMap()
            restoreSession = withContext(Dispatchers.IO) {
                draft.markApplied(session.key)
                session.copy(matches=BackupMatches(session.doc,rows,draft.choices(session.key)))
            }
            if (screen.route.name == "restoreReview") screen.render() else screen.go("restoreReview")
        } else {
            withContext(Dispatchers.IO) { draft.clear() }
            restoreSession = null
            if (screen.route.name == "restoreReview") screen.back()
        }
        MaterialAlertDialogBuilder(dialogContext()).setTitle("恢复结果").setMessage(message)
            .setPositiveButton(if (partial) "继续匹配" else "完成",null).show()
    }
    private val replacementAudio = registerForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        if (uri != null && externalView && !folderView) {
            runCatching { retain(uri) }
            intent.data = uri
            model.openIncoming(uri)
        }
    }
    internal fun chooseIncomingAudio() = replacementAudio.launch(arrayOf("audio/*", "video/mp4"))
    internal fun requestSubtitleDirectory() = treePicker.launch(learning.track?.parentDocument)
    private val openBackup=registerForActivityResult(ActivityResultContracts.OpenDocument()) { if (it != null) reviewBackup(it) }
    private val treePicker = registerForActivityResult(ActivityResultContracts.OpenDocumentTree()) { uri ->
        if (uri != null) runCatching {
            contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)
            model.chooseTree(uri); publishPermission()
        }.onFailure { error("目录授权失败，请重新选择") }
    }
    private val audioFolderPicker = registerForActivityResult(ActivityResultContracts.OpenDocumentTree()) { uri ->
        if (uri != null) runCatching {
            retain(uri)
            preferences.edit().putString("lastAudioTree", uri.toString()).apply()
            startActivity(Intent(this, FolderPlayerActivity::class.java).setData(uri))
        }.onFailure { error("无法打开音频目录，请重新选择") }
    }
    private var pairTrack: String? = null
    private var pairJa: Uri? = null
    private var applyPairRule = false
    private fun retain(uri:Uri) = contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)
    private val subtitleTypes = arrayOf("text/*", "application/x-subrip", "application/srt", "application/lrc", "application/x-lrc", "application/octet-stream")
    private val chinesePicker = registerForActivityResult(ActivityResultContracts.OpenDocument()) { zh ->
        val track = pairTrack
        val ja = pairJa
        pairTrack = null
        pairJa = null
        if (zh != null && track != null && ja != null) lifecycleScope.launch {
            try { retain(zh); model.selectPair(track,ja,zh,applyPairRule) }
            catch(e:Exception) { error("双字幕未保存：" + (e.localizedMessage ?: "文件不可读")) }
        }
    }
    private val japanesePicker = registerForActivityResult(ActivityResultContracts.OpenDocument()) { ja ->
        if (ja == null) pairTrack = null
        else runCatching {
            retain(ja); pairJa = ja
            MaterialAlertDialogBuilder(dialogContext()).setTitle("选择中文字幕")
                .setMessage("日文字幕已选好。接下来选择对应的中文文件。")
                .setPositiveButton("选择中文文件") { _,_ -> chinesePicker.launch(subtitleTypes) }
                .setNegativeButton("取消",null).show()
        }.onFailure { error("无法读取所选字幕") }
    }
    private val subtitlePicker = registerForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        val target = pickingTrack; pickingTrack = null
        if (uri != null && target != null) {
            runCatching { contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION) }
            model.selectSubtitle(uri, target)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        setTheme(R.style.HimitsuTheme)
        super.onCreate(savedInstanceState)
        store = LearningStore(this)
        if (!timer.isEndOfTrack() && preferences.contains("sleep-previous-repeat")) {
            if (player.getRepeatMode()==3) player.setRepeatMode(preferences.getInt("sleep-previous-repeat",0))
            preferences.edit().remove("sleep-previous-repeat").apply()
        }
        model = ViewModelProvider(this, object : ViewModelProvider.Factory {
            override fun <T : ViewModel> create(c: Class<T>): T {
                @Suppress("UNCHECKED_CAST") return LearningViewModel(application, !externalView, externalView && !folderView && !restoreExternal, folderView && !restoreExternal) as T
            }
        })[LearningViewModel::class.java]
        if (folderView && !restoreExternal) {
            if (model.state.value.folder == null) intent.data?.let(model::browseTree)
        } else if (externalView && model.state.value.track == null) intent.data?.let(model::openIncoming)
        pairTrack = savedInstanceState?.getString("pairTrack")
        pairJa = savedInstanceState?.getString("pairJa")?.let(Uri::parse)
        applyPairRule = savedInstanceState?.getBoolean("pairRule") == true
        pickingTrack = savedInstanceState?.getString("pickingTrack")
        WindowCompat.setDecorFitsSystemWindows(window, false)
        val root = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        screen = NativePlayerScreen(this, root, savedInstanceState)
        setContentView(root)
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout() or WindowInsetsCompat.Type.ime())
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            insets
        }
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (!screen.back()) {
                    if (externalView) finish() else moveTaskToBack(true)
                }
            }
        })
        subscriptions.add(component.playerCoordinator().observeListeningRange(playbackType)
            .observeOn(AndroidSchedulers.mainThread()).subscribe { opt ->
                emit(obj("listenRange" to opt.value?.let { obj("start" to it.start, "end" to it.end, "passes" to it.passes, "sentence" to it.sentence, "sentenceCount" to it.sentenceCount) }))
            })
        publishPreferences(); publishPermission(); publishEnvironment()
        if (!externalView) {
        subscriptions.add(player.getPlayQueueObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ queue = it; publishQueue() }, { error("播放队列读取失败") }))
        subscriptions.add(player.getCurrentQueueItemObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ currentItem = it.playQueueItem?.itemId; selectQueueItem() }, {}))
        subscriptions.add(player.getPlayerStateObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({
            transport.playing=it == PlayerState.PLAY
            transport.preparing=it == PlayerState.LOADING || it == PlayerState.PREPARING
            if (libraryAudioFailed != (it is PlayerState.Error)) {
                libraryAudioFailed = it is PlayerState.Error
                screen.changed(setOf("audioState"))
            }
            screen.transportTick()
            if (it is PlayerState.Error) error("音频播放失败，请检查文件是否可读取")
        }, {}))
        subscriptions.add(player.getPlaybackSpeedObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ publishPreferences() }, {}))
        subscriptions.add(player.getRepeatModeObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ publishPreferences() }, {}))
        subscriptions.add(player.getRandomPlayingObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ publishPreferences() }, {}))
        subscriptions.add(timer.getSleepTimerCountDownObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ millis ->
            if(millis == -1L && !timer.isEndOfTrack()) preferences.edit().remove("sleep-previous-repeat").apply()
            emit(obj("sleep" to if (timer.isEndOfTrack()) obj("mode" to "end") else if (millis >= 0) obj("mode" to "timer", "minutes" to timer.getSleepTimerTime()/60000, "remainingMs" to millis) else obj("mode" to "off")))
        }, {}))
        } else {
            emit(obj("externalView" to true, "folderPlayer" to folderView))
            val external = component.learningPlayerInteractor()
            subscriptions.add(external.getPlaybackSpeedObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ externalSpeed=it; publishPreferences() }, {}))
            subscriptions.add(external.getExternalPlayerRepeatModeObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ externalRepeat=it; publishPreferences() }, {}))
        }
        var previousFolderFiles: List<LearningFile>? = null
        lifecycleScope.launch { model.state.collect { state ->
            if (folderView) {
                emit(obj("folderLabel" to state.folderLabel, "folderBusy" to state.browsing,
                    "folderCanGoUp" to state.canGoUp, "folderCanPrevious" to model.canSkip(-1),
                    "folderCanNext" to model.canSkip(1)))
                if (previousFolderFiles !== state.files) {
                    previousFolderFiles = state.files
                    emit(obj("folderFiles" to JSONArray(state.files.map {
                        obj("uri" to it.uri, "name" to it.name, "directory" to it.directory)
                    })))
                }
            }
            if (externalView) {
                val t = state.track
                val previous=transport.current
                if (t?.uri!=previous?.id || t!=null && previous?.duration!=state.duration) {
                    val entries=if(t==null) emptyList() else listOf(NativeQueueEntry("incoming", NativeAudio(obj(
                        "id" to t.uri,"parentDocument" to t.parentDocument?.toString(),"title" to t.name,
                        "artist" to if (folderView) "手选文件夹" else "从文件打开","fileName" to t.name,"duration" to state.duration))))
                    transport.replace(entries,if(t==null) -1 else 0,state.duration)
                    if (previous?.id != t?.uri) transport.position = state.position
                    screen.queueChanged(previous?.id!=t?.uri)
                }
                transport.playing=state.playing;transport.preparing=state.openingAudio
                if (lifecycle.currentState.isAtLeast(Lifecycle.State.STARTED)) screen.transportTick()
            }
            if (lastDocument !== state.document || lastRendered !== state.rendered) {
                if (lastDocument != null && lastDocument?.fingerprint != state.document?.fingerprint) {
                    component.playerCoordinator().clearSentencePractice(playbackType)
                }
                val documentChanged = lastDocument !== state.document
                lastDocument = state.document; lastRendered = state.rendered
                screen.changed(if (documentChanged) setOf("cues", "document") else setOf("cues"))
                publishOffset()
            }
            if(state.noticeSequence != lastNotice) { lastNotice = state.noticeSequence; if(state.notice != 0) error(getString(state.notice)) }
            emit(obj("audioState" to when { state.audioFailed -> "failed"; state.openingAudio -> "opening"; else -> "ready" }))
            val status = getString(state.subtitleStatus)
            if (status != lastSubtitleStatus) {
                lastSubtitleStatus = status
                val isError = state.subtitleStatus in setOf(R.string.himitsu_subtitle_error,
                    R.string.himitsu_subtitle_large, R.string.dlsound_supported_subtitles)
                emit(obj("subtitleStatus" to status, "subtitleFolderNeeded" to
                    (state.subtitleStatus == R.string.himitsu_subtitle_folder_needed), "subtitleError" to if (isError) status else ""))
            }
            emit(obj("manual" to (state.track?.let { store.manualUri(it.uri) != null || store.pairBinding("track",it.uri) != null } == true), "pairRule" to model.hasPairRule(), "subtitleName" to state.subtitleName, "readingBusy" to state.readingBusy, "readingFailed" to state.readingFailed))
        } }
        if (Permissions.hasFilePermission(this)) startLibrary()
        screen.render()
        lifecycleScope.launch {
            try {
                if(withContext(Dispatchers.IO){ LegacyUiPreferences.migrate(this@PlayerV12Activity,store.study) })
                    screen.changed(setOf("studyRevision","browserRevision"))
            } catch(e:kotlinx.coroutines.CancellationException) { throw e }
            catch(e:Exception) { android.util.Log.w("DLSound","Legacy UI preferences import",e);error("旧版界面数据暂时无法迁移。重新打开时会重试。") }
        }
    }

    private fun startLibrary(triggerScan: Boolean = true) {
        if (started || externalView) return
        started = true
        emit(obj("libraryLoading" to true, "sourceError" to ""))
        component.musicServiceInteractor().prepare()
        component.storageScannerInteractor().runStorageObserver()
        if (triggerScan) component.storageScannerInteractor().rescanStorage()
        librarySubscriptions.add(component.libraryRepository().getAllCompositionsObservable(null)
            .switchMapSingle { items -> Single.fromCallable {
                val locations = component.compositionsDao().getLibraryFileLocations().associateBy { it.id }
                val mapped = items.associate { track ->
                    val location = locations[track.id]
                    track.id to compositionJson(track)
                        .put("folder", location?.folder ?: "local")
                        .put("albumId",location?.albumId?.toString()).put("albumArtist",location?.albumArtist)
                        .put("discNumber",location?.discNumber).put("trackNumber",location?.trackNumber)
                        .put("folderName", location?.folder?.substringAfterLast('/') ?: "本地音乐")
                        .put("fileName", location?.fileName ?: track.title)
                }
                Triple(items, mapped, NativeCatalog(items.map { mapped.getValue(it.id) }))
            }.subscribeOn(Schedulers.io()) }.observeOn(AndroidSchedulers.mainThread())
             .subscribe({ (items,mapped,indexed) ->
                tracks.clear(); items.forEach { tracks[it.id]=it }; trackJson.clear(); trackJson.putAll(mapped)
                catalog = indexed
                screen.changed(setOf("tracks"))
                emit(obj("libraryLoading" to false, "sourceError" to "")); publishQueue()
            }, { emit(obj("libraryLoading" to false, "sourceError" to "音乐库读取失败，请重新授权或刷新")) }))
        librarySubscriptions.add(component.compositionsDao().observeLibraryPlaylistRows()
            .observeOn(Schedulers.computation()).map { rows ->
                JSONArray(rows.groupBy { it.listId }.map { (id,entries) ->
                    obj("id" to id.toString(), "name" to entries.first().name,
                        "entryIds" to JSONArray(entries.mapNotNull { it.entryId?.toString() }),
                        "trackIds" to JSONArray(entries.mapNotNull { it.audioId?.toString() }))
                })
            }.observeOn(AndroidSchedulers.mainThread()).subscribe({ emit(obj("playlists" to it)) }, { error("歌单读取失败") }))
    }
    private fun compositionJson(t: CompositionModel) = obj("id" to t.id.toString(), "title" to t.title, "artist" to (t.artist ?: "未知艺术家"), "album" to (t.album ?: "未知专辑"), "duration" to t.duration, "size" to t.size, "comment" to t.comment, "demo" to false, "folder" to "local", "coverRevision" to t.coverModifyTime)
    private fun publishQueue() {
        val previous = transport.current
        val index = queue.indexOfFirst { it.itemId==currentItem }
        val entries = queue.map { NativeQueueEntry(it.itemId.toString(),NativeAudio(trackJson[it.id] ?: compositionJson(it))) }
        transport.replace(entries,index,queue.getOrNull(index)?.duration ?: 0)
        screen.queueChanged(previous?.id!=transport.current?.id || previous?.title!=transport.current?.title)
    }
    private fun selectQueueItem() {
        val previous=transport.itemId
        transport.select(transport.entries.indexOfFirst { it.itemId==currentItem?.toString() })
        if(previous!=transport.itemId) screen.queueChanged(true)
    }
    private fun publishPreferences() {
        val mode = when(store.mode) { SubtitleMode.JAPANESE -> "ja"; SubtitleMode.CHINESE -> "zh"; else -> "both" }
        emit(obj("prefs" to obj("theme" to store.theme, "language" to mode, "ruby" to store.furigana, "font" to store.fontSize,
            "rubyScale" to store.rubyScale, "depth" to store.depthEnabled, "librarySort" to preferences.getString("librarySort", "default"), "speed" to if(externalView) externalSpeed else player.getPlaybackSpeed(), "repeat" to when(if (externalView) externalRepeat else player.getRepeatMode()) { 1 -> "all"; 2 -> "one"; else -> "off" }, "shuffle" to (!externalView && player.isRandomPlayingEnabled())),
            "favorites" to JSONArray(preferences.getStringSet("favorites", emptySet())!!.sorted())))
    }
    private fun publishPermission() = emit(obj("mediaPermission" to Permissions.hasFilePermission(this), "videoOptional" to (Build.VERSION.SDK_INT>=33), "videoGranted" to (Build.VERSION.SDK_INT<33 || Permissions.hasPermission(this,Manifest.permission.READ_MEDIA_VIDEO)), "treeGranted" to contentResolver.persistedUriPermissions.any { it.isReadPermission && android.provider.DocumentsContract.isTreeUri(it.uri) }))
    private fun publishEnvironment() {
        val dark = resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK == Configuration.UI_MODE_NIGHT_YES
        emit(obj("appVersion" to appInfo.versionName, "buildCode" to appInfo.versionCode,
            "buildKind" to if (applicationInfo.flags and android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE != 0) "调试版" else "正式版",
            "fontScale" to resources.configuration.fontScale, "systemDark" to dark, "reducedMotion" to (Settings.Global.getFloat(contentResolver, Settings.Global.ANIMATOR_DURATION_SCALE, 1f) == 0f)))
        val theme = store.theme
        val useDark = theme == "dark" || theme == "system" && dark
        WindowCompat.getInsetsController(window, screen.root).apply { isAppearanceLightStatusBars = !useDark; isAppearanceLightNavigationBars = !useDark }
        screen.root.setBackgroundColor(Color.parseColor(if(useDark) "#151719" else "#ffffff"))
    }
    private fun publishOffset() {
        val s = model.state.value; val track = s.track; val doc = s.document
        emit(obj("offsetKey" to if (track != null && doc != null) store.offsetKey(track.uri, doc.fingerprint) else "",
            "offset" to if(track != null && doc != null) store.offset(track.uri, doc.fingerprint) else 0))
    }
    internal fun action(action: String, data: JSONObject = JSONObject(), onComplete: (() -> Unit)? = null, onSuccess: ((JSONObject?) -> Unit)? = null) {
        lifecycleScope.launch {
            try {
                when(action) {
                    "exportBackup", "importBackup" -> {
                        requireBackupCatalog()
                        check(!backupBusy) { "请等待备份操作完成" }
                        if(action=="exportBackup")saveBackup.launch("DL-Sound-backup.json") else startRestore()
                    }
                    "moveWork" -> {
                        check(!backupBusy) { "请等待备份操作完成" }
                        withContext(Dispatchers.IO) {
                            check(store.study.move(data.getString("old"),data.getString("dest")))
                            LibraryProgress(store,component.compositionsDao(),trackJson.toMap()).restore(emptyList())
                        }
                        emit(obj("studyRevision" to System.nanoTime().toString()))
                    }
                    "workProgress" -> {
                        val array = data.getJSONArray("ids")
                        val ids = (0 until array.length()).map { array.getString(it).toLong() }
                        val saved = withContext(Dispatchers.IO) {
                            ids.chunked(400).mapNotNull(component.compositionsDao()::latestHeard).maxByOrNull { it.lastHeard }
                        }
                        val active = queue.find { it.itemId == currentItem }?.id
                        val live = active != null && active in ids && transport.playing
                        onSuccess?.invoke(if (live) obj("id" to active.toString(), "ms" to transport.position)
                              else obj("id" to saved?.audioId?.toString(), "ms" to saved?.trackPosition))
                        return@launch
                    }
                    "checkUpdate" -> {
                        val result = withContext(Dispatchers.IO) { ReleaseChannel.check(appInfo.versionName.orEmpty()) }
                        onSuccess?.invoke(result)
                        return@launch
                    }
                    "openRelease" -> startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(ReleaseChannel.page)))
                    "closeExternal" -> if(externalView) finish() else Unit
                    "pref" -> preference(data)
                    "sleep" -> { timer.stop(); when(data.getString("mode")) {
                        "timer" -> { timer.setSleepTimerTime(data.getLong("minutes").coerceIn(1,240)*60000); timer.start() }
                        "end" -> { preferences.edit().putInt("sleep-previous-repeat",player.getRepeatMode()).apply(); timer.stopAtEndOfTrack() }
                    }; emit(obj("sleep" to data)) }
                    "pickAudioFolder" -> audioFolderPicker.launch(preferences.getString("lastAudioTree", null)?.let(Uri::parse))
                    "folderUp" -> if (folderView) model.up()
                    "folderOpen" -> {
                        require(folderView && !model.state.value.browsing)
                        val file = model.state.value.files.firstOrNull { it.uri == data.getString("uri") }
                        requireNotNull(file) { "文件已变化，请重新打开目录" }
                        model.open(file)
                    }
                    "equalizer" -> {
                        if (supportFragmentManager.findFragmentByTag("equalizer") == null) {
                            com.github.anrimian.musicplayer.ui.equalizer.EqualizerDialogFragment().show(supportFragmentManager, "equalizer")
                        }
                    }
                    "requestTree" -> requestSubtitleDirectory()
                    "requestMedia" -> requestAccess(Permissions.getFilePermissionName())
                    "requestVideo" -> if(Build.VERSION.SDK_INT>=33) requestAccess(Manifest.permission.READ_MEDIA_VIDEO) else requestAccess(Permissions.getFilePermissionName())
                    "refresh" -> {
                        publishPermission()
                        check(Permissions.hasFilePermission(this@PlayerV12Activity)) { "请先允许访问音乐库" }
                        librarySubscriptions.clear()
                        started = false
                        startLibrary(triggerScan = false)
                        try {
                            component.storageScannerInteractor().runRescanStorage().timeout(30, TimeUnit.SECONDS).await()
                        } catch (e: java.util.concurrent.TimeoutException) {
                            throw IllegalStateException("刷新超时，请重试", e)
                        } catch (e: kotlinx.coroutines.CancellationException) {
                            throw e
                        } catch (e: Exception) {
                            throw IllegalStateException("刷新失败，请重试", e)
                        }
                    }
                    "favorite" -> { val values = preferences.getStringSet("favorites",emptySet())!!.toMutableSet(); val value=data.getString("id"); if(!values.add(value)) values.remove(value); preferences.edit().putStringSet("favorites",values).apply(); publishPreferences() }
                    "playlist" -> playlistAction(data)
                    else -> throw IllegalArgumentException("不支持的操作")
                }
                onSuccess?.invoke(null)
            } catch (cancel: kotlinx.coroutines.CancellationException) {
                throw cancel
            } catch (e: Exception) { error(e.message ?: "操作未完成，请重试") }
            finally { onComplete?.invoke() }
        }
    }
    private fun operation(onSuccess: (() -> Unit)? = null, block:suspend () -> Unit) {
        lifecycleScope.launch {
            try { block(); onSuccess?.invoke() }
            catch (e:kotlinx.coroutines.CancellationException) { throw e }
            catch (e:Exception) { error(e.localizedMessage ?: "操作未完成，请重试") }
        }
    }

    internal fun togglePlayback() { if(externalView) model.playPause() else player.playOrPause() }
    internal fun ownsSubtitle(id: String) = model.ownsSubtitle(id)
    internal fun seekDialogue(id: String, document: SubtitleDocument, cueId: String): Boolean {
        if (transport.current?.id != id || !model.ownsSubtitle(id) || learning.document !== document) return false
        model.seekCue(document.fingerprint, cueId)
        return true
    }
    internal fun seekTo(ms:Long) { if(externalView) model.seek(ms) else player.onSeekFinished(ms.coerceIn(0,transport.duration.coerceAtLeast(0))) }
    internal fun skipTrack(previous:Boolean) {
        if(folderView) { if(previous) model.previous() else model.next() }
        else { timer.cancelEndOfTrack(); if(previous) player.skipToPrevious() else player.skipToNext() }
    }
    internal fun playTracks(ids:List<Long>,index:Int,position:Long?,onSuccess:()->Unit) = operation(onSuccess) {
        require(ids.isNotEmpty() && index in ids.indices && ids.size<=PLAY_QUEUE_MAX_ITEMS_COUNT && ids.all(tracks::containsKey)) { "音轨不可用或队列过长，请刷新音乐库" }
        timer.cancelEndOfTrack()
        player.setQueueAndPlay(ids,index).await()
        if(position!=null) {
            component.playerCoordinator().waitForLibrarySource(ids[index]).timeout(8,TimeUnit.SECONDS).observeOn(AndroidSchedulers.mainThread()).await()
            player.onSeekFinished(position.coerceIn(0,tracks.getValue(ids[index]).duration.coerceAtLeast(0)))
        }
        if(Build.VERSION.SDK_INT>=33 && !Permissions.hasPermission(this,Manifest.permission.POST_NOTIFICATIONS))
            mediaPermission.launch(arrayOf(Manifest.permission.POST_NOTIFICATIONS))
    }
    internal fun jumpTo(itemId:Long){ timer.cancelEndOfTrack();player.skipToItem(itemId) }
    internal fun appendTrack(id:Long,next:Boolean) = operation {
        val track=requireNotNull(tracks[id]) { "音轨已移除" }
        if(next) player.addCompositionsToPlayNext(listOf(track)).await() else player.addCompositionsToEnd(listOf(track)).await()
    }
    internal fun removeQueueItem(id:Long) = operation { queue.find { it.itemId==id }?.let { player.removeQueueItem(it).await() };Unit }
    internal fun moveQueueItem(id:Long,target:Long)=operation { player.moveItem(id,target).await() }
    internal fun clearQueue()=operation { timer.cancelEndOfTrack();player.clearPlayQueue().await() }
    internal fun practice(key:String,start:Long?=null,end:Long?=null,passes:Int=1,open:Boolean=false,pauseAtEnd:Boolean=false,
                          fingerprint:String?=null,onSuccess:(()->Unit)?=null)=operation(onSuccess) {
            val target = if (!externalView) key.toLongOrNull()?.let(tracks::get) else null
            val duration = target?.duration ?: transport.duration
            require(start == null || (start in 0 until duration && (end == null || end in (start+1)..duration))) { "请检查复听的起止时间" }
            if (open && !externalView && target != null &&
                queue.find { it.itemId == currentItem }?.id != target.id) {
                val existing = queue.firstOrNull { it.id == target.id }
                val item = existing ?: run {
                    player.addCompositionsToEnd(listOf(target)).await()
                    player.getPlayQueueObservable()
                        .filter { items -> items.any { it.id == target.id } }
                        .firstOrError().timeout(8, TimeUnit.SECONDS).await()
                        .first { it.id == target.id }
                }
                player.skipToItem(item.itemId)
                // The queue notification can arrive before its audio source is attached.
                component.playerCoordinator().waitForLibrarySource(target.id)
                    .timeout(8, TimeUnit.SECONDS)
                    .observeOn(AndroidSchedulers.mainThread()).await()
                player.play()
            }
            val sentences = if (fingerprint != null) {
                val state = model.state.value
                val document = requireNotNull(state.document) { "请先加载字幕" }
                val track = requireNotNull(state.track)
                require(document.fingerprint == fingerprint) { "字幕已变化，请重新打开复听面板" }
                val offset = store.offset(track.uri, document.fingerprint)
                val position = transport.position
                val bounds = withContext(Dispatchers.Default) { document.practiceSentences(position, duration, offset) }
                require(model.state.value.document === document && store.offset(track.uri, document.fingerprint) == offset) {
                    "字幕或偏移已变化，请重新开始练习"
                }
                require(bounds.isNotEmpty()) { "当前位置之后没有可练习的台词" }
                bounds
            } else null
            component.playerCoordinator().changeListeningRange(playbackType, { source ->
                when (source) {
                    is ExternalCompositionSource -> source.uri.toString() == key
                    is LibraryCompositionSource -> source.composition.id.toString() == key
                    else -> false
                }
            }, start, end, passes, pauseAtEnd, sentences)
    }
    internal fun selectSubtitle()=operation { pickingTrack=requireNotNull(model.state.value.track) { "请先选择音轨" }.uri;subtitlePicker.launch(subtitleTypes) }
    internal fun selectPair()=operation {
            pairTrack = requireNotNull(model.state.value.track) { "请先选择音轨" }.uri
            pairJa = null
            val checkBox = android.widget.CheckBox(dialogContext()).apply { text = "同目录其他音轨也使用这两个文件名后缀" }
            MaterialAlertDialogBuilder(dialogContext()).setTitle("分别选择日文和中文字幕")
                .setMessage("先选日文，再选中文。两份字幕可以使用不同格式和时间轴。")
                .setView(checkBox).setNegativeButton("取消",null)
                .setPositiveButton("选择日文文件") { _,_ -> applyPairRule=checkBox.isChecked; japanesePicker.launch(subtitleTypes) }.show()
    }
    internal fun automaticSubtitles()=model.automaticSubtitle()
    internal fun clearSubtitleRule()=model.clearPairRule()
    internal fun correctReading(key:String,cue:String="")=operation {
        require(key==snapshot.optString("offsetKey")) { "字幕已变化，请重新选择台词" }
        showCorrection(cue,-1)
    }
    internal fun setSubtitleOffset(key:String,value:Long)=operation {
        val state=model.state.value
        val track=requireNotNull(state.track);val doc=requireNotNull(state.document)
        require(key==store.offsetKey(track.uri,doc.fingerprint)) { "字幕已变化，请重新调整" }
        if(value!=store.offset(track.uri,doc.fingerprint)) component.playerCoordinator().clearSentencePractice(playbackType)
        store.setOffset(track.uri,doc.fingerprint,value);publishOffset()
    }

    private fun requestAccess(permission: String) {
        if (Permissions.hasPermission(this, permission)) { startLibrary(); publishPermission(); return }
        if (preferences.getBoolean("asked-"+permission,false) && !shouldShowRequestPermissionRationale(permission)) {
            startActivity(Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS,Uri.fromParts("package",packageName,null)))
        } else {
            mediaPermission.launch(arrayOf(permission))
        }
    }
    private fun preference(data: JSONObject) {
        when(data.getString("key")) {
            "librarySort" -> {
                val order = data.getString("value")
                require(order == "default" || order.matches(Regex("(title|artist|album|duration)-(asc|desc)")))
                preferences.edit().putString("librarySort", order).apply()
            }
            "theme" -> { val v=data.getString("value"); require(v in listOf("light","dark","system")); store.theme=v; publishEnvironment() }
            "language" -> model.mode(when(data.getString("value")) { "zh" -> SubtitleMode.CHINESE; "both" -> SubtitleMode.BILINGUAL; else -> SubtitleMode.JAPANESE })
            "ruby" -> model.furigana(data.getBoolean("value"))
            "font" -> model.font(data.getInt("value").coerceIn(16,40)-store.fontSize)
            "rubyScale" -> store.rubyScale=data.getDouble("value").toFloat()
            "depth" -> store.depthEnabled=data.getBoolean("value")
            "speed" -> data.getDouble("value").toFloat().coerceIn(.5f,2f).let { if(externalView) component.learningPlayerInteractor().setPlaybackSpeed(it) else player.setPlaybackSpeed(it) }
            "repeat" -> { timer.cancelEndOfTrack(); player.setRepeatMode(when(data.getString("value")){"one"->2;"all"->1;else->0}) }
            "shuffle" -> player.setRandomPlayingEnabled(data.getBoolean("value"))
        }; publishPreferences()
    }
    private suspend fun playlistAction(d: JSONObject) {
        val id=d.optString("id").toLongOrNull()
        when(d.getString("operation")) {
            "create" -> playlistService.createPlaylist(d.getString("name")).await()
            "rename" -> playlistService.updatePlaylistName(requireNotNull(id),d.getString("name"))
            "delete" -> playlistService.deletePlaylist(requireNotNull(id))
            "add" -> {
                val list=playlistService.getPlaylistsObservable().firstOrError().await().first { it.id==id }
                val t=tracks[d.getString("trackId").toLong()] ?: throw IllegalArgumentException("音轨不存在")
                playlistService.addCompositionsToPlaylist(listOf(t),list,false,true).await()
            }
            "remove" -> {
                val listId=requireNotNull(id)
                val entry = playlistService.getCompositionsObservable(listId,null).firstOrError().await()
                    .singleOrNull { it.entryId.toString() == d.getString("entryId") }
                    ?: throw IllegalArgumentException("歌单条目已变化，请重新选择")
                playlistService.deleteItemFromPlaylist(entry,listId).await()
            }
        }
    }
    private fun showCorrection(cueId: String, index: Int) {
        val s=model.state.value; val document=requireNotNull(s.document) { "当前音轨没有可修正的字幕" }
        val trackUri = s.track?.uri ?: return
        val position = transport.position - store.offset(trackUri, document.fingerprint)
        val cue = s.rendered.firstOrNull { rendered ->
            rendered.cue.kind == CueKind.DIALOGUE && if (cueId.isEmpty()) {
                rendered.cue.activeAt(position, s.duration)
            } else rendered.cue.id == cueId
        } ?: run { error("当前位置没有可修正的台词"); return }
        val candidates=cue.pieces.withIndex().filter { containsKanji(it.value.text) }
        if(candidates.isEmpty()) { error("当前句没有可修正的汉字词语"); return }
        fun edit(i: Int) {
            val piece=cue.pieces[i]
            val field=AppCompatEditText(dialogContext()).apply { setText(piece.reading.orEmpty()); hint="平假名读音"; setSingleLine() }
            val dialog=MaterialAlertDialogBuilder(dialogContext()).setTitle("修正「${piece.text}」读音").setView(field)
                .setPositiveButton("保存",null).setNegativeButton("取消",null)
                .setNeutralButton("恢复原读音") { _,_ -> model.correct(trackUri, document.fingerprint,cue.cue.id,i,null,piece) }.create()
            dialog.setOnShowListener {
                val save = dialog.getButton(android.content.DialogInterface.BUTTON_POSITIVE)
                save.isEnabled = validReading(field.text.toString().trim())
                field.doAfterTextChanged { text ->
                    val value = text.toString().trim()
                    save.isEnabled = validReading(value)
                    field.error = if (value.isNotEmpty() && !save.isEnabled) "请输入有效的平假名读音" else null
                }
                save.setOnClickListener {
                    model.correct(trackUri, document.fingerprint, cue.cue.id, i, field.text.toString().trim(), piece)
                    dialog.dismiss()
                }
            }
            dialog.show()
        }
        if(index in cue.pieces.indices && containsKanji(cue.pieces[index].text)) edit(index)
        else MaterialAlertDialogBuilder(dialogContext()).setTitle("选择要修正的词语").setItems(candidates.map { "${it.value.text}  ${it.value.reading.orEmpty()}" }.toTypedArray()) { _,which -> edit(candidates[which].index) }.setNegativeButton("取消",null).show()
    }
    internal fun dialogContext(): android.content.Context {
        val config = Configuration(resources.configuration)
        when(store.theme) {
            "dark" -> config.uiMode = (config.uiMode and Configuration.UI_MODE_NIGHT_MASK.inv()) or Configuration.UI_MODE_NIGHT_YES
            "light" -> config.uiMode = (config.uiMode and Configuration.UI_MODE_NIGHT_MASK.inv()) or Configuration.UI_MODE_NIGHT_NO
        }
        return androidx.appcompat.view.ContextThemeWrapper(this, R.style.HimitsuTheme).apply {
            applyOverrideConfiguration(config)
        }
    }
    internal suspend fun artwork(track: JSONObject, maxSize: Int): Bitmap? = withContext(Dispatchers.IO) {
        runCatching {
            val key = track.optString("id")
            val uri = key.toLongOrNull()?.let { id ->
                val source = component.storageSourceRepository().getStorageSource(id).blockingGet()
                component.contentSourceHelper().createUri(requireNotNull(source))
            } ?: Uri.parse(key)
            val retriever = MediaMetadataRetriever()
            val bytes = try { retriever.setDataSource(this@PlayerV12Activity, uri); retriever.embeddedPicture } finally { retriever.release() }
            if (bytes == null || bytes.size > 8 * 1024 * 1024) return@runCatching null
            val options = BitmapFactory.Options().apply { inJustDecodeBounds = true }
            BitmapFactory.decodeByteArray(bytes, 0, bytes.size, options)
            options.inJustDecodeBounds = false
            while (maxOf(options.outWidth, options.outHeight) / options.inSampleSize.coerceAtLeast(1) > maxSize * 2)
                options.inSampleSize = options.inSampleSize.coerceAtLeast(1) * 2
            BitmapFactory.decodeByteArray(bytes, 0, bytes.size, options)
        }.getOrNull()
    }
    private fun emit(patch: JSONObject) {
        val keys = mutableSetOf<String>()
        patch.keys().forEach { key ->
            val value = patch.get(key)
            val old = snapshot.opt(key)
            if (old != value && (old !is JSONObject && old !is JSONArray || old.toString() != value.toString())) {
                snapshot.put(key,value)
                keys += key
            }
        }
        if (keys.isNotEmpty() && ::screen.isInitialized && !isDestroyed) screen.changed(keys)
    }
    internal fun error(text: String) { if (!isDestroyed) Toast.makeText(this, text, Toast.LENGTH_SHORT).show() }
    override fun onStart() {
        super.onStart()
        val positions = model.playbackPositions
        val visiblePositions = if (externalView) positions else positions.throttleLatest(200, TimeUnit.MILLISECONDS)
            .observeOn(AndroidSchedulers.mainThread())
        positionUpdates = visiblePositions.subscribe({ position ->
            transport.position = position.coerceAtLeast(0)
            screen.transportTick()
        }, { error("无法读取播放进度") })
    }

    override fun onStop() {
        positionUpdates?.dispose()
        positionUpdates = null
        super.onStop()
    }

    override fun onResume() {
        super.onResume()
        if (::screen.isInitialized) { publishPermission(); publishEnvironment(); if (Permissions.hasFilePermission(this)) startLibrary() }
    }
    override fun onSaveInstanceState(outState: Bundle) {
        outState.putString("pairTrack",pairTrack); outState.putString("pairJa",pairJa?.toString())
        outState.putBoolean("pairRule",applyPairRule); outState.putString("pickingTrack",pickingTrack)
        screen.save(outState)
        super.onSaveInstanceState(outState)
    }
    override fun onConfigurationChanged(newConfig: Configuration) { super.onConfigurationChanged(newConfig); publishEnvironment(); screen.schedule() }
    override fun onDestroy() {
        subscriptions.clear(); librarySubscriptions.clear()
        screen.dispose()
        super.onDestroy()
    }
    companion object {
        private fun obj(vararg values: Pair<String,Any?>)=JSONObject().apply { values.forEach { put(it.first,it.second ?: JSONObject.NULL) } }
    }
}
