import {Component, OnInit} from '@angular/core';
import {Position} from "../../models/position";

const MAX_MOVES = 42;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  grid: number[][] = [];
  currentPlayer = 1;
  isFinished = false;
  winner = 0;
  nbMoves = 0;


  constructor() {
  }

  ngOnInit(): void {
    this.newGame();
  }


  setCell(line: number, column: number, player: number): void {
    if (line !== -1 || column !== -1) {
      this.grid[line][column] = player;
      if (this.is4Connected(this.currentPlayer)) {
        this.win(this.currentPlayer);
      } else {
        this.nextPlayer();
      }
    }
  }

  nextPlayer(): void {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    if (this.nbMoves == MAX_MOVES - 1) {
      this.win(3);
    } else {
      this.nbMoves++;
    }
  }

  getFirstEmptyCell(columnNumber: number): Position {
    const columns: number[] = [];
    for (let line = (this.grid.length - 1); line >= 0; line--) {
      columns.push(this.grid[line][columnNumber]);
    }

    for (const [index, column] of columns.entries()) {
      if (column === 0) {
        const finalRowPos = (columns.length - 1) - index;
        return {line: finalRowPos, column: columnNumber};
      }
    }
    return {line: -1, column: -1};
  }

  cellClick(column: number): void {
    if (!this.isFinished) {
      const emptyCell = this.getFirstEmptyCell(column);
      this.setCell(emptyCell.line, emptyCell.column, this.currentPlayer);
    }
  }

  win(player: number): void {
    this.isFinished = true;
    this.winner = player;
  }

  is4Connected(player: number): boolean {
    // horizontalCheck
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length - 3; j++) {
        if (this.grid[i][j] === player && this.grid[i][j + 1] === player && this.grid[i][j + 2] === player && this.grid[i][j + 3] === player) {
          return true;
        }
      }
    }

    // verticalCheck
    for (let i = 0; i < this.grid.length - 3; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j] === player && this.grid[i + 1][j] === player && this.grid[i + 2][j] === player && this.grid[i + 3][j] === player) {
          return true;
        }
      }
    }

    // ascendingDiagonalCheck
    for (let i = 3; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length - 3; j++) {
        if (this.grid[i][j] === player && this.grid[i - 1][j + 1] === player && this.grid[i - 2][j + 2] === player && this.grid[i - 3][j + 3] === player)
          return true;
      }
    }

    // descendingDiagonalCheck
    for (let i = 3; i < this.grid.length; i++) {
      for (let j = 3; j < this.grid[0].length; j++) {
        if (this.grid[i][j] === player && this.grid[i - 1][j - 1] === player && this.grid[i - 2][j - 2] === player && this.grid[i - 3][j - 3] === player)
          return true;
      }
    }

    return false;
  }

  newGame(): void {
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    this.currentPlayer = 1;
    this.isFinished = false;
    this.winner = 0;
    this.nbMoves = 0;
  }
}
