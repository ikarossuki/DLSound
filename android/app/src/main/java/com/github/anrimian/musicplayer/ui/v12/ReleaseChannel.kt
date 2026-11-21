package com.github.anrimian.musicplayer.ui.v12

import org.json.JSONObject
import java.io.IOException
import java.net.URL
import javax.net.ssl.HttpsURLConnection

internal object ReleaseChannel {
    const val page = "https://github.com/ikaros0202/DLSound/releases/latest"
    private const val endpoint = "https://api.github.com/repos/ikaros0202/DLSound/releases/latest"

    private fun parts(version: String): List<Int> {
        val numbers = version.removePrefix("v").split('.')
        require(numbers.size == 3 && numbers.all { it.toIntOrNull() != null }) { "无法识别版本号" }
        return numbers.map { it.toInt() }
    }

    fun check(installed: String): JSONObject {
        val connection = URL(endpoint).openConnection() as HttpsURLConnection
        try {
            connection.connectTimeout = 7000
            connection.readTimeout = 7000
            connection.setRequestProperty("Accept", "application/vnd.github+json")
            connection.setRequestProperty("User-Agent", "DL-Sound/$installed")
            if (connection.responseCode == 404) {
                return JSONObject().put("available", false).put("message", "GitHub 暂未提供公开发行版。")
            }
            if (connection.responseCode != 200) throw IOException("GitHub 返回 ${connection.responseCode}")
            val release = connection.inputStream.bufferedReader().use { JSONObject(it.readText()) }
            val tag = release.getString("tag_name")
            val current = parts(installed.substringBefore('-'))
            val newest = parts(tag)
            val difference = current.indices.firstOrNull { newest[it] != current[it] }
            val available = difference != null && newest[difference] > current[difference]
            return JSONObject().put("available", available).put("message",
                if (available) "发现新版本 $tag" else "当前已是最新版本（$installed）。")
        } finally {
            connection.disconnect()
        }
    }
}
