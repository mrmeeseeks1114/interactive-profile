import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import {
  Button,
  Modal,
  Slider,
  Space,
  message,
} from "antd";

import {
  PlayCircleFilled,
  PauseCircleFilled,
  StepBackwardFilled,
  StepForwardFilled,
  StarFilled,
  PlusOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MenuOutlined,
  RetweetOutlined,
  CloseOutlined,
  SwapOutlined,
} from "@ant-design/icons";

import "./Music.css";

import albumImage from "../assets/loved-you-first.jpg";
import girlIsMineImage from "../assets/the-girl-is-mine.jpg";
import signOfTheTimesImage from "../assets/sign-of-the-times.jpg";
import whosLovingYouImage from "../assets/whos-loving-you.jpg";
import danceWithMeImage from "../assets/dance-with-me.jpg";
import godWasShowingOffImage from "../assets/god-was-showing-off.jpg";
import youRockMyWorldImage from "../assets/you-rock-my-world.jpg";
import butterfliesImage from "../assets/butterflies.jpg";

import {
  harryStylesFirstAlbum,
} from "../data/artists/harry-styles/albums/harry-styles";

/* =====================================================
   TYPES
===================================================== */

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
  favoriteTime?: number;
};

/* =====================================================
   MUSIC REQUEST FROM APP
===================================================== */

type MusicRequest = {
  songId: string;
  autoplay: boolean;
  requestId: number;
};

type MusicProps = {
  musicRequest?: MusicRequest | null;
};

/* =====================================================
   SONGS STUCK IN MY HEAD
===================================================== */

const stuckInMyHeadSongs: Song[] = [
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

  {
    id: "whos-loving-you",
    title: "Who's Loving You",
    artist: "The Jackson 5",
    image: whosLovingYouImage,
    audio: "/music/whos-loving-you.mp3",
    parts: [
      {
        label: "INTRO",
        time: 10,
      },
      {
        label: "⭐ THIS PARTTT",
        time: 187,
      },
    ],
    favoriteTime: 187,
  },

  {
    id: "dance-with-me",
    title: "Dance With Me",
    artist: "Dance With Me",
    image: danceWithMeImage,
    audio: "/music/dance-with-me.mp3",
    parts: [],
    favoriteTime: undefined,
  },

  {
    id: "god-was-showing-off",
    title: "God Was Showing Off",
    artist: "God Was Showing Off",
    image: godWasShowingOffImage,
    audio: "/music/god-was-showing-off.mp3",
    parts: [
      {
        label: "INTRO",
        time: 11,
      },
      {
        label: "CHORUS",
        time: 37,
      },
      {
        label: "⭐ THIS PARTTT",
        time: 143,
      },
    ],
    favoriteTime: 143,
  },

  {
    id: "you-rock-my-world",
    title: "You Rock My World",
    artist: "Michael Jackson",
    image: youRockMyWorldImage,
    audio: "/music/you-rock-my-world.mp3",
    parts: [
      {
        label: "INTRO",
        time: 32,
      },
      {
        label: "CHORUS",
        time: 115,
      },
      {
        label: "⭐ THIS PARTTT",
        time: 215,
      },
    ],
    favoriteTime: 215,
  },

  {
    id: "butterflies",
    title: "Butterflies",
    artist: "Michael Jackson",
    image: butterfliesImage,
    audio: "/music/butterflies.mp3",
    parts: [],
    favoriteTime: undefined,
  },
];

/* =====================================================
   HARRY STYLES
===================================================== */

const harryStylesSongs: Song[] =
  harryStylesFirstAlbum.songs.map((song) => ({
    id: `harry-${song.id}`,
    title: song.title,
    artist: song.artist,
    image: song.image,
    audio: song.audio,
    parts: [],
    favoriteTime: undefined,
  }));

/* =====================================================
   ALL SONGS
===================================================== */

const allSongs: Song[] = [
  ...stuckInMyHeadSongs,
  ...harryStylesSongs,
];

/* =====================================================
   FORMAT TIME
===================================================== */

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(
    seconds % 60
  );

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

/* =====================================================
   MUSIC COMPONENT
===================================================== */

