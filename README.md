# DL Sound

DL Sound 是一款 Android 本地音乐与日语音声播放器，支持 Android 8.0 及以上。基于 Anrimian 的 Simple Music Player Offline 开发。

[下载 APK](https://github.com/ikaros0202/DLSound/releases/latest) · [使用说明](docs/usage.md) · [字幕格式与示例](docs/subtitle-format.md)

将 MP3 或 WAV 和同名 VTT、LRC、SRT 放在同一目录，即可在播放器里查看同步字幕。支持日文、中文、双语、Ruby 假名与离线注音。可以按文件夹或专辑浏览音轨、建立歌单、调整播放速度和设置睡眠定时。

1.3.4 新增「我的」。在「设置」中调整播放、字幕、外观和文件权限，在「关于 DL Sound」中检查更新或阅读组件许可。1.3.4 的发布签名与早期本地 1.3.3 正式版不同。旧正式版用户若卸载后重新安装，应用私有的播放记录、设置及歌单会被清除。调试版使用独立包名。

## 从源码构建

使用 JDK 21、Android SDK Platform 37、Build Tools 37.0.0 和仓库中的 Gradle 9.5.1 Wrapper。界面资源已包含在源码内。要修改界面，请在 `web-ui/` 使用 Node 24、运行 `npm ci`、`npm test` 和 `npm run build`。

把 Maven Central 的 [kuromoji-core 0.9.0](https://repo.maven.apache.org/maven2/com/atilika/kuromoji/kuromoji-core/0.9.0/kuromoji-core-0.9.0.jar) 和 [kuromoji-ipadic 0.9.0](https://repo.maven.apache.org/maven2/com/atilika/kuromoji/kuromoji-ipadic/0.9.0/kuromoji-ipadic-0.9.0.jar) 放在仓库根目录的 `downloads/kuromoji/` 下，保留原文件名。两份 JAR 的 SHA-256 分别为 `9dec317cab2879474d39bffea4f3f481288d87952c9b5e19d6897b0d5e0d3613` 和 `24909fd751c0b439f7af5131b080eb65bc85062f0c4977ca4a71c76abe74e0b6`。

在 `android/` 运行以下命令。Windows 使用 `gradlew.bat`。调试 APK 位于 `app/lite/build/outputs/apk/nowearModern/debug/`，正式变体由发布者自行签名。

```sh
./gradlew :app:lite:assembleNowearModernDebug :app:testNowearModernDebugUnitTest :domain:test
./gradlew :app:lite:assembleNowearModernRelease
```

## 开源声明

播放器基于 [Anrimian/music-player v1.0.3](https://github.com/Anrimian/music-player/tree/5b373722e4fea18b37317e74c424a98bcea3f01c)，遵循 [GPL-3.0-or-later](android/LICENSE)。[Kuromoji 许可证](licenses/kuromoji/LICENSE.md)、[词典声明](licenses/kuromoji/NOTICE.md)和[前端依赖声明](web-ui/THIRD_PARTY_NOTICES.md)随源码提供。测试用静音 MP3 由合成帧生成。
