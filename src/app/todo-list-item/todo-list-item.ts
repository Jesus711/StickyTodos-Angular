import { Component, input, output } from '@angular/core';
import { StickyNote } from '../types';

@Component({
  selector: 'app-todo-list-item',
  imports: [],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.css',
})
export class TodoListItem {
  note_info = input.required<StickyNote>();

  delete = output<{noteID: number, listID: number}>();
  
  update = output<number>()

  deleteNote(noteID: number, listID: number) {
    this.delete.emit({
      noteID: noteID,
      listID: listID
    });
  }
}
