import { CSSProperties } from "react";
import styles from "./drawPlayerx.module.css";

type PlayerXProps = {
  display: boolean;
};

function DrawPlayerX({ display }: PlayerXProps) {
  const style: CSSProperties = {
    display: display ? "initial" : "none",
  };

  return (
    <span className={styles.playerx} style={style}>
      X
    </span>
  );
}

export default DrawPlayerX;
