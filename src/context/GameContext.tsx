"use client";

import {
  Board,
  BoardResult,
  GameOver,
  GameResult,
  MinimaxCellIndex,
  PlayerOCtrlHas,
  PlayerXCtrlHas,
  TurnToPlay,
  WinCells,
} from "@/types";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type GameType = {
  currentPlayer: TurnToPlay;
  board: Board;
  gameOver: GameOver;
  gameResult: GameResult;
  winCells: WinCells;
  playerXCtrlHas: PlayerXCtrlHas;
  playerOCtrlHas: PlayerOCtrlHas;
};

type GameContextType = {
  game: GameType;
  setGame: Dispatch<SetStateAction<GameType>>;
  boardResult: BoardResult;
  setBoardResult: Dispatch<SetStateAction<BoardResult>>;
  minimaxCellIndex: MinimaxCellIndex;
  setMinimaxCellIndex: Dispatch<SetStateAction<MinimaxCellIndex>>;
  pending: boolean;
  setPending: Dispatch<SetStateAction<boolean>>;
};

export const GameContext = createContext<GameContextType | null>(null);

type GameContextProviderProps = {
  children: React.ReactNode;
};

export function GameContextProvider({ children }: GameContextProviderProps) {
  const [game, setGame] = useState<GameType>(() => {
    return getGameInitialState();
  });
  const [boardResult, setBoardResult] = useState<BoardResult>(() => {
    return [false, null, null];
  });
  const [minimaxCellIndex, setMinimaxCellIndex] =
    useState<MinimaxCellIndex>(null);

  const [pending, setPending] = useState(false);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        boardResult,
        setBoardResult,
        minimaxCellIndex,
        setMinimaxCellIndex,
        pending,
        setPending,
      }}
    >
      <GameMounted>{children}</GameMounted>
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext Error!");
  }

  return context;
}

type GameMountedProps = {
  children: React.ReactNode;
};

export function getGameInitialState(): GameType {
  const pickFrom: [PlayerXCtrlHas, PlayerOCtrlHas] = ["Human", "Minimax"];

  const playerXCtrlHas: PlayerXCtrlHas =
    pickFrom[Math.floor(Math.random() * 2)];
  const playerOCtrlHas: PlayerOCtrlHas =
    playerXCtrlHas === "Human" ? "Minimax" : "Human";

  return {
    currentPlayer: "PlayerX",
    board: [
      "FreeCell",
      "FreeCell",
      "FreeCell",
      "FreeCell",
      "FreeCell",
      "FreeCell",
      "FreeCell",
      "FreeCell",
      "FreeCell",
    ],
    gameOver: false,
    gameResult: "GameNotOver",
    winCells: null,
    playerXCtrlHas,
    playerOCtrlHas,
  };
}

function GameMounted({ children }: GameMountedProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return <>{mounted && <>{children}</>}</>;
}
