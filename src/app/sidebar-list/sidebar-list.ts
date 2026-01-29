import { Component, input, output} from '@angular/core';
import { NoteList } from '../types';
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';

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

  constructor(private todoService: TodoService) {
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

  updateList() {
    this.setList.emit({listID: this.list().id!, listTitle: this.list().title});
  }

}
