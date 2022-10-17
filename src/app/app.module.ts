import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GridComponent} from './components/grid/grid.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CellComponent} from './components/cell/cell.component';
import {MatButtonModule} from "@angular/material/button";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {SuggestionFormComponent} from "./components/suggestion-form/suggestion-form.component";
import {SuggestionState} from "./store/suggestion.state";
import {FormsModule} from '@angular/forms';
import {NgxsModule} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellComponent,
    ToolbarComponent,
    SuggestionFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    NgxsModule.forRoot([SuggestionState], {
      developmentMode: !environment.production

    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
