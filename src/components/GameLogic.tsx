"use client";

import { useGameContext } from "@/context/GameContext";
import Cell from "./Cell";
import styles from "./gameLogic.module.css";

function GameLogic() {
  const {
    game: { board, currentPlayer },
  } = useGameContext();

  return (
    <div className={styles.game}>
      <div className={styles.grid}>
        {board.map((cell, i) => {
          return (
            <Cell cellType={cell} player={currentPlayer} index={i} key={i} />
          );
        })}
      </div>
    </div>
  );
}

export default GameLogic;
