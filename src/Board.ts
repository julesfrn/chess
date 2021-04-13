import Piece, { color } from './pieces/Piece'
import defaultSquare from './defaultSquare'

export interface ISquare {
  piece: Piece | null
  name: string
}

export default class Board {
  public readonly squares: ISquare[][] = defaultSquare

  public turn: color = color.WHITE

  public selectedSquare: ISquare | null = null

  public moveHistory: string[] = []

  public render(): void {
    const HTMLBoard = document.querySelector('#board')
    HTMLBoard.innerHTML = ''
    this.squares.forEach((row: ISquare[], rowIndex) => {
      const HTMLRow = document.createElement('div')
      HTMLRow.setAttribute('id', `row${rowIndex}`)
      HTMLRow.setAttribute('class', `row`)
      HTMLBoard.appendChild(HTMLRow)
      row.forEach((square: ISquare) => {
        HTMLRow.innerHTML += square.piece
          ? `<div class="square" id="${square.name}" style="background-image: url(${square.piece.image});" ${
              square.piece.color === this.turn ? 'clickable' : ''
            }>${square.name}</div>`
          : `<div class="square" id="${square.name}">${square.name}</div>`
      })
    })
    this.listenToClicks()
  }

  public renderSquares(...squares: ISquare[]) {
    squares.forEach((square: ISquare) => {
      let squareCoordinates = this.getSquareCoordinates(square.name)
      this.squares[squareCoordinates.row][squareCoordinates.column] = square
      if (square.piece) document.getElementById(square.name).style.backgroundImage = `url(${square.piece.image})`
      else document.getElementById(square.name).removeAttribute('style')
    })
  }

  getSquareCoordinates(square: ISquare['name'] | ISquare): { row: number; column: number } {
    let rowIndex, columnIndex
    if (typeof square === 'string') {
      rowIndex = this.squares.indexOf(this.squares.find((row) => row[0].name[1] === square[1]))
      columnIndex = this.squares[rowIndex].indexOf(this.squares[rowIndex].find((_square) => _square.name === square))
    } else {
      rowIndex = this.squares.indexOf(this.squares.find((row) => row[0].name[1] === square.name[1]))
      columnIndex = this.squares[rowIndex].indexOf(this.squares[rowIndex].find((_square) => _square === square))
    }
    return { row: rowIndex, column: columnIndex }
  }

  getSquare(squareName: ISquare['name']): ISquare {
    const squareCoordinates = this.getSquareCoordinates(squareName)
    return this.squares[squareCoordinates.row][squareCoordinates.column]
  }

  public setSquareWithPawnsClickable(): void {
    this.squares.forEach((row: ISquare[]) => {
      row.forEach((square: ISquare) => {
        if (square.piece && square.piece.color === this.turn)
          document.getElementById(square.name).setAttribute('clickable', '')
      })
    })
  }

  public listenToClicks(): void {
    document.querySelectorAll('[clickable]').forEach((clickableElement) => {
      clickableElement.addEventListener('click', this.handleSquareClicked.bind(this))
    })
  }

  private handleSquareClicked(event: MouseEvent): void {
    console.log(this)
    document.querySelectorAll('[clickable]').forEach((element) => {
      element.removeAttribute('clickable')
      const elementWithountListeners = element.cloneNode(true)
      element.parentNode.replaceChild(elementWithountListeners, element)
    })
    document.querySelectorAll('.canGoToThisSquare').forEach((element) => element.classList.remove('canGoToThisSquare'))
    const squareName: ISquare['name'] = (event.target as any).id
    const square: ISquare = this.getSquare(squareName)
    if ((square.piece && this.selectedSquare === null) || (square.piece && square.piece?.color === this.turn)) {
      square.piece.showAvailableMoves(this, square)
      this.selectedSquare = square
    } else {
      this.selectedSquare.piece.move(this, this.selectedSquare, square)
      this.selectedSquare = null
    }
  }
}
