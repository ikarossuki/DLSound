package com.github.anrimian.musicplayer.wear.data.repositories

import android.annotation.SuppressLint
import com.github.anrimian.common.WearableFields
import com.github.anrimian.musicplayer.wear.domain.models.DeviceState
import com.github.anrimian.musicplayer.wear.domain.models.ErrorEvent
import com.github.anrimian.musicplayer.wear.infrastructure.DeviceConnectionController
import io.reactivex.rxjava3.core.Observable
import io.reactivex.rxjava3.core.Scheduler
import io.reactivex.rxjava3.disposables.SerialDisposable
import io.reactivex.rxjava3.subjects.BehaviorSubject
import io.reactivex.rxjava3.subjects.PublishSubject
import java.util.concurrent.TimeUnit

class HostDeviceRepository(
    private val deviceConnectionController: DeviceConnectionController,
    private val ioScheduler: Scheduler,
    private val timeoutMillis: Long
) {

    private val requests = mutableMapOf<String, LinkedHashMap<Int, RequestInfo>>()
    private var nextRequestId = 1

    private val errorEventSubject = PublishSubject.create<ErrorEvent>()

    private val deviceAvailabilitySubject = BehaviorSubject.create<Boolean>()

    //TODO-W can be united with NodesAvailabilityObservable
    private val deviceAvailabilityObservable by lazy {
        deviceAvailabilitySubject.startWith(deviceConnectionController.isDeviceConnected())
            .map { isAvailable -> toDeviceState(isAvailable) }
            .distinctUntilChanged()
    }

    fun onDeviceAvailabilityChanged(isAvailable: Boolean) {
        deviceAvailabilitySubject.onNext(isAvailable)
    }

    fun getHostDeviceAvailabilityObservable() = deviceAvailabilityObservable

    /**
     * @param fallback will be not called for non-last event in multiple events case
     */
    @Synchronized fun sendEventWithTimeout(
        eventName: String,
        message: ByteArray? = null,
        targetNode: String? = null,
        fallback: (() -> Unit)?
    ) {
        val id = nextRequestId
        nextRequestId = if (id == Int.MAX_VALUE) 1 else id + 1
        val pending = RequestInfo(fallback)
        requests.getOrPut(eventName) { linkedMapOf() }[id] = pending
        pending.timeout.set(ioScheduler.scheduleDirect({
            if (onRequestFailed(eventName, id)) {
                errorEventSubject.onNext(ErrorEvent(WearableFields.ERROR_NO_ACK_EVENT, eventName))
            }
        }, timeoutMillis, TimeUnit.MILLISECONDS))
        sendEvent(eventName, message, targetNode, id)
    }

    @SuppressLint("CheckResult")
    fun sendEvent(
        eventName: String,
        message: ByteArray? = null,
        targetNode: String? = null,
        requestId: Int? = null
    ) {
        deviceConnectionController.sendEvent(eventName, message, targetNode, requestId)
            .subscribe(
                {},
                { t ->
                    if (requestId != null) onRequestFailed(eventName, requestId)
                    errorEventSubject.onNext(ErrorEvent(WearableFields.ERROR_SEND_EVENT, eventName, t))
                }
            )
    }

    fun onRequestErrorReceived(errorType: Int, sentEventName: String) {
        onRequestFailed(sentEventName)
        errorEventSubject.onNext(ErrorEvent(errorType, sentEventName))
    }

    @Synchronized fun onRequestFinished(eventName: String, requestId: Int? = null): Boolean {
        // The phone can publish state changes without any outstanding watch request.
        val pending = requests[eventName] ?: return false
        val id = requestId ?: pending.keys.first()
        val newerOutstanding = pending.keys.last() != id
        val item = pending.remove(id) ?: return true
        item.timeout.dispose()
        if (!newerOutstanding && requestId != null) {
            pending.values.forEach { it.timeout.dispose() }
            pending.clear()
        }
        if (pending.isEmpty()) requests.remove(eventName)
        return newerOutstanding
    }

    @Synchronized fun hasActiveRequest(eventName: String) = requests.containsKey(eventName)

    fun getErrorEventsObservable(): Observable<ErrorEvent> = errorEventSubject

    @Synchronized private fun onRequestFailed(eventName: String, requestId: Int? = null): Boolean {
        val pending = requests[eventName] ?: return false
        val id = requestId ?: pending.keys.first()
        val item = pending.remove(id) ?: return false
        item.timeout.dispose()
        if (pending.isNotEmpty()) return false
        requests.remove(eventName)
        item.fallback?.invoke()
        return true
    }

    private fun toDeviceState(isAvailable: Boolean): DeviceState {
        if (!isAvailable) {
            return DeviceState.NOT_CONNECTED
        }
        return DeviceState.CONNECTED
    }

    private class RequestInfo(val fallback: (() -> Unit)?) {
        val timeout = SerialDisposable()
    }

}