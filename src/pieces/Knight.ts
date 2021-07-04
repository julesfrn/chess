import Board, { ISquare } from '../Board'
import Piece, { color, pieceName } from './Piece'

export default class Knight extends Piece {
  constructor(color: color) {
    super(color)
    this.name = pieceName.KNIGHT
    this.moves = [
      [-2, 1],
      [2, -1],
      [2, 1],
      [-2, -1],
      [-1, 2],
      [1, -2],
      [1, 2],
      [-1, -2],
    ]
  }

  get image(): string {
    return this.color === color.WHITE
      ? 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/wn.png'
      : 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/bn.png'
  }

  public isAllowedToMoveTo(_currentSquare: ISquare, newSquare: ISquare, _board: Board): boolean {
    if (newSquare.piece?.color === this.color) return false
    return true
  }

  public moveSpecific() {}
}
