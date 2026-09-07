import React from "react";

import {
  ExpandOutlined,
  PauseOutlined,
  PlayCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";

import type { Song } from "../../data/musicData";

type MusicCardProps = {
  song: Song;
  isPlaying: boolean;

  onClick: () => void;
  onOpenPlayer: () => void;

  onAddToQueue?: () => void;

  onContextMenu?: (
    event: React.MouseEvent<Element>,
    song: Song
  ) => void;
};

const MusicCard: React.FC<MusicCardProps> = ({
  song,
  isPlaying,
  onClick,
  onOpenPlayer,
  onAddToQueue,
  onContextMenu,
}) => {
  const [imageError, setImageError] =
    React.useState(false);

  return (
    <div
      className={`music-card ${
        isPlaying
          ? "is-playing"
          : ""
      }`}
      onContextMenu={(event) => {
        event.preventDefault();

        onContextMenu?.(
          event,
          song
        );
      }}
      onDoubleClick={
        onClick
      }
    >
      {/* =================================================
          ARTWORK
          ================================================= */}

      <div className="music-card-art">

        {!imageError ? (
          <img
            src={
              song.image
            }
            alt={
              song.title
            }
            onError={() =>
              setImageError(
                true
              )
            }
          />
        ) : (
          <div className="music-card-art-fallback">
            ♪
          </div>
        )}

        <button
          type="button"
          className={`music-card-art-play ${
            isPlaying
              ? "playing"
              : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();

            onClick();
          }}
          aria-label={
            isPlaying
              ? `Pause ${song.title}`
              : `Play ${song.title}`
          }
        >
          {isPlaying ? (
            <PauseOutlined />
          ) : (
            <PlayCircleFilled />
          )}
        </button>
      </div>

      {/* =================================================
          SONG INFORMATION
          ================================================= */}

      <div className="music-card-info">

        <div
          className={`music-card-title ${
            isPlaying
              ? "active"
              : ""
          }`}
          title={
            song.title
          }
        >
          {
            song.title
          }
        </div>

        <div
          className="music-card-artist"
          title={
            song.artist
          }
        >
          {
            song.artist
          }
        </div>

      </div>

      {/* =================================================
          PLAYING INDICATOR
          ================================================= */}

      <div className="music-card-status">

        {isPlaying && (
          <>
            <span />
            <span />
            <span />
          </>
        )}

      </div>

      {/* =================================================
          ACTIONS
          ================================================= */}

      <div className="music-card-actions">

        <button
          type="button"
          className="music-card-action"
          onClick={(event) => {
            event.stopPropagation();

            onClick();
          }}
          title={
            isPlaying
              ? "Pause"
              : "Play"
          }
          aria-label={
            isPlaying
              ? "Pause"
              : "Play"
          }
        >
          {isPlaying ? (
            <PauseOutlined />
          ) : (
            <PlayCircleFilled />
          )}
        </button>

        <button
          type="button"
          className="music-card-action"
          onClick={(event) => {
            event.stopPropagation();

            onOpenPlayer();
          }}
          title="Open player"
          aria-label="Open player"
        >
          <ExpandOutlined />
        </button>

        {onAddToQueue && (
          <button
            type="button"
            className="music-card-action"
            onClick={(event) => {
              event.stopPropagation();

              onAddToQueue();
            }}
            title="Add to queue"
            aria-label="Add to queue"
          >
            <PlusOutlined />
          </button>
        )}

      </div>
    </div>
  );
};

export default MusicCard;