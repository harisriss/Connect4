import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Position} from "../../models/position";
import * as confetti from 'canvas-confetti';
import {Select, Store} from "@ngxs/store";
import {Observable, Subscription} from "rxjs";
import {GridState, GridStateModel} from "../../store/grid.state";
import {EmptyGrid, SetCurrentPlayer, SetGrid, SetIsFinished, SetNbMoves, SetWinner} from "../../store/grid.actions";

const MAX_MOVES = 42;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // detects state changes
})
export class GridComponent implements OnInit, OnDestroy {

  @Select(GridState) game: Observable<GridStateModel> | undefined;
  _state: any;
  storeSub: Subscription | undefined; // allow the subscription to state modification

  canvas: HTMLCanvasElement | undefined;
  clicked = false;

  constructor(
    private store: Store,
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  // Getters
  get grid(): number[][] {
    return this._state.grid;
  }

  get currentPlayer(): number {
    return this._state.currentPlayer;
  }

  get isFinished(): boolean {
    return this._state.isFinished;
  }

  get getWinner(): number {
    return this._state.winner;
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

  /**
   * return the number of the column clicked
   *
   * @param column column clicked
   */
  cellClick(column: number): void {
    if (!this.isFinished) {
      const emptyCell = this.getFirstEmptyCell(column);
      this.setCell(emptyCell.line, emptyCell.column, this.currentPlayer);
    }
  }

  get getNbMove(): number {
    return this._state.nbMoves;
  }

  /**
   * verify if they are 4 pieces connected
   * @param player
   */
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

  ngOnInit(): void {
    this._state = {
      grid: [],
      currentPlayer: 1,
      isFinished: false,
      winner: 0,
      nbMoves: 0
    }

    // @ts-ignore
    this.storeSub = this.game.subscribe((state: any) => { // state modification subscription
      this._state = {...state};
    });

    this.newGame();
  }

  ngOnDestroy() {
    this.storeSub?.unsubscribe();
  }


  /**
   * define a cell with the current player number
   *
   * @param line number of the line
   * @param column number of the column
   * @param player number of the player
   */
  setCell(line: number, column: number, player: number): void {
    if (line !== -1 || column !== -1) {
      this.setGrid(this.grid, line, column, player);  // set the cell(line, column) with the player number
      if (this.is4Connected(this.currentPlayer)) {    // check if it is a win
        this.win(this.currentPlayer);
      } else {
        this.nextPlayer();
      }
    }
  }

  /**
   * set the next player and check if there is a tie
   */
  nextPlayer(): void {
    this.setCurrentPlayer(this.currentPlayer === 1 ? 2 : 1);
    if (this.getNbMove == MAX_MOVES - 1) {
      this.win(3);
    } else {
      this.setNbMoves(this.getNbMove + 1)
    }
  }

  /**
   * check if current player win
   *
   * @param player current player
   */
  win(player: number): void {
    this.setIsFinished(true);
    this.setWinner(player);
    if (player !== 3) {
      this.surprise()
    }
  }

  /**
   * set a new game
   */
  newGame(): void {
    this.emptyGrid();
    this.setCurrentPlayer(1);
    this.setIsFinished(false);
    this.setWinner(0);
    this.setNbMoves(0);

    this.clicked = false;
  }

  /**
   * display confettis if a player win
   */
  public surprise(): void {
    this.canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, this.canvas);

    let options = {
      particleCount: 300,
      startVelocity: 75,
      gravity: 4,
      origin: {
        x: 0.5,
        y: 1
      },
      angle: 90,
      spread: 150
    }
    if (this.canvas) {
      const myConfetti = confetti.create(this.canvas, {resize: true});
      myConfetti(options);

      this.clicked = true;

      setTimeout(() => {
        this.renderer2.removeChild(this.elementRef.nativeElement, this.canvas);
      }, 700 * 5);
    }
  }

  // Setters :  launch action defined in grid.actions.ts

  setGrid(grid: number[][], x: number, y: number, player: number) {
    this.store.dispatch(new SetGrid(grid, x, y, player));
  }

  emptyGrid() {
    this.store.dispatch(new EmptyGrid());
  }

  setCurrentPlayer(value: number) {
    this.store.dispatch(new SetCurrentPlayer(value));
  }

  setIsFinished(value: boolean) {
    this.store.dispatch(new SetIsFinished(value));
  }

  setWinner(value: number) {
    this.store.dispatch(new SetWinner(value));
  }

  setNbMoves(value: number) {
    this.store.dispatch(new SetNbMoves(value));
  }

}
