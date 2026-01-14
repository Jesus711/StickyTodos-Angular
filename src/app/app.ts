import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './todo/todo';
import { Task } from './types';
import { TodoListItem } from "./todo-list-item/todo-list-item";

@Component({
  selector: 'app-root',
  imports: [Todo, RouterOutlet, TodoListItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  protected readonly title = signal('todo-app');

  view_mode: "grid" | "list" = 'grid';

  setViewMode(mode: "grid" | "list") {
    this.view_mode = mode;
  }

  todos: Task[] = [{
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-yellow"
  },{
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-purple"
  },{
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-green"
  },{
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-blue"
  },{
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-orange"
  },{
    title: "Hello World",
    description: "Do this",
    completed: false,
    created_date: new Date(),
    color: "sticky-pink"
  }];



}
