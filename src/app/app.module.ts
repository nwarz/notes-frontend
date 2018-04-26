import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NoteListService } from './notelist.service';
import { NoteListComponent } from './notelist.component';
import { NoteItemComponent } from './noteitem.component';


@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [NoteListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
