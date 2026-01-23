import { Component, input } from '@angular/core';
import { NoteList } from '../types';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-sidebar-list',
  imports: [],
  templateUrl: './sidebar-list.html',
  styleUrl: './sidebar-list.css',
})
export class SidebarList {
  list = input.required<NoteList>();


  constructor(private todoService: TodoService) {
  }

}
