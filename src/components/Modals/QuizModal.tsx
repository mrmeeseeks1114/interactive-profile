import { useEffect, useState } from "react";

import {
  Button,
  Modal,
  Progress,
  Tag,
  Typography,
  message,
} from "antd";

import { supabase } from "../../supabase";

import "./QuizModal.css";

const { Title, Text } = Typography;

/* =====================================
   TYPES
===================================== */

type QuizModalProps = {
  open: boolean;
  onClose: () => void;
  username: string;
};

type Question = {
  question: string;
  options: string[];
  answer: string;
  category:
    | "ANIME FACT"
    | "ABOUT ME"
    | "ATTACK ON TITAN"
    | "JUJUTSU KAISEN"
    | "ONE PUNCH MAN"
    | "MCU"
    | "DEMON SLAYER";
};

/* =====================================
   QUESTION POOL
   110 TOTAL QUESTIONS
===================================== */

const questionPool: Question[] = [

  /* =====================================
     ABOUT ME — 25 QUESTIONS
  ===================================== */

  {
    question: "How old am I?",
    options: ["16", "17", "18", "19"],
    answer: "18",
    category: "ABOUT ME",
  },

  {
    question: "Who do I cosplay as in Roblox?",
    options: [
      "Michael Jackson",
      "Spider-Man",
      "Itachi",
      "Naruto",
    ],
    answer: "Michael Jackson",
    category: "ABOUT ME",
  },

  {
    question: "What is my favorite One Direction song?",
    options: [
      "Night Changes",
      "Fireproof",
      "Perfect",
      "Story of My Life",
    ],
    answer: "Fireproof",
    category: "ABOUT ME",
  },

  {
    question: "Which group is one of my favorites?",
    options: [
      "One Direction",
      "BTS",
      "Coldplay",
      "Maroon 5",
    ],
    answer: "One Direction",
    category: "ABOUT ME",
  },

  {
    question: "Which One Direction member is my favorite?",
    options: [
      "Harry Styles",
      "Louis Tomlinson",
      "Zayn Malik",
      "Liam Payne",
    ],
    answer: "Zayn Malik",
    category: "ABOUT ME",
  },

  {
    question: "Which anime character do I really like?",
    options: [
      "Itachi",
      "Luffy",
      "Gojo",
      "Levi",
    ],
    answer: "Itachi",
    category: "ABOUT ME",
  },

  {
    question: "Which other Naruto character do I like?",
    options: [
      "Minato",
      "Sasuke",
      "Kakashi",
      "Madara",
    ],
    answer: "Minato",
    category: "ABOUT ME",
  },

  {
    question: "Which anime is one of my favorites?",
    options: [
      "Naruto",
      "Bleach",
      "One Piece",
      "Demon Slayer",
    ],
    answer: "Naruto",
    category: "ABOUT ME",
  },

  {
    question: "What snack do I like?",
    options: [
      "Chips",
      "Salad",
      "Apples",
      "Yogurt",
    ],
    answer: "Chips",
    category: "ABOUT ME",
  },

  {
    question: "Which TV show do I like?",
    options: [
      "Friends",
      "Young Sheldon",
      "The Office",
      "Wednesday",
    ],
    answer: "Young Sheldon",
    category: "ABOUT ME",
  },

  {
    question: "Which superhero do I like?",
    options: [
      "Batman",
      "Superman",
      "Spider-Man",
      "Iron Man",
    ],
    answer: "Spider-Man",
    category: "ABOUT ME",
  },

  {
    question: "Which color combination do I like?",
    options: [
      "Blue-white",
      "Orange-black",
      "Red-green",
      "Purple-yellow",
    ],
    answer: "Orange-black",
    category: "ABOUT ME",
  },

  {
    question: "What kind of games do I enjoy?",
    options: [
      "Only racing games",
      "Only puzzle games",
      "Gaming in general",
      "Only sports games",
    ],
    answer: "Gaming in general",
    category: "ABOUT ME",
  },

  {
    question: "Which game have I worked on before?",
    options: [
      "Tic-Tac-Toe",
      "FIFA",
      "Fortnite",
      "Valorant",
    ],
    answer: "Tic-Tac-Toe",
    category: "ABOUT ME",
  },

  {
    question: "Which game have I mentioned playing?",
    options: [
      "Minecraft",
      "The Sims",
      "Overwatch",
      "Apex Legends",
    ],
    answer: "Minecraft",
    category: "ABOUT ME",
  },

  {
    question: "Which other game have I mentioned playing?",
    options: [
      "Roblox",
      "League of Legends",
      "Dota 2",
      "CS2",
    ],
    answer: "Roblox",
    category: "ABOUT ME",
  },

  {
    question: "What programming language have I worked with?",
    options: [
      "Java",
      "Swift",
      "Kotlin",
      "Ruby",
    ],
    answer: "Java",
    category: "ABOUT ME",
  },

  {
    question: "Which frontend technology have I used?",
    options: [
      "React",
      "Laravel",
      "Django",
      "Rails",
    ],
    answer: "React",
    category: "ABOUT ME",
  },

  {
    question: "Which database technology have I worked with?",
    options: [
      "MySQL",
      "MongoDB",
      "Redis",
      "Firebase",
    ],
    answer: "MySQL",
    category: "ABOUT ME",
  },

  {
    question:
      "Which networking software have I used for school activities?",
    options: [
      "Cisco Packet Tracer",
      "Figma",
      "Unity",
      "Blender",
    ],
    answer: "Cisco Packet Tracer",
    category: "ABOUT ME",
  },

  {
    question:
      "What kind of website am I currently building?",
    options: [
      "An interactive personal profile",
      "An online store",
      "A news website",
      "A banking website",
    ],
    answer: "An interactive personal profile",
    category: "ABOUT ME",
  },

  {
    question:
      "What is one of the main themes of my website?",
    options: [
      "Random stuff and chaos",
      "Cooking",
      "Travel",
      "Cars",
    ],
    answer: "Random stuff and chaos",
    category: "ABOUT ME",
  },

  {
    question:
      "What kind of content is featured on my website?",
    options: [
      "Music, anime, gaming and random stuff",
      "Only school notes",
      "Only photography",
      "Only recipes",
    ],
    answer: "Music, anime, gaming and random stuff",
    category: "ABOUT ME",
  },

  {
    question:
      "What fictional character is strongly associated with my anime interests?",
    options: [
      "Itachi",
      "Goku",
      "Tanjiro",
      "Luffy",
    ],
    answer: "Itachi",
    category: "ABOUT ME",
  },

  {
    question:
      "What would I probably choose for entertainment?",
    options: [
      "Gaming",
      "Watching paint dry",
      "Doing nothing",
      "Reading tax documents",
    ],
    answer: "Gaming",
    category: "ABOUT ME",
  },

  /* =====================================
     GENERAL ANIME FACTS — 25 QUESTIONS
  ===================================== */

  {
    question: "Who is Naruto's father?",
    options: [
      "Jiraiya",
      "Minato Namikaze",
      "Kakashi Hatake",
      "Hiruzen Sarutobi",
    ],
    answer: "Minato Namikaze",
    category: "ANIME FACT",
  },

  {
    question: "What is Naruto's signature technique?",
    options: [
      "Rasengan",
      "Chidori",
      "Amaterasu",
      "Shadow Possession",
    ],
    answer: "Rasengan",
    category: "ANIME FACT",
  },

  {
    question: "What clan does Itachi belong to?",
    options: [
      "Uchiha",
      "Hyuga",
      "Senju",
      "Nara",
    ],
    answer: "Uchiha",
    category: "ANIME FACT",
  },

  {
    question: "What is Sasuke's clan?",
    options: [
      "Uchiha",
      "Uzumaki",
      "Hatake",
      "Akimichi",
    ],
    answer: "Uchiha",
    category: "ANIME FACT",
  },

  {
    question: "Who created the Rasengan?",
    options: [
      "Minato",
      "Naruto",
      "Jiraiya",
      "Kakashi",
    ],
    answer: "Minato",
    category: "ANIME FACT",
  },

  {
    question: "What is the name of Naruto's mother?",
    options: [
      "Kushina Uzumaki",
      "Hinata Hyuga",
      "Sakura Haruno",
      "Tsunade",
    ],
    answer: "Kushina Uzumaki",
    category: "ANIME FACT",
  },

  {
    question: "What is the name of Naruto's tailed beast?",
    options: [
      "Kurama",
      "Shukaku",
      "Gyuki",
      "Matatabi",
    ],
    answer: "Kurama",
    category: "ANIME FACT",
  },

  {
    question:
      "Which eye technique is associated with the Uchiha?",
    options: [
      "Byakugan",
      "Sharingan",
      "Rinnegan",
      "Tenseigan",
    ],
    answer: "Sharingan",
    category: "ANIME FACT",
  },

  {
    question: "Who was Kakashi's teammate?",
    options: [
      "Obito Uchiha",
      "Neji Hyuga",
      "Shikamaru Nara",
      "Rock Lee",
    ],
    answer: "Obito Uchiha",
    category: "ANIME FACT",
  },

  {
    question: "Who was Team 7's teacher?",
    options: [
      "Kakashi",
      "Jiraiya",
      "Might Guy",
      "Asuma",
    ],
    answer: "Kakashi",
    category: "ANIME FACT",
  },

  {
    question: "What village is Naruto from?",
    options: [
      "Hidden Leaf Village",
      "Hidden Sand Village",
      "Hidden Mist Village",
      "Hidden Stone Village",
    ],
    answer: "Hidden Leaf Village",
    category: "ANIME FACT",
  },

  {
    question: "Who is known as the Copy Ninja?",
    options: [
      "Kakashi",
      "Itachi",
      "Minato",
      "Sasuke",
    ],
    answer: "Kakashi",
    category: "ANIME FACT",
  },

  {
    question:
      "What is One Piece's main character's name?",
    options: [
      "Monkey D. Luffy",
      "Roronoa Zoro",
      "Sanji",
      "Portgas D. Ace",
    ],
    answer: "Monkey D. Luffy",
    category: "ANIME FACT",
  },

  {
    question: "What does Luffy want to become?",
    options: [
      "Hokage",
      "Pirate King",
      "Soul Reaper",
      "Hero",
    ],
    answer: "Pirate King",
    category: "ANIME FACT",
  },

  {
    question: "What is Luffy's iconic hat?",
    options: [
      "Straw Hat",
      "Sun Hat",
      "Pirate Crown",
      "Red Hat",
    ],
    answer: "Straw Hat",
    category: "ANIME FACT",
  },

  {
    question: "Who uses Bankai in Bleach?",
    options: [
      "Soul Reapers",
      "Saiyans",
      "Pirates",
      "Ninjas",
    ],
    answer: "Soul Reapers",
    category: "ANIME FACT",
  },

  {
    question: "What is Ichigo's last name?",
    options: [
      "Kurosaki",
      "Uchiha",
      "Kamado",
      "Ackerman",
    ],
    answer: "Kurosaki",
    category: "ANIME FACT",
  },

  {
    question:
      "Who is the main character of Attack on Titan?",
    options: [
      "Eren Yeager",
      "Levi Ackerman",
      "Armin Arlert",
      "Reiner Braun",
    ],
    answer: "Eren Yeager",
    category: "ANIME FACT",
  },

  {
    question:
      "What are the giant humanoid creatures in Attack on Titan called?",
    options: [
      "Titans",
      "Demons",
      "Hollows",
      "Giants",
    ],
    answer: "Titans",
    category: "ANIME FACT",
  },

  {
    question:
      "Who is known as the strongest member of the Survey Corps?",
    options: [
      "Levi Ackerman",
      "Eren Yeager",
      "Armin Arlert",
      "Jean Kirstein",
    ],
    answer: "Levi Ackerman",
    category: "ANIME FACT",
  },

  {
    question:
      "What anime features Tanjiro Kamado?",
    options: [
      "Demon Slayer",
      "Naruto",
      "Bleach",
      "One Piece",
    ],
    answer: "Demon Slayer",
    category: "ANIME FACT",
  },

  {
    question: "What is Tanjiro's sister's name?",
    options: [
      "Nezuko",
      "Mitsuri",
      "Shinobu",
      "Kanao",
    ],
    answer: "Nezuko",
    category: "ANIME FACT",
  },

  {
    question:
      "What breathing style does Tanjiro initially use?",
    options: [
      "Water Breathing",
      "Fire Breathing",
      "Thunder Breathing",
      "Wind Breathing",
    ],
    answer: "Water Breathing",
    category: "ANIME FACT",
  },

  {
    question:
      "Who is the main character of Dragon Ball?",
    options: [
      "Goku",
      "Vegeta",
      "Gohan",
      "Piccolo",
    ],
    answer: "Goku",
    category: "ANIME FACT",
  },

  {
    question:
      "What transformation is famous in Dragon Ball?",
    options: [
      "Super Saiyan",
      "Bankai",
      "Sage Mode",
      "Domain Expansion",
    ],
    answer: "Super Saiyan",
    category: "ANIME FACT",
  },

  /* =====================================
     ATTACK ON TITAN — 10 QUESTIONS
  ===================================== */

  {
    question: "What is the name of Eren's hometown?",
    options: [
      "Shiganshina",
      "Trost",
      "Mitras",
      "Leaf Village",
    ],
    answer: "Shiganshina",
    category: "ATTACK ON TITAN",
  },

  {
    question: "What is Eren's last name?",
    options: [
      "Yeager",
      "Ackerman",
      "Arlert",
      "Bigger",
    ],
    answer: "Yeager",
    category: "ATTACK ON TITAN",
  },

  {
    question: "Who is Eren's adoptive sister?",
    options: [
      "Mikasa Ackerman",
      "Historia Reiss",
      "Annie Leonhart",
      "Sasha Blouse",
    ],
    answer: "Mikasa Ackerman",
    category: "ATTACK ON TITAN",
  },

  {
    question:
      "What military branch does Levi serve in?",
    options: [
      "Survey Corps",
      "Military Police",
      "Garrison",
      "Jujutsu Sorcerers",
    ],
    answer: "Survey Corps",
    category: "ATTACK ON TITAN",
  },

  {
    question:
      "What is the name of the wall closest to the outside?",
    options: [
      "Wall Maria",
      "Wall Rose",
      "Wall Sina",
      "Wall Shiganshina",
    ],
    answer: "Wall Maria",
    category: "ATTACK ON TITAN",
  },

  {
    question:
      "Which character is known for loving potatoes?",
    options: [
      "Sasha Blouse",
      "Mikasa Ackerman",
      "Historia Reiss",
      "Annie Leonhart",
    ],
    answer: "Sasha Blouse",
    category: "ATTACK ON TITAN",
  },

  {
    question:
      "Who is the commander of the Survey Corps for much of the series?",
    options: [
      "Erwin Smith",
      "Levi Ackerman",
      "Jean Kirstein",
      "Hange Zoe",
    ],
    answer: "Erwin Smith",
    category: "ATTACK ON TITAN",
  },

  {
    question:
      "What is the name of the device soldiers use to move through the air?",
    options: [
      "ODM Gear",
      "Titan Gear",
      "3D Maneuver Suit",
      "Web Shooters",
    ],
    answer: "ODM Gear",
    category: "ATTACK ON TITAN",
  },

  {
    question:
      "Which Titan is known for its armored body?",
    options: [
      "Armored Titan",
      "Tank Titan",
      "Titan with Diamond Armor",
      "Jaw Titan",
    ],
    answer: "Armored Titan",
    category: "ATTACK ON TITAN",
  },

  {
    question:
      "Who is Eren's childhood friend known for his intelligence?",
    options: [
      "Armin Arlert",
      "Jean Kirstein",
      "Connie Springer",
      "Ymir Fritz",
    ],
    answer: "Armin Arlert",
    category: "ATTACK ON TITAN",
  },

  /* =====================================
     JUJUTSU KAISEN — 10 QUESTIONS
  ===================================== */

  {
    question:
      "Who is the main protagonist of Jujutsu Kaisen?",
    options: [
      "Yuji Itadori",
      "Megumi Fushiguro",
      "Yuta Okkotsu",
      "Satoru Gojo",
    ],
    answer: "Yuji Itadori",
    category: "JUJUTSU KAISEN",
  },

  {
    question:
      "Who is known as the strongest sorcerer?",
    options: [
      "Satoru Gojo",
      "Suguru Geto",
      "Megumi Fushiguro",
      "Kento Nanami",
    ],
    answer: "Satoru Gojo",
    category: "JUJUTSU KAISEN",
  },

  {
    question:
      "What curse is inside Yuji Itadori?",
    options: [
      "Ryomen Sukuna",
      "Mahito",
      "Jogo",
      "Hanami",
    ],
    answer: "Ryomen Sukuna",
    category: "JUJUTSU KAISEN",
  },

  {
    question: "What is Megumi's surname?",
    options: [
      "Fushiguro",
      "Zenin",
      "Kamo",
      "Inumaki",
    ],
    answer: "Fushiguro",
    category: "JUJUTSU KAISEN",
  },

  {
    question:
      "What cursed technique does Megumi primarily use?",
    options: [
      "Ten Shadows Technique",
      "Limitless",
      "Boogie Woogie",
      "Blood Manipulation",
    ],
    answer: "Ten Shadows Technique",
    category: "JUJUTSU KAISEN",
  },

  {
    question:
      "Who is Yuji's Brown-haired classmate with a hammer and nails?",
    options: [
      "Nobara Kugisaki",
      "Maki Zenin",
      "Hinata Hyuga",
      "Miwa Kasumi",
    ],
    answer: "Nobara Kugisaki",
    category: "JUJUTSU KAISEN",
  },

  {
    question:
      "What is Gojo's famous eye ability called?",
    options: [
      "Six Eyes",
      "Sharingan",
      "Five Guys",
      "Rinnegan",
    ],
    answer: "Six Eyes",
    category: "JUJUTSU KAISEN",
  },

  {
    question:
      "What is Gojo's inherited cursed technique?",
    options: [
      "Limitless",
      "Ten Shadows",
      "Ratio Technique",
      "Cursed Speech",
    ],
    answer: "Limitless",
    category: "JUJUTSU KAISEN",
  },

  {
    question:
      "Who uses the cursed technique called Boogie Woogie?",
    options: [
      "Aoi Todo",
      "Naruto Uzumaki",
      "Toge Inumaki",
      "Panda",
    ],
    answer: "Aoi Todo",
    category: "JUJUTSU KAISEN",
  },

  {
    question:
      "What school do Yuji, Megumi and Nobara attend?",
    options: [
      "Tokyo Jujutsu High",
      "Kyoto Jujutsu High",
      "Tokyo Hero Academy",
      "Ninja Academy",
    ],
    answer: "Tokyo Jujutsu High",
    category: "JUJUTSU KAISEN",
  },

  /* =====================================
     ONE PUNCH MAN — 10 QUESTIONS
  ===================================== */

  {
    question:
      "What is the real name of One Punch Man?",
    options: [
      "Saitama",
      "Genos",
      "Garou",
      "Caped Baldy",
    ],
    answer: "Saitama",
    category: "ONE PUNCH MAN",
  },

  {
    question:
      "How does Saitama usually defeat his enemies?",
    options: [
      "With one punch",
      "With his powerful Head",
      "With magic",
      "With a gun",
    ],
    answer: "With one punch",
    category: "ONE PUNCH MAN",
  },

  {
    question: "What is Genos?",
    options: [
      "A cyborg",
      "A Demon Slayer",
      "A ninja",
      "An alien",
    ],
    answer: "A cyborg",
    category: "ONE PUNCH MAN",
  },

  {
    question: "Who considers Saitama his master?",
    options: [
      "Genos",
      "King",
      "Garou",
      "Bang",
    ],
    answer: "Genos",
    category: "ONE PUNCH MAN",
  },

  {
    question:
      "What is Saitama's hero rank when he first joins the Hero Association?",
    options: [
      "C-Class",
      "B-Class",
      "A-Class",
      "S-Class",
    ],
    answer: "C-Class",
    category: "ONE PUNCH MAN",
  },

  {
    question:
      "What is Saitama's main reason for becoming a hero?",
    options: [
      "He wanted to be a hero for fun",
      "He wanted money",
      "He wanted revenge",
      "He wanted fame",
    ],
    answer: "He wanted to be a hero for fun",
    category: "ONE PUNCH MAN",
  },

  {
    question:
      "Which hero is famous for being extremely lucky despite being weak?",
    options: [
      "King",
      "Mumen Rider",
      "Genos",
      "Child Emperor",
    ],
    answer: "King",
    category: "ONE PUNCH MAN",
  },

  {
    question:
      "What is the name of the martial artist who trained Genos?",
    options: [
      "Bang",
      "Atomic Samurai",
      "Silver Fang",
      "Saitama",
    ],
    answer: "Bang",
    category: "ONE PUNCH MAN",
  },

  {
    question: "What is Garou known as?",
    options: [
      "Hero Hunter",
      "Monster King",
      "Cyborg Hunter",
      "Ninja King",
    ],
    answer: "Hero Hunter",
    category: "ONE PUNCH MAN",
  },

  {
    question:
      "What class is considered the highest standard hero class?",
    options: [
      "S-Class",
      "A-Class",
      "B-Class",
      "C-Class",
    ],
    answer: "S-Class",
    category: "ONE PUNCH MAN",
  },

  /* =====================================
     DEMON SLAYER — 10 QUESTIONS
  ===================================== */

  {
    question:
      "What is Tanjiro Kamado's main goal?",
    options: [
      "Turn Nezuko back into a human",
      "Become Hashira immediately",
      "Become a demon",
      "Find the One Piece",
    ],
    answer: "Turn Nezuko back into a human",
    category: "DEMON SLAYER",
  },

  {
    question:
      "What is Tanjiro's sister's name?",
    options: [
      "Nezuko",
      "Kanao",
      "Mitsuri",
      "Aoi",
    ],
    answer: "Nezuko",
    category: "DEMON SLAYER",
  },

  {
    question:
      "Who trained Tanjiro before his Final Selection?",
    options: [
      "Sakonji Urokodaki",
      "Giyu Tomioka",
      "Kyojuro Rengoku",
      "Tengen Uzui",
    ],
    answer: "Sakonji Urokodaki",
    category: "DEMON SLAYER",
  },

  {
    question:
      "What breathing style does Zenitsu use?",
    options: [
      "Thunder Breathing",
      "Water Breathing",
      "Wind Breathing",
      "Mist Breathing",
    ],
    answer: "Thunder Breathing",
    category: "DEMON SLAYER",
  },

  {
    question:
      "What breathing style is associated with Inosuke?",
    options: [
      "Beast Breathing",
      "Flame Breathing",
      "Love Breathing",
      "Sound Breathing",
    ],
    answer: "Beast Breathing",
    category: "DEMON SLAYER",
  },

  {
    question: "Who is the Flame Hashira?",
    options: [
      "Kyojuro Rengoku",
      "Giyu Tomioka",
      "Tengen Uzui",
      "Muichiro Tokito",
    ],
    answer: "Kyojuro Rengoku",
    category: "DEMON SLAYER",
  },

  {
    question: "Who is the Sound Hashira?",
    options: [
      "Tengen Uzui",
      "Sanemi Shinazugawa",
      "Gyomei Himejima",
      "Obanai Iguro",
    ],
    answer: "Tengen Uzui",
    category: "DEMON SLAYER",
  },

  {
    question: "Who is the Water Hashira?",
    options: [
      "Giyu Tomioka",
      "Shinobu Kocho",
      "Mitsuri Kanroji",
      "Muichiro Tokito",
    ],
    answer: "Giyu Tomioka",
    category: "DEMON SLAYER",
  },

  {
    question:
      "What is the name of the main demon in Demon Slayer?",
    options: [
      "Muzan Kibutsuji",
      "Akaza",
      "Michael Jackson",
      "Kokushibo",
    ],
    answer: "Muzan Kibutsuji",
    category: "DEMON SLAYER",
  },

  {
    question:
      "What organization fights demons?",
    options: [
      "Demon Slayer Corps",
      "Survey Corps",
      "Jujutsu High",
      "Hero Association",
    ],
    answer: "Demon Slayer Corps",
    category: "DEMON SLAYER",
  },

  /* =====================================
     MCU FACTS — 20 QUESTIONS
  ===================================== */

  {
    question: "What is Tony Stark's superhero name?",
    options: [
      "Iron Man",
      "War Machine",
      "Ant-Man",
      "Star-Lord",
    ],
    answer: "Iron Man",
    category: "MCU",
  },

  {
    question: "What is Captain America's real name?",
    options: [
      "Steve Rogers",
      "Sam Wilson",
      "Bucky Barnes",
      "John Walker",
    ],
    answer: "Steve Rogers",
    category: "MCU",
  },

  {
    question:
      "What metal is Captain America's shield primarily made from?",
    options: [
      "Vibranium",
      "Netherite",
      "Titanium",
      "Uru",
    ],
    answer: "Vibranium",
    category: "MCU",
  },

  {
    question: "What is Thor's famous hammer called?",
    options: [
      "Mjolnir",
      "Stormbreaker",
      "Gungnir",
      "Jonathan",
    ],
    answer: "Mjolnir",
    category: "MCU",
  },

  {
    question: "What is Thor's home realm?",
    options: [
      "Asgard",
      "Midgard",
      "Vanaheim",
      "Jotunheim",
    ],
    answer: "Asgard",
    category: "MCU",
  },

  {
    question: "What is Black Panther's real name?",
    options: [
      "T'Challa",
      "M'Baku",
      "Erik Killmonger",
      "N'Jadaka",
    ],
    answer: "T'Challa",
    category: "MCU",
  },

  {
    question:
      "What fictional country is Black Panther from?",
    options: [
      "Wakanda",
      "Latveria",
      "Sokovia",
      "Genosha",
    ],
    answer: "Wakanda",
    category: "MCU",
  },

  {
    question:
      "What is Spider-Man's real name in the MCU?",
    options: [
      "Peter Parker",
      "Miles Morales",
      "Harry Osborn",
      "Eddie Brock",
    ],
    answer: "Peter Parker",
    category: "MCU",
  },

  {
    question: "Who is Peter Parker's aunt?",
    options: [
      "May Parker",
      "Maria Hill",
      "Carol Danvers",
      "Peggy Carter",
    ],
    answer: "May Parker",
    category: "MCU",
  },

  {
    question: "What is Doctor Strange's first name?",
    options: [
      "Stephen",
      "Steven",
      "Scott",
      "Samuel",
    ],
    answer: "Stephen",
    category: "MCU",
  },

  {
    question:
      "What profession did Doctor Strange have before becoming a sorcerer?",
    options: [
      "Neurosurgeon",
      "Engineer",
      "Lawyer",
      "Scientist",
    ],
    answer: "Neurosurgeon",
    category: "MCU",
  },

  {
    question:
      "What is the name of the artificial intelligence that becomes Vision?",
    options: [
      "JARVIS",
      "FRIDAY",
      "KAREN",
      "EDITH",
    ],
    answer: "JARVIS",
    category: "MCU",
  },

  {
    question:
      "What is the name of the Infinity Stone in Vision's forehead?",
    options: [
      "Mind Stone",
      "Time Stone",
      "Space Stone",
      "Reality Stone",
    ],
    answer: "Mind Stone",
    category: "MCU",
  },

  {
    question:
      "What is the name of the organization led by Nick Fury?",
    options: [
      "S.H.I.E.L.D.",
      "S.W.O.R.D.",
      "HYDRA",
      "A.I.M.",
    ],
    answer: "S.H.I.E.L.D.",
    category: "MCU",
  },

  {
    question:
      "What is Loki's relationship to Thor?",
    options: [
      "Adoptive brother",
      "Cousin",
      "Uncle",
      "Best friend",
    ],
    answer: "Adoptive brother",
    category: "MCU",
  },

  {
    question:
      "What is the name of the villain who seeks all six Infinity Stones?",
    options: [
      "Thanos",
      "Ultron",
      "Kang",
      "Ronan",
    ],
    answer: "Thanos",
    category: "MCU",
  },

  {
    question: "How many Infinity Stones are there?",
    options: [
      "6",
      "5",
      "7",
      "3000",
    ],
    answer: "6",
    category: "MCU",
  },

  {
    question:
      "Which Infinity Stone is associated with time?",
    options: [
      "Time Stone",
      "Mind Stone",
      "Power Stone",
      "Soul Stone",
    ],
    answer: "Time Stone",
    category: "MCU",
  },

  {
    question:
      "What is the name of the group of heroes in the first Avengers movie?",
    options: [
      "The Avengers",
      "The Guardians",
      "The Defenders",
      "The Eternals",
    ],
    answer: "The Avengers",
    category: "MCU",
  },

  {
    question: "Who is known as the God of Thunder?",
    options: [
      "Thor",
      "Loki",
      "Odin",
      "Heimdall",
    ],
    answer: "Thor",
    category: "MCU",
  },
];

