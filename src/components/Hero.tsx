import { useState } from "react";
import "./Hero.css";

type HeroProps = {
  username: string;
  tagline: string;
  onExplore: () => void;
  onMessage: () => void;
};

const catchyPhrases = [
  "if you ever feel alone, don't.",
  "plot armor is a lifestyle.",
  "somewhere between genius and what was i doing again?",
  "the mission is unclear. the confidence isn't.",
  "main character energy, side quest decisions.",
  "i came, i saw, i forgot why i came.",
  "born to chill, forced to have responsibilities.",
  "this timeline needs better writers.",
  "probably overthinking something completely unnecessary.",
  "the lore gets worse if you ask questions.",
  "currently buffering my next bad decision.",
  "one more episode. famous last words.",
  "i have a plan. unfortunately, it is terrible.",
  "peace was never an option. naps were.",
  "somewhere out there, this makes sense.",
  "too much lore, not enough context.",
  "the side quest became the main quest.",
  "i'll explain later. probably.",
  "zero strategy. maximum confidence.",
  "if it works, it was intentional.",
  "with great power comes great Wi-Fi problems.",
  "believe it.",
  "i'll take a potato chip... and eat it.",
  "this is the power of friendship. probably.",
  "what's 200 years between friends?",
  "the answer was friendship all along.",
  "i'm not lost. i'm exploring the wrong map.",
  "wake up. survive. repeat.",
  "the plot has left the building.",
  "somehow, this was part of the plan.",
];

export default function Hero({
  username,
  tagline,
  onExplore,
  onMessage,
}: HeroProps) {
  const [phrase, setPhrase] = useState(catchyPhrases[0]);

  const generatePhrase = () => {
    let newPhrase =
      catchyPhrases[
        Math.floor(Math.random() * catchyPhrases.length)
      ];

    while (
      newPhrase === phrase &&
      catchyPhrases.length > 1
    ) {
      newPhrase =
        catchyPhrases[
          Math.floor(Math.random() * catchyPhrases.length)
        ];
    }

    setPhrase(newPhrase);
  };

  return (
    <section className="hero-section">
      <div className="hero-background-glow" />

      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-content">

          <span className="hero-status">
            YOU'RE OFFICIALLY IN
          </span>

          <h1 className="hero-title">
            yo @{username}
            <span className="hero-wave">👋</span>
          </h1>

          <p className="hero-tagline">
            {tagline || "welcome to the chaos."}
          </p>

          <p className="hero-description">
            gaming, music, anime, random thoughts,
            questionable decisions, and whatever
            happens next.
          </p>

          <div className="hero-buttons">

            <button
              type="button"
              className="hero-button hero-button-primary"
              onClick={onExplore}
            >
              <span>⚡</span>
              EXPLORE
            </button>

            <button
              type="button"
              className="hero-button hero-button-secondary"
              onClick={onMessage}
            >
              <span>◉</span>
              TALK TO ME
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="hero-profile-card">

          <div className="profile-banner">
            <span className="profile-letter">
              M
            </span>
          </div>

          <div className="profile-content">

            <span className="profile-mini-tag">
              RANDOM • WEIRD • IDK
            </span>

            <h2 className="profile-name">
              Zayn / Tommo / Meeseeks
            </h2>

            <p className="profile-line">
              I can do this all day.
            </p>

            <p className="profile-description">
              welcome to my little corner of the
              internet. games, music, anime,
              random conversations, and whatever
              weird thought shows up next.
            </p>

            {/* RANDOM PHRASE GENERATOR */}
            <div className="phrase-box">

              <div className="phrase-label">
                <span>✦</span>
                CURRENT THOUGHT
              </div>

              <p className="phrase-text">
                "{phrase}"
              </p>

              <button
                type="button"
                className="generate-button"
                onClick={generatePhrase}
              >
                🎲 GENERATE CHAOS
              </button>

            </div>

            {/* ACTION BUTTONS */}
            <div className="profile-actions">

              <button
                type="button"
                className="profile-action primary"
                onClick={onExplore}
              >
                ENTER THE LORE →
              </button>

              <button
                type="button"
                className="profile-action"
                onClick={onMessage}
              >
                SAY SOMETHING
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}