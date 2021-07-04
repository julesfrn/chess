import Board, { ISquare } from '../Board'
import King from './King'

export enum color {
  BLACK = 'black',
  WHITE = 'white',
}

export enum pieceName {
  PAWN = 'P',
  KING = 'K',
  QUEEN = 'Q',
  KNIGHT = 'N',
  BISHOP = 'B',
  ROOK = 'R',
}

export default abstract class Piece {
  constructor(public readonly color: color) {}

  public name: pieceName

  public moves: [number, number][]

  protected hasMovedBefore: boolean = false

  abstract get image(): string

  public isVulnerableToEnPassant?: boolean

  public move(board: Board, currentSquare: ISquare, newSquare: ISquare): void {
    this.hasMovedBefore = true
    if (this.name === pieceName.PAWN || this.name === pieceName.KING) {
      this.moveSpecific(currentSquare, newSquare, board)
    } else {
      currentSquare.piece = null
      newSquare.piece = this
      board.renderSquaresAndUI(currentSquare, newSquare)
    }
    board.turn = board.turn === color.WHITE ? color.BLACK : color.WHITE
    board.setSquareWithPawnsClickable()
    board.listenToClicks()
  }

  public getAllAvailableMoves(board: Board, currentSquare: ISquare): ISquare[] {
    const currentSquareCoordinates = board.getSquareCoordinates(currentSquare)
    return this.moves
      .map((move: [number, number]): ISquare | undefined => {
        const whiteMove = board.squares[currentSquareCoordinates.row + move[0]]
          ? board.squares[currentSquareCoordinates.row + move[0]][currentSquareCoordinates.column + move[1]]
          : null
        const blackMove = board.squares[currentSquareCoordinates.row + -move[0]]
          ? board.squares[currentSquareCoordinates.row + -move[0]][currentSquareCoordinates.column + -move[1]]
          : null
        return currentSquare.piece.color === color.WHITE ? whiteMove : blackMove
      })
      .filter(Boolean)
      .filter((square: ISquare): boolean => this.isAllowedToMoveTo(currentSquare, square, board))
  }

  public showAvailableMoves(board: Board, currentSquare: ISquare): void {
    this.getAllAvailableMoves(board, currentSquare)
      .filter(
        (square) => {
          if (this.name !== pieceName.KING) {
            return !(board.getAllyKingSquare(this.color).piece as King).isGoingToBeInCheckAfterMove(currentSquare, square, board)
          } else {
            return true
          }
        }
      )
      .forEach((square: ISquare) => {
        document.getElementById(square.name).classList.add('canGoToThisSquare')
        document.getElementById(square.name).setAttribute('clickable', '')
      })
    board.setSquareWithPawnsClickable()
    board.listenToClicks()
  }

  public abstract moveSpecific(currentSquare: ISquare, newSquare: ISquare, board: Board): void

  public abstract isAllowedToMoveTo(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean
}
