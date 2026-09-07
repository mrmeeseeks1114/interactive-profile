import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { allSongs } from "../data/musicData";

import type { Song } from "../data/musicData";

export type MusicRequest = {
  songId: string;
  autoplay?: boolean;
  requestId: number;
};

type UseMusicPlayerProps = {
  musicRequest?: MusicRequest | null;
};

const useMusicPlayer = ({
  musicRequest,
}: UseMusicPlayerProps) => {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const pendingAutoplayRef =
    useRef(false);

  const lastMusicRequestIdRef =
    useRef<number | null>(null);

  const [selectedSongId, setSelectedSongId] =
    useState(allSongs[0]?.id ?? "");

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

  const [autoNext, setAutoNext] =
    useState(true);

  const [shuffle, setShuffle] =
    useState(false);

  const [queue, setQueue] =
    useState<Song[]>([]);

  const [queueOpen, setQueueOpen] =
    useState(false);

  const selectedSong =
    allSongs.find(
      (song) =>
        song.id === selectedSongId
    ) ?? allSongs[0];

  /* =====================================================
     PLAY
  ===================================================== */

  const playSong = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, []);

  /* =====================================================
     PAUSE
  ===================================================== */

  const pauseSong = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
  }, []);

  /* =====================================================
     TOGGLE PLAY
  ===================================================== */

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  }, [pauseSong, playSong]);

  /* =====================================================
     CHANGE SONG
  ===================================================== */

  const changeSong = useCallback(
    (
      songId: string,
      shouldPlay = false
    ) => {
      const song = allSongs.find(
        (item) => item.id === songId
      );

      if (!song) return;

      /*
       * Same song:
       * NEVER reload or restart it.
       */
      if (songId === selectedSongId) {
        if (
          shouldPlay &&
          audioRef.current?.paused
        ) {
          playSong();
        }

        return;
      }

      pendingAutoplayRef.current =
        shouldPlay;

      const audio = audioRef.current;

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setFavoriteActive(false);

      setSelectedSongId(songId);
    },
    [
      playSong,
      selectedSongId,
    ]
  );

  /* =====================================================
     LOAD SONG
     
     IMPORTANT:
     This is the ONLY place where the audio src
     changes.
  ===================================================== */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !selectedSong) {
      return;
    }

    const newSource =
      selectedSong.audio;

    /*
     * Don't reload the audio if the source
     * is already the same.
     */
    if (
      audio.getAttribute("src") !==
      newSource
    ) {
      audio.src = newSource;
      audio.load();
    }

    setCurrentTime(0);
    setDuration(0);

    if (
      pendingAutoplayRef.current
    ) {
      pendingAutoplayRef.current =
        false;

      const playAfterLoad = () => {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      };

      if (
        audio.readyState >= 3
      ) {
        playAfterLoad();
      } else {
        audio.addEventListener(
          "canplay",
          playAfterLoad,
          { once: true }
        );
      }

      return () => {
        audio.removeEventListener(
          "canplay",
          playAfterLoad
        );
      };
    }
  }, [selectedSong]);

  /* =====================================================
     MUSIC REQUEST
     
     IMPORTANT FIX:
     Only respond to a genuinely new request.
     
     Opening/re-rendering the player will NOT trigger
     the song to reload.
  ===================================================== */

  useEffect(() => {
    if (!musicRequest) return;

    if (
      lastMusicRequestIdRef.current ===
      musicRequest.requestId
    ) {
      return;
    }

    lastMusicRequestIdRef.current =
      musicRequest.requestId;

    const requestedSong =
      allSongs.find(
        (song) =>
          song.id ===
          musicRequest.songId
      ) ??
      allSongs.find(
        (song) =>
          song.id ===
          `harry-${musicRequest.songId}`
      );

    if (!requestedSong) return;

    setIsOpen(true);

    changeSong(
      requestedSong.id,
      musicRequest.autoplay ?? true
    );
  }, [
    musicRequest?.requestId,
  ]);

  /* =====================================================
     AUDIO EVENTS
  ===================================================== */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate =
      () => {
        setCurrentTime(
          audio.currentTime
        );
      };

    const handleLoadedMetadata =
      () => {
        setDuration(
          Number.isFinite(
            audio.duration
          )
            ? audio.duration
            : 0
        );
      };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "play",
      handlePlay
    );

    audio.addEventListener(
      "pause",
      handlePause
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "play",
        handlePlay
      );

      audio.removeEventListener(
        "pause",
        handlePause
      );
    };
  }, []);

  /* =====================================================
     FAVORITE MOMENT
  ===================================================== */

  useEffect(() => {
    if (
      !selectedSong?.favoriteTime
    ) {
      setFavoriteActive(false);
      return;
    }

    setFavoriteActive(
      currentTime >=
        selectedSong.favoriteTime &&
        currentTime <
          selectedSong.favoriteTime + 9
    );
  }, [
    currentTime,
    selectedSong,
  ]);

  /* =====================================================
     NEXT SONG
  ===================================================== */

  const playNextSong = useCallback(() => {
    /*
     * QUEUE FIRST
     */

    if (queue.length > 0) {
      const nextQueuedSong =
        queue[0];

      setQueue(
        (currentQueue) =>
          currentQueue.slice(1)
      );

      changeSong(
        nextQueuedSong.id,
        true
      );

      return;
    }

    /*
     * SHUFFLE
     */

    if (
      shuffle &&
      allSongs.length > 1
    ) {
      const availableSongs =
        allSongs.filter(
          (song) =>
            song.id !==
            selectedSongId
        );

      const randomSong =
        availableSongs[
          Math.floor(
            Math.random() *
              availableSongs.length
          )
        ];

      if (randomSong) {
        changeSong(
          randomSong.id,
          true
        );
      }

      return;
    }

    /*
     * NORMAL NEXT
     */

    const currentIndex =
      allSongs.findIndex(
        (song) =>
          song.id ===
          selectedSongId
      );

    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + 1) %
          allSongs.length;

    const nextSong =
      allSongs[nextIndex];

    if (nextSong) {
      changeSong(
        nextSong.id,
        true
      );
    }
  }, [
    changeSong,
    queue,
    selectedSongId,
    shuffle,
  ]);

  /* =====================================================
     PREVIOUS SONG
  ===================================================== */

  const playPreviousSong =
    useCallback(() => {
      const audio =
        audioRef.current;

      /*
       * More than 5 seconds:
       * restart current song.
       */

      if (
        audio &&
        audio.currentTime > 5
      ) {
        audio.currentTime = 0;
        setCurrentTime(0);
        return;
      }

      const currentIndex =
        allSongs.findIndex(
          (song) =>
            song.id ===
            selectedSongId
        );

      const previousIndex =
        currentIndex <= 0
          ? allSongs.length - 1
          : currentIndex - 1;

      const previousSong =
        allSongs[previousIndex];

      if (previousSong) {
        changeSong(
          previousSong.id,
          true
        );
      }
    }, [
      changeSong,
      selectedSongId,
    ]);

  /* =====================================================
     AUTO NEXT
  ===================================================== */

  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) return;

    const handleEnded =
      () => {
        setIsPlaying(false);

        if (autoNext) {
          playNextSong();
        }
      };

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, [
    autoNext,
    playNextSong,
  ]);

  /* =====================================================
     SEEK
  ===================================================== */

  const seek = useCallback(
    (value: number) => {
      const audio =
        audioRef.current;

      if (!audio) return;

      audio.currentTime = value;
      setCurrentTime(value);
    },
    []
  );

  /* =====================================================
     QUEUE
  ===================================================== */

  const addToQueue =
    useCallback((song: Song) => {
      setQueue(
        (currentQueue) => [
          ...currentQueue,
          song,
        ]
      );

      setQueueOpen(true);
    }, []);

  const removeFromQueue =
    useCallback(
      (songId: string) => {
        setQueue(
          (currentQueue) =>
            currentQueue.filter(
              (song) =>
                song.id !==
                songId
            )
        );
      },
      []
    );

  const moveQueueItem =
    useCallback(
      (
        index: number,
        direction:
          | "up"
          | "down"
      ) => {
        setQueue(
          (currentQueue) => {
            const newQueue =
              [...currentQueue];

            const targetIndex =
              direction ===
              "up"
                ? index - 1
                : index + 1;

            if (
              targetIndex <
                0 ||
              targetIndex >=
                newQueue.length
            ) {
              return currentQueue;
            }

            [
              newQueue[index],
              newQueue[
                targetIndex
              ],
            ] = [
              newQueue[
                targetIndex
              ],
              newQueue[index],
            ];

            return newQueue;
          }
        );
      },
      []
    );

  const clearQueue =
    useCallback(() => {
      setQueue([]);
    }, []);

  /* =====================================================
     CONTEXT MENU
  ===================================================== */

  const playNowFromContextMenu =
    useCallback(
      (song: Song) => {
        setIsOpen(true);

        changeSong(
          song.id,
          true
        );
      },
      [changeSong]
    );

  /* =====================================================
     OPEN / CLOSE PLAYER
     
     Closing the UI does NOT pause audio.
  ===================================================== */

  const openPlayer =
    useCallback(
      (songId?: string) => {
        setIsOpen(true);

        if (songId) {
          changeSong(
            songId,
            false
          );
        }
      },
      [changeSong]
    );

  const closePlayer =
    useCallback(() => {
      /*
       * IMPORTANT:
       * This only closes the player UI.
       * It does NOT pause the audio.
       */
      setIsOpen(false);
    }, []);

  const toggleQueue =
    useCallback(() => {
      setQueueOpen(
        (value) => !value
      );
    }, []);

  /* =====================================================
     FORMAT TIME
  ===================================================== */

  const formatTime = (
    seconds: number
  ) => {
    if (
      !Number.isFinite(seconds)
    ) {
      return "0:00";
    }

    const minutes =
      Math.floor(
        seconds / 60
      );

    const remainingSeconds =
      Math.floor(
        seconds % 60
      );

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    audioRef,

    allSongs,
    selectedSong,

    selectedSongId,
    isOpen,
    isPlaying,

    currentTime,
    duration,
    favoriteActive,

    autoNext,
    setAutoNext,

    shuffle,
    setShuffle,

    queue,
    queueOpen,
    setQueueOpen,

    playSong,
    pauseSong,
    togglePlay,

    changeSong,
    playNextSong,
    playPreviousSong,

    seek,

    addToQueue,
    removeFromQueue,
    moveQueueItem,
    clearQueue,

    playNowFromContextMenu,

    openPlayer,
    closePlayer,
    toggleQueue,

    formatTime,
  };
};

export default useMusicPlayer;