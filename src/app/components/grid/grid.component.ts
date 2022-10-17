import {Component, OnInit} from '@angular/core';
import {Position} from "../../models/position";

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

  constructor() {
  }

  ngOnInit(): void {
    this.newGame();
  }

  setCell(line: number, column: number, player: number): void {
    if (line !== -1 || column !== -1) {
      this.grid[line][column] = player;
      this.nextPlayer();
    }
  }

  nextPlayer(): void {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
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
    const emptyCell = this.getFirstEmptyCell(column);
    this.setCell(emptyCell.line, emptyCell.column, this.currentPlayer);
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
  }
}
