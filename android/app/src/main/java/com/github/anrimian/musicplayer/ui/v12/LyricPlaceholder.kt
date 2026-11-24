package com.github.anrimian.musicplayer.ui.v12

import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.ui.learning.LearningState

internal enum class LyricRecovery { DIRECTORY, SUBTITLE, AUDIO }

internal data class LyricPlaceholder(val title: String, val detail: String = "", val action: LyricRecovery? = null) {
    companion object {
        fun forState(state: LearningState, audioFailed: Boolean): LyricPlaceholder {
            if (state.audioFailed || audioFailed) return LyricPlaceholder("无法打开音频", "请重新选择可以读取的音频文件。", LyricRecovery.AUDIO)
            if (state.openingAudio && state.track == null) return LyricPlaceholder("正在打开音频…")
            if (state.subtitleStatus == R.string.himitsu_subtitle_loading) return LyricPlaceholder("正在读取字幕…")
            val track = state.track ?: return LyricPlaceholder("还没有播放音轨")
            val stem = track.name.substringBeforeLast('.', track.name)
            return when (state.subtitleStatus) {
                R.string.himitsu_subtitle_folder_needed -> LyricPlaceholder("允许读取同名字幕",
                    "选择「${track.name}」所在的文件夹，以便自动读取旁边的字幕。", LyricRecovery.DIRECTORY)
                R.string.himitsu_subtitle_missing -> LyricPlaceholder("未找到同名字幕",
                    "可将 $stem.vtt、$stem.lrc 或 $stem.srt 放在音频旁，也可直接选择已有字幕。", LyricRecovery.SUBTITLE)
                R.string.himitsu_subtitle_empty -> LyricPlaceholder("字幕中没有可显示的台词", state.subtitleName, LyricRecovery.SUBTITLE)
                R.string.himitsu_subtitle_auto, R.string.himitsu_subtitle_manual -> LyricPlaceholder("正在显示台词…")
                else -> LyricPlaceholder("字幕无法读取", state.subtitleName.ifBlank { "请选择 VTT、LRC 或 SRT 字幕。" }, LyricRecovery.SUBTITLE)
            }
        }
    }
}
