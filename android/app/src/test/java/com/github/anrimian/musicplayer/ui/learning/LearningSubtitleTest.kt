package com.github.anrimian.musicplayer.ui.learning

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class LearningSubtitleTest {
    @Test fun `minute values beyond 59 and BOM are supported`() {
        val cue = LrcDecoder.decode("\uFEFF[123:04.250]人間　｜　人类").cues.single()
        assertEquals(7_384_250L, cue.startMs)
        assertEquals("人間", cue.japaneseText)
        assertEquals("人类", cue.chinese)
    }

    @Test fun `two and three decimal timestamps are equivalent`() {
        val cues = LrcDecoder.decode("[00:01.25]一　｜　一\n[00:01.250]二　｜　二").cues
        assertEquals(listOf(1_250L, 1_250L), cues.map { it.startMs })
    }

    @Test fun `multiple timestamps expand and duplicate times retain every text`() {
        val cues = LrcDecoder.decode("[00:03.000]後　｜　后\n[00:01.000][00:02.000]先　｜　先\n[00:01.000]別　｜　另").cues
        assertEquals(listOf(1_000L, 1_000L, 2_000L, 3_000L), cues.map { it.startMs })
        assertEquals(listOf("先", "別", "先", "後"), cues.map { it.japaneseText })
        assertTrue(cues[0].activeAt(1_500))
        assertTrue(cues[1].activeAt(1_500))
        assertEquals(2_000L, cues[0].endMs)
    }

    @Test fun `offset is applied without making negative times`() {
        val cues = LrcDecoder.decode("[offset:200]\n[00:00.100]早　｜　早\n[00:01.000]次　｜　下").cues
        assertEquals(listOf(0L, 800L), cues.map { it.startMs })
    }

    @Test fun `blank timestamp clears dialogue`() {
        val cues = LrcDecoder.decode("[00:00.000]台詞　｜　台词\n[00:02.000]\n[00:04.000]次　｜　下").cues
        assertFalse(cues[0].activeAt(2_500))
        assertEquals(CueKind.CLEAR, cues[1].kind)
    }

    @Test fun `scene remains readable after following dialogue starts`() {
        val cues = LrcDecoder.decode("[00:00.000]（雨声）\n[00:00.100]雨ですね　｜　下雨了").cues
        val scene = cues.first()
        assertEquals(CueKind.SCENE, scene.kind)
        assertEquals(0L, scene.startMs)
        assertTrue(scene.activeAt(2_000))
        assertTrue(cues.last().activeAt(2_000))
        assertFalse(scene.allowAutomaticReading)
    }

    @Test fun `malformed timestamps and overflowing minutes produce warnings`() {
        val document = LrcDecoder.decode("[00:99.00]bad\n[999999999999999999999:00.00]bad")
        assertTrue(document.cues.isEmpty())
        assertEquals(2, document.warningCount)
    }

    @Test fun `bilingual scene keeps both languages in the independent interval`() {
        val cues = LrcDecoder.decode("[00:05.000]（雨の音）　｜　（雨声）\n[00:05.100]雨ですね　｜　下雨了").cues
        val scene = cues.first()
        assertEquals(CueKind.SCENE, scene.kind)
        assertEquals("雨の音", scene.japaneseText)
        assertEquals("雨声", scene.chinese)
        assertTrue(scene.activeAt(8_000))
        assertFalse(scene.activeAt(9_001))
        assertEquals(2, cues.size)
    }

    @Test fun `LRC can carry an explicit reading without confusing translation separator`() {
        val cue = LrcDecoder.decode("[00:01.000]{人間|にんげん}です　｜　是人类").cues.single()
        assertEquals("人間です", cue.japaneseText)
        assertEquals("にんげん", cue.japanese.first().reading)
        assertEquals("是人类", cue.chinese)
    }

    @Test fun `personal reading wins over supplied and automatic readings`() {
        val cue = SubtitleCue("one", 0, japanese = listOf(WrittenPiece("人間", "にんげん")))
        val auto = listOf(ReadingSpan(0, 2, "じんかん"))
        val supplied = ReadingEngine.render(cue, auto).single()
        assertEquals("にんげん", supplied.reading)
        assertEquals(ReadingOrigin.SUBTITLE, supplied.origin)
        val edited = ReadingEngine.render(cue, auto) { "ひと" }.single()
        assertEquals("ひと", edited.reading)
        assertEquals(ReadingOrigin.CORRECTION, edited.origin)
        assertEquals("にんげん", cue.japanese.single().reading)
    }

    @Test fun `supplied and automatic readings coexist within one line`() {
        val cue = SubtitleCue("one", 0, japanese = listOf(WrittenPiece("人間", "にんげん"), WrittenPiece("と日本語")))
        val pieces = ReadingEngine.render(cue, listOf(ReadingSpan(0, 2, "じんかん"), ReadingSpan(3, 6, "にほんご")))
        assertEquals(listOf("にんげん", "にほんご"), pieces.mapNotNull { it.reading })
        assertEquals("人間と日本語", pieces.joinToString("") { it.text })
    }

    @Test fun `okurigana stays outside ruby when alignment is unambiguous`() {
        val cue = SubtitleCue("one", 0, japanese = listOf(WrittenPiece("食べる")))
        val pieces = ReadingEngine.render(cue, listOf(ReadingSpan(0, 3, "たべる")))
        assertEquals("食", pieces.first().text)
        assertEquals("た", pieces.first().reading)
        assertEquals("べる", pieces.last().text)
        assertNull(pieces.last().reading)
    }

    @Test fun `translation and scene never receive automatic annotations`() {
        val chineseOnly = SubtitleCue("one", 0, chinese = "人类")
        assertTrue(ReadingEngine.render(chineseOnly, listOf(ReadingSpan(0, 2, "にんげん"))).isEmpty())
        val scene = SubtitleCue("scene", 0, kind = CueKind.SCENE, japanese = listOf(WrittenPiece("日本語")))
        assertTrue(ReadingEngine.render(scene, listOf(ReadingSpan(0, 3, "にほんご"))).all { it.reading == null })
    }

    @Test fun `ambiguous unseparated text does not get automatic readings`() {
        val cue = LrcDecoder.decode("[00:01.000]中文提示").cues.single()
        assertFalse(cue.allowAutomaticReading)
        assertTrue(ReadingEngine.render(cue, listOf(ReadingSpan(0, 4, "ちゅうぶんていじ"))).all { it.reading == null })
    }

    @Test fun `language modes restore safely and share the same source data`() {
        assertEquals(SubtitleMode.JAPANESE, SubtitleMode.restore(null))
        assertEquals(SubtitleMode.JAPANESE, SubtitleMode.restore("invalid"))
        assertTrue(SubtitleMode.JAPANESE.japanese)
        assertFalse(SubtitleMode.JAPANESE.chinese)
        assertFalse(SubtitleMode.CHINESE.japanese)
        assertTrue(SubtitleMode.CHINESE.chinese)
        assertTrue(SubtitleMode.BILINGUAL.japanese && SubtitleMode.BILINGUAL.chinese)
    }
}
