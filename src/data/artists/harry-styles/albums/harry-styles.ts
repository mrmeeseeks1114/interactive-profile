import albumImage from "../../../../assets/artists/harry-styles/albums/harry-styles.jpg";

export type HarrySong = {
  id: string;
  title: string;
  artist: string;
  image: string;
  audio: string;
  parts: {
    label: string;
    time: number;
  }[];
  favoriteTime?: number;
};

export const harryStylesFirstAlbum = {
  id: "harry-styles-2017",
  title: "Harry Styles",
  artist: "Harry Styles",
  year: 2017,
  image: albumImage,

  songs: [
    {
      id: "meet-me-in-the-hallway",
      title: "Meet Me in the Hallway",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/meet-me-in-the-hallway.mp3",
      parts: [],
    },

    {
      id: "sign-of-the-times",
      title: "Sign of the Times",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/sign-of-the-times.mp3",
      parts: [],
    },

    {
      id: "carolina",
      title: "Carolina",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/carolina.mp3",
      parts: [],
    },

    {
      id: "two-ghosts",
      title: "Two Ghosts",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/two-ghost.mp3",
      parts: [],
    },

    {
      id: "sweet-creature",
      title: "Sweet Creature",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/sweet-creature.mp3",
      parts: [],
    },

    {
      id: "only-angel",
      title: "Only Angel",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/only-angel.mp3",
      parts: [],
    },

    {
      id: "kiwi",
      title: "Kiwi",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/kiwi.mp3",
      parts: [],
    },

    {
      id: "ever-since-new-york",
      title: "Ever Since New York",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/ever-since-new-york.mp3",
      parts: [],
    },

    {
      id: "woman",
      title: "Woman",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/woman.mp3",
      parts: [],
    },

    {
      id: "from-the-dining-table",
      title: "From the Dining Table",
      artist: "Harry Styles",
      image: albumImage,
      audio:
        "/music/harry-styles/hs1/from-the-dining-table.mp3",
      parts: [],
    },
  ] satisfies HarrySong[],
};