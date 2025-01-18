use super::Board;

struct Score {
    minimax: Option<i64>, // 1
    human: Option<i64>,   // -1
    tie: Option<i64>,     // 0
}

pub async fn minimax_internal(
    board: &mut Board,
    depth: i64,
    is_maximizing: bool,
    algo_player: &str,
) -> i64 {
    let score: Option<i64> = match look_at_me(board, algo_player) {
        Score {
            minimax: Some(v), ..
        } => Some(v),
        Score { human: Some(v), .. } => Some(v),
        Score { tie: Some(v), .. } => Some(v),
        Score {
            minimax: None,
            human: None,
            tie: None,
        } => None,
    };

    if let Some(i) = score {
        return i;
    }

    let player_x = String::from("PlayerX");
    let player_o = String::from("PlayerO");
    let free_cell = String::from("FreeCell");

    let human_player: String = if algo_player == player_x {
        player_o
    } else {
        player_x
    };

    // algo plays
    if is_maximizing {
        let mut best_score: i64 = f64::NEG_INFINITY as i64;

        for i in 0..board.len() {
            if board[i] == free_cell {
                // algo moves here
                board[i] = algo_player.to_string();

                // next playing is human so is_maximizing = false
                let score = Box::pin(minimax_internal(board, depth + 1, false, algo_player)).await;

                // reset move
                board[i] = free_cell.clone();

                if score > best_score {
                    best_score = score
                }
            }
        }
        best_score
    } else {
        // human plays
        let mut best_score: i64 = f64::INFINITY as i64;

        for i in 0..board.len() {
            if board[i] == free_cell {
                // human moves here
                board[i] = human_player.clone();

                // next playing is algo so is_maximizing = true
                let score = Box::pin(minimax_internal(board, depth + 1, true, algo_player)).await;

                // reset move
                board[i] = free_cell.clone();

                if score < best_score {
                    best_score = score
                }
            }
        }
        best_score
    }
}

fn look_at_me(board: &Board, algo_player: &str) -> Score {
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

        if is_algo_win(
            board[*cell1].clone(),
            board[*cell2].clone(),
            board[*cell3].clone(),
            algo_player,
        ) {
            let score = Score {
                minimax: Some(1),
                human: None,
                tie: None,
            };

            return score;
        }

        if is_human_win(
            board[*cell1].clone(),
            board[*cell2].clone(),
            board[*cell3].clone(),
            algo_player,
        ) {
            let score = Score {
                minimax: None,
                human: Some(-1),
                tie: None,
            };

            return score;
        }
    }

    if board.contains(&String::from("FreeCell")) {
        return Score {
            minimax: None,
            human: None,
            tie: None,
        };
    }

    Score {
        minimax: None,
        human: None,
        tie: Some(0),
    }
}

fn is_algo_win(cell1: String, cell2: String, cell3: String, algo_player: &str) -> bool {
    if cell1 == algo_player && cell1 == cell2 && cell2 == cell3 {
        return true;
    }

    false
}

fn is_human_win(cell1: String, cell2: String, cell3: String, algo_player: &str) -> bool {
    let free_cell = String::from("FreeCell");

    if cell1 != algo_player && cell1 != free_cell && cell1 == cell2 && cell2 == cell3 {
        return true;
    }

    false
}
