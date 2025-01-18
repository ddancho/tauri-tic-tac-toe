"use client";

import { useGameContext } from "@/context/GameContext";
import { rLookAtMe, rMinimax } from "@/services";
import { useEffect } from "react";

export function useLookAtMe() {
  const {
    game: { board, currentPlayer },
    setBoardResult,
  } = useGameContext();

  useEffect(() => {
    rLookAtMe(board, setBoardResult);
  }, [currentPlayer, board, setBoardResult]);
}

export function useMinimax() {
  const {
    game: { board, currentPlayer, playerXCtrlHas, playerOCtrlHas },
    setMinimaxCellIndex,
    setPending,
  } = useGameContext();

  useEffect(() => {
    if (board.includes("FreeCell")) {
      if (currentPlayer === "PlayerX" && playerXCtrlHas === "Minimax") {
        rMinimax(board, "PlayerX", setMinimaxCellIndex, setPending);
      }

      if (currentPlayer === "PlayerO" && playerOCtrlHas === "Minimax") {
        rMinimax(board, "PlayerO", setMinimaxCellIndex, setPending);
      }
    }
  }, [
    currentPlayer,
    playerXCtrlHas,
    playerOCtrlHas,
    board,
    setMinimaxCellIndex,
    setPending,
  ]);
}
