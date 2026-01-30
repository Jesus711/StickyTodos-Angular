import { Component, input, output} from '@angular/core';
import { NoteList } from '../types';
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';
import { TodoFilterService } from '../services/todo-filter.service';

@Component({
  selector: 'app-sidebar-list',
  imports: [CommonModule],
  templateUrl: './sidebar-list.html',
  styleUrl: './sidebar-list.css',
})
export class SidebarList {
  list = input.required<NoteList>();

  setList = output<{listID: number, listTitle: string}>();

  toggleModal = false;

  constructor(private todoService: TodoService, private todoFilterService: TodoFilterService) {
  }

  openDeleteModal() {
    if (this.list().protected){
      console.log("Can't DELETE THIS ONE")
      return;
    }
    this.toggleModal = true;
  }

  deleteList(confirmed: boolean) {
    if(confirmed){
      this.todoService.deleteList(this.list().id!)
      console.log("DELETED")
    }
    this.toggleModal = false;
  }

  isListActive() {
    return this.list().id! === this.todoFilterService.listID();
  }

  updateList() {
    this.todoFilterService.setListID(this.list().id!, this.list().title);
  }

}
