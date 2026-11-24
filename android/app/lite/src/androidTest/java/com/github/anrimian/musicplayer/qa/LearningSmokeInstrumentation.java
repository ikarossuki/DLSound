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
import android.view.accessibility.AccessibilityNodeInfo;
import android.net.Uri;

/** Native framework-only smoke test. Packaged in a separate test APK. */
public class LearningSmokeInstrumentation extends Instrumentation {
    private static final String TEST_READING = "ひと";
    private Bundle arguments;


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
            if ("review143".equals(arguments.getString("phase"))) {
                result.putString("stream", Review143Regression.run(this));
                finish(Activity.RESULT_OK, result);
                return;
            }
            if ("review".equals(arguments.getString("phase"))) {
                String summary = ReviewRegression.run(this);
                result.putString("stream", summary);
                finish(Activity.RESULT_OK, result);
                return;
            }
            String uri = arguments.getString("audioUri",
                    "content://com.android.externalstorage.documents/document/primary%3ADocuments%2FFolder139%2FNati%2FNativeLong.wav");
            Intent launch = new Intent(Intent.ACTION_VIEW).setClassName(getTargetContext(),
                    "com.github.anrimian.musicplayer.ui.v12.IncomingAudioActivity")
                    .setDataAndType(Uri.parse(uri), "audio/wav")
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_GRANT_READ_URI_PERMISSION);
            getTargetContext().startActivity(launch);
            awaitReading();
            String phase = arguments.getString("phase", "edit");
            if (phase.equals("edit")) {
                openCorrection("明日  あした");
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
                    openCorrection("明日  " + TEST_READING);
                    clickText("恢复原读音");
                }
                awaitReading("あした");
            } else {
                throw new AssertionError("Unknown smoke test phase");
            }
            result.putString("stream", "PASS reading correction " + phase + "\n");
            finish(Activity.RESULT_OK, result);
        } catch (Throwable error) {
            result.putString("stream", "FAIL " + android.util.Log.getStackTraceString(error) + "\n");
            finish(Activity.RESULT_CANCELED, result);
        }
    }

    private void openCorrection(String word) {
        AccessibilityNodeInfo cue = findReading(automation().getRootInActiveWindow(), "明日（");
        if (cue == null || !cue.performAction(AccessibilityNodeInfo.ACTION_LONG_CLICK)) {
            throw new AssertionError("Native subtitle long press unavailable");
        }
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

    private AccessibilityNodeInfo findReading(AccessibilityNodeInfo node, String expected) {
        if (node == null) return null;
        CharSequence label = node.getContentDescription();
        if (label != null && label.toString().contains(expected)) return node;
        for (int index = 0; index < node.getChildCount(); index++) {
            AccessibilityNodeInfo found = findReading(node.getChild(index), expected);
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

    private String readings() {
        AccessibilityNodeInfo node = findReading(automation().getRootInActiveWindow(), "明日（");
        return node == null ? "" : node.getContentDescription().toString();
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
