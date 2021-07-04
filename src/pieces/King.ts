import Board, { ISquare } from '../Board'
import Piece, { color, pieceName } from './Piece'
import cloneDeep from 'lodash.clonedeep'

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
      [0, 2],
      [0, -2],
    ]
  }

  get image(): string {
    return this.color === color.WHITE
      ? 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/wk.png'
      : 'https://images.chesscomfiles.com/chess-themes/pieces/tournament/150/bk.png'
  }

  public isGoingToBeInCheckAfterMove(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean {
    const currentSquareClone = cloneDeep(currentSquare)
    const newSquareClone = cloneDeep(newSquare)

    currentSquareClone.piece = null
    newSquareClone.piece = currentSquare.piece

    board.renderSquare(currentSquareClone)
    board.renderSquare(newSquareClone)
    let isGoingToBeInCheckAfterMove = this.aPieceThreatensThatSquare(
      board,
      board.getAllyKingSquare(this.color),
      board.getAllyKingSquare(this.color)
    )

    board.renderSquare(currentSquare)
    board.renderSquare(newSquare)
    
    return isGoingToBeInCheckAfterMove
  }

  public isAllowedToMoveTo(currentSquare: ISquare, newSquare: ISquare, board: Board): boolean {
    if (newSquare.piece?.color === this.color) return false
    if (this.aPieceThreatensThatSquare(board, currentSquare, newSquare)) return false
    if (this.isMoveCastle(currentSquare, newSquare, board)) {
      if (this.hasMovedBefore) return false
      if (
        newSquare.name === 'g1' &&
        (board.getSquareFromName('h1').piece?.name !== pieceName.ROOK ||
          board.getSquareFromName('h1').piece?.color === color.BLACK ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('e1')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('g1')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('f1')))
      )
        return false
      if (
        newSquare.name === 'c1' &&
        (board.getSquareFromName('a1').piece?.name !== pieceName.ROOK ||
          board.getSquareFromName('a1').piece?.color === color.BLACK ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('e1')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('d1')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('c1')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('b1')))
      )
        return false
      if (
        newSquare.name === 'g8' &&
        (board.getSquareFromName('h8').piece?.name !== pieceName.ROOK ||
          board.getSquareFromName('h8').piece?.color === color.WHITE ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('e8')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('f8')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('g8')))
      )
        return false
      if (
        newSquare.name === 'c8' &&
        (board.getSquareFromName('a8').piece?.name !== pieceName.ROOK ||
          board.getSquareFromName('a8').piece?.color === color.WHITE ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('e8')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('d8')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('c8')) ||
          this.aPieceThreatensThatSquare(board, currentSquare, board.getSquareFromName('b8')))
      )
        return false
    }
    return true
  }

  private isMoveCastle(currentSquare: ISquare, newSquare: ISquare, board: Board) {
    const currentSquareCoordinates = board.getSquareCoordinates(currentSquare)
    const newSquareCoordinates = board.getSquareCoordinates(newSquare)
    if (
      newSquareCoordinates.column - currentSquareCoordinates.column > 1 ||
      newSquareCoordinates.column - currentSquareCoordinates.column < -1
    )
      return true
    return false
  }

  public moveSpecific(currentSquare: ISquare, newSquare: ISquare, board: Board) {
    if (this.isMoveCastle(currentSquare, newSquare, board) && this.color === color.WHITE) {
      if (newSquare.name === 'g1') {
        const rook = board.getSquareFromName('h1').piece
        board.getSquareFromName('h1').piece = null
        board.getSquareFromName('f1').piece = rook
        newSquare.piece = this
        currentSquare.piece = null
        board.renderSquaresAndUI(currentSquare, newSquare, board.getSquareFromName('h1'), board.getSquareFromName('f1'))
      }
      if (newSquare.name === 'c1') {
        const rook = board.getSquareFromName('a1').piece
        board.getSquareFromName('a1').piece = null
        board.getSquareFromName('d1').piece = rook
        newSquare.piece = this
        currentSquare.piece = null
        board.renderSquaresAndUI(currentSquare, newSquare, board.getSquareFromName('a1'), board.getSquareFromName('d1'))
      }
    } else if (this.isMoveCastle(currentSquare, newSquare, board) && this.color === color.BLACK) {
      if (newSquare.name === 'g8') {
        const rook = board.getSquareFromName('h8').piece
        board.getSquareFromName('h8').piece = null
        board.getSquareFromName('f8').piece = rook
        newSquare.piece = this
        currentSquare.piece = null
        board.renderSquaresAndUI(currentSquare, newSquare, board.getSquareFromName('h8'), board.getSquareFromName('f8'))
      }
      if (newSquare.name === 'c8') {
        const rook = board.getSquareFromName('a8').piece
        board.getSquareFromName('a8').piece = null
        board.getSquareFromName('d8').piece = rook
        newSquare.piece = this
        currentSquare.piece = null
        board.renderSquaresAndUI(currentSquare, newSquare, board.getSquareFromName('a8'), board.getSquareFromName('d8'))
      }
    } else {
      newSquare.piece = this
      currentSquare.piece = null
      board.renderSquaresAndUI(currentSquare, newSquare)
    }
  }

  public aPieceThreatensThatSquare(board: Board, currentSquare: ISquare, newSquare: ISquare): boolean {
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
          square.piece
            .getAllAvailableMoves(board, square)
            .indexOf(board.squares[newSquareCoordinates.row][newSquareCoordinates.column]) >= 0 &&
          square.piece.isAllowedToMoveTo(
            square,
            board.squares[newSquareCoordinates.row][newSquareCoordinates.column],
            board
          )
        )
      })
    const ennemyKingsSquare = board.getSquareCoordinates(
      board.squares
        .flat()
        .filter((square) => square.piece && square.piece.color !== this.color && square.piece instanceof King)[0]
    )
    if (
      ennemyKingsSquare.row - newSquareCoordinates.row <= 1 &&
      ennemyKingsSquare.row - newSquareCoordinates.row >= -1 &&
      ennemyKingsSquare.column - newSquareCoordinates.column <= 1 &&
      ennemyKingsSquare.column - newSquareCoordinates.column >= -1
    )
      isEachPieceThreatening.push(true)
    board.squares[currentSquareCoordinates.row][currentSquareCoordinates.column].piece = this
    board.squares[newSquareCoordinates.row][newSquareCoordinates.column].piece = newSquarePiece
    return isEachPieceThreatening.some(Boolean)
  }
}
