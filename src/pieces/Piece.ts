import Board, { ISquare } from '../Board'

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

  abstract get image(): string

  public hasMovedBefore: boolean = false

  public move(board: Board, currentSquare: ISquare, newSquare: ISquare): void {
    board.moveHistory.push(this.buildMoveName(currentSquare, newSquare))
    currentSquare.piece = null
    newSquare.piece = this
    board.renderSquares(currentSquare, newSquare)
    board.turn = board.turn === color.WHITE ? color.BLACK : color.WHITE
    board.setSquareWithPawnsClickable()
    board.listenToClicks()
  }

  private buildMoveName(currentSquare: ISquare, newSquare: ISquare): string {
    return newSquare.piece
      ? `${this.name === pieceName.PAWN ? currentSquare.name[0] : this.name}x${newSquare.name}`
      : `${this.name === pieceName.PAWN ? newSquare.name : this.name + newSquare.name}`
  }

  public showAvailableMoves(board: Board, currentSquare: ISquare): void {
    const currentSquareCoordinates = board.getSquareCoordinates(currentSquare)
    this.moves
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
      .forEach((square: ISquare) => {
        document.getElementById(square.name).classList.add('canGoToThisSquare')
        document.getElementById(square.name).setAttribute('clickable', '')
      })
    board.setSquareWithPawnsClickable()
    board.listenToClicks()
  }

  public abstract isAllowedToMoveTo(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean
}
