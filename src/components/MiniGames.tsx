import { useMemo, useState } from "react";
import { Button, Modal, message } from "antd";
import { Chess, type Square } from "chess.js";
import "./MiniGames.css";

/* =========================================
   TYPES
========================================= */

type MiniGamesProps = {
  open: boolean;
  onClose: () => void;
  username: string;
};

type GameType = "menu" | "chess" | "tictactoe" | "rps";

type RPSChoice = "rock" | "paper" | "scissors";

type TTTCell = "X" | "O" | null;

/* =========================================
   CHESS CONSTANTS
========================================= */

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

const pieceSymbols: Record<string, string> = {
  wp: "♙",
  wr: "♖",
  wn: "♘",
  wb: "♗",
  wq: "♕",
  wk: "♔",

  bp: "♟",
  br: "♜",
  bn: "♞",
  bb: "♝",
  bq: "♛",
  bk: "♚",
};

const pieceValues: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

/* =========================================
   CHESS EVALUATION
========================================= */

const evaluateBoard = (game: Chess) => {
  if (game.isCheckmate()) {
    return game.turn() === "w"
      ? -100000
      : 100000;
  }

  if (
    game.isDraw() ||
    game.isStalemate() ||
    game.isThreefoldRepetition()
  ) {
    return 0;
  }

  let score = 0;

  const board = game.board();

  board.forEach((row) => {
    row.forEach((piece) => {
      if (!piece) return;

      const value = pieceValues[piece.type];

      if (piece.color === "w") {
        score += value;
      } else {
        score -= value;
      }
    });
  });

  return score;
};

/* =========================================
   MINIMAX CHESS BOT
========================================= */

const minimax = (
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean
): number => {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }

  const moves = game.moves({
    verbose: true,
  });

  if (maximizing) {
    let bestValue = -Infinity;

    for (const move of moves) {
      const next = new Chess(game.fen());

      next.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion,
      });

      const value = minimax(
        next,
        depth - 1,
        alpha,
        beta,
        false
      );

      bestValue = Math.max(
        bestValue,
        value
      );

      alpha = Math.max(
        alpha,
        value
      );

      if (beta <= alpha) {
        break;
      }
    }

    return bestValue;
  }

  let bestValue = Infinity;

  for (const move of moves) {
    const next = new Chess(game.fen());

    next.move({
      from: move.from,
      to: move.to,
      promotion: move.promotion,
    });

    const value = minimax(
      next,
      depth - 1,
      alpha,
      beta,
      true
    );

    bestValue = Math.min(
      bestValue,
      value
    );

    beta = Math.min(
      beta,
      value
    );

    if (beta <= alpha) {
      break;
    }
  }

  return bestValue;
};

/* =========================================
   IMPOSSIBLE BOT MOVE
========================================= */

const getBestBotMove = (
  game: Chess
) => {
  const moves = game.moves({
    verbose: true,
  });

  if (moves.length === 0) {
    return null;
  }

  let bestMove = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const next = new Chess(game.fen());

    next.move({
      from: move.from,
      to: move.to,
      promotion: move.promotion,
    });

    const score = minimax(
      next,
      3,
      -Infinity,
      Infinity,
      false
    );

    /*
      Small positional preference:
      captures and checks get a bonus.
    */

    const captureBonus =
      move.captured
        ? pieceValues[move.captured] / 10
        : 0;

    const checkBonus =
      move.san.includes("+")
        ? 25
        : 0;

    const finalScore =
      score +
      captureBonus +
      checkBonus;

    if (
      finalScore > bestScore
    ) {
      bestScore = finalScore;
      bestMove = move;
    }
  }

  return bestMove;
};

/* =========================================
   COMPONENT
========================================= */

