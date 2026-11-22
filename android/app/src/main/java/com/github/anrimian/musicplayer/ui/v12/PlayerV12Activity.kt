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
import android.webkit.*
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.widget.doAfterTextChanged
import android.widget.LinearLayout
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.ProcessLifecycleOwner
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
import io.reactivex.rxjava3.schedulers.Schedulers
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.rx3.await
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.ByteArrayInputStream
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.TimeUnit

/** APK-only presentation. All playback/queue/library/subtitle state remains in Android. */
open class PlayerV12Activity : AppCompatActivity() {
    protected open val externalView = false
    private var externalSpeed = 1f
    private val component get() = Components.getAppComponent()
    private val player get() = component.libraryPlayerInteractor()
    private val playlistService get() = component.playlistsInteractor()
    private val playbackType get() = if (externalView) PlayerType.EXTERNAL else PlayerType.LIBRARY
    private val timer get() = component.sleepTimerInteractor()
    private val subscriptions = CompositeDisposable()
    private val librarySubscriptions = CompositeDisposable()
    private lateinit var web: WebView
    private lateinit var model: LearningViewModel
    private lateinit var store: LearningStore
    private val appInfo by lazy { packageManager.getPackageInfo(packageName, 0) }
    private val preferences by lazy { getSharedPreferences("dlsound-player", MODE_PRIVATE) }
    private val snapshot = JSONObject()
    private val tracks = ConcurrentHashMap<Long, Composition>()
    private var libraryJson = "[]"
    private val trackJson = ConcurrentHashMap<Long, JSONObject>()
    private var queue = emptyList<PlayQueueItem>()
    private var currentItem: Long? = null
    private var foreground = false
    private var latestPosition: Long? = null
    private val processObserver = object : DefaultLifecycleObserver {
        override fun onStart(owner: LifecycleOwner) {
            foreground = true
            latestPosition?.let { emit(obj("time" to it)) }
        }

        override fun onStop(owner: LifecycleOwner) {
            foreground = false
        }
    }
    private var ready = false
    private var started = false
    private var pickingTrack: String? = null
    private var lastDocument: SubtitleDocument? = null
    private var lastRendered: List<RenderedCue>? = null
    private var lastSubtitleStatus = ""
    private var lastNotice = 0
    private var renderRevision = 0
    private var subtitlePatch = "{}"
    private val mediaPermission = registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { grants ->
        grants.forEach { (permission,granted) -> preferences.edit().putBoolean("asked-"+permission,!granted).apply() }
        publishPermission(); if (!externalView && Permissions.hasFilePermission(this)) { if (started) component.storageScannerInteractor().rescanStorage() else startLibrary() }
    }
    private var backupBusy=false
    private fun backupFile(uri:Uri?, restore:Boolean) {
        if(uri==null || backupBusy)return
        backupBusy=true
        lifecycleScope.launch {
            try {
                val backup=LibraryBackup(store,trackJson.toMap(),tracks.toMap())
                val prefs=JSONObject(snapshot.getJSONObject("prefs").toString())
                prefs.put("treeMode",JSONObject(preferences.getString("folderBrowser","{}")).optBoolean("tree"))
                fun favorites() = preferences.getStringSet("favorites",emptySet()).orEmpty().toSet()
                val message=if(restore){
                    val result=withContext(Dispatchers.IO){
                        val text=contentResolver.openInputStream(uri)?.use(SafLearningFiles::readText) ?: throw IllegalStateException("无法读取备份文件")
                        backup.restore(JSONObject(text))
                    }
                    for(key in listOf("theme","language","font","ruby","rubyScale","depth","speed","repeat","shuffle")){
                        if(result.preferences.has(key)) preference(obj("key" to key,"value" to result.preferences.get(key)))
                    }
                    preferences.edit().putStringSet("favorites",LibraryBackup.mergedFavorites(preferences, result.favorites))
                        .putString("folderBrowser",obj("tree" to result.preferences.optBoolean("treeMode"),"path" to "").toString()).apply()
                    publishPreferences();publishOffset();model.reloadSubtitle();emit(obj("browserRevision" to System.nanoTime().toString()))
                    if(result.missing.isEmpty()) "恢复完成，所有音轨均已匹配。" else "恢复完成，以下音轨需要重新关联：\n"+result.missing.joinToString("\n")
                }else{
                    val exportFavorites = favorites()
                    withContext(Dispatchers.IO){
                        val bytes=backup.export(prefs,exportFavorites).toString().toByteArray()
                        require(bytes.size<=SafLearningFiles.MAX_BYTES) { "备份超过 8 MB，无法导出" }
                        contentResolver.openOutputStream(uri,"wt")?.use { it.write(bytes) } ?: throw IllegalStateException("无法写入备份文件")
                    }
                    "备份文件已保存。"
                }
                MaterialAlertDialogBuilder(dialogContext()).setTitle(if(restore)"恢复备份" else "导出备份").setMessage(message).setPositiveButton("完成",null).show()
            }catch(e:Exception){error("备份操作未完成："+(e.localizedMessage?:"请检查文件权限"))}
            finally{backupBusy=false}
        }
    }
    private val saveBackup=registerForActivityResult(ActivityResultContracts.CreateDocument("application/json")) { backupFile(it,false) }
    private val openBackup=registerForActivityResult(ActivityResultContracts.OpenDocument()) { backupFile(it,true) }
    private val treePicker = registerForActivityResult(ActivityResultContracts.OpenDocumentTree()) { uri ->
        if (uri != null) runCatching {
            contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)
            model.chooseTree(uri); publishPermission()
        }.onFailure { error("目录授权失败，请重新选择") }
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
                @Suppress("UNCHECKED_CAST") return LearningViewModel(application, !externalView, externalView) as T
            }
        })[LearningViewModel::class.java]
        if (externalView && model.state.value.track == null) intent.data?.let(model::openIncoming)
        pickingTrack = savedInstanceState?.getString("pickingTrack")
        WindowCompat.setDecorFitsSystemWindows(window, false)
        val root = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        web = WebView(this)
        root.addView(web, LinearLayout.LayoutParams(-1, -1))
        setContentView(root)
        ViewCompat.setOnApplyWindowInsetsListener(root) { v, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout() or WindowInsetsCompat.Type.ime())
            v.setPadding(bars.left, bars.top, bars.right, bars.bottom); insets
        }
        web.settings.apply {
            javaScriptEnabled = true; domStorageEnabled = true; textZoom = 100
            allowFileAccess = false; allowContentAccess = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            setSupportMultipleWindows(false)
        }
        WebView.setWebContentsDebuggingEnabled(applicationInfo.flags and android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE != 0)
        web.addJavascriptInterface(object {
            @JavascriptInterface fun readFolderBrowser(): String? =
                preferences.getString("folderBrowser", null)

            // The bridge runs off the UI thread. Finish this small write before JS changes tabs.
            @JavascriptInterface fun saveFolderBrowser(tree: Boolean, path: String): Boolean =
                preferences.edit().putString("folderBrowser", obj("tree" to tree, "path" to path).toString()).commit()

            @JavascriptInterface fun send(raw: String): Boolean {
                // Each quoted Long takes at most 22 characters including its separator.
                if (raw.length > PLAY_QUEUE_MAX_ITEMS_COUNT * 22 + 256) return false
                val request = runCatching { JSONObject(raw) }.getOrNull() ?: return false
                runOnUiThread { if (!isDestroyed) dispatch(request) }
                return true
            }
        }, "DLSound")
        web.webChromeClient = object : WebChromeClient() {}
        web.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest) = true
            override fun onRenderProcessGone(view: WebView, detail: RenderProcessGoneDetail): Boolean {
                ready = false
                (view.parent as? android.view.ViewGroup)?.removeView(view)
                view.removeJavascriptInterface("DLSound")
                view.destroy()
                recreate() // The service and queue outlive presentation recovery.
                return true
            }
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse {
                val uri = request.url
                if (uri.scheme != "https" || uri.host != HOST || request.method != "GET") return blocked()
                val path = uri.path.orEmpty()
                if (path.startsWith("/cover/")) return cover(path.removePrefix("/cover/").toLongOrNull())
                if (path.contains("..") || !path.matches(Regex("/[a-zA-Z0-9_./-]*"))) return blocked()
                return runCatching {
                    val asset = if (path == "/") "index.html" else path.removePrefix("/")
                    val mime = when(asset.substringAfterLast('.')) { "js" -> "text/javascript"; "css" -> "text/css"; "html" -> "text/html"; "svg" -> "image/svg+xml"; else -> "application/octet-stream" }
                    WebResourceResponse(mime, "UTF-8", 200, "OK", mapOf("Content-Security-Policy" to "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; font-src 'self'; frame-src 'none'; base-uri 'none'; form-action 'none'", "X-Content-Type-Options" to "nosniff"), assets.open("player/$asset"))
                }.getOrElse { blocked() }
            }
        }
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                web.evaluateJavascript("window.dlSoundBack ? window.dlSoundBack() : false") { if (it != "true") { if(externalView) finish() else moveTaskToBack(true) } }
            }
        })
        subscriptions.add(component.playerCoordinator().observeListeningRange(playbackType)
            .observeOn(AndroidSchedulers.mainThread()).subscribe { opt ->
                emit(obj("listenRange" to opt.value?.let { obj("start" to it.start, "end" to it.end, "passes" to it.passes) }))
            })
        publishPreferences(); publishPermission(); publishEnvironment()
        ProcessLifecycleOwner.get().lifecycle.addObserver(processObserver)
        if (!externalView) {
        subscriptions.add(player.getPlayQueueObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ queue = it; publishQueue() }, { error("播放队列读取失败") }))
        subscriptions.add(player.getCurrentQueueItemObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ currentItem = it.playQueueItem?.itemId; publishQueue() }, {}))
        subscriptions.add(player.getTrackPositionObservable().sample(200, TimeUnit.MILLISECONDS)
            .observeOn(AndroidSchedulers.mainThread()).subscribe({ position ->
                val time = position.coerceAtLeast(0)
                latestPosition = time
                if (foreground) emit(obj("time" to time))
            }, {}))
        subscriptions.add(player.getPlayerStateObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({
            emit(obj("playing" to (it == PlayerState.PLAY), "loading" to (it == PlayerState.LOADING || it == PlayerState.PREPARING)))
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
            emit(obj("externalView" to true))
            subscriptions.add(component.learningPlayerInteractor().getPlaybackSpeedObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ externalSpeed=it; publishPreferences() }, {}))
        }
        lifecycleScope.launch { model.state.collect { state ->
            if (externalView) {
                val t = state.track
                emit(obj("queue" to JSONArray().apply { if(t!=null) put(obj("itemId" to "incoming", "track" to obj(
                    "id" to t.uri, "parentDocument" to t.parentDocument?.toString(), "title" to t.name, "artist" to "从文件打开", "fileName" to t.name, "duration" to state.duration))) },
                    "index" to if(t!=null) 0 else -1, "duration" to state.duration, "time" to state.position,
                    "playing" to state.playing, "loading" to state.openingAudio))
            }
            if (lastDocument !== state.document || lastRendered !== state.rendered) {
                lastDocument = state.document; lastRendered = state.rendered
                val revision = ++renderRevision
                val encoded = withContext(Dispatchers.Default) {
                    val cues = JSONArray(state.rendered.map { rendered ->
                        val c = rendered.cue
                        obj("id" to c.id, "key" to c.id, "kind" to c.kind.name.lowercase(), "startMs" to c.startMs,
                            "endMs" to (c.endMs ?: Long.MAX_VALUE).coerceAtMost(state.duration.takeIf { it > 0 } ?: Long.MAX_VALUE).coerceAtMost(9007199254740991L),
                            "ja" to JSONArray(rendered.pieces.mapIndexed { i, piece -> obj("text" to piece.text, "reading" to piece.reading, "index" to i, "origin" to piece.origin.name) }), "zh" to c.chinese,
                            "unlabelledText" to c.unlabelledText)
                    })
                    obj("doc" to state.document?.let { obj("documentId" to it.id, "fingerprint" to it.fingerprint,
                        "warningCount" to it.warningCount) }, "cues" to cues, "renderRevision" to revision).toString()
                }
                if (model.state.value.document !== state.document || model.state.value.rendered !== state.rendered) return@collect
                subtitlePatch = encoded
                if (ready && !isDestroyed) web.evaluateJavascript("window.dlSoundEvent && window.dlSoundEvent($encoded);", null)
                publishOffset()
            }
            if(state.noticeSequence != lastNotice) { lastNotice = state.noticeSequence; if(state.notice != 0) { error(getString(state.notice)); if(externalView && state.track==null) emit(obj("incomingError" to "无法读取此音频，请从文件管理器重新打开并允许访问。")) } }
            val status = getString(state.subtitleStatus)
            if (status != lastSubtitleStatus) { lastSubtitleStatus = status; emit(obj("subtitleStatus" to status, "subtitleFolderNeeded" to (state.subtitleStatus == R.string.himitsu_subtitle_folder_needed), "subtitleError" to if(state.subtitleStatus in listOf(R.string.himitsu_subtitle_error,R.string.himitsu_subtitle_version,R.string.himitsu_subtitle_time,R.string.himitsu_subtitle_ids,R.string.himitsu_subtitle_large)) status else "")) }
            emit(obj("manual" to (state.track?.let { store.manualUri(it.uri) != null } == true), "subtitleName" to state.subtitleName, "readingBusy" to state.readingBusy, "readingFailed" to state.readingFailed))
        } }
        if (Permissions.hasFilePermission(this)) startLibrary()
        web.loadUrl("https://$HOST/")
    }

    private fun startLibrary(triggerScan: Boolean = true) {
        if (started || externalView) return
        started = true
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
                Triple(items, mapped, JSONArray(items.map { mapped.getValue(it.id) }).toString())
            }.subscribeOn(Schedulers.io()) }.observeOn(AndroidSchedulers.mainThread())
             .subscribe({ (items,mapped,encoded) ->
                tracks.clear(); items.forEach { tracks[it.id]=it }; trackJson.clear(); trackJson.putAll(mapped)
                if(libraryJson!=encoded){
                    libraryJson=encoded
                    if(ready && !isDestroyed)web.evaluateJavascript("window.dlSoundEvent && window.dlSoundEvent({tracks:"+encoded+"});",null)
                }
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
    private fun compositionJson(t: CompositionModel) = obj("id" to t.id.toString(), "title" to t.title, "artist" to (t.artist ?: "未知艺术家"), "album" to (t.album ?: "未知专辑"), "duration" to t.duration, "size" to t.size, "comment" to t.comment, "demo" to false, "folder" to "local", "cover" to "https://$HOST/cover/${t.id}?v=${t.coverModifyTime}")
    private fun publishQueue() {
        val index = queue.indexOfFirst { it.itemId == currentItem }
        emit(obj("queue" to JSONArray(queue.map { obj("itemId" to it.itemId.toString(), "track" to (trackJson[it.id] ?: compositionJson(it))) }), "index" to index, "duration" to (queue.getOrNull(index)?.duration ?: 0)))
    }
    private fun publishPreferences() {
        val mode = when(store.mode) { SubtitleMode.JAPANESE -> "ja"; SubtitleMode.CHINESE -> "zh"; else -> "both" }
        emit(obj("prefs" to obj("theme" to store.theme, "language" to mode, "ruby" to store.furigana, "font" to store.fontSize,
            "rubyScale" to store.rubyScale, "depth" to store.depthEnabled, "speed" to if(externalView) externalSpeed else player.getPlaybackSpeed(), "repeat" to when(player.getRepeatMode()) { 1 -> "all"; 2 -> "one"; else -> "off" }, "shuffle" to player.isRandomPlayingEnabled()),
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
        WindowCompat.getInsetsController(window, web).apply { isAppearanceLightStatusBars = !useDark; isAppearanceLightNavigationBars = !useDark }
        (web.parent as? android.view.View)?.setBackgroundColor(Color.parseColor(if(useDark) "#151719" else "#ffffff"))
        web.setBackgroundColor(Color.parseColor(if(useDark) "#151719" else "#ffffff"))
    }
    private fun publishOffset() {
        val s = model.state.value; val track = s.track; val doc = s.document
        emit(obj("offsetKey" to if (track != null && doc != null) store.offsetKey(track.uri, doc.fingerprint) else "",
            "offset" to if(track != null && doc != null) store.offset(track.uri, doc.fingerprint) else 0))
    }
    private fun dispatch(request: JSONObject) {
        val id = request.optLong("id"); val data = request.optJSONObject("data") ?: JSONObject()
        lifecycleScope.launch {
            try {
                when(request.getString("action")) {
                    "ready" -> { ready = true; web.evaluateJavascript("window.dlSoundEvent && window.dlSoundEvent(Object.assign(${snapshot},$subtitlePatch,{tracks:${libraryJson}}));",null); publishEnvironment() }
                    "exportBackup", "importBackup" -> {
                        require(started && !snapshot.optBoolean("libraryLoading",true) && !backupBusy) { "请先授权并等候曲库加载完成" }
                        if(request.getString("action")=="exportBackup")saveBackup.launch("DL-Sound-backup.json") else openBackup.launch(arrayOf("application/json","text/plain","application/octet-stream"))
                    }
                    "checkUpdate" -> {
                        val result = withContext(Dispatchers.IO) { ReleaseChannel.check(appInfo.versionName.orEmpty()) }
                        reply(id, value = result)
                        return@launch
                    }
                    "openRelease" -> startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(ReleaseChannel.page)))
                    "closeExternal" -> if(externalView) finish() else Unit
                    "toggle" -> if(externalView) model.playPause() else player.playOrPause()
                    "pause" -> player.pause()
                    "listen" -> {
                        val key = data.getString("track")
                        val start = if (data.has("start")) data.getLong("start") else null
                        val end = if (data.isNull("end")) null else data.getLong("end")
                        val target = if (!externalView) key.toLongOrNull()?.let(tracks::get) else null
                        val duration = target?.duration ?: snapshot.optLong("duration")
                        require(start == null || (start in 0 until duration && (end == null || end in (start+1)..duration))) { "请检查复听的起止时间" }
                        if (data.optBoolean("open") && !externalView && target != null &&
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
                        component.playerCoordinator().changeListeningRange(playbackType, { source ->
                            when (source) {
                                is ExternalCompositionSource -> source.uri.toString() == key
                                is LibraryCompositionSource -> source.composition.id.toString() == key
                                else -> false
                            }
                        }, start, end, data.optInt("passes", 1), data.optBoolean("pauseAtEnd"))
                    }
                    "seek" -> if(externalView) model.seek(data.getLong("ms")) else player.onSeekFinished(data.getLong("ms").coerceIn(0, snapshot.optLong("duration").coerceAtLeast(0)))
                    "play" -> {
                        val collection = data.getJSONArray("ids")
                        require(collection.length() <= PLAY_QUEUE_MAX_ITEMS_COUNT) { "队列最多可加入 ${PLAY_QUEUE_MAX_ITEMS_COUNT} 首音轨" }
                        val ids = (0 until collection.length()).map { collection.getString(it).toLong() }
                        require(ids.isNotEmpty() && ids.all(tracks::containsKey)) { "音轨不可用，请刷新音乐库" }
                        val requested = data.optString("startId").toLongOrNull()
                        require(requested == null || requested in ids) { "所选音轨不在播放列表中，请重新选择" }
                        timer.cancelEndOfTrack()
                        val index = if (data.has("startIndex")) data.getInt("startIndex") else requested?.let(ids::indexOf) ?: 0
                        require(index in ids.indices && (requested == null || ids[index] == requested)) { "所选歌单条目已变化" }
                        player.setQueueAndPlay(ids, index).await()
                        if (Build.VERSION.SDK_INT >= 33 && !Permissions.hasPermission(this@PlayerV12Activity, Manifest.permission.POST_NOTIFICATIONS))
                            mediaPermission.launch(arrayOf(Manifest.permission.POST_NOTIFICATIONS))
                    }
                    "skip" -> { timer.cancelEndOfTrack(); if(data.getInt("step") < 0) player.skipToPrevious() else player.skipToNext() }
                    "jump" -> { timer.cancelEndOfTrack(); player.skipToItem(data.getString("itemId").toLong()) }
                    "append" -> {
                        val t = tracks[data.getString("id").toLong()] ?: throw IllegalArgumentException("音轨不存在")
                        if(data.optBoolean("next")) player.addCompositionsToPlayNext(listOf(t)).await() else player.addCompositionsToEnd(listOf(t)).await()
                    }
                    "remove" -> queue.find { it.itemId.toString() == data.getString("itemId") }?.let { player.removeQueueItem(it).await() }
                    "move" -> player.moveItem(data.getString("itemId").toLong(), data.getString("targetId").toLong()).await()
                    "clear" -> { timer.cancelEndOfTrack(); player.clearPlayQueue().await() }
                    "pref" -> preference(data)
                    "offset" -> {
                        val s = model.state.value; val t = requireNotNull(s.track) { "音轨已变化，请重新打开字幕设置" }; val d = requireNotNull(s.document) { "当前音轨没有可校准的字幕" }
                        require(data.getString("key") == store.offsetKey(t.uri,d.fingerprint)) { "字幕已变化，请重新调整" }
                        store.setOffset(t.uri,d.fingerprint,data.getLong("value")); publishOffset()
                    }
                    "sleep" -> { timer.stop(); when(data.getString("mode")) {
                        "timer" -> { timer.setSleepTimerTime(data.getLong("minutes").coerceIn(1,240)*60000); timer.start() }
                        "end" -> { preferences.edit().putInt("sleep-previous-repeat",player.getRepeatMode()).apply(); timer.stopAtEndOfTrack() }
                    }; emit(obj("sleep" to data)) }
                    "importSubtitle" -> { pickingTrack = requireNotNull(model.state.value.track) { "请先选择音轨" }.uri; subtitlePicker.launch(arrayOf("*/*")) }
                    "automatic" -> model.automaticSubtitle()
                    "requestTree" -> treePicker.launch(model.state.value.track?.parentDocument)
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
                    "correction" -> { require(data.optString("key") == snapshot.optString("offsetKey")) { "字幕已变化，请重新选择台词" }; showCorrection(data.optString("cueId"),data.optInt("index",-1)) }
                    else -> throw IllegalArgumentException("不支持的操作")
                }
                reply(id)
            } catch(e: Exception) { reply(id, e.message ?: "操作未完成，请重试") }
        }
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
        val position = s.position - store.offset(trackUri, document.fingerprint)
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
    private fun dialogContext(): android.content.Context {
        val config = Configuration(resources.configuration)
        when(store.theme) {
            "dark" -> config.uiMode = (config.uiMode and Configuration.UI_MODE_NIGHT_MASK.inv()) or Configuration.UI_MODE_NIGHT_YES
            "light" -> config.uiMode = (config.uiMode and Configuration.UI_MODE_NIGHT_MASK.inv()) or Configuration.UI_MODE_NIGHT_NO
        }
        return androidx.appcompat.view.ContextThemeWrapper(this, R.style.HimitsuTheme).apply {
            applyOverrideConfiguration(config)
        }
    }
    private fun cover(id: Long?): WebResourceResponse {
        if(id != null && (tracks.containsKey(id) || trackJson.containsKey(id))) runCatching {
            val source=component.storageSourceRepository().getStorageSource(id).blockingGet()
            val uri=component.contentSourceHelper().createUri(requireNotNull(source))
            val retriever=MediaMetadataRetriever()
            try { retriever.setDataSource(this,uri); val bytes=retriever.embeddedPicture; if(bytes!=null && bytes.size<=8*1024*1024) return WebResourceResponse("image/jpeg",null,ByteArrayInputStream(bytes)) } finally { retriever.release() }
        }
        val svg="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" rx="8" fill="#edf2ef"/><circle cx="150" cy="150" r="86" fill="none" stroke="#a4b4ab" stroke-width="2"/><circle cx="150" cy="150" r="60" fill="none" stroke="#a4b4ab" stroke-width="2"/><circle cx="150" cy="150" r="18" fill="#008d55"/></svg>"""
        return WebResourceResponse("image/svg+xml","UTF-8",ByteArrayInputStream(svg.toByteArray()))
    }
    private fun blocked()=WebResourceResponse("text/plain","UTF-8",403,"Blocked",emptyMap(),ByteArrayInputStream(ByteArray(0)))
    private fun emit(patch: JSONObject) {
        val changed = JSONObject()
        patch.keys().forEach { key -> if(snapshot.opt(key)?.toString() != patch.get(key).toString()) changed.put(key,patch.get(key)) }
        changed.keys().forEach { snapshot.put(it,changed.get(it)) }
        if(ready && !isDestroyed && changed.length()>0) web.evaluateJavascript("window.dlSoundEvent && window.dlSoundEvent(${changed});",null)
    }
    private fun reply(id: Long, error: String? = null, value: JSONObject? = null) { if(!isDestroyed) web.evaluateJavascript("window.dlSoundEvent && window.dlSoundEvent(${obj("reply" to id,"error" to error,"value" to value)});",null) }
    private fun error(text: String) { if(ready && !isDestroyed) web.evaluateJavascript("window.dlSoundEvent && window.dlSoundEvent(${obj("error" to text)});",null) }
    override fun onResume() { super.onResume(); if(::web.isInitialized) { web.onResume(); publishPermission(); publishEnvironment(); if(Permissions.hasFilePermission(this)) startLibrary() } }
    override fun onPause() { if(::web.isInitialized) web.onPause(); super.onPause() }
    override fun onSaveInstanceState(outState: Bundle) { outState.putString("pickingTrack",pickingTrack); super.onSaveInstanceState(outState) }
    override fun onConfigurationChanged(newConfig: Configuration) { super.onConfigurationChanged(newConfig); publishEnvironment() }
    override fun onDestroy() { ProcessLifecycleOwner.get().lifecycle.removeObserver(processObserver); ready=false; subscriptions.clear(); librarySubscriptions.clear(); web.removeJavascriptInterface("DLSound"); web.destroy(); super.onDestroy() }
    companion object {
        private const val HOST="app.dlsound.local"
        private fun obj(vararg values: Pair<String,Any?>)=JSONObject().apply { values.forEach { put(it.first,it.second ?: JSONObject.NULL) } }
    }
}
