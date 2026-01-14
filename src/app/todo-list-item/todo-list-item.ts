import { Component, input } from '@angular/core';
import { Task } from '../types';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list-item',
  imports: [CdkDrag],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.css',
})
export class TodoListItem {
  task_info = input.required<Task>();
}
