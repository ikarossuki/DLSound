package com.github.anrimian.musicplayer.ui.v12

import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.ui.learning.*
import org.json.JSONArray
import org.json.JSONObject
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class Version144Test {
    private fun row(folder: String, name: String = "01.wav", size: Long = 40L) =
        JSONObject().put("folder", folder).put("fileName", name).put("size", size).put("duration", 6000)
    private fun backup(path: String): JSONObject {
        val track = JSONObject().put("path",path).put("identity",JSONArray(listOf("01.wav",40L,6000L)).toString())
        return JSONObject().put("format","DLSound/1").put("tracks",JSONObject().put("old",track))
    }
    @Test fun exactPathWinsButEqualFilesRequireAChoiceAfterAMove() {
        val rows = mapOf(10L to row("/sdcard/A"), 20L to row("/sdcard/B"))
        assertEquals(20L, BackupMatches(backup("/storage/emulated/0/B/01.wav"), rows, emptyMap()).tracks.single().resolved?.id)
        val missing = BackupMatches(backup("/old/01.wav"),rows,emptyMap()).unresolved.single()
        assertEquals(2,missing.candidates.size)
        assertTrue(BackupMatches(backup("/old/01.wav"), emptyMap(),emptyMap()).unresolved.single().candidates.isEmpty())
    }
    @Test fun explicitChoiceSurvivesARescanButDoesNotFollowAReusedIdOrReplacedFile() {
        val doc = backup("/old/01.wav")
        val rows = mapOf(1L to row("/sdcard/A"), 2L to row("/sdcard/B"))
        val selected = BackupMatches(doc,rows,emptyMap()).local.last()
        val choices = mapOf("old" to selected.selection)
        assertEquals(55L, BackupMatches(doc,mapOf(2L to row("/sdcard/A"),55L to row("/sdcard/B")),choices).tracks.single().resolved?.id)
        assertEquals(1, BackupMatches(doc,mapOf(2L to row("/sdcard/A"),55L to row("/sdcard/B",size=50)),choices).unresolved.size)
    }
    @Test fun missingSourceCanBeLinkedToARenamedTrack() {
        val doc = backup("/old/01.wav")
        val rows = mapOf(7L to row("/sdcard/新作品", "第一话.wav"))
        val preview = BackupMatches(doc,rows,emptyMap())
        assertTrue(preview.unresolved.single().candidates.isEmpty())
        assertEquals(7L, BackupMatches(doc,rows,mapOf("old" to preview.local.single().selection)).tracks.single().resolved?.id)
    }
    @Test fun missingCatalogEntryCanStillBeChosenForEveryOriginalPlaylistSlot() {
        val doc = backup("/old/01.wav").put("playlists", JSONArray().put(JSONObject()
            .put("members",JSONArray(listOf("lost","old","lost")))))
        val rows = mapOf(1L to row("/sdcard/A"), 3L to row("/sdcard/B","renamed.wav"))
        val preview = BackupMatches(doc,rows,emptyMap())
        assertEquals("lost", preview.unresolved.single().key)
        val picked = BackupMatches(doc,rows,mapOf("lost" to preview.local.last().selection))
            .tracks.associate { it.key to it.resolved?.id }
        val slots = doc.getJSONArray("playlists").getJSONObject(0).getJSONArray("members")
        assertEquals(listOf(3L,1L,3L),(0 until slots.length()).map { picked[slots.getString(it)] })
    }
    @Test fun searchUsesBothTimelinesAndKeepsRepeatedDialogueInOrder() {
        val ja = SubtitleFiles.decode("[00:01]あした\n[00:04]あした")
        val zh = SubtitleFiles.decode("[00:02]明天见\n[00:05]再见")
        val index = DialogueSearch(SubtitlePair.combine(ja,zh))
        assertEquals(listOf(2000L),index.find(" 明天 ").map { it.cue.startMs })
        assertEquals(listOf(1000L,4000L),index.find("あした").map { it.cue.startMs })
        assertTrue(index.find(" ").isEmpty())
        assertTrue(index.find("明天").single().context.isNotBlank())
    }
    @Test fun searchExcludesSceneClearAndRubyButReturnsTheOtherLanguageForContext() {
        val cue = SubtitleCue("j",1000,japanese=listOf(WrittenPiece("明日","あした")),chinese="明天")
        val index = DialogueSearch(SubtitleDocument("d","f", listOf(cue, cue.copy(kind=CueKind.SCENE),cue.copy(kind=CueKind.CLEAR))))
        assertEquals("明日",index.find("明天").single().context)
        assertEquals("明天",index.find("明日").single().context)
        assertTrue(index.find("あした").isEmpty())
    }
    @Test fun emptyLyricsOfferOnlyTheActionForTheCurrentFailure() {
        val base = LearningState(track=LearningFile("uri","第01话.wav",false))
        fun message(status: Int) = LyricPlaceholder.forState(base.copy(subtitleStatus=status),false)
        assertEquals(LyricRecovery.DIRECTORY,message(R.string.himitsu_subtitle_folder_needed).action)
        assertEquals(LyricRecovery.SUBTITLE,message(R.string.himitsu_subtitle_missing).action)
        assertTrue(message(R.string.himitsu_subtitle_missing).detail.contains("第01话.vtt"))
        assertEquals(LyricRecovery.SUBTITLE,message(R.string.himitsu_subtitle_error).action)
        assertNotEquals(message(R.string.himitsu_subtitle_error).title,message(R.string.himitsu_subtitle_empty).title)
        assertNull(message(R.string.himitsu_subtitle_loading).action)
        assertNull(LyricPlaceholder.forState(LearningState(),false).action)
        assertEquals(LyricRecovery.AUDIO,LyricPlaceholder.forState(base.copy(audioFailed=true),false).action)
        assertEquals(LyricRecovery.AUDIO,LyricPlaceholder.forState(base,true).action)
    }
}
