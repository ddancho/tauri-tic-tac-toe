mod internal;

use std::{option::Option, string::String};

use internal::minimax_internal;

type Board = [String; 9];

#[tauri::command]
pub async fn minimax(mut board: Board, algo_player: &str) -> Result<usize, ()> {
    // check if the board is empty and algo has first move
    if !board.contains(&String::from("PlayerX")) && !board.contains(&String::from("PlayerO")) {
        // start of the game, just return cell index 0
        // as the best move

        return Ok(0_usize);
    }

    let free_cell = String::from("FreeCell");

    let mut best_score: i64 = f64::NEG_INFINITY as i64;
    let mut cell_index: usize = 0;

    // algo plays first
    for i in 0..board.len() {
        if board[i] == free_cell {
            // algo moves here
            board[i] = algo_player.to_string();

            // next to play is human so is_maximizing = false
            let score = minimax_internal(&mut board, 0, false, algo_player).await;

            // reset move
            board[i] = free_cell.clone();

            if score > best_score {
                best_score = score;

                cell_index = i;
            }
        }
    }

    Ok(cell_index)
}

#[tauri::command]
pub fn look_at_me(board: Board) -> (bool, Option<String>, Option<[usize; 3]>) {
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];

    for i in wins.iter() {
        let [cell1, cell2, cell3] = i;

        if is_win(
            board[*cell1].clone(),
            board[*cell2].clone(),
            board[*cell3].clone(),
        ) {
            return (
                true,
                Some(board[*cell1].clone()),
                Some([*cell1, *cell2, *cell3]),
            );
        }
    }

    (false, None, None)
}

fn is_win(cell1: String, cell2: String, cell3: String) -> bool {
    let player_x = String::from("PlayerX");
    let player_o = String::from("PlayerO");

    if cell1 == player_x && cell1 == cell2 && cell2 == cell3 {
        return true;
    }

    if cell1 == player_o && cell1 == cell2 && cell2 == cell3 {
        return true;
    }

    false
}
