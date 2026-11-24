package com.github.anrimian.musicplayer.ui.learning

import android.os.Bundle
import android.view.*
import android.widget.FrameLayout
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.github.anrimian.musicplayer.ui.v12.LyricStyle
import com.github.anrimian.musicplayer.ui.v12.NativeLyrics
import com.google.android.material.color.MaterialColors
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import kotlinx.coroutines.launch

class RubyLyricsFragment : Fragment() {
    override fun onCreateView(inflater:LayoutInflater, container:ViewGroup?, state:Bundle?):View = FrameLayout(requireContext())
    override fun onViewCreated(view:View,state:Bundle?) {
        val root=view as FrameLayout
        val model=libraryLearningModel()
        val store=LearningStore(requireContext())
        var lastRows:List<RenderedCue>?=null
        var lastStyle:LyricStyle?=null
        var lyrics:NativeLyrics?=null
        fun color(attr:Int)=MaterialColors.getColor(view,attr)
        val ink=color(com.google.android.material.R.attr.colorOnSurface)
        val accent=color(androidx.appcompat.R.attr.colorPrimary)
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                model.timedLibraryState.collect { s ->
                    val style=LyricStyle(when(s.mode){SubtitleMode.BILINGUAL->"both";SubtitleMode.JAPANESE->"ja";else->"zh"},
                        s.furigana,s.fontSize,store.rubyScale,store.depthEnabled,!android.animation.ValueAnimator.areAnimatorsEnabled(),
                        ink,color(com.google.android.material.R.attr.colorOnSurfaceVariant),accent,color(com.google.android.material.R.attr.colorSecondaryContainer),color(com.google.android.material.R.attr.colorSurface))
                    if(s.rendered!==lastRows || style!=lastStyle) {
                        val doc=s.document
                        root.removeAllViews()
                        lyrics=NativeLyrics(requireContext(),style,s.rendered,doc?.id=="parallel",
                            { row -> doc?.let { model.seekCue(it.fingerprint,row.cue.id) } },
                            { row ->
                                val words=row.pieces.withIndex().filter {containsKanji(it.value.text)}
                                if(words.isNotEmpty() && doc!=null) MaterialAlertDialogBuilder(requireContext())
                                    .setTitle("选择要修正的词语").setItems(words.map { it.value.text }.toTypedArray()){_,i->
                                        val piece=words[i];val edit=android.widget.EditText(requireContext()).apply {setSingleLine();setText(piece.value.reading)}
                                        val dialog=MaterialAlertDialogBuilder(requireContext()).setTitle(piece.value.text).setView(edit)
                                            .setPositiveButton("保存",null).setNegativeButton("取消",null)
                                            .setNeutralButton("恢复原读音"){_,_->s.track?.let {model.correct(it.uri,doc.fingerprint,row.cue.id,piece.index,null,piece.value)} }.create()
                                        dialog.setOnShowListener { dialog.getButton(-1).setOnClickListener {
                                            val reading=edit.text.toString().trim()
                                            if(validReading(reading)) { s.track?.let {model.correct(it.uri,doc.fingerprint,row.cue.id,piece.index,reading,piece.value)};dialog.dismiss() }
                                            else edit.error="请输入有效的平假名读音"
                                        } };dialog.show()
                                    }.show()
                            })
                        root.addView(lyrics); lastRows=s.rendered;lastStyle=style
                    }
                    val offset=s.track?.let {t->s.document?.let {store.offset(t.uri,it.fingerprint)}} ?: 0L
                    lyrics?.time(s.position,offset,s.duration)
                }
            }
        }
    }
}
