package com.github.anrimian.musicplayer.ui.v12

import android.content.res.ColorStateList
import android.graphics.Bitmap
import android.os.Bundle
import android.util.LruCache
import android.view.Gravity
import android.view.View
import android.widget.*
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.github.anrimian.musicplayer.R
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject

internal data class NativePage(val name:String,val key:String="")
internal class NativePlayerScreen(host:PlayerV12Activity,val root:LinearLayout,saved:Bundle?) : NativeWidgets(host) {
    val state get()=host.state
    val prefs get()=state.optJSONObject("prefs") ?: JSONObject()
    val transport get()=host.transport
    val current get()=transport.current?.metadata
    val external get()=host.isExternal
    val folderPlayer get()=host.isFolderPlayer
    val catalog get()=host.catalog
    val library=NativeLibrary(this,saved)
    val player=NativePlayback(this,saved)
    val settings=NativeSettings(this)
    val study=NativeStudy(this,saved)
    val works=NativeWorks(this,saved)
    private val pages=mutableListOf<NativePage>()
    val route get()=pages.last()
    private val positions=mutableMapOf<String,Pair<Int,Int>>()
    private var list:RecyclerView?=null
    private var positionKey=""
    lateinit var body:LinearLayout
    private var sheet: android.app.Dialog? = null
    private var sheetTitle: TextView? = null
    private val sheetRoutes = setOf("queue", "practice", "track", "display")
    private var pending=false
    private var disposed=false
    private val renderTask=Runnable { pending=false; if(!disposed) render() }
    private var miniToggle:ImageButton?=null
    private var miniProgress:ProgressBar?=null
    private val covers=object:LruCache<String,Bitmap>(8*1024*1024){ override fun sizeOf(key:String,value:Bitmap)=value.byteCount }
    private val missing=mutableSetOf<String>()
    init {
        val names=saved?.getStringArrayList("native.names").orEmpty()
        val keys=saved?.getStringArrayList("native.keys").orEmpty()
        names.forEachIndexed { i,n -> pages+=NativePage(n,keys.getOrElse(i){""}) }
        if(pages.isEmpty()) {
            pages+=NativePage(if(folderPlayer) "external" else if(external) "player" else "library")
            if(host.restoresExternal) pages+=NativePage("player")
        }
        saved?.getBundle("native.scroll")?.let { values -> for(key in values.keySet()) values.getIntArray(key)?.let { positions[key]=it[0] to it[1] } }
    }
    fun save(out:Bundle) {
        rememberList()
        out.putStringArrayList("native.names",ArrayList(pages.map { it.name }))
        out.putStringArrayList("native.keys",ArrayList(pages.map { it.key }))
        out.putBundle("native.scroll",Bundle().apply { positions.forEach { (key,pos)->putIntArray(key,intArrayOf(pos.first,pos.second)) } })
        library.save(out); player.save(out); study.save(out); works.save(out)
    }
    fun act(name:String,vararg data:Pair<String,Any?>) = host.action(name,json(*data))
    fun pref(key:String,value:Any) = act("pref","key" to key,"value" to value)
    fun go(name:String,key:String="") {
        val page=NativePage(name,key)
        if(route!=page) { pages+=page; render() }
    }
    fun back():Boolean {
        if(pages.size>1) { pages.removeAt(pages.lastIndex); render(); return true }
        if(route.name=="external" && state.optBoolean("folderCanGoUp")) { act("folderUp"); return true }
        return route.name=="library" && library.back()
    }
    fun openPlayer(tab: String = "cover") {
        val tabChanged = player.tab != tab
        player.tab = tab
        if (route.name != "player") go("player") else if (tabChanged) schedule()
    }
    fun play(tracks:List<JSONObject>,index:Int=0,at:Long?=null) {
        if(index !in tracks.indices) return
        host.playTracks(tracks.map { it.getLong("id") },index,at){openPlayer()}
    }
    private var miniTitle:TextView?=null
    private var miniArtist:TextView?=null
    private var miniCover:ImageView?=null
    private var miniOpen:View?=null
    fun transportTick() { if(!disposed) { player.tick(); study.tick(); updateMini() } }
    fun queueChanged(changedTrack:Boolean) {
        if(disposed) return
        if(route.name=="queue") { library.updateQueue(); return }
        if(route.name=="library") library.updateActive()
        if(changedTrack && route.name in setOf("player","track","practice")) schedule()
        val track=transport.current
        val canMini=route.name !in setOf("player","queue","practice") && (!external || route.name=="external")
        if(canMini && (track!=null)!=(miniOpen!=null)) { schedule();return }
        if(changedTrack && canMini && track!=null) {
            miniTitle?.text=track.title;miniArtist?.text=track.artist;miniOpen?.contentDescription=track.title+"，"+track.artist
            miniCover?.let { cover(it,track.metadata,96) }
        }
        transportTick()
    }
    fun changed(keys:Set<String>) {
        if(disposed) return
        if("browserRevision" in keys) library.restoreBrowser()
        if(keys.any { it in setOf("time","duration","playing","listenRange","sleep") }) {
            player.tick(); study.tick(); updateMini()
        }
        val structural=keys-anyClock
        if (structural.isEmpty()) return
        val chrome = structural.any { it in setOf("prefs", "systemDark", "fontScale") }
        if (!chrome) when (route.name) {
            "queue" -> return
            "player" -> if (structural.none { it in playerFields }) return
            "library" -> {
                if (library.section == "me") {
                    if (structural.none { it in setOf("studyRevision", "appVersion") }) return
                } else {
                    if (structural.none { it in libraryFields }) return
                    if (library.searching && "browserRevision" !in structural) {
                        library.updateResults()
                        return
                    }
                }
            }
            "external" -> if (structural.none { it.startsWith("folder") || it == "incomingError" }) return
        }
        schedule()
    }
    fun schedule() { if(!pending && !disposed) { pending=true; root.post(renderTask) } }
    fun dispose() { disposed=true; dismissSheet(); root.removeCallbacks(renderTask); covers.evictAll() }
    private fun rememberList() {
        val manager=list?.layoutManager as? LinearLayoutManager ?: return
        val first=manager.findFirstVisibleItemPosition()
        if(first>=0 && positionKey.isNotEmpty()) positions[positionKey]=first to (manager.findViewByPosition(first)?.top ?: 0)
    }
    fun render() {
        if(disposed) return
        root.removeCallbacks(renderTask); pending=false
        if (route.name in sheetRoutes && pages.size > 1) {
            renderSheet()
            return
        }
        dismissSheet()
        rememberList(); list=null; player.clearViews(); study.clearViews(); miniProgress=null; miniToggle=null; miniTitle=null;miniArtist=null;miniCover=null;miniOpen=null;library.clearViews()
        root.removeAllViews(); root.setBackgroundColor(paper)
        body=column(); root.addView(body,lp(-1,0,1f))
        when(route.name) {
            "library" -> library.show()
            "external" -> library.external()
            "player" -> player.show()
            "queue" -> library.showQueue()
            "works","work" -> works.show()
            "practice","marks" -> study.show()
            else -> settings.show(route.name)
        }
        if(route.name !in setOf("player","queue","practice") && !external && current!=null) mini()
        if(route.name=="external" && current!=null) mini()
        if(!external && (route.name=="library" || route.name in profilePages)) navigation()
    }
    private fun dismissSheet() {
        sheet?.apply { setOnDismissListener(null); dismiss() }
        sheet = null
        sheetTitle = null
    }

