package com.github.anrimian.musicplayer.ui.learning

import android.content.Context
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.DocumentsContract
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.io.File
import java.nio.ByteBuffer
import java.nio.charset.CodingErrorAction

internal data class LearningFile(
    val uri: String, val name: String, val directory: Boolean,
    val size: Long = 0, val modified: Long = 0, val audio: Boolean = false,
    val parentDocument: Uri? = null,
)

/** Uses only provider read/query operations; no file path conversion or write operation. */
internal class SafLearningFiles(private val context: Context) {
    fun root(treeUri: String): String = DocumentsContract.buildDocumentUriUsingTree(Uri.parse(treeUri), DocumentsContract.getTreeDocumentId(Uri.parse(treeUri))).toString()

    fun list(folder: String): List<LearningFile> {
        val uri = Uri.parse(folder)
        if (uri.scheme == "file") {
            val entries = File(requireNotNull(uri.path)).listFiles() ?: throw java.io.IOException("directory_unavailable")
            return entries.map { file ->
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

    fun displayName(uri: Uri): String {
        if (uri.scheme == "file") return uri.lastPathSegment.orEmpty()
        val name = android.provider.OpenableColumns.DISPLAY_NAME
        val cursor = try { context.contentResolver.query(uri, arrayOf(name), null, null, null) }
        catch (_: IllegalArgumentException) { null }
        return cursor?.use {
            val column = it.getColumnIndex(name)
            if (column >= 0 && it.moveToFirst()) it.getString(column) else null
        } ?: uri.lastPathSegment.orEmpty().substringAfterLast('/')
    }

    fun incomingFile(uri: Uri): Pair<LearningFile, String?> {
        if(uri.scheme=="file"){
            val file=File(requireNotNull(uri.path)).canonicalFile
            val roots=context.getExternalFilesDirs(null).filterNotNull().map { it.canonicalPath.substringBefore("/Android/data/")+"/" }
            require(roots.any { file.path.startsWith(it) } && !file.path.contains("/Android/") && file.isFile && file.canRead())
            return LearningFile(uri.toString(),file.name,false,file.length(),file.lastModified(),true, parentDocument(file)) to readableParent(file)
        }
        require(uri.scheme == "content")
        val authority=requireNotNull(uri.authority)
        val own=context.packageManager.getPackageInfo(context.packageName,android.content.pm.PackageManager.GET_PROVIDERS).providers.orEmpty()
        require(own.none { provider -> authority in provider.authority.split(';') })
        context.contentResolver.openAssetFileDescriptor(uri, "r")?.use { } ?: error("file_unavailable")
        val nameColumn = android.provider.OpenableColumns.DISPLAY_NAME
        val sizeColumn = android.provider.OpenableColumns.SIZE
        val modifiedColumn = DocumentsContract.Document.COLUMN_LAST_MODIFIED
        val columns = if (DocumentsContract.isDocumentUri(context, uri)) arrayOf(nameColumn, sizeColumn, modifiedColumn)
                      else arrayOf(nameColumn, sizeColumn)
        var name = uri.lastPathSegment.orEmpty()
        var size = 0L
        var modified = 0L
        val cursor = try { context.contentResolver.query(uri, columns, null, null, null) }
        catch (_: IllegalArgumentException) { context.contentResolver.query(uri, arrayOf(nameColumn), null, null, null) }
        cursor?.use {
            if (it.moveToFirst()) {
                it.getColumnIndex(nameColumn).takeIf { i -> i >= 0 && !it.isNull(i) }?.let { i -> name = it.getString(i) }
                it.getColumnIndex(sizeColumn).takeIf { i -> i >= 0 && !it.isNull(i) }?.let { i -> size = it.getLong(i) }
                it.getColumnIndex(modifiedColumn).takeIf { i -> i >= 0 && !it.isNull(i) }?.let { i -> modified = it.getLong(i) }
            }
        }
        val path = mediaPath(uri)
        val parent = parentDocument(uri, path)
        return LearningFile(uri.toString(), name, false, size, modified, audio = true, parentDocument = parent) to
            (grantedParent(parent) ?: path?.let { readableParent(File(it)) })
    }

    private fun mediaPath(uri: Uri): String? =
        if (uri.authority == android.provider.MediaStore.AUTHORITY) runCatching {
            context.contentResolver.query(uri, arrayOf(android.provider.MediaStore.MediaColumns.DATA), null, null, null)?.use {
                if (it.moveToFirst()) it.getString(0) else null
            }
        }.getOrNull() else null

    fun parentDocument(uri: Uri, path: String? = mediaPath(uri)): Uri? = when {
        uri.scheme == "file" -> uri.path?.let { parentDocument(File(it)) }
        uri.authority == EXTERNAL_DOCUMENTS && DocumentsContract.isDocumentUri(context, uri) ->
            parentDocumentForId(DocumentsContract.getDocumentId(uri))
        else -> path?.let { parentDocument(File(it)) }
    }

    private fun parentDocumentForId(id: String): Uri {
        val parent = id.substringBeforeLast('/', id.substringBefore(':') + ":")
        return DocumentsContract.buildDocumentUri(EXTERNAL_DOCUMENTS, parent)
    }

    fun parentDocument(audioFile: File): Uri? {
        val path = audioFile.absolutePath
        val primary = Environment.getExternalStorageDirectory().path
        val id = when {
            path.startsWith("$primary/") -> "primary:" + path.removePrefix("$primary/")
            path.startsWith("/sdcard/") -> "primary:" + path.removePrefix("/sdcard/")
            path.startsWith("/storage/") -> {
                val relative = path.removePrefix("/storage/")
                relative.substringBefore('/') + ":" + relative.substringAfter('/')
            }
            else -> return null
        }
        return parentDocumentForId(id)
    }

    fun grantedParent(document: Uri?): String? {
        if (document == null) return null
        val parent = DocumentsContract.getDocumentId(document)
        return context.contentResolver.persistedUriPermissions.firstOrNull {
            it.isReadPermission && it.uri.authority == EXTERNAL_DOCUMENTS && DocumentsContract.isTreeUri(it.uri) &&
                DocumentsContract.getTreeDocumentId(it.uri).let { root ->
                    root == parent || parent.startsWith(if (root.endsWith(':')) root else "$root/")
                }
        }?.let { DocumentsContract.buildDocumentUriUsingTree(it.uri, parent).toString() }
    }

    fun readableParent(audioFile: File): String? = grantedParent(parentDocument(audioFile))
        ?: audioFile.parentFile?.takeIf { it.canRead() }?.let { Uri.fromFile(it).toString() }

    // Scoped storage can expose audio while hiding the subtitle files beside it.
    fun needsTreeForSidecars(folder: String?): Boolean = folder == null ||
        (Uri.parse(folder).scheme == "file" && Build.VERSION.SDK_INT >= 29 && !Environment.isExternalStorageLegacy())

    fun text(uri: String): String = (if (Uri.parse(uri).scheme == "file") File(requireNotNull(Uri.parse(uri).path)).inputStream() else context.contentResolver.openInputStream(Uri.parse(uri)))?.use(::readText) ?: error("file_unavailable")

    companion object {
        private const val EXTERNAL_DOCUMENTS = "com.android.externalstorage.documents"
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
