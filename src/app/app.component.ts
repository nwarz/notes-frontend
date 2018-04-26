import { Component, OnInit } from '@angular/core';

import { NoteListService } from './notelist.service';
import { NoteList } from './notelist';
import { NoteListComponent } from './notelist.component';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="addList()">add list</button>
    <div *ngFor="let noteList of noteLists">
      <app-note-list [noteList]='noteList' (deleteList)="onDeleteList($event)"></app-note-list>
    </div>
  `,
  styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif;
    }
  `]
})
export class AppComponent implements OnInit {

  noteLists: NoteList[];

  constructor(private noteListService: NoteListService) { }

  ngOnInit(): void {
    this.getNoteLists();
  }

  getNoteLists(): void {
    this.noteListService.getNoteLists()
      .subscribe(noteLists => this.noteLists = noteLists);
  }

  addList(): void {
    this.noteLists.push(new NoteList());
  }

  onDeleteList(noteList: NoteList): void {
    this.noteLists = this.noteLists.filter(list => list !== noteList);

    if (noteList.id) {
      this.noteListService.deleteList(noteList);
    }
  }

}
