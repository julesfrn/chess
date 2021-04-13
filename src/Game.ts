import Board from './Board'

export default class Game {
  constructor(private board: Board) {}
  
  public play(): void {
    this.board.render()
  }
}
