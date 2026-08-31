import { useEffect, useState } from "react";

const phrases = [
  "just a main character in my own random story",
  "probably listening to music rn",
  "defeating boredom one day at a time",
  "powered by music, caffeine, and chaos",
  "leveling up in real life",
  "somewhere between gaming and reality",
  "collecting memories, not followers",
  "lost? maybe. having fun? always.",
];

export default function AboutInfo() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-info">
      <span className="about-tag">random • weird • idk</span>

      <h1>Zayn / Tommo / Meeseeks</h1>

      <p className="about-status">
        currently: <span>{phrases[phraseIndex]}</span>
      </p>

      <p>
        welcome to my little corner of the internet — gaming, music,
        random conversations, anime, and whatever happens to be interesting
        at the moment.
      </p>

      <p>
        <span className="about-icon">✦</span>
        just here to make things a little less boring.
      </p>

      <p>
        <span className="about-icon">◌</span>
        pull up a chair. let's see where this goes.
      </p>

      <div className="hero-buttons">
        <button onClick={() => (window.location.href = "#contact")}>
          ⚡ start a conversation
        </button>

        <button onClick={() => (window.location.href = "#projects")}>
          🎮 gaming zone
        </button>

        <button onClick={() => (window.location.href = "#music")}>
          🎧 music corner
        </button>
      </div>
    </div>
  );
}