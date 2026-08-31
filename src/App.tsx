import { useEffect, useState } from "react";

import {
  ConfigProvider,
  Layout,
  message,
  theme,
} from "antd";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import InteractiveCards from "./components/InteractiveCards";
import Music from "./components/Music";
import Games from "./components/Games";
import Anime from "./components/Anime";
import Exclusive from "./components/Exclusive";
import MiniGames from "./components/MiniGames";

import MessageModal from "./components/Modals/MessageModal";
import QuizModal from "./components/Modals/QuizModal";
import PollModal from "./components/Modals/PollModal";
import RandomModal from "./components/Modals/RandomModal";

import {
  exclusivePassword,
  randomTaglines,
} from "./data/profile";

import { supabase } from "./supabase";

import "./styles/App.css";

const { Content, Footer } = Layout;

function App() {
  /* =====================================
     USER
  ===================================== */

  const [username, setUsername] = useState("");
  const [entered, setEntered] = useState(false);

  /* =====================================
     RANDOM TAGLINE
  ===================================== */

  const [tagline, setTagline] = useState("");

  /* =====================================
     THEME
  ===================================== */

  const [darkMode, setDarkMode] = useState(true);

  /* =====================================
     ACTIVE MODAL
  ===================================== */

  const [activeModal, setActiveModal] =
    useState<string | null>(null);

  /* =====================================
     EXCLUSIVE
  ===================================== */

  const [password, setPassword] = useState("");

  const [
    exclusiveUnlocked,
    setExclusiveUnlocked,
  ] = useState(false);

  /* =====================================
     CHECK SAVED SESSION
  ===================================== */

  useEffect(() => {
    const savedUsername =
      sessionStorage.getItem(
        "visitorUsername"
      );

    if (savedUsername) {
      setUsername(savedUsername);
      setEntered(true);

      const randomIndex =
        Math.floor(
          Math.random() *
            randomTaglines.length
        );

      setTagline(
        randomTaglines[randomIndex]
      );
    }
  }, []);

  /* =====================================
     ENTER WEBSITE
  ===================================== */

  const enterWebsite = async () => {
    const cleanUsername =
      username.trim();

    if (!cleanUsername) {
      message.warning(
        "enter your username first 😭"
      );

      return;
    }

    /* RANDOM TAGLINE */

    const randomIndex =
      Math.floor(
        Math.random() *
          randomTaglines.length
      );

    setTagline(
      randomTaglines[randomIndex]
    );

    /* SAVE SESSION */

    sessionStorage.setItem(
      "visitorUsername",
      cleanUsername
    );

    /* =================================
       SAVE VISITOR TO SUPABASE
    ================================= */

    try {
      const { error } =
        await supabase
          .from("visitors")
          .insert({
            username:
              cleanUsername,
          });

      if (error) {
        console.error(
          "Visitor error:",
          error
        );
      }

      /* SAVE INTERACTION */

      const {
        error: interactionError,
      } = await supabase
        .from("interactions")
        .insert({
          username:
            cleanUsername,

          type:
            "Entered Website",

          details:
            "Visitor entered the site",
        });

      if (interactionError) {
        console.error(
          "Interaction error:",
          interactionError
        );
      }
    } catch (error) {
      console.error(
        "Supabase visitor error:",
        error
      );
    }

    /* ENTER WEBSITE */

    setUsername(
      cleanUsername
    );

    setEntered(true);

    message.success(
      `yo @${cleanUsername} 👋`
    );
  };

  /* =====================================
     CLOSE MODAL
  ===================================== */

  const closeModal = () => {
    setActiveModal(null);
  };

  /* =====================================
     UNLOCK EXCLUSIVE
  ===================================== */

  const unlockExclusive = () => {
    if (
      password.trim() ===
      exclusivePassword
    ) {
      setExclusiveUnlocked(true);

      setPassword("");

      message.success(
        "ACCESS GRANTED 🔓"
      );
    } else {
      message.error(
        "wrong password 😭"
      );

      setPassword("");
    }
  };

  /* =====================================
     OPEN QUIZ
  ===================================== */

  const openQuiz = () => {
    setActiveModal("quiz");
  };

  /* =====================================
     OPEN POLL
  ===================================== */

  const openPoll = () => {
    setActiveModal("poll");
  };

  /* =====================================
     OPEN MINI GAMES
  ===================================== */

  const openMiniGames = () => {
    setActiveModal("miniGames");
  };

  /* =====================================
     OPEN RANDOM
  ===================================== */

  const openRandom = () => {
    setActiveModal("random");
  };

  /* =====================================
     OPEN MESSAGE
  ===================================== */

  const openMessage = () => {
    setActiveModal("message");
  };

  /* =====================================
     LOGIN SCREEN
  ===================================== */

  if (!entered) {
    return (
      <ConfigProvider
        theme={{
          algorithm:
            theme.darkAlgorithm,

          token: {
            colorPrimary:
              "#ff2020",

            colorText:
              "#ffffff",

            colorTextHeading:
              "#ffffff",

            colorBgBase:
              "#080808",

            borderRadius: 12,
          },
        }}
      >
        <div className="login-page">

          {/* GLOW */}

          <div className="login-glow glow-one" />

          <div className="login-glow glow-two" />

          {/* LOGIN BOX */}

          <div className="login-box">

            <div className="login-logo">
              M
            </div>

            <p className="login-small">
              WELCOME TO
            </p>

            <h1 className="login-title">
              {tagline ||
                "I can do this all day"}
            </h1>

            <p className="login-description">
              random stuff, gaming,
              music, anime & chaos.
            </p>

            {/* USERNAME */}

            <div className="username-wrapper">

              <span className="username-symbol">
                @
              </span>

              <input
                className="username-input"
                type="text"
                placeholder="your username"
                value={username}
                onChange={(event) =>
                  setUsername(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    enterWebsite();
                  }
                }}
              />

            </div>

            {/* ENTER */}

            <button
              className="enter-button"
              onClick={
                enterWebsite
              }
            >
              ENTER

              <span>
                →
              </span>
            </button>

            <span className="login-note">
              no real name needed :)
            </span>

            {/* DECORATION */}

            <div className="login-decoration">

              <span />

              <span />

              <span />

            </div>

          </div>

        </div>
      </ConfigProvider>
    );
  }

  /* =====================================
     MAIN WEBSITE
  ===================================== */

  return (
    <ConfigProvider
      theme={{
        algorithm:
          darkMode
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,

        token: {
          colorPrimary:
            "#ff2020",

          colorError:
            "#ff2020",

          colorText:
            darkMode
              ? "#ffffff"
              : "#111111",

          colorTextHeading:
            darkMode
              ? "#ffffff"
              : "#111111",

          borderRadius: 12,
        },
      }}
    >
      <Layout className="site">

        {/* =================================
            NAVBAR
        ================================= */}

        <Navbar
          username={username}
          darkMode={darkMode}
          setDarkMode={
            setDarkMode
          }
        />

        {/* =================================
            CONTENT
        ================================= */}

        <Content>

          {/* =================================
              HERO
          ================================= */}

          <Hero
            username={username}
            tagline={tagline}

            onExplore={() =>
              document
                .getElementById(
                  "explore"
                )
                ?.scrollIntoView({
                  behavior:
                    "smooth",
                })
            }

            onMessage={
              openMessage
            }
          />

          {/* =================================
              ABOUT
          ================================= */}

          <About />

          {/* =================================
              EXPLORE MY BRAIN
          ================================= */}

          <InteractiveCards

            onQuiz={
              openQuiz
            }

            onPoll={
              openPoll
            }

            onMiniGames={
              openMiniGames
            }

            onRandom={
              openRandom
            }

            onMessage={
              openMessage
            }

          />

          {/* =================================
              MUSIC
          ================================= */}

          <Music />

          {/* =================================
              GAMES
          ================================= */}

          <Games />

          {/* =================================
              ANIME
          ================================= */}

          <Anime />

          {/* =================================
              EXCLUSIVE
          ================================= */}

          <Exclusive

            unlocked={
              exclusiveUnlocked
            }

            password={
              password
            }

            setPassword={
              setPassword
            }

            onUnlock={
              unlockExclusive
            }

            onOpen={() => {}}

          />

        </Content>

        {/* =================================
            FOOTER
        ================================= */}

        <Footer className="footer">
          this is so him. • made
          with chaos ❤️
        </Footer>

        {/* =================================
            MESSAGE MODAL
        ================================= */}

        <MessageModal

          open={
            activeModal ===
            "message"
          }

          onClose={
            closeModal
          }

          username={
            username
          }

        />

        {/* =================================
            QUIZ MODAL
        ================================= */}

        <QuizModal

          open={
            activeModal ===
            "quiz"
          }

          onClose={
            closeModal
          }

          username={
            username
          }

        />

        {/* =================================
            POLL MODAL
        ================================= */}

        <PollModal

          open={
            activeModal ===
            "poll"
          }

          onClose={
            closeModal
          }

        />

        {/* =================================
            MINI GAMES
        ================================= */}

        <MiniGames

          open={
            activeModal ===
            "miniGames"
          }

          onClose={
            closeModal
          }

          username={
            username
          }

        />

        {/* =================================
            RANDOM MODAL
        ================================= */}

        <RandomModal

          open={
            activeModal ===
            "random"
          }

          onClose={
            closeModal
          }

        />

      </Layout>
    </ConfigProvider>
  );
}

export default App;