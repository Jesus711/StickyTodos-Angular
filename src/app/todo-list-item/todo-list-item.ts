import { Component, input } from '@angular/core';
import { StickyNote } from '../types';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list-item',
  imports: [CdkDrag],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.css',
})
export class TodoListItem {
  note_info = input.required<StickyNote>();
}
