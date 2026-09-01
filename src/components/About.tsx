import "./About.css";

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
    >
      <div className="about-container">

        <div className="about-header">
          <span className="about-eyebrow">
            A LITTLE ABOUT ME
          </span>

          <h2 className="about-title">
            welcome to the
            <span> lore.</span>
          </h2>
        </div>

        <div className="about-grid">

          {/* MAIN CARD */}
          <div className="about-card about-main-card">

            <div className="about-icon">
              M
            </div>

            <div className="about-content">

              <h3>
                so... who am i?
              </h3>

              <p>
                just a person who enjoys gaming,
                music, anime, random conversations,
                and making things that probably
                didn't need to exist.
              </p>

              <p>
                this site is basically my little
                corner of the internet where all
                the random interests somehow ended
                up in the same place.
              </p>

            </div>

          </div>

          {/* INTERESTS */}
          <div className="about-card">

            <span className="about-card-label">
              CURRENTLY INTO
            </span>

            <div className="about-tags">

              <span>🎮 Gaming</span>
              <span>🎵 Music</span>
              <span>🍥 Naruto</span>
              <span>⚔️ AOT</span>
              <span>🌀 JJK</span>
              <span>🦸 MCU</span>
              <span>🎬 Movies</span>
              <span>💻 Coding</span>

            </div>

          </div>

          {/* VIBE */}
          <div className="about-card about-vibe-card">

            <span className="about-card-label">
              CURRENT STATUS
            </span>

            <h3>
              probably doing something
              unnecessary.
            </h3>

            <p>
              if i'm not coding, i'm probably
              watching something, playing a game,
              listening to music, or wondering
              why i opened another tab.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}