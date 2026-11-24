package com.github.anrimian.musicplayer.ui.learning

internal object SubtitleFiles {
    private val suffixes = listOf("vtt", "lrc", "srt")

    fun match(audioName: String, listing: List<LearningFile>): LearningFile? {
        val base = audioName.substringBeforeLast('.')
        return suffixes.firstNotNullOfOrNull { suffix ->
            listing.firstOrNull { !it.directory && it.name.equals("$base.$suffix", ignoreCase = true) }
        }
    }

    fun retiredName(name: String?) = name?.endsWith(".json", ignoreCase = true) == true

    // Manual imports and their private cache may have no usable filename.
    fun decode(raw: String, name: String? = null): SubtitleDocument {
        val first = raw.removePrefix("\uFEFF").lineSequence().firstOrNull { it.isNotBlank() }?.trim().orEmpty()
        return when {
            retiredName(name) || first.startsWith('{') -> throw SubtitleFormatException("retired")
            first == "WEBVTT" || first.startsWith("WEBVTT ") || first.startsWith("WEBVTT\t") ->
                TimedTextDecoder.decode(raw, webVtt = true)
            name?.endsWith(".vtt", true) == true -> throw SubtitleFormatException("format")
            name?.endsWith(".srt", true) == true || first.toLongOrNull() != null ||
                (first.firstOrNull()?.isDigit() == true && "-->" in first) ->
                TimedTextDecoder.decode(raw, webVtt = false)
            else -> LrcDecoder.decode(raw)
        }
    }
}
