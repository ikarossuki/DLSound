package com.github.anrimian.musicplayer.domain.interactors.sleep_timer

import com.github.anrimian.musicplayer.domain.interactors.player.LibraryPlayerInteractor
import com.github.anrimian.musicplayer.domain.models.player.PlayerState
import com.github.anrimian.musicplayer.domain.repositories.SettingsRepository
import io.reactivex.rxjava3.core.Observable
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.flow.takeWhile
import kotlinx.coroutines.rx3.asFlow
import kotlinx.coroutines.rx3.asObservable

const val NO_TIMER = -1L

class SleepTimerInteractor(
    private val libraryPlayerInteractor: LibraryPlayerInteractor,
    private val settingsRepository: SettingsRepository,
    private val appComputationScope: CoroutineScope,
) {

    private val timerCountDownFlow = MutableStateFlow(NO_TIMER)
    private val sleepTimerStateFlow = MutableStateFlow(SleepTimerState.DISABLED)

    private var timerJob: Job? = null
    private var remainingMillis: Long = 0
    private var playingSince: Long? = null
    private var timerGeneration = 0L

    private fun remainingNow(): Long {
        val since = playingSince ?: return remainingMillis
        return (remainingMillis - (System.nanoTime() - since) / 1_000_000L).coerceAtLeast(0)
    }

    private var endOfTrackJob: Job? = null
    private var savedRepeatMode: Int? = null

    fun isEndOfTrack() = savedRepeatMode != null

    fun stopAtEndOfTrack() {
        stop()
        savedRepeatMode = libraryPlayerInteractor.getRepeatMode()
        libraryPlayerInteractor.setRepeatMode(3) // Existing play-once mode stops at the natural end.
        endOfTrackJob = libraryPlayerInteractor.getPlayOnceFinishedObservable().asFlow()
            .onEach { cancelEndOfTrack() }
            .launchIn(appComputationScope)
        timerCountDownFlow.value = -2L
    }

    fun cancelEndOfTrack() {
        endOfTrackJob?.cancel()
        endOfTrackJob = null
        val previous = savedRepeatMode
        savedRepeatMode = null
        if (previous != null) {
            libraryPlayerInteractor.setRepeatMode(previous)
            timerCountDownFlow.value = NO_TIMER
        }
    }

    @Synchronized fun start() {
        sleepTimerStateFlow.value = SleepTimerState.ENABLED
        startSleepTimer(settingsRepository.sleepTimerTime)
    }

    @Synchronized fun stop() {
        timerGeneration++
        playingSince = null
        cancelEndOfTrack()
        timerJob?.cancel()
        remainingMillis = 0L
        timerCountDownFlow.value = NO_TIMER
        sleepTimerStateFlow.value = SleepTimerState.DISABLED
    }

    @Synchronized fun pause() {
        timerGeneration++
        remainingMillis = remainingNow()
        playingSince = null
        timerJob?.cancel()
        sleepTimerStateFlow.value = SleepTimerState.PAUSED
    }

    @Synchronized fun resume() {
        sleepTimerStateFlow.value = SleepTimerState.ENABLED
        startSleepTimer(remainingMillis)
    }

    fun getSleepTimerCountDownObservable(): Observable<Long> = timerCountDownFlow.asObservable()

    fun getSleepTimerStateFlow(): Flow<SleepTimerState> = sleepTimerStateFlow

    fun setPlayLastSong(playLastSong: Boolean) {
        settingsRepository.isSleepTimerPlayLastSong = playLastSong
    }

    fun setSleepTimerTime(millis: Long) {
        if (sleepTimerStateFlow.value == SleepTimerState.ENABLED) {
            return
        }
        settingsRepository.sleepTimerTime = millis
    }

    fun getSleepTimerTime() = settingsRepository.sleepTimerTime

    @Synchronized private fun startSleepTimer(timeMillis: Long) {
        val generation = ++timerGeneration
        timerJob?.cancel()
        playingSince = null
        remainingMillis = timeMillis.coerceAtLeast(0)
        timerCountDownFlow.value = remainingMillis
        timerJob = libraryPlayerInteractor.getPlayerStateObservable().distinctUntilChanged().asFlow()
            .flatMapLatest { state ->
                val remaining = synchronized(this) {
                    if (generation != timerGeneration) return@flatMapLatest kotlinx.coroutines.flow.emptyFlow<Long>()
                    remainingMillis = remainingNow()
                    playingSince = if (state == PlayerState.PLAY) System.nanoTime() else null
                    remainingMillis
                }
                if (state != PlayerState.PLAY) flowOf(remaining)
                else kotlinx.coroutines.flow.flow {
                    while (true) {
                        val value = synchronized(this@SleepTimerInteractor) { remainingNow() }
                        emit(value)
                        if (value == 0L) break
                        kotlinx.coroutines.delay(minOf(value, 1000L))
                    }
                }
            }
            .takeWhile { millis ->
                synchronized(this) {
                    if (generation != timerGeneration) return@synchronized false
                    timerCountDownFlow.value = millis
                    if (millis == 0L) {
                        playingSince = null
                        remainingMillis = 0
                        onTimerFinished()
                    }
                    millis > 0
                }
            }
            .launchIn(appComputationScope)
    }

    private fun onTimerFinished() {
        libraryPlayerInteractor.pause()
        timerCountDownFlow.value = NO_TIMER
        sleepTimerStateFlow.value = SleepTimerState.DISABLED
    }

}
