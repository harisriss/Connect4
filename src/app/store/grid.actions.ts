export class SetGrid {
  static readonly type = '[Grid] Set';

  constructor(public grid: number[][], public x: number, public y: number, public player: number) {
  }
}

// ACTIONS //

export class EmptyGrid {
  static readonly type = '[Grid] Empty';

  constructor() {
  }
}

export class SetCurrentPlayer {
  static readonly type = '[SetCurrentPlayer] Set';

  constructor(public currentPlayer: number) {
  }
}

export class SetIsFinished {
  static readonly type = '[SetIsFinished] Set';

  constructor(public isFinished: boolean) {
  }
}

export class SetWinner {
  static readonly type = '[SetWinner] Set';

  constructor(public winner: number) {
  }
}

export class SetNbMoves {
  static readonly type = '[SetNbMoves] Set';

  constructor(public nbMoves: number) {
  }
}

