import { Component, input, output } from '@angular/core';
import { StickyNote } from '../types';
import { CommonModule } from "@angular/common";
import { TodoService } from '../services/todo.service';
import { EditTodo } from '../edit-todo/edit-todo';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, EditTodo],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  note_info = input.required<StickyNote>()

  delete = output<{noteID: number, listID: number}>();

  update = output<number>();

  showEditMenu = false;
  showEditForm = false;

  constructor(private todoService: TodoService) {

  }

  deleteNote() {
    this.todoService.deleteNote(this.note_info().id!, this.note_info().listID)
    this.showEditMenu = false;
  }


  async updateCompleteStatus() {
    try {
      let currentNote = await this.todoService.getNoteByID(this.note_info().id!)
      if(currentNote !== undefined) {
        await this.todoService.updateNoteStatus({...currentNote, completed: !currentNote.completed});
      }
      else {
        throw new Error("Note does not exist with that ID")
      }
    } catch (error) {
      console.log("error occurred when trying to update")
    }
  }

  async updateNote() {
    const updated = await this.todoService.updateNoteStatus(this.note_info());
    return updated;
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm
  }

  toggleEditMenu() {
    this.showEditMenu = !this.showEditMenu
  }

}
