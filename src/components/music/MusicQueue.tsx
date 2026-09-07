import React from "react";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

import { Button } from "antd";

import type {
  Song,
} from "../../data/musicData";

type MusicQueueProps = {
  queue: Song[];

  onPlay: (song: Song) => void;
  onRemove: (songId: string) => void;

  onMove: (
    index: number,
    direction: "up" | "down"
  ) => void;

  onClear: () => void;
};

const MusicQueue: React.FC<
  MusicQueueProps
> = ({
  queue,
  onPlay,
  onRemove,
  onMove,
  onClear,
}) => {
  return (
    <div className="old-player-queue">
      <div className="queue-title-row">
        <div>
          <span className="old-player-section-title">
            QUEUE
          </span>

          <h3>
            Up Next
          </h3>
        </div>

        {queue.length > 0 && (
          <Button
            type="text"
            danger
            onClick={onClear}
          >
            Clear
          </Button>
        )}
      </div>

      {queue.length === 0 ? (
        <div className="queue-empty">
          <PlayCircleOutlined />

          <span>
            Your queue is empty
          </span>

          <small>
            Add songs to see what's
            coming next.
          </small>
        </div>
      ) : (
        <div className="queue-list">
          {queue.map(
            (song, index) => (
              <div
                className="queue-row"
                key={`${song.id}-${index}`}
              >
                <span className="queue-number">
                  {index + 1}
                </span>

                <img
                  src={song.image}
                  alt={song.title}
                />

                <div className="queue-row-info">
                  <strong>
                    {song.title}
                  </strong>

                  <span>
                    {song.artist}
                  </span>
                </div>

                <div className="queue-row-actions">
                  <Button
                    type="text"
                    icon={
                      <PlayCircleOutlined />
                    }
                    onClick={() =>
                      onPlay(song)
                    }
                  />

                  <Button
                    type="text"
                    icon={
                      <ArrowUpOutlined />
                    }
                    disabled={
                      index === 0
                    }
                    onClick={() =>
                      onMove(
                        index,
                        "up"
                      )
                    }
                  />

                  <Button
                    type="text"
                    icon={
                      <ArrowDownOutlined />
                    }
                    disabled={
                      index ===
                      queue.length - 1
                    }
                    onClick={() =>
                      onMove(
                        index,
                        "down"
                      )
                    }
                  />

                  <Button
                    type="text"
                    danger
                    icon={
                      <DeleteOutlined />
                    }
                    onClick={() =>
                      onRemove(
                        song.id
                      )
                    }
                  />
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MusicQueue;