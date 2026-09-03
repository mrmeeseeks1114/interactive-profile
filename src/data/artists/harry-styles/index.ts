import artistImage from "../../../assets/artists/harry-styles/harry-styles.jpg";
import { harryStylesFirstAlbum } from "./albums/harry-styles";

export type ArtistAlbum = {
  id: string;
  title: string;
  artist: string;
  year: number;
  image?: string;
  songs: typeof harryStylesFirstAlbum.songs;
  locked?: boolean;
};

export const harryStylesArtist = {
  id: "harry-styles",
  name: "Harry Styles",

  image: artistImage,

  description:
    "one of my favorite artists. every album has a different vibe.",

  // ONLY Sign of the Times for now
  popularSongs: [
    harryStylesFirstAlbum.songs.find(
      (song) => song.id === "sign-of-the-times"
    )!,
  ],

  albums: [
    {
      id: "harry-styles-2017",
      title: "Harry Styles",
      artist: "Harry Styles",
      year: 2017,
      image: harryStylesFirstAlbum.image,
      songs: harryStylesFirstAlbum.songs,
      locked: false,
    },

    {
      id: "fine-line",
      title: "Fine Line",
      artist: "Harry Styles",
      year: 2019,
      songs: [],
      locked: true,
    },

    {
      id: "harrys-house",
      title: "Harry's House",
      artist: "Harry Styles",
      year: 2022,
      songs: [],
      locked: true,
    },

    {
      id: "kiss-all-the-time",
      title: "Kiss All the Time. Disco, Occasionally.",
      artist: "Harry Styles",
      year: 2026,
      songs: [],
      locked: true,
    },
  ] satisfies ArtistAlbum[],
};