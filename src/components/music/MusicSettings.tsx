import React from "react";

import {
  RetweetOutlined,
  SwapOutlined,
} from "@ant-design/icons";

import { Button } from "antd";

type MusicSettingsProps = {
  shuffle: boolean;
  autoNext: boolean;

  onToggleShuffle: () => void;
  onToggleAutoNext: () => void;
};

const MusicSettings: React.FC<
  MusicSettingsProps
> = ({
  shuffle,
  autoNext,
  onToggleShuffle,
  onToggleAutoNext,
}) => {
  return (
    <div className="old-player-section">
      <span className="old-player-section-title">
        PLAYBACK SETTINGS
      </span>

      <div className="old-player-buttons">
        <Button
          className={
            shuffle
              ? "old-jump-button selected"
              : "old-jump-button"
          }
          icon={<SwapOutlined />}
          onClick={onToggleShuffle}
        >
          Shuffle {shuffle ? "ON" : "OFF"}
        </Button>

        <Button
          className={
            autoNext
              ? "old-jump-button selected"
              : "old-jump-button"
          }
          icon={<RetweetOutlined />}
          onClick={onToggleAutoNext}
        >
          Auto Next {autoNext ? "ON" : "OFF"}
        </Button>
      </div>
    </div>
  );
};

export default MusicSettings;