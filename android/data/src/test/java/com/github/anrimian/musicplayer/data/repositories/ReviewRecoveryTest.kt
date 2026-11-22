package com.github.anrimian.musicplayer.data.repositories

import com.github.anrimian.musicplayer.data.database.dao.play_queue.PlayQueueDaoWrapper
import com.github.anrimian.musicplayer.data.repositories.play_queue.PlayQueueRepositoryImpl
import com.github.anrimian.musicplayer.data.repositories.scanner.StorageAudioFileAnalyzer
import com.github.anrimian.musicplayer.data.repositories.scanner.StorageScannerRepositoryImpl
import com.github.anrimian.musicplayer.data.storage.exceptions.ContentResolverQueryException
import com.github.anrimian.musicplayer.data.storage.providers.music.SystemAudioCatalogProvider
import com.github.anrimian.musicplayer.domain.models.scanner.StorageAnalyzeResult
import com.github.anrimian.musicplayer.domain.repositories.SettingsRepository
import com.github.anrimian.musicplayer.domain.repositories.UiStateRepository
import com.github.anrimian.musicplayer.domain.utils.functions.Opt
import io.reactivex.rxjava3.core.Observable
import io.reactivex.rxjava3.schedulers.Schedulers
import io.reactivex.rxjava3.subjects.PublishSubject
import org.junit.jupiter.api.Test
import org.mockito.kotlin.*
import java.util.concurrent.TimeUnit

class ReviewRecoveryTest {
    @Test fun incompleteScanDoesNotApplyMissingFilesAndCanRecover() {
        val analyzer = mock<StorageAudioFileAnalyzer>()
        val provider = mock<SystemAudioCatalogProvider> {
            on { getChangeObservable() } doReturn Observable.never()
            on { getAudioFiles(any(), any(), any()) } doReturn null
        }
        val settings = mock<SettingsRepository> {
            on { audioFileMinDurationMillisObservable } doReturn Observable.just(0L)
            on { showAllAudioFilesEnabledObservable } doReturn Observable.just(true)
            on { allowedFileExtensionsObservable } doReturn Observable.just(emptySet())
            on { allowedFileExtensions } doReturn emptySet()
        }
        val scanner = StorageScannerRepositoryImpl(provider, mock(), mock(), mock(), settings, analyzer,
            mock(), mock(), mock(), mock(), Schedulers.single())
        val observer = scanner.getStorageChangesObservable().test()
        try {
            scanner.runRescanStorage().test().awaitDone(5, TimeUnit.SECONDS).assertError(ContentResolverQueryException::class.java)
            verifyNoInteractions(analyzer)
            whenever(provider.getAudioFiles(any(), any(), any())).thenReturn(hashMapOf())
            whenever(analyzer.applyCompositionsData(any())).thenReturn(StorageAnalyzeResult(emptyList(), emptyList(), emptyList(), 0L, false))
            scanner.runRescanStorage().test().awaitDone(5, TimeUnit.SECONDS).assertComplete()
            observer.assertNotComplete().assertNoErrors()
            verify(analyzer, atLeastOnce()).applyCompositionsData(any())
        } finally { observer.dispose() }
    }

    @Test fun failedQueueWriteDoesNotSuppressNextDeletion() {
        val ids = PublishSubject.create<Long>()
        val settings = mock<SettingsRepository> {
            on { randomPlayingObservable } doReturn Observable.just(false)
            on { displayFileNameObservable } doReturn Observable.just(false)
        }
        val state = mock<UiStateRepository> { on { currentItemIdObservable } doReturn ids }
        val dao = mock<PlayQueueDaoWrapper> {
            on { insertNewPlayQueue(any(),any(),any()) } doThrow IllegalStateException("disk")
            on { getItemObservable(42L,false) } doReturn Observable.just(Opt())
            on { getItemAtPosition(0,false) } doReturn 7L
        }
        val repository = PlayQueueRepositoryImpl(dao, settings, state, Schedulers.trampoline())
        val observation = repository.getCurrentQueueItemObservable().test()
        try {
            repository.setPlayQueue(listOf(1L), 0).test().assertError(IllegalStateException::class.java)
            ids.onNext(42L)
            verify(state).currentQueueItemId = 7L
        } finally { observation.dispose() }
    }
}
