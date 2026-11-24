package com.github.anrimian.musicplayer.ui.v12

import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.widget.*
import androidx.core.widget.doAfterTextChanged
import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.ui.learning.CueKind
import org.json.JSONObject
import java.util.UUID

internal class NativeStudy(private val ui:NativePlayerScreen,saved:Bundle?) {
    private var source=saved?.getString("native.boundSource").orEmpty()
    private var start=saved?.getLong("native.a",-1) ?: -1
    private var end=saved?.getLong("native.b",-1) ?: -1
    private var passes=saved?.getInt("native.passes",3) ?: 3
    private var name=saved?.getString("native.markName").orEmpty()
    private var slider:SeekBar?=null
    private var timeLabel:TextView?=null
    private var rangeStatus:TextView?=null
    private var stop:TextView?=null
    private var pointB: TextView? = null
    private var currentLine: TextView? = null
    private var repeatLine: TextView? = null
    private var dragging=false
    fun save(out:Bundle) {
        out.putString("native.boundSource",source);out.putLong("native.a",start);out.putLong("native.b",end)
        out.putInt("native.passes",passes);out.putString("native.markName",name)
    }
    fun clearViews(){slider=null;timeLabel=null;rangeStatus=null;stop=null;pointB=null;currentLine=null;repeatLine=null;dragging=false}
    private fun bookmarks()=ui.host.records.list("bookmarks").objects().sortedByDescending {it.optLong("created")}
    private fun store(row:JSONObject):Boolean=runCatching {ui.host.records.update("bookmarks",row.text("key"),row.toString(),false)}
        .onFailure {ui.host.error(it.message ?: "书签未能保存")}.getOrDefault(false)
    private fun open(row:JSONObject) = with(ui) {
        val targetSource=row.text("source")
        val active=current
        val t=if(active!=null && trackSource(active)==targetSource) active else catalog.tracks.firstOrNull { trackSource(it)==targetSource }
        if(t==null) {
            if(external || catalog.tracks.isEmpty()){host.error("请用原音频打开这个书签");return@with}
            val originals=catalog.tracks.sortedWith(compareBy(naturalOrder){trackSource(it)})
            choose("重新关联音轨",originals.map(::trackSource),-1){i->
                val selected=originals[i]
                confirm("保存关联",row.text("source")+"\n→ "+trackSource(selected)){
                    if(store(JSONObject(row.toString()).put("source",trackSource(selected)))) { host.error("书签已关联");render() }
                }
            }
            return@with
        }
        host.practice(t.text("id"),row.optLong("start"),if(row.has("end")) row.optLong("end") else null,open=true,pauseAtEnd=true) {
            if(route.name=="marks") openPlayer("lyrics")
        }
    }
    private fun remove(row:JSONObject)=with(ui) {
        confirm("删除书签","删除「"+row.text("name")+"」？"){
            if(host.records.update("bookmarks",row.text("key"),null,false)) render()
        }
    }
    private fun entry(row:JSONObject)=NativeRow(row.text("name"),row.text("title")+" · "+clock(row.optLong("start"))+
        (if(row.has("end")) " – "+clock(row.optLong("end")) else ""),R.drawable.dls_book,extraIcon=R.drawable.ic_delete_outline,
        extraLabel="删除书签 "+row.text("name"),extra={remove(row)}){open(row)}
    fun show()=with(ui) {
        if(route.name=="marks") {
            header("我的书签","返回上一页")
            val marks=bookmarks();if(marks.isEmpty()) textBlock(body,"还没有书签。播放时打开「复听与书签」即可保存。")
            rows(marks.map(::entry),"marks");return@with
        }
        header("复听与书签","返回播放页")
        val t=current ?: run {textBlock(body,"请先打开音轨");return@with}
        val currentSource=trackSource(t)
        if(source!=currentSource) {source=currentSource;start=-1;end=-1;name=""}
        val panel = scrolling().apply { setPadding(dp(2),dp(12),dp(2),dp(4)) }
        val scroll = panel.parent as ScrollView
        scroll.layoutParams = lp(-1, (host.resources.configuration.screenHeightDp * .69f).toInt())
        fun control(title: String, primary: Boolean = false, run: () -> Unit) =
            button(title, run, primary).also { if (!primary) outline(it, run) }
        fun add(title: String, primary: Boolean = false, run: () -> Unit) = control(title, primary, run).also {
            panel.addView(it, lp().apply { topMargin = dp(9) })
        }
        fun section(title: String) = panel.addView(label(title,16,bold=true).apply { setPadding(0,dp(18),0,dp(8)) })
        fun pairButtons(first: TextView, second: TextView) {
            panel.addView(bar().apply {
                addView(first,lp(-2,-2)); addView(second,lp(-2,-2).apply { marginStart=dp(8) })
            }, lp().apply { topMargin=dp(10) })
        }
        fun at()=transport.position.coerceIn(0,transport.duration.coerceAtLeast(0))
        fun listen(a:Long,b:Long){host.practice(t.text("id"),a,b,passes)}
        fun mark(a:Long,b:Long?=null) {
            if(a<0 || a>=transport.duration || (b!=null && b<=a)){host.error("请先设置有效的时间位置");return}
            val row=json("key" to UUID.randomUUID().toString(),"source" to currentSource,"title" to t.text("title"),
                "name" to name.trim().ifEmpty {t.text("title")+" "+clock(a)},"start" to a,"end" to b,"created" to System.currentTimeMillis())
            if(store(row)){name="";host.error("书签已保存");render()}
        }
        panel.addView(choiceRow("播放遍数",if(passes==0) "无限循环" else "$passes 遍") {
            val values=listOf(1,3,5,0);choose("播放遍数",listOf("1 遍","3 遍","5 遍","无限循环"),values.indexOf(passes)){passes=values[it];render()}
        })
        repeatLine = add("复听当前句",true){
            val offset=state.optLong("offset");val dur=transport.duration
            val cue=host.learning.rendered.firstOrNull {it.cue.kind==CueKind.DIALOGUE && it.cue.activeAt(at()-offset,dur) &&
                (host.learning.document?.id!="parallel" || it.cue.japaneseText.isNotBlank())}?.cue
            if(cue==null) host.error("当前位置没有可复听的台词") else {
                val b=(cue.endMs ?: dur).coerceAtMost(dur)+offset;listen((cue.startMs+offset).coerceIn(0,dur),b.coerceIn(0,dur))
            }
        }
        add("逐句连续复听"){
            if(passes==0) host.error("请为每句选择有限的播放遍数") else host.learning.document?.let { host.practice(t.text("id"),passes=passes,fingerprint=it.fingerprint) } ?: host.error("请先加载字幕")
        }
        currentLine = label("",12,muted).also { panel.addView(it,lp().apply { topMargin=dp(10) }) }
        rangeStatus=label("",13,muted).also {panel.addView(it,lp())}
        val a = control("设 A 点" + if(start>=0) " · "+clock(start) else "") { start=at(); end=-1; render() }
        val b = control("设 B 点" + if(end>=0) " · "+clock(end) else "") {
            if (start>=0 && at()>start) { end=at(); render() }
        }
        pointB=b; pairButtons(a,b)
        timeLabel=label("",13,muted).also { panel.addView(it,lp().apply { topMargin=dp(10) }) }
        slider=player.slider("调整取点位置",{drag,ms->dragging=drag;timeLabel?.text="播放位置 · "+clock(ms)}){ms->host.seekTo(ms)}
        panel.addView(slider,lp(-1,36))
        val valid = start>=0 && end>start
        add("播放 A–B 区间"){listen(start,end)}.apply { isEnabled=valid;alpha=if(valid) 1f else .45f }
        stop=add("结束复听"){host.practice(t.text("id"))}
        section("保存书签")
        val field=EditText(host.dialogContext()).apply {
            hint="书签名称（可选）";contentDescription="书签名称";isSingleLine=true;setText(name);fieldStyle(this)
            doAfterTextChanged {name=it.toString().take(100)}
        }
        panel.addView(field,lp(-1,44))
        pairButtons(control("保存当前时间点"){mark(at())}, control("收藏 A–B 片段"){mark(start,end)}.apply {
            isEnabled=valid;alpha=if(valid) 1f else .45f
        })
        section("本曲书签")
        val marks = bookmarks().filter {it.text("source")==currentSource}
        if(marks.isEmpty()) panel.addView(label("还没有书签。播放时打开「复听与书签」，即可保存时间点或片段。",13,muted))
        for(m in marks) {
            val row=bar();row.addView(button(m.text("name")+" · "+clock(m.optLong("start")),{open(m)}),lp(0,-2,1f))
            tool(row,R.drawable.ic_delete_outline,"删除书签 "+m.text("name")){remove(m)};panel.addView(row,lp())
        }
        tick()
    }
    fun tick()=with(ui) {
        if(slider==null) return@with
        if(!dragging) { val time=transport.position;slider?.progress=(time*10000/transport.duration.coerceAtLeast(1)).toInt()
            timeLabel?.text="播放位置 · "+clock(time) }
        val position = transport.position
        val enableB = start >= 0 && position > start
        pointB?.apply { isEnabled=enableB; alpha=if(enableB) 1f else .45f }
        val cue = host.learning.rendered.firstOrNull {
            it.cue.kind == CueKind.DIALOGUE && it.cue.activeAt(position-state.optLong("offset"),transport.duration) &&
                (host.learning.document?.id!="parallel" || it.cue.japaneseText.isNotBlank())
        }
        repeatLine?.apply { isEnabled=cue!=null; alpha=if(cue!=null) 1f else .45f }
        currentLine?.apply {
            val name = cue?.cue?.japaneseText.orEmpty()
            if (text.toString()!=name) text=name
            visibility=if(name.isEmpty()) View.GONE else View.VISIBLE
        }
        val active=state.optJSONObject("listenRange")
        rangeStatus?.visibility=if(active==null) View.GONE else View.VISIBLE
        stop?.visibility=if(active==null) View.GONE else View.VISIBLE
        rangeStatus?.text=when {active==null->"";active.optInt("sentence")>0->"逐句复听 · 第 ${active.optInt("sentence")} / ${active.optInt("sentenceCount")} 句"
            active.optInt("passes")>0->"剩 ${active.optInt("passes")} 遍";else->"无限循环"}
    }
}
