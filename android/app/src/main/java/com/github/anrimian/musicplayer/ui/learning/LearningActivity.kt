package com.github.anrimian.musicplayer.ui.learning

import com.github.anrimian.musicplayer.ui.v12.PlayerV12Activity

/** Existing notification intents reopen the persisted external session on the native player. */
class LearningActivity : PlayerV12Activity() {
    override val externalView = true
    override val folderView = true
    override val restoreExternal = true
}
