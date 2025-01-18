import { CSSProperties } from "react";
import styles from "./drawPlayero.module.css";

type PlayerOProps = {
  display: boolean;
};

function DrawPlayerO({ display }: PlayerOProps) {
  const style: CSSProperties = {
    display: display ? "initial" : "none",
  };

  return (
    <span className={styles.playerx} style={style}>
      O
    </span>
  );
}

export default DrawPlayerO;
