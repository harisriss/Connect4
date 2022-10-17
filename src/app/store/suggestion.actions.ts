export class AddSuggestion {
  static readonly type = '[Suggestion] Add';

  constructor(public newSuggestion: string) {
  }
}

// ACTIONS //

export class EmptySuggestion {
  static readonly type = '[Suggestion] Empty';
}
