package com.github.anrimian.musicplayer.ui.learning

internal object SubtitlePair {
    private val extensions = listOf("vtt", "lrc", "srt")
    fun match(audio: String, listing: List<LearningFile>, rule: List<String>? = null): Pair<LearningFile,LearningFile>? {
        val base = audio.substringBeforeLast('.')
        fun find(suffixes: List<String>) = suffixes.firstNotNullOfOrNull { suffix ->
            listing.singleOrNull { !it.directory && !SubtitleFiles.retiredName(it.name) && it.name.equals(base + suffix, true) }
        }
        fun variants(languages: List<String>) = languages.flatMap { lang -> extensions.map { ".$lang.$it" } }
        val ja = find(rule?.let { listOf(it[0]) } ?: variants(listOf("ja","jp","jpn"))) ?: return null
        val zh = find(rule?.let { listOf(it[1]) } ?: variants(listOf("zh","zh-Hans","zh-CN","chs","zh-Hant","cht"))) ?: return null
        return if (ja.uri != zh.uri) ja to zh else null
    }
    fun combine(ja: SubtitleDocument, zh: SubtitleDocument): SubtitleDocument {
        val originals = ja.cues.filter { it.kind != CueKind.CLEAR && it.japaneseText.isNotBlank() }
        val translations = zh.cues.filter { it.kind != CueKind.CLEAR && (!it.chinese.isNullOrBlank() || it.japaneseText.isNotBlank()) }
        if (originals.isEmpty() || translations.isEmpty()) throw SubtitleFormatException("empty")
        // Coalesce only exact one-to-one time spans. Other cues retain their own start, end and identity.
        fun span(c: SubtitleCue) = Triple(c.startMs,c.endMs,c.kind)
        val uniqueJa = originals.groupingBy(::span).eachCount()
        val byTime = translations.groupBy(::span)
        val used = mutableSetOf<String>()
        val cues = originals.map { cue ->
            val counterpart = if (uniqueJa[span(cue)] == 1) byTime[span(cue)]?.singleOrNull() else null
            counterpart?.let { used.add(it.id) }
            cue.copy(id="ja/" + cue.id, chinese=counterpart?.let { it.chinese ?: it.japaneseText }, unlabelledText=false,
                allowAutomaticReading=true)
        }.toMutableList()
        translations.filter { it.id !in used }.forEach { cue ->
            cues.add(cue.copy(id="zh/" + cue.id, japanese=emptyList(), chinese=cue.chinese ?: cue.japaneseText,
                allowAutomaticReading=false, unlabelledText=false))
        }
        return SubtitleDocument("parallel", textFingerprint("pair/" + ja.fingerprint + "/" + zh.fingerprint),
            cues.sortedBy { it.startMs }, ja.warningCount + zh.warningCount)
    }
}
