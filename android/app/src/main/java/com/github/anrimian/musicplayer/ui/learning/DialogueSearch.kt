package com.github.anrimian.musicplayer.ui.learning

/** Index the original strings once per document, including independently timed translations. */
internal class DialogueSearch(document: SubtitleDocument) {
    data class Line(val cue: SubtitleCue, val japanese: String, val chinese: String) {
        fun text() = japanese.ifBlank { chinese }
    }
    data class Hit(val cue: SubtitleCue, val text: String, val context: String)
    private val lines = document.cues.filter { it.kind == CueKind.DIALOGUE }
        .map { Line(it, it.japaneseText.trim(), it.chinese.orEmpty().trim()) }
        .filter { it.text().isNotEmpty() }.sortedBy { it.cue.startMs }

    fun find(input: String): List<Hit> {
        val query = input.trim()
        if (query.isEmpty()) return emptyList()
        return lines.mapIndexedNotNull { i, line ->
            val ja = line.japanese.contains(query, ignoreCase = true)
            if (!ja && !line.chinese.contains(query, ignoreCase = true)) return@mapIndexedNotNull null
            val other = if (ja) line.chinese else line.japanese
            val context = other.ifEmpty { lines.getOrNull(i + 1)?.text()?.let { "下句 · $it" }
                ?: lines.getOrNull(i - 1)?.text()?.let { "上句 · $it" }.orEmpty() }
            val text = if (ja) line.japanese else line.chinese
            val position = text.indexOf(query, ignoreCase = true)
            val excerpt = if (position <= 12) text else {
                val start = text.offsetByCodePoints(position, -minOf(10, text.codePointCount(0, position)))
                "…" + text.substring(start)
            }
            Hit(line.cue, excerpt, context)
        }
    }
}
