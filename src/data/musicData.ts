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
    image: "/music/images/loved-you-first.jpg",
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
    image: "/music/images/the-girl-is-mine.jpg",
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
    image: "/music/images/harry-styles.jpg",
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
    image: "/music/images/whos-loving-you.jpg",
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
    image: "/music/images/dance-with-me.jpg",
    audio: "/music/dance-with-me.mp3",
    parts: [],
  },

  {
    id: "god-was-showing-off",
    title: "God Was Showing Off",
    artist: "God Was Showing Off",
    image: "/music/images/god-was-showing-off.jpg",
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
    image: "/music/images/you-rock-my-world.jpg",
    audio: "/music/you-rock-my-world.mp3",
    parts: [
      { label: "INTRO", time: 29 },
    ],
  },

  {
    id: "butterflies",
    title: "Butterflies",
    artist: "Michael Jackson",
    image: "/music/images/butterflies.jpg",
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
    image: "/music/images/harry-styles.jpg",
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
    image: "/music/images/harry-styles.jpg",
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
    image: "/music/images/harry-styles.jpg",
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
    image: "/music/images/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/two-ghost.mp3",
    parts: [
      { label: "INTRO", time: 10 },
      { label: "CHORUS", time: 45 },
    ],
  },

  {
    id: "harry-sweet-creature",
    title: "Sweet Creature",
    artist: "Harry Styles",
    image: "/music/images/harry-styles.jpg",
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
    image: "/music/images/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/only-angel.mp3",
    parts: [
      { label: "INTRO", time: 53 },
      { label: "CHORUS", time: 105 },
    ],
  },

  {
    id: "harry-kiwi",
    title: "Kiwi",
    artist: "Harry Styles",
    image: "/music/images/harry-styles.jpg",
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
    image: "/music/images/harry-styles.jpg",
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
    image: "/music/images/harry-styles.jpg",
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
    image: "/music/images/harry-styles.jpg",
    audio: "/music/harry-styles/hs1/from-the-dining-table.mp3",
    parts: [
      { label: "INTRO", time: 8 },
      { label: "CHORUS", time: 50 },
    ],
  },
];

/*
  One Direction — Up All Night (2011)
*/

export const oneDirectionSongs: Song[] = [
  {
    id: "one-direction-what-makes-you-beautiful",
    title: "What Makes You Beautiful",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/what-makes-you-beautiful.mp3",
  },

  {
    id: "one-direction-gotta-be-you",
    title: "Gotta Be You",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/gotta-be-you.mp3",
  },

  {
    id: "one-direction-one-thing",
    title: "One Thing",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/one-thing.mp3",
  },

  {
    id: "one-direction-more-than-this",
    title: "More Than This",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/more-than-this.mp3",
  },

  {
    id: "one-direction-up-all-night",
    title: "Up All Night",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night.mp3",
  },

  {
    id: "one-direction-i-want",
    title: "I Want",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/i-want.mp3",
  },

  {
    id: "one-direction-everything-about-you",
    title: "Everything About You",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/everything-about-you.mp3",
  },

  {
    id: "one-direction-same-mistakes",
    title: "Same Mistakes",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/same-mistakes.mp3",
  },

  {
    id: "one-direction-save-you-tonight",
    title: "Save You Tonight",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/save-you-tonight.mp3",
  },

  {
    id: "one-direction-stole-my-heart",
    title: "Stole My Heart",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/stole-my-heart.mp3",
  },

  {
    id: "one-direction-stand-up",
    title: "Stand Up",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/stand-up.mp3",
  },

  {
    id: "one-direction-moments",
    title: "Moments",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/moments.mp3",
  },

  {
    id: "one-direction-taken",
    title: "Taken",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/taken.mp3",
  },

  {
    id: "one-direction-tell-me-a-lie",
    title: "Tell Me a Lie",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/tell-me-a-lie.mp3",
  },

  {
    id: "one-direction-i-should-have-kissed-you",
    title: "I Should Have Kissed You",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/i-should-have-kissed-you.mp3",
  },

  {
    id: "one-direction-i-wish",
    title: "I Wish",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/i-wish.mp3",
  },

  {
    id: "one-direction-another-world",
    title: "Another World",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/another-world.mp3",
  },

  {
    id: "one-direction-na-na-na",
    title: "Na Na Na",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/na-na-na.mp3",
  },
];

/*
  Complete music collection
*/

export const allSongs: Song[] = [
  ...stuckInMyHeadSongs,
  ...harryStylesSongs,
  ...oneDirectionSongs,
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