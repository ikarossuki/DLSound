package com.github.anrimian.musicplayer.qa;

import android.app.Activity;
import android.app.Instrumentation;
import android.app.UiAutomation;
import android.content.Intent;
import android.os.Bundle;
import android.os.SystemClock;
import android.graphics.Rect;
import android.view.InputDevice;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.accessibility.AccessibilityNodeInfo;
import android.webkit.WebView;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

/** Native framework-only smoke test. Packaged in a separate test APK. */
public class LearningSmokeInstrumentation extends Instrumentation {
    private static final String TEST_READING = "ひと";
    private Bundle arguments;
    private Activity activity;

    @Override
    public void onCreate(Bundle arguments) {
        super.onCreate(arguments);
        this.arguments = arguments;
        start();
    }

    @Override
    public void onStart() {
        Bundle result = new Bundle();
        try {
            Intent launch = getTargetContext().getPackageManager()
                    .getLaunchIntentForPackage(getTargetContext().getPackageName());
            if (launch == null) throw new AssertionError("Learning launcher missing");
            launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            activity = startActivitySync(launch);
            awaitReading();
            String phase = arguments.getString("phase", "edit");
            if (phase.equals("edit")) {
                clickDescription("只显示日文");
                openCorrection("四月一日  わたぬき");
                AccessibilityNodeInfo editable = awaitEditable();
                Bundle text = new Bundle();
                text.putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, TEST_READING);
                if (!editable.performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, text)) {
                    throw new AssertionError("Reading input refused text");
                }
                clickText("保存");
                awaitReading(TEST_READING);
            } else if (phase.equals("verify")) {
                awaitReading(TEST_READING);
            } else if (phase.equals("restore")) {
                if (readings().contains(TEST_READING)) {
                    openCorrection("四月一日  " + TEST_READING);
                    clickText("恢复原读音");
                }
                awaitReading("わたぬき");
            } else {
                throw new AssertionError("Unknown smoke test phase");
            }
            result.putString("stream", "PASS reading correction " + phase + "\n");
            finish(Activity.RESULT_OK, result);
        } catch (Throwable error) {
            result.putString("stream", "FAIL " + error + "\n");
            finish(Activity.RESULT_CANCELED, result);
        }
    }

    private void openCorrection(String word) {
        clickText("更多操作");
        clickText("修正读音");
        clickText(word);
    }

    private void clickText(String text) {
        long deadline = SystemClock.elapsedRealtime() + 8_000;
        do {
            AccessibilityNodeInfo root = automation().getRootInActiveWindow();
            if (root != null) {
                AccessibilityNodeInfo node = findText(root, text);
                if (node != null) {
                        Rect bounds = new Rect();
                        node.getBoundsInScreen(bounds);
                        long pressedAt = SystemClock.uptimeMillis();
                        MotionEvent down = MotionEvent.obtain(pressedAt, pressedAt, MotionEvent.ACTION_DOWN, bounds.centerX(), bounds.centerY(), 0);
                        MotionEvent up = MotionEvent.obtain(pressedAt, pressedAt + 30, MotionEvent.ACTION_UP, bounds.centerX(), bounds.centerY(), 0);
                        down.setSource(InputDevice.SOURCE_TOUCHSCREEN);
                        up.setSource(InputDevice.SOURCE_TOUCHSCREEN);
                        sendPointerSync(down);
                        sendPointerSync(up);
                        down.recycle();
                        up.recycle();
                        SystemClock.sleep(300);
                        return;
                }
            }
            SystemClock.sleep(100);
        } while (SystemClock.elapsedRealtime() < deadline);
        throw new AssertionError("Native control unavailable: " + text);
    }

    private void clickDescription(String description) {
        long deadline = SystemClock.elapsedRealtime() + 8_000;
        do {
            AccessibilityNodeInfo node = findDescription(automation().getRootInActiveWindow(), description);
            if (node != null && node.performAction(AccessibilityNodeInfo.ACTION_CLICK)) {
                SystemClock.sleep(300);
                return;
            }
            SystemClock.sleep(100);
        } while (SystemClock.elapsedRealtime() < deadline);
        throw new AssertionError("Mode button unavailable");
    }

    private AccessibilityNodeInfo findDescription(AccessibilityNodeInfo node, String description) {
        if (node == null) return null;
        if (description.contentEquals(node.getContentDescription() == null ? "" : node.getContentDescription())) return node;
        for (int index = 0; index < node.getChildCount(); index++) {
            AccessibilityNodeInfo found = findDescription(node.getChild(index), description);
            if (found != null) return found;
        }
        return null;
    }

    private UiAutomation automation() {
        return getUiAutomation(UiAutomation.FLAG_DONT_SUPPRESS_ACCESSIBILITY_SERVICES);
    }

    private AccessibilityNodeInfo findText(AccessibilityNodeInfo node, String text) {
        if (node == null) return null;
        if (text.contentEquals(node.getText() == null ? "" : node.getText())) return node;
        for (int index = 0; index < node.getChildCount(); index++) {
            AccessibilityNodeInfo found = findText(node.getChild(index), text);
            if (found != null) return found;
        }
        return null;
    }

    private AccessibilityNodeInfo findEditable(AccessibilityNodeInfo node) {
        if (node == null || node.isEditable()) return node;
        for (int index = 0; index < node.getChildCount(); index++) {
            AccessibilityNodeInfo found = findEditable(node.getChild(index));
            if (found != null) return found;
        }
        return null;
    }

    private AccessibilityNodeInfo awaitEditable() {
        long deadline = SystemClock.elapsedRealtime() + 8_000;
        do {
            AccessibilityNodeInfo node = findEditable(automation().getRootInActiveWindow());
            if (node != null) return node;
            SystemClock.sleep(100);
        } while (SystemClock.elapsedRealtime() < deadline);
        throw new AssertionError("Reading input missing");
    }

    private WebView findWebView(View view) {
        if (view instanceof WebView) return (WebView) view;
        if (view instanceof ViewGroup) {
            ViewGroup group = (ViewGroup) view;
            for (int index = 0; index < group.getChildCount(); index++) {
                WebView found = findWebView(group.getChildAt(index));
                if (found != null) return found;
            }
        }
        return null;
    }

    private String readings() throws InterruptedException {
        CountDownLatch response = new CountDownLatch(1);
        AtomicReference<String> value = new AtomicReference<>("");
        runOnMainSync(() -> {
            WebView web = findWebView(activity.getWindow().getDecorView());
            if (web == null) {
                response.countDown();
                return;
            }
            web.evaluateJavascript("Array.from(document.querySelectorAll('rt')).map(function(n){return n.textContent}).join('|')", text -> {
                value.set(text);
                response.countDown();
            });
        });
        response.await(3, TimeUnit.SECONDS);
        return value.get();
    }

    private void awaitReading(String expected) throws InterruptedException {
        long deadline = SystemClock.elapsedRealtime() + 10_000;
        do {
            if (readings().contains(expected)) return;
            SystemClock.sleep(100);
        } while (SystemClock.elapsedRealtime() < deadline);
        throw new AssertionError("Ruby reading unavailable: " + expected);
    }

    private void awaitReading() throws InterruptedException {
        long deadline = SystemClock.elapsedRealtime() + 10_000;
        do {
            if (readings().length() > 2) return;
            SystemClock.sleep(100);
        } while (SystemClock.elapsedRealtime() < deadline);
        throw new AssertionError("Supplied subtitle not loaded");
    }
}
