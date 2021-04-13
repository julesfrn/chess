import Board, { ISquare } from '../Board'
import Piece, { color, pieceName } from './Piece'

export default class Pawn extends Piece {
  constructor(color: color) {
    super(color)
    this.name = pieceName.PAWN
    this.moves = [
      [-2, 0],
      [-1, 0],
      [-1, 1],
      [-1, -1],
    ]
  }

  get image(): string {
    return this.color === color.WHITE
      ? 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/wp.png'
      : 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/bp.png'
  }
}
