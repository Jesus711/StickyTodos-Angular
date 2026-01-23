import { Component, input, output } from '@angular/core';
import { StickyNote } from '../types';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  note_info = input.required<StickyNote>()

  delete = output<{noteID: number, listID: number}>();

  update = output<number>();

  deleteNote(noteID: number, listID: number) {
    this.delete.emit({
      noteID: noteID,
      listID: listID
    });
  }

}
