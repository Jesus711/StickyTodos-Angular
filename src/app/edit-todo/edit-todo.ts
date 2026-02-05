import { Component, signal, output, input, effect } from '@angular/core';
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
    listID: string,
    prevList: string,
}

@Component({
  selector: 'app-edit-todo',
  imports: [FormField, AsyncPipe, CommonModule],
  templateUrl: './edit-todo.html',
  styleUrl: './edit-todo.css',
})

export class EditTodo {
  closeModal = output();

  addTodo = output<StickyNote>();

  note = input.required<StickyNote>()

  noteLists = liveQuery(() =>
      this.todoService.getAllLists())

  constructor(private todoService: TodoService) {
    effect(() => {
      const currentNote = this.note;
      if (currentNote !== undefined) {
        this.todoModel.set({
          id: currentNote().id,
          title: currentNote().title,
          description: currentNote().description,
          created_date: currentNote().created_date,
          completed: currentNote().completed,
          color: currentNote().color,
          completed_date: currentNote().completed_date, 
          listID: String(currentNote().listID),
          prevList: String(currentNote().listID)
        })
      }
    })
  }

  todoModel = signal<StickyForm>({
    title: "",
    description: "",
    created_date: new Date().toLocaleString(),
    completed: false,
    color: "sticky-yellow",
    completed_date: "",
    listID: "1",
    prevList: "1"
  })

  todoForm = form(this.todoModel, (f) => {
    required(f.title);
    required(f.description);
    f.id;
    f.color;
    f.created_date;
    f.completed;
    f.listID;
    f.prevList;
  });

  updateColor(newColor: string) {
    this.todoForm.color().value.set(newColor);
  }

  onSubmit(event: Event) {
    event.preventDefault()

    if (this.todoForm().valid()){

      const current = this.todoModel()
      const modified: StickyNote = {
        ...current,
        id: current.id!,
        listID: Number(current.listID),
      }

      this.todoService.updateNote(modified, Number(current.prevList), modified.listID);
      this.closeModal.emit()
    }
    else {
      console.log("ERROR")
    }
  }
}
