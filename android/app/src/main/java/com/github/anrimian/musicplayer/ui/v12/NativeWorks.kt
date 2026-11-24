package com.github.anrimian.musicplayer.ui.v12

import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.widget.doAfterTextChanged
import com.github.anrimian.musicplayer.R
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import org.json.JSONArray
import org.json.JSONObject

internal class NativeWorks(private val ui:NativePlayerScreen,saved:Bundle?) {
    private var grouping=saved?.getString("native.workGroup") ?: "作品"
    private var query=saved?.getString("native.workQuery").orEmpty()
    private val rj=Regex("RJ[0-9]{5,}",RegexOption.IGNORE_CASE)
    private val groups=listOf("作品","声优","社团")
    fun save(out:Bundle){out.putString("native.workGroup",grouping);out.putString("native.workQuery",query)}
    private fun blank(dir:NativeDirectory)=json("key" to dir.path,"name" to dir.name,"actor" to "","circle" to "","version" to "")
    private fun known():Map<String,JSONObject> {
        val works=mutableMapOf<String,JSONObject>()
        for(dir in ui.catalog.directories.values) if(rj.containsMatchIn(dir.name)) works[dir.path]=blank(dir)
        for(row in ui.host.records.list("works").objects()) works[row.text("key")]=row
        return works
    }
    fun show()=with(ui) {
        val all=known()
        if(route.name=="work") {detail(all);return@with}
        val top=header("作品库","返回文件夹")
        tool(top,R.drawable.dls_add,"指定作品根目录"){edit(null)}
        val search=EditText(host.dialogContext()).apply {
            isSingleLine=true;textSize=15f;hint="作品名、RJ 编号、声优或社团";contentDescription="搜索作品";setText(query);setSelection(text.length)
            fieldStyle(this)
        }
        val filters = column().apply { setPadding(dp(16),dp(16),dp(16),dp(10)) }
        filters.addView(search,lp(-1,38)); body.addView(filters)
        filters.addView(choiceRow("分组方式", grouping) { choose("分组方式",groups,groups.indexOf(grouping)){grouping=groups[it];render()} }, lp().apply { topMargin=dp(10) })
        fun entries():List<NativeRow> {
            val grouped=sortedMapOf<String,MutableList<JSONObject>>(naturalOrder)
            for(w in all.values.sortedWith(compareBy(naturalOrder){it.text("name")})) {
                if(listOf("name","key","actor","circle").none { w.text(it).contains(query.trim(),true) }) continue
                val labels=when(grouping) { "声优" -> w.text("actor").split(Regex("[,，、;；]")).map(String::trim).filter(String::isNotBlank).distinct()
                    "社团" -> listOf(w.text("circle"));else -> listOf("") }
                for(group in labels.ifEmpty { listOf("") }) grouped.getOrPut(group){mutableListOf()}.add(w)
            }
            return buildList {
                grouped.forEach { (group,entries)->
                    if(grouping!="作品") add(NativeRow(group.ifEmpty { "未填写"+grouping },meta="${entries.size} 部"))
                    entries.forEach { w->add(NativeRow(w.text("name"),icon=R.drawable.dls_folder,meta=w.text("actor")){ go("work",w.text("key")) }) }
                }
                if(isEmpty()) add(NativeRow(if(query.isBlank()) "还没有作品" else "没有匹配的作品",if(query.isBlank()) "点右上角加号指定作品根目录。" else ""))
            }
        }
        val (_,adapter)=rows(entries(),"works")
        search.doAfterTextChanged { query=it.toString();adapter.replace(entries()) }
    }
    private fun versions(dir:NativeDirectory?,roots:Set<String>):Map<String,List<JSONObject>> {
        if(dir==null) return emptyMap()
        val result=linkedMapOf<String,List<JSONObject>>()
        if(dir.tracks.isNotEmpty()) result[""]=dir.tracks.sortedWith(NativeCatalog.trackOrder)
        fun collect(node:NativeDirectory,out:MutableList<JSONObject>) {
            if(node.path in roots) return
            out+=node.tracks;node.children.values.forEach { collect(it,out) }
        }
        for(child in dir.children.values) {
            val tracks=mutableListOf<JSONObject>();collect(child,tracks)
            if(tracks.isNotEmpty()) result[child.name]=tracks.sortedWith(NativeCatalog.trackOrder)
        }
        return result
    }
    private fun detail(all:Map<String,JSONObject>)=with(ui) {
        val w=all[route.key] ?: run {header("作品","返回作品列表");textBlock(body,"作品已移除");return@with}
        val top=header(w.text("name"),"返回作品列表");tool(top,R.drawable.dls_edit,"编辑作品信息"){edit(w)}
        val versions=versions(catalog.directories[route.key],all.keys)
        val version=w.text("version").takeIf { it in versions } ?: versions.keys.firstOrNull()
        val tracks=versions[version].orEmpty()
        if(tracks.isEmpty()) {
            textBlock(body,"作品目录里没有可读取的音轨。请检查存储设备并刷新曲库。")
            body.addView(button("重新关联作品目录",{relink(w)}));return@with
        }
        if(w.text("actor").isNotBlank() || w.text("circle").isNotBlank())
            textBlock(body,listOf(w.text("actor"),w.text("circle")).filter(String::isNotBlank).joinToString(" · "))
        val actions = column().apply { setPadding(dp(16),dp(22),dp(16),dp(8)) }
        body.addView(actions)
        actions.addView(choiceRow("偏好版本",version.orEmpty().ifEmpty{"根目录音轨"}) {
            val names=versions.keys.toList()
            choose("偏好版本",names.map { it.ifEmpty { "根目录音轨" } },names.indexOf(version)){i->
                persist(JSONObject(w.toString()).put("version",names[i]));render()
            }
        },lp())
        val resume=button("继续收听",{} ,true).apply { visibility=View.GONE }
        val first = button("从第一轨开始 · ${tracks.size} 首", { play(tracks,0,0) }, true)
        val args=json("ids" to JSONArray(tracks.map { it.text("id") }))
        val page=route
        host.action("workProgress",args){result->
            val index=tracks.indexOfFirst { it.text("id")==result?.text("id") }
            if(route==page && index>=0 && resume.parent!=null) {
                val target=tracks[index]
                val time=result?.optLong("ms")?.takeIf { it<target.optLong("duration") } ?: 0
                resume.text="继续收听 · "+target.text("fileName",target.text("title"))+" · "+clock(time)
                resume.visibility=View.VISIBLE
                outline(first) { play(tracks,0,0) }; first.setTextColor(ink)
                click(resume,green,6){
                    host.action("workProgress",args){latest->
                        val i=tracks.indexOfFirst { it.text("id")==latest?.text("id") }.takeIf { it>=0 } ?: index
                        val ms=latest?.optLong("ms",time) ?: time
                        play(tracks,i,if(ms<tracks[i].optLong("duration")) ms else 0)
                    }
                }
            }
        }
        actions.addView(resume,lp().apply { topMargin=dp(10) })
        actions.addView(first,lp().apply { topMargin=dp(10) })
        rows(tracks.mapIndexed { i,t->NativeRow(t.text("title"),number=i+1){play(tracks,i)} },"work/"+page.key+"/"+version)
    }
    private fun persist(row:JSONObject):Boolean=runCatching {
        ui.host.records.update("works",row.text("key"),row.toString(),false)
    }.onFailure {ui.host.error(it.message ?: "作品未能保存")}.getOrDefault(false)
    private fun edit(prior:JSONObject?)=with(ui) {
        fun form(original:JSONObject) {
            val box=column().apply { setPadding(dp(18),dp(10),dp(18),dp(8)) }
            textBlock(box,original.text("key"))
            fun field(name:String,key:String):EditText {
                val e=EditText(host.dialogContext()).apply { hint=name;contentDescription=name;setText(original.text(key));isSingleLine=true }
                box.addView(e);return e
            }
            val name=field("作品名","name");val actor=field("声优","actor"); val circle=field("社团","circle")
            val scroll=android.widget.ScrollView(host).apply { addView(box) }
            val builder=MaterialAlertDialogBuilder(host.dialogContext()).setTitle(if(prior==null) "指定作品根目录" else "编辑作品信息")
                .setView(scroll).setPositiveButton("保存作品",null).setNegativeButton("取消",null)
            if(prior!=null && host.records.list("works").objects().any { it.text("key")==prior.text("key") })
                builder.setNeutralButton("重新关联作品目录",null)
            val dialog=builder.create()
            dialog.setOnShowListener {
                dialog.getButton(-1).setOnClickListener {
                    val title=name.text.toString().trim()
                    if(title.isEmpty()){ name.error="请填写作品名";return@setOnClickListener }
                    val row=JSONObject(original.toString()).put("name",title).put("actor",actor.text.toString().trim()).put("circle",circle.text.toString().trim())
                    if(persist(row)){ dialog.dismiss();if(prior==null) go("work",row.text("key")) else render() }
                }
                if(prior!=null) dialog.getButton(-3)?.setOnClickListener { relink(prior){dialog.dismiss()} }
            }
            dialog.show()
        }
        if(prior!=null) form(prior) else {
            val dirs=catalog.directories.values.filter { it.path.isNotEmpty() }.sortedWith(compareBy(naturalOrder){it.path})
            if(dirs.isEmpty()) { host.error("请先授权并读取曲库");return@with }
            choose("指定作品根目录",dirs.map { it.path },-1){i->val d=dirs[i];form(known()[d.path] ?: blank(d))}
        }
    }
    private fun relink(work:JSONObject,finished:()->Unit={})=with(ui) {
        val old=work.text("key")
        val dirs=catalog.directories.values.filter {it.path.isNotEmpty() && it.path!=old && !it.path.startsWith(old+"/")}.sortedWith(compareBy(naturalOrder){it.path})
        if(dirs.isEmpty()){host.error("没有可关联的目录");return@with}
        choose("重新关联作品目录",dirs.map {it.path},-1){i->
            val dest=dirs[i].path
            confirm("确认关联","将「"+work.text("name")+"」关联到 "+dest+"？"){
                host.action("moveWork",json("old" to old,"dest" to dest)){finished();back();go("work",dest)}
            }
        }
    }
}
