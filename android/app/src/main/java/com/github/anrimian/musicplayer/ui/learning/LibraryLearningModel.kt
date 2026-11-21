package com.github.anrimian.musicplayer.ui.learning

import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

/** Lyrics and the settings sheet observe one state for the active library track. */
internal fun Fragment.libraryLearningModel(): LearningViewModel =
    ViewModelProvider(requireActivity(), object : ViewModelProvider.Factory {
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            @Suppress("UNCHECKED_CAST")
            return LearningViewModel(requireActivity().application, true) as T
        }
    })[LearningViewModel::class.java]
