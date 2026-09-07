import upAllNight from "./albums/up-all-night";
import takeMeHome from "./albums/takeMeHome";
import midnightMemories from "./albums/midnight-memories";
import four from "./albums/four";
import madeInTheAm from "./albums/made-in-the-am";

export const oneDirectionArtist = {
  id: "one-direction",

  name: "One Direction",

  image: "/artists/one-direction/one-direction.jpg",

  description:
    "one direction songs that i've had on repeat for way too long.",

  popularSongs: [
    {
      id: "what-makes-you-beautiful",
      title: "What Makes You Beautiful",
      artist: "One Direction",
      image:
        "/artists/one-direction/albums/up-all-night.jpg",
    },

    {
      id: "one-thing",
      title: "One Thing",
      artist: "One Direction",
      image:
        "/artists/one-direction/albums/up-all-night.jpg",
    },

    {
      id: "loved-you-first",
      title: "Loved You First",
      artist: "One Direction",
      image:
        "/music/images/loved-you-first.jpg",
    },
  ],

  albums: [
    upAllNight,
    takeMeHome,
    midnightMemories,
    four,
    madeInTheAm,
  ],
};

export default oneDirectionArtist;