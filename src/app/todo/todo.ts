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

  delete = output<number>();

  update = output<number>();

}
