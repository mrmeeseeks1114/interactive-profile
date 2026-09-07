import React from "react";

import {
  CloseOutlined,
  HeartFilled,
  MenuOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  SwapOutlined,
} from "@ant-design/icons";

import type { Song } from "../../data/musicData";

import MusicSettings from "./MusicSettings";
import QuickMoments from "./QuickMoments";

type MusicPlayerProps = {
  song?: Song;

  isPlaying: boolean;

  currentTime: number;
  duration: number;

  favoriteActive: boolean;

  shuffle: boolean;
  autoNext: boolean;

  queueLength: number;

  onClose: () => void;
  onToggleQueue: () => void;

  onPrevious: () => void;
  onPlayPause: () => void;
  onNext: () => void;

  onSeek: (value: number) => void;

  onToggleShuffle: () => void;
  onToggleAutoNext: () => void;

  formatTime: (seconds: number) => string;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isPlaying,
  currentTime,
  duration,
  favoriteActive,
  shuffle,
  autoNext,
  queueLength,
  onClose,
  onToggleQueue,
  onPrevious,
  onPlayPause,
  onNext,
  onSeek,
  onToggleShuffle,
  onToggleAutoNext,
  formatTime,
}) => {
  if (!song) {
    return null;
  }

  const progress = duration
    ? Math.min((currentTime / duration) * 100, 100)
    : 0;

  return (
    <div className="spotify-player">
      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="spotify-player-topbar">
        <div className="spotify-player-top-left">
          <span className="spotify-player-dot" />
          <span>NOW PLAYING</span>
        </div>

        <button
          type="button"
          className="spotify-player-close"
          onClick={onClose}
          aria-label="Close player"
        >
          <CloseOutlined />
        </button>
      </div>

      {/* =====================================================
          MAIN PLAYER
      ===================================================== */}

      <div className="spotify-player-main">
        {/* =================================================
            ALBUM ART
        ================================================= */}

        <div className="spotify-art-column">
          <div
            className={`spotify-large-art ${
              isPlaying ? "is-playing" : ""
            }`}
          >
            <img
              src={song.image}
              alt={song.title}
            />

            {isPlaying && (
              <div className="spotify-art-overlay">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <div className="spotify-art-caption">
            <span>PLAYING FROM YOUR LIBRARY</span>
          </div>
        </div>

        {/* =================================================
            PLAYER CONTENT
        ================================================= */}

        <div className="spotify-player-content">
          {/* SONG INFO */}

          <div className="spotify-song-header">
            <div className="spotify-song-text">
              <span className="spotify-song-kicker">
                {isPlaying ? "NOW PLAYING" : "PAUSED"}
              </span>

              <h1>{song.title}</h1>

              <p>{song.artist}</p>
            </div>

            <button
              type="button"
              className={`spotify-heart ${
                favoriteActive ? "active" : ""
              }`}
              aria-label="Favorite"
            >
              <HeartFilled />
            </button>
          </div>

          {/* PROGRESS */}

          <div className="spotify-progress-section">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              disabled={!duration}
              onChange={(event) =>
                onSeek(Number(event.target.value))
              }
              className="spotify-progress-slider"
              style={
                {
                  "--progress": `${progress}%`,
                } as React.CSSProperties
              }
              aria-label="Song progress"
            />

            <div className="spotify-time-row">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* MAIN CONTROLS */}

          <div className="spotify-main-controls">
            <button
              type="button"
              className={`spotify-secondary-control ${
                shuffle ? "active" : ""
              }`}
              onClick={onToggleShuffle}
              aria-label="Toggle shuffle"
              title="Shuffle"
            >
              <SwapOutlined />
            </button>

            <button
              type="button"
              className="spotify-skip-control"
              onClick={onPrevious}
              aria-label="Previous song"
              title="Previous"
            >
              <StepBackwardOutlined />
            </button>

            <button
              type="button"
              className="spotify-play-control"
              onClick={onPlayPause}
              aria-label={
                isPlaying ? "Pause" : "Play"
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
              className="spotify-skip-control"
              onClick={onNext}
              aria-label="Next song"
              title="Next"
            >
              <StepForwardOutlined />
            </button>

            <button
              type="button"
              className={`spotify-secondary-control ${
                autoNext ? "active" : ""
              }`}
              onClick={onToggleAutoNext}
              aria-label="Toggle auto next"
              title="Auto next"
            >
              <span className="spotify-repeat-icon">
                ↻
              </span>
            </button>
          </div>

          {/* SETTINGS */}

          <div className="spotify-player-options">
            <button
              type="button"
              className="spotify-queue-control"
              onClick={onToggleQueue}
            >
              <MenuOutlined />

              <span>Queue</span>

              {queueLength > 0 && (
                <strong>{queueLength}</strong>
              )}
            </button>

            <MusicSettings
              shuffle={shuffle}
              autoNext={autoNext}
              onToggleShuffle={onToggleShuffle}
              onToggleAutoNext={onToggleAutoNext}
            />
          </div>

          {/* QUICK MOMENTS */}

          <div className="spotify-quick-section">
            <QuickMoments
              song={song}
              currentTime={currentTime}
              onSeek={onSeek}
            />
          </div>

          {favoriteActive && (
            <div className="spotify-favorite-message">
              <HeartFilled />
              <span>MY FAVORITE PART</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;