import Board, { ISquare } from '../Board'
import Piece, { color, pieceName } from './Piece'

export default class Rook extends Piece {
  constructor(color: color) {
    super(color)
    this.name = pieceName.ROOK
    this.moves = [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [-1, 0],
      [-2, 0],
      [-3, 0],
      [-4, 0],
      [-5, 0],
      [-6, 0],
      [-7, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, -1],
      [0, -2],
      [0, -3],
      [0, -4],
      [0, -5],
      [0, -6],
      [0, -7],
    ]
  }

  get image(): string {
    return this.color === color.WHITE
      ? 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/wr.png'
      : 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/br.png'
  }

  public isAllowedToMoveTo(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean {
    let isAllowedToMoveTo = true
    const squaresBetween = board.getSquaresBetween(currentSquare, newSquare)
    for (let i = 0; i < squaresBetween.length; i++) {
      if (
        squaresBetween[i].piece?.color === this.color ||
        (squaresBetween[i - 1]?.piece && squaresBetween[i - 1].piece.color !== this.color)
      ) {
        isAllowedToMoveTo = false
        break
      }
    }
    return isAllowedToMoveTo
  }
}
