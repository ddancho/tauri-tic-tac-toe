"use client";

import { getGameInitialState, useGameContext } from "@/context/GameContext";
import styles from "./gameInfo.module.css";
import { useEffect, useState } from "react";

function GameInfo() {
  const [restartGame, setRestartGame] = useState(false);

  const {
    game: { currentPlayer, gameResult, playerXCtrlHas, playerOCtrlHas },
    setGame,
    setBoardResult,
    setMinimaxCellIndex,
    setPending,
    pending,
  } = useGameContext();

  const handleStartNewGame = () => setRestartGame(true);

  useEffect(() => {
    if (restartGame) {
      setRestartGame(false);

      setGame(() => {
        return getGameInitialState();
      });

      setBoardResult(() => {
        return [false, null, null];
      });

      setMinimaxCellIndex(null);

      setPending(false);
    }
  }, [restartGame, setGame, setBoardResult, setMinimaxCellIndex, setPending]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p>
          PlayerX is: <span>{playerXCtrlHas}</span>
        </p>
        <p>
          PlayerO is: <span>{playerOCtrlHas}</span>
        </p>
        <p>
          Turn to play: <span>{currentPlayer}</span>
        </p>
        <p>
          Game result: <span>{gameResult}</span>
        </p>
        <p>
          Waiting for the Minimax:{" "}
          <span>{pending === true ? "Yes" : "No"}</span>
        </p>
      </div>

      <button className={styles.btn} onClick={handleStartNewGame}>
        Start New Game
      </button>
    </div>
  );
}

export default GameInfo;
