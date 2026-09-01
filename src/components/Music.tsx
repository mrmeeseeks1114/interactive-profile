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
import girlIsMineImage from "../assets/the-girl-is-mine.jpg";
import signOfTheTimesImage from "../assets/sign-of-the-times.jpg";

const { Text } = Typography;

// =====================================================
// TYPES
// =====================================================

type SongPart = {
  label: string;
  time: number;
};

type Song = {
  id: string;
  title: string;
  artist: string;
  image: string;
  audio: string;
  parts: SongPart[];
  favoriteTime: number;
};

// =====================================================
// SONG DATA
// =====================================================

const songs: Song[] = [
  {
    id: "loved-you-first",

    title: "Loved You First",

    artist: "One Direction",

    image: albumImage,

    audio: "/music/loved-you-first.mp3",

    parts: [
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
    ],

    favoriteTime: 121,
  },

  {
    id: "the-girl-is-mine",

    title: "The Girl Is Mine",

    artist: "Michael Jackson & Paul McCartney",

    image: girlIsMineImage,

    audio: "/music/the-girl-is-mine.mp3",

    parts: [
      {
        label: "INTRO",
        time: 12,
      },
      {
        label: "CHORUS",
        time: 29,
      },
      {
        label: "⭐ THIS PARTTT",
        time: 94,
      },
      {
        label: "ANOTHER GREAT PART",
        time: 140,
      },
      {
        label: "PEAK CONVO",
        time: 180,
      },
    ],

    favoriteTime: 94,
  },

  {
    id: "sign-of-the-times",

    title: "Sign of the Times",

    artist: "Harry Styles",

    image: signOfTheTimesImage,

    audio: "/music/sign-of-the-times.mp3",

    parts: [
      {
        label: "INTRO",
        time: 17,
      },
      {
        label: "CHORUS",
        time: 78,
      },
      {
        label: "⭐ THIS PARTTT",
        time: 240,
      },
    ],

    favoriteTime: 240,
  },
];

// =====================================================
// FORMAT TIME
// =====================================================

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);

  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// =====================================================
// MUSIC COMPONENT
// =====================================================

