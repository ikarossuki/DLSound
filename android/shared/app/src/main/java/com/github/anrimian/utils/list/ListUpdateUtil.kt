package com.github.anrimian.utils.list

import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListUpdateCallback
import androidx.recyclerview.widget.RecyclerView
import com.github.anrimian.musicplayer.ui.utils.views.recycler_view.diff_utils.SimpleDiffCallback
import java.util.LinkedList

object ListUpdateUtil {

    fun <T> calculateDiff(
        oldList: List<T>,
        newList: List<T>,
        contentCheckFunction: (oldItem: T, newItem: T) -> Boolean,
    ): List<ListUpdateCommand<T>> {
        val result = DiffUtil.calculateDiff(
            SimpleDiffCallback(oldList, newList, contentCheckFunction)
        )
        val updates = LinkedList<ListUpdateCommand<T>>()

        result.dispatchUpdatesTo(object: ListUpdateCallback {
            override fun onInserted(position: Int, count: Int) {
                updates.add(ListUpdateCommand.StubInsert(position, count))
            }

            override fun onRemoved(position: Int, count: Int) {
                repeat(count) { updates.add(ListUpdateCommand.Remove(position)) }
            }

            override fun onMoved(fromPosition: Int, toPosition: Int) {
                updates.add(ListUpdateCommand.Move(fromPosition, toPosition))
            }

            override fun onChanged(position: Int, count: Int, payload: Any?) {
                // Content replacements use final positions after all structural edits.
            }
        })


        newList.forEachIndexed { index, item ->
            val newIndex = result.convertNewPositionToOld(index)
            if (newIndex == RecyclerView.NO_POSITION) {
                updates.add(ListUpdateCommand.Insert(index, item))
            } else if (!contentCheckFunction(oldList[newIndex], item)) {
                updates.add(ListUpdateCommand.Update(index, item))
            }
        }
        return updates
    }

    fun <T> applyDiff(list: ArrayList<T>, updates: List<ListUpdateCommand<T>>) {
        updates.forEach { command ->
            when(command) {
                is ListUpdateCommand.StubInsert -> {
                    for (i in command.position..<command.position + command.count) {
                        @Suppress("UNCHECKED_CAST")
                        list.add(i, null as T)
                    }
                }
                is ListUpdateCommand.Insert -> {
                    list[command.index] = command.item
                }
                is ListUpdateCommand.Remove -> {
                    list.removeAt(command.index)
                }
                is ListUpdateCommand.Move -> {
                    list.add(command.to, list.removeAt(command.from))
                }
                is ListUpdateCommand.Update -> {
                    list[command.index] = command.item
                }
            }
        }
    }

}

sealed interface ListUpdateCommand<T> {
    class StubInsert<T>(val position: Int, val count: Int): ListUpdateCommand<T>
    class Insert<T>(val index: Int, val item: T): ListUpdateCommand<T>
    class Remove<T>(val index: Int): ListUpdateCommand<T>
    class Move<T>(val from: Int, val to: Int): ListUpdateCommand<T>
    class Update<T>(val index: Int, val item: T): ListUpdateCommand<T>
}

/** for debug purposes */
fun <T> List<ListUpdateCommand<T>>.toString(itemToString: (T) -> String): String {
    val sb = StringBuilder()
    forEach { command ->
        when(command) {
            is ListUpdateCommand.StubInsert -> {
                sb.append("\nStubInsert: position:${command.position}, count:${command.count}")
            }
            is ListUpdateCommand.Insert -> {
                sb.append("\nInsert: [${command.index}] = ${itemToString(command.item)}")
            }
            is ListUpdateCommand.Remove -> {
                sb.append("\nRemove: [${command.index}]")
            }
            is ListUpdateCommand.Move -> {
                sb.append("\nMove: [${command.from}] = ${command.to}")
            }
            is ListUpdateCommand.Update -> {
                sb.append("\nUpdate: [${command.index}] = ${itemToString(command.item)}")
            }
        }
    }
    return sb.toString()
}