export default function MiniGames({
  open,
  onClose,
  username,
}: MiniGamesProps) {
  const [gameType, setGameType] =
    useState<GameType>("menu");

  /* =====================================
     CHESS STATE
  ===================================== */

  const [chess, setChess] =
    useState(() => new Chess());

  const [selectedSquare, setSelectedSquare] =
    useState<Square | null>(null);

  const [lastMove, setLastMove] =
    useState<{
      from: Square;
      to: Square;
    } | null>(null);

  const [botThinking, setBotThinking] =
    useState(false);

  /* =====================================
     TIC TAC TOE
  ===================================== */

  const [board, setBoard] =
    useState<TTTCell[]>(
      Array(9).fill(null)
    );

  const [tttTurn, setTttTurn] =
    useState<"X" | "O">("X");

  /* =====================================
     RPS
  ===================================== */

  const [playerChoice, setPlayerChoice] =
    useState<RPSChoice | null>(null);

  const [botChoice, setBotChoice] =
    useState<RPSChoice | null>(null);

  const [rpsResult, setRpsResult] =
    useState("");

  /* =====================================
     CHESS BOARD
  ===================================== */

  const chessBoard = useMemo(
    () => chess.board(),
    [chess]
  );

  /* =====================================
     CHESS STATUS
  ===================================== */

  const chessStatus = useMemo(() => {
    if (chess.isCheckmate()) {
      return chess.turn() === "w"
        ? "BLACK WINS — CHECKMATE"
        : "YOU WIN — CHECKMATE";
    }

    if (chess.isDraw()) {
      return "DRAW";
    }

    if (chess.isStalemate()) {
      return "STALEMATE";
    }

    if (chess.isCheck()) {
      return chess.turn() === "w"
        ? "YOU ARE IN CHECK"
        : "BOT IS IN CHECK";
    }

    if (botThinking) {
      return "BOT IS THINKING...";
    }

    return chess.turn() === "w"
      ? "YOUR MOVE"
      : "BOT'S MOVE";
  }, [chess, botThinking]);

  /* =====================================
     RESET CHESS
  ===================================== */

  const resetChess = () => {
    setChess(new Chess());
    setSelectedSquare(null);
    setLastMove(null);
    setBotThinking(false);
  };

  /* =====================================
     CHESS MOVE GUIDE
  ===================================== */

  const legalTargets = useMemo(() => {
    if (!selectedSquare) {
      return [] as Square[];
    }

    return chess
      .moves({
        square: selectedSquare,
        verbose: true,
      })
      .map((move) => move.to);
  }, [chess, selectedSquare]);

  /* =====================================
     HANDLE CHESS CLICK
  ===================================== */

  const handleChessSquareClick = (
    square: Square
  ) => {
    if (
      botThinking ||
      chess.isGameOver() ||
      chess.turn() !== "w"
    ) {
      return;
    }

    /*
      Select a piece.
    */

    if (!selectedSquare) {
      const piece =
        chess.get(square);

      if (
        piece &&
        piece.color === "w"
      ) {
        setSelectedSquare(square);
      }

      return;
    }

    /*
      Clicking another white piece
      changes selection.
    */

    const clickedPiece =
      chess.get(square);

    if (
      clickedPiece &&
      clickedPiece.color === "w"
    ) {
      setSelectedSquare(square);
      return;
    }

    /*
      Check if target is legal.
    */

    if (
      !legalTargets.includes(square)
    ) {
      message.warning(
        "you can't move there 😭"
      );

      return;
    }

    /*
      Make player move.
    */

    const nextGame =
      new Chess(chess.fen());

    try {
      nextGame.move({
        from: selectedSquare,
        to: square,
        promotion: "q",
      });
    } catch {
      message.error(
        "invalid move"
      );

      return;
    }

    setChess(nextGame);

    setLastMove({
      from: selectedSquare,
      to: square,
    });

    setSelectedSquare(null);

    /*
      If game ended, don't call bot.
    */

    if (nextGame.isGameOver()) {
      return;
    }

    /*
      Bot's turn.
    */

    setBotThinking(true);

    setTimeout(() => {
      const botGame =
        new Chess(nextGame.fen());

      const botMove =
        getBestBotMove(botGame);

      if (!botMove) {
        setBotThinking(false);
        return;
      }

      try {
        botGame.move({
          from: botMove.from,
          to: botMove.to,
          promotion:
            botMove.promotion || "q",
        });

        setChess(botGame);

        setLastMove({
          from: botMove.from,
          to: botMove.to,
        });
      } catch (error) {
        console.error(
          "Bot move error:",
          error
        );
      }

      setBotThinking(false);
    }, 550);
  };

  /* =====================================
     TIC TAC TOE WINNER
  ===================================== */

  const getWinner = (
    cells: TTTCell[]
  ) => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [
      a,
      b,
      c,
    ] of wins) {
      if (
        cells[a] &&
        cells[a] === cells[b] &&
        cells[a] === cells[c]
      ) {
        return cells[a];
      }
    }

    if (
      cells.every(
        (cell) => cell !== null
      )
    ) {
      return "DRAW";
    }

    return null;
  };

  /* =====================================
     TIC TAC TOE BOT
  ===================================== */

  const findBestTTTMove = (
    cells: TTTCell[]
  ) => {
    const empty =
      cells
        .map((cell, index) =>
          cell === null
            ? index
            : -1
        )
        .filter(
          (index) => index !== -1
        );

    /*
      Impossible bot:
      first try to win,
      then block,
      then take center,
      then corners.
    */

    for (const index of empty) {
      const test = [...cells];

      test[index] = "O";

      if (
        getWinner(test) === "O"
      ) {
        return index;
      }
    }

    for (const index of empty) {
      const test = [...cells];

      test[index] = "X";

      if (
        getWinner(test) === "X"
      ) {
        return index;
      }
    }

    if (
      cells[4] === null
    ) {
      return 4;
    }

    const corners = [
      0,
      2,
      6,
      8,
    ];

    const availableCorners =
      corners.filter(
        (index) =>
          cells[index] === null
      );

    if (
      availableCorners.length
    ) {
      return (
        availableCorners[
          Math.floor(
            Math.random() *
              availableCorners.length
          )
        ]
      );
    }

    return empty[0] ?? null;
  };

  /* =====================================
     TIC TAC TOE CLICK
  ===================================== */

  const handleTTTClick = (
    index: number
  ) => {
    if (
      board[index] ||
      getWinner(board) ||
      tttTurn !== "X"
    ) {
      return;
    }

    const nextBoard = [
      ...board,
    ];

    nextBoard[index] = "X";

    setBoard(nextBoard);

    const winner =
      getWinner(nextBoard);

    if (winner) {
      return;
    }

    setTttTurn("O");

    setTimeout(() => {
      const botMove =
        findBestTTTMove(
          nextBoard
        );

      if (
        botMove === null
      ) {
        setTttTurn("X");
        return;
      }

      const botBoard = [
        ...nextBoard,
      ];

      botBoard[botMove] = "O";

      setBoard(botBoard);

      if (
        !getWinner(botBoard)
      ) {
        setTttTurn("X");
      }
    }, 400);
  };

  /* =====================================
     RESET TIC TAC TOE
  ===================================== */

  const resetTTT = () => {
    setBoard(
      Array(9).fill(null)
    );

    setTttTurn("X");
  };

  /* =====================================
     RPS
  ===================================== */

  const playRPS = (
    choice: RPSChoice
  ) => {
    const choices: RPSChoice[] = [
      "rock",
      "paper",
      "scissors",
    ];

    const bot =
      choices[
        Math.floor(
          Math.random() *
            choices.length
        )
      ];

    setPlayerChoice(choice);
    setBotChoice(bot);

    if (choice === bot) {
      setRpsResult("DRAW 😭");
      return;
    }

    const win =
      (choice === "rock" &&
        bot === "scissors") ||
      (choice === "paper" &&
        bot === "rock") ||
      (choice === "scissors" &&
        bot === "paper");

    setRpsResult(
      win
        ? "YOU WIN 🔥"
        : "BOT WINS 💀"
    );
  };

  /* =====================================
     RESET RPS
  ===================================== */

  const resetRPS = () => {
    setPlayerChoice(null);
    setBotChoice(null);
    setRpsResult("");
  };

  /* =====================================
     CLOSE
  ===================================== */

  const handleClose = () => {
    setGameType("menu");
    resetChess();
    resetTTT();
    resetRPS();
    onClose();
  };

  /* =====================================
     MENU
  ===================================== */

  const renderMenu = () => (
    <div className="mini-games">
      <div className="mini-games-hero">
        <span className="mini-games-label">
          ARCADE MODE
        </span>

        <h1>
          choose your game.
        </h1>

        <p>
          welcome @{username || "player"}.
          <br />
          pick something and try not to
          lose 💀
        </p>
      </div>

      <div className="game-menu-grid">
        <button
          className="game-menu-card chess-card"
          onClick={() => {
            resetChess();
            setGameType("chess");
          }}
        >
          <div className="game-card-icon">
            ♛
          </div>

          <div className="game-card-info">
            <span>01 / STRATEGY</span>

            <h2>CHESS</h2>

            <p>
              challenge the impossible bot.
            </p>
          </div>

          <span className="game-card-arrow">
            →
          </span>
        </button>

        <button
          className="game-menu-card ttt-card"
          onClick={() => {
            resetTTT();
            setGameType(
              "tictactoe"
            );
          }}
        >
          <div className="game-card-icon">
            #
          </div>

          <div className="game-card-info">
            <span>02 / CLASSIC</span>

            <h2>
              TIC-TAC-TOE
            </h2>

            <p>
              try beating an unbeatable bot.
            </p>
          </div>

          <span className="game-card-arrow">
            →
          </span>
        </button>

        <button
          className="game-menu-card rps-card"
          onClick={() => {
            resetRPS();
            setGameType("rps");
          }}
        >
          <div className="game-card-icon">
            ✊
          </div>

          <div className="game-card-info">
            <span>03 / QUICK MATCH</span>

            <h2>RPS</h2>

            <p>
              rock, paper, scissors.
            </p>
          </div>

          <span className="game-card-arrow">
            →
          </span>
        </button>
      </div>
    </div>
  );

  /* =====================================
     CHESS
  ===================================== */

  const renderChess = () => (
    <div className="game-screen chess-screen">
      <div className="game-topbar">
        <button
          className="back-button"
          onClick={() =>
            setGameType("menu")
          }
        >
          ← games
        </button>

        <div className="game-title">
          <span>CHESS</span>
          <small>
            impossible bot
          </small>
        </div>

        <button
          className="reset-small"
          onClick={resetChess}
        >
          ↻
        </button>
      </div>

      <div className="chess-layout">
        <div className="chess-player bot-player">
          <div className="player-avatar">
            ♟
          </div>

          <div>
            <strong>
              IMPOSSIBLE BOT
            </strong>

            <span>
              ♟ BLACK
            </span>
          </div>

          {botThinking && (
            <div className="thinking">
              thinking...
            </div>
          )}
        </div>

        <div className="chess-board-wrapper">
          <div className="chess-rank-labels">
            {[
              8,
              7,
              6,
              5,
              4,
              3,
              2,
              1,
            ].map((rank) => (
              <span key={rank}>
                {rank}
              </span>
            ))}
          </div>

          <div className="chess-board">
            {chessBoard.map(
              (row, rowIndex) =>
                row.map(
                  (
                    piece,
                    colIndex
                  ) => {
                    const square =
                      `${files[colIndex]}${
                        8 - rowIndex
                      }` as Square;

                    const isLight =
                      (rowIndex +
                        colIndex) %
                        2 ===
                      0;

                    const isSelected =
                      selectedSquare ===
                      square;

                    const isTarget =
                      legalTargets.includes(
                        square
                      );

                    const isLastMove =
                      lastMove &&
                      (lastMove.from ===
                        square ||
                        lastMove.to ===
                          square);

                    return (
                      <button
                        key={square}
                        className={[
                          "chess-square",
                          isLight
                            ? "light"
                            : "dark",
                          isSelected
                            ? "selected-square"
                            : "",
                          isLastMove
                            ? "last-move"
                            : "",
                          isTarget
                            ? "move-target"
                            : "",
                        ].join(" ")}
                        onClick={() =>
                          handleChessSquareClick(
                            square
                          )
                        }
                      >
                        {piece && (
                          <span
                            className={
                              piece.color ===
                              "w"
                                ? "white-piece"
                                : "black-piece"
                            }
                          >
                            {
                              pieceSymbols[
                                `${piece.color}${piece.type}`
                              ]
                            }
                          </span>
                        )}

                        {isTarget &&
                          !piece && (
                            <span className="move-dot" />
                          )}

                        {isTarget &&
                          piece && (
                            <span className="capture-ring" />
                          )}
                      </button>
                    );
                  }
                )
            )}
          </div>

          <div className="chess-file-labels">
            {files.map((file) => (
              <span key={file}>
                {file}
              </span>
            ))}
          </div>
        </div>

        <div className="chess-status">
          <div className="status-dot" />

          <span>
            {chessStatus}
          </span>
        </div>

        <div className="chess-player user-player">
          <div className="player-avatar">
            ♙
          </div>

          <div>
            <strong>
              @{username || "PLAYER"}
            </strong>

            <span>
              ♙ WHITE
            </span>
          </div>
        </div>
      </div>

      <div className="chess-help">
        <span>
          ● select a piece
        </span>

        <span>
          ◉ highlighted squares =
          legal moves
        </span>
      </div>

      <div className="game-actions">
        <Button
          onClick={resetChess}
        >
          NEW GAME
        </Button>
      </div>
    </div>
  );

  /* =====================================
     TIC TAC TOE
  ===================================== */

  const renderTicTacToe = () => {
    const winner =
      getWinner(board);

    return (
      <div className="game-screen ttt-screen">
        <div className="game-topbar">
          <button
            className="back-button"
            onClick={() =>
              setGameType("menu")
            }
          >
            ← games
          </button>

          <div className="game-title">
            <span>
              TIC-TAC-TOE
            </span>

            <small>
              impossible bot
            </small>
          </div>

          <button
            className="reset-small"
            onClick={resetTTT}
          >
            ↻
          </button>
        </div>

        <div className="ttt-header">
          <div>
            <span>
              YOU
            </span>

            <strong>
              X
            </strong>
          </div>

          <div className="ttt-vs">
            VS
          </div>

          <div>
            <span>
              BOT
            </span>

            <strong>
              O
            </strong>
          </div>
        </div>

        <div className="ttt-board">
          {board.map(
            (cell, index) => (
              <button
                key={index}
                className={[
                  "ttt-cell",
                  cell
                    ? `cell-${cell}`
                    : "",
                ].join(" ")}
                onClick={() =>
                  handleTTTClick(
                    index
                  )
                }
              >
                {cell}
              </button>
            )
          )}
        </div>

        <div className="ttt-status">
          {winner === "X" &&
            "YOU WIN 🔥"}

          {winner === "O" &&
            "BOT WINS 💀"}

          {winner === "DRAW" &&
            "DRAW 😭"}

          {!winner &&
            (tttTurn === "X"
              ? "YOUR TURN"
              : "BOT IS THINKING...")}
        </div>

        <Button
          type="primary"
          danger
          onClick={resetTTT}
        >
          NEW GAME
        </Button>
      </div>
    );
  };

  /* =====================================
     RPS
  ===================================== */

  const renderRPS = () => (
    <div className="game-screen rps-screen">
      <div className="game-topbar">
        <button
          className="back-button"
          onClick={() =>
            setGameType("menu")
          }
        >
          ← games
        </button>

        <div className="game-title">
          <span>
            ROCK PAPER SCISSORS
          </span>

          <small>
            best of one
          </small>
        </div>

        <button
          className="reset-small"
          onClick={resetRPS}
        >
          ↻
        </button>
      </div>

      <div className="rps-battle">
        <div className="rps-player">
          <span>
            YOU
          </span>

          <div className="rps-choice">
            {playerChoice
              ? playerChoice ===
                "rock"
                ? "✊"
                : playerChoice ===
                  "paper"
                ? "✋"
                : "✌️"
              : "?"}
          </div>
        </div>

        <div className="rps-vs">
          VS
        </div>

        <div className="rps-player">
          <span>
            BOT
          </span>

          <div className="rps-choice">
            {botChoice
              ? botChoice ===
                "rock"
                ? "✊"
                : botChoice ===
                  "paper"
                ? "✋"
                : "✌️"
              : "?"}
          </div>
        </div>
      </div>

      <div className="rps-result">
        {rpsResult ||
          "make your move"}
      </div>

      <div className="rps-buttons">
        <button
          onClick={() =>
            playRPS("rock")
          }
        >
          <span>✊</span>
          ROCK
        </button>

        <button
          onClick={() =>
            playRPS("paper")
          }
        >
          <span>✋</span>
          PAPER
        </button>

        <button
          onClick={() =>
            playRPS("scissors")
          }
        >
          <span>✌️</span>
          SCISSORS
        </button>
      </div>

      <Button
        onClick={resetRPS}
      >
        PLAY AGAIN
      </Button>
    </div>
  );

  /* =====================================
     MODAL
  ===================================== */

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={850}
      className="mini-games-modal"
      destroyOnClose={false}
    >
      {gameType === "menu" &&
        renderMenu()}

      {gameType === "chess" &&
        renderChess()}

      {gameType ===
        "tictactoe" &&
        renderTicTacToe()}

      {gameType === "rps" &&
        renderRPS()}
    </Modal>
  );
}