    private fun renderSheet() {
        val page = route
        if (root.childCount == 0) {
            pages.removeAt(pages.lastIndex)
            render()
            pages.add(page)
        }
        rememberList()
        list = null
        val panel = sheetPanel()
        val dialog = sheet ?: sheetDialog(panel).also { sheet = it }
        if (dialog.isShowing) setSheetContent(dialog, panel)
        body = panel
        when (page.name) {
            "queue" -> library.showQueue()
            "practice" -> study.show()
            else -> settings.show(page.name)
        }
        dialog.setOnDismissListener {
            if (!disposed && sheet === dialog && route == page) {
                sheet = null
                back()
            }
        }
        if (!dialog.isShowing) dialog.show()
    }

    fun header(title: String, backLabel: String? = null): LinearLayout {
        if (route.name in sheetRoutes && sheet != null) {
            sheetTitle = sheetHeading(body, title, backLabel ?: "关闭面板") { back() }
            return sheetTitle!!.parent as LinearLayout
        }
        val top = bar().apply { minimumHeight = dp(48); setPadding(dp(8), 0, dp(8), 0) }
        if (backLabel != null) top.addView(icon(R.drawable.dls_back, backLabel) { if (!back()) host.finish() }, lp(44, 46))
        top.addView(label(title, if (backLabel == null) 19 else 17, bold = true).apply {
            typeface = android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD)
            oneLine(); setPadding(dp(if (backLabel == null) 8 else 0), 0, 0, 0)
        }, lp(0, -2, 1f))
        body.addView(top, lp())
        return top
    }
    fun tool(top:LinearLayout,id:Int,title:String,click:()->Unit) { top.addView(icon(id,title,click),lp(44,46)) }
    fun textBlock(parent:LinearLayout,text:String,size:Int=14) {
        parent.addView(label(text,size,muted).apply { setPadding(dp(16),dp(10),dp(16),dp(10)) },lp())
    }
    fun scrolling():LinearLayout {
        val view=ScrollView(host).apply { isFillViewport=false }
        body.addView(view,lp(-1,0,1f)); val content=column(); view.addView(content); return content
    }
    fun rows(items:List<NativeRow>,key:String=route.name+route.key):Pair<RecyclerView,NativeRows> {
        val rv=RecyclerView(host); val adapter=NativeRows(this); val lm=LinearLayoutManager(host)
        rv.layoutManager=lm; rv.adapter=adapter; rv.itemAnimator=null; adapter.replace(items)
        val inset = if (route.name in sheetRoutes) 2 else 16
        rv.setPadding(dp(inset), if (key.startsWith("profile/")) dp(8) else 0, dp(inset), 0)
        rv.clipToPadding = false
        body.addView(rv,lp(-1,0,1f)); list=rv; positionKey=key
        positions[key]?.let { lm.scrollToPositionWithOffset(it.first,it.second) }
        return rv to adapter
    }
    fun resetPosition(key:String) { positions.remove(key); if(positionKey==key) list=null }
    fun cover(view:ImageView,track:JSONObject,size:Int) {
        val key=track.text("id")+":"+track.text("coverRevision")+":"+size
        view.tag=key
        view.background = shape(secondary, if (size > 200) 8 else 5)
        view.clipToOutline = true
        view.setImageResource(R.drawable.dls_record_cover)
        view.scaleType=ImageView.ScaleType.CENTER_CROP
        view.contentDescription=null
        covers.get(key)?.let { view.setImageBitmap(it); return }
        if(key in missing) return
        host.lifecycleScope.launch {
            val bitmap=host.artwork(track,size)
            if(bitmap!=null) { covers.put(key,bitmap); if(view.tag==key) view.setImageBitmap(bitmap) }
            else missing+=key
        }
    }
    private fun mini() {
        val t=current ?: return
        miniProgress=ProgressBar(host,null,android.R.attr.progressBarStyleHorizontal).apply {
            max=1000; progressTintList=ColorStateList.valueOf(green)
            progressBackgroundTintList=ColorStateList.valueOf(line); root.addView(this,lp(-1,2))
        }
        val band=bar().apply { setPadding(dp(16),0,dp(8),0) }
        val content=bar()
        val image=ImageView(host); miniCover=image;miniOpen=content; cover(image,t,96); content.addView(image,lp(34,34))
        val copy=column().apply { setPadding(dp(10),0,0,0); addView(label(t.text("title"),13,bold=true).apply { oneLine();miniTitle=this })
            addView(label(t.text("artist"),11,muted).apply { oneLine();setPadding(0,dp(2),0,0);miniArtist=this }) }
        content.addView(copy,lp(0,-2,1f)); content.contentDescription=t.text("title")+"，"+t.text("artist")
        click(content){openPlayer(if(external) "lyrics" else "cover")}; band.addView(content,lp(0,54,1f))
        miniToggle=icon(R.drawable.dls_play,"播放"){host.togglePlayback()}.also { band.addView(it,lp(44,46)) }
        if(folderPlayer) tool(band,R.drawable.dls_next,"下一首"){host.skipTrack(false)}
        else tool(band,R.drawable.dls_queue,"打开播放队列"){go("queue")}
        root.addView(band,lp()); updateMini()
    }
    private var lastMiniPlaying:Boolean?=null
    private fun updateMini() {
        val playing=transport.playing
        miniToggle?.let {
            if(lastMiniPlaying!=playing || it.tag==null) {
                it.setImageResource(if(playing) R.drawable.dls_pause else R.drawable.dls_play)
                it.contentDescription=if(playing) "暂停" else "播放"; it.tag=playing; lastMiniPlaying=playing
            }
        }
        miniProgress?.progress=((transport.position*1000)/transport.duration.coerceAtLeast(1)).toInt()
    }
    fun selectSection(id:String) {
        pages.clear(); pages+=NativePage("library")
        library.select(id); render()
    }
    private fun navigation() {
        divider(root)
        val nav=bar()
        for((id,title,symbol) in sections) {
            val selected=library.section==id
            val tab=column().apply { gravity=Gravity.CENTER; contentDescription=title; isSelected=selected }
            val image=ImageView(host).apply { setImageResource(symbol); imageTintList=ColorStateList.valueOf(if(selected) green else muted) }
            tab.addView(image,lp(21,21)); tab.addView(label(title,11,if(selected) green else muted).apply { gravity=Gravity.CENTER; setPadding(0,dp(2),0,0) })
            click(tab){ selectSection(id) }; nav.addView(tab,lp(0,50,1f))
        }
        root.addView(nav,lp())
    }
    companion object {
        val sections=listOf(Triple("folders","文件夹",R.drawable.dls_folder),Triple("albums","专辑",R.drawable.dls_disc),
            Triple("artists","音乐人",R.drawable.dls_headphones),Triple("playlists","歌单",R.drawable.dls_queue),
            Triple("me","我的",R.drawable.dls_person))
        private val profilePages=setOf("settings","about","playback","subtitles","appearance","files","marks","licenses","notices","license")
        private val playerFields = setOf("cues", "subtitleStatus", "subtitleName", "subtitleError", "readingBusy", "readingFailed", "offset", "incomingError")
        private val libraryFields = setOf("tracks", "playlists", "favorites", "mediaPermission", "libraryLoading", "sourceError", "browserRevision")
        private val anyClock=setOf("time","duration","playing","loading","sleep","listenRange")
    }
}
