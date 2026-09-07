import React from "react";

import {
  ExpandOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import type { Song } from "../../data/musicData";

type MusicLibraryProps = {
  songs: Song[];

  selectedSongId: string;

  isPlaying: boolean;

  onPlay: (
    songId: string
  ) => void;

  onOpenPlayer: (
    song: Song
  ) => void;

  onAddToQueue: (
    song: Song
  ) => void;

  onContextMenu?: (
    event: React.MouseEvent<Element>,
    song: Song
  ) => void;

  title?: string;

  kicker?: string;
};

const MusicLibrary: React.FC<
  MusicLibraryProps
> = ({
  songs,
  selectedSongId,
  isPlaying,
  onPlay,
  onOpenPlayer,
  onAddToQueue,
  onContextMenu,
  title = "Song Library",
  kicker = "TRACKLIST",
}) => {
  return (
    <div className="music-library">
      <div className="music-library-header">
        <div>
          <span className="music-library-kicker">
            {kicker}
          </span>

          <h3>
            {title}
          </h3>

          <p>
            {songs.length}{" "}
            {songs.length === 1
              ? "song"
              : "songs"}
          </p>
        </div>
      </div>

      <div className="music-library-list">
        {songs.map(
          (
            song,
            index
          ) => (
            <MusicLibraryRow
              key={song.id}
              song={song}
              index={index}
              active={
                song.id ===
                selectedSongId
              }
              isPlaying={
                isPlaying &&
                song.id ===
                  selectedSongId
              }
              onPlay={() =>
                onPlay(song.id)
              }
              onOpenPlayer={() =>
                onOpenPlayer(song)
              }
              onAddToQueue={() =>
                onAddToQueue(song)
              }
              onContextMenu={
                onContextMenu
              }
            />
          )
        )}
      </div>
    </div>
  );
};


/* =========================================================
   LIBRARY ROW
========================================================= */

type MusicLibraryRowProps = {
  song: Song;

  index: number;

  active: boolean;

  isPlaying: boolean;

  onPlay: () => void;

  onOpenPlayer: () => void;

  onAddToQueue: () => void;

  onContextMenu?: (
    event: React.MouseEvent<Element>,
    song: Song
  ) => void;
};

const MusicLibraryRow: React.FC<
  MusicLibraryRowProps
> = ({
  song,
  index,
  active,
  isPlaying,
  onPlay,
  onOpenPlayer,
  onAddToQueue,
  onContextMenu,
}) => {
  const [
    imageError,
    setImageError,
  ] = React.useState(false);

  return (
    <div
      className={`music-library-row ${
        active ? "active" : ""
      }`}
      onDoubleClick={onPlay}
      onContextMenu={(event) => {
        event.preventDefault();

        onContextMenu?.(
          event,
          song
        );
      }}
    >
      {/* NUMBER */}

      <div className="library-track-number">
        {isPlaying ? (
          <span className="playing-indicator">
            ♪
          </span>
        ) : (
          <span>
            {index + 1}
          </span>
        )}
      </div>

      {/* IMAGE */}

      {!imageError ? (
        <img
          src={song.image}
          alt={song.title}
          className="library-song-image"
          onError={() =>
            setImageError(true)
          }
        />
      ) : (
        <div className="library-song-image-fallback">
          ♪
        </div>
      )}

      {/* INFO */}

      <div className="library-song-info">
        <strong
          title={song.title}
        >
          {song.title}
        </strong>

        <span
          title={song.artist}
        >
          {song.artist}
        </span>
      </div>

      {/* ACTIONS */}

      <div className="library-song-actions">
        <button
          type="button"
          className="library-action-button"
          onClick={(event) => {
            event.stopPropagation();
            onPlay();
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
            <PlayCircleOutlined />
          )}
        </button>

        <button
          type="button"
          className="library-action-button"
          onClick={(event) => {
            event.stopPropagation();
            onOpenPlayer();
          }}
          title="Open player"
          aria-label="Open player"
        >
          <ExpandOutlined />
        </button>

        <button
          type="button"
          className="library-action-button"
          onClick={(event) => {
            event.stopPropagation();
            onAddToQueue();
          }}
          title="Add to queue"
          aria-label="Add to queue"
        >
          <PlusOutlined />
        </button>
      </div>
    </div>
  );
};

export default MusicLibrary;