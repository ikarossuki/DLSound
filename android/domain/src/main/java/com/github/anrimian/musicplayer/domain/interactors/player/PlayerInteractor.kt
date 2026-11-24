package com.github.anrimian.musicplayer.domain.interactors.player

import com.github.anrimian.musicplayer.domain.controllers.MusicPlayerController
import com.github.anrimian.musicplayer.domain.controllers.SystemMusicController
import com.github.anrimian.musicplayer.domain.controllers.SystemServiceController
import com.github.anrimian.musicplayer.domain.interactors.analytics.Analytics
import com.github.anrimian.musicplayer.domain.models.composition.content.RelaunchSourceException
import com.github.anrimian.musicplayer.domain.models.composition.source.CompositionSource
import com.github.anrimian.musicplayer.domain.models.player.AudioFocusEvent
import com.github.anrimian.musicplayer.domain.models.player.PlayerState
import com.github.anrimian.musicplayer.domain.models.player.events.MediaPlayerEvent
import com.github.anrimian.musicplayer.domain.models.player.events.PlayerEvent
import com.github.anrimian.musicplayer.domain.repositories.SettingsRepository
import com.github.anrimian.musicplayer.domain.utils.functions.Opt
import com.github.anrimian.musicplayer.domain.utils.rx.RxUtils
import io.reactivex.rxjava3.core.Completable
import io.reactivex.rxjava3.core.Observable
import io.reactivex.rxjava3.core.Scheduler
import io.reactivex.rxjava3.core.Single
import io.reactivex.rxjava3.disposables.CompositeDisposable
import io.reactivex.rxjava3.disposables.Disposable
import io.reactivex.rxjava3.disposables.SerialDisposable
import io.reactivex.rxjava3.subjects.BehaviorSubject
import io.reactivex.rxjava3.subjects.PublishSubject
import java.util.concurrent.TimeUnit

/**
 * This class should not be called without PlayerCoordinatorInteractor wrapper.
 *  Otherwise it can be called without source preparation.
 */
