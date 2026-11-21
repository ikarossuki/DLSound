package com.github.anrimian.musicplayer.ui.learning

/** WebVTT and SubRip both group timed text into blank-line-separated blocks. */
internal object TimedTextDecoder {
    private val timestamp = Regex("""(?:(\d{2,}):)?([0-5]\d):([0-5]\d)[.,](\d{3})""")
    private val timing = Regex("""(\S+)\s+-->\s+(\S+)(?:\s+.*)?""")

    fun decode(raw: String, webVtt: Boolean): SubtitleDocument {
        val format = if (webVtt) "vtt" else "srt"
        val cues = mutableListOf<SubtitleCue>()
        var warnings = 0
        val lines = raw.removePrefix("\uFEFF").lineSequence().dropWhile { it.isBlank() }.iterator()
        if (webVtt) {
            // The signature and optional header metadata end at the first blank line.
            while (lines.hasNext() && lines.next().isNotBlank()) { }
        }
        val block = mutableListOf<String>()
        fun finishBlock() {
            val first = block.firstOrNull()?.trim() ?: return
            if (webVtt && (first == "STYLE" || first == "REGION" || first == "NOTE" ||
                    first.startsWith("NOTE ") || first.startsWith("NOTE\t"))) return
            val index = if ("-->" in first) 0 else 1 // optional cue identifier or SRT index
            val times = block.getOrNull(index)?.trim()?.let(timing::matchEntire)
            val start = times?.let { millis(it.groupValues[1]) }
            val end = times?.let { millis(it.groupValues[2]) }
            if (start == null || end == null || end <= start || index + 1 >= block.size) {
                warnings++
                return
            }
            val body = CueText()
            block.subList(index + 1, block.size).forEachIndexed(body::line)
            val cue = body.finish("$format-" + (cues.size + 1), start, end)
            if (cue.japanese.isEmpty() && cue.chinese == null) warnings++ else cues += cue
        }
        for (line in lines) {
            if (line.isBlank()) {
                finishBlock()
                block.clear()
            } else block += line
        }
        finishBlock()
        return SubtitleDocument(format, textFingerprint(raw), normalizeCueTimes(cues), warnings)
    }

    private fun millis(value: String): Long? {
        val match = timestamp.matchEntire(value) ?: return null
        val hours = match.groupValues[1].ifEmpty { "0" }.toLongOrNull() ?: return null
        val remainder = match.groupValues[2].toLong() * 60_000 +
            match.groupValues[3].toLong() * 1_000 + match.groupValues[4].toLong()
        if (hours > (9_007_199_254_740_991L - remainder) / 3_600_000) return null
        return hours * 3_600_000 + remainder
    }

    // Extract text and readings only. Source markup is never passed to the WebView.
    private val tag = Regex("""<(/?[\p{L}\d][^<>\r\n]*)>""")
    private val escape = Regex("""&(amp|lt|gt|nbsp|lrm|rlm|quot|apos|#\d{1,7}|#[xX][a-fA-F0-9]{1,6});""")
    private fun unescape(text: String): String = escape.replace(text) { match ->
        when (val key = match.groupValues[1]) {
            "amp" -> "&"
            "lt" -> "<"
            "gt" -> ">"
            "nbsp" -> "\u00a0"
            "lrm" -> "\u200e"
            "rlm" -> "\u200f"
            "quot" -> "\""
            "apos" -> "'"
            else -> {
                val code = if (key.startsWith("#x", true)) key.substring(2).toInt(16) else key.substring(1).toInt()
                if (Character.isValidCodePoint(code) && code !in 0xD800..0xDFFF) String(Character.toChars(code)) else match.value
            }
        }
    }

    private class CueText {
        private val ja = mutableListOf<WrittenPiece>()
        private val zh = StringBuilder()
        private val languages = mutableListOf<String>()
        private var lastJaLine = -1
        private var lastZhLine = -1
        private var lineNumber = 0
        private var explicitJa = false
        private var hasLanguage = false
        private var ruby = false
        private var inReading = false
        private val base = StringBuilder()
        private val reading = StringBuilder()

        fun line(number: Int, source: String) {
            lineNumber = number
            var cursor = 0
            for (match in tag.findAll(source)) {
                text(source.substring(cursor, match.range.first))
                val token = match.groupValues[1]
                when (token.substringBefore(' ').substringBefore('\t').substringBefore('.').lowercase()) {
                    "lang" -> {
                        val language = token.drop(4).trim().substringBefore('-').lowercase()
                        hasLanguage = true
                        languages += language
                        if (language == "ja") explicitJa = true
                    }
                    "/lang" -> if (languages.isNotEmpty()) languages.removeAt(languages.lastIndex)
                    "ruby" -> { flushRuby(); ruby = true }
                    "rt" -> if (ruby) { if (inReading) flushRuby(); inReading = true }
                    "/rt" -> if (ruby) flushRuby()
                    "/ruby" -> { flushRuby(); ruby = false }
                }
                cursor = match.range.last + 1
            }
            text(source.substring(cursor))
        }

        private fun text(raw: String) {
            if (raw.isEmpty()) return
            val value = unescape(raw)
            when {
                ruby && inReading -> reading.append(value)
                ruby -> base.append(value)
                else -> add(value)
            }
        }

        private fun flushRuby() {
            if (base.isNotEmpty()) add(base.toString(), hiragana(reading.toString().trim()).takeIf(::validReading))
            base.clear()
            reading.clear()
            inReading = false
        }

        private fun add(value: String, kana: String? = null) {
            if (languages.lastOrNull() == "zh") {
                if (lastZhLine >= 0 && lastZhLine != lineNumber) zh.append('\n')
                zh.append(value)
                lastZhLine = lineNumber
            } else {
                if (lastJaLine >= 0 && lastJaLine != lineNumber) ja += WrittenPiece("\n")
                ja += WrittenPiece(value, kana)
                lastJaLine = lineNumber
            }
        }

        fun finish(id: String, start: Long, end: Long): SubtitleCue {
            flushRuby()
            val pieces = if (ja.all { it.text.isBlank() }) emptyList() else ja
            return SubtitleCue(id, start, end, japanese = pieces, chinese = zh.toString().takeIf { it.isNotBlank() },
                unlabelledText = !hasLanguage,
                allowAutomaticReading = explicitJa || pieces.any { it.reading != null || hasJapaneseKana(it.text) })
        }
    }
}
