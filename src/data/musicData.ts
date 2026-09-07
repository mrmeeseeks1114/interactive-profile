export type MusicPart = {
  label: string;
  time: number;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  image: string;
  audio: string;
  parts?: MusicPart[];
  favoriteTime?: number;
};

/*
  Main music collection.

  IMPORTANT:
  - Keep queue empty by default.
  - Songs are only added to the queue when you manually add them.
*/

export const stuckInMyHeadSongs: Song[] = [
  {
    id: "loved-you-first",
    title: "Loved You First",
    artist: "One Direction",
    image: "/src/assets/loved-you-first.jpg",
    audio: "/music/loved-you-first.mp3",
    parts: [
      { label: "INTRO", time: 8 },
      { label: "CHORUS", time: 31 },
      { label: "⭐ THIS PARTTT", time: 121 },
    ],
    favoriteTime: 121,
  },

  {
    id: "the-girl-is-mine",
    title: "The Girl Is Mine",
    artist: "Michael Jackson & Paul McCartney",
    image: "/src/assets/the-girl-is-mine.jpg",
    audio: "/music/the-girl-is-mine.mp3",
    parts: [
      { label: "INTRO", time: 14 },
      { label: "BEST PART", time: 88 },
      { label: "ANOTHER BEST PART", time: 141 },
      { label: "PEAK CONVO", time: 180 },
    ],
  },

  {
    id: "sign-of-the-times",
    title: "Sign of the Times",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/sign-of-the-times.mp3",
    parts: [
      { label: "INTRO", time: 17 },
      { label: "CHORUS", time: 78 },
      { label: "⭐ THIS PARTTT", time: 240 },
    ],
    favoriteTime: 240,
  },

  {
    id: "whos-loving-you",
    title: "Who's Loving You",
    artist: "The Jackson 5",
    image: "/src/assets/whos-loving-you.jpg",
    audio: "/music/whos-loving-you.mp3",
    parts: [
      { label: "INTRO", time: 10 },
      { label: "⭐ THIS PARTTT", time: 187 },
    ],
  },

  {
    id: "dance-with-me",
    title: "Dance With Me",
    artist: "Dance With Me",
    image: "/src/assets/dance-with-me.jpg",
    audio: "/music/dance-with-me.mp3",
    parts: [],
  },

  {
    id: "god-was-showing-off",
    title: "God Was Showing Off",
    artist: "God Was Showing Off",
    image: "/src/assets/god-was-showing-off.jpg",
    audio: "/music/god-was-showing-off.mp3",
    parts: [
      { label: "INTRO", time: 14 },
      { label: "CHORUS", time: 38 },
      { label: "⭐ THIS PARTTT", time: 146 },
    ],
    favoriteTime: 239,
  },

  {
    id: "you-rock-my-world",
    title: "You Rock My World",
    artist: "Michael Jackson",
    image: "/src/assets/you-rock-my-world.jpg",
    audio: "/music/you-rock-my-world.mp3",
    parts: [
      { label: "INTRO", time: 29 },
    ],
  },

  {
    id: "butterflies",
    title: "Butterflies",
    artist: "Michael Jackson",
    image: "/src/assets/butterflies.jpg",
    audio: "/music/butterflies.mp3",
    parts: [],
  },
];

/*
  Harry Styles — Harry Styles (2017)
*/

const harryStylesSongs: Song[] = [
  {
    id: "harry-meet-me-in-the-hallway",
    title: "Meet Me in the Hallway",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/meet-me-in-the-hallway.mp3",
    parts: [
      { label: "INTRO", time: 8 },
      { label: "CHORUS", time: 60 },
    ],
    favoriteTime: 60,
  },

  {
    id: "harry-sign-of-the-times",
    title: "Sign of the Times",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/sign-of-the-times.mp3",
    parts: [
      { label: "INTRO", time: 17 },
      { label: "CHORUS", time: 78 },
      { label: "⭐ THIS PARTTT", time: 240 },
    ],
    favoriteTime: 240,
  },

  {
    id: "harry-carolina",
    title: "Carolina",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/carolina.mp3",
    parts: [
      { label: "INTRO", time: 8 },
      { label: "CHORUS", time: 45 },
    ],
  },

  {
    id: "harry-two-ghosts",
    title: "Two Ghosts",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/two-ghosts.mp3",
    parts: [
      { label: "INTRO", time: 10 },
      { label: "CHORUS", time: 45 },
    ],
  },

  {
    id: "harry-sweet-creature",
    title: "Sweet Creature",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/sweet-creature.mp3",
    parts: [
      { label: "INTRO", time: 8 },
      { label: "CHORUS", time: 40 },
    ],
  },

  {
    id: "harry-only-angel",
    title: "Only Angel",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/only-angel.mp3",
    parts: [
      { label: "INTRO", time: 5 },
      { label: "CHORUS", time: 45 },
    ],
  },

  {
    id: "harry-kiwi",
    title: "Kiwi",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/kiwi.mp3",
    parts: [
      { label: "INTRO", time: 5 },
      { label: "CHORUS", time: 35 },
    ],
  },

  {
    id: "harry-ever-since-new-york",
    title: "Ever Since New York",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/ever-since-new-york.mp3",
    parts: [
      { label: "INTRO", time: 8 },
      { label: "CHORUS", time: 50 },
    ],
  },

  {
    id: "harry-woman",
    title: "Woman",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/woman.mp3",
    parts: [
      { label: "INTRO", time: 8 },
      { label: "CHORUS", time: 50 },
    ],
  },

  {
    id: "harry-from-the-dining-table",
    title: "From the Dining Table",
    artist: "Harry Styles",
    image: "/src/assets/artists/harry-styles/albums/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/from-the-dining-table.mp3",
    parts: [
      { label: "INTRO", time: 8 },
      { label: "CHORUS", time: 50 },
    ],
  },
];

export const allSongs: Song[] = [
  ...stuckInMyHeadSongs,
  ...harryStylesSongs,
];

export const getSongById = (
  songId: string
): Song | undefined => {
  return allSongs.find(
    (song) => song.id === songId
  );
};

export const getHarrySongByOriginalId = (
  songId: string
): Song | undefined => {
  return allSongs.find(
    (song) =>
      song.id === songId ||
      song.id === `harry-${songId}`
  );
};