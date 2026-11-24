package com.github.anrimian.musicplayer.ui.learning

import android.app.Application
import android.net.Uri
import android.os.Handler
import android.os.Looper
import androidx.lifecycle.AndroidViewModel
import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.data.models.composition.source.ExternalCompositionSource
import com.github.anrimian.musicplayer.data.models.folders.UriFileReference
import com.github.anrimian.musicplayer.di.Components
import com.github.anrimian.musicplayer.domain.models.player.PlayerState
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers
import io.reactivex.rxjava3.core.Observable
import io.reactivex.rxjava3.disposables.CompositeDisposable
import io.reactivex.rxjava3.schedulers.Schedulers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.rx3.asFlow
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.util.concurrent.Executors
import java.util.concurrent.atomic.AtomicInteger

internal data class LearningState(
    val folder: String? = null,
    val folderLabel: String = "",
    val files: List<LearningFile> = emptyList(),
    val canGoUp: Boolean = false,
    val browsing: Boolean = false,
    val readerPage: Boolean = false,
    val track: LearningFile? = null,
    val position: Long = 0,
    val duration: Long = 0,
    val playing: Boolean = false,
    val openingAudio: Boolean = false,
    val mode: SubtitleMode = SubtitleMode.JAPANESE,
    val furigana: Boolean = true,
    val fontSize: Int = 23,
    val document: SubtitleDocument? = null,
    val rendered: List<RenderedCue> = emptyList(),
    val revision: Int = 0,
    val subtitleName: String = "",
    val subtitleStatus: Int = R.string.himitsu_no_track,
    val readingBusy: Boolean = false,
    val readingFailed: Boolean = false,
    val notice: Int = 0,
    val noticeSequence: Int = 0,
)

internal class LearningViewModel(application: Application, private val libraryMode: Boolean = false, private val incoming: Boolean = false, private val folderSession: Boolean = false) : AndroidViewModel(application) {
    private val context = application.applicationContext
    private val store = LearningStore(context)
    private val files = SafLearningFiles(context)
    private val player = Components.getAppComponent().learningPlayerInteractor()
    private val subscriptions = CompositeDisposable()
    private val worker = Executors.newSingleThreadExecutor { task -> Thread(task, "himitsu-subtitles") }
    private val main = Handler(Looper.getMainLooper())
    private val generation = AtomicInteger()
    private val folderGeneration = AtomicInteger()
    private var folderStack = mutableListOf<String>()
    private var queue = emptyList<LearningFile>()
    private var queueIndex = -1
    private val folderNames = mutableListOf<String>()
    private var queueFolderNames = emptyList<String>()
    private var attachedPlayerUri: String? = null
    private var automatic = emptyMap<String, List<ReadingSpan>>()
    private var automaticReady = false
    private val manualSelections = mutableMapOf<String, Int>()
    @Volatile private var cleared = false
    private val mutable = MutableStateFlow(LearningState(mode = store.mode, furigana = store.furigana, fontSize = store.fontSize))
    val state = mutable.asStateFlow()

    private val libraryPlayer = Components.getAppComponent().libraryPlayerInteractor()
    // Subscribing only while a screen is visible keeps clock ticks out of subtitle and folder state.
    val playbackPositions: Observable<Long> get() = if (libraryMode) libraryPlayer.getTrackPositionObservable()
        else player.getTrackPositionObservable().observeOn(AndroidSchedulers.mainThread()).filter {
            attachedPlayerUri != null && attachedPlayerUri == mutable.value.track?.uri
        }

    // The classic library fragments consume a combined snapshot while their views are started.
    val timedLibraryState get() = combine(state, playbackPositions.startWithItem(0L).asFlow()) { snapshot, time ->
        snapshot.copy(position = time)
    }
    private var libraryTrackId: Long? = null
    private var libraryFolder: String? = null

    init {
        if (libraryMode) bindLibraryPlayer() else restoreLearningPlayer()
    }

