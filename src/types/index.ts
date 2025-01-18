export type PlayerX = "PlayerX";

export type PlayerO = "PlayerO";

export type Player = PlayerX | PlayerO;

export type FreeCell = "FreeCell";

export type CellType = FreeCell | PlayerX | PlayerO;

export type Board = [
  CellType,
  CellType,
  CellType,
  CellType,
  CellType,
  CellType,
  CellType,
  CellType,
  CellType
];

export type TurnToPlay = Player;

export type PlayerXWins = "PlayerXWins";

export type PlayerOWins = "PlayerOWins";

export type Tie = "Tie";

export type GameNotOver = "GameNotOver";

export type GameOver = boolean;

export type WinCells = [number, number, number] | null;

export type GameResult = PlayerXWins | PlayerOWins | Tie | GameNotOver;

export type BoardResult = [boolean, CellType | null, WinCells];

export type Human = "Human";

export type Minimax = "Minimax";

export type PlayerXCtrlHas = Human | Minimax;

export type PlayerOCtrlHas = Human | Minimax;

export type MinimaxCellIndex = number | null;
