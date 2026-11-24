package com.github.anrimian.musicplayer.data.utils.rx.receivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import androidx.core.content.ContextCompat;

import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observable;

/**
 * Created on 05.11.2017.
 */

public class RxReceivers {

    public static Observable<Intent> from(@NonNull final String action,
                                          @NonNull final Context ctx) {
        IntentFilter filter = new IntentFilter(action);
        return from(filter, ctx);
    }

    public static Observable<Intent> from(@NonNull final IntentFilter intentFilter,
                                          @NonNull final Context context) {
        return Observable.create(emitter -> {
            BroadcastReceiver receiver = new BroadcastReceiver() {
                @Override
                public void onReceive(Context context1, Intent intent) {
                    emitter.onNext(intent);
                }
            };
            // Both users observe AudioService broadcasts from the system UID.
            ContextCompat.registerReceiver(context, receiver, intentFilter, ContextCompat.RECEIVER_NOT_EXPORTED);
            emitter.setCancellable(() -> context.unregisterReceiver(receiver));
        });
    }
}
