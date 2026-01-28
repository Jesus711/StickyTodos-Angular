import { Component, signal, output } from '@angular/core';
import { StickyNote } from '../types';
import { form, FormField, required } from '@angular/forms/signals';
import { liveQuery } from 'dexie';
import { TodoService } from '../services/todo.service';
import { AsyncPipe, CommonModule } from '@angular/common';

interface StickyForm {
    id?: number,
    title: string,
    description: string,
    created_date: string,
    completed: boolean,
    completed_date: string | "",
    color: string,
    listID: string
}

@Component({
  selector: 'app-todo-form',
  imports: [FormField, AsyncPipe, CommonModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  closeModal = output();

  addTodo = output<StickyNote>();

  noteLists = liveQuery(() =>
      this.todoService.getAllLists())

  constructor(private todoService: TodoService) {}

  todoModel = signal<StickyForm>({
    title: "",
    description: "",
    created_date: new Date().toLocaleString(),
    completed: false,
    color: "sticky-yellow",
    completed_date: "",
    listID: "1"
  })

  todoForm = form(this.todoModel, (f) => {
    required(f.title);
    required(f.description);
    f.id;
    f.color;
    f.created_date;
    f.completed;
    f.listID;
  });

  updateColor(newColor: string) {
    this.todoForm.color().value.set(newColor);
  }

  onSubmit(event: Event) {
    event.preventDefault()
    console.log("HERE")

    if (this.todoForm().valid()){

      const current = this.todoModel()
      const modified: StickyNote = {
        ...current,
        listID: Number(current.listID)
      }

      this.addTodo.emit(modified);
      this.closeModal.emit()
    }
    else {
      console.log("ERROR")
    }


  }


}
