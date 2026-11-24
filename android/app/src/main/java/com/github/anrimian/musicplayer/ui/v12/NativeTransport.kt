package com.github.anrimian.musicplayer.ui.v12

import org.json.JSONObject

/** The library and portable backup still expose the original metadata record. */
internal data class NativeAudio(
    val id: String,
    val title: String,
    val artist: String,
    val duration: Long,
    val album: String,
    val fileName: String,
    val comment: String,
    val metadata: JSONObject,
) {
    constructor(row: JSONObject) : this(
        id = row.text("id"),
        title = row.text("title"),
        artist = row.text("artist"),
        duration = row.optLong("duration"),
        album = row.text("album"),
        fileName = row.text("fileName"),
        comment = row.text("comment"),
        metadata = row,
    )
}

internal data class NativeQueueEntry(val itemId: String, val audio: NativeAudio)

/** Shared by the full player, mini player, queue and listening practice. All writes are on the main thread. */
internal class NativeTransport {
    var entries: List<NativeQueueEntry> = emptyList()
        private set
    var index: Int = -1
        private set
    var duration: Long = 0
    var position: Long = 0
    var playing: Boolean = false
    var preparing: Boolean = false

    val current: NativeAudio? get() = entries.getOrNull(index)?.audio
    val itemId: String? get() = entries.getOrNull(index)?.itemId

    fun replace(entries: List<NativeQueueEntry>, index: Int, duration: Long) {
        this.entries = entries
        this.index = index
        this.duration = duration
    }

    fun select(index: Int) {
        this.index = index
        duration = current?.duration ?: 0
    }
}
