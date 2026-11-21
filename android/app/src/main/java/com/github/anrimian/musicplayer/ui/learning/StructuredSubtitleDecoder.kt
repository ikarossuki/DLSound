package com.github.anrimian.musicplayer.ui.learning

import org.json.JSONArray
import org.json.JSONObject
import org.json.JSONTokener

internal object StructuredSubtitleDecoder {
    fun decode(raw: String): SubtitleDocument {
        try {
            val tokenizer = JSONTokener(raw.removePrefix("\uFEFF"))
            val root = tokenizer.nextValue() as? JSONObject ?: fail("structure")
            if (tokenizer.nextClean() != '\u0000') fail("structure")
            checkKeys(root, setOf("format", "version", "documentId", "cues"))
            if (root.opt("format") != "himitsu-subtitles") fail("format")
            if (integer(root, "version") != 1L) fail("version")
            val documentId = text(root, "documentId", 256)
            val array = root.opt("cues") as? JSONArray ?: fail("structure")
            if (array.length() > 32_000) fail("too_large")
            val ids = mutableSetOf<String>()
            val cues = (0 until array.length()).map { index ->
                val value = array.opt(index) as? JSONObject ?: fail("structure")
                checkKeys(value, setOf("id", "kind", "startMs", "endMs", "ja", "zh"))
                val id = text(value, "id", 256)
                if (!ids.add(id)) fail("duplicate_id")
                val kind = when (value.opt("kind")) {
                    "dialogue" -> CueKind.DIALOGUE
                    "scene" -> CueKind.SCENE
                    else -> fail("kind")
                }
                val start = integer(value, "startMs")
                val end = if (value.has("endMs")) integer(value, "endMs") else null
                if (end != null && end <= start || kind == CueKind.SCENE && end == null) fail("time")
                val japanese = when (val field = value.opt("ja")) {
                    null -> emptyList()
                    is String -> listOf(WrittenPiece(field.takeIf { it.isNotBlank() } ?: fail("text")))
                    is JSONArray -> {
                        if (kind == CueKind.SCENE || field.length() == 0) fail("text")
                        (0 until field.length()).map { segmentIndex ->
                            val segment = field.opt(segmentIndex) as? JSONObject ?: fail("structure")
                            checkKeys(segment, setOf("text", "reading"))
                            val segmentText = segment.opt("text") as? String ?: fail("text")
                            if (segmentText.isEmpty()) fail("text")
                            val reading = if (segment.has("reading")) text(segment, "reading", 256) else null
                            if (reading != null && !validReading(reading)) fail("reading")
                            WrittenPiece(segmentText, reading)
                        }.also { if (it.all { segment -> segment.text.isBlank() }) fail("text") }
                    }
                    else -> fail("text")
                }
                val chinese = if (value.has("zh")) text(value, "zh") else null
                if (japanese.isEmpty() && chinese == null) fail("text")
                SubtitleCue(id, start, end, kind, japanese, chinese)
            }
            return SubtitleDocument(documentId, textFingerprint(raw), normalizeCueTimes(cues))
        } catch (error: SubtitleFormatException) {
            throw error
        } catch (_: Exception) {
            fail("structure")
        }
    }

    private fun text(value: JSONObject, key: String, max: Int = 500_000): String =
        (value.opt(key) as? String)?.takeIf { it.isNotBlank() && it.length <= max } ?: fail("text")

    private fun integer(value: JSONObject, key: String): Long {
        val number = value.opt(key) as? Number ?: fail("time")
        val decimal = number.toDouble()
        if (!decimal.isFinite() || decimal < 0 || decimal > 9_007_199_254_740_991.0 || decimal != number.toLong().toDouble()) fail("time")
        return number.toLong()
    }

    private fun checkKeys(value: JSONObject, allowed: Set<String>) {
        if (value.keys().asSequence().any { it !in allowed }) fail("field")
    }

    private fun fail(problem: String): Nothing = throw SubtitleFormatException(problem)
}
