# DL Sound 播放器界面

Android WebView 通过 `https://app.dlsound.local/` 加载随安装包提供的静态资源。`usePlayer.ts` 与原生 `PlayerV12Activity` 交换播放、曲库和字幕状态。

从项目根目录执行 `tools/build-ui-offline.ps1`，依次运行类型检查、前端测试和 Vite 构建。依赖版本由 `package-lock.json` 固定。本机的 `node_modules` 链接到已有依赖安装。构建结果在 `android/app/src/main/assets/player/`，这些文件随源码提交。第三方声明见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
