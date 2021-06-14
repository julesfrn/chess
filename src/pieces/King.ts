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
    if (newSquare.piece?.color === this.color) return false
    if (this.aPieceThreatensThatSquare(board, currentSquare, newSquare)) return false
    return true
  }

  private aPieceThreatensThatSquare(board: Board, currentSquare: ISquare, newSquare: ISquare): boolean {
    const currentSquareCoordinates = board.getSquareCoordinates(currentSquare)
    const newSquareCoordinates = board.getSquareCoordinates(newSquare)
    const newSquarePiece = board.squares[newSquareCoordinates.row][newSquareCoordinates.column].piece
    board.squares[currentSquareCoordinates.row][currentSquareCoordinates.column].piece = null
    board.squares[newSquareCoordinates.row][newSquareCoordinates.column].piece = this
    const isEachPieceThreatening = board.squares
      .flat()
      .filter((square) => square.piece && square.piece.color !== this.color && !(square.piece instanceof King))
      .map((square) => {
        return (
          square.piece.getAllAvailableMoves(board, square).indexOf(newSquare) >= 0 &&
          square.piece.isAllowedToMoveTo(square, newSquare, board)
        )
      })
    const ennemyKingsSquare = board.getSquareCoordinates(board.squares
      .flat()
      .filter((square) => square.piece && square.piece.color !== this.color && square.piece instanceof King)[0])
    if (
      ennemyKingsSquare.row - newSquareCoordinates.row <= 1 &&
      ennemyKingsSquare.row - newSquareCoordinates.row >= -1 && 
      ennemyKingsSquare.column - newSquareCoordinates.column <= 1 &&
      ennemyKingsSquare.column - newSquareCoordinates.column >= -1 
    ) isEachPieceThreatening.push(true)
    board.squares[currentSquareCoordinates.row][currentSquareCoordinates.column].piece = this
    board.squares[newSquareCoordinates.row][newSquareCoordinates.column].piece = newSquarePiece
    return isEachPieceThreatening.some(Boolean)
  }
}
