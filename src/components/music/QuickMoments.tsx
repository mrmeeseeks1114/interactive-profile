import React from "react";

import { Button } from "antd";

import type {
  Song,
} from "../../data/musicData";

type QuickMomentsProps = {
  song?: Song;

  currentTime: number;

  onSeek: (time: number) => void;
};

const QuickMoments: React.FC<
  QuickMomentsProps
> = ({
  song,
  currentTime,
  onSeek,
}) => {
  if (!song?.parts?.length) {
    return null;
  }

  return (
    <div className="old-player-section">
      <span className="old-player-section-title">
        QUICK MOMENTS
      </span>

      <div className="old-player-buttons">
        {song.parts.map((part) => {
          const isActive =
            Math.abs(
              currentTime - part.time
            ) < 2;

          return (
            <Button
              key={`${part.label}-${part.time}`}
              className={
                isActive
                  ? "old-jump-button favorite"
                  : "old-jump-button"
              }
              onClick={() =>
                onSeek(part.time)
              }
            >
              {part.label}
              {" "}
              {Math.floor(
                part.time / 60
              )}
              :
              {Math.floor(
                part.time % 60
              )
                .toString()
                .padStart(2, "0")}
            </Button>
          );
        })}
      </div>

      <div className="old-ten-second-controls">
        <Button
          onClick={() =>
            onSeek(
              Math.max(
                0,
                currentTime - 10
              )
            )
          }
        >
          −10 sec
        </Button>

        <Button
          onClick={() =>
            onSeek(
              Math.min(
                song.parts?.length
                  ? Infinity
                  : currentTime + 10,
                currentTime + 10
              )
            )
          }
        >
          +10 sec
        </Button>
      </div>
    </div>
  );
};

export default QuickMoments;