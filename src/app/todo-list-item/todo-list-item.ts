import { Component, input, output } from '@angular/core';
import { StickyNote } from '../types';
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list-item',
  imports: [CommonModule],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.css',
})
export class TodoListItem {
  note_info = input.required<StickyNote>();

  delete = output<{noteID: number, listID: number}>();
  
  update = output<number>()

  constructor(private todoService: TodoService) {

  }

  deleteNote() {
    this.todoService.deleteNote(this.note_info().id!, this.note_info().listID)
    //this.showEditMenu = false;
  }


  async updateCompleteStatus() {
    try {
      let currentNote = await this.todoService.getNoteByID(this.note_info().id!)
      if(currentNote !== undefined) {
        await this.todoService.updateNote({...currentNote, completed: !currentNote.completed});
      }
      else {
        throw new Error("Note does not exist with that ID")
      }
    } catch (error) {
      console.log("error occurred when trying to update")
    }
  }

  async updateNote() {
    const updated = await this.todoService.updateNote(this.note_info());
    return updated;
  }
}
