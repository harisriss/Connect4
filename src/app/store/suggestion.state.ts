import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AddSuggestion, EmptySuggestion} from './suggestion.actions';

export interface SuggestionStateModel {
  suggestionList: string[];
}

@State<SuggestionStateModel>({
  name: 'suggestion',
  defaults: {
    suggestionList: [],
  }
})
export class SuggestionState {

  @Selector()
  static getSuggestionList(state: SuggestionStateModel): string[] {
    return state.suggestionList;
  }

  @Action(AddSuggestion)
  addSuggestion({patchState, getState}: StateContext<SuggestionStateModel>, {newSuggestion}: AddSuggestion): void {
    patchState({suggestionList: [...getState().suggestionList, newSuggestion]});
  }

  @Action(EmptySuggestion)
  emptySuggestion({patchState}: StateContext<SuggestionStateModel>): void {
    patchState({suggestionList: []});
  }
}
