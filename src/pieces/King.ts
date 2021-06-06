import Board, { ISquare } from '../Board'
import Piece, { color, pieceName } from './Piece'

export default class King extends Piece {
  constructor(color: color) {
    super(color)
    this.name = pieceName.KING
    this.moves = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]
  }

  get image(): string {
    return this.color === color.WHITE
      ? 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/wk.png'
      : 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/bk.png'
  }

  public isAllowedToMoveTo(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean {
    return true
  }
}
