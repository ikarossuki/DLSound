package com.github.anrimian.musicplayer.ui.v12

import android.content.Context
import android.os.Bundle
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import androidx.core.widget.doAfterTextChanged
import androidx.lifecycle.lifecycleScope
import com.github.anrimian.musicplayer.ui.learning.DialogueSearch
import com.github.anrimian.musicplayer.ui.learning.SubtitleDocument
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

internal class NativeDialogueSearch(private val ui: NativePlayerScreen, saved: Bundle?) {
    private var query = saved?.getString("dialogue.query").orEmpty()
    private var document: SubtitleDocument? = null
    private var index: DialogueSearch? = null
    private var searchJob: Job? = null
    fun detach() { searchJob?.cancel(); searchJob = null }
    fun save(out: Bundle) = out.putString("dialogue.query", query)
    fun open() = with(ui) {
        val track = transport.current ?: return@with
        query = ""
        resetPosition("lyricSearch" + track.id)
        go("lyricSearch", track.id)
    }
    fun show() = with(ui) {
        header("查找台词", "返回本曲字幕")
        val owner = route.key
        val source = host.learning.document
        if (owner != transport.current?.id || source == null || !host.ownsSubtitle(owner)) {
            textBlock(body, "当前音轨或字幕已变化，请返回本曲字幕重新查找。")
            return@with
        }
        if (source !== document) { document = source; index = null }
        val field = EditText(host.dialogContext()).apply {
            fieldStyle(this); isSingleLine = true; hint = "搜索日文或中文台词"; contentDescription = hint
            setText(query); setSelection(text.length)
        }
        body.addView(field, lp(-1,46).apply { setMargins(dp(16),dp(8),dp(16),dp(4)) })
        val status = label("", 13, muted).apply { setPadding(dp(16),dp(10),dp(16),dp(8)) }
        body.addView(status, lp())
        val (list, adapter) = rows(emptyList())
        fun update(text: String) {
            detach()
            adapter.replace(emptyList())
            if (text.isBlank()) { status.text = "输入关键词查找本曲台词"; return }
            status.text = "正在查找…"
            searchJob = host.lifecycleScope.launch {
                val cached = index
                val (next, hits) = withContext(Dispatchers.Default) {
                    val lookup = cached ?: DialogueSearch(source)
                    lookup to lookup.find(text)
                }
                index = next
                status.text = if (hits.isEmpty()) "没有找到匹配的台词" else "找到 ${hits.size} 句"
                adapter.replace(hits.map { hit ->
                    NativeRow(hit.text, hit.context, meta = clock(hit.cue.startMs), profile = true, titleLines = 3) {
                        if (host.seekDialogue(owner, source, hit.cue.id)) {
                            (host.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager)
                                .hideSoftInputFromWindow(field.windowToken, 0)
                            returnToLyrics()
                        } else host.error("音轨或字幕已变化，请重新查找")
                    }
                })
            }
        }
        update(query)
        field.doAfterTextChanged {
            query = it.toString(); update(query); list.scrollToPosition(0)
        }
    }
}
