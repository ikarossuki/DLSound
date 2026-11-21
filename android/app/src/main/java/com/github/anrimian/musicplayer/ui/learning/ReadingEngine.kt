package com.github.anrimian.musicplayer.ui.learning

import com.atilika.kuromoji.ipadic.Tokenizer

internal data class ReadingSpan(val start: Int, val end: Int, val reading: String)

internal object OfflineJapaneseReadings {
    const val VERSION = "kuromoji-ipadic-0.9.0-align-v1"
    private val tokenizer by lazy { Tokenizer() }

    @Synchronized
    fun spans(text: String): List<ReadingSpan> = tokenizer.tokenize(text).mapNotNull { token ->
        val start = token.position
        val surface = token.surface
        val reading = hiragana(token.reading.orEmpty())
        if (start < 0 || !text.startsWith(surface, start) || !containsKanji(surface) || !validReading(reading)) null
        else ReadingSpan(start, start + surface.length, reading)
    }
}

/** Supplied readings win before auto spans; personal edits are applied last. */
internal object ReadingEngine {
    fun render(
        cue: SubtitleCue,
        automatic: List<ReadingSpan> = emptyList(),
        correction: (ReadingPiece) -> String? = { null },
    ): List<ReadingPiece> {
        val text = cue.japaneseText
        if (text.isEmpty()) return emptyList()
        if (cue.kind != CueKind.DIALOGUE) return listOf(ReadingPiece(text, 0))
        val supplied = mutableListOf<ReadingSpan>()
        var offset = 0
        cue.japanese.forEach { piece ->
            piece.reading?.let { supplied += ReadingSpan(offset, offset + piece.text.length, it) }
            offset += piece.text.length
        }
        val selected = supplied.map { it to ReadingOrigin.SUBTITLE }.toMutableList()
        if (cue.allowAutomaticReading) automatic.forEach { span ->
            if (span.start >= 0 && span.end <= text.length && span.start < span.end &&
                supplied.none { it.start < span.end && span.start < it.end } &&
                selected.none { it.first.start < span.end && span.start < it.first.end }) {
                selected += span to ReadingOrigin.AUTOMATIC
            }
        }
        val result = mutableListOf<ReadingPiece>()
        var cursor = 0
        selected.sortedBy { it.first.start }.forEach { (span, origin) ->
            if (span.start > cursor) result += plainPieces(text.substring(cursor, span.start), cursor)
            result += align(text.substring(span.start, span.end), span.reading, span.start, origin)
            cursor = span.end
        }
        if (cursor < text.length) result += plainPieces(text.substring(cursor), cursor)
        return result.map { piece ->
            correction(piece)?.takeIf(::validReading)?.let { piece.copy(reading = it, origin = ReadingOrigin.CORRECTION) } ?: piece
        }
    }

    private fun plainPieces(text: String, offset: Int): List<ReadingPiece> {
        if (text.isEmpty()) return emptyList()
        val result = mutableListOf<ReadingPiece>()
        var start = 0
        var cursor = 0
        var lastKanji: Boolean? = null
        while (cursor < text.length) {
            val codePoint = text.codePointAt(cursor)
            val kanji = Character.UnicodeScript.of(codePoint) == Character.UnicodeScript.HAN || codePoint == 0x3005
            if (lastKanji != null && kanji != lastKanji) {
                result += ReadingPiece(text.substring(start, cursor), offset + start)
                start = cursor
            }
            lastKanji = kanji
            cursor += Character.charCount(codePoint)
        }
        result += ReadingPiece(text.substring(start), offset + start)
        return result
    }

    private fun align(text: String, reading: String, offset: Int, origin: ReadingOrigin): List<ReadingPiece> {
        val runs = plainPieces(text, offset)
        if (runs.size > 24 || text.length > 128) return if (origin == ReadingOrigin.SUBTITLE)
            listOf(ReadingPiece(text, offset, reading, origin)) else runs
        val answers = mutableListOf<List<ReadingPiece>>()
        var attempts = 0
        var exhausted = false
        fun solve(index: Int, readingIndex: Int, pieces: List<ReadingPiece>) {
            if (++attempts > 512) { exhausted = true; return }
            if (answers.size > 1) return
            if (index == runs.size) {
                if (readingIndex == reading.length) answers += pieces
                return
            }
            val run = runs[index]
            if (!containsKanji(run.text)) {
                val anchor = hiragana(run.text)
                if (reading.startsWith(anchor, readingIndex)) solve(index + 1, readingIndex + anchor.length, pieces + run)
            } else if (index == runs.lastIndex) {
                val rest = reading.substring(readingIndex)
                if (validReading(rest)) solve(index + 1, reading.length, pieces + run.copy(reading = rest, origin = origin))
            } else {
                val anchor = hiragana(runs[index + 1].text)
                var found = reading.indexOf(anchor, readingIndex + 1)
                while (found >= 0 && answers.size <= 1) {
                    val part = reading.substring(readingIndex, found)
                    if (validReading(part)) solve(index + 1, found, pieces + run.copy(reading = part, origin = origin))
                    found = reading.indexOf(anchor, found + 1)
                }
            }
        }
        solve(0, 0, emptyList())
        return if (answers.size == 1 && !exhausted) answers.single()
        else if (origin == ReadingOrigin.SUBTITLE) listOf(ReadingPiece(text, offset, reading, origin))
        else runs
    }
}
