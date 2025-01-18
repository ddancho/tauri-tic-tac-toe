import { Board, BoardResult, MinimaxCellIndex, Player } from "@/types";
import { invoke } from "@tauri-apps/api/core";
import { Dispatch, SetStateAction } from "react";

export function rLookAtMe(
  board: Board,
  cb: Dispatch<SetStateAction<BoardResult>>
) {
  invoke("look_at_me", { board }).then((data) => cb(data as BoardResult));
}

export function rMinimax(
  board: Board,
  algoPlayer: Player,
  cb: Dispatch<SetStateAction<MinimaxCellIndex>>,
  cbp: Dispatch<SetStateAction<boolean>>
) {
  cbp(true);
  invoke("minimax", { board, algoPlayer }).then((data) => {
    cbp(false);
    cb(data as MinimaxCellIndex);
  });
}
