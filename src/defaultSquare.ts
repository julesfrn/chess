import Pawn from './pieces/Pawn'
import Rook from './pieces/Rook'
import Bishop from './pieces/Bishop'
import Knight from './pieces/Knight'
import Queen from './pieces/Queen'
import King from './pieces/King'
import { color } from './pieces/Piece'

export default [
  [
    { piece: new Rook(color.BLACK), name: 'a8' },
    { piece: new Knight(color.BLACK), name: 'b8' },
    { piece: new Bishop(color.BLACK), name: 'c8' },
    { piece: new Queen(color.BLACK), name: 'd8' },
    { piece: new King(color.BLACK), name: 'e8' },
    { piece: new Bishop(color.BLACK), name: 'f8' },
    { piece: new Knight(color.BLACK), name: 'g8' },
    { piece: new Rook(color.BLACK), name: 'h8' },
  ],
  [
    { piece: new Pawn(color.BLACK), name: 'a7' },
    { piece: new Pawn(color.BLACK), name: 'b7' },
    { piece: new Pawn(color.BLACK), name: 'c7' },
    { piece: new Pawn(color.BLACK), name: 'd7' },
    { piece: new Pawn(color.BLACK), name: 'e7' },
    { piece: new Pawn(color.BLACK), name: 'f7' },
    { piece: new Pawn(color.BLACK), name: 'g7' },
    { piece: new Pawn(color.BLACK), name: 'h7' },
  ],
  [
    { piece: null, name: 'a6' },
    { piece: null, name: 'b6' },
    { piece: null, name: 'c6' },
    { piece: null, name: 'd6' },
    { piece: null, name: 'e6' },
    { piece: null, name: 'f6' },
    { piece: null, name: 'g6' },
    { piece: null, name: 'h6' },
  ],
  [
    { piece: null, name: 'a5' },
    { piece: null, name: 'b5' },
    { piece: null, name: 'c5' },
    { piece: null, name: 'd5' },
    { piece: null, name: 'e5' },
    { piece: null, name: 'f5' },
    { piece: null, name: 'g5' },
    { piece: null, name: 'h5' },
  ],
  [
    { piece: null, name: 'a4' },
    { piece: null, name: 'b4' },
    { piece: null, name: 'c4' },
    { piece: null, name: 'd4' },
    { piece: null, name: 'e4' },
    { piece: null, name: 'f4' },
    { piece: null, name: 'g4' },
    { piece: null, name: 'h4' },
  ],
  [
    { piece: null, name: 'a3' },
    { piece: null, name: 'b3' },
    { piece: null, name: 'c3' },
    { piece: null, name: 'd3' },
    { piece: null, name: 'e3' },
    { piece: null, name: 'f3' },
    { piece: null, name: 'g3' },
    { piece: null, name: 'h3' },
  ],
  [
    { piece: new Pawn(color.WHITE), name: 'a2' },
    { piece: new Pawn(color.WHITE), name: 'b2' },
    { piece: new Pawn(color.WHITE), name: 'c2' },
    { piece: new Pawn(color.WHITE), name: 'd2' },
    { piece: new Pawn(color.WHITE), name: 'e2' },
    { piece: new Pawn(color.WHITE), name: 'f2' },
    { piece: new Pawn(color.WHITE), name: 'g2' },
    { piece: new Pawn(color.WHITE), name: 'h2' },
  ],
  [
    { piece: new Rook(color.WHITE), name: 'a1' },
    { piece: new Knight(color.WHITE), name: 'b1' },
    { piece: new Bishop(color.WHITE), name: 'c1' },
    { piece: new Queen(color.WHITE), name: 'd1' },
    { piece: new King(color.WHITE), name: 'e1' },
    { piece: new Bishop(color.WHITE), name: 'f1' },
    { piece: new Knight(color.WHITE), name: 'g1' },
    { piece: new Rook(color.WHITE), name: 'h1' },
  ],
]
