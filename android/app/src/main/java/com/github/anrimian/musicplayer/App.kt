package com.github.anrimian.musicplayer

import android.app.Application
import android.content.Context
import com.github.anrimian.musicplayer.data.utils.Permissions
import com.github.anrimian.musicplayer.di.Components
import com.github.anrimian.musicplayer.domain.utils.rx.RxJavaErrorConsumer
import com.github.anrimian.musicplayer.utils.AppVisibilityTracker
import com.github.anrimian.musicplayer.utils.DevTools
import com.github.anrimian.musicplayer.utils.system.SystemCrashExceptionHandler
import io.reactivex.rxjava3.plugins.RxJavaPlugins

/**
 * Created on 20.10.2017.
 */
abstract class App : Application() {

    init {
        RxJavaPlugins.setErrorHandler(RxJavaErrorConsumer())
    }

    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        initComponents(base)
    }

    override fun onCreate() {
        super.onCreate()
        DevTools.run(this)
        SystemCrashExceptionHandler.init()

        val appComponent = Components.getAppComponent()
        appComponent.appLogger().initFatalErrorRecorder()

        val observeLibrary = Permissions.hasFilePermission(this) &&
                !appComponent.loggerRepository().wasCriticalFatalError()
        if (observeLibrary) {
            appComponent.widgetUpdater().start()
            appComponent.wearableManager().init()
            appComponent.storageScannerInteractor().runStorageObserver()
        }
        registerActivityLifecycleCallbacks(AppVisibilityTracker { visible ->
            appComponent.playerCoordinator().onAppVisibilityChanged(visible)
            if (observeLibrary) appComponent.syncInteractor().onAppVisibilityChanged(visible)
        })
    }

    protected abstract fun initComponents(appContext: Context)

}
