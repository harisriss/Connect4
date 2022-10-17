export class AddSuggestion {
  static readonly type = '[Suggestion] Add';

  constructor(public newSuggestion: string) {
  }
}

export class EmptySuggestion {
  static readonly type = '[Suggestion] Empty';
}
