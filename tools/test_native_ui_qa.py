import unittest
import xml.etree.ElementTree as ET
from unittest.mock import Mock

from native_ui_qa import Device, PACKAGE, media_state, missing_transport


class VerificationTest(unittest.TestCase):
    def test_transient_transport_errors_only(self):
        self.assertTrue(missing_transport("adb.exe: error: device offline"))
        self.assertTrue(missing_transport("cannot connect to 127.0.0.1:5037: connection timed out"))
        self.assertFalse(missing_transport("* daemon not running; starting now\nFailure [INSTALL_FAILED_VERSION_DOWNGRADE]"))
        self.assertFalse(missing_transport("error: closed"))

    def test_position_cannot_come_from_a_different_player(self):
        wrong = "\n  package=another.player\n  state=PlaybackState {state=PAUSED(2), position=998}"
        self.assertIsNone(media_state("  package=" + PACKAGE + "\n" + wrong, PACKAGE))
        correct = "\n  state=PlaybackState {state=PAUSED(2), position=2997}"
        self.assertEqual(media_state(wrong + "\n  package=" + PACKAGE + correct, PACKAGE), ("PAUSED", 2997))

    def test_splash_and_ambiguous_controls(self):
        device = Device.__new__(Device)
        device.package = PACKAGE
        node = ET.Element("node", {"package": PACKAGE, "text": "播放", "class": "android.widget.TextView"})
        button = ET.Element("node", {"package": PACKAGE, "desc": "播放", "class": "android.widget.ImageButton"})
        splash = ET.Element("node", {"package": "android", "text": "播放"})
        device.snapshot = Mock(return_value=[splash])
        with self.assertRaises(TimeoutError):
            device.find("播放", timeout=0)
        device.snapshot = Mock(return_value=[node, button])
        with self.assertRaises(ValueError):
            device.find("播放")
        self.assertIs(device.find("播放", "desc", "android.widget.ImageButton"), button)

    def test_remote_arguments_are_shell_quoted(self):
        device = Device.__new__(Device)
        device.adb = Mock(return_value=b"")
        device.shell("ls", "/sdcard/Music/space and 'quote'")
        device.adb.assert_called_once_with("shell", "ls '/sdcard/Music/space and '\"'\"'quote'\"'\"''")


if __name__ == "__main__":
    unittest.main()
