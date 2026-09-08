import React, { useMemo, useState } from "react";

import {
  DownOutlined,
  PauseOutlined,
  PlayCircleFilled,
  FullscreenOutlined,
} from "@ant-design/icons";

import type { Song } from "../data/musicData";

import "../styles/GoToSongs.css";

type GoToSongsProps = {
  songs: Song[];
  selectedSongId: string | null;
  isPlaying: boolean;
  onPlay: (songId: string) => void;
  onOpenPlayer: () => void;
};

const GoToSongs: React.FC<GoToSongsProps> = ({
  songs,
  selectedSongId,
  isPlaying,
  onPlay,
  onOpenPlayer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortedSongs = useMemo(() => {
    return [...songs].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }, [songs]);

  return (
    <section className="go-to-songs-section">
      <div className="go-to-songs-container">

        {/* =========================
            PLAYLIST BUTTON
        ========================= */}

        <button
          type="button"
          className={`go-to-songs-toggle ${
            isOpen ? "open" : ""
          }`}
          onClick={() =>
            setIsOpen((previous) => !previous)
          }
          aria-expanded={isOpen}
        >
          <div className="go-to-songs-toggle-left">
            <span className="go-to-songs-eyebrow">
              MY PLAYLIST
            </span>

            <h2>
              Go-To Songs
            </h2>

            <p>
              the songs i always end up coming back to.
            </p>
          </div>

          <div className="go-to-songs-toggle-right">
            <span className="go-to-songs-count">
              {sortedSongs.length} songs
            </span>

            <span className="go-to-songs-arrow">
              <DownOutlined />
            </span>
          </div>
        </button>

        {/* =========================
            SONG LIST
        ========================= */}

        <div
          className={`go-to-songs-list-wrapper ${
            isOpen ? "visible" : ""
          }`}
        >
          <div className="go-to-songs-list">

            {sortedSongs.map(
              (song, index) => {
                const isCurrent =
                  selectedSongId === song.id;

                return (
                  <div
                    key={song.id}
                    className={`go-to-song-row ${
                      isCurrent
                        ? "active"
                        : ""
                    }`}
                  >

                    {/* NUMBER */}

                    <span className="go-to-song-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    {/* IMAGE */}

                    <img
                      src={song.image}
                      alt={song.title}
                      className="go-to-song-image"
                    />

                    {/* SONG INFO */}

                    <button
                      type="button"
                      className="go-to-song-main"
                      onClick={() =>
                        onPlay(song.id)
                      }
                    >
                      <div className="go-to-song-info">
                        <h3>
                          {song.title}
                        </h3>

                        <p>
                          {song.artist}
                        </p>
                      </div>
                    </button>

                    {/* OPEN PLAYER */}

                    <button
                      type="button"
                      className="go-to-song-player-button"
                      onClick={(
                        event
                      ) => {
                        event.stopPropagation();
                        onOpenPlayer();
                      }}
                      aria-label="Open music player"
                      title="Open player"
                    >
                      <FullscreenOutlined />
                    </button>

                    {/* PLAY */}

                    <button
                      type="button"
                      className="go-to-song-play"
                      onClick={(
                        event
                      ) => {
                        event.stopPropagation();
                        onPlay(song.id);
                      }}
                      aria-label={
                        isCurrent &&
                        isPlaying
                          ? "Pause song"
                          : "Play song"
                      }
                    >
                      {isCurrent &&
                      isPlaying ? (
                        <PauseOutlined />
                      ) : (
                        <PlayCircleFilled />
                      )}
                    </button>

                  </div>
                );
              }
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default GoToSongs;