package com.github.anrimian.musicplayer.ui.player_screen

import android.content.res.ColorStateList
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.fragment.app.Fragment
import androidx.viewpager2.adapter.FragmentStateAdapter
import androidx.viewpager2.widget.ViewPager2
import com.github.anrimian.musicplayer.R
import com.github.anrimian.musicplayer.di.Components
import com.github.anrimian.musicplayer.domain.models.composition.Composition
import com.github.anrimian.musicplayer.domain.models.play_queue.PlayQueueItem
import com.github.anrimian.musicplayer.ui.common.activity.BaseAppCompatActivity
import com.github.anrimian.musicplayer.ui.learning.RubyLyricsFragment
import com.github.anrimian.musicplayer.ui.learning.PlaybackSettingsDialogFragment
import com.google.android.material.button.MaterialButton
import com.google.android.material.color.MaterialColors
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers
import io.reactivex.rxjava3.disposables.CompositeDisposable
import kotlinx.coroutines.flow.MutableStateFlow
import java.util.Locale

/** Full player shares the music library's queue and service. Swiping changes only content. */
class MusicPlayerActivity : BaseAppCompatActivity() {
    val currentTrack = MutableStateFlow<Composition?>(null)
    private val player = Components.getAppComponent().libraryPlayerInteractor()
    private val subscriptions = CompositeDisposable()
    private lateinit var pager: ViewPager2
    private lateinit var title: TextView
    private lateinit var artist: TextView
    private lateinit var elapsed: TextView
    private lateinit var total: TextView
    private lateinit var seek: SeekBar
    private lateinit var play: MaterialButton
    private lateinit var queueButton: MaterialButton
    private var duration = 0L
    private var dragging = false
    private var queue = emptyList<PlayQueueItem>()
    private var currentItemId: Long? = null
    private var queueDialog: BottomSheetDialog? = null
    private var queueAdapter: ArrayAdapter<String>? = null
    private var queueList: ListView? = null
    private var queueHeading: TextView? = null
    private var tabsMediator: TabLayoutMediator? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        val root = column().apply {
            setBackgroundColor(color(com.google.android.material.R.attr.colorSurface))
        }
        setContentView(root)
        val light = androidx.core.graphics.ColorUtils.calculateLuminance(color(com.google.android.material.R.attr.colorSurface)) > .5
        WindowCompat.getInsetsController(window, root).apply { isAppearanceLightStatusBars = light; isAppearanceLightNavigationBars = light }
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val safe = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout())
            view.setPadding(safe.left, safe.top, safe.right, safe.bottom)
            insets
        }
        val header = row().apply { setPadding(dp(8), 0, dp(8), 0) }
        header.addView(icon(R.drawable.ic_arrow_drop_down, "收起播放器") { finish() })
        val tabs = TabLayout(this).apply { tabMode = TabLayout.MODE_FIXED }
        header.addView(tabs, LinearLayout.LayoutParams(0, dp(56), 1f))
        header.addView(Space(this), LinearLayout.LayoutParams(dp(48), dp(48)))
        root.addView(header)
        val landscape = resources.configuration.orientation == android.content.res.Configuration.ORIENTATION_LANDSCAPE
        val body = LinearLayout(this).apply { orientation = if (landscape) LinearLayout.HORIZONTAL else LinearLayout.VERTICAL }
        root.addView(body, LinearLayout.LayoutParams(-1, 0, 1f))
        pager = ViewPager2(this).apply {
            id = R.id.himitsu_player_pages
            adapter = object : FragmentStateAdapter(this@MusicPlayerActivity) {
                override fun getItemCount() = 3
                override fun createFragment(position: Int): Fragment = when(position) {
                    0 -> MusicPageFragment.newInstance(false)
                    1 -> MusicPageFragment.newInstance(true)
                    else -> RubyLyricsFragment()
                }
            }
            offscreenPageLimit = 1
        }
        body.addView(pager, if (landscape) LinearLayout.LayoutParams(0, -1, 1f) else LinearLayout.LayoutParams(-1, 0, 1f))
        tabsMediator = TabLayoutMediator(tabs, pager) { tab, index ->
            tab.text = listOf("简介", "封面", "歌词")[index]
        }.also { it.attach() }
        pager.setCurrentItem(savedInstanceState?.getInt("player-page", 1) ?: 1, false)
        val transport = column().apply { setPadding(dp(24), dp(8), dp(24), dp(12)) }
        title = label("", 21f).apply { maxLines = if (landscape) 1 else 2; setTypeface(typeface, android.graphics.Typeface.BOLD) }
        artist = label("", 14f).apply { maxLines = 1; setTextColor(color(com.google.android.material.R.attr.colorOnSurfaceVariant)) }
        transport.addView(title)
        transport.addView(artist)
        seek = SeekBar(this).apply {
            max = 10000
            contentDescription = "播放进度"
            setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
                override fun onStartTrackingTouch(bar: SeekBar) { dragging = true; player.onSeekStarted() }
                override fun onProgressChanged(bar: SeekBar, progress: Int, fromUser: Boolean) {
                    if (fromUser) {
                        val position = duration * progress / 10000
                        elapsed.text = formatTime(position)
                        if (!dragging) player.onSeekFinished(position)
                    }
                }
                override fun onStopTrackingTouch(bar: SeekBar) {
                    player.onSeekFinished(duration * bar.progress / 10000)
                    dragging = false
                }
            })
        }
        transport.addView(seek, LinearLayout.LayoutParams(-1, dp(48)))
        val times = row()
        elapsed = label("0:00", 12f)
        total = label("0:00", 12f).apply { gravity = Gravity.END }
        times.addView(elapsed, LinearLayout.LayoutParams(0, -2, 1f))
        times.addView(total, LinearLayout.LayoutParams(0, -2, 1f))
        transport.addView(times)
        val buttons = row().apply { gravity = Gravity.CENTER; setPadding(0, dp(8), 0, 0) }
        queueButton = icon(R.drawable.ic_playlist_play, "播放队列") { showQueue() }
        buttons.addView(queueButton)
        buttons.addView(icon(com.github.anrimian.musicplayer.shared.app.R.drawable.ic_skip_previous, "上一首") { player.skipToPrevious() })
        play = icon(com.github.anrimian.musicplayer.shared.app.R.drawable.ic_play, "播放", 76) { player.playOrPause() }.apply {
            backgroundTintList = ColorStateList.valueOf(color(androidx.appcompat.R.attr.colorPrimary))
            iconTint = ColorStateList.valueOf(color(com.google.android.material.R.attr.colorOnPrimary))
            cornerRadius = dp(38)
            iconSize = dp(36)
        }
        buttons.addView(play)
        buttons.addView(icon(com.github.anrimian.musicplayer.shared.app.R.drawable.ic_skip_next, "下一首") { player.skipToNext() })
        buttons.addView(icon(R.drawable.ic_settings, "播放设置") {
            if (supportFragmentManager.findFragmentByTag("playback-settings") == null) {
                PlaybackSettingsDialogFragment.newInstance(pager.currentItem == 2).show(supportFragmentManager, "playback-settings")
            }
        }.apply { iconSize = dp(24); tooltipText = "播放设置" })
        transport.addView(buttons)
        body.addView(transport, if (landscape) LinearLayout.LayoutParams(0, -1, 1f) else LinearLayout.LayoutParams(-1, -2))
        subscriptions.add(player.getCurrentQueueItemObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ event ->
            val track = event.playQueueItem
            currentItemId = track?.itemId
            currentTrack.value = track
            duration = track?.duration ?: 0
            title.text = track?.title ?: "选择一首歌曲"
            artist.text = track?.artist.orEmpty()
            artist.visibility = if (artist.text.isEmpty()) View.GONE else View.VISIBLE
            total.text = formatTime(duration)
            play.isEnabled = track != null
            seek.isEnabled = duration > 0
            updateQueue()
        }, { showError() }))
        subscriptions.add(player.getTrackPositionObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ position ->
            if (!dragging) {
                seek.progress = if (duration > 0) (position * 10000 / duration).toInt() else 0
                elapsed.text = formatTime(position)
            }
        }, { showError() }))
        subscriptions.add(player.getIsPlayingStateObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ playing ->
            play.setIconResource(if (playing) com.github.anrimian.musicplayer.shared.app.R.drawable.ic_pause else com.github.anrimian.musicplayer.shared.app.R.drawable.ic_play)
            play.contentDescription = if (playing) "暂停" else "播放"
        }, { showError() }))
        subscriptions.add(player.getPlayQueueObservable().observeOn(AndroidSchedulers.mainThread()).subscribe({ items ->
            queue = items
            queueButton.contentDescription = "播放队列，共 ${items.size} 首"
            updateQueue()
        }, { showError() }))
    }

    override fun onSaveInstanceState(out: Bundle) {
        out.putInt("player-page", pager.currentItem)
        super.onSaveInstanceState(out)
    }
    private fun showQueue() {
        val dialog = BottomSheetDialog(this)
        val content = column().apply { setPadding(dp(16), dp(12), dp(16), dp(16)) }
        val header = row()
        queueHeading = label("播放队列", 20f)
        header.addView(queueHeading, LinearLayout.LayoutParams(0, dp(56), 1f))
        header.addView(icon(R.drawable.ic_close, "关闭队列") { dialog.dismiss() })
        content.addView(header)
        queueAdapter = ArrayAdapter(this, android.R.layout.simple_list_item_activated_1, mutableListOf())
        queueList = ListView(this).apply {
            adapter = queueAdapter
            choiceMode = ListView.CHOICE_MODE_SINGLE
            divider = null
            setOnItemClickListener { _, _, position, _ ->
                queue.getOrNull(position)?.let { player.skipToItem(it.itemId); player.play() }
            }
            setOnItemLongClickListener { _, _, position, _ ->
                val item = queue.getOrNull(position)
                if (item != null) MaterialAlertDialogBuilder(this@MusicPlayerActivity)
                    .setTitle(item.title).setItems(arrayOf("从队列移除", "向上移动")) { _, action ->
                        val operation = if (action == 0) player.removeQueueItem(item)
                        else queue.getOrNull(position - 1)?.let { player.swapItems(it, item) }
                        if (operation != null) subscriptions.add(operation.observeOn(AndroidSchedulers.mainThread()).subscribe({}, { showError() }))
                    }.show()
                true
            }
        }
        content.addView(queueList, LinearLayout.LayoutParams(-1, (resources.displayMetrics.heightPixels * .55).toInt()))
        dialog.setContentView(content)
        dialog.setOnDismissListener { queueDialog = null; queueAdapter = null; queueList = null; queueHeading = null }
        queueDialog = dialog
        updateQueue()
        dialog.show()
    }
    private fun updateQueue() {
        queueHeading?.text = "播放队列 · ${queue.size} 首"
        queueAdapter?.apply { clear(); addAll(queue.map { it.title }); notifyDataSetChanged() }
        val selected = queue.indexOfFirst { it.itemId == currentItemId }
        if (selected >= 0) queueList?.setItemChecked(selected, true)
    }
    private fun showError() { Toast.makeText(this, "操作失败，请检查音频是否可用", Toast.LENGTH_SHORT).show() }
    private fun column() = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
    private fun row() = LinearLayout(this).apply { gravity = Gravity.CENTER_VERTICAL }
    private fun label(value: String, size: Float) = TextView(this).apply {
        text = value; textSize = size; setTextColor(color(com.google.android.material.R.attr.colorOnSurface))
    }
    private fun textButton(value: String, action: () -> Unit) = MaterialButton(this).apply {
        text = value; minHeight = dp(48); setOnClickListener { action() }
    }
    private fun icon(drawable: Int, description: String, size: Int = 48, action: () -> Unit) = textButton("") { action() }.apply {
        contentDescription = description
        setIconResource(drawable)
        iconSize = dp(26)
        iconGravity = MaterialButton.ICON_GRAVITY_TEXT_START
        iconPadding = 0
        minWidth = 0; minimumWidth = 0
        setPadding(dp(10), 0, dp(10), 0)
        layoutParams = LinearLayout.LayoutParams(dp(size), dp(size))
    }
    private fun color(attr: Int) = MaterialColors.getColor(this, attr, 0)
    private fun dp(value: Int) = (resources.displayMetrics.density * value).toInt()
    private fun formatTime(value: Long): String = String.format(Locale.ROOT, "%d:%02d", value.coerceAtLeast(0) / 60000, value.coerceAtLeast(0) / 1000 % 60)
    override fun onDestroy() {
        tabsMediator?.detach()
        queueDialog?.dismiss()
        subscriptions.dispose()
        super.onDestroy()
    }
}
