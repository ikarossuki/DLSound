package com.github.anrimian.musicplayer.data.database.entities.play_queue

import com.github.anrimian.musicplayer.data.database.entities.composition.CompositionEntity
import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey

@Entity(
    tableName = "track_positions",
    foreignKeys = [
        ForeignKey(
            entity = PlayQueueEntity::class,
            parentColumns = [ "id" ],
            childColumns = [ "queueItemId" ],
            onDelete = ForeignKey.CASCADE
        )
    ]
)
class TrackPositionEntity(
    @PrimaryKey
    val queueItemId: Long,
    val trackPosition: Long,
    val writeTime: Long
)
@Entity(
    tableName = "file_positions",
    foreignKeys = [ForeignKey(entity = CompositionEntity::class, parentColumns = ["id"],
        childColumns = ["audioId"], onDelete = ForeignKey.CASCADE)]
)
class FilePositionEntity(@PrimaryKey val audioId: Long, val trackPosition: Long,
    @androidx.room.ColumnInfo(defaultValue = "0") val lastHeard: Long)
