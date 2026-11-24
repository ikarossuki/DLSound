package com.github.anrimian.musicplayer.ui.v12

import android.content.res.ColorStateList
import android.view.Gravity
import android.widget.*
import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.ui.learning.ReadingPiece
import com.google.android.material.dialog.MaterialAlertDialogBuilder

internal class NativeSettings(private val ui:NativePlayerScreen) {
    private val languages=linkedMapOf("ja" to "日文","zh" to "中文","both" to "日中双语")
    private val themes=linkedMapOf("system" to "跟随系统","light" to "浅色","dark" to "深色")
    private var checking=false
    private var updateMessage=""
    private var available=false
    private val licenses=mapOf("gpl" to ("GNU GPL v3" to "GPL-3.0.txt"),"kuromoji" to ("Kuromoji 许可证" to "kuromoji-LICENSE.md"),
        "ipadic" to ("IPADIC 词典声明" to "kuromoji-NOTICE.md"))
    fun languageName()=languages[ui.prefs.text("language")] ?: "日文"
    fun speedLabel()=ui.prefs.optDouble("speed",1.0).toString().removeSuffix(".0")+"×"
    fun orderName()=if(ui.prefs.optBoolean("shuffle")) "随机播放" else when(ui.prefs.text("repeat")) { "one"->"单曲循环";"all"->"列表循环";else->"顺序播放" }
    private fun sleepLabel():String {
        val sleep=ui.state.optJSONObject("sleep") ?: return "关闭"
        return when(sleep.text("mode")) { "timer"->"${sleep.optLong("minutes")} 分钟";"end"->"本首结束";else->"关闭" }
    }
    fun speed()=with(ui) {
        val values=listOf(.5,.75,1.0,1.25,1.5,2.0)
        choose("播放速度",values.map { it.toString().removeSuffix(".0")+"×" },values.indexOf(prefs.optDouble("speed",1.0))){pref("speed",values[it])}
    }
    fun order()=with(ui) {
        val labels=listOf("顺序播放","列表循环","单曲循环","随机播放")
        choose("播放顺序",labels,labels.indexOf(orderName())) { i->pref("repeat",listOf("off","all","one","all")[i]);pref("shuffle",i==3) }
    }
    fun sleep()=with(ui) {
        val values=listOf("关闭","15 分钟","30 分钟","60 分钟","本首结束")
        choose("睡眠定时",values,values.indexOf(sleepLabel())){ i ->
            when(i) {0->act("sleep","mode" to "off");4->act("sleep","mode" to "end");else->act("sleep","mode" to "timer","minutes" to listOf(15,30,60)[i-1])}
        }
    }
    private fun offset()=with(ui) {
        val key=state.text("offsetKey"); if(key.isEmpty()){host.error("当前音轨没有可校准的字幕");return@with}
        val panel=column().apply { setPadding(dp(18),dp(12),dp(18),dp(10)) }
        val value=label("",16).apply {gravity=Gravity.CENTER};panel.addView(value)
        val slider=SeekBar(host.dialogContext()).apply {max=100;progress=((state.optLong("offset")+5000)/100).toInt();contentDescription="字幕偏移"}
        fun display(){value.text="${slider.progress*100-5000} ms"}
        display();slider.setOnSeekBarChangeListener(object:SeekBar.OnSeekBarChangeListener{
            override fun onStartTrackingTouch(s:SeekBar){};override fun onStopTrackingTouch(s:SeekBar){host.setSubtitleOffset(key,(s.progress*100-5000).toLong())}
            override fun onProgressChanged(s:SeekBar,v:Int,user:Boolean){display()}
        });panel.addView(slider,lp(-1,48));textBlock(panel,"正值让本曲字幕晚出现，负值让字幕提前。")
        MaterialAlertDialogBuilder(host.dialogContext()).setTitle("字幕偏移").setView(panel).setPositiveButton("完成",null)
            .setNeutralButton("重置为 0 ms"){_,_->host.setSubtitleOffset(key,0)}.show()
    }
    fun show(page:String)=with(ui) {
        val titles=mapOf("me" to "我的","settings" to "设置","playback" to "播放","display" to "字幕显示","subtitles" to "字幕与读音",
            "appearance" to "外观","files" to "文件与曲库","track" to "本曲字幕","about" to "关于 DL Sound","licenses" to "开源许可","notices" to "第三方声明")
        val title=if(page=="license") licenses[route.key]?.first.orEmpty() else titles[page].orEmpty()
        header(title,if(page=="me") null else "返回上一页")
        val theme=themes[prefs.text("theme")] ?: "跟随系统"
        fun row(name:String,detail:String="",meta:String="",icon:Int=0,run:()->Unit)=
            NativeRow(name,detail,icon,meta,profile=true,titleLines=if(page=="track") 2 else 1,open=run)
        val items=mutableListOf<NativeRow>()
        when(page) {
            "me" -> {
                val identity = bar().apply { setPadding(dp(16),dp(24),dp(16),dp(18)) }
                val avatar = FrameLayout(host).apply {
                    background = shape(secondary, 29)
                    addView(glyph(R.drawable.dls_person), FrameLayout.LayoutParams(dp(26),dp(26),Gravity.CENTER))
                }
                identity.addView(avatar, lp(58,58))
                val names = column().apply {
                    setPadding(dp(14),0,0,0); addView(label("本地用户",20,bold=true))
                    addView(label("偏好保存在此设备",12,muted))
                }
                identity.addView(names); body.addView(identity)

                items+=row("我的书签","回听已保存的时间点和片段",icon=R.drawable.dls_book){go("marks")}
                items+=row("设置","播放、字幕与文件访问",icon=R.drawable.dls_sliders){go("settings")}
                items+=row("关于 DL Sound","版本、更新与开源许可",icon=R.drawable.dls_info){go("about")}
            }
            "settings" -> {
                items+=row("播放","均衡器、速度、顺序与睡眠定时",speedLabel(),R.drawable.dls_volume){go("playback")}
                items+=row("字幕与读音","语言、假名与字幕样式",languageName(),R.drawable.dls_languages){go("subtitles")}
                items+=row("外观",meta=theme,icon=R.drawable.dls_appearance){go("appearance")}
                items+=row("文件与曲库","媒体权限、字幕目录与备份",icon=R.drawable.dls_folder){go("files")}
            }
            "playback" -> {
                items+=row("均衡器",icon=R.drawable.dls_sliders){act("equalizer")}
                items+=row("播放速度",meta=speedLabel(),icon=R.drawable.dls_clock){speed()}
                items+=row("播放顺序",meta=orderName(),icon=R.drawable.dls_repeat){order()}
                items+=row("睡眠定时",meta=sleepLabel(),icon=R.drawable.dls_clock){sleep()}
            }
            "appearance" -> items+=row("主题",meta=theme){choose("主题",themes.values.toList(),themes.keys.indexOf(prefs.text("theme"))){pref("theme",themes.keys.elementAt(it))}}
            "subtitles","display" -> {
                val preview=column().apply { gravity=Gravity.CENTER;setPadding(dp(12),dp(16),dp(12),dp(12)) }
                if(prefs.text("language")!="zh") preview.addView(label("",prefs.optInt("font",23)).apply {
                    includeFontPadding=true
                    text=rubyText(listOf(ReadingPiece("明日",0,"あした"),ReadingPiece("、また。",2)),prefs.optBoolean("ruby",true),prefs.optDouble("rubyScale",.42).toFloat())
                })
                if(prefs.text("language")!="ja") preview.addView(label("明天见。",16,muted))
                body.addView(preview,lp())
                items+=row("字幕语言",meta=languageName()){choose("字幕语言",languages.values.toList(),languages.keys.indexOf(prefs.text("language"))){pref("language",languages.keys.elementAt(it))}}
                val ruby=prefs.optBoolean("ruby",true)
                items+=row("显示读音",meta=if(ruby) "开启" else "关闭"){pref("ruby",!ruby)}
                val font=prefs.optInt("font",23)
                items+=row("字幕字号",meta="$font sp"){val opts=listOf(16,18,20,23,24,28,32,40); choose("字幕字号",opts.map { "$it sp" },opts.indexOf(font)){pref("font",opts[it])}}
                val scale=prefs.optDouble("rubyScale",.42)
                items+=row("读音大小",meta="${Math.round(scale*100)}%"){val opts=listOf(.34,.42,.55);choose("读音大小",listOf("小","标准","大"),opts.indexOfFirst { kotlin.math.abs(it-scale)<.01 }){pref("rubyScale",opts[it])}}
                val depth=prefs.optBoolean("depth",true)
                items+=row("立体歌词",meta=if(depth) "开启" else "关闭"){pref("depth",!depth)}
            }
            "track" -> {
                val t=current
                if(t==null){textBlock(body,"请先打开音轨");return@with}
                textBlock(body,t.text("title"),18)
                if (host.ownsSubtitle(t.text("id")) && host.learning.document?.cues?.any {
                    it.kind == com.github.anrimian.musicplayer.ui.learning.CueKind.DIALOGUE
                } == true) items += row("查找台词", icon=R.drawable.dls_search) { dialogueSearch.open() }
                items+=row("分别选择日文和中文字幕",icon=R.drawable.dls_folder){host.selectPair()}
                if(state.optBoolean("pairRule")) items+=row("取消本目录双字幕规则"){host.clearSubtitleRule()}
                items+=row("导入字幕",icon=R.drawable.dls_book){host.selectSubtitle()}
                val source = state.text("subtitleName").ifBlank { state.text("subtitleStatus") }
                if (state.optBoolean("manual")) {
                    items += row("恢复自动匹配", source) { host.automaticSubtitles() }
                } else {
                    items += row("字幕来源", source) { host.error(state.text("subtitleStatus")) }
                }
                items+=row("个人读音","修正当前句"){host.correctReading(state.text("offsetKey"))}
                items+=row("字幕偏移",meta="${state.optLong("offset")} ms"){offset()}
            }
            "files" -> {
                items+=row("音乐库访问","读取设备中的音频",if(state.optBoolean("mediaPermission")) "已允许" else "未授权"){act("requestMedia")}
                if(state.optBoolean("videoOptional")) items+=row("视频容器音频","浏览 MP4 等视频文件中的音频",if(state.optBoolean("videoGranted")) "已允许" else "未授权"){act("requestVideo")}
                items+=row("字幕目录","匹配同目录的字幕",if(state.optBoolean("treeGranted")) "已选择" else "选择目录"){act("requestTree")}
                items+=row("导出备份","续听、书签、作品资料、歌单、收藏、偏好与字幕修正"){act("exportBackup")}
                items+=row("恢复备份","先放好音频，再选择备份文件"){act("importBackup")}
            }
            "about" -> {
                textBlock(body,"DL Sound  "+state.text("appVersion"),21)
                textBlock(body,state.text("buildKind")+" · "+state.text("buildCode"))
                items+=row("检查更新",updateMessage,icon=R.drawable.dls_info){
                    if(!checking) {
                        checking=true;updateMessage="正在检查更新…";schedule()
                        host.action("checkUpdate",onComplete={checking=false;if(updateMessage=="正在检查更新…") updateMessage="未能连接，请稍后重试";schedule()}) { result ->
                            updateMessage=result?.text("message").orEmpty();available=result?.optBoolean("available")==true
                        }
                    }
                }
                if(available) items+=row("前往 GitHub 下载"){act("openRelease")}
                items+=row("开源许可"){go("licenses")};items+=row("第三方声明"){go("notices")}
            }
            "licenses" -> {items+=row("DL Sound 与上游播放器","GNU GPL v3"){go("license","gpl")};items+=row("Kuromoji","Apache License 2.0"){go("license","kuromoji")}}
            "notices" -> items+=row("IPADIC 词典","词典数据与声明"){go("license","ipadic")}
            "license" -> {
                val file=licenses[route.key]?.second ?: return@with
                textBlock(scrolling(),host.assets.open("himitsu/licenses/$file").bufferedReader().use { it.readText() });return@with
            }
        }
        rows(items,"profile/"+page)
    }
}
