import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './todo/todo';
import { StickyNote, NoteUpdateEvent } from './types';
import { TodoListItem } from "./todo-list-item/todo-list-item";
import { CdkDrag, CdkDropList, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TodoForm } from './todo-form/todo-form';
import { TodoService } from './services/todo.service';
import { liveQuery } from 'dexie';
import { AsyncPipe, NgClass } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { BehaviorSubject, combineLatest} from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Todo, TodoListItem, TodoForm, AsyncPipe, NgClass, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  listFilter$ = new BehaviorSubject<number>(-1);

  allTodos$ = liveQuery(() => this.todoService.getAllNotes())

  todos$ = combineLatest([
    this.allTodos$, 
    this.listFilter$
  ]).pipe(
    map(([todos, listID]) => listID === -1 ? todos : todos.filter(t => t.listID === listID))
  );


  view_mode: "grid" | "list" = 'grid';

  currentlyViewing = "All Notes"

  constructor(private todoService: TodoService) {
    const prevView = window.localStorage.getItem("view-mode")
    if (prevView !== null && (prevView === "grid" || prevView === "list")) {
      this.setViewMode(prevView)
    }
  }

  deleteALL() {
    this.todoService.deleteTables();
    console.log("DB RESET!!!!")
  }

  showNoteModal: boolean = false;
  showSideBar: boolean = false;

  setViewMode(mode: "grid" | "list") {
    this.view_mode = mode;
    window.localStorage.setItem("view-mode", mode);
  }

  // drop(event: CdkDragDrop<StickyNote[]>) {
  //   moveItemInArray(this.todos, event.previousIndex, event.currentIndex)
  // }

  deleteSticky(event: NoteUpdateEvent) {
    try {
      this.todoService.deleteNote(event.noteID, event.listID);
      return event.noteID;
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
    } catch (error) {
      console.log("Error occurend when trying to add new note!")
    }

  }

  toggleNoteModal(): void {
    this.showNoteModal = !this.showNoteModal;
  }

  toggleSideBar(): void {
    this.showSideBar = !this.showSideBar;
  }

  viewListNotes({listID, listTitle}:{listID: number, listTitle: string} ) {
    if (listID === -1) {
      this.currentlyViewing = `All Notes`
    }
    else {
      this.currentlyViewing = `${listTitle} Notes`

    }
    this.listFilter$.next(listID);
  }

}
