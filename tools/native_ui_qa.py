"""Fresh accessibility snapshots and verified playback seeks on the DL Sound test AVD."""
import argparse
import hashlib
import os
from pathlib import Path
import re
import shlex
import shutil
import subprocess
import sys
import time
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".local" / "native-ui-qa"
PACKAGE = "local.dlsound.player"
PROBE = ROOT / "tools" / "native-ui" / "WindowProbe.java"


def run(*args, timeout=40):
    return subprocess.run(list(map(str, args)), capture_output=True, timeout=timeout)


def checked(result):
    if result.returncode:
        message = (result.stderr + result.stdout).decode(errors="replace").strip()
        raise RuntimeError(f"{Path(result.args[0]).name} ({result.returncode}): {message}")
    return result.stdout


def missing_transport(error):
    diagnostics = [line.lower().strip() for line in error.splitlines() if line.strip()]
    if not diagnostics:
        return False
    final = diagnostics[-1].removeprefix("adb.exe: ").removeprefix("adb: ").removeprefix("error: ")
    return (final.startswith(("cannot connect to daemon", "cannot connect to 127.0.0.1:5037",
                              "failed to start daemon", "failed to connect to daemon")) or
            final in ("device offline", "device 'emulator-5588' not found"))


def media_state(dump, package):
    for block in re.split(r"(?=^\s*package=)", dump, flags=re.M):
        if not re.match(r"\s*package=" + re.escape(package) + r"\s*\n", block):
            continue
        match = re.search(r"state=PlaybackState \{state=([A-Z_]+)\(\d+\), position=(-?\d+)", block)
        if match:
            return match[1], int(match[2])
    return None


