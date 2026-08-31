import { useRef, useState } from "react";
import {
  Button,
  Modal,
  Progress,
  Space,
  Typography,
} from "antd";

import {
  PlayCircleFilled,
  PauseCircleFilled,
  StepBackwardFilled,
  StepForwardFilled,
  SoundOutlined,
  StarFilled,
} from "@ant-design/icons";

import "./Music.css";

import albumImage from "../assets/loved-you-first.jpg";

const { Text } = Typography;

type SongPart = {
  label: string;
  time: number;
};

const songParts: SongPart[] = [
  {
    label: "INTRO",
    time: 8,
  },
  {
    label: "CHORUS",
    time: 31,
  },
  {
    label: "⭐ THIS PARTTT",
    time: 121,
  },
];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function Music() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [favoriteActive, setFavoriteActive] = useState(false);

  const playSong = () => {
    if (!audioRef.current) return;

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        console.log("Audio could not be played.");
      });
  };

  const pauseSong = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  };

  const jumpTo = (seconds: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);

    if (!isPlaying) {
      playSong();
    }

    if (seconds === 121) {
      setFavoriteActive(true);
    } else {
      setFavoriteActive(false);
    }
  };

  const nextPart = () => {
    if (!audioRef.current) return;

    const next = Math.min(
      audioRef.current.currentTime + 10,
      duration
    );

    audioRef.current.currentTime = next;
    setCurrentTime(next);
  };

  const previousPart = () => {
    if (!audioRef.current) return;

    const previous = Math.max(
      audioRef.current.currentTime - 10,
      0
    );

    audioRef.current.currentTime = previous;
    setCurrentTime(previous);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const time = audioRef.current.currentTime;

    setCurrentTime(time);

    if (time >= 121 && time < 130) {
      setFavoriteActive(true);
    }
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;

  return (
    <>
      {/* =====================================================
          AUDIO
      ===================================================== */}

      <audio
        ref={audioRef}
        src="/music/loved-you-first.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* =====================================================
          MUSIC SECTION
      ===================================================== */}

      <section id="music" className="music-section">

        <div className="music-section-heading">
          <span className="section-eyebrow">
            CURRENT OBSESSION
          </span>

          <h2>
            song stuck in my head.
          </h2>

          <p>
            click it. you might get stuck with it too.
          </p>
        </div>

        {/* =====================================================
            MUSIC CARD
        ===================================================== */}

        <div className="music-card">

          <img
            src={albumImage}
            alt="Loved You First"
            className="music-card-image"
          />

          <div className="music-card-info">

            <span className="music-card-label">
              CURRENT OBSESSION
            </span>

            <h3>
              Loved You First
            </h3>

            <p>
              One Direction
            </p>

            <button
              className="open-player-button"
              onClick={() => setIsOpen(true)}
            >
              <PlayCircleFilled />
              open player
            </button>

          </div>

          <Button
            type="primary"
            shape="circle"
            size="large"
            className="card-play-button"
            icon={
              isPlaying ? (
                <PauseCircleFilled />
              ) : (
                <PlayCircleFilled />
              )
            }
            onClick={togglePlay}
          />

        </div>

      </section>

      {/* =====================================================
          PLAYER MODAL
      ===================================================== */}

      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
        className="music-player-modal"
        width={1000}
      >

        <div className="spotify-player">

          {/* =================================================
              TOP
          ================================================= */}

          <div className="spotify-top">

            <div className="spotify-song-title">
              <span>
                Meseeks.exe • Music
              </span>

              <h1>
                Loved You First
              </h1>

              <p>
                One Direction
              </p>
            </div>

            <Button
              className="switch-button"
              icon={<SoundOutlined />}
            >
              Meseeks mode
            </Button>

          </div>


          {/* =================================================
              ALBUM IMAGE
          ================================================= */}

          <div className="spotify-album-wrapper">

            <img
              src={albumImage}
              alt="Loved You First album art"
              className="spotify-album"
            />

          </div>


          {/* =================================================
              SONG INFO
          ================================================= */}

          <div className="spotify-song-info">

            <div>
              <h2>
                Loved You First
              </h2>

              <p>
                One Direction
              </p>
            </div>

            <StarFilled
              className="favorite-star"
            />

          </div>


          {/* =================================================
              PROGRESS
          ================================================= */}

          <div className="spotify-progress">

            <Text>
              {formatTime(currentTime)}
            </Text>

            <Progress
              percent={progress}
              showInfo={false}
              strokeColor="#ff2020"
              trailColor="#555"
            />

            <Text>
              {formatTime(duration)}
            </Text>

          </div>


          {/* =================================================
              CONTROLS
          ================================================= */}

          <div className="spotify-controls">

            <Button
              type="text"
              icon={<StepBackwardFilled />}
              onClick={previousPart}
            />

            <Button
              type="primary"
              shape="circle"
              className="spotify-main-play"
              icon={
                isPlaying ? (
                  <PauseCircleFilled />
                ) : (
                  <PlayCircleFilled />
                )
              }
              onClick={togglePlay}
            />

            <Button
              type="text"
              icon={<StepForwardFilled />}
              onClick={nextPart}
            />

          </div>


          {/* =================================================
              JUMP TO PART
          ================================================= */}

          <div className="jump-section">

            <span className="jump-label">
              JUMP TO A PART
            </span>

            <Space
              wrap
              className="jump-buttons"
            >

              {songParts.map((part) => (
                <Button
                  key={part.label}
                  onClick={() => jumpTo(part.time)}
                  className={
                    part.time === 121 && favoriteActive
                      ? "jump-button favorite-jump"
                      : "jump-button"
                  }
                >
                  {part.label}
                </Button>
              ))}

            </Space>

          </div>


          {/* =================================================
              FAVORITE PART
          ================================================= */}

          {favoriteActive && (
            <div className="favorite-part">

              <div className="favorite-part-title">
                ⭐ THIS PARTTTT ⭐
              </div>

              <div className="favorite-part-emojis">
                😭 ❤️‍🔥 🫶 🗣️ 🔥
              </div>

              <span>
                yeah... this is the one.
              </span>

            </div>
          )}

        </div>

      </Modal>
    </>
  );
}