/* =====================================
   SHUFFLE
===================================== */

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

/* =====================================
   COMPONENT
===================================== */

export default function QuizModal({
  open,
  onClose,
  username,
}: QuizModalProps) {

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null);

  const [score, setScore] =
    useState(0);

  const [finished, setFinished] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  /* =====================================
     START NEW QUIZ
  ===================================== */

  const startNewQuiz = () => {

    const newQuestions =
      shuffle(questionPool)
        .slice(0, 10)
        .map((question) => ({
          ...question,

          options: shuffle(
            question.options
          ),
        }));

    setQuestions(newQuestions);

    setQuestionIndex(0);

    setSelectedAnswer(null);

    setScore(0);

    setFinished(false);
  };

  /* =====================================
     START WHEN MODAL OPENS
  ===================================== */

  useEffect(() => {

    if (open) {
      startNewQuiz();
    }

  }, [open]);

  /* =====================================
     CURRENT QUESTION
  ===================================== */

  const currentQuestion =
    questions[questionIndex];

  /* =====================================
     SELECT ANSWER
  ===================================== */

  const selectAnswer = (
    option: string
  ) => {

    if (
      selectedAnswer ||
      !currentQuestion
    ) {
      return;
    }

    setSelectedAnswer(option);

    if (
      option ===
      currentQuestion.answer
    ) {

      setScore(
        (previous) =>
          previous + 1
      );

      message.success(
        "CORRECT 👀🔥"
      );

    } else {

      message.error(
        "nahhh 😭"
      );
    }
  };

  /* =====================================
     NEXT QUESTION
  ===================================== */

  const nextQuestion = async () => {

    if (
      !selectedAnswer ||
      !currentQuestion
    ) {

      message.warning(
        "pick an answer first 😭"
      );

      return;
    }

    if (
      questionIndex <
      questions.length - 1
    ) {

      setQuestionIndex(
        (previous) =>
          previous + 1
      );

      setSelectedAnswer(null);

      return;
    }

    const finalScore =
      score +
      (
        selectedAnswer ===
        currentQuestion.answer
          ? 1
          : 0
      );

    setSaving(true);

    try {

      const { error } =
        await supabase
          .from("quiz_results")
          .insert({
            username:
              username.trim() ||
              "anonymous",

            score:
              finalScore,

            total:
              questions.length,
          });

      if (error) {

        console.error(
          "Quiz result error:",
          error
        );
      }

      const {
        error: interactionError,
      } = await supabase
        .from("interactions")
        .insert({
          username:
            username.trim() ||
            "anonymous",

          type:
            "Quiz Completed",

          details:
            `Anime + MCU + Real Life Quiz: ${finalScore}/${questions.length}`,
        });

      if (interactionError) {

        console.error(
          "Interaction error:",
          interactionError
        );
      }

    } catch (error) {

      console.error(
        "Quiz save error:",
        error
      );

    } finally {

      setSaving(false);

      setScore(finalScore);

      setFinished(true);
    }
  };

  /* =====================================
     CLOSE
  ===================================== */

  const closeQuiz = () => {

    setQuestions([]);

    setQuestionIndex(0);

    setSelectedAnswer(null);

    setScore(0);

    setFinished(false);

    onClose();
  };

  /* =====================================
     EMPTY STATE
  ===================================== */

  if (!currentQuestion) {

    return (
      <Modal
        title="🧠 Anime + MCU + Real Life Quiz"
        open={open}
        onCancel={closeQuiz}
        footer={null}
        centered
        width={700}
      >

        <div className="quiz-modal">

          <Text>
            loading quiz...
          </Text>

        </div>

      </Modal>
    );
  }

  /* =====================================
     PROGRESS
  ===================================== */

  const progress =
    ((questionIndex + 1) /
      questions.length) *
    100;

  const percentage =
    Math.round(
      (score /
        questions.length) *
        100
    );

  /* =====================================
     CATEGORY COLOR
  ===================================== */

  const getCategoryColor = (
    category: Question["category"]
  ) => {

    switch (category) {

      case "ABOUT ME":
        return "red";

      case "ATTACK ON TITAN":
        return "blue";

      case "JUJUTSU KAISEN":
        return "purple";

      case "ONE PUNCH MAN":
        return "gold";

      case "DEMON SLAYER":
        return "green";

      case "MCU":
        return "red";

      default:
        return "purple";
    }
  };

  /* =====================================
     RENDER
  ===================================== */

  return (

    <Modal
      title="🧠 Anime + MCU + Real Life Quiz"
      open={open}
      onCancel={closeQuiz}
      footer={null}
      centered
      width={700}
      className="anime-quiz-modal"
    >

      {!finished ? (

        <div className="quiz-modal">

          {/* =================================
              HEADER
          ================================= */}

          <div className="quiz-header">

            <div>

              <Text strong>
                QUESTION{" "}
                {questionIndex + 1}{" "}
                OF {questions.length}
              </Text>

              <div className="quiz-category">

                <Tag
                  color={getCategoryColor(
                    currentQuestion.category
                  )}
                >
                  {currentQuestion.category}
                </Tag>

              </div>

            </div>

            <Text>
              SCORE: {score}
            </Text>

          </div>

          {/* =================================
              PROGRESS
          ================================= */}

          <Progress
            percent={progress}
            showInfo={false}
          />

          {/* =================================
              QUESTION
          ================================= */}

          <div className="quiz-question-box">

            <span className="quiz-question-number">
              {String(
                questionIndex + 1
              ).padStart(2, "0")}
            </span>

            <Title level={2}>
              {currentQuestion.question}
            </Title>

          </div>

          {/* =================================
              OPTIONS
          ================================= */}

          <div className="quiz-options">

            {currentQuestion.options.map(
              (option, index) => {

                const isSelected =
                  selectedAnswer ===
                  option;

                const isCorrect =
                  option ===
                  currentQuestion.answer;

                let className =
                  "quiz-option";

                if (isSelected) {

                  className +=
                    " selected";
                }

                if (
                  selectedAnswer &&
                  isCorrect
                ) {

                  className +=
                    " correct";
                }

                if (
                  selectedAnswer &&
                  isSelected &&
                  !isCorrect
                ) {

                  className +=
                    " wrong";
                }

                return (

                  <button
                    key={option}
                    className={
                      className
                    }
                    onClick={() =>
                      selectAnswer(
                        option
                      )
                    }
                  >

                    <span className="quiz-option-letter">

                      {String.fromCharCode(
                        65 + index
                      )}

                    </span>

                    <span>
                      {option}
                    </span>

                  </button>
                );
              }
            )}

          </div>

          {/* =================================
              SELECTED ANSWER
          ================================= */}

          {selectedAnswer && (

            <div className="quiz-selected-note">

              ✓ selected:

              <strong>
                {" "}
                {selectedAnswer}
              </strong>

            </div>
          )}

          {/* =================================
              NEXT
          ================================= */}

          <Button
            type="primary"
            danger
            block
            size="large"
            disabled={
              !selectedAnswer
            }
            loading={saving}
            onClick={
              nextQuestion
            }
          >

            {questionIndex ===
            questions.length - 1
              ? "FINISH QUIZ 🏁"
              : "NEXT QUESTION →"}

          </Button>

          {/* =================================
              BOTTOM INFO
          ================================= */}

          <div className="quiz-bottom-info">

            <span>
              {questionIndex + 1}
              {" / "}
              {questions.length}
            </span>

            <span>
              110-question pool •
              10 random every attempt
            </span>

          </div>

        </div>

      ) : (

        /* =================================
           FINISHED
        ================================= */

        <div className="quiz-finished">

          <div className="quiz-result-icon">

            {percentage === 100
              ? "🏆"
              : percentage >= 70
              ? "🔥"
              : percentage >= 40
              ? "👀"
              : "💀"}

          </div>

          <Text>
            QUIZ COMPLETE
          </Text>

          <Title level={1}>
            {score} /{" "}
            {questions.length}
          </Title>

          <Progress
            percent={
              percentage
            }
          />

          <p>

            {percentage === 100
              ? "BRO YOU ACTUALLY KNOW EVERYTHING 😭🔥"
              : percentage >= 80
              ? "okayyy you REALLY know your stuff 👀"
              : percentage >= 60
              ? "not bad at all 🔥"
              : percentage >= 40
              ? "you've got some studying to do 😭"
              : "BRO WHO ARE YOU 💀"}

          </p>

          <div className="quiz-finished-buttons">

            <Button
              type="primary"
              danger
              onClick={
                startNewQuiz
              }
            >
              NEW 10 QUESTIONS
            </Button>

            <Button
              onClick={
                closeQuiz
              }
            >
              DONE
            </Button>

          </div>

        </div>
      )}

    </Modal>
  );
}