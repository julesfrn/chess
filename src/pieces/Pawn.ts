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

  public isVulnerableToEnPassant: boolean = false

  get image(): string {
    return this.color === color.WHITE
      ? 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/wp.png'
      : 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/bp.png'
  }

  public moveSpecific(currentSquare: ISquare, newSquare: ISquare, board: Board) {
    currentSquare.piece = null
    newSquare.piece = this
    const currentSquareCoordinates = board.getSquareCoordinates(currentSquare)
    const newSquareCoordinates = board.getSquareCoordinates(newSquare)
    const isNewSquareDiagonal: boolean = currentSquareCoordinates.column - newSquareCoordinates.column !== 0
    const isGoingRight: boolean = currentSquareCoordinates.column - newSquareCoordinates.column === -1
    const rightSquare = board.getSquareFromCoordinates({
      ...currentSquareCoordinates,
      column: currentSquareCoordinates.column + 1,
    })
    if (isNewSquareDiagonal && isGoingRight) {
      if (rightSquare.piece && rightSquare.piece.color !== this.color && rightSquare.piece.isVulnerableToEnPassant)
        rightSquare.piece = null
    }
    const isGoingLeft: boolean = currentSquareCoordinates.column - newSquareCoordinates.column === 1
    const leftSquare = board.getSquareFromCoordinates({
      ...currentSquareCoordinates,
      column: currentSquareCoordinates.column - 1,
    })
    if (isNewSquareDiagonal && isGoingLeft) {
      if (leftSquare.piece && leftSquare.piece.color !== this.color && leftSquare.piece.isVulnerableToEnPassant)
        leftSquare.piece = null
    }
    board.deleteEnPassantVulnerabilities()
    if (
      this.name === pieceName.PAWN &&
      [2, -2].includes(board.getSquareCoordinates(currentSquare).row - board.getSquareCoordinates(newSquare).row)
    )
      this.isVulnerableToEnPassant = true
    const squares = [currentSquare, newSquare]
    if (rightSquare) squares.push(rightSquare)
    if (leftSquare) squares.push(leftSquare)
    board.renderSquares(...squares)
  }

  public isAllowedToMoveTo(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean {
    const currentSquareCoordinates = board.getSquareCoordinates(currentSquare)
    const newSquareCoordinates = board.getSquareCoordinates(newSquare)
    const isNewSquareDiagonal: boolean = currentSquareCoordinates.column - newSquareCoordinates.column !== 0
    const isGoingRight: boolean = currentSquareCoordinates.column - newSquareCoordinates.column === -1
    if (isNewSquareDiagonal && isGoingRight) {
      const rightSquare = board.getSquareFromCoordinates({
        ...currentSquareCoordinates,
        column: currentSquareCoordinates.column + 1,
      })
      if (rightSquare.piece && rightSquare.piece.color !== this.color && rightSquare.piece.isVulnerableToEnPassant)
        return true
    }
    const isGoingLeft: boolean = currentSquareCoordinates.column - newSquareCoordinates.column === 1
    if (isNewSquareDiagonal && isGoingLeft) {
      const leftSquare = board.getSquareFromCoordinates({
        ...currentSquareCoordinates,
        column: currentSquareCoordinates.column - 1,
      })
      if (leftSquare.piece && leftSquare.piece.color !== this.color && leftSquare.piece.isVulnerableToEnPassant)
        return true
    }
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