export default function Music() {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  // ===================================================
  // SELECTED SONG
  // ===================================================

  const [selectedSongId, setSelectedSongId] =
    useState("loved-you-first");

  const selectedSong =
    songs.find(
      (song) =>
        song.id === selectedSongId
    ) || songs[0];

  // ===================================================
  // PLAYER STATE
  // ===================================================

  const [isOpen, setIsOpen] =
    useState(false);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [favoriteActive, setFavoriteActive] =
    useState(false);

  // ===================================================
  // CHANGE SONG
  // ===================================================

  const changeSong = (
    songId: string,
    shouldPlay = false
  ) => {
    const song = songs.find(
      (item) =>
        item.id === songId
    );

    if (!song) return;

    const wasPlaying = isPlaying;

    // Stop the current song
    if (audioRef.current) {
      audioRef.current.pause();

      audioRef.current.currentTime = 0;
    }

    setSelectedSongId(songId);

    setCurrentTime(0);

    setDuration(0);

    setFavoriteActive(false);

    setIsPlaying(false);

    /*
      If the previous song was playing,
      continue playing the new song.

      shouldPlay is used when clicking
      the play button of another song.
    */

    if (shouldPlay || wasPlaying) {
      setTimeout(() => {
        if (!audioRef.current) return;

        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }, 50);
    }
  };

  // ===================================================
  // PLAY SONG
  // ===================================================

  const playSong = () => {
    if (!audioRef.current) return;

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        console.log(
          "Audio could not be played."
        );
      });
  };

  // ===================================================
  // PAUSE SONG
  // ===================================================

  const pauseSong = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();

    setIsPlaying(false);
  };

  // ===================================================
  // TOGGLE PLAY
  // ===================================================

  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  };

  // ===================================================
  // OPEN PLAYER
  // ===================================================

  /*
    IMPORTANT:

    Opening the player ONLY opens the modal.

    It does NOT:
    - pause the music
    - restart the music
    - change the song
  */

  const openPlayer = () => {
    setIsOpen(true);
  };

  // ===================================================
  // CLOSE PLAYER
  // ===================================================

  /*
    Closing the player also DOES NOT
    stop the music.
  */

  const closePlayer = () => {
    setIsOpen(false);
  };

  // ===================================================
  // JUMP TO SONG PART
  // ===================================================

  const jumpTo = (seconds: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime =
      seconds;

    setCurrentTime(seconds);

    if (!isPlaying) {
      playSong();
    }

    if (
      seconds ===
      selectedSong.favoriteTime
    ) {
      setFavoriteActive(true);
    } else {
      setFavoriteActive(false);
    }
  };

  // ===================================================
  // NEXT 10 SECONDS
  // ===================================================

  const nextPart = () => {
    if (!audioRef.current) return;

    const next = Math.min(
      audioRef.current.currentTime + 10,
      duration
    );

    audioRef.current.currentTime =
      next;

    setCurrentTime(next);
  };

  // ===================================================
  // PREVIOUS 10 SECONDS
  // ===================================================

  const previousPart = () => {
    if (!audioRef.current) return;

    const previous = Math.max(
      audioRef.current.currentTime - 10,
      0
    );

    audioRef.current.currentTime =
      previous;

    setCurrentTime(previous);
  };

  // ===================================================
  // TIME UPDATE
  // ===================================================

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const time =
      audioRef.current.currentTime;

    setCurrentTime(time);

    if (
      time >= selectedSong.favoriteTime &&
      time <
        selectedSong.favoriteTime + 9
    ) {
      setFavoriteActive(true);
    } else {
      setFavoriteActive(false);
    }
  };

  // ===================================================
  // LOADED METADATA
  // ===================================================

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(
      audioRef.current.duration
    );
  };

  // ===================================================
  // SONG ENDED
  // ===================================================

  const handleEnded = () => {
    setIsPlaying(false);

    setCurrentTime(0);

    setFavoriteActive(false);
  };

  // ===================================================
  // PROGRESS
  // ===================================================

  const progress =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <>
      {/* =================================================
          AUDIO PLAYER

          This stays mounted even when
          the modal is closed.

          Therefore opening or closing
          the player does NOT stop music.
      ================================================= */}

      <audio
        ref={audioRef}
        src={selectedSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={
          handleLoadedMetadata
        }
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* =================================================
          MUSIC SECTION
      ================================================= */}

      <section
        id="music"
        className="music-section"
      >
        <div className="music-section-heading">

          <span className="section-eyebrow">
            CURRENT OBSESSION
          </span>

          <h2>
            songs stuck in my head.
          </h2>

          <p>
            click one. you might get
            stuck with it too.
          </p>

        </div>

        {/* =================================================
            SONG CARDS
        ================================================= */}

        <div className="music-card-list">

          {songs.map((song) => (

            <div
              className={`music-card ${
                selectedSong.id ===
                song.id
                  ? "active-song"
                  : ""
              }`}
              key={song.id}
            >

              {/* IMAGE */}

              <img
                src={song.image}
                alt={`${song.title} album art`}
                className="music-card-image"
              />

              {/* INFO */}

              <div className="music-card-info">

                <span className="music-card-label">

                  {selectedSong.id ===
                  song.id
                    ? "CURRENT OBSESSION"
                    : "STUCK IN MY HEAD"}

                </span>

                <h3>
                  {song.title}
                </h3>

                <p>
                  {song.artist}
                </p>

                {/* OPEN PLAYER */}

                <button
                  className="open-player-button"
                  onClick={openPlayer}
                >
                  <PlayCircleFilled />

                  open player
                </button>

              </div>

              {/* PLAY BUTTON */}

              <Button
                type="primary"
                shape="circle"
                size="large"
                className="card-play-button"
                icon={
                  selectedSong.id ===
                    song.id &&
                  isPlaying ? (
                    <PauseCircleFilled />
                  ) : (
                    <PlayCircleFilled />
                  )
                }
                onClick={() => {

                  /*
                    Different song:
                    switch and play it.
                  */

                  if (
                    selectedSong.id !==
                    song.id
                  ) {
                    changeSong(
                      song.id,
                      true
                    );

                    return;
                  }

                  /*
                    Same song:
                    normal play/pause.
                  */

                  togglePlay();
                }}
              />

            </div>

          ))}

        </div>
      </section>

      {/* =================================================
          PLAYER MODAL
      ================================================= */}

      <Modal
        open={isOpen}
        onCancel={closePlayer}
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
                {selectedSong.title}
              </h1>

              <p>
                {selectedSong.artist}
              </p>

            </div>

            <Button
              className="switch-button"
              icon={
                <SoundOutlined />
              }
            >
              Meseeks mode
            </Button>

          </div>

          {/* =================================================
              ALBUM IMAGE
          ================================================= */}

          <div className="spotify-album-wrapper">

            <img
              src={selectedSong.image}
              alt={`${selectedSong.title} album art`}
              className="spotify-album"
            />

          </div>

          {/* =================================================
              SONG INFO
          ================================================= */}

          <div className="spotify-song-info">

            <div>

              <h2>
                {selectedSong.title}
              </h2>

              <p>
                {selectedSong.artist}
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
              icon={
                <StepBackwardFilled />
              }
              onClick={
                previousPart
              }
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
              onClick={
                togglePlay
              }
            />

            <Button
              type="text"
              icon={
                <StepForwardFilled />
              }
              onClick={nextPart}
            />

          </div>

          {/* =================================================
              SWITCH SONG
          ================================================= */}

          <div className="jump-section">

            <span className="jump-label">
              SWITCH SONG
            </span>

            <Space
              wrap
              className="jump-buttons"
            >

              {songs.map((song) => (

                <Button
                  key={song.id}
                  onClick={() => {

                    /*
                      If a song is currently
                      playing, changeSong()
                      continues playing.
                    */

                    changeSong(
                      song.id
                    );

                  }}
                  className={
                    selectedSong.id ===
                    song.id
                      ? "jump-button favorite-jump"
                      : "jump-button"
                  }
                >
                  {song.title}
                </Button>

              ))}

            </Space>

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

              {selectedSong.parts.map(
                (part) => (

                  <Button
                    key={part.label}
                    onClick={() =>
                      jumpTo(
                        part.time
                      )
                    }
                    className={
                      part.time ===
                        selectedSong.favoriteTime &&
                      favoriteActive
                        ? "jump-button favorite-jump"
                        : "jump-button"
                    }
                  >
                    {part.label}
                  </Button>

                )
              )}

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