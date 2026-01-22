import { Component, input, signal, output, ChangeDetectorRef, inject } from '@angular/core';
import { StickyNote } from '../types';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-todo-form',
  imports: [FormField],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  closeModal = output();

  addTodo = output<StickyNote>();

  todoModel = signal<StickyNote>({
    title: "",
    description: "",
    created_date: new Date().toLocaleString(),
    completed: false,
    color: "sticky-yellow",
    completed_date: "",
    listID: 1
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
      this.addTodo.emit(this.todoModel());
      this.closeModal.emit()
    }
    else {
      console.log("ERROR")
    }


  }


}
