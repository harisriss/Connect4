import {Action, Selector, State, StateContext} from '@ngxs/store';
import {EmptyGrid, SetCurrentPlayer, SetGrid, SetIsFinished, SetNbMoves, SetWinner} from "./grid.actions";

const GRID = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

export interface GridStateModel {
  grid: number[][];
  currentPlayer: number;
  isFinished: boolean;
  winner: number;
  nbMoves: number;
}

@State<GridStateModel>({
  name: 'grid',
  defaults: {
    grid: GRID,
    currentPlayer: 1,
    isFinished: false,
    winner: 0,
    nbMoves: 0
  }
})

export class GridState {

  // Selectors

  @Selector()
  static getGrid(state: GridStateModel): number[][] {
    return state.grid;
  }

  @Selector()
  static getCurrentPlayer(state: GridStateModel): number {
    return state.currentPlayer;
  }

  @Selector()
  static isFinished(state: GridStateModel): boolean {
    return state.isFinished;
  }

  @Selector()
  static getWinner(state: GridStateModel): number {
    return state.winner;
  }

  @Selector()
  static getNbMoves(state: GridStateModel): number {
    return state.nbMoves;
  }

  // Actions
  @Action(SetGrid)
  updateGrid({patchState, getState}: StateContext<GridStateModel>, {grid, x, y, player}: SetGrid): void {
    let newGrid: number[][] = [];
    for (let i = 0; i < grid.length; i++) {
      newGrid.push([]);
      for (let j = 0; j < grid[i].length; j++) {
        if (j == y && i == x) {
          newGrid[i].push(player);
        } else {
          newGrid[i].push(grid[i][j]);
        }
      }
    }

    patchState({grid: newGrid});
  }

  @Action(EmptyGrid)
  emptyGrid({patchState, getState}: StateContext<GridStateModel>, {}: EmptyGrid): void {
    patchState({grid: GRID});
  }

  @Action(SetCurrentPlayer)
  setCurrentPlayer({patchState, getState}: StateContext<GridStateModel>, {currentPlayer}: SetCurrentPlayer): void {
    patchState({currentPlayer});
  }

  @Action(SetIsFinished)
  setIsFinished({patchState, getState}: StateContext<GridStateModel>, {isFinished}: SetIsFinished): void {
    patchState({isFinished});
  }

  @Action(SetWinner)
  setWinner({patchState, getState}: StateContext<GridStateModel>, {winner}: SetWinner): void {
    patchState({winner});
  }

  @Action(SetNbMoves)
  setNbMoves({patchState, getState}: StateContext<GridStateModel>, {nbMoves}: SetNbMoves): void {
    patchState({nbMoves});
  }

}
