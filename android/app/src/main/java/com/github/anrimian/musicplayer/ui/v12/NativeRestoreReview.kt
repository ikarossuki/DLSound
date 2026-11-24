package com.github.anrimian.musicplayer.ui.v12

import android.os.Bundle
import android.widget.EditText
import androidx.core.widget.doAfterTextChanged
import org.json.JSONObject

internal data class RestoreSession(val key: String, val doc: JSONObject, val matches: BackupMatches)

internal class NativeRestoreReview(private val ui: NativePlayerScreen, saved: Bundle?) {
    private var query = saved?.getString("restore.filter").orEmpty()
    fun save(out: Bundle) = out.putString("restore.filter", query)

    fun show() = with(ui) {
        val reviewing = route.name == "restoreReview"
        header(if (reviewing) "备份音轨匹配" else "选择本地音轨", if (reviewing) "返回文件与曲库" else "返回匹配结果")
        val session = host.restoreSession
        if (session == null) {
            if (!host.hasRestoreDraft) { textBlock(body, "这份备份已处理完毕，可以返回文件与曲库。"); return@with }
            textBlock(body, "正在读取匹配记录…")
            host.resumeRestore()
            return@with
        }
        val matches = session.matches
        if (reviewing) {
            val missing = matches.unresolved
            textBlock(body, if (missing.isEmpty()) "音轨已全部匹配，可以恢复备份。"
                else "已匹配 ${matches.tracks.size - missing.size} 首，还有 ${missing.size} 首待确认。涉及这些音轨的歌单会在补选后按原顺序恢复。")
            rows(matches.review.map { match ->
                val reason = when {
                    match.chosen != null -> "已选择"
                    match.candidates.isEmpty() -> "未找到"
                    else -> "多个匹配"
                }
                NativeRow(match.name, match.chosen?.path ?: match.path, meta=reason, profile=true) {
                    query = ""; resetPosition("restoreTrack" + match.key); go("restoreTrack", match.key)
                }
            })
            body.addView(button(if (missing.isEmpty()) "完成恢复" else "恢复已匹配项", host::finishRestore, true),
                lp().apply { setMargins(dp(16),dp(8),dp(16),dp(8)) })
            return@with
        }
        val match = matches.tracks.firstOrNull { it.key == route.key } ?: return@with
        val fullSource = "备份中的音轨\n" + match.path.ifBlank { match.name }
        val original = label(fullSource,14,muted).apply {
            contentDescription = fullSource
            setPadding(dp(16),dp(6),dp(16),dp(8))
        }
        body.addView(original, lp())
        body.addOnLayoutChangeListener { _, _, top, _, bottom, _, _, _, _ ->
            val compact = bottom - top < dp(300)
            val title = if (compact) match.name else fullSource
            if (original.text != title) { original.isSingleLine = compact; original.text = title }
        }
        val search = EditText(host.dialogContext()).apply {
            fieldStyle(this); isSingleLine = true; hint = "搜索曲库中的文件名或目录"; contentDescription = hint
            setText(query); setSelection(text.length)
        }
        body.addView(search, lp(-1,46).apply { setMargins(dp(16),0,dp(16),dp(4)) })
        val status = label("",13,muted).apply { setPadding(dp(16),dp(8),dp(16),dp(4)) }
        body.addView(status,lp())
        val (list, adapter) = rows(emptyList())
        val works = host.records.list("works").objects().associate { it.getString("key") to it.getString("name") }
        fun workName(track: LocalBackupTrack): String {
            var folder = track.folder
            while (folder.isNotEmpty()) {
                works[folder]?.let { return it }
                folder = folder.substringBeforeLast('/', "")
            }
            return track.folder.substringAfterLast('/')
        }
        fun update() {
            val filtering = query.isNotBlank()
            val source = if (filtering || match.candidates.isEmpty()) matches.local else match.candidates
            val result = if (filtering) source.filter { it.path.contains(query.trim(),true) || workName(it).contains(query.trim(),true) } else source
            status.text = when {
                result.isEmpty() -> "没有找到本地音轨"
                !filtering && match.candidates.isNotEmpty() -> "可能匹配的音轨 · ${result.size}"
                else -> "本地曲库 · ${result.size}"
            }
            adapter.replace(result.map { track ->
                NativeRow(track.name + " · " + workName(track), track.path, meta=clock(track.duration), profile=true,
                    active=match.chosen == track, titleLines=2) {
                    (host.getSystemService(android.content.Context.INPUT_METHOD_SERVICE) as android.view.inputmethod.InputMethodManager)
                        .hideSoftInputFromWindow(search.windowToken, 0)
                    host.chooseBackupTrack(match.key, track)
                }
            })
        }
        update()
        search.doAfterTextChanged { query=it.toString(); update(); list.scrollToPosition(0) }
    }
}
