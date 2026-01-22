import { Component, input } from '@angular/core';
import { NoteList, StickyNote } from '../types';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-sidebar-list',
  imports: [],
  templateUrl: './sidebar-list.html',
  styleUrl: './sidebar-list.css',
})
export class SidebarList {
  list = input.required<NoteList>();

  listNotes: StickyNote[] = []

  constructor(private todoService: TodoService) {
    this.getListNotes()
  }

  async getListNotes() {

    if(this.list() === undefined) {
      return
    }

    this.listNotes = await this.todoService.getNotesByList(this.list().id!)
  }

}
