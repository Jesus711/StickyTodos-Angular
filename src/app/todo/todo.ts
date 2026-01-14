import { Component, input } from '@angular/core';
import { Task } from '../types';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  imports: [CdkDrag],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  task_info = input.required<Task>()
}
