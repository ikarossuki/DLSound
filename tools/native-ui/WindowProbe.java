import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.UiAutomation;
import android.graphics.Rect;
import android.os.Bundle;
import android.os.HandlerThread;
import android.os.Looper;
import android.util.Xml;
import android.view.accessibility.AccessibilityNodeInfo;
import org.xmlpull.v1.XmlSerializer;

/** Standalone shell accessibility client for the project's API 37 test AVD. */
public final class WindowProbe {
    private static void attribute(XmlSerializer xml, String key, CharSequence value) throws Exception {
        xml.attribute(null, key, value == null ? "" : value.toString());
    }

    private static void writeNode(XmlSerializer xml, AccessibilityNodeInfo node) throws Exception {
        if (node == null || !node.isVisibleToUser()) return;
        Rect bounds = new Rect();
        node.getBoundsInScreen(bounds);
        if (bounds.isEmpty()) return;
        xml.startTag(null, "node");
        attribute(xml, "bounds", bounds.toShortString());
        attribute(xml, "class", node.getClassName());
        attribute(xml, "text", node.getText());
        attribute(xml, "desc", node.getContentDescription());
        attribute(xml, "id", node.getViewIdResourceName());
        attribute(xml, "package", node.getPackageName());
        attribute(xml, "clickable", Boolean.toString(node.isClickable()));
        attribute(xml, "enabled", Boolean.toString(node.isEnabled()));
        attribute(xml, "selected", Boolean.toString(node.isSelected()));
        attribute(xml, "focused", Boolean.toString(node.isFocused()));
        for (int i = 0; i < node.getChildCount(); i++) writeNode(xml, node.getChild(i));
        xml.endTag(null, "node");
    }

    private static AccessibilityNodeInfo findSlider(AccessibilityNodeInfo node) {
        if (node == null || !node.isVisibleToUser()) return null;
        if ("android.widget.SeekBar".contentEquals(node.getClassName())
                && "播放进度".equals(String.valueOf(node.getContentDescription()))) return node;
        for (int i = 0; i < node.getChildCount(); i++) {
            AccessibilityNodeInfo result = findSlider(node.getChild(i));
            if (result != null) return result;
        }
        return null;
    }

    public static void main(String[] args) throws Exception {
        Looper.prepareMainLooper();
        HandlerThread thread = new HandlerThread("window-probe");
        thread.start();
        int result = 0;
        try {
            Class<?> connectionType = Class.forName("android.app.IUiAutomationConnection");
            Object connection = Class.forName("android.app.UiAutomationConnection").getConstructor().newInstance();
            UiAutomation ui = UiAutomation.class.getDeclaredConstructor(Looper.class, connectionType)
                    .newInstance(thread.getLooper(), connection);
            UiAutomation.class.getMethod("connect", int.class).invoke(ui, UiAutomation.FLAG_DONT_SUPPRESS_ACCESSIBILITY_SERVICES);
            try {
                AccessibilityServiceInfo info = ui.getServiceInfo();
                info.flags |= AccessibilityServiceInfo.FLAG_REPORT_VIEW_IDS;
                ui.setServiceInfo(info);
                AccessibilityNodeInfo root = null;
                for (int i = 0; i < 24 && root == null; i++) {
                    root = ui.getRootInActiveWindow();
                    if (root == null) Thread.sleep(50);
                }
                if (root == null) throw new IllegalStateException("No active window");
                if (args.length == 0) {
                    XmlSerializer xml = Xml.newSerializer();
                    xml.setOutput(System.out, "UTF-8");
                    xml.startDocument("UTF-8", true);
                    xml.startTag(null, "hierarchy");
                    writeNode(xml, root);
                    xml.endTag(null, "hierarchy");
                    xml.endDocument();
                    xml.flush();
                } else if (args.length == 3 && "text".equals(args[1])) {
                    if (!args[0].contentEquals(root.getPackageName()))
                        throw new IllegalArgumentException("Unexpected active package");
                    AccessibilityNodeInfo field = root.findFocus(AccessibilityNodeInfo.FOCUS_INPUT);
                    if (field == null || !field.isEditable() || !args[0].contentEquals(field.getPackageName()))
                        throw new IllegalStateException("No focused text field in the app");
                    Bundle value = new Bundle();
                    value.putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, args[2]);
                    if (!field.performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, value))
                        throw new IllegalStateException("Text field refused the value");
                } else {
                    if (args.length != 2 || !args[0].contentEquals(root.getPackageName()))
                        throw new IllegalArgumentException("Unexpected active package or seek arguments");
                    AccessibilityNodeInfo slider = findSlider(root);
                    if (slider == null || slider.getRangeInfo() == null) throw new IllegalStateException("No playback slider");
                    float fraction = Float.parseFloat(args[1]);
                    if (!(fraction >= 0 && fraction <= 1)) throw new IllegalArgumentException("Invalid seek fraction");
                    AccessibilityNodeInfo.RangeInfo range = slider.getRangeInfo();
                    Bundle value = new Bundle();
                    value.putFloat(AccessibilityNodeInfo.ACTION_ARGUMENT_PROGRESS_VALUE,
                            range.getMin() + fraction * (range.getMax() - range.getMin()));
                    if (!slider.performAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_SET_PROGRESS.getId(), value))
                        throw new IllegalStateException("Playback slider rejected seek");
                }
            } finally {
                UiAutomation.class.getMethod("disconnect").invoke(ui);
            }
        } catch (Throwable failure) {
            failure.printStackTrace(System.err);
            result = 1;
        } finally {
            thread.quitSafely();
        }
        System.exit(result);
    }
}
