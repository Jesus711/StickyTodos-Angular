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

  todoModel = signal<StickyNote>({
    id: 0,
    title: "",
    description: "",
    created_date: new Date(),
    completed: false,
    color: "sticky-yellow"
  })

  todoForm = form(this.todoModel, (f) => {
    required(f.title);
    required(f.description);
    f.id;
    f.color;
    f.created_date;
    f.completed;
  });

  createTodo = output<StickyNote>();

  updateColor(newColor: string) {
    this.todoForm.color().value.set(newColor);
  }

  onSubmit(event: Event) {
    event.preventDefault()
    console.log("HELLO")
  }


}
