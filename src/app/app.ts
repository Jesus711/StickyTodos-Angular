import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './todo/todo';
import { StickyNote } from './types';
import { TodoListItem } from "./todo-list-item/todo-list-item";
import { CdkDrag, CdkDropList, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TodoForm } from './todo-form/todo-form';

@Component({
  selector: 'app-root',
  imports: [Todo, RouterOutlet, TodoListItem, CdkDrag, CdkDropList,TodoForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  protected readonly title = signal('todo-app');

  view_mode: "grid" | "list" = 'grid';

  showNoteModal: boolean = false;

  setViewMode(mode: "grid" | "list") {
    this.view_mode = mode;
  }


  todos: StickyNote[] = [{
    id: 2,
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-yellow"
  },{
    id: 3,
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-purple"
  },{
    id: 4,
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-green"
  },{
    id: 5,
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-blue"
  }];


  // drop(event: CdkDragDrop<StickyNote[]>) {
  //   moveItemInArray(this.todos, event.previousIndex, event.currentIndex)
  // }

  deleteSticky(id: number) {
    this.todos = this.todos.filter((item) => item.id != id);
    return id;
  }

  updateCompleteStatus(id: number) {
    this.todos = this.todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo)
  }

  createNewSticky(newTodo: StickyNote) {
    this.todos.push(newTodo);
  }

  toggleNoteModal(): void {
    this.showNoteModal = !this.showNoteModal;
  }

}
