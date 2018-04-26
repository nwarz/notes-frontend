import { Component, Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { NoteList } from './notelist';
import { NoteItem } from './noteitem';
import { NoteListService } from './notelist.service';

@Component({
  selector: 'app-note-list',
  templateUrl: `./notelist.component.html`,
  styleUrls: ['./notelist.component.css']
})
export class NoteListComponent implements OnInit {

  @Input() noteList: NoteList;
  @Output() deleteList = new EventEmitter<NoteList>();
  editable = false;

  constructor(private restService: NoteListService) { }

  ngOnInit(): void {
    if (!this.noteList.id) {
      this.makeEditable();
    }
  }


  // make items orderable (up and down buttons per item)

  makeEditable(): void {
    this.editable = true;
  }

  update(title: string): void {
    this.editable = false;

    this.noteList.name = title;
    this.restService.updateList(this.noteList);
  }

  addItem(): void {
    if (!this.noteList.noteItems) {
      this.noteList.noteItems = [];
    }
    this.noteList.noteItems.push(new NoteItem());
  }

  remove(): void {
    this.deleteList.emit(this.noteList);
  }


  onUpdateItem(noteItem: NoteItem): void {
    // only update if the list is already persisted
    if (this.noteList.id) {
      this.restService.updateItem(this.noteList.id, noteItem);
    }
  }

  onDeleteItem(noteItem: NoteItem): void {
    this.noteList.noteItems = this.noteList.noteItems.filter(listItem => listItem !== noteItem);

    // only send delete request if item is persisted
    if (noteItem.id) {
      this.restService.deleteItem(this.noteList.id, noteItem);
    }
  }
}