class Device:
    def __init__(self, package=PACKAGE):
        self.package = package
        sdk = Path(os.environ.get("ANDROID_SDK_ROOT") or os.environ.get("ANDROID_HOME")
                   or r"C:\Users\Public\Android\Sdk")
        self.adb_path = sdk / "platform-tools" / "adb.exe"
        self.sdk = sdk
        self.remote = "/data/local/tmp/dlsound-window-" + hashlib.sha256(PROBE.read_bytes()).hexdigest()[:16] + ".jar"
        if "Himitsu_API37" not in self.adb("emu", "avd", "name").decode().splitlines():
            raise RuntimeError("Expected Himitsu_API37 on emulator-5588")

    def adb(self, *args, timeout=40):
        for attempt in range(3):
            result = run(self.adb_path, "-s", "emulator-5588", *args, timeout=timeout)
            error = result.stderr.decode(errors="replace")
            if result.returncode == 0 or not missing_transport(error) or attempt == 2:
                return checked(result)
            if "daemon" in error.lower() or ":5037" in error:
                recovery = run(self.adb_path, "start-server", timeout=20)
                if recovery.returncode and not missing_transport(recovery.stderr.decode(errors="replace")):
                    checked(recovery)
            time.sleep(0.5 * (attempt + 1))

    def shell(self, *args, binary=False):
        return self.adb("exec-out" if binary else "shell", shlex.join(map(str, args)))

    def prepare(self):
        CACHE.mkdir(parents=True, exist_ok=True)
        jar = CACHE / self.remote.rsplit("/", 1)[1]
        if not jar.is_file():
            def version(path):
                return tuple(map(int, re.findall(r"\d+", path.parent.name)))
            android = max((self.sdk / "platforms").glob("android-*/android.jar"), key=version)
            d8 = max((self.sdk / "build-tools").glob("*/d8.bat"), key=version)
            javac = shutil.which("javac") or Path(os.environ["JAVA_HOME"]) / "bin" / "javac.exe"
            checked(run(javac, "--release", "8", "-encoding", "UTF-8", "-cp", android, "-d", CACHE, PROBE))
            stage = CACHE / "compiled.jar"
            checked(run(d8, "--min-api", "26", "--lib", android, "--output", stage, CACHE / "WindowProbe.class"))
            stage.replace(jar)
        if self.shell("sh", "-c", 'if test -r "$1"; then echo ready; fi', "probe", self.remote).strip() != b"ready":
            self.adb("push", jar, self.remote)
            self.shell("chmod", "444", self.remote)

    def probe(self, *args):
        return self.shell("env", "CLASSPATH=" + self.remote, "app_process", "/system/bin", "WindowProbe", *args, binary=True)

    def snapshot(self):
        raw = self.probe()
        try:
            return list(ET.fromstring(raw).iter("node"))
        except ET.ParseError as error:
            if b"No active window" in raw:
                return []
            raise RuntimeError(f"Invalid accessibility response: {raw[:300]!r}") from error

    def find(self, value, attribute=None, role=None, timeout=15):
        deadline = time.monotonic() + timeout
        keys = [attribute] if attribute else ["text", "desc", "id"]
        while True:
            nodes = [n for n in self.snapshot() if n.get("package") == self.package]
            found = [n for n in nodes if value in [n.get(k) for k in keys] and
                     (role is None or n.get("class") == role)]
            if len(found) == 1:
                return found[0]
            if len(found) > 1:
                raise ValueError(f"Ambiguous {value!r}: " + str([(n.get('class'), n.get('bounds')) for n in found]))
            if time.monotonic() >= deadline:
                raise TimeoutError(f"{value!r} missing in {self.package}: " +
                                   str([n.get('desc') or n.get('text') for n in nodes if n.get('desc') or n.get('text')][:30]))
            time.sleep(.2)

    def tap(self, value, attribute=None, role=None):
        node = self.find(value, attribute, role)
        left, top, right, bottom = map(int, re.findall(r"-?\d+", node.get("bounds")))
        self.shell("input", "tap", (left + right) // 2, (top + bottom) // 2)

    def screenshot(self, output, marker, attribute=None):
        self.find(marker, attribute)
        image = self.shell("screencap", "-p", binary=True)
        if not (image.startswith(b"\x89PNG\r\n\x1a\n") and image.endswith(b"IEND\xaeB`\x82")):
            raise RuntimeError("screencap did not return PNG data")
        path = Path(output).resolve()
        path.relative_to(ROOT)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(image)

    def session(self):
        return media_state(self.shell("dumpsys", "media_session").decode(), self.package)

    def set_focused_text(self, value):
        self.probe(self.package, "text", value)
        self.find(value, "text", "android.widget.EditText")

    def seek(self, target_ms, duration_ms):
        if not 0 <= target_ms <= duration_ms or duration_ms <= 0:
            raise ValueError("Invalid target time or duration")
        before = self.session()
        if not before or before[0] != "PAUSED":
            raise RuntimeError(f"Pause playback before timing checks: {before}")
        self.find("播放进度", "desc", "android.widget.SeekBar")
        result = self.probe(self.package, str(target_ms / duration_ms))
        if result.strip():
            raise RuntimeError(result.decode(errors="replace"))
        for _ in range(18):
            actual = self.session()
            if actual and actual[0] == "PAUSED" and abs(actual[1] - target_ms) <= 100:
                return actual[1]
            time.sleep(.15)
        raise AssertionError(f"Seek to {target_ms} ms, MediaSession reported {actual}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--package", choices=[PACKAGE, PACKAGE + ".debug"], default=PACKAGE)
    parser.add_argument("--expect", help="Exact active-window label required before capture")
    parser.add_argument("--attribute", choices=["desc", "text", "id"])
    parser.add_argument("--screenshot", type=Path)
    parser.add_argument("--seek", type=int, nargs=2, metavar=("TARGET_MS", "DURATION_MS"))
    args = parser.parse_args()
    if args.screenshot and not args.expect:
        parser.error("--screenshot requires --expect")
    device = Device(args.package)
    device.prepare()
    if args.seek:
        print("MediaSession position (ms)", device.seek(*args.seek))
    if args.screenshot:
        device.screenshot(args.screenshot, args.expect, args.attribute)
    elif args.expect:
        print(device.find(args.expect, args.attribute).attrib)
    else:
        for item in device.snapshot():
            if item.get("text") or item.get("desc"):
                print(item.get("class"), repr(item.get("text")), repr(item.get("desc")), item.get("bounds"))