    private fun restoreLearningPlayer() {
        val lastUri = store.trackUri.takeUnless { incoming || folderSession }
        if (lastUri != null) mutable.update { it.copy(track = LearningFile(lastUri, store.trackName, false, audio = true), position = store.position(lastUri)) }
        LearningProgressRecorder.start(context, player)
        player.setExternalPlayerKeepInBackground(true)
        subscriptions.add(player.getCurrentSourceObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ value ->
            val source = value.value as? ExternalCompositionSource
            attachedPlayerUri = source?.uri?.toString()
            if (attachedPlayerUri == mutable.value.track?.uri && source != null) {
                mutable.update { it.copy(duration = source.duration.coerceAtLeast(0), openingAudio = false) }
                if (source.duration > 0 && store.position(attachedPlayerUri!!) >= source.duration) {
                    player.onSeekFinished(0)
                    store.savePosition(attachedPlayerUri!!, 0)
                }
            }
        }, { notice(R.string.himitsu_audio_error) }))
        subscriptions.add(player.getIsPlayingStateObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ playing ->
            mutable.update { it.copy(playing = playing && attachedPlayerUri == it.track?.uri) }
        }, {}))
        subscriptions.add(player.getPlayerStateObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ playerState ->
            if (playerState is PlayerState.Error) {
                attachedPlayerUri = null
                mutable.update { it.copy(openingAudio = false, playing = false) }
                notice(R.string.himitsu_audio_error)
            }
        }, {}))
        if (folderSession) {
            subscriptions.add(player.finishedSources.observeOn(AndroidSchedulers.mainThread()).subscribe { source ->
                if ((source as? ExternalCompositionSource)?.uri?.toString() == mutable.value.track?.uri && canSkip(1)) next()
            })
        }
        if (incoming || folderSession) return
        store.treeUri?.let { tree ->
            val saved = store.browserStack.filter { runCatching { Uri.parse(it).authority == Uri.parse(tree).authority }.getOrDefault(false) }
            val root = runCatching { files.root(tree) }.getOrNull()
            folderStack = (saved.ifEmpty { listOfNotNull(root) }).toMutableList()
            folderStack.lastOrNull()?.let(::loadFolder)
        }
        if (lastUri != null && store.trackFolder != null) {
            worker.execute {
                val restoredQueue = runCatching { files.list(store.trackFolder!!).filter { it.audio } }.getOrDefault(emptyList())
                val file = restoredQueue.firstOrNull { it.uri == lastUri }
                main.post {
                    if (!cleared && mutable.value.track?.uri == lastUri) {
                        queue = restoredQueue
                        if (file != null) selectTrack(file, false, store.trackFolder!!)
                        else notice(R.string.himitsu_file_unavailable)
                    }
                }
            }
        }
    }

    private fun bindLibraryPlayer() {
        subscriptions.add(libraryPlayer.getCurrentQueueItemObservable()
            .observeOn(AndroidSchedulers.mainThread()).subscribe({ event ->
                val track = event.playQueueItem
                if (libraryTrackId != track?.id) {
                    libraryTrackId = track?.id
                    generation.incrementAndGet()
                    libraryFolder = null
                    mutable.update { it.copy(track = null, document = null, rendered = emptyList(),
                        revision = it.revision + 1, position = 0, duration = track?.duration ?: 0) }
                    if (track != null) loadLibraryTrack(track.id, track.title)
                }
            }, { notice(R.string.himitsu_audio_error) }))
        subscriptions.add(libraryPlayer.getIsPlayingStateObservable()
            .observeOn(AndroidSchedulers.mainThread()).subscribe({ playing ->
                mutable.update { it.copy(playing = playing) }
            }, {}))
    }

    private fun loadLibraryTrack(id: Long, title: String) {
        worker.execute {
            val result = runCatching {
                val component = Components.getAppComponent()
                val source = component.storageSourceRepository().getStorageSource(id).blockingGet()
                    ?: error("file_unavailable")
                val uri = component.contentSourceHelper().createUri(source).toString()
                val file = runCatching { component.contentSourceHelper().getAsFile(source) }.getOrNull()
                val folder = file?.let { files.readableParent(it) }
                Pair(LearningFile(uri, file?.name ?: title, false, audio = true, parentDocument = file?.let(files::parentDocument)), folder)
            }
            main.post {
                if (cleared || libraryTrackId != id) return@post
                result.onSuccess { (track, folder) ->
                    libraryFolder = folder
                    mutable.update { it.copy(track = track) }
                    loadSubtitle(track.uri, folder)
                }.onFailure { notice(R.string.himitsu_file_unavailable) }
            }
        }
    }

    fun openIncoming(uri: Uri) {
        worker.execute {
            val result = runCatching { files.incomingFile(uri) }
            main.post {
                if (cleared) return@post
                result.onSuccess { (file, parent) ->
                    queue = listOf(file)
                    selectTrack(file, true, parent)
                }.onFailure { notice(R.string.himitsu_file_unavailable) }
            }
        }
    }

    fun chooseTree(uri: Uri) {
        store.treeUri = uri.toString()
        if (incoming || folderSession) {
            val track = mutable.value.track ?: return
            val folder = if (track.parentDocument == null) files.root(uri.toString()) else files.grantedParent(track.parentDocument)
            store.trackFolder = folder
            loadSubtitle(track.uri, folder)
            return
        }
        if (libraryMode) {
            libraryTrackId?.let { loadLibraryTrack(it, mutable.value.track?.name.orEmpty()) }
            return
        }
        browseTree(uri)
    }

    fun browseTree(uri: Uri) {
        folderNames.clear()
        folderStack = mutableListOf(files.root(uri.toString()))
        store.browserStack = folderStack
        loadFolder(folderStack.last())
    }

    fun open(file: LearningFile) {
        if (file.directory) {
            folderNames.add(file.name)
            folderStack.add(file.uri)
            store.browserStack = folderStack
            loadFolder(file.uri)
        } else if (file.audio) {
            if (mutable.value.openingAudio) return
            queueFolderNames = folderNames.toList()
            queue = mutable.value.files.filter { it.audio }
            selectTrack(file, true, mutable.value.folder ?: return)
        }
    }

    fun up() {
        if (folderStack.size > 1) {
            if (folderNames.isNotEmpty()) folderNames.removeAt(folderNames.lastIndex)
            folderStack.removeAt(folderStack.lastIndex)
            store.browserStack = folderStack
            loadFolder(folderStack.last())
        }
    }

    private fun loadFolder(folder: String) {
        val request = folderGeneration.incrementAndGet()
        mutable.update { it.copy(browsing = true, readerPage = false) }
        worker.execute {
            val result = runCatching { files.list(folder) }
            main.post {
                if (cleared || folderGeneration.get() != request) return@post
                result.onSuccess { listing ->
                    val label = runCatching { android.provider.DocumentsContract.getDocumentId(Uri.parse(folder)).substringAfter(':') }.getOrDefault(folder)
                    mutable.update { it.copy(folder = folder, folderLabel = label, files = listing.filter { file -> file.directory || file.audio },
                        canGoUp = folderStack.size > 1, browsing = false) }
                }.onFailure { error ->
                    mutable.update { it.copy(browsing = false, files = emptyList()) }
                    notice(if (error is SecurityException) R.string.himitsu_directory_permission else R.string.himitsu_directory_error)
                }
            }
        }
    }

    private fun selectTrack(file: LearningFile, autoPlay: Boolean, folder: String?) {
        if (mutable.value.openingAudio) return
        savePosition()
        store.trackUri = file.uri
        store.trackName = file.name
        store.trackFolder = folder
        queueIndex = queue.indexOfFirst { it.uri == file.uri }
        val restoredIdentity = if (folderSession) {
            val document = Uri.parse(file.uri)
            val authority = document.authority.orEmpty()
            val physical = authority == "com.android.externalstorage.documents"
            val root = if (physical) authority else authority + "/" + android.provider.DocumentsContract.getTreeDocumentId(document)
            val relative = if (physical) android.provider.DocumentsContract.getDocumentId(document)
                           else JSONArray(queueFolderNames + file.name).toString()
            store.folderPositions.bind(file.uri, root, relative, file.size, store.position(file.uri))
        } else store.folderPositions.rebindKnownFile(file.uri, file.size)
        if (store.checkFileVersion(file, restoredIdentity) && attachedPlayerUri == file.uri) attachedPlayerUri = null
        val initial = store.position(file.uri)
        mutable.update { it.copy(track = file, position = initial, duration = if (attachedPlayerUri == file.uri) it.duration else 0,
            readerPage = true, openingAudio = attachedPlayerUri != file.uri) }
        loadSubtitle(file.uri, folder)
        if (attachedPlayerUri != file.uri) {
            subscriptions.add(player.startPlaying(UriFileReference(Uri.parse(file.uri), false), initial, autoPlay)
                .subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread()).subscribe({
                    mutable.update { it.copy(openingAudio = false) }
                }, { mutable.update { it.copy(openingAudio = false, playing = false) }; notice(R.string.himitsu_audio_error) }))
        } else if (autoPlay && !mutable.value.playing) player.play(0)
    }

    fun playPause() {
        val track = mutable.value.track ?: return
        if (mutable.value.openingAudio) return
        if (attachedPlayerUri == track.uri) player.playOrPause()
        else selectTrack(track, true, store.trackFolder)
    }

    fun canSkip(delta: Int): Boolean {
        return queueIndex >= 0 && queueIndex + delta in queue.indices
    }
    fun previous() = skip(-1)
    fun next() = skip(1)
    private fun skip(delta: Int) {
        if (mutable.value.openingAudio || queue.isEmpty()) return
        val target = queue.getOrNull(queueIndex + delta) ?: return
        selectTrack(target, true, store.trackFolder ?: return)
    }

    fun seek(position: Long) {
        if (libraryMode) {
            libraryPlayer.onSeekFinished(position.coerceIn(0, mutable.value.duration.coerceAtLeast(0)))
            return
        }
        if (attachedPlayerUri != mutable.value.track?.uri) return
        val duration = mutable.value.duration
        val target = position.coerceIn(0, if (duration > 0) duration else Long.MAX_VALUE)
        player.onSeekFinished(target)
        mutable.update { it.copy(position = target) }
        mutable.value.track?.let { LearningProgressRecorder.saveSeek(it.uri, target) }
    }

    fun seekCue(fingerprint: String, id: String) {
        val snapshot = mutable.value
        val document = snapshot.document ?: return
        val track = snapshot.track ?: return
        if (document.fingerprint == fingerprint) document.cues.firstOrNull { it.id == id }?.let {
            seek(it.startMs + store.offset(track.uri, fingerprint))
        }
    }

    fun page(reader: Boolean) { mutable.update { it.copy(readerPage = reader) } }
    fun mode(mode: SubtitleMode) { store.mode = mode; mutable.update { it.copy(mode = mode) } }
    fun furigana(enabled: Boolean) {
        store.furigana = enabled
        mutable.update { it.copy(furigana = enabled, readingFailed = false) }
        if (enabled) ensureAutomaticReadings()
    }
    fun font(delta: Int) { store.fontSize = store.fontSize + delta; mutable.update { it.copy(fontSize = store.fontSize) } }

    fun selectSubtitle(uri: Uri, forTrack: String) {
        val selection = (manualSelections[forTrack] ?: 0) + 1
        manualSelections[forTrack] = selection
        worker.execute {
            val target = store.manualFile(forTrack)
            val staged = runCatching {
                val raw = files.text(uri.toString())
                val document = decodeManualSubtitle(raw, files.displayName(uri))
                val temp = File.createTempFile("import-", ".tmp", target.parentFile)
                try {
                    temp.writeText(raw, Charsets.UTF_8)
                    temp to document
                } catch (e: Exception) {
                    temp.delete()
                    throw e
                }
            }
            main.post {
                val temp = staged.getOrNull()?.first
                try {
                    if (cleared || manualSelections[forTrack] != selection) return@post
                    val (file, document) = staged.getOrThrow()
                    check(file.renameTo(target))
                    store.setPairBinding("track", forTrack, null)
                    store.setManualUri(forTrack, uri.toString())
                    if (mutable.value.track?.uri == forTrack) loadSubtitle(forTrack, null, document)
                    else notice(R.string.himitsu_subtitle_saved)
                } catch (e: Exception) {
                    notice(subtitleError(e))
                } finally {
                    temp?.delete()
                }
            }
        }
    }

    private fun decodeManualSubtitle(raw: String, name: String? = null): SubtitleDocument {
        val document = SubtitleFiles.decode(raw,name)
        if (document.cues.none { it.kind != CueKind.CLEAR }) throw SubtitleFormatException("empty")
        return document
    }

    private val subtitleFolder get() = if (libraryMode) libraryFolder else store.trackFolder
    private fun readPair(ja:String, zh:String) = SubtitlePair.combine(
        decodeManualSubtitle(files.text(ja),files.displayName(Uri.parse(ja))),
        decodeManualSubtitle(files.text(zh),files.displayName(Uri.parse(zh))))
    suspend fun selectPair(trackUri:String, ja:Uri, zh:Uri, directoryRule:Boolean) {
        val track = requireNotNull(state.value.track?.takeIf { it.uri == trackUri }) { "播放音轨已变化，请重新选择" }
        require(ja != zh) { "请选择两份不同的字幕文件" }
        val folder = subtitleFolder
        val selection = (manualSelections[trackUri] ?: 0) + 1
        manualSelections[trackUri] = selection
        val (names, suffixes) = kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) {
            readPair(ja.toString(), zh.toString())
            val names = listOf(ja,zh).map(files::displayName)
            val suffixes = if (directoryRule) {
                require(folder != null) { "请先授权音频所在目录" }
                val listing = files.list(folder)
                val base = track.name.substringBeforeLast('.')
                val selected = listOf(ja,zh)
                names.mapIndexed { i,name ->
                    val local = listing.singleOrNull { it.name == name }
                    val sameParent = track.parentDocument != null && files.parentDocument(selected[i]) == track.parentDocument
                    val sameDocument = local != null && runCatching {
                        android.provider.DocumentsContract.getDocumentId(Uri.parse(local.uri)) ==
                            android.provider.DocumentsContract.getDocumentId(selected[i]) && Uri.parse(local.uri).authority == selected[i].authority
                    }.getOrDefault(false)
                    require(local != null && (sameParent || sameDocument) && name.startsWith(base,true) && name.length > base.length) {
                        "目录规则需要同目录、以当前音频文件名开头的两份字幕"
                    }
                    name.substring(base.length)
                }
            } else null
            names to suffixes
        }
        check(!cleared && state.value.track?.uri == trackUri && manualSelections[trackUri] == selection) { "播放音轨已变化，请重新选择" }
        store.setPairBinding("track",trackUri,JSONArray(listOf(ja.toString(),zh.toString()) + names))
        if (suffixes != null && folder != null) store.setPairBinding("folder",folder,JSONArray(suffixes))
        store.setManualUri(trackUri,null)
        reloadSubtitle()
    }
    fun clearPairRule() {
        subtitleFolder?.let { store.setPairBinding("folder",it,null) }
        reloadSubtitle()
    }
    fun hasPairRule() = subtitleFolder?.let { store.pairBinding("folder",it) } != null
    fun reloadSubtitle() {
        mutable.value.track?.let { loadSubtitle(it.uri,if(libraryMode) libraryFolder else store.trackFolder) }
    }
    fun automaticSubtitle() {
        val track = mutable.value.track ?: return
        manualSelections[track.uri] = (manualSelections[track.uri] ?: 0) + 1
        store.setPairBinding("track", track.uri, null)
        store.setManualUri(track.uri, null)
        store.manualFile(track.uri).delete()
        loadSubtitle(track.uri, if (libraryMode) libraryFolder else store.trackFolder)
    }

    private fun loadSubtitle(trackUri: String, folder: String?, validated: SubtitleDocument? = null) {
        val request = generation.incrementAndGet()
        automatic = emptyMap()
        automaticReady = false
        mutable.update { it.copy(document = null, rendered = emptyList(), revision = it.revision + 1,
            subtitleStatus = R.string.himitsu_subtitle_loading, subtitleName = "", readingBusy = false, readingFailed = false) }
        worker.execute {
            val manualUri = store.manualUri(trackUri)
            val pair = store.pairBinding("track",trackUri)
            var retiredManual = false
            var retiredPair = false
            val result = runCatching {
                fun manualSelection(): Triple<SubtitleDocument, Int, String>? {
                    if (pair != null) {
                        if (SubtitleFiles.retiredName(pair.optString(2)) || SubtitleFiles.retiredName(pair.optString(3))) {
                            retiredPair = true
                        } else try {
                            return Triple(readPair(pair.getString(0),pair.getString(1)),R.string.himitsu_subtitle_manual,
                                pair.getString(2)+" / "+pair.getString(3))
                        } catch (e:SubtitleFormatException) {
                            if(e.problem!="retired") throw e
                            retiredPair=true
                        }
                    }
                    if (manualUri == null) return null
                    val uri = Uri.parse(manualUri)
                    val name = runCatching { files.displayName(uri) }.getOrNull()
                        ?: uri.lastPathSegment?.substringAfterLast('/').orEmpty()
                    if (validated != null) return Triple(validated, R.string.himitsu_subtitle_manual, name)
                    val cached=store.manualFile(trackUri)
                    if (SubtitleFiles.retiredName(Uri.parse(manualUri).lastPathSegment)) { retiredManual=true;return null }
                    try {
                        val content=runCatching { files.text(manualUri) }.getOrNull()
                        val fresh=content?.let { raw ->
                            try { raw to decodeManualSubtitle(raw) }
                            catch(e:SubtitleFormatException) { if(e.problem=="retired") throw e else null }
                            catch(e:Exception) { null }
                        }
                        val parsed=fresh?.second ?: if(cached.isFile) decodeManualSubtitle(cached.inputStream().use(SafLearningFiles::readText)) else return null
                        if(fresh!=null) {
                            val temp=File(cached.path+".tmp")
                            temp.writeText(fresh.first,Charsets.UTF_8)
                            if(!temp.renameTo(cached)) temp.delete()
                        }
                        return Triple(parsed, R.string.himitsu_subtitle_manual, name)
                    } catch(e:SubtitleFormatException) {
                        if(e.problem!="retired") throw e
                        retiredManual=true
                        return null
                    }
                }
                manualSelection() ?: run {
                    val name = mutable.value.track?.takeIf { it.uri == trackUri }?.name ?: store.trackName
                    val listing = if (folder != null) files.list(folder) else emptyList()
                    val sidecar = SubtitleFiles.match(name, listing)
                    val rule = folder?.let { store.pairBinding("folder",it) }?.let { listOf(it.getString(0),it.getString(1)) }
                    val paired = rule?.let { SubtitlePair.match(name,listing,it) }
                        ?: if (sidecar == null) SubtitlePair.match(name,listing) else null
                    if (paired != null) {
                        val (ja,zh) = paired
                        Triple(readPair(ja.uri,zh.uri), R.string.himitsu_subtitle_auto, ja.name + " / " + zh.name)
                    } else if (sidecar == null) {
                        val embedded = if (libraryMode) runCatching {
                            libraryPlayer.getCurrentCompositionLyrics().firstOrError()
                                .timeout(3, java.util.concurrent.TimeUnit.SECONDS).blockingGet().value
                        }.getOrNull() else null
                        if (embedded.isNullOrBlank()) {
                            val status = if (files.needsTreeForSidecars(folder)) R.string.himitsu_subtitle_folder_needed
                                else R.string.himitsu_subtitle_missing
                            Triple(null, status, "")
                        }
                        else {
                            val parsed = SubtitleFiles.decode(embedded)
                            val document = if (parsed.cues.isNotEmpty()) parsed else SubtitleDocument(
                                "embedded", textFingerprint(embedded), listOf(SubtitleCue("embedded", 0,
                                    japanese = listOf(WrittenPiece(embedded)), allowAutomaticReading = hasJapaneseKana(embedded))))
                            Triple(document, R.string.himitsu_subtitle_auto, "文件内歌词")
                        }
                    }
                    else Triple(SubtitleFiles.decode(files.text(sidecar.uri), sidecar.name), R.string.himitsu_subtitle_auto, sidecar.name)
                }
            }
            main.post {
                if (cleared || generation.get() != request || mutable.value.track?.uri != trackUri) return@post
                if (retiredManual && store.manualUri(trackUri)==manualUri) store.setManualUri(trackUri,null)
                if (retiredPair && store.pairBinding("track",trackUri)?.toString()==pair?.toString()) store.setPairBinding("track",trackUri,null)
                result.onSuccess { (document, status, name) ->
                    mutable.update { it.copy(document = document, subtitleStatus = if (document != null && document.cues.isEmpty()) R.string.himitsu_subtitle_empty else status, subtitleName = name) }
                    renderReadings()
                    ensureAutomaticReadings()
                }.onFailure { error -> mutable.update { it.copy(subtitleStatus = subtitleError(error)) } }
            }
        }
    }

    private val renderGeneration = java.util.concurrent.atomic.AtomicInteger()

    private fun renderReadings() {
        val document = mutable.value.document ?: return
        val track = mutable.value.track?.uri ?: return
        val request = generation.get()
        val revision = renderGeneration.incrementAndGet()
        val readings = automatic
        worker.execute {
            val correction = store.correctionsFor(track, document)
            val rendered = document.cues.map { cue ->
                if (cleared || generation.get() != request || renderGeneration.get() != revision) return@execute
                RenderedCue(cue, ReadingEngine.render(cue, readings[cue.id].orEmpty()) { correction(cue, it) })
            }
            main.post {
                if (!cleared && generation.get() == request && renderGeneration.get() == revision && mutable.value.track?.uri == track)
                    mutable.update { it.copy(rendered = rendered, revision = it.revision + 1) }
            }
        }
    }

    private fun ensureAutomaticReadings() {
        val snapshot = mutable.value
        val document = snapshot.document ?: return
        if (!snapshot.furigana || snapshot.readingBusy || automaticReady || snapshot.readingFailed) return
        val request = generation.get()
        mutable.update { it.copy(readingBusy = true) }
        worker.execute {
            val result = try {
                val required = document.cues.filter { cue -> cue.kind == CueKind.DIALOGUE && cue.allowAutomaticReading &&
                    cue.japanese.any { it.reading == null && containsKanji(it.text) } }
                Result.success(if (required.isEmpty()) emptyMap() else readingCache(document, required, request))
            } catch (error: Exception) { Result.failure(error) }
            catch (error: LinkageError) { Result.failure(error) }
            catch (error: OutOfMemoryError) { Result.failure(error) }
            main.post {
                if (cleared || generation.get() != request) return@post
                result.onFailure { android.util.Log.w("HimitsuReading", "Offline reading generation failed", it) }
                result.onSuccess { automatic = it; automaticReady = true }
                mutable.update { it.copy(readingBusy = false, readingFailed = result.isFailure) }
                if (automatic.isNotEmpty()) renderReadings()
            }
        }
    }

    private fun readingCache(document: SubtitleDocument, required: List<SubtitleCue>, request: Int): Map<String, List<ReadingSpan>> {
        val cacheFile = File(store.directory, "${document.fingerprint}-${OfflineJapaneseReadings.VERSION}.json")
        runCatching {
            if (cacheFile.isFile && cacheFile.length() <= SafLearningFiles.MAX_BYTES) {
                val root = JSONObject(cacheFile.readText(Charsets.UTF_8))
                return required.associate { cue ->
                    val array = root.optJSONArray(cue.id) ?: JSONArray()
                    cue.id to (0 until array.length()).map { i ->
                        val item = array.getJSONArray(i)
                        val span = ReadingSpan(item.getInt(0), item.getInt(1), item.getString(2))
                        require(span.start >= 0 && span.end <= cue.japaneseText.length && span.end > span.start && validReading(span.reading))
                        span
                    }
                }
            }
        }
        val result = linkedMapOf<String, List<ReadingSpan>>()
        val startedAt = android.os.SystemClock.elapsedRealtime()
        val runtime = Runtime.getRuntime()
        val heapBefore = runtime.totalMemory() - runtime.freeMemory()
        required.forEach { cue ->
            if (generation.get() != request || cleared) return emptyMap()
            result[cue.id] = OfflineJapaneseReadings.spans(cue.japaneseText)
        }
        android.util.Log.i("HimitsuReading", "generated cues=${result.size} elapsedMs=${android.os.SystemClock.elapsedRealtime() - startedAt} heapDeltaBytes=${runtime.totalMemory() - runtime.freeMemory() - heapBefore}")
        val root = JSONObject()
        result.forEach { (id, spans) -> root.put(id, JSONArray().apply { spans.forEach { put(JSONArray(listOf(it.start, it.end, it.reading))) } }) }
        runCatching {
            val temporary = File(cacheFile.path + ".tmp")
            temporary.writeText(root.toString(), Charsets.UTF_8)
            if (!temporary.renameTo(cacheFile)) temporary.delete()
        }
        return result
    }

    fun correct(trackUri: String, fingerprint: String, cueId: String, index: Int, reading: String?, expected: ReadingPiece? = null) {
        val document = mutable.value.document ?: return
        val track = mutable.value.track?.uri ?: return
        if (track != trackUri || document.fingerprint != fingerprint) return
        val rendered = mutable.value.rendered.firstOrNull { it.cue.id == cueId } ?: return
        val piece = rendered.pieces.getOrNull(index) ?: return
        if (expected != null && (expected.start != piece.start || expected.text != piece.text)) return
        if (reading != null && !validReading(reading)) { notice(R.string.himitsu_invalid_reading); return }
        store.correct(track, document, rendered.cue, piece, reading)
        renderReadings()
    }

    fun savePosition() {
        if (libraryMode) return
        mutable.value.track?.uri?.takeIf { it == attachedPlayerUri }?.let(LearningProgressRecorder::flush)
    }

    fun notice(resource: Int) { mutable.update { it.copy(notice = resource, noticeSequence = it.noticeSequence + 1) } }
    private fun subtitleError(error: Throwable): Int {
        android.util.Log.w("HimitsuSubtitles", "Subtitle load failed", error)
        return when ((error as? SubtitleFormatException)?.problem) {
            "retired" -> R.string.dlsound_supported_subtitles
            "empty" -> R.string.himitsu_subtitle_empty
            "reading" -> R.string.himitsu_invalid_reading
            "too_large" -> R.string.himitsu_subtitle_large
            else -> R.string.himitsu_subtitle_error
        }
    }

    override fun onCleared() {
        savePosition()
        cleared = true
        generation.incrementAndGet()
        folderGeneration.incrementAndGet()
        subscriptions.dispose()
        worker.shutdownNow()
    }
}
