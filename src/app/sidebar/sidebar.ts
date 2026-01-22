import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteList } from '../types';
import { liveQuery } from 'dexie';
import { TodoService } from '../services/todo.service';
import { SidebarList } from '../sidebar-list/sidebar-list';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SidebarList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  display = input.required<boolean>();

  noteLists = liveQuery(() => this.todoService.getAllLists())

  closeSidebar = output();

  constructor(private todoService: TodoService) {}

  displayLists() {
  }


}
