import React from "react";

import {
  PlayCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import type {
  Song,
} from "../../data/musicData";

type MusicContextMenuProps = {
  song: Song | null;

  x: number;
  y: number;

  visible: boolean;

  onPlayNow: (song: Song) => void;
  onAddToQueue: (song: Song) => void;
  onClose: () => void;
};

const MusicContextMenu: React.FC<
  MusicContextMenuProps
> = ({
  song,
  x,
  y,
  visible,
  onPlayNow,
  onAddToQueue,
  onClose,
}) => {
  if (!visible || !song) {
    return null;
  }

  return (
    <div
      className="music-context-menu"
      style={{
        left: x,
        top: y,
      }}
      onClick={(event) =>
        event.stopPropagation()
      }
    >
      <div className="context-menu-song">
        <img
          src={song.image}
          alt={song.title}
        />

        <div>
          <strong>{song.title}</strong>
          <span>{song.artist}</span>
        </div>
      </div>

      <div className="context-menu-divider" />

      <button
        type="button"
        className="context-menu-item"
        onClick={() => {
          onPlayNow(song);
          onClose();
        }}
      >
        <PlayCircleOutlined />
        Play Now
      </button>

      <button
        type="button"
        className="context-menu-item"
        onClick={() => {
          onAddToQueue(song);
          onClose();
        }}
      >
        <PlusOutlined />
        Add to Queue
      </button>
    </div>
  );
};

export default MusicContextMenu;