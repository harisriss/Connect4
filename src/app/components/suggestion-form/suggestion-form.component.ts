import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AddSuggestion} from "../../store/suggestion.actions";
import {SuggestionState} from "../../store/suggestion.state"
import {Observable} from 'rxjs';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.scss']
})
export class SuggestionFormComponent {

  @Select(SuggestionState.getSuggestionList) suggestionList$?: Observable<string[]>;

  newSuggestion = '';

  constructor(private readonly store: Store) {
  }

  onAddSuggestion(): void {
    if (this.newSuggestion.length > 0) {
      this.store.dispatch(new AddSuggestion(this.newSuggestion));
    }
    this.newSuggestion = '';
  }
}
