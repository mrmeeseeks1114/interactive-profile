import React, {
  useEffect,
  useState,
} from "react";

import { Modal } from "antd";

import {
  PauseOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  SoundOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import "../styles/music/Music.css";

import type { MusicRequest } from "../hooks/useMusicPlayer";
import type { Song } from "../data/musicData";

import useMusicPlayer from "../hooks/useMusicPlayer";

import {
  harryStylesFirstAlbum,
} from "../data/artists/harry-styles/albums/harry-styles";

import MusicCard from "./music/MusicCard";
import MusicPlayer from "./music/MusicPlayer";
import MusicQueue from "./music/MusicQueue";
import MusicLibrary from "./music/MusicLibrary";
import MusicContextMenu from "./music/MusicContextMenu";

type MusicProps = {
  musicRequest?: MusicRequest | null;
};

const Music: React.FC<MusicProps> = ({
  musicRequest,
}) => {
  const {
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
    closePlayer,
    toggleQueue,
    formatTime,
  } = useMusicPlayer({
    musicRequest,
  });

  const [
    contextMenuVisible,
    setContextMenuVisible,
  ] = useState(false);

  const [
    contextMenuSong,
    setContextMenuSong,
  ] = useState<Song | null>(null);

  const [
    contextMenuPosition,
    setContextMenuPosition,
  ] = useState({
    x: 0,
    y: 0,
  });

  const [volume, setVolume] =
    useState(0.8);

  const [imageError, setImageError] =
    useState(false);

  const [playerOpen, setPlayerOpen] =
    useState(false);

  const [
    showHarryAlbum,
    setShowHarryAlbum,
  ] = useState(false);

  /* =========================
      MODAL SCROLL RESTORE
  ========================= */

  const restorePageScroll = () => {
    document.body.classList.remove(
      "ant-scrolling-effect"
    );

    document.body.classList.remove(
      "ant-modal-open"
    );

    document.documentElement.classList.remove(
      "ant-scrolling-effect"
    );

    document.body.style.removeProperty(
      "overflow"
    );

    document.body.style.removeProperty(
      "overflow-y"
    );

    document.body.style.removeProperty(
      "overflow-x"
    );

    document.body.style.removeProperty(
      "padding-right"
    );

    document.documentElement.style.removeProperty(
      "overflow"
    );

    document.documentElement.style.removeProperty(
      "overflow-y"
    );

    document.documentElement.style.removeProperty(
      "overflow-x"
    );

    document.body.style.height = "auto";
    document.documentElement.style.height = "auto";
  };

  /* =========================
      VOLUME
  ========================= */

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  /* =========================
      RESET IMAGE ERROR
  ========================= */

  useEffect(() => {
    setImageError(false);
  }, [selectedSongId]);

  /* =========================
      SCROLL SAFETY
  ========================= */

  useEffect(() => {
    if (!isOpen && !playerOpen) {
      restorePageScroll();
    }
  }, [isOpen, playerOpen]);

  /* =========================
      COMPONENT CLEANUP
  ========================= */

  useEffect(() => {
    return () => {
      restorePageScroll();
    };
  }, []);

  /* =========================
      HARRY STYLES ALBUM
  ========================= */

  useEffect(() => {
    const handleOpenHarryAlbum = () => {
      setShowHarryAlbum(true);

      window.setTimeout(() => {
        document
          .getElementById(
            "harry-styles-album"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    };

    window.addEventListener(
      "open-harry-styles-album",
      handleOpenHarryAlbum
    );

    return () => {
      window.removeEventListener(
        "open-harry-styles-album",
        handleOpenHarryAlbum
      );
    };
  }, []);

  /* =========================
      CONTEXT MENU
  ========================= */

  const closeContextMenu = () => {
    setContextMenuVisible(false);
    setContextMenuSong(null);
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      closeContextMenu();
    };

    document.addEventListener(
      "click",
      handleDocumentClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleDocumentClick
      );
    };
  }, []);

  const handleContextMenu = (
    event: React.MouseEvent,
    song: Song
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenuSong(song);

    setContextMenuPosition({
      x: event.clientX,
      y: event.clientY,
    });

    setContextMenuVisible(true);
  };

  /* =========================
      SONG CLICK
  ========================= */

  const handleSongClick = (
    song: Song
  ) => {
    if (
      selectedSongId === song.id
    ) {
      togglePlay();
      return;
    }

    changeSong(
      song.id,
      true
    );
  };

  /* =========================
      OPEN PLAYER
  ========================= */

  const handleOpenPlayer = (
    song: Song
  ) => {
    if (
      selectedSongId !== song.id
    ) {
      changeSong(
        song.id,
        false
      );
    }

    setPlayerOpen(true);
  };

  /* =========================
      CLOSE PLAYER
  ========================= */

  const handleClosePlayer = () => {
    setPlayerOpen(false);

    closePlayer();

    restorePageScroll();

    window.setTimeout(() => {
      restorePageScroll();
    }, 0);

    window.setTimeout(() => {
      restorePageScroll();
    }, 100);

    window.setTimeout(() => {
      restorePageScroll();
    }, 300);
  };

  /* =========================
      QUEUE
  ========================= */

  const handleQueuePlay = (
    song: Song
  ) => {
    changeSong(
      song.id,
      true
    );
  };

  /* =========================
      STICKY PLAYER SEEK
  ========================= */

  const handleStickySeek = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    seek(
      Number(event.target.value)
    );
  };

  /* =========================
      SONG LISTS
  ========================= */

  /*
    STUCK IN MY HEAD

    One Direction:
    - Loved You First
    - What Makes You Beautiful
    - One Thing

    The rest of the One Direction songs
    are album-only.

    Harry Styles songs are normally
    excluded because the Harry Styles
    album has its own section.

    Sign of the Times is intentionally
    included here as a duplicate.
  */

  const mainSongs =
    allSongs.filter((song) => {
      const isOneDirection =
        song.artist
          .toLowerCase()
          .includes("one direction");

      if (isOneDirection) {
        return (
          song.id === "loved-you-first" ||
          song.id ===
            "one-direction-what-makes-you-beautiful" ||
          song.id ===
            "one-direction-one-thing"
        );
      }

      return (
        !song.artist
          .toLowerCase()
          .includes("harry styles") ||
        song.id === "sign-of-the-times"
      );
    });

  const harryStylesSongs =
    harryStylesFirstAlbum.songs;

  const showStickyPlayer =
    selectedSong !== null &&
    isPlaying;

  const modalOpen =
    isOpen || playerOpen;

  return (
    <section
      id="music"
      className="music-section"
    >
      <audio
        ref={audioRef}
        preload="metadata"
      />

      <div className="music-container">

        {/* =========================
            SECTION HEADING
        ========================= */}

        <div className="music-section-heading">
          <div className="music-heading-content">
            <span className="section-eyebrow">
              MY MUSIC
            </span>

            <h2>
              Stuck In My Head
            </h2>

            <p>
              songs i've been listening to lately.
            </p>
          </div>

          <div className="music-heading-decoration">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* =========================
            MAIN MUSIC CARDS
        ========================= */}

        <div className="music-card-list">
          {mainSongs.map(
            (song) => (
              <MusicCard
                key={song.id}
                song={song}
                isPlaying={
                  isPlaying &&
                  selectedSongId === song.id
                }
                onClick={() =>
                  handleSongClick(song)
                }
                onOpenPlayer={() =>
                  handleOpenPlayer(song)
                }
                onContextMenu={
                  handleContextMenu
                }
              />
            )
          )}
        </div>

        {/* =========================
            HARRY STYLES ALBUM
        ========================= */}

        {showHarryAlbum && (
          <div
            id="harry-styles-album"
            className="music-album-section"
          >
            <div className="music-album-header">
              <div>
                <span className="section-eyebrow">
                  ALBUM
                </span>

                <h2>
                  Harry Styles
                </h2>

                <p>
                  Harry Styles • 2017
                </p>
              </div>

              <button
                type="button"
                className="music-album-close"
                onClick={() =>
                  setShowHarryAlbum(false)
                }
              >
                hide album
              </button>
            </div>

            <MusicLibrary
              songs={harryStylesSongs}
              selectedSongId={
                selectedSongId
              }
              isPlaying={
                isPlaying
              }
              onPlay={(songId) =>
                changeSong(
                  songId,
                  true
                )
              }
              onOpenPlayer={
                handleOpenPlayer
              }
              onAddToQueue={
                addToQueue
              }
              onContextMenu={
                handleContextMenu
              }
            />
          </div>
        )}
      </div>

      {/* =========================
          CONTEXT MENU
      ========================= */}

      <MusicContextMenu
        song={contextMenuSong}
        x={contextMenuPosition.x}
        y={contextMenuPosition.y}
        visible={
          contextMenuVisible
        }
        onPlayNow={
          playNowFromContextMenu
        }
        onAddToQueue={
          addToQueue
        }
        onClose={
          closeContextMenu
        }
      />

      {/* =========================
          FULL MUSIC PLAYER
      ========================= */}

      <Modal
        open={modalOpen}
        onCancel={
          handleClosePlayer
        }
        footer={null}
        width={1120}
        centered
        destroyOnClose={false}
        className="old-music-player-modal"

        afterOpenChange={(open) => {
          if (!open) {
            restorePageScroll();
          }
        }}

        afterClose={() => {
          restorePageScroll();
        }}
      >
        <div className="old-music-player">

          <MusicPlayer
            song={selectedSong}
            isPlaying={
              isPlaying
            }
            currentTime={
              currentTime
            }
            duration={
              duration
            }
            favoriteActive={
              favoriteActive
            }
            shuffle={
              shuffle
            }
            autoNext={
              autoNext
            }
            queueLength={
              queue.length
            }
            onClose={
              handleClosePlayer
            }
            onToggleQueue={
              toggleQueue
            }
            onPrevious={
              playPreviousSong
            }
            onPlayPause={
              togglePlay
            }
            onNext={
              playNextSong
            }
            onSeek={
              seek
            }
            onToggleShuffle={() =>
              setShuffle(
                (previous) =>
                  !previous
              )
            }
            onToggleAutoNext={() =>
              setAutoNext(
                (previous) =>
                  !previous
              )
            }
            formatTime={
              formatTime
            }
          />

          {/* =========================
              COMPACT TRACKLIST
          ========================= */}

          <div className="spotify-library-wrapper">
            <MusicLibrary
              songs={allSongs}
              selectedSongId={
                selectedSongId
              }
              isPlaying={
                isPlaying
              }
              onPlay={(songId) =>
                changeSong(
                  songId,
                  true
                )
              }
              onOpenPlayer={
                handleOpenPlayer
              }
              onAddToQueue={
                addToQueue
              }
              onContextMenu={
                handleContextMenu
              }
            />
          </div>

          {/* =========================
              QUEUE
          ========================= */}

          {queueOpen && (
            <MusicQueue
              queue={queue}
              onPlay={
                handleQueuePlay
              }
              onRemove={
                removeFromQueue
              }
              onMove={
                moveQueueItem
              }
              onClear={
                clearQueue
              }
            />
          )}

        </div>
      </Modal>

      {/* =========================
          STICKY PLAYER
      ========================= */}

      {showStickyPlayer && (
        <div className="sticky-music-player">
          <div className="sticky-player-inner">

            {/* SONG INFO */}

            <div className="sticky-song">
              {!imageError &&
              selectedSong?.image ? (
                <img
                  src={
                    selectedSong.image
                  }
                  alt={
                    selectedSong.title
                  }
                  onError={() =>
                    setImageError(
                      true
                    )
                  }
                />
              ) : (
                <div className="sticky-song-fallback">
                  ♪
                </div>
              )}

              <div className="sticky-song-info">
                <strong>
                  {
                    selectedSong?.title
                  }
                </strong>

                <span>
                  {
                    selectedSong?.artist
                  }
                </span>
              </div>
            </div>

            {/* CONTROLS */}

            <div className="sticky-player-center">

              <div className="sticky-controls">

                <button
                  type="button"
                  className="sticky-control-button"
                  onClick={
                    playPreviousSong
                  }
                  aria-label="Previous song"
                >
                  <StepBackwardOutlined />
                </button>

                <button
                  type="button"
                  className="sticky-play-button"
                  onClick={
                    togglePlay
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
                  className="sticky-control-button"
                  onClick={
                    playNextSong
                  }
                  aria-label="Next song"
                >
                  <StepForwardOutlined />
                </button>

              </div>

              {/* PROGRESS */}

              <div className="sticky-progress">

                <span>
                  {
                    formatTime(
                      currentTime
                    )
                  }
                </span>

                <input
                  type="range"
                  min={0}
                  max={
                    duration || 0
                  }
                  step={0.1}
                  value={
                    currentTime
                  }
                  onChange={
                    handleStickySeek
                  }
                  disabled={
                    !duration
                  }
                  style={
                    {
                      "--progress":
                        duration
                          ? `${
                              (currentTime /
                                duration) *
                              100
                            }%`
                          : "0%",
                    } as React.CSSProperties
                  }
                />

                <span>
                  {
                    formatTime(
                      duration
                    )
                  }
                </span>

              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="sticky-player-right">

              <SoundOutlined />

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={
                  volume
                }
                onChange={(event) =>
                  setVolume(
                    Number(
                      event.target.value
                    )
                  )
                }
                className="volume-slider"
                style={
                  {
                    "--volume":
                      `${
                        volume * 100
                      }%`,
                  } as React.CSSProperties
                }
                aria-label="Volume"
              />

              <button
                type="button"
                className="sticky-queue-button"
                onClick={
                  toggleQueue
                }
                aria-label="Open queue"
              >
                <UnorderedListOutlined />

                {queue.length > 0 && (
                  <span>
                    {
                      queue.length
                    }
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Music;