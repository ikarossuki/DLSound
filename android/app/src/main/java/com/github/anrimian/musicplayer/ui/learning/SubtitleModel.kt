package com.github.anrimian.musicplayer.ui.learning

import java.security.MessageDigest

internal enum class SubtitleMode(val japanese: Boolean, val chinese: Boolean) {
    JAPANESE(true, false), CHINESE(false, true), BILINGUAL(true, true);

    companion object {
        fun restore(value: String?): SubtitleMode = entries.firstOrNull { it.name == value } ?: JAPANESE
    }
}

internal enum class CueKind { DIALOGUE, SCENE, CLEAR }
internal enum class ReadingOrigin { NONE, SUBTITLE, AUTOMATIC, CORRECTION }
internal data class WrittenPiece(val text: String, val reading: String? = null)
internal data class ReadingPiece(
    val text: String,
    val start: Int,
    val reading: String? = null,
    val origin: ReadingOrigin = ReadingOrigin.NONE,
) {
    val end: Int get() = start + text.length
}

internal data class SubtitleCue(
    val id: String,
    val startMs: Long,
    val endMs: Long? = null,
    val kind: CueKind = CueKind.DIALOGUE,
    val japanese: List<WrittenPiece> = emptyList(),
    val chinese: String? = null,
    val allowAutomaticReading: Boolean = true,
    val unlabelledText: Boolean = false,
) {
    val japaneseText: String get() = japanese.joinToString("") { it.text }
    fun activeAt(positionMs: Long, audioDuration: Long = Long.MAX_VALUE): Boolean =
        positionMs >= startMs && positionMs < minOf(endMs ?: Long.MAX_VALUE, audioDuration)
}

internal data class SubtitleDocument(
    val id: String,
    val fingerprint: String,
    val cues: List<SubtitleCue>,
    val warningCount: Int = 0,
)

internal data class RenderedCue(val cue: SubtitleCue, val pieces: List<ReadingPiece>)
internal class SubtitleFormatException(val problem: String) : IllegalArgumentException(problem)

internal fun textFingerprint(text: String): String = MessageDigest.getInstance("SHA-256")
    .digest(text.toByteArray(Charsets.UTF_8)).joinToString("") { "%02x".format(it) }

internal fun normalizeCueTimes(cues: List<SubtitleCue>): List<SubtitleCue> {
    val ordered = cues.withIndex().sortedWith(compareBy<IndexedValue<SubtitleCue>> { it.value.startMs }.thenBy { it.index })
        .map { it.value }
    val dialogueTimes = ordered.filter { it.kind != CueKind.SCENE }.map { it.startMs }.distinct()
    return ordered.map { cue ->
        if (cue.endMs != null) cue else {
            val end = if (cue.kind == CueKind.SCENE) {
                (cue.startMs + 4_000).coerceAtLeast(cue.startMs)
            } else {
                dialogueTimes.getOrNull(dialogueTimes.binarySearch(cue.startMs) + 1) ?: Long.MAX_VALUE
            }
            cue.copy(endMs = end)
        }
    }
}

internal fun containsKanji(text: String): Boolean = text.codePoints().anyMatch {
    Character.UnicodeScript.of(it) == Character.UnicodeScript.HAN || it == 0x3005
}

internal fun hasJapaneseKana(text: String): Boolean = text.any { it in 'ぁ'..'ゖ' || it in 'ァ'..'ヺ' }

internal fun hiragana(text: String): String = buildString {
    text.forEach { append(if (it in 'ァ'..'ヶ') (it.code - 0x60).toChar() else it) }
}

internal fun validReading(reading: String): Boolean = reading.length in 1..256 &&
    reading.any { it in 'ぁ'..'ゖ' } &&
    reading.all { it in 'ぁ'..'ゖ' || it in "゙゚ー・" || it.isWhitespace() }
