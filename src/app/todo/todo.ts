import { Component, input, output } from '@angular/core';
import { StickyNote } from '../types';
import { CdkDrag, CdkDragPreview } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [CdkDrag, CdkDragPreview, CommonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  note_info = input.required<StickyNote>()

  delete = output<number>();

  update = output<number>();

}
