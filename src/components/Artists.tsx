import { useState } from "react";

import {
  PlayCircleFilled,
  ArrowLeftOutlined,
  LockOutlined,
} from "@ant-design/icons";

import {
  harryStylesArtist,
  type ArtistAlbum,
} from "../data/artists/harry-styles";

import "./Artists.css";

type ArtistsProps = {
  onPlaySong: (songId: string) => void;
};

const artists = [harryStylesArtist];

export default function Artists({
  onPlaySong,
}: ArtistsProps) {
  const [selectedArtist, setSelectedArtist] = useState<
    (typeof artists)[number] | null
  >(null);

  const [selectedAlbum, setSelectedAlbum] =
    useState<ArtistAlbum | null>(null);

  // =====================================================
  // ARTISTS LANDING PAGE
  // ONLY ARTISTS APPEAR HERE
  // =====================================================

  if (!selectedArtist) {
    return (
      <section className="artists-section">
        <div className="artists-container">
          <div className="artists-heading">
            <span className="artists-eyebrow">
              MY MUSIC
            </span>

            <h2>Artists</h2>

            <p>
              artists i listen to way too much.
            </p>
          </div>

          <div className="artist-grid">
            {artists.map((artist) => (
              <button
                key={artist.id}
                className="artist-main-card"
                onClick={() => {
                  setSelectedArtist(artist);
                  setSelectedAlbum(null);
                }}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="artist-main-image"
                />

                <div className="artist-main-gradient" />

                <div className="artist-main-content">
                  <span className="artist-card-label">
                    ARTIST
                  </span>

                  <h3>{artist.name}</h3>

                  <p>
                    view artist profile, popular songs
                    and albums
                  </p>

                  <span className="artist-view-button">
                    <PlayCircleFilled />
                    view artist
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // ALBUM PAGE
  // ONLY APPEARS AFTER CLICKING AN ALBUM
  // =====================================================

  if (selectedAlbum) {
    return (
      <section className="artists-section">
        <div className="artists-container">
          <button
            className="artists-back-button"
            onClick={() => setSelectedAlbum(null)}
          >
            <ArrowLeftOutlined />
            <span>
              Back to {selectedArtist.name}
            </span>
          </button>

          <div className="album-header">
            <div className="album-cover-large">
              {selectedAlbum.image ? (
                <img
                  src={selectedAlbum.image}
                  alt={selectedAlbum.title}
                />
              ) : (
                <div className="album-placeholder">
                  <LockOutlined />
                </div>
              )}
            </div>

            <div className="album-header-info">
              <span className="artist-eyebrow">
                ALBUM
              </span>

              <h1>{selectedAlbum.title}</h1>

              <p>
                {selectedAlbum.artist}{" "}
                <span>•</span>{" "}
                {selectedAlbum.year}
              </p>
            </div>
          </div>

          {selectedAlbum.locked ? (
            <div className="album-coming-soon">
              <div className="coming-soon-icon">
                <LockOutlined />
              </div>

              <span>COMING SOON</span>

              <h3>
                songs are still being added.
              </h3>

              <p>
                i'm still adding the songs from this
                album.
              </p>
            </div>
          ) : (
            <div className="album-song-list">
              {selectedAlbum.songs.map(
                (song, index) => (
                  <button
                    key={song.id}
                    className="album-song-row"
                    onClick={() =>
                      onPlaySong(
                        `harry-${song.id}`
                      )
                    }
                  >
                    <span className="album-song-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <img
                      src={song.image}
                      alt={song.title}
                      className="popular-song-image"
                    />

                    <div className="album-song-info">
                      <h3>{song.title}</h3>

                      <p>{song.artist}</p>
                    </div>

                    <span className="album-song-play">
                      <PlayCircleFilled />
                    </span>
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  // =====================================================
  // ARTIST PROFILE
  // POPULAR + ALBUMS ONLY APPEAR AFTER CLICKING ARTIST
  // =====================================================

  return (
    <section className="artists-section">
      <div className="artists-container">
        {/* BACK TO ARTISTS */}

        <button
          className="artists-back-button"
          onClick={() => {
            setSelectedArtist(null);
            setSelectedAlbum(null);
          }}
        >
          <ArrowLeftOutlined />

          <span>Back to Artists</span>
        </button>

        {/* =================================================
            ARTIST HEADER
        ================================================= */}

        <div className="artist-page-header">
          <div className="artist-page-image-wrapper">
            <img
              src={selectedArtist.image}
              alt={selectedArtist.name}
              className="artist-page-image"
            />

            <div className="artist-image-glow" />
          </div>

          <div className="artist-page-info">
            <span className="artist-eyebrow">
              ARTIST
            </span>

            <h1>{selectedArtist.name}</h1>

            <p>
              {selectedArtist.description}
            </p>
          </div>
        </div>

        {/* =================================================
            POPULAR
        ================================================= */}

        <div className="artist-subsection">
          <div className="artist-section-title">
            <div>
              <span>POPULAR</span>

              <h2>Popular</h2>
            </div>

            <small>
              {selectedArtist.popularSongs.length} song
              {selectedArtist.popularSongs.length !==
              1
                ? "s"
                : ""}
            </small>
          </div>

          <div className="popular-song-list">
            {selectedArtist.popularSongs.map(
              (song, index) => (
                <button
                  key={song.id}
                  className="popular-song-row"
                  onClick={() =>
                    onPlaySong(
                      `harry-${song.id}`
                    )
                  }
                >
                  <span className="popular-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <img
                    src={song.image}
                    alt={song.title}
                    className="popular-song-image"
                  />

                  <div className="popular-song-info">
                    <h3>{song.title}</h3>

                    <p>{song.artist}</p>
                  </div>

                  <span className="popular-play">
                    <PlayCircleFilled />
                  </span>
                </button>
              )
            )}
          </div>
        </div>

        {/* =================================================
            ALBUMS
        ================================================= */}

        <div className="artist-subsection">
          <div className="artist-section-title">
            <div>
              <span>DISCOGRAPHY</span>

              <h2>Albums</h2>
            </div>

            <small>
              {selectedArtist.albums.length} albums
            </small>
          </div>

          <div className="album-grid">
            {selectedArtist.albums.map(
              (album: ArtistAlbum) => (
                <button
                  key={album.id}
                  className={`album-card ${
                    album.locked
                      ? "locked-album"
                      : ""
                  }`}
                  onClick={() => {
                    if (!album.locked) {
                      setSelectedAlbum(album);
                    }
                  }}
                >
                  <div className="album-card-image-wrapper">
                    {album.image ? (
                      <img
                        src={album.image}
                        alt={album.title}
                        className="album-card-image"
                      />
                    ) : (
                      <div className="album-placeholder">
                        <LockOutlined />
                      </div>
                    )}

                    {album.locked && (
                      <>
                        <div className="album-card-dark" />

                        <div className="album-lock">
                          <LockOutlined />
                        </div>

                        <span className="album-locked-label">
                          COMING SOON
                        </span>
                      </>
                    )}

                    {!album.locked && (
                      <div className="album-hover-play">
                        <PlayCircleFilled />
                      </div>
                    )}
                  </div>

                  <div className="album-card-info">
                    <h3>{album.title}</h3>

                    <p>
                      {album.year}

                      {album.locked && (
                        <>
                          {" "}
                          • Coming Soon
                        </>
                      )}
                    </p>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}