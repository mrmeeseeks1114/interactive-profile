import React from "react";

import {
  BackwardOutlined,
  CaretRightOutlined,
  ForwardOutlined,
  PauseOutlined,
} from "@ant-design/icons";

import {
  Button,
  Slider,
} from "antd";

type MusicControlsProps = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;

  onPrevious: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  onSeek: (value: number) => void;

  formatTime: (
    seconds: number
  ) => string;
};

const MusicControls: React.FC<
  MusicControlsProps
> = ({
  isPlaying,
  currentTime,
  duration,
  onPrevious,
  onPlayPause,
  onNext,
  onSeek,
  formatTime,
}) => {
  return (
    <>
      <div className="old-player-progress">
        <span>
          {formatTime(currentTime)}
        </span>

        <div className="old-player-slider">
          <Slider
            min={0}
            max={duration || 0}
            value={Math.min(
              currentTime,
              duration || 0
            )}
            onChange={(value) =>
              onSeek(Number(value))
            }
            tooltip={{
              formatter: (value) =>
                formatTime(
                  Number(value ?? 0)
                ),
            }}
          />
        </div>

        <span>
          {formatTime(duration)}
        </span>
      </div>

      <div className="old-player-controls">
        <Button
          type="text"
          icon={<BackwardOutlined />}
          onClick={onPrevious}
        />

        <Button
          type="primary"
          shape="circle"
          className="old-main-play"
          icon={
            isPlaying ? (
              <PauseOutlined />
            ) : (
              <CaretRightOutlined />
            )
          }
          onClick={onPlayPause}
        />

        <Button
          type="text"
          icon={<ForwardOutlined />}
          onClick={onNext}
        />
      </div>
    </>
  );
};

export default MusicControls;