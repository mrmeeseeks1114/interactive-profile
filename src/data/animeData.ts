export interface Anime {
  id: string;
  title: string;
  image: string;
  genre: string;
  description: string;
  whyILikeIt: string;
}

export const animeData: Anime[] = [
  {
    id: "naruto",

    title: "Naruto",

    image: "/anime/naruto.jpg",

    genre:
      "Action • Adventure • Shonen",

    description:
      "Naruto follows a young ninja who dreams of becoming Hokage while trying to earn the respect of the people around him. Along the way, he builds friendships, faces powerful enemies, and discovers more about himself and his past.",

    whyILikeIt:
      "The characters, fights, rivalries, and Naruto's determination make this one of my favorites.",
  },

  {
    id: "aot",

    title: "Attack on Titan",

    image: "/anime/aot.jpg",

    genre:
      "Action • Dark Fantasy • Drama",

    description:
      "Attack on Titan follows humanity as it struggles to survive against mysterious Titans. What begins as a fight for survival eventually becomes a much larger story about freedom, conflict, and the history of the world.",

    whyILikeIt:
      "The plot twists are insane and the story keeps getting crazier.",
  },

  {
    id: "jjk",

    title: "Jujutsu Kaisen",

    image: "/anime/jjk.jpg",

    genre:
      "Action • Supernatural • Shonen",

    description:
      "Jujutsu Kaisen follows Yuji Itadori after he becomes involved with cursed spirits and jujutsu sorcerers. He joins a school where sorcerers learn to fight curses and protect people.",

    whyILikeIt:
      "The fights, characters, animation, and absolute chaos go hard.",
  },

  {
    id: "demon-slayer",

    title: "Demon Slayer",

    image:
      "/anime/demon-slayer.jpg",

    genre:
      "Action • Fantasy • Adventure",

    description:
      "Demon Slayer follows Tanjiro Kamado after his family is attacked and his sister Nezuko is transformed into a demon. Tanjiro begins training as a demon slayer while searching for a way to help his sister.",

    whyILikeIt:
      "The animation and fight scenes are ridiculously good.",
  },

  {
    id: "one-punch-man",

    title: "One Punch Man",

    image:
      "/anime/one-punch-man.jpg",

    genre:
      "Action • Comedy • Superhero",

    description:
      "One Punch Man follows Saitama, a hero who has become incredibly powerful and can defeat most opponents with a single punch. His biggest problem is finding someone strong enough to actually challenge him.",

    whyILikeIt:
      "It's funny, overpowered, and the fights are entertaining as hell.",
  },
];