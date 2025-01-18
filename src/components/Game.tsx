"use client";

import GameLogic from "./GameLogic";
import GameInfo from "./GameInfo";
import styles from "./game.module.css";
import { useLookAtMe, useMinimax } from "@/hooks/RustHooks";
import {
  useCheckBoardResult,
  useDrawMinimaxMove,
  useGameResult,
} from "@/hooks/GameHooks";

function Game() {
  useLookAtMe();

  useGameResult();

  useCheckBoardResult();

  useDrawMinimaxMove();

  useMinimax();

  return (
    <section className={styles.layout}>
      <GameLogic />
      <GameInfo />
    </section>
  );
}

export default Game;
