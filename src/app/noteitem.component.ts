import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { NoteListService } from './notelist.service';
import { NoteItem } from './noteitem';

@Component({
  selector: 'app-note-item',
  templateUrl: `./noteitem.component.html`,
  styleUrls: ['./noteitem.component.css']
})
export class NoteItemComponent implements OnInit {

  @Input() noteItem: NoteItem;
  @Output() updateItem = new EventEmitter<NoteItem>();
  @Output() deleteItem = new EventEmitter<NoteItem>();
  editable = false;

  ngOnInit(): void {
    // if this card was just created edit it immediately
    if (!this.noteItem.id) {
      this.makeEditable();
    }
  }

  makeEditable(): void {
    this.editable = true;
  }

  update(title: string, content: string): void {
    this.editable = false;

    this.noteItem.name = title;
    this.noteItem.content = content;
    this.updateItem.emit(this.noteItem);
  }

  confirmRemove(): void {
    this.deleteItem.emit(this.noteItem);
  }
}
