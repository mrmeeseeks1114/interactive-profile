import "./InteractiveCards.css";

type InteractiveCardsProps = {
  onQuiz: () => void;
  onPoll: () => void;
  onMiniGames: () => void;
  onRandom: () => void;
  onMessage: () => void;
};

export default function InteractiveCards({
  onQuiz,
  onPoll,
  onMiniGames,
  onRandom,
  onMessage,
}: InteractiveCardsProps) {
  return (
    <section
      id="explore"
      className="interactive-section"
    >
      <div className="interactive-header">
        <span className="interactive-eyebrow">
          EXPLORE MY BRAIN
        </span>

        <h2>
          click around. <span>why not?</span>
        </h2>

        <p>
          anime, random facts, games, and
          completely unnecessary chaos.
        </p>
      </div>

      <div className="interactive-grid">

        {/* =================================
            ANIME + REAL LIFE QUIZ
        ================================= */}

        <button
          className="interactive-card quiz-card"
          onClick={onQuiz}
        >
          <span className="interactive-icon">
            🧠
          </span>

          <div className="interactive-card-content">
            <span className="interactive-label">
              QUIZ
            </span>

            <h3>
              anime & real life quiz
            </h3>

            <p>
              50 questions. 10 random ones
              every time you play.
            </p>
          </div>

          <span className="interactive-arrow">
            →
          </span>
        </button>


        {/* =================================
            RANDOM POLL
        ================================= */}

        <button
          className="interactive-card"
          onClick={onPoll}
        >
          <span className="interactive-icon">
            📊
          </span>

          <div className="interactive-card-content">
            <span className="interactive-label">
              POLL
            </span>

            <h3>
              random poll
            </h3>

            <p>
              choose wisely. or don't.
            </p>
          </div>

          <span className="interactive-arrow">
            →
          </span>
        </button>


        {/* =================================
            MINI GAMES
        ================================= */}

        <button
          className="interactive-card mini-games-card"
          onClick={onMiniGames}
        >
          <span className="interactive-icon">
            🎮
          </span>

          <div className="interactive-card-content">
            <span className="interactive-label">
              GAME CENTER
            </span>

            <h3>
              mini games
            </h3>

            <p>
              chess, tic-tac-toe, RPS & more.
            </p>
          </div>

          <span className="interactive-arrow">
            →
          </span>
        </button>


        {/* =================================
            RANDOM
        ================================= */}

        <button
          className="interactive-card"
          onClick={onRandom}
        >
          <span className="interactive-icon">
            🎲
          </span>

          <div className="interactive-card-content">
            <span className="interactive-label">
              RANDOM
            </span>

            <h3>
              random stuff
            </h3>

            <p>
              honestly, I don't know either.
            </p>
          </div>

          <span className="interactive-arrow">
            →
          </span>
        </button>


        {/* =================================
            MESSAGE
        ================================= */}

        <button
          className="interactive-card"
          onClick={onMessage}
        >
          <span className="interactive-icon">
            💬
          </span>

          <div className="interactive-card-content">
            <span className="interactive-label">
              MESSAGE
            </span>

            <h3>
              leave me a message
            </h3>

            <p>
              say literally anything.
            </p>
          </div>

          <span className="interactive-arrow">
            →
          </span>
        </button>

      </div>
    </section>
  );
}