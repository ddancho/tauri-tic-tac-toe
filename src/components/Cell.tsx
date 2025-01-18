"use client";

import { CellType, Player } from "@/types";
import DrawPlayerO from "./DrawPlayerO";
import DrawPlayerX from "./DrawPlayerX";
import styles from "./cell.module.css";
import { JSX } from "react";
import { useGameContext } from "@/context/GameContext";
import {
  useIsCurrentPlayerHumanAndO,
  useIsCurrentPlayerHumanAndX,
} from "@/hooks/GameHooks";

type CellProps = {
  index: number;
  cellType: CellType;
  player: Player;
};

function Cell({ index, cellType, player }: CellProps) {
  const {
    game: { gameOver, winCells },
    setGame,
  } = useGameContext();

  const isPlayerXHuman = useIsCurrentPlayerHumanAndX();
  const isPlayerOHuman = useIsCurrentPlayerHumanAndO();

  const handleClickEvent = () => {
    if (
      cellType === "FreeCell" &&
      !gameOver &&
      (isPlayerXHuman || isPlayerOHuman)
    ) {
      setGame((prev) => {
        const { board } = prev;
        let { currentPlayer } = prev;

        board[index] = player;
        currentPlayer = player === "PlayerX" ? "PlayerO" : "PlayerX";

        return { ...prev, board, currentPlayer };
      });
    }
  };

  let content: JSX.Element | null = null;

  if (cellType === "PlayerX") {
    content = <DrawPlayerX display={true} key={index} />;
  } else if (cellType === "PlayerO") {
    content = <DrawPlayerO display={true} key={index + 100} />;
  }

  if (content) {
    return (
      <div
        className={styles.cell}
        style={
          winCells?.find((i) => i === index) !== undefined
            ? { backgroundColor: "cornflowerblue" }
            : { backgroundColor: "initial" }
        }
      >
        {content}
      </div>
    );
  }

  return <div className={styles.cell} onClick={handleClickEvent}></div>;
}

export default Cell;
