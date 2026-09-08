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
  =====================================================
  STUCK IN MY HEAD
  =====================================================
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
  =====================================================
  HARRY STYLES — HARRY STYLES (2017)
  =====================================================
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
  =====================================================
  ONE DIRECTION — UP ALL NIGHT (2011)
  =====================================================

  Audio files are now inside:

  public/music/one-direction/up-all-night/
*/

export const oneDirectionSongs: Song[] = [
  {
    id: "one-direction-what-makes-you-beautiful",
    title: "What Makes You Beautiful",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/what-makes-you-beautiful.mp3",
  },

  {
    id: "one-direction-gotta-be-you",
    title: "Gotta Be You",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/gotta-be-you.mp3",
  },

  {
    id: "one-direction-one-thing",
    title: "One Thing",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/one-thing.mp3",
  },

  {
    id: "one-direction-more-than-this",
    title: "More Than This",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/more-than-this.mp3",
  },

  {
    id: "one-direction-up-all-night",
    title: "Up All Night",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/up-all-night.mp3",
  },

  {
    id: "one-direction-i-want",
    title: "I Want",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/i-want.mp3",
  },

  {
    id: "one-direction-everything-about-you",
    title: "Everything About You",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/everything-about-you.mp3",
  },

  {
    id: "one-direction-same-mistakes",
    title: "Same Mistakes",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/same-mistakes.mp3",
  },

  {
    id: "one-direction-save-you-tonight",
    title: "Save You Tonight",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/save-you-tonight.mp3",
  },

  {
    id: "one-direction-stole-my-heart",
    title: "Stole My Heart",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/stole-my-heart.mp3",
  },

  {
    id: "one-direction-stand-up",
    title: "Stand Up",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/stand-up.mp3",
  },

  {
    id: "one-direction-moments",
    title: "Moments",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/moments.mp3",
  },

  {
    id: "one-direction-taken",
    title: "Taken",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/taken.mp3",
  },

  {
    id: "one-direction-tell-me-a-lie",
    title: "Tell Me a Lie",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/tell-me-a-lie.mp3",
  },

  {
    id: "one-direction-i-should-have-kissed-you",
    title: "I Should Have Kissed You",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/i-should-have-kissed-you.mp3",
  },

  {
    id: "one-direction-i-wish",
    title: "I Wish",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/i-wish.mp3",
  },

  {
    id: "one-direction-another-world",
    title: "Another World",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/another-world.mp3",
  },

  {
    id: "one-direction-na-na-na",
    title: "Na Na Na",
    artist: "One Direction",
    image: "/artists/one-direction/albums/up-all-night.jpg",
    audio: "/music/one-direction/up-all-night/na-na-na.mp3",
  },
];

/*
  =====================================================
  ONE DIRECTION — TAKE ME HOME (2012)
  =====================================================

  These IDs are intentionally WITHOUT the
  "one-direction-" prefix here.

  Artists.tsx converts them to:

  one-direction-back-for-you
  one-direction-change-my-mind
  etc.

  This also keeps the album data reusable.
*/

export const takeMeHomeSongs: Song[] = [
  {
    id: "back-for-you",
    title: "Back for You",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/back-for-you.mp3",
  },

  {
    id: "cmon-cmon",
    title: "C'mon, C'mon",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/c'mon-c'mon.mp3",
  },

  {
    id: "change-my-mind",
    title: "Change My Mind",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/change-my-mind.mp3",
  },

  {
    id: "heart-attack",
    title: "Heart Attack",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/heart-attack.mp3",
  },

  {
    id: "i-would",
    title: "I Would",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/i-would.mp3",
  },

  {
    id: "irresistible",
    title: "Irresistible",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/irresistible.mp3",
  },

  {
    id: "kiss-you",
    title: "Kiss You",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/kiss-you.mp3",
  },

  {
    id: "last-first-kiss",
    title: "Last First Kiss",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/last-first-kiss.mp3",
  },

  {
    id: "little-things",
    title: "Little Things",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/little-things.mp3",
  },

  {
    id: "live-while-were-young",
    title: "Live While We're Young",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/live-while-were-young.mp3",
  },

  {
    id: "magic",
    title: "Magic",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/magic.mp3",
  },

  {
    id: "nobody-compares",
    title: "Nobody Compares",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/nobody-compares.mp3",
  },

  {
    id: "over-again",
    title: "Over Again",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/over-again.mp3",
  },

  {
    id: "rock-me",
    title: "Rock Me",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/rock-me.mp3",
  },

  {
    id: "shes-not-afraid",
    title: "She's Not Afraid",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/she's-not-afraid.mp3",
  },

  {
    id: "still-the-one",
    title: "Still the One",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/still-the-one.mp3",
  },

  {
    id: "summer-love",
    title: "Summer Love",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/summer-love.mp3",
  },

  {
    id: "they-dont-know-about-us",
    title: "They Don't Know About Us",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/they-don't-know-about-us.mp3",
  },

  {
    id: "truly-madly-deeply",
    title: "Truly Madly Deeply",
    artist: "One Direction",
    image: "/artists/one-direction/albums/take-me-home.jpg",
    audio: "/music/one-direction/take-me-home/truly-madly-deeply.mp3",
  },
];

/*
  =====================================================
  COMPLETE MUSIC COLLECTION
  =====================================================
*/

export const allSongs: Song[] = [
  ...stuckInMyHeadSongs,
  ...harryStylesSongs,
  ...oneDirectionSongs,

  /*
    IMPORTANT:
    Prefix Take Me Home IDs because Artists.tsx
    sends one-direction-${songId}.
  */
  ...takeMeHomeSongs.map((song) => ({
    ...song,
    id: `one-direction-${song.id}`,
  })),
];

/*
  =====================================================
  SONG LOOKUP
  =====================================================
*/

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