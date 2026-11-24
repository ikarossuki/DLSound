package com.github.anrimian.musicplayer.ui.v12

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import org.json.JSONObject
import java.io.ByteArrayOutputStream
import java.io.File

/** Imports the previous app origin once, without starting a browser or modifying its database. */
internal object LegacyUiPreferences {
    @Synchronized fun migrate(context:Context,study:StudyRecords):Boolean {
        val prefs=context.getSharedPreferences("dlsound-player",Context.MODE_PRIVATE)
        if(prefs.getBoolean("native-ui-import-2",false)) return false
        val repairOnly = prefs.getBoolean("native-ui-import-1",false)
        val directory=File(context.applicationInfo.dataDir,"app_webview/Default/Local Storage")
        val values=linkedMapOf<String,String>()
        val sqlite=File(directory,"https_app.dlsound.local_0.localstorage")
        if(sqlite.isFile) SQLiteDatabase.openDatabase(sqlite.path,null,SQLiteDatabase.OPEN_READONLY or SQLiteDatabase.NO_LOCALIZED_COLLATORS).use { db ->
            db.rawQuery("SELECT key, value FROM ItemTable",null).use { c ->
                while(c.moveToNext()) if(accepts(c.getString(0))) {
                    val value=if(c.getType(1)==android.database.Cursor.FIELD_TYPE_BLOB) c.getBlob(1).toString(Charsets.UTF_16LE) else c.getString(1)
                    values[c.getString(0)]=value
                }
            }
        }
        val level=File(directory,"leveldb")
        if(File(level,"CURRENT").isFile) {
            LegacyLevelTable.read(level).forEach { (key,value) -> if(value==null) values.remove(key) else values[key]=value }
        }
        var changed=false
        // Read explicit works before bookmarks, which can infer work titles from their directory.
        for (collection in if (repairOnly) listOf("works") else listOf("works", "bookmarks")) {
            val prefix = "dlsound/$collection/"
            for ((key, value) in values) {
                if (!key.startsWith(prefix)) continue
                val id = key.removePrefix(prefix)
                try {
                    val row = JSONObject(value)
                    if (row.optString("key") == id && study.importLegacy(collection, id, row, repairOnly)) changed = true
                } catch (_: org.json.JSONException) {
                    continue
                } catch (_: IllegalArgumentException) {
                    continue
                }
            }
        }
        val editor=prefs.edit()
        if(!repairOnly && !prefs.contains("folderBrowser") && (values.containsKey("folder-view") || values.containsKey("folder-directory"))) {
            editor.putString("folderBrowser",json("tree" to (values["folder-view"]=="tree"),"path" to values["folder-directory"].orEmpty()).toString())
            changed=true
        }
        check(editor.putBoolean("native-ui-import-1",true).putBoolean("native-ui-import-2",true).commit())
        return changed
    }
    fun accepts(key:String)= key=="folder-view" || key=="folder-directory" ||
        key.startsWith("dlsound/bookmarks/") || key.startsWith("dlsound/works/")
}

/** Read-only subset of the LevelDB file format used by Chromium DOM Storage. CURRENT determines live tables;
 * sequence numbers and tombstones decide which version of each key to import after compaction. */
