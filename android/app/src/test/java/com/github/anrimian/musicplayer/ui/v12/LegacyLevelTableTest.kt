package com.github.anrimian.musicplayer.ui.v12

import java.io.ByteArrayOutputStream
import java.nio.file.Path
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir

class LegacyLevelTableTest {
    @TempDir lateinit var directory: Path

    private fun ByteArrayOutputStream.number(value: Long, bytes: Int) {
        repeat(bytes) { i -> write((value ushr (8 * i)).toInt() and 255) }
    }
    private fun ByteArrayOutputStream.field(data: ByteArray) {
        var length = data.size
        while (length >= 128) {
            write(128 or (length and 127))
            length = length ushr 7
        }
        write(length)
        write(data)
    }
    private fun record(payload: ByteArray) = ByteArrayOutputStream().apply {
        number(0, 4)
        number(payload.size.toLong(), 2)
        write(1)
        write(payload)
    }.toByteArray()
    private fun batch(sequence: Long, rows: List<Pair<String, String?>>): ByteArray {
        val data = ByteArrayOutputStream()
        data.number(sequence, 8)
        data.number(rows.size.toLong(), 4)
        for ((key, value) in rows) {
            data.write(if (value == null) 0 else 1)
            data.field("_https://app.dlsound.local\u0000".toByteArray() + byteArrayOf(1) + key.toByteArray())
            if (value != null) data.field(byteArrayOf(0) + value.toByteArray(Charsets.UTF_16LE))
        }
        return record(data.toByteArray())
    }

    @Test fun importsLiveKeysWithUnicodeAndRespectsNewerDeletes() {
        val dir = directory.toFile()
        dir.resolve("CURRENT").writeText("MANIFEST-000005\n")
        dir.resolve("MANIFEST-000005").writeBytes(record(byteArrayOf(2, 6)))
        val name = "dlsound/bookmarks/track"
        val removed = "dlsound/bookmarks/removed"
        dir.resolve("000004.log").writeBytes(batch(1, listOf("dlsound/works/stale" to "stale")))
        dir.resolve("000006.log").writeBytes(batch(4, listOf(name to "旧", removed to "已删除", "another-key" to "ignore")))
        dir.resolve("000007.log").writeBytes(batch(7, listOf(removed to null, name to "明日・あした")))
        val current = LegacyLevelTable.read(dir)
        assertEquals("明日・あした", current[name])
        assertEquals(null, current.getValue(removed))
        assertFalse(current.containsKey("dlsound/works/stale"))
        assertFalse(current.containsKey("another-key"))
    }
}