export default function Music({
  musicRequest,
}: MusicProps) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const pendingAutoplay =
    useRef(false);

  const [selectedSongId, setSelectedSongId] =
    useState("loved-you-first");

  const selectedSong =
    allSongs.find(
      (song) =>
        song.id === selectedSongId
    ) || allSongs[0];

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

  /* ===================================================
     PLAYER SETTINGS
  =================================================== */

  const [autoNext, setAutoNext] =
    useState(true);

  const [shuffle, setShuffle] =
    useState(false);

  /* ===================================================
     QUEUE
  =================================================== */

  const [queue, setQueue] =
    useState<Song[]>([]);

  const [queueOpen, setQueueOpen] =
    useState(false);

  /* ===================================================
     CONTEXT MENU
  =================================================== */

  const [
    contextMenu,
    setContextMenu,
  ] = useState<{
    visible: boolean;
    x: number;
    y: number;
    song: Song | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    song: null,
  });

  /* ===================================================
     CLOSE CONTEXT MENU
  =================================================== */

  const closeContextMenu = () => {
    setContextMenu({
      visible: false,
      x: 0,
      y: 0,
      song: null,
    });
  };

  /* ===================================================
     RIGHT CLICK SONG
  =================================================== */

  const handleSongContextMenu = (
    event: MouseEvent,
    song: Song
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const menuWidth = 250;
    const menuHeight = 150;

    let x = event.clientX;
    let y = event.clientY;

    if (
      x + menuWidth >
      window.innerWidth
    ) {
      x =
        window.innerWidth -
        menuWidth -
        12;
    }

    if (
      y + menuHeight >
      window.innerHeight
    ) {
      y =
        window.innerHeight -
        menuHeight -
        12;
    }

    setContextMenu({
      visible: true,
      x,
      y,
      song,
    });
  };

  /* ===================================================
     ADD TO QUEUE
  =================================================== */

  const addToQueue = (song: Song) => {
    setQueue((previous) => [
      ...previous,
      song,
    ]);

    setQueueOpen(true);

    message.success(
      `${song.title} added to queue`
    );

    closeContextMenu();
  };

  /* ===================================================
     PLAY NOW FROM CONTEXT MENU
  =================================================== */

  const playNowFromContextMenu = (
    song: Song
  ) => {
    changeSong(song.id, true);
    setIsOpen(true);
    closeContextMenu();
  };

  /* ===================================================
     REMOVE FROM QUEUE
  =================================================== */

  const removeFromQueue = (
    index: number
  ) => {
    setQueue((previous) =>
      previous.filter(
        (_, i) => i !== index
      )
    );
  };

  /* ===================================================
     MOVE QUEUE UP
  =================================================== */

  const moveQueueUp = (
    index: number
  ) => {
    if (index === 0) {
      return;
    }

    setQueue((previous) => {
      const updated = [
        ...previous,
      ];

      [
        updated[index - 1],
        updated[index],
      ] = [
        updated[index],
        updated[index - 1],
      ];

      return updated;
    });
  };

  /* ===================================================
     MOVE QUEUE DOWN
  =================================================== */

  const moveQueueDown = (
    index: number
  ) => {
    if (
      index >=
      queue.length - 1
    ) {
      return;
    }

    setQueue((previous) => {
      const updated = [
        ...previous,
      ];

      [
        updated[index],
        updated[index + 1],
      ] = [
        updated[index + 1],
        updated[index],
      ];

      return updated;
    });
  };

  /* ===================================================
     CLEAR QUEUE
  =================================================== */

  const clearQueue = () => {
    setQueue([]);

    message.success(
      "queue cleared"
    );
  };

  /* ===================================================
     PLAY
  =================================================== */

  const playSong = () => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);

        message.error(
          "couldn't play this song 😭"
        );
      });
  };

  /* ===================================================
     PAUSE
  =================================================== */

  const pauseSong = () => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.pause();

    setIsPlaying(false);
  };

  /* ===================================================
     TOGGLE PLAY
  =================================================== */

  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  };

  /* ===================================================
     CHANGE SONG
  =================================================== */

  const changeSong = (
    songId: string,
    shouldPlay = false
  ) => {
    const song =
      allSongs.find(
        (item) =>
          item.id === songId
      );

    if (!song) {
      return;
    }

    const wasPlaying =
      isPlaying;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    pendingAutoplay.current =
      shouldPlay || wasPlaying;

    setSelectedSongId(songId);
    setCurrentTime(0);
    setDuration(0);
    setFavoriteActive(false);
    setIsPlaying(false);
  };

  /* ===================================================
     AUTOPLAY AFTER SONG CHANGES
  =================================================== */

  useEffect(() => {
    if (!pendingAutoplay.current) {
      return;
    }

    pendingAutoplay.current = false;

    const timer =
      window.setTimeout(() => {
        if (!audioRef.current) {
          return;
        }

        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }, 120);

    return () => {
      window.clearTimeout(timer);
    };
  }, [selectedSongId]);

  /* ===================================================
     MUSIC REQUEST FROM ARTISTS
  =================================================== */

  useEffect(() => {
    if (!musicRequest) {
      return;
    }

    const requestedSong =
      allSongs.find(
        (song) =>
          song.id ===
          musicRequest.songId
      );

    if (!requestedSong) {
      console.warn(
        `Music request not found: ${musicRequest.songId}`
      );

      return;
    }

    setIsOpen(true);

    changeSong(
      requestedSong.id,
      musicRequest.autoplay
    );
  }, [musicRequest]);

  /* ===================================================
     NEXT SONG
  =================================================== */

  const playNextSong = () => {
    if (queue.length > 0) {
      const nextQueuedSong =
        queue[0];

      setQueue((previous) =>
        previous.slice(1)
      );

      changeSong(
        nextQueuedSong.id,
        true
      );

      return;
    }

    if (shuffle) {
      const possibleSongs =
        allSongs.filter(
          (song) =>
            song.id !==
            selectedSong.id
        );

      if (
        possibleSongs.length > 0
      ) {
        const randomIndex =
          Math.floor(
            Math.random() *
              possibleSongs.length
          );

        changeSong(
          possibleSongs[
            randomIndex
          ].id,
          true
        );

        return;
      }
    }

    const currentIndex =
      allSongs.findIndex(
        (song) =>
          song.id ===
          selectedSong.id
      );

    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + 1) %
          allSongs.length;

    changeSong(
      allSongs[nextIndex].id,
      true
    );
  };

  /* ===================================================
     PREVIOUS SONG
  =================================================== */

  const playPreviousSong = () => {
    if (
      currentTime > 5 &&
      audioRef.current
    ) {
      audioRef.current.currentTime =
        0;

      setCurrentTime(0);

      return;
    }

    const currentIndex =
      allSongs.findIndex(
        (song) =>
          song.id ===
          selectedSong.id
      );

    const previousIndex =
      currentIndex <= 0
        ? allSongs.length - 1
        : currentIndex - 1;

    changeSong(
      allSongs[
        previousIndex
      ].id,
      true
    );
  };

  /* ===================================================
     JUMP TO QUICK MOMENT
  =================================================== */

  const jumpTo = (
    seconds: number
  ) => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime =
      seconds;

    setCurrentTime(seconds);

    if (!isPlaying) {
      playSong();
    }

    if (
      selectedSong.favoriteTime !==
        undefined &&
      seconds ===
        selectedSong.favoriteTime
    ) {
      setFavoriteActive(true);
    }
  };

  /* ===================================================
     ADJUST SONG TIME
  =================================================== */

  const handleSliderChange = (
    value: number
  ) => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime =
      value;

    setCurrentTime(value);

    if (
      selectedSong.favoriteTime !==
        undefined &&
      value >=
        selectedSong.favoriteTime &&
      value <
        selectedSong.favoriteTime + 9
    ) {
      setFavoriteActive(true);
    } else {
      setFavoriteActive(false);
    }
  };

  /* ===================================================
     -10 SECONDS
  =================================================== */

  const previousPart = () => {
    if (!audioRef.current) {
      return;
    }

    const newTime =
      Math.max(
        audioRef.current
          .currentTime - 10,
        0
      );

    audioRef.current.currentTime =
      newTime;

    setCurrentTime(newTime);
  };

  /* ===================================================
     +10 SECONDS
  =================================================== */

  const nextPart = () => {
    if (!audioRef.current) {
      return;
    }

    const newTime =
      Math.min(
        audioRef.current
          .currentTime + 10,
        duration
      );

    audioRef.current.currentTime =
      newTime;

    setCurrentTime(newTime);
  };

  /* ===================================================
     TIME UPDATE
  =================================================== */

  const handleTimeUpdate = () => {
    if (!audioRef.current) {
      return;
    }

    const time =
      audioRef.current.currentTime;

    setCurrentTime(time);

    if (
      selectedSong.favoriteTime !==
        undefined &&
      time >=
        selectedSong.favoriteTime &&
      time <
        selectedSong.favoriteTime + 9
    ) {
      setFavoriteActive(true);
    } else {
      setFavoriteActive(false);
    }
  };

  /* ===================================================
     LOADED METADATA
  =================================================== */

  const handleLoadedMetadata =
    () => {
      if (!audioRef.current) {
        return;
      }

      const songDuration =
        audioRef.current.duration;

      if (
        Number.isFinite(
          songDuration
        )
      ) {
        setDuration(
          songDuration
        );
      }
    };

  /* ===================================================
     SONG ENDED
  =================================================== */

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setFavoriteActive(false);

    if (autoNext) {
      playNextSong();
    }
  };

  /* ===================================================
     OPEN PLAYER
  =================================================== */

  const openPlayer = () => {
    setIsOpen(true);
  };

  /* ===================================================
     CLOSE PLAYER
  =================================================== */

  const closePlayer = () => {
    setIsOpen(false);
    closeContextMenu();
  };

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <>
      {/* =================================================
          AUDIO
      ================================================= */}

      <audio
        ref={audioRef}
        src={selectedSong.audio}
        onTimeUpdate={
          handleTimeUpdate
        }
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
        onClick={
          closeContextMenu
        }
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

        <div className="music-card-list">
          {stuckInMyHeadSongs.map(
            (song) => (
              <div
                key={song.id}
                className={`music-card ${
                  selectedSong.id ===
                  song.id
                    ? "active-song"
                    : ""
                }`}
                onContextMenu={(
                  event
                ) =>
                  handleSongContextMenu(
                    event,
                    song
                  )
                }
              >
                <img
                  src={song.image}
                  alt={
                    song.title
                  }
                  className="music-card-image"
                />

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

                  <button
                    className="open-player-button"
                    onClick={() => {
                      changeSong(
                        song.id
                      );

                      openPlayer();
                    }}
                  >
                    <PlayCircleFilled />

                    open player
                  </button>
                </div>

                <Button
                  type="primary"
                  shape="circle"
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

                    togglePlay();
                  }}
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* =================================================
          RIGHT CLICK MENU
      ================================================= */}

      {contextMenu.visible &&
        contextMenu.song && (
          <div
            className="music-context-menu"
            style={{
              left:
                contextMenu.x,
              top:
                contextMenu.y,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="context-menu-song">
              <img
                src={
                  contextMenu.song
                    .image
                }
                alt=""
              />

              <div>
                <strong>
                  {
                    contextMenu.song
                      .title
                  }
                </strong>

                <span>
                  {
                    contextMenu.song
                      .artist
                  }
                </span>
              </div>
            </div>

            <div className="context-menu-divider" />

            <button
              className="context-menu-item"
              onClick={() =>
                addToQueue(
                  contextMenu.song!
                )
              }
            >
              <PlusOutlined />

              Add to queue
            </button>

            <button
              className="context-menu-item"
              onClick={() =>
                playNowFromContextMenu(
                  contextMenu.song!
                )
              }
            >
              <PlayCircleFilled />

              Play now
            </button>
          </div>
        )}

      {/* =================================================
          IMPROVED MUSIC PLAYER
      ================================================= */}

      <Modal
        open={isOpen}
        onCancel={closePlayer}
        footer={null}
        centered
        width={1120}
        className="old-music-player-modal"
        destroyOnClose={false}
        maskClosable={true}
      >
        <div
          className={`old-music-player ${
            queueOpen
              ? "queue-is-open"
              : ""
          }`}
        >
          {/* =================================================
              PLAYER TOP BAR
          ================================================= */}

          <div className="old-player-topbar">
            <div className="old-player-brand">
              <span className="old-player-brand-dot" />

              <div>
                <span className="old-player-eyebrow">
                  MESEEKS.EXE
                </span>

                <span className="old-player-subtitle">
                  MUSIC PLAYER
                </span>
              </div>
            </div>

            <div className="old-player-top-actions">
              <Button
                className={
                  queueOpen
                    ? "player-queue-button active"
                    : "player-queue-button"
                }
                icon={
                  queueOpen ? (
                    <CloseOutlined />
                  ) : (
                    <MenuOutlined />
                  )
                }
                onClick={() =>
                  setQueueOpen(
                    (previous) =>
                      !previous
                  )
                }
              >
                {queueOpen
                  ? "Close Queue"
                  : "Queue"}

                {queue.length >
                0
                  ? ` (${queue.length})`
                  : ""}
              </Button>
            </div>
          </div>

          {/* =================================================
              MAIN PLAYER BODY
          ================================================= */}

          <div className="old-player-main-layout">
            {/* =================================================
                LEFT / MAIN PLAYER
            ================================================= */}

            <div className="old-player-main">
              {/* =================================================
                  SONG HEADER
              ================================================= */}

              <div className="old-player-header">
                <div>
                  <span className="old-player-now-playing">
                    NOW PLAYING
                  </span>

                  <h1>
                    {
                      selectedSong.title
                    }
                  </h1>

                  <p>
                    {
                      selectedSong.artist
                    }
                  </p>
                </div>
              </div>

              {/* =================================================
                  COMPACT ALBUM ART
              ================================================= */}

              <div className="old-player-art-wrapper">
                <div className="old-player-art-glow" />

                <img
                  src={
                    selectedSong.image
                  }
                  alt={
                    selectedSong.title
                  }
                  className="old-player-art"
                />
              </div>

              {/* =================================================
                  SONG INFO
              ================================================= */}

              <div className="old-player-song-info">
                <div>
                  <h2>
                    {
                      selectedSong.title
                    }
                  </h2>

                  <p>
                    {
                      selectedSong.artist
                    }
                  </p>
                </div>

                <StarFilled
                  className={
                    favoriteActive
                      ? "old-player-star active"
                      : "old-player-star"
                  }
                />
              </div>

              {/* =================================================
                  PROGRESS
              ================================================= */}

              <div className="old-player-progress">
                <span>
                  {formatTime(
                    currentTime
                  )}
                </span>

                <div className="old-player-slider">
                  <Slider
                    min={0}
                    max={
                      duration || 0
                    }
                    step={0.1}
                    value={Math.min(
                      currentTime,
                      duration || 0
                    )}
                    onChange={
                      handleSliderChange
                    }
                    tooltip={{
                      formatter:
                        (value) =>
                          formatTime(
                            Number(
                              value
                            )
                          ),
                    }}
                  />
                </div>

                <span>
                  {formatTime(
                    duration
                  )}
                </span>
              </div>

              {/* =================================================
                  MAIN CONTROLS
              ================================================= */}

              <div className="old-player-controls">
                <Button
                  type="text"
                  className="old-secondary-control"
                  icon={
                    <StepBackwardFilled />
                  }
                  onClick={
                    playPreviousSong
                  }
                />

                <Button
                  shape="circle"
                  className="old-main-play"
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
                  className="old-secondary-control"
                  icon={
                    <StepForwardFilled />
                  }
                  onClick={
                    playNextSong
                  }
                />
              </div>

              {/* =================================================
                  PLAYER SETTINGS
              ================================================= */}

              <div className="old-player-settings">
                <Button
                  type="text"
                  className={
                    shuffle
                      ? "player-setting active"
                      : "player-setting"
                  }
                  icon={
                    <SwapOutlined />
                  }
                  onClick={() =>
                    setShuffle(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  Shuffle
                </Button>

                <Button
                  type="text"
                  className={
                    autoNext
                      ? "player-setting active"
                      : "player-setting"
                  }
                  icon={
                    <RetweetOutlined />
                  }
                  onClick={() =>
                    setAutoNext(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  Auto Next
                </Button>
              </div>

              {/* =================================================
                  SWITCH SONG
              ================================================= */}

              <div className="old-player-section">
                <span className="old-player-section-title">
                  SONG LIBRARY
                </span>

                <div className="old-player-section-heading-row">
                  <h3>
                    Switch song
                  </h3>

                  <span>
                    {allSongs.length} songs
                  </span>
                </div>

                <Space
                  wrap
                  className="old-player-buttons"
                >
                  {allSongs.map(
                    (song) => (
                      <Button
                        key={song.id}
                        className={
                          selectedSong.id ===
                          song.id
                            ? "old-jump-button selected"
                            : "old-jump-button"
                        }
                        onClick={() =>
                          changeSong(
                            song.id
                          )
                        }
                        onContextMenu={(
                          event
                        ) =>
                          handleSongContextMenu(
                            event,
                            song
                          )
                        }
                      >
                        {song.title}
                      </Button>
                    )
                  )}
                </Space>
              </div>

              {/* =================================================
                  QUICK MOMENTS
              ================================================= */}

              {selectedSong.parts
                .length > 0 && (
                <div className="old-player-section quick-moments-section">
                  <span className="old-player-section-title">
                    QUICK MOMENTS
                  </span>

                  <div className="old-player-section-heading-row">
                    <h3>
                      Jump to a part
                    </h3>

                    <span>
                      {selectedSong.parts.length} moments
                    </span>
                  </div>

                  <Space
                    wrap
                    className="old-player-buttons"
                  >
                    {selectedSong.parts.map(
                      (part) => (
                        <Button
                          key={`${selectedSong.id}-${part.time}`}
                          className={
                            part.time ===
                              selectedSong.favoriteTime &&
                            favoriteActive
                              ? "old-jump-button selected favorite"
                              : "old-jump-button"
                          }
                          onClick={() =>
                            jumpTo(
                              part.time
                            )
                          }
                        >
                          {part.label}
                        </Button>
                      )
                    )}
                  </Space>

                  <div className="old-ten-second-controls">
                    <Button
                      onClick={
                        previousPart
                      }
                    >
                      −10s
                    </Button>

                    <Button
                      onClick={
                        nextPart
                      }
                    >
                      +10s
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                QUEUE PANEL
            ================================================= */}

            {queueOpen && (
              <aside className="old-player-queue">
                <div className="queue-panel-header">
                  <div>
                    <span className="old-player-section-title">
                      UP NEXT
                    </span>

                    <h3>
                      Queue
                    </h3>

                    <span className="queue-count">
                      {queue.length}{" "}
                      {queue.length ===
                      1
                        ? "song"
                        : "songs"}
                    </span>
                  </div>

                  {queue.length >
                    0 && (
                    <Button
                      danger
                      size="small"
                      icon={
                        <DeleteOutlined />
                      }
                      onClick={
                        clearQueue
                      }
                    >
                      Clear
                    </Button>
                  )}
                </div>

                <div className="queue-panel-divider" />

                {queue.length ===
                0 ? (
                  <div className="queue-empty">
                    <div className="queue-empty-icon">
                      <PlusOutlined />
                    </div>

                    <strong>
                      Queue is empty
                    </strong>

                    <span>
                      Right-click any
                      song and add it
                      here.
                    </span>
                  </div>
                ) : (
                  <div className="queue-list">
                    {queue.map(
                      (
                        song,
                        index
                      ) => (
                        <div
                          className={`queue-row ${
                            song.id ===
                            selectedSong.id
                              ? "queue-row-current"
                              : ""
                          }`}
                          key={`${song.id}-${index}`}
                          onDoubleClick={() =>
                            changeSong(
                              song.id,
                              true
                            )
                          }
                        >
                          <span className="queue-number">
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <img
                            src={
                              song.image
                            }
                            alt=""
                          />

                          <div className="queue-row-info">
                            <strong>
                              {
                                song.title
                              }
                            </strong>

                            <span>
                              {
                                song.artist
                              }
                            </span>
                          </div>

                          <div className="queue-row-actions">
                            <Button
                              type="text"
                              size="small"
                              icon={
                                <ArrowUpOutlined />
                              }
                              disabled={
                                index ===
                                0
                              }
                              onClick={() =>
                                moveQueueUp(
                                  index
                                )
                              }
                            />

                            <Button
                              type="text"
                              size="small"
                              icon={
                                <ArrowDownOutlined />
                              }
                              disabled={
                                index ===
                                queue.length -
                                  1
                              }
                              onClick={() =>
                                moveQueueDown(
                                  index
                                )
                              }
                            />

                            <Button
                              type="text"
                              danger
                              size="small"
                              icon={
                                <DeleteOutlined />
                              }
                              onClick={() =>
                                removeFromQueue(
                                  index
                                )
                              }
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {queue.length >
                  0 && (
                  <div className="queue-panel-footer">
                    <span>
                      Double-click a song
                      to play it
                    </span>
                  </div>
                )}
              </aside>
            )}
          </div>

          {/* =================================================
              FAVORITE MESSAGE
          ================================================= */}

          {favoriteActive && (
            <div className="old-favorite-message">
              <StarFilled />

              <span>
                ⭐ THIS PARTTTT
              </span>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}