class PlayerInteractor(
    private val musicPlayerController: MusicPlayerController,
    private val compositionSourceInteractor: CompositionSourceInteractor,
    private val playerErrorParser: PlayerErrorParser,
    private val systemMusicController: SystemMusicController,
    private val systemServiceController: SystemServiceController,
    private val settingsRepository: SettingsRepository,
    private val delayedEventsScheduler: Scheduler,
    private val analytics: Analytics,
    private val maxRePrepareTries: Int = 2
) {

    private val playerStateSubject = BehaviorSubject.createDefault<PlayerState>(PlayerState.IDLE)
    private val isPlayingSubject = BehaviorSubject.createDefault(false)

    private val playerEventsSubject = PublishSubject.create<PlayerEvent>()

    private var currentSource: CompositionSource? = null
    private val currentSourceSubject = BehaviorSubject.create<Opt<CompositionSource>>()//add default null value and check all behaviour

    data class SentencePractice(val bounds: List<LongRange>, val passes: Int)
    data class ListeningRange(val start: Long, val end: Long, val passes: Int, val pauseAtEnd: Boolean,
                              val sentence: Int = 0, val practice: SentencePractice? = null) {
        val sentenceCount get() = practice?.bounds?.size ?: 0
    }
    private val listeningRange = BehaviorSubject.createDefault<Opt<ListeningRange>>(Opt())
    private val appVisible = BehaviorSubject.createDefault(false)

    fun onAppVisibilityChanged(visible: Boolean) = appVisible.onNext(visible)

    fun observeListeningRange(): Observable<Opt<ListeningRange>> = listeningRange.hide()

    fun clearListeningRange() {
        if (listeningRange.value?.value != null) listeningRange.onNext(Opt())
    }

    fun clearSentencePractice() {
        if (listeningRange.value?.value?.practice != null) clearListeningRange()
    }

    fun listenFrom(start: Long, end: Long?, passes: Int, pauseAtEnd: Boolean = false) {
        require(start >= 0 && (end == null || end > start) && passes in 0..99)
        listeningRange.onNext(Opt(end?.let { ListeningRange(start, it, passes, pauseAtEnd) }))
        seekTo(start)
        trackPositionChangeSubject.onNext(start)
        play()
    }

    fun listenToSentences(bounds: List<LongRange>, passes: Int) {
        require(bounds.isNotEmpty() && passes in 1..99)
        require(bounds.all { it.first >= 0 && it.last > it.first })
        startSentence(SentencePractice(bounds.toList(), passes), 0)
        play()
    }

    private fun startSentence(practice: SentencePractice, index: Int) {
        val bounds = practice.bounds[index]
        listeningRange.onNext(Opt(ListeningRange(bounds.first, bounds.last, practice.passes, false,
            index + 1, practice)))
        seekTo(bounds.first)
        trackPositionChangeSubject.onNext(bounds.first)
    }

    private fun repeatRangeAt(position: Long): Boolean {
        val range = listeningRange.value?.value ?: return false
        if (position < range.end) return false
        if (range.passes == 1) {
            val practice = range.practice
            if (practice != null && range.sentence < practice.bounds.size) {
                startSentence(practice, range.sentence)
                return true
            }
            clearListeningRange()
            if (range.pauseAtEnd) {
                pause()
                seekTo(range.end)
                return true
            }
            return false
        }
        if (range.passes > 1) listeningRange.onNext(Opt(range.copy(passes = range.passes - 1)))
        seekTo(range.start)
        trackPositionChangeSubject.onNext(range.start)
        return true
    }

    private var currentPosition = 0L
    private val trackPositionSubject = BehaviorSubject.create<Long>()
    private val trackPositionChangeSubject = PublishSubject.create<Long>()

    private var playAfterPrepare = false
    private var preparationDisposable: Disposable? = null
    private var isPreparing = false
    private var isPrepared = false

    private var pausedTransient = false

    private val eventsDisposable = CompositeDisposable()
    private var trackPositionDisposable: Disposable? = null
    private val pausedPositionRead = SerialDisposable()
    private var playerEventsDisposable: Disposable? = null
    private var delayedResumeDisposable: Disposable? = null

    private var resumeDelay = 0L

    private var rePrepareCount = 0

    fun prepareToPlay(compositionSource: CompositionSource, startPosition: Long) {
        clearListeningRange()
        rePrepareCount = 0

        this.currentSource = compositionSource
        currentSourceSubject.onNext(Opt(currentSource))

        prepareToPlayInternal(compositionSource, startPosition)
    }

    fun updateSource(source: CompositionSource) {
        if (this.currentSource == source) {
            this.currentSource = source
            currentSourceSubject.onNext(Opt(currentSource))
        }
    }

    fun reset() {
        clearListeningRange()
        stopTracingTrackPosition()
        eventsDisposable.clear()
        RxUtils.dispose(preparationDisposable)
        currentSource = null
        currentSourceSubject.onNext(Opt(null))
        systemServiceController.stopMusicService(forceStop = true, hideUi = true)
        musicPlayerController.stop()
        playAfterPrepare = false
        isPlayingSubject.onNext(false)
        playerStateSubject.onNext(PlayerState.IDLE)
    }

    fun play(delay: Long = 0L) {
        val currentSource = this.currentSource
        if (playerStateSubject.value == PlayerState.PLAY || currentSource == null) {
            return
        }
        this.resumeDelay = delay
        if (isPreparing) {
            isPlayingSubject.onNext(true)
            playAfterPrepare = true
            return
        }
        if (!isPrepared) {
            isPlayingSubject.onNext(true)
            playAfterPrepare = true
            prepareToPlayInternal(currentSource, currentPosition)
            return
        }
        eventsDisposable.clear()
        val audioFocusObservable = systemMusicController.requestAudioFocus()
        if (audioFocusObservable == null) {
            systemServiceController.stopMusicService()
            if (isPlayingSubject.value == true) {
                isPlayingSubject.onNext(false)
                playerStateSubject.onNext(PlayerState.PAUSE)
            }
            return
        }
        if (resumeDelay == 0L) {
            resumeInternal()
        } else {
            delayedResumeDisposable = Completable.complete()
                .delay(resumeDelay, TimeUnit.MILLISECONDS, delayedEventsScheduler)
                .subscribe {
                    resumeDelay = 0L
                    resumeInternal()
                }
        }
        systemServiceController.startMusicService()
        isPlayingSubject.onNext(true)
        playerStateSubject.onNext(PlayerState.PLAY)

        subscribeOnPlayerEvents(audioFocusObservable)
    }

    fun playAfterPrepare() {
        playAfterPrepare = true
        isPlayingSubject.onNext(true)
    }

    fun playOrPause() {
        if (isPlayingSubject.value == false) {
            play()
        } else {
            pause()
        }
    }

    fun stop() {
        clearListeningRange()
        systemServiceController.stopMusicService(true)
        playAfterPrepare = false
        musicPlayerController.stop()
        isPlayingSubject.onNext(false)
        playerStateSubject.onNext(PlayerState.STOP)
        stopTracingTrackPosition()
        seekTo(0)
        eventsDisposable.clear()
        delayedResumeDisposable?.dispose()
        delayedResumeDisposable = null
        RxUtils.dispose(preparationDisposable)
    }

    fun pause() {
        isPlayingSubject.onNext(false)
        systemServiceController.stopMusicService()
        eventsDisposable.clear()
        delayedResumeDisposable?.dispose()
        delayedResumeDisposable = null
        if (isPreparing) {
            playAfterPrepare = false
            return
        }
        if (isPrepared) {
            pausedTransient = false
            pauseInternal()
            playerStateSubject.onNext(PlayerState.PAUSE)
        }
    }

    fun error(throwable: Throwable) {
        clearListeningRange()
        systemServiceController.stopMusicService()
        musicPlayerController.seekTo(0)
        pauseInternal(capturePosition = false)
        eventsDisposable.clear()

        isPlayingSubject.onNext(false)
        playerStateSubject.onNext(PlayerState.Error(throwable))
    }

    fun onSeekStarted() {
        stopTracingTrackPosition()
    }

    fun onSeekFinished(position: Long) {
        pausedPositionRead.set(null)
        cancelRangeOutside(position)
        if (!isPreparing) {
            musicPlayerController.seekTo(position)
        }
        updateCurrentPosition(position)
        trackPositionChangeSubject.onNext(position)
        if (playerStateSubject.value == PlayerState.PLAY) {
            startTracingTrackPosition()
        }
    }

    fun fastSeekForward(): Single<Long> {
        return seekBy(settingsRepository.rewindValueMillis)
    }

    fun fastSeekBackward(): Single<Long> {
        return seekBy(-settingsRepository.rewindValueMillis)
    }

    fun getTrackPositionObservable(): Observable<Long> {
        return trackPositionSubject.distinctUntilChanged()
    }

    fun getTrackPositionChangeObservable(): Observable<Long> {
        return trackPositionChangeSubject
    }

    fun getPlayerStateObservable(): Observable<PlayerState> {
        return playerStateSubject
    }

    fun getIsPlayingStateObservable(): Observable<Boolean> {
        return isPlayingSubject.distinctUntilChanged()
    }

    fun isPlaying() = isPlayingSubject.value == true

    fun getTrackPosition(): Single<Long> {
        if (isPreparing) {
            return Single.just(currentPosition)
        }
        return musicPlayerController.getTrackPosition()
    }

    fun setPlaybackSpeed(speed: Float) {
        musicPlayerController.setPlaybackSpeed(speed)
    }

    fun getPlayerEventsObservable(): Observable<PlayerEvent> {
        return playerEventsSubject
    }

    fun getCurrentSourceObservable(): Observable<Opt<CompositionSource>> {
        return currentSourceSubject
    }

    fun getCurrentSource(): CompositionSource? {
        return currentSource
    }

    fun getSpeedChangeAvailableObservable(): Observable<Boolean> {
        return musicPlayerController.getSpeedChangeAvailableObservable()
    }

    fun getCurrentPlaybackSpeedObservable(): Observable<Float> {
        return musicPlayerController.getCurrentPlaybackSpeedObservable()
    }

    private fun prepareToPlayInternal(compositionSource: CompositionSource, startPosition: Long) {
        isPrepared = false

        stopTracingTrackPosition()
        updateCurrentPosition(startPosition)

        isPreparing = true
        RxUtils.dispose(preparationDisposable)
        if (isPlayingSubject.value == true) {
            musicPlayerController.pause()
        }
        if (playerEventsDisposable == null) {
            playerEventsDisposable = musicPlayerController.getPlayerEventsObservable()
                .subscribe(this::onPlayerEventReceived)
        }
        preparationDisposable = compositionSourceInteractor.getCompositionSource(compositionSource)
            .doOnSubscribe { playerStateSubject.onNext(PlayerState.LOADING) }
            .doOnSuccess { playerStateSubject.onNext(PlayerState.PREPARING) }
            .flatMapCompletable(musicPlayerController::prepareToPlay)
            .subscribe(this::onSourcePrepared, this::onSourcePreparingError)
    }

    private fun onSourcePrepared() {
        isPreparing = false
        isPrepared = true
        musicPlayerController.seekTo(currentPosition)
        currentSource?.let { source ->
            playerEventsSubject.onNext(PlayerEvent.PreparedEvent(source))
        }

        if (playAfterPrepare) {
            playAfterPrepare = false
            play()
        } else {
            if (isPlayingSubject.value == true) {
                resumeInternal()
                playerStateSubject.onNext(PlayerState.PLAY)
            } else {
                musicPlayerController.pause()
                playerStateSubject.onNext(PlayerState.PAUSE)
            }
        }
    }

    private fun onSourcePreparingError(throwable: Throwable) {
        val formattedException = parseError(throwable) ?: return

        isPreparing = false
        playAfterPrepare = false

        currentSource?.let { source ->
            playerEventsSubject.onNext(PlayerEvent.ErrorEvent(formattedException, source))
        }
    }

    private fun subscribeOnPlayerEvents(audioFocusObservable: Observable<AudioFocusEvent>) {
        if (eventsDisposable.size() != 0) {
            return
        }
        eventsDisposable.add(audioFocusObservable.subscribe(this::onAudioFocusChanged))
        eventsDisposable.add(systemMusicController.getAudioBecomingNoisyObservable()
            .subscribe { onAudioBecomingNoisy() })
        eventsDisposable.add(systemMusicController.getVolumeObservable()
            .subscribe(this::onVolumeChanged))
    }

    private fun updateCurrentPosition(position: Long) {
        currentPosition = position
        trackPositionSubject.onNext(position)
    }

    private fun onAudioFocusChanged(event: AudioFocusEvent) {
        val isPlaying = isPlayingSubject.value == true
        when (event) {
            AudioFocusEvent.GAIN -> {
                musicPlayerController.setVolume(1f)
                if (pausedTransient) {
                    pausedTransient = false
                    isPlayingSubject.onNext(true)
                    if (isPreparing) {
                        return
                    }
                    playerStateSubject.onNext(PlayerState.PLAY)
                    resumeInternal()
                } else if (!isPlaying) {
                    systemServiceController.stopMusicService()
                }
            }
            AudioFocusEvent.LOSS_SHORTLY -> {
                if (isPlaying && settingsRepository.isDecreaseVolumeOnAudioFocusLossEnabled) {
                    musicPlayerController.setVolume(0.5f)
                }
            }
            AudioFocusEvent.LOSS_TRANSIENT -> {
                if (isPlaying && settingsRepository.isPauseOnAudioFocusLossEnabled) {
                    pausedTransient = true
                    isPlayingSubject.onNext(false)
                    if (isPreparing) {
                        return
                    }
                    pauseInternal()
                    playerStateSubject.onNext(PlayerState.PAUSE)
                }
            }
            AudioFocusEvent.LOSS -> {
                if (isPlaying && settingsRepository.isPauseOnAudioFocusLossEnabled) {
                    pausedTransient = false
                    isPlayingSubject.onNext(false)
                    systemServiceController.stopMusicService()
                    if (isPreparing) {
                        return
                    }
                    pauseInternal()
                    playerStateSubject.onNext(PlayerState.PAUSE)
                }
            }
        }
    }

    private fun onAudioBecomingNoisy() {
        if (!settingsRepository.isPauseOnAudioDeviceRemoveEnabled) {
            return
        }
        systemServiceController.stopMusicService()
        if (pausedTransient) {
            pausedTransient = false
            return
        }
        pauseInternal()
        isPlayingSubject.onNext(false)
        playerStateSubject.onNext(PlayerState.PAUSE)
    }

    private fun onPlayerEventReceived(event: MediaPlayerEvent) {
        val currentSource = currentSource ?: return
        when(event) {
            MediaPlayerEvent.Finished -> {
                if (!repeatRangeAt(Long.MAX_VALUE)) playerEventsSubject.onNext(PlayerEvent.FinishedEvent(currentSource))
                else if (isPlaying()) resumeInternal()
            }
            is MediaPlayerEvent.Error -> onPlayerErrorEventReceived(event.throwable, currentSource)
        }
    }

    private fun onPlayerErrorEventReceived(throwable: Throwable, currentSource: CompositionSource) {
        if (isPreparing) {
            return
        }
        val formattedException = parseError(throwable) ?: return

        isPrepared = false

        playerEventsSubject.onNext(PlayerEvent.ErrorEvent(formattedException, currentSource))
    }

    private fun parseError(throwable: Throwable): Throwable? {
        val formattedException = playerErrorParser.parseError(throwable)
        if (formattedException is RelaunchSourceException) {
            if (launchRePrepare()) {
                return null
            }
            val cause = formattedException.cause
            analytics.processNonFatalError(cause)
            return cause
        }
        return formattedException
    }

    private fun launchRePrepare(): Boolean {
        val source = currentSource
        if (source == null || rePrepareCount >= maxRePrepareTries) {
            rePrepareCount = 0
            return false
        }
        rePrepareCount++
        prepareToPlayInternal(source, currentPosition)
        return true
    }

    private fun onVolumeChanged(volume: Int) {
        if (settingsRepository.isPauseOnZeroVolumeLevelEnabled
            && playerStateSubject.value == PlayerState.PLAY
            && volume == 0) {
            pause()
        }
    }

    private fun cancelRangeOutside(position: Long) {
        val range = listeningRange.value?.value ?: return
        if (position < range.start || position >= range.end) clearListeningRange()
    }

    private fun seekBy(millis: Long): Single<Long> {
        return Single.zip(getTrackPosition(), getDuration()) { position, duration ->
//            if (position == -1L) {
//                return@zip -1
//            }
            val targetPosition = (position + millis).coerceAtLeast(0)
            if (targetPosition > duration && duration != -1L) {
                return@zip position
            }
            cancelRangeOutside(targetPosition)
            seekTo(targetPosition)
            trackPositionChangeSubject.onNext(targetPosition)
            return@zip targetPosition
        }
    }

    private fun getDuration(): Single<Long> {
        if (isPreparing) {
            return Single.just(-1L)
        }
        return musicPlayerController.getDuration()
    }

    private fun seekTo(position: Long) {
        pausedPositionRead.set(null)
        updateCurrentPosition(position)
        if (!isPreparing) {
            musicPlayerController.seekTo(position)
        }
    }

    private fun resumeInternal() {
        musicPlayerController.resume()
        startTracingTrackPosition()
    }

    private fun pauseInternal(capturePosition: Boolean = true) {
        musicPlayerController.pause()
        stopTracingTrackPosition()
        if (capturePosition && isPrepared && appVisible.value == false && listeningRange.value?.value == null) {
            // A background checkpoint can lag the decoder by a second. Publish the actual paused position once.
            pausedPositionRead.set(musicPlayerController.getTrackPosition()
                .subscribe(::updateCurrentPosition, analytics::processNonFatalError))
        }
    }

    private fun startTracingTrackPosition() {
        stopTracingTrackPosition()
        // Timed practice still needs to detect the end of a sentence with the display off.
        trackPositionDisposable = Observable.combineLatest(appVisible, listeningRange) { visible, range ->
            if (visible || range.value != null) 50L else 1_000L
        }.distinctUntilChanged()
            .switchMap(musicPlayerController::getTrackPositionObservable)
            .doOnSubscribe { trackPositionSubject.onNext(currentPosition) }
            .subscribe { position -> if (!repeatRangeAt(position)) updateCurrentPosition(position) }
    }

    private fun stopTracingTrackPosition() {
        pausedPositionRead.set(null)
        if (trackPositionDisposable != null) {
            trackPositionDisposable!!.dispose()
            trackPositionDisposable = null
        }
    }

}