internal object LegacyLevelTable {
    private const val LIMIT=64*1024*1024
    private val origin="_https://app.dlsound.local\u0000".toByteArray()
    private class Cursor(val b:ByteArray,var pos:Int=0,val end:Int=b.size) {
        fun byte():Int { require(pos<end);return b[pos++].toInt() and 255 }
        fun little(count:Int):Long { var n=0L;repeat(count){i->n=n or (byte().toLong() shl (8*i))};return n }
        fun variable():Long { var v=0L;for(i in 0..9){val n=byte();v=v or ((n and 127).toLong() shl (i*7));if(n<128)return v};error("Invalid variable integer") }
        fun size():Int=variable().also {require(it in 0..LIMIT.toLong())}.toInt()
        fun bytes(len:Int):ByteArray {require(len>=0 && len<=end-pos);return b.copyOfRange(pos,pos+len).also {pos+=len}}
        fun field()=bytes(size())
    }
    private fun fileBytes(file: File): ByteArray {
        require(file.length() in 0..LIMIT.toLong())
        return file.readBytes()
    }
    private fun records(data:ByteArray,consume:(ByteArray)->Unit) {
        var pos=0
        var partial:ByteArrayOutputStream?=null
        while(pos+7<=data.size) {
            val room=32768-pos%32768
            if(room<7){pos+=room;continue}
            val len=(data[pos+4].toInt() and 255) or ((data[pos+5].toInt() and 255) shl 8)
            val kind=data[pos+6].toInt() and 255
            if(kind==0 && len==0){pos+=room;continue}
            if(pos+7+len>data.size) break // An incomplete final journal record was never committed.
            require(len+7<=room)
            pos+=7
            when(kind) {
                1->consume(data.copyOfRange(pos,pos+len))
                2->partial=ByteArrayOutputStream().also {it.write(data,pos,len)}
                3->requireNotNull(partial).write(data,pos,len)
                4->{val out=requireNotNull(partial);out.write(data,pos,len);consume(out.toByteArray());partial=null}
                else->error("Invalid LevelDB journal record")
            }
            pos+=len
        }
    }
    private fun string(data:ByteArray,at:Int):String? {
        if(at>=data.size) return null
        val charset=when(data[at].toInt()) {0->Charsets.UTF_16LE;1->Charsets.ISO_8859_1;2->Charsets.UTF_8;else->return null}
        return String(data,at+1,data.size-at-1,charset)
    }
    fun read(dir:File):Map<String,String?> {
        val manifest=File(dir,"CURRENT").readText().trim()
        require(manifest.matches(Regex("MANIFEST-[0-9]+")))
        var log=0L;var previousLog=0L
        val tables=mutableSetOf<Long>()
        records(fileBytes(File(dir,manifest))) {raw->
            val c=Cursor(raw)
            while(c.pos<c.end) when(c.variable().toInt()) {
                1->c.field();2->log=c.variable();3,4->c.variable();5->{c.variable();c.field()}
                6->{c.variable();tables.remove(c.variable())}
                7->{c.variable();tables+=c.variable();c.variable();c.field();c.field()}
                9->previousLog=c.variable()
                else->error("Unrecognized browser storage manifest")
            }
        }
        val values=mutableMapOf<String,Pair<Long,String?>>()
        fun apply(key:ByteArray,seq:Long,type:Int,value:ByteArray) {
            if(key.size<=origin.size || origin.indices.any {key[it]!=origin[it]}) return
            val name=string(key,origin.size) ?: return
            if(!LegacyUiPreferences.accepts(name) || seq<(values[name]?.first ?: -1)) return
            values[name]=seq to if(type==0) null else string(value,0)
        }
        for(id in tables) {
            val stem=id.toString().padStart(6,'0')
            val f=listOf(File(dir,"$stem.ldb"),File(dir,"$stem.sst")).first {it.isFile}
            val src=fileBytes(f);require(src.size>=48)
            val footer=Cursor(src,src.size-48)
            footer.variable();footer.variable()
            fun block(handle:Cursor):ByteArray {
                val off=handle.size();val len=handle.size();require(len<src.size && off<=src.size-len-5)
                val data=src.copyOfRange(off,off+len)
                return when(src[off+len].toInt()){0->data;1->unsnappy(data);else->error("Unsupported browser storage compression")}
            }
            entries(block(footer)){_,handle->
                entries(block(Cursor(handle))){internalKey,value->
                    require(internalKey.size>=8)
                    val end=internalKey.size-8;val tag=Cursor(internalKey,end).little(8)
                    apply(internalKey.copyOf(end),tag ushr 8,(tag and 255).toInt(),value)
                }
            }
        }
        dir.listFiles().orEmpty().filter { it.extension=="log" && it.nameWithoutExtension.toLongOrNull()?.let {n-> n>=log || n==previousLog}==true }
            .forEach { file->records(fileBytes(file)){raw->
                val c=Cursor(raw);var seq=c.little(8);val count=c.little(4)
                require(count in 0..LIMIT.toLong())
                repeat(count.toInt()){val type=c.byte();require(type==0 || type==1);val key=c.field()
                    apply(key,seq++,type,if(type==1)c.field() else byteArrayOf())}
            } }
        return values.mapValues { it.value.second }
    }
    private fun entries(data:ByteArray,visit:(ByteArray,ByteArray)->Unit) {
        require(data.size>=4)
        val restart=Cursor(data,data.size-4).little(4)
        require(restart<=data.size/4)
        val c=Cursor(data,0,data.size-4-restart.toInt()*4)
        var key=byteArrayOf()
        while(c.pos<c.end) {
            val common=c.size();val suffix=c.size();val value=c.size();require(common<=key.size)
            key=key.copyOf(common)+c.bytes(suffix);visit(key,c.bytes(value))
        }
    }
    private fun unsnappy(input:ByteArray):ByteArray {
        val c=Cursor(input);val out=ByteArray(c.size());var pos=0
        while(pos<out.size) {
            val tag=c.byte();val type=tag and 3
            if(type==0) {
                val code=tag ushr 2;val length=if(code<60) code+1 else c.little(code-59).toInt()+1
                require(length in 1..out.size-pos);c.bytes(length).copyInto(out,pos);pos+=length
            } else {
                val length=if(type==1) 4+((tag ushr 2) and 7) else 1+(tag ushr 2)
                val distance=when(type){1->((tag and 224) shl 3)+c.byte();2->c.little(2).toInt();else->c.little(4).toInt()}
                require(distance in 1..pos && length<=out.size-pos)
                repeat(length){out[pos]=out[pos-distance];pos++}
            }
        }
        return out
    }
}
