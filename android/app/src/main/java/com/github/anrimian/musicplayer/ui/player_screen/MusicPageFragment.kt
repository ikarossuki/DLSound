package com.github.anrimian.musicplayer.ui.player_screen

import android.os.Bundle
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.di.Components
import com.google.android.material.color.MaterialColors
import com.google.android.material.imageview.ShapeableImageView
import com.google.android.material.shape.ShapeAppearanceModel
import kotlinx.coroutines.launch

class MusicPageFragment : Fragment() {
    private lateinit var image: ShapeableImageView
    private lateinit var info: TextView
    private lateinit var placeholder: TextView
    private val cover: Boolean get() = requireArguments().getBoolean("cover")
    companion object {
        fun newInstance(cover: Boolean) = MusicPageFragment().apply { arguments = Bundle().apply { putBoolean("cover", cover) } }
    }
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, state: Bundle?): View {
        val context = requireContext()
        val content = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            gravity = if (cover) Gravity.CENTER else Gravity.TOP
            setPadding(dp(24), dp(16), dp(24), dp(16))
        }
        image = ShapeableImageView(context).apply {
            scaleType = ImageView.ScaleType.CENTER_CROP
            contentDescription = "歌曲封面"
            shapeAppearanceModel = ShapeAppearanceModel.builder().setAllCornerSizes(dp(20).toFloat()).build()
            setImageResource(R.drawable.ic_music_placeholder_simple)
        }
        placeholder = TextView(context).apply {
            text = "暂无封面"
            textSize = 16f
            gravity = Gravity.CENTER
            setTextColor(MaterialColors.getColor(context, com.google.android.material.R.attr.colorOnSurfaceVariant, 0))
            setCompoundDrawablesWithIntrinsicBounds(0, R.drawable.ic_music_circle, 0, 0)
            androidx.core.widget.TextViewCompat.setCompoundDrawableTintList(this, android.content.res.ColorStateList.valueOf(currentTextColor))
            compoundDrawablePadding = dp(16)
        }
        if (cover) {
            val frame = android.widget.FrameLayout(context)
            frame.addView(image, android.widget.FrameLayout.LayoutParams(-1, -1, Gravity.CENTER))
            frame.addView(placeholder, android.widget.FrameLayout.LayoutParams(-2, -2, Gravity.CENTER))
            image.visibility = View.INVISIBLE
            content.addView(frame, LinearLayout.LayoutParams(-1, -1))
            content.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
                val size = minOf(content.width - content.paddingLeft - content.paddingRight,
                    content.height - content.paddingTop - content.paddingBottom).coerceAtLeast(0)
                if (image.layoutParams.width != size || image.layoutParams.height != size) {
                    image.layoutParams = android.widget.FrameLayout.LayoutParams(size, size, Gravity.CENTER)
                }
            }
        }
        info = TextView(context).apply {
            textSize = 16f
            setTextColor(MaterialColors.getColor(context, com.google.android.material.R.attr.colorOnSurface, 0))
            setLineSpacing(dp(8).toFloat(), 1.1f)
            setTextIsSelectable(true)
        }
        if (!cover) content.addView(info)
        val root = if (cover) content else ScrollView(context).apply { addView(content) }
        return root
    }
    override fun onViewCreated(view: View, state: Bundle?) {
            viewLifecycleOwner.lifecycleScope.launch {
                viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                    (requireActivity() as MusicPlayerActivity).currentTrack.collect { track ->
                        if (cover) {
                            image.visibility = View.INVISIBLE
                            placeholder.visibility = View.VISIBLE
                            if (track != null) Components.getAppComponent().imageLoader().displayImage(image, track, { loaded ->
                                if (isAdded && this@MusicPageFragment.view != null) {
                                    image.visibility = if (loaded) View.VISIBLE else View.INVISIBLE
                                    placeholder.visibility = if (loaded) View.GONE else View.VISIBLE
                                }
                            }, 960)
                        } else {
                            info.text = if (track == null) "选择一首歌曲后查看简介" else buildString {
                                append(track.title)
                                append("\n\n艺术家\n").append(track.artist?.takeIf { it.isNotBlank() } ?: "未填写")
                                append("\n\n专辑\n").append(track.album?.takeIf { it.isNotBlank() } ?: "未填写")
                                append("\n\n时长\n").append(track.duration / 60000).append(":").append((track.duration / 1000 % 60).toString().padStart(2, '0'))
                                append("\n\n文件大小\n").append(String.format(java.util.Locale.ROOT, "%.1f MB", track.size / 1048576.0))
                                append("\n\n简介\n").append(track.comment?.takeIf { it.isNotBlank() } ?: "该本地文件未提供简介")
                            }
                        }
                    }
                }
            }
    }
    override fun onDestroyView() {
        Components.getAppComponent().imageLoader().clearImage(image)
        super.onDestroyView()
    }
    private fun dp(value: Int) = (resources.displayMetrics.density * value).toInt()
}
