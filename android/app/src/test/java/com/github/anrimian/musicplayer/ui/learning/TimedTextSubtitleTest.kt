package com.github.anrimian.musicplayer.ui.learning

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class TimedTextSubtitleTest {
    @Test fun practiceUsesOriginalSentencesOffsetAndDuration() {
        val ja = SubtitleFiles.decode("[00:01]あした\n[00:03]またね")
        val zh = SubtitleFiles.decode("[00:00]明天\n[00:02]再见")
        val doc = SubtitlePair.combine(ja, zh)
        assertEquals(listOf(1250L..3250L, 3250L..5000L), doc.practiceSentences(0, 5000, 250))
        assertEquals(listOf(3250L..5000L), doc.practiceSentences(4000, 5000, 250))
        assertTrue(doc.practiceSentences(5000, 5000, 250).isEmpty())
    }
    @Test fun parallelFilesKeepIndependentBoundariesAndRuby() {
        val ja = SubtitleFiles.decode("WEBVTT\n\n00:00.000 --> 00:04.000\n<ruby>明日<rt>あした</rt></ruby>。")
        val zh = SubtitleFiles.decode("1\n00:00:01,000 --> 00:00:02,000\n明天。\n\n2\n00:00:05,000 --> 00:00:06,000\n后来。")
        val result = SubtitlePair.combine(ja,zh)
        fun active(ms:Long) = result.cues.filter { it.activeAt(ms) }
        assertEquals("あした",active(0).single().japanese.first().reading)
        assertEquals(listOf(null,"明天。"),active(1000).map { it.chinese })
        assertNull(active(2000).single().chinese)
        assertTrue(active(4500).isEmpty())
        assertEquals("后来。",active(5000).single().chinese)
    }
    @Test fun customPairRulesAndExactIntervals() {
        val files = listOf(file("01.orig.vtt"),file("01.cn.srt"),file("02.ja.vtt"),file("02.zh.srt"))
        assertEquals("01.cn.srt",SubtitlePair.match("01.wav",files,listOf(".orig.vtt",".cn.srt"))?.second?.name)
        assertEquals("02.ja.vtt",SubtitlePair.match("02.mp3",files)?.first?.name)
        assertNull(SubtitlePair.match("01.wav",files))
        val pair=SubtitlePair.combine(SubtitleFiles.decode("[00:01]あした"),SubtitleFiles.decode("[00:01]明天"))
        assertEquals("明天",pair.cues.single().chinese)
        assertEquals("あした",pair.cues.single().japaneseText)
    }
    private val vtt = """
        WEBVTT

        identifier
        00:01.250 --> 00:03.400 align:start
        <lang ja-JP><ruby>明日<rt>あした</rt></ruby>、また。</lang>
        <lang zh-Hans>明天见。</lang>
    """.trimIndent()
    private val srt = "1\r\n00:00:01,250 --> 00:00:03,400\r\n明日、また。\r\n明天见。"
    private val lrc = "[00:01.25]{明日|あした}、また。｜明天见。"
    private fun file(name: String, directory: Boolean = false) = LearningFile(name, name, directory)

    @Test fun sixAudioAndSubtitlePairsUseTheSameBasenameAndDecoder() {
        for (ext in listOf("Mp3", "WAV")) {
            for ((format, raw) in mapOf("vtt" to vtt, "srt" to srt, "lrc" to lrc)) {
                val sidecar = file("第01.話." + format.uppercase())
                val result = SubtitleFiles.match("第01.話.$ext", listOf(file("第01.$format"), file(sidecar.name, true), sidecar))
                assertEquals(sidecar, result)
                val document = SubtitleFiles.decode(raw, result!!.name)
                assertEquals(format, document.id)
                assertEquals(1250L, document.cues.single().startMs)
                assertEquals(document, SubtitleFiles.decode(raw))
            }
        }
    }

    @Test fun selectionHasStablePriorityAndSkipsUnrelatedFiles() {
        val names = listOf("A.srt", "A.lrc", "A.vtt")
        names.indices.forEach { index ->
            assertEquals(names[index], SubtitleFiles.match("A.wav", names.take(index + 1).map { file(it) })?.name)
        }
        assertEquals("A.vtt", SubtitleFiles.match("A.wav", (names + "A.hms.json").map { file(it) })?.name)
        assertNull(SubtitleFiles.match("A.wav", listOf(file("A.hms.json"))))
        assertNull(SubtitleFiles.match("B.mp3", names.map { file(it) }))
    }

    @Test fun archivedSubtitleFormatIsRejectedByNameAndContent() {
        assertEquals("retired", assertThrows(SubtitleFormatException::class.java) { SubtitleFiles.decode(vtt,"old.hms.JSON") }.problem)
        assertEquals("retired", assertThrows(SubtitleFormatException::class.java) { SubtitleFiles.decode("\uFEFF  {\"format\":\"himitsu-subtitles\"}") }.problem)
        assertNull(SubtitlePair.match("01.wav",listOf(file("01.a.json"),file("01.b.srt")),listOf(".a.json",".b.srt")))
    }

    @Test fun taggedVttSeparatesTranslationAndExplicitReading() {
        val cue = SubtitleFiles.decode("\uFEFF" + vtt.replace("\n", "\r\n")).cues.single()
        assertEquals(listOf(WrittenPiece("明日", "あした"), WrittenPiece("、また。")), cue.japanese)
        assertEquals("明天见。", cue.chinese)
        assertTrue(cue.activeAt(3399))
        assertFalse(cue.activeAt(3400))
        val existing = SubtitleFiles.decode(lrc).cues.single()
        assertEquals(cue.japanese, existing.japanese)
        assertEquals(cue.chinese, existing.chinese)
        assertFalse(cue.unlabelledText)
        assertFalse(existing.unlabelledText)
    }

    @Test fun srtPreservesMultilineTextTimingGapsAndOverlap() {
        val cues = SubtitleFiles.decode(srt + "\n\n2\n00:00:02,000 --> 00:00:04,000\n<i>second</i>" +
            "\n\n3\n01:00:00,000 --> 01:00:02,000\nthird").cues
        assertEquals("明日、また。\n明天见。", cues[0].japaneseText)
        assertNull(cues[0].chinese)
        assertTrue(cues[0].unlabelledText)
        assertEquals("second", cues[1].japaneseText)
        assertEquals(2, cues.count { it.activeAt(2500) })
        assertTrue(cues.none { it.activeAt(4100) })
        assertEquals(3_600_000L, cues.last().startMs)
    }

    @Test fun invalidBlocksAndVttMetadataDoNotBecomeLyrics() {
        val raw = "WEBVTT title\nKind: captions\n\nNOTE a note\n00:01.000 --> 00:02.000\nignore" +
            "\n\nSTYLE\n::cue { color: red }\n\nREGION\nid:main\n\n00:05.000 --> 00:04.000\nbad" +
            "\n\n00:03.000 --> 00:04.000\n<lang zh>只有中文 &amp; &#x266A;</lang>"
        val doc = SubtitleFiles.decode(raw)
        assertEquals(1, doc.warningCount)
        assertTrue(doc.cues.single().japanese.isEmpty())
        assertEquals("只有中文 & ♪", doc.cues.single().chinese)
    }

    @Test fun rubyHandlesMultiplePairsAndLiteralEscapes() {
        val body = "<lang ja><ruby><b>山</b><rt>ヤマ</rt>道<rt>みち</ruby>&lt;先&gt;</lang>"
        val cue = SubtitleFiles.decode("WEBVTT\n\n00:00.000 --> 00:01.000\n$body").cues.single()
        assertEquals(listOf(WrittenPiece("山", "やま"), WrittenPiece("道", "みち"), WrittenPiece("<先>")), cue.japanese)
    }

    @Test fun retiredJsonIsRejectedAndLrcWithAnArrowStillParses() {
        val json = checkNotNull(javaClass.getResource("/legacy-subtitles/learning-example.hms.json")).readText()
        assertEquals("retired", assertThrows(SubtitleFormatException::class.java) { SubtitleFiles.decode(json) }.problem)
        assertEquals("A --> B", SubtitleFiles.decode("[00:01]A --> B").cues.single().japaneseText)
    }
}
