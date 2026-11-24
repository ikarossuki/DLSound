package com.github.anrimian.musicplayer.ui.v12

import android.icu.text.Collator
import android.icu.text.RuleBasedCollator
import android.net.Uri
import android.provider.DocumentsContract
import org.json.JSONArray
import org.json.JSONObject
import java.util.Locale

internal fun json(vararg values: Pair<String, Any?>) = JSONObject().apply {
    values.forEach { (key, value) -> if (value != null) put(key, value) }
}
internal fun JSONArray?.objects() = if (this == null) emptyList() else (0 until length()).mapNotNull(::optJSONObject)
internal fun JSONArray?.strings() = if (this == null) emptyList() else (0 until length()).map(::getString)
internal fun JSONObject.text(key: String, fallback: String = "") = if (isNull(key)) fallback else optString(key, fallback)
internal fun clock(ms: Long): String {
    val seconds = ms.coerceAtLeast(0) / 1000
    return String.format(Locale.ROOT, "%d:%02d", seconds / 60, seconds % 60)
}
internal val naturalOrder: Comparator<String> = run {
    val collator = Collator.getInstance().apply { strength = Collator.PRIMARY }
    if (collator is RuleBasedCollator) collator.numericCollation = true
    collator.freeze()
    Comparator { a, b -> collator.compare(a,b) }
}
/** Both Android document URI forms can identify the same physical file as a MediaStore row. */
internal fun canonicalTrackSource(source: String): String {
    if (source.startsWith("/sdcard/")) return "/storage/emulated/0/" + source.removePrefix("/sdcard/")
    if (!source.startsWith("content://") && !source.startsWith("file://")) return source
    val uri = Uri.parse(source)
    if (uri.scheme == "file") return uri.path?.takeIf { it.startsWith('/') }?.let(::canonicalTrackSource) ?: source
    if (uri.authority != "com.android.externalstorage.documents") return source
    val document = runCatching { DocumentsContract.getDocumentId(uri) }.getOrNull() ?: return source
    val volume = document.substringBefore(':')
    val relative = document.substringAfter(':', "")
    if (volume.isBlank() || '/' in volume || relative.isBlank()) return source
    val root = if (volume.equals("primary", true)) "/storage/emulated/0" else "/storage/$volume"
    return "$root/$relative"
}

internal fun trackSource(track: JSONObject): String {
    val id = track.text("id")
    val folder = track.text("folder")
    val file = track.text("fileName")
    if (folder.isNotEmpty() && folder != "local" && file.isNotEmpty())
        return canonicalTrackSource("/" + (folder.trimEnd('/') + "/" + file).trimStart('/'))
    val direct = canonicalTrackSource(id)
    if (direct != id) return direct
    val parent = Uri.parse(track.text("parentDocument"))
    if (parent.authority == "com.android.externalstorage.documents" && file.isNotEmpty()) runCatching {
        val document = DocumentsContract.getDocumentId(parent)
        val volume = document.substringBefore(':')
        return "/" + listOf("storage", if (volume == "primary") "emulated/0" else volume, document.substringAfter(':', ""), file)
            .filter(String::isNotEmpty).joinToString("/")
    }
    return id
}

internal class NativeDirectory(val name: String, val path: String, val parent: String) {
    val children = linkedMapOf<String,NativeDirectory>()
    val tracks = mutableListOf<JSONObject>()
    var total = 0
}
internal class NativeCatalog(val tracks: List<JSONObject>) {
    val byId = tracks.associateBy { it.text("id") }
    val folders = tracks.groupBy { it.text("folder", "local") }
    val artists = tracks.groupBy { it.text("artist").trim().ifEmpty { "未知艺术家" } }
    val albums = tracks.groupBy { t ->
        val album = t.text("album","未知专辑")
        val dir = t.text("folder")
        val artist = t.text("albumArtist")
        if (t.text("albumId").isNotEmpty() && album != "未知专辑")
            listOf("id",t.text("albumId"),artist.ifEmpty { dir.replace(Regex("/(?:cd|disc|disk)\\s*\\d+$",RegexOption.IGNORE_CASE),"") })
        else listOf("name",album,artist.ifEmpty { dir },if (artist.isEmpty() && album != "未知专辑") t.text("artist") else "")
    }.mapKeys { JSONArray(it.key).toString() }.mapValues { it.value.sortedWith(trackOrder) }
    val root = NativeDirectory("本地音乐","","")
    val directories = mutableMapOf("" to root)
    private val searchTerms = tracks.map { listOf(it.text("title"),it.text("artist"),it.text("album")).joinToString(" ").lowercase() }

    init {
        for (track in tracks) {
            val path = track.text("folder").trim('/').split('/').filter(String::isNotEmpty)
            val parts = mutableListOf<Pair<String,String>>()
            when {
                path.take(2) == listOf("storage","emulated") && path.size >= 3 -> {
                    parts += path.take(3).joinToString("/") to "内部存储"
                    path.drop(3).forEach { parts += it to it }
                }
                path.firstOrNull() == "storage" && path.size >= 2 -> {
                    parts += path.take(2).joinToString("/") to path[1]
                    path.drop(2).forEach { parts += it to it }
                }
                path.firstOrNull() == "sdcard" -> {
                    parts += "storage/emulated/0" to "内部存储"
                    path.drop(1).forEach { parts += it to it }
                }
                path.isEmpty() || path == listOf("local") -> parts += "unknown" to "本地音乐"
                else -> path.forEach { parts += it to it }
            }
            var current = root
            current.total++
            for ((key,name) in parts) {
                current = current.children.getOrPut(key) {
                    NativeDirectory(name,current.path + "/" + key,current.path).also { directories[it.path] = it }
                }
                current.total++
            }
            current.tracks += track
        }
    }
    fun nearest(path: String): NativeDirectory {
        var key = path
        while (key.isNotEmpty() && key !in directories) key = key.substringBeforeLast('/',"")
        return directories[key] ?: root
    }
    fun search(query: String): List<JSONObject> {
        val term = query.trim().lowercase()
        return tracks.filterIndexed { i, _ -> term in searchTerms[i] }
    }
    fun sort(items: List<JSONObject>, order: String): List<JSONObject> {
        if (order == "default" || order.isEmpty()) return items
        val field = order.substringBefore('-')
        val cmp = Comparator<JSONObject> { a,b ->
            when (field) {
                "duration" -> a.optLong(field).compareTo(b.optLong(field))
                "album" -> naturalOrder.compare(a.text(field),b.text(field)).takeIf { it != 0 }
                    ?: compareValuesBy(a,b,{it.optInt("discNumber",1)},{it.optInt("trackNumber",Int.MAX_VALUE)})
                else -> naturalOrder.compare(a.text(field),b.text(field))
            }
        }.thenComparator { a,b -> naturalOrder.compare(a.text("title"),b.text("title")) }
            .thenComparator { a,b -> naturalOrder.compare(a.text("id"),b.text("id")) }
        return items.sortedWith(if (order.endsWith("-desc")) cmp.reversed() else cmp)
    }
    companion object {
        val trackOrder = compareBy<JSONObject>({it.optInt("discNumber",1)},{it.optInt("trackNumber",Int.MAX_VALUE)})
            .thenComparator { a,b -> naturalOrder.compare(a.text("fileName",a.text("title")),b.text("fileName",b.text("title"))) }
    }
}
