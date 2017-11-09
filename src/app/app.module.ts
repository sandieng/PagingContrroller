import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaginationComponent } from './version1/paging.component';
import { RandomListComponent } from './list/radom-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    RandomListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
