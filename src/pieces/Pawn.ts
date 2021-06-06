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

  public isAllowedToMoveTo(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean {
    const currentSquareCoordinates = board.getSquareCoordinates(currentSquare)
    const newSquareCoordinates = board.getSquareCoordinates(newSquare)
    const isNewSquareDiagonal: boolean = currentSquareCoordinates.column - newSquareCoordinates.column !== 0
    if (isNewSquareDiagonal && (!newSquare.piece || newSquare.piece?.color === this.color)) return false
    const isNewSquare2SquaresAway: boolean =
      currentSquareCoordinates.row - newSquareCoordinates.row === 2 ||
      currentSquareCoordinates.row - newSquareCoordinates.row === -2
    if (
      isNewSquare2SquaresAway &&
      ((this.color === color.WHITE && currentSquare.name[1] !== '2') ||
        (this.color === color.BLACK && currentSquare.name[1] !== '7') ||
        newSquare.piece)
    )
      return false
    if (
      currentSquareCoordinates.column === newSquareCoordinates.column &&
      this.isThereAPieceBetween(currentSquare, newSquare, board)
    )
      return false
    return true
  }

  private isThereAPieceBetween(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean {
    let isThereAPieceBetween = false
    board.getSquaresBetween(currentSquare, newSquare).forEach((square: ISquare) => {
      if (square.piece) isThereAPieceBetween = true
    })
    return isThereAPieceBetween
  }
}
