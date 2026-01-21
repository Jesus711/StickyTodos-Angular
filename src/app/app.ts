import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './todo/todo';
import { StickyNote } from './types';
import { TodoListItem } from "./todo-list-item/todo-list-item";
import { CdkDrag, CdkDropList, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TodoForm } from './todo-form/todo-form';
import { TodoService } from './services/todo.service';
import { liveQuery } from 'dexie';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Todo, TodoListItem, TodoForm, AsyncPipe, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {

  todos = liveQuery(() => this.todoService.getAllNotes())
  view_mode: "grid" | "list" = 'grid';

  constructor(private todoService: TodoService) {
    const prevView = window.localStorage.getItem("view-mode")
    if (prevView !== null && (prevView === "grid" || prevView === "list")) {
      this.setViewMode(prevView)
    }
  }

  showNoteModal: boolean = false;

  setViewMode(mode: "grid" | "list") {
    this.view_mode = mode;
    window.localStorage.setItem("view-mode", mode);
  }

  // drop(event: CdkDragDrop<StickyNote[]>) {
  //   moveItemInArray(this.todos, event.previousIndex, event.currentIndex)
  // }

  deleteSticky(id: number) {
    try {
      this.todoService.deleteNote(id);
      return id;
    } catch (error) {
      console.log("Error when trying to delete")
      return -1;
    }
  }

  async updateCompleteStatus(id: number) {
    try {
      let currentNote = await this.todoService.getNoteByID(id)
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

  async updateNote(updatedNote: StickyNote) {
    const updated = await this.todoService.updateNote(updatedNote);
    return updated;
  }

  async createNewSticky(newTodo: StickyNote) {
    try {
      await this.todoService.addNote(newTodo);
      console.log(this.todos.getValue)
    } catch (error) {
      console.log("Error occurend when trying to add new note!")
    }

  }

  toggleNoteModal(): void {
    this.showNoteModal = !this.showNoteModal;
  }

}
