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

  public isVulnerableToEnPassant?: boolean

  public move(board: Board, currentSquare: ISquare, newSquare: ISquare): void {
    board.moveHistory.push(this.buildMoveName(currentSquare, newSquare))
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
    board.renderSquares(currentSquare, newSquare, rightSquare, leftSquare)
    board.turn = board.turn === color.WHITE ? color.BLACK : color.WHITE
    board.setSquareWithPawnsClickable()
    board.listenToClicks()
  }

  private buildMoveName(currentSquare: ISquare, newSquare: ISquare): string {
    return newSquare.piece
      ? `${this.name === pieceName.PAWN ? currentSquare.name[0] : this.name}x${newSquare.name}`
      : `${this.name === pieceName.PAWN ? newSquare.name : this.name + newSquare.name}`
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
    this.getAllAvailableMoves(board, currentSquare).forEach((square: ISquare) => {
      document.getElementById(square.name).classList.add('canGoToThisSquare')
      document.getElementById(square.name).setAttribute('clickable', '')
    })
    board.setSquareWithPawnsClickable()
    board.listenToClicks()
  }

  public abstract isAllowedToMoveTo(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean
}
