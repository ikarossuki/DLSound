# DL Sound · 支持 Ruby 字幕的 Android 音乐播放器

听日语歌或日语音声时，DL Sound 会把字幕里的假名标在对应汉字上方，这种注音叫 **Ruby**。如果字幕带有中文翻译，播放时还可以在原文下方对照着看。

> <ruby>明日<rp>（</rp><rt>あした</rt><rp>）</rp></ruby>、また。<br>
> 明天见。

**[下载 Android APK](https://github.com/ikaros0202/DLSound/releases/latest)**　适用于 Android 8.0 及以上。在发布页的 **Assets** 中选择扩展名为 `.apk` 的文件。

## 播放自己的音频和字幕

1. **放在同一个文件夹。** 例如把 `散步.mp3` 和 `散步.vtt` 放在一起。音频也可以是 WAV，字幕也可以是 LRC 或 SRT，只要扩展名前的文件名相同即可。字幕使用 UTF-8 编码。
2. **首次使用时授权。** 打开 DL Sound，允许读取音乐。进入「我的 → 设置 → 文件与曲库 → 字幕目录」，选择刚才的文件夹。
3. **播放并查看歌词。** 从曲库点开音轨，播放器会自动匹配字幕。从封面向左滑到歌词页。双语字幕可用「日／中／双」切换显示，假名可在「我的 → 设置 → 字幕与读音」中单独开关。

## 哪种字幕适合我？

| 你手里的字幕 | 怎么用 |
| --- | --- |
| VTT | 普通 VTT 可以直接播放。双语字幕可用 `<lang ja>` 和 `<lang zh>` 区分日中两行，用 `<ruby>明日<rt>あした</rt></ruby>` 指定汉字读音。 |
| LRC | 普通时间轴歌词可以直接播放。双语 LRC 用全角 `｜` 分隔原文和译文，例如 `[00:01.25]{明日\|あした}、また。｜明天见。`。 |
| SRT | 按时间同步显示原文，保留多行和停顿。 |

没有标读音的日文也支持离线自动注音。遇到人名等特殊读法，可以在播放器里修正。你也可以按文件夹或专辑找歌、创建歌单、调整播放速度和设置睡眠定时。[完整使用说明](docs/usage.md) · [可复制的双语字幕示例](docs/subtitle-format.md)

<details>
<summary>从早期本地 1.3.3 正式版升级</summary>

GitHub 发布的 1.3.4 使用新签名，无法覆盖安装早期本地 1.3.3 正式版。卸载旧版会清除其私有歌单、设置和播放记录。调试版使用独立包名，可与正式版并存。

</details>

## 从源码构建

<details>
<summary>展开构建环境、依赖与命令</summary>

使用 JDK 21、Android SDK Platform 37、Build Tools 37.0.0 和仓库中的 Gradle 9.5.1 Wrapper。界面资源已包含在源码内。要修改界面，请在 `web-ui/` 使用 Node 24、运行 `npm ci`、`npm test` 和 `npm run build`。

把 Maven Central 的 [kuromoji-core 0.9.0](https://repo.maven.apache.org/maven2/com/atilika/kuromoji/kuromoji-core/0.9.0/kuromoji-core-0.9.0.jar) 和 [kuromoji-ipadic 0.9.0](https://repo.maven.apache.org/maven2/com/atilika/kuromoji/kuromoji-ipadic/0.9.0/kuromoji-ipadic-0.9.0.jar) 放在仓库根目录的 `downloads/kuromoji/` 下，保留原文件名。两份 JAR 的 SHA-256 分别为 `9dec317cab2879474d39bffea4f3f481288d87952c9b5e19d6897b0d5e0d3613` 和 `24909fd751c0b439f7af5131b080eb65bc85062f0c4977ca4a71c76abe74e0b6`。

在 `android/` 运行以下命令。Windows 使用 `gradlew.bat`。调试 APK 位于 `app/lite/build/outputs/apk/nowearModern/debug/`，正式变体由发布者自行签名。

```sh
./gradlew :app:lite:assembleNowearModernDebug :app:testNowearModernDebugUnitTest :domain:test
./gradlew :app:lite:assembleNowearModernRelease
```

</details>

## 开源声明

播放器基于 [Anrimian/music-player v1.0.3](https://github.com/Anrimian/music-player/tree/5b373722e4fea18b37317e74c424a98bcea3f01c)，遵循 [GPL-3.0-or-later](android/LICENSE)。[Kuromoji 许可证](licenses/kuromoji/LICENSE.md)、[词典声明](licenses/kuromoji/NOTICE.md)和[前端依赖声明](web-ui/THIRD_PARTY_NOTICES.md)随源码提供。测试用静音 MP3 由合成帧生成。
