package com.github.anrimian.musicplayer.ui.learning

/** Reads the existing bilingual convention; never writes or retimes the source file. */
internal object LrcDecoder {
    private val time = Regex("\\[(\\d+):([0-5]\\d)(?:\\.(\\d{1,3}))?\\]")
    private val offset = Regex("^\\[offset:\\s*([+-]?\\d+)\\s*\\]$", RegexOption.IGNORE_CASE)
    private val metadata = Regex("^\\[[A-Za-z]+:.*\\]$")
    private val ruby = Regex("\\{([^{}|]+)\\|([^{}|]+)\\}")

    fun decode(raw: String): SubtitleDocument {
        val lines = raw.removePrefix("\uFEFF").lineSequence().toList()
        val offsetMs = lines.firstNotNullOfOrNull { offset.matchEntire(it.trim())?.groupValues?.get(1)?.toLongOrNull() } ?: 0
        val cues = mutableListOf<SubtitleCue>()
        var warnings = 0
        lines.forEachIndexed { lineIndex, original ->
            val line = original.trim()
            if (line.isBlank() || metadata.matches(line) || offset.matches(line)) return@forEachIndexed
            val times = mutableListOf<Long>()
            var cursor = 0
            while (true) {
                val match = time.matchAt(line, cursor) ?: break
                val millis = runCatching {
                    val minutes = match.groupValues[1].toLong()
                    val seconds = match.groupValues[2].toLong()
                    val fraction = match.groupValues[3].padEnd(3, '0').ifEmpty { "0" }.toLong()
                    val total = Math.addExact(Math.addExact(Math.multiplyExact(minutes, 60_000L), seconds * 1_000), fraction)
                    require(total <= 9_007_199_254_740_991L)
                    Math.subtractExact(total, offsetMs).coerceAtLeast(0)
                }.getOrNull()
                if (millis == null) break
                times += millis
                cursor = match.range.last + 1
            }
            if (times.isEmpty()) {
                warnings++
                return@forEachIndexed
            }
            val content = line.substring(cursor).trim()
            times.forEachIndexed timestamp@{ timestampIndex, start ->
                val id = "lrc-${lineIndex + 1}-$timestampIndex"
                if (content.isEmpty()) {
                    cues += SubtitleCue(id, start, kind = CueKind.CLEAR)
                } else {
                    val languageDivider = content.indexOf('｜')
                    val japaneseField = content.substringBefore('｜').trim()
                    val chineseField = if (languageDivider >= 0) content.substring(languageDivider + 1).trim() else ""
                    val japaneseScene = sceneText(japaneseField)
                    val chineseScene = sceneText(chineseField)
                    if (languageDivider >= 0 && (japaneseScene != null || chineseScene != null) &&
                        (japaneseScene != null || japaneseField.isEmpty()) &&
                        (chineseScene != null || chineseField.isEmpty())) {
                        cues += SubtitleCue("$id-scene", start, kind = CueKind.SCENE,
                            japanese = japaneseScene?.let { listOf(WrittenPiece(it)) }.orEmpty(),
                            chinese = chineseScene, allowAutomaticReading = false)
                        return@timestamp
                    }
                    var dialogue = content
                    val closing = when (dialogue.first()) { '（' -> '）'; '(' -> ')'; else -> null }
                    val closeAt = closing?.let { dialogue.indexOf(it) } ?: -1
                    if (closeAt in 1..256) {
                        val hint = dialogue.substring(1, closeAt).trim()
                        val japaneseHint = hasJapaneseKana(hint)
                        cues += SubtitleCue("$id-scene", start, kind = CueKind.SCENE,
                            japanese = if (japaneseHint) listOf(WrittenPiece(hint)) else emptyList(),
                            chinese = if (japaneseHint) null else hint,
                            allowAutomaticReading = false)
                        dialogue = dialogue.substring(closeAt + 1).trim()
                    }
                    if (dialogue.isNotEmpty()) {
                        val divider = dialogue.indexOf('｜')
                        val ja = if (divider >= 0) dialogue.substring(0, divider).trim() else dialogue
                        val zh = if (divider >= 0) dialogue.substring(divider + 1).trim().ifEmpty { null } else null
                        cues += SubtitleCue(id, start,
                            japanese = decodeWrittenPieces(ja), chinese = zh,
                            allowAutomaticReading = divider >= 0 || hasJapaneseKana(ja))
                    }
                }
            }
        }
        return SubtitleDocument("lrc", textFingerprint(raw), normalizeCueTimes(cues), warnings)
    }

    private fun sceneText(text: String): String? {
        if (text.length !in 3..258) return null
        val closing = when (text.first()) { '（' -> '）'; '(' -> ')'; else -> return null }
        if (text.indexOf(closing) != text.lastIndex) return null
        return text.substring(1, text.lastIndex).trim().takeIf { it.isNotEmpty() }
    }

    internal fun decodeWrittenPieces(text: String): List<WrittenPiece> {
        val pieces = mutableListOf<WrittenPiece>()
        var cursor = 0
        ruby.findAll(text).forEach { match ->
            val reading = hiragana(match.groupValues[2])
            if (!validReading(reading)) return@forEach
            if (cursor < match.range.first) pieces += WrittenPiece(text.substring(cursor, match.range.first))
            pieces += WrittenPiece(match.groupValues[1], reading)
            cursor = match.range.last + 1
        }
        if (cursor < text.length) pieces += WrittenPiece(text.substring(cursor))
        return pieces
    }
}
