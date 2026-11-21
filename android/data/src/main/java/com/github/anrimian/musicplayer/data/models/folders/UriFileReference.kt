package com.github.anrimian.musicplayer.data.models.folders

import android.net.Uri
import androidx.core.net.toUri
import com.github.anrimian.musicplayer.domain.models.folders.FileReference

// HimitsuPlayer: persistent SAF grants can stream audio without copying whole long tracks.
class UriFileReference(val uri: Uri, val usePrivateCopy: Boolean = true): FileReference {
    override val path: String = uri.toString()
}

fun String.toFileReference(): FileReference {
    return UriFileReference(this.toUri())
}
