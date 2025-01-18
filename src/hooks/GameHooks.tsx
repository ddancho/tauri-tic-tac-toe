"use client";

import { useGameContext } from "@/context/GameContext";
import { Player } from "@/types";
import { useEffect } from "react";

export function useDrawMinimaxMove() {
  const { minimaxCellIndex, setGame } = useGameContext();

  useEffect(() => {
    if (minimaxCellIndex != null) {
      setGame((prev) => {
        const { gameResult } = prev;

        if (gameResult === "GameNotOver") {
          const { board, playerXCtrlHas, playerOCtrlHas } = prev;
          let { currentPlayer } = prev;

          let player: Player = "PlayerX";

          if (currentPlayer === "PlayerX" && playerXCtrlHas === "Minimax") {
            player = "PlayerX";
          }

          if (currentPlayer === "PlayerO" && playerOCtrlHas === "Minimax") {
            player = "PlayerO";
          }

          board[minimaxCellIndex] = player;
          currentPlayer = player === "PlayerX" ? "PlayerO" : "PlayerX";

          return { ...prev, board, currentPlayer };
        }

        return prev;
      });
    }
  }, [minimaxCellIndex, setGame]);
}

export function useCheckBoardResult() {
  const {
    boardResult,
    setGame,
    game: { board },
  } = useGameContext();

  useEffect(() => {
    const [win, cell, winningCells] = boardResult;

    if (win) {
      setGame((prev) => {
        let { gameOver, gameResult, winCells } = prev;
        gameOver = true;
        gameResult = cell === "PlayerX" ? "PlayerXWins" : "PlayerOWins";
        winCells = winningCells;

        return { ...prev, gameOver, gameResult, winCells };
      });
    } else {
      if (board.includes("FreeCell")) {
        setGame((prev) => {
          let { gameResult } = prev;
          gameResult = "GameNotOver";

          return { ...prev, gameResult };
        });
      } else {
        setGame((prev) => {
          let { gameResult } = prev;
          gameResult = "Tie";

          return { ...prev, gameResult };
        });
      }
    }
  }, [boardResult, setGame, board]);
}

export function useGameResult() {
  const {
    game: { gameResult },
    setGame,
  } = useGameContext();

  useEffect(() => {
    if (
      gameResult === "PlayerXWins" ||
      gameResult === "PlayerOWins" ||
      gameResult === "Tie"
    ) {
      setGame((prev) => {
        let { gameOver } = prev;
        gameOver = true;

        return { ...prev, gameOver };
      });
    }
  }, [gameResult, setGame]);
}

export function useIsCurrentPlayerHumanAndX() {
  const {
    game: { playerXCtrlHas, currentPlayer },
  } = useGameContext();

  return currentPlayer === "PlayerX" && playerXCtrlHas === "Human";
}

export function useIsCurrentPlayerHumanAndO() {
  const {
    game: { playerOCtrlHas, currentPlayer },
  } = useGameContext();

  return currentPlayer === "PlayerO" && playerOCtrlHas === "Human";
}
