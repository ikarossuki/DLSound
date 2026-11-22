package com.github.anrimian.musicplayer.ui.learning

import android.content.Context
import android.net.Uri
import android.provider.DocumentsContract
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.io.File
import java.nio.ByteBuffer
import java.nio.charset.CodingErrorAction

internal data class LearningFile(
    val uri: String, val name: String, val directory: Boolean,
    val size: Long = 0, val modified: Long = 0, val audio: Boolean = false,
)

/** Uses only provider read/query operations; no file path conversion or write operation. */
internal class SafLearningFiles(private val context: Context) {
    fun root(treeUri: String): String = DocumentsContract.buildDocumentUriUsingTree(Uri.parse(treeUri), DocumentsContract.getTreeDocumentId(Uri.parse(treeUri))).toString()

    fun list(folder: String): List<LearningFile> {
        val uri = Uri.parse(folder)
        if (uri.scheme == "file") {
            return File(requireNotNull(uri.path)).listFiles().orEmpty().map { file ->
                LearningFile(Uri.fromFile(file).toString(), file.name, file.isDirectory, file.length(), file.lastModified())
            }
        }
        val children = DocumentsContract.buildChildDocumentsUriUsingTree(uri, DocumentsContract.getDocumentId(uri))
        val projection = arrayOf(DocumentsContract.Document.COLUMN_DOCUMENT_ID, DocumentsContract.Document.COLUMN_DISPLAY_NAME,
            DocumentsContract.Document.COLUMN_MIME_TYPE, DocumentsContract.Document.COLUMN_SIZE, DocumentsContract.Document.COLUMN_LAST_MODIFIED)
        val result = mutableListOf<LearningFile>()
        val cursor = context.contentResolver.query(children, projection, null, null, null) ?: error("directory_unavailable")
        cursor.use {
            while (it.moveToNext()) {
                val id = it.getString(0)
                val name = it.getString(1).orEmpty()
                val mime = it.getString(2).orEmpty()
                val directory = mime == DocumentsContract.Document.MIME_TYPE_DIR
                val audio = mime.startsWith("audio/") || name.substringAfterLast('.', "").lowercase() in setOf("wav", "mp3", "mp4", "m4a", "flac", "ogg", "opus", "aac")
                result += LearningFile(DocumentsContract.buildDocumentUriUsingTree(uri, id).toString(), name, directory,
                    if (it.isNull(3)) 0 else it.getLong(3), if (it.isNull(4)) 0 else it.getLong(4), audio)
            }
        }
        return result.sortedWith(compareBy<LearningFile> { !it.directory }.thenBy(String.CASE_INSENSITIVE_ORDER) { it.name })
    }

    fun incomingFile(uri: Uri): Pair<LearningFile, String?> {
        if(uri.scheme=="file"){
            val file=File(requireNotNull(uri.path)).canonicalFile
            val roots=context.getExternalFilesDirs(null).filterNotNull().map { it.canonicalPath.substringBefore("/Android/data/")+"/" }
            require(roots.any { file.path.startsWith(it) } && !file.path.contains("/Android/") && file.isFile && file.canRead())
            return LearningFile(uri.toString(),file.name,false,file.length(),file.lastModified(),true) to readableParent(file)
        }
        require(uri.scheme == "content")
        val authority=requireNotNull(uri.authority)
        val own=context.packageManager.getPackageInfo(context.packageName,android.content.pm.PackageManager.GET_PROVIDERS).providers.orEmpty()
        require(own.none { provider -> authority in provider.authority.split(';') })
        context.contentResolver.openAssetFileDescriptor(uri, "r")?.use { } ?: error("file_unavailable")
        val name = context.contentResolver.query(uri, arrayOf(android.provider.OpenableColumns.DISPLAY_NAME), null, null, null)?.use {
            if (it.moveToFirst()) it.getString(0) else null
        } ?: uri.lastPathSegment.orEmpty()
        val path = if (uri.authority == android.provider.MediaStore.AUTHORITY) runCatching {
            context.contentResolver.query(uri, arrayOf(android.provider.MediaStore.MediaColumns.DATA), null, null, null)?.use {
                if (it.moveToFirst()) it.getString(0) else null
            }
        }.getOrNull() else null
        val treeParent = if (uri.authority == "com.android.externalstorage.documents" &&
            DocumentsContract.isDocumentUri(context, uri)) {
            val id = DocumentsContract.getDocumentId(uri)
            val parent = id.substringBeforeLast('/',id.substringBefore(':')+":")
            context.contentResolver.persistedUriPermissions.firstOrNull {
                it.isReadPermission && it.uri.authority == uri.authority && DocumentsContract.isTreeUri(it.uri) &&
                    DocumentsContract.getTreeDocumentId(it.uri).let { root -> root == parent || parent.startsWith(root.trimEnd('/')+"/") || root.endsWith(':') && parent.startsWith(root) }
            }?.let { DocumentsContract.buildDocumentUriUsingTree(it.uri, parent).toString() }
        } else null
        return LearningFile(uri.toString(), name, false, audio = true) to (treeParent ?: path?.let { readableParent(File(it)) })
    }

    fun readableParent(audioFile: File): String? {
        val path = audioFile.absolutePath
        val documentId = if (path.startsWith("/storage/emulated/0/")) {
            "primary:" + path.removePrefix("/storage/emulated/0/")
        } else if (path.startsWith("/storage/")) {
            val relative = path.removePrefix("/storage/")
            relative.substringBefore('/') + ":" + relative.substringAfter('/')
        } else null
        if (documentId != null) {
            val parentId = documentId.substringBeforeLast('/')
            context.contentResolver.persistedUriPermissions.filter { it.isReadPermission }.forEach { permission ->
                val tree = permission.uri
                if (tree.authority == "com.android.externalstorage.documents" && DocumentsContract.isTreeUri(tree)) {
                    val root = DocumentsContract.getTreeDocumentId(tree)
                    if (parentId == root || parentId.startsWith(root.trimEnd('/') + "/") ||
                        (root.endsWith(':') && parentId.startsWith(root))) {
                        return DocumentsContract.buildDocumentUriUsingTree(tree, parentId).toString()
                    }
                }
            }
        }
        return audioFile.parentFile?.takeIf { it.canRead() }?.let { Uri.fromFile(it).toString() }
    }

    fun text(uri: String): String = (if (Uri.parse(uri).scheme == "file") File(requireNotNull(Uri.parse(uri).path)).inputStream() else context.contentResolver.openInputStream(Uri.parse(uri)))?.use(::readText) ?: error("file_unavailable")

    companion object {
        const val MAX_BYTES = 8 * 1024 * 1024
        fun readText(input: InputStream): String {
            val bytes = ByteArrayOutputStream()
            val buffer = ByteArray(8192)
            while (true) {
                val length = input.read(buffer)
                if (length < 0) break
                if (bytes.size() + length > MAX_BYTES) throw SubtitleFormatException("too_large")
                bytes.write(buffer, 0, length)
            }
            return Charsets.UTF_8.newDecoder().onMalformedInput(CodingErrorAction.REPORT)
                .onUnmappableCharacter(CodingErrorAction.REPORT).decode(ByteBuffer.wrap(bytes.toByteArray())).toString()
        }
    }
}
