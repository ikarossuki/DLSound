package com.github.anrimian.musicplayer.ui.v12

import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.content.Context
import android.widget.*
import androidx.core.widget.doAfterTextChanged
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView
import com.github.anrimian.musicplayer.R
import org.json.JSONObject
import java.util.Collections

internal class NativeLibrary(private val ui:NativePlayerScreen,saved:Bundle?) {
    var section=saved?.getString("native.section") ?: "folders"
        private set
    private var group=saved?.getString("native.group").orEmpty()
    var searching=saved?.getBoolean("native.searching")==true
        private set
    private var query=saved?.getString("native.query").orEmpty()
    private var tree=false
    private var path=""
    private var searchAdapter:NativeRows?=null
    private var refreshPending=false
    private var visibleRows:NativeRows?=null
    private var queueAdapter:NativeRows?=null
    private var queueTitle:TextView?=null
    private var queueItems=mutableListOf<NativeQueueEntry>()
    private var dragActive=false
    fun clearViews(){ visibleRows=null; searchAdapter=null;queueAdapter=null;queueTitle=null }
    fun updateActive(){visibleRows?.highlight(ui.transport.current?.id)}
    fun updateQueue(){
        if(dragActive || queueAdapter==null) return
        queueItems=ui.transport.entries.toMutableList()
        queueTitle?.contentDescription="播放队列，" + queueItems.size + " 首音轨"
        queueAdapter?.updateQueue(queueItems.mapIndexed(::queueRow))
    }
    init { restoreBrowser() }
    fun restoreBrowser() { val saved=ui.host.browser(); tree=saved.optBoolean("tree"); path=saved.text("path") }
    fun save(out:Bundle) {
        out.putString("native.section",section); out.putString("native.group",group)
        out.putBoolean("native.searching",searching); out.putString("native.query",query)
    }
    fun select(value:String) { section=value; group=""; searching=false; query="" }
    fun back():Boolean {
        when {
            searching -> { searching=false; query="" }
            section=="folders" && tree && ui.catalog.nearest(path).path.isNotEmpty() -> navigate(ui.catalog.nearest(path).parent)
            group.isNotEmpty() -> group=""
            else -> return false
        }
        ui.render(); return true
    }
    private fun navigate(next:String) { path=next; ui.host.saveBrowser(tree,path) }
    private fun enterGroup(key:String) { group=key; ui.render() }
    private val lists get()=ui.state.optJSONArray("playlists").objects()
    private val selectedList get()=if(section=="playlists") lists.find { it.text("id")==group } else null
    private fun startRefresh() {
        if(refreshPending) return
        refreshPending=true
        // The operation can finish with a permission or timeout error and remains retryable.
        ui.host.action("refresh",onComplete={ refreshPending=false }) { ui.host.error("刷新完成") }
    }
    fun show() = with(ui) {
        searchAdapter=null
        if(section=="me") { settings.show("me"); return@with }
        val directory=catalog.nearest(path)
        val nested=group.isNotEmpty() || (section=="folders" && tree && directory.path.isNotEmpty())
        val title=when {
            section=="folders" && tree && directory.path.isNotEmpty() -> directory.name
            group.isEmpty() -> NativePlayerScreen.sections.first { it.first==section }.second
            section=="folders" -> catalog.folders[group]?.firstOrNull()?.text("folderName") ?: group
            section=="albums" -> catalog.albums[group]?.firstOrNull()?.text("album") ?: "专辑"
            group=="favorites" -> "我的收藏"
            else -> selectedList?.text("name") ?: group
        }
        if(searching) {
            val band=bar()
            tool(band,R.drawable.dls_back,"关闭搜索"){back()}
            val field=EditText(host.dialogContext()).apply {
                fieldStyle(this); hint="搜索曲名、音乐人或专辑"; textSize=15f; isSingleLine=true; contentDescription=hint
                setText(query); setSelection(text.length)
                doAfterTextChanged { query=it.toString(); updateResults() }
            }
            band.minimumHeight=dp(48);band.addView(field,lp(0,36,1f)); tool(band,R.drawable.dls_close,"清空搜索"){field.setText("")}
            body.addView(band,lp())
        } else {
            val top=header(title,if(nested) if(section=="folders" && tree) "返回上一级目录" else "返回列表" else null)
            if(section=="folders") tool(top,R.drawable.dls_refresh,"刷新音乐库",::startRefresh)
            tool(top,R.drawable.dls_search,"搜索") {
                searching=true; render()
                val field=body.findFocus() as? EditText ?: (body.getChildAt(0) as? LinearLayout)?.getChildAt(1) as? EditText
                field?.requestFocus(); field?.post { (host.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager).showSoftInput(field,InputMethodManager.SHOW_IMPLICIT) }
            }
            if(section=="folders") tool(top,R.drawable.dls_more,"更多") {
                menu("更多",listOf("作品库" to { go("works") },"手选音频文件夹" to { act("pickAudioFolder") }))
            }
            if(section=="playlists" && group.isEmpty()) tool(top,R.drawable.dls_add,"新建歌单"){editPlaylist(null)}
        }
        if(section=="folders" && !searching) {
            val modes = bar()
            val width = host.resources.configuration.screenWidthDp
            body.addView(modes, lp((width * .76f).toInt().coerceAtMost(440), -2).apply { gravity = Gravity.CENTER_HORIZONTAL })
            for ((value, name) in listOf(false to "平铺列表", true to "按目录浏览")) {
                val tab = column().apply { gravity = Gravity.CENTER; contentDescription = name; isSelected = tree == value }
                val text = label(name, 16, if (tree == value) ink else muted, tree == value).apply {
                    gravity = Gravity.CENTER; oneLine()
                }
                tab.addView(text, lp(-2, 43))
                val indicator = View(host).apply { setBackgroundColor(if (tree == value) ink else paper) }
                tab.addView(indicator, LinearLayout.LayoutParams(kotlin.math.ceil(text.paint.measureText(name)).toInt(), dp(2)))
                click(tab) {
                    if (tree != value) {
                        if (value && group.isNotEmpty()) {
                            val selected = catalog.folders[group]?.firstOrNull()
                            path = catalog.directories.values.firstOrNull { selected != null && it.tracks.contains(selected) }?.path.orEmpty()
                        }
                        tree = value; group = ""; host.saveBrowser(tree, path); render()
                    }
                }
                modes.addView(tab, lp(0, 48, 1f))
            }
            if (tree || group.isEmpty()) {
                val scroll = HorizontalScrollView(host).apply { isHorizontalScrollBarEnabled = false }
                val crumbs = bar().apply { setPadding(dp(16), 0, dp(16), 0) }
                if (tree) {
                    val chain = generateSequence(directory) { if (it.path.isEmpty()) null else catalog.directories[it.parent] }.toList().asReversed()
                    for ((i, node) in chain.withIndex()) {
                        if (i > 0) crumbs.addView(glyph(R.drawable.dls_right), lp(12, 12))
                        crumbs.addView(label(node.name, 12, if (node == directory) ink else muted).apply {
                            setPadding(dp(3), dp(5), dp(3), dp(5)); click(this) { navigate(node.path); render() }
                        }, lp(-2, 30))
                    }
                } else {
                    crumbs.addView(label("本地音乐", 12, muted))
                    crumbs.addView(glyph(R.drawable.dls_right), lp(22, 13))
                    crumbs.addView(label("文件夹", 12, muted))
                }
                scroll.addView(crumbs)
                body.addView(scroll, lp(-1, if (tree) 32 else 28)); divider(body)
                scroll.post { scroll.fullScroll(View.FOCUS_RIGHT) }
            }
        }
        if(!state.optBoolean("mediaPermission")) {
            textBlock(body,"允许访问音乐库后，可浏览设备中的音频。")
            body.addView(button("允许访问音乐库",{act("requestMedia")},true)); return@with
        }
        val rowItems=items()
        if(rowItems.isEmpty() && !searching) textBlock(body,when {
            state.text("sourceError").isNotEmpty() -> state.text("sourceError")
            state.optBoolean("libraryLoading") -> "正在读取音乐库…"
            else -> "这里还没有音轨"
        })
        val (_,adapter)=rows(rowItems,listKey())
        visibleRows=adapter
        if(searching) searchAdapter=adapter
    }
    private fun listKey() = "list/$section/$group/"+(if(tree) path else "")+"/"+searching
    fun updateResults() { searchAdapter?.replace(items()) }
    private fun items():List<NativeRow> = with(ui) {
        val list=mutableListOf<NativeRow>()
        val index=catalog
        val userList=selectedList
        var selection:List<JSONObject>?=null
        var entryIds:List<String> = emptyList()
        when {
            searching -> selection=if(query.isBlank()) emptyList() else index.search(query)
            section=="folders" && tree -> {
                val dir=index.nearest(path)
                for(child in dir.children.values.sortedWith(compareBy(naturalOrder){it.name})) list+=NativeRow(child.name,icon=R.drawable.dls_folder,meta="${child.total} 首",chevron=true){navigate(child.path);render()}
                if(dir.tracks.isNotEmpty()) selection=dir.tracks
            }
            section=="playlists" && group=="favorites" -> {
                val fav=state.optJSONArray("favorites").strings().toHashSet()
                selection=index.tracks.filter { it.text("id") in fav }
            }
            userList!=null -> {
                val ids=userList.optJSONArray("trackIds").strings()
                val entries=userList.optJSONArray("entryIds").strings()
                val found=ids.mapIndexedNotNull { i,id -> index.byId[id]?.let { it to entries.getOrNull(i).orEmpty() } }
                selection=found.map { it.first }; entryIds=found.map { it.second }
            }
            group.isNotEmpty() -> selection=when(section) { "artists"->index.artists[group]; "albums"->index.albums[group]; else ->index.folders[group] }.orEmpty()
            section=="playlists" -> {
                list += NativeRow("我的收藏", "${state.optJSONArray("favorites")?.length() ?: 0} 首",
                    icon=R.drawable.dls_heart, chevron=true) { enterGroup("favorites") }
                lists.forEach { playlist ->
                    val ids = playlist.optJSONArray("trackIds")
                    val first = ids?.optString(0)?.let(index.byId::get)
                    list += NativeRow(playlist.text("name"), "${ids?.length() ?: 0} 首", icon=R.drawable.dls_record_cover,
                        artwork=first, chevron=true) { enterGroup(playlist.text("id")) }
                }
            }
            else -> {
                val groups=when(section) {"artists"->index.artists;"albums"->index.albums;else->index.folders}
                fun title(key:String,track:JSONObject)=when(section) {"artists"->key;"albums"->track.text("album");else->track.text("folderName")}
                for((key,ts) in groups.entries.sortedWith(compareBy(naturalOrder){title(it.key,it.value.first())})) {
                    val first=ts.first()
                    val icon=when(section) {"artists"->R.drawable.dls_headphones;"albums"->R.drawable.dls_disc;else->R.drawable.dls_folder}
                    val album = section == "albums"
                    list += NativeRow(title(key,first), if (album) first.text("albumArtist").ifEmpty { first.text("folderName").ifEmpty { first.text("artist") } } + " · " + ts.size + " 首" else "",
                        icon, meta = if (album) "" else "${ts.size} 首", chevron = true, artwork = if (album) first else null) { enterGroup(key) }
                }
            }
        }
        selection?.let { raw ->
            val manual=userList!=null && !searching
            val ordered=if(manual) raw else index.sort(raw,prefs.text("librarySort","default"))
            val title=if(!searching && section=="folders" && tree) "播放本层" else "播放全部"
            if(ordered.isNotEmpty() || manual) {
                val extra: (() ->Unit)?=when { manual -> {{editPlaylist(userList)}}; ordered.size>1 -> {{sort()}}; else -> null }
                list+=NativeRow("$title · ${ordered.size} 首",icon=R.drawable.dls_play,
                    extraIcon=if(manual) R.drawable.dls_edit else R.drawable.dls_sort,extraLabel=if(manual) "编辑歌单" else "曲目排序",extra=extra){play(ordered)}
            }
            val now=current?.text("id")
            ordered.forEachIndexed { i,t ->
                val titleText=t.text("title")
                list+=NativeRow(titleText,t.text("artist")+" · "+clock(t.optLong("duration")),if(now==t.text("id")) R.drawable.dls_volume else 0,
                    number=i+1,extraIcon=R.drawable.dls_horizontal_more,extraLabel="更多操作："+titleText,active=now==t.text("id"),
                    trackId=t.text("id"),extra={trackMenu(t,ordered,i,if(manual) userList else null,entryIds.getOrNull(i))}){play(ordered,i)}
            }
        }
        list
    }
    private fun sort() = with(ui) {
        val keys=mutableListOf("default"); val titles=mutableListOf("默认顺序")
        for((key,label) in listOf("title" to "曲名","artist" to "音乐人","album" to "专辑","duration" to "时长"))
            for((way,direction) in listOf("asc" to "升序","desc" to "降序")) { keys+="$key-$way"; titles+="$label · $direction" }
        choose("曲目排序",titles,keys.indexOf(prefs.text("librarySort","default"))){pref("librarySort",keys[it])}
    }
    private fun editPlaylist(playlist:JSONObject?) = with(ui) {
        fun rename()=input(if(playlist==null) "创建歌单" else "重命名歌单",playlist?.text("name").orEmpty()) { name ->
            if(name.length>60 || lists.any { it.text("name")==name && it.text("id")!=playlist?.text("id") }) {
                host.error("名称过长或歌单已存在"); false
            } else { act("playlist","operation" to if(playlist==null) "create" else "rename","name" to name,"id" to playlist?.text("id"));true }
        }
        if(playlist==null) rename() else menu("编辑歌单",listOf("重命名歌单" to {rename()},"删除歌单" to {
            confirm("删除歌单","删除「"+playlist.text("name")+"」及其中的歌单记录？音频文件会保留。"){
                host.action("playlist",json("operation" to "delete","id" to playlist.text("id"))){group="";render()}
            }
        }))
    }
    fun addToPlaylist(t:JSONObject) = with(ui) {
        if(lists.isEmpty()) { input("创建歌单",""){ name ->
            if(name.length>60) false else { host.action("playlist",json("operation" to "create","name" to name)){host.error("歌单已创建，请选择歌单加入")};true }
        };return@with }
        menu("加入歌单",lists.map { l -> l.text("name") to { act("playlist","operation" to "add","id" to l.text("id"),"trackId" to t.text("id")) } })
    }
    fun favoriteTitle(t:JSONObject)=if(t.text("id") in ui.state.optJSONArray("favorites").strings()) "取消收藏" else "收藏音轨"
    private fun trackMenu(t:JSONObject,order:List<JSONObject>,i:Int,userList:JSONObject?,entry:String?)=with(ui) {
        val options=mutableListOf<Pair<String,()->Unit>>("立即播放" to {play(order,i)},"下一首播放" to {host.appendTrack(t.getLong("id"),true)},
            "加入播放队列" to {host.appendTrack(t.getLong("id"),false)},favoriteTitle(t) to {act("favorite","id" to t.text("id"))},"加入歌单" to {addToPlaylist(t)})
        if(userList!=null && entry!=null) options+="从当前歌单移除" to {act("playlist","operation" to "remove","id" to userList.text("id"),"entryId" to entry)}
        menu(t.text("title"),options)
    }
    fun external()=with(ui) {
        val top=bar()
        tool(top,R.drawable.dls_back,if(state.optBoolean("folderCanGoUp")) "返回上一级目录" else "返回曲库"){if(!back()) host.finish()}
        top.addView(label(state.text("folderLabel","音频文件夹"),18,bold=true)); body.addView(top,lp())
        if(state.optBoolean("folderBusy")) textBlock(body,"正在读取文件夹…")
        val entries=state.optJSONArray("folderFiles").objects()
        rows(entries.map { f ->
            val dir=f.optBoolean("directory")
            NativeRow(f.text("name"),icon=if(dir) R.drawable.dls_folder else R.drawable.dls_headphones,chevron=dir){
                host.action("folderOpen",json("uri" to f.text("uri"))){ if(!dir) openPlayer("lyrics") }
            }
        },"external/"+state.text("folderLabel"))
    }
    private fun queueRow(index:Int, entry:NativeQueueEntry):NativeRow = with(ui) {
        val t=entry.audio;val selected=entry.itemId==transport.itemId
        NativeRow(t.title,t.artist,if(selected) R.drawable.dls_volume else 0,
            extraIcon=R.drawable.dls_close,extraLabel="从队列移除 "+t.title,active=selected,
            number=index+1,identity=entry.itemId,extra={host.removeQueueItem(entry.itemId.toLong())}){host.jumpTo(entry.itemId.toLong())}
    }
    fun showQueue()=with(ui) {
        queueItems=transport.entries.toMutableList()
        val top = header("播放队列", "关闭播放队列")
        queueTitle = top.getChildAt(0) as? TextView
        queueTitle?.contentDescription = "播放队列，${queueItems.size} 首音轨"
        body.addView(label("长按曲目可拖动排序", 12, muted).apply { setPadding(dp(2), dp(10), 0, dp(4)) })
        val (rv, adapter) = rows(queueItems.mapIndexed(::queueRow), "queue")
        rv.layoutParams = lp(-1, ((queueItems.size.coerceIn(1,10)) * 58).coerceAtMost((host.resources.configuration.screenHeightDp * .53f).toInt()))
        val clear = button("清空播放队列", {
            if (queueItems.isNotEmpty()) confirm("清空播放队列", "清空当前队列中的 ${queueItems.size} 首音轨？") { host.clearQueue() }
        }).apply { setTextColor(color(if (dark) "#f59199" else "#bf303b")) }
        body.addView(clear, lp(-2,-2).apply { topMargin = dp(12) })
        queueAdapter=adapter
        var source:String?=null;var target:String?=null
        ItemTouchHelper(object:ItemTouchHelper.SimpleCallback(ItemTouchHelper.UP or ItemTouchHelper.DOWN,0) {
            override fun onMove(rv:RecyclerView,from:RecyclerView.ViewHolder,to:RecyclerView.ViewHolder):Boolean {
                val a=from.bindingAdapterPosition; val b=to.bindingAdapterPosition
                if(a !in queueItems.indices || b !in queueItems.indices || a==b) return false
                dragActive=true;source=queueItems[a].itemId; target=queueItems[b].itemId
                val value=queueItems.removeAt(a); queueItems.add(b,value); adapter.move(a,b)
                return true
            }
            override fun onSwiped(holder:RecyclerView.ViewHolder,direction:Int) {}
            override fun clearView(rv:RecyclerView,holder:RecyclerView.ViewHolder) {
                super.clearView(rv,holder)
                dragActive=false
                if(source!=null && target!=null) host.moveQueueItem(source!!.toLong(),target!!.toLong())
                source=null;target=null
            }
        }).attachToRecyclerView(rv)
    }
}
