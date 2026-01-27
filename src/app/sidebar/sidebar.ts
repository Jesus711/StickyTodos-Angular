import { Component, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteList } from '../types';
import { liveQuery } from 'dexie';
import { TodoService } from '../services/todo.service';
import { SidebarList } from '../sidebar-list/sidebar-list';
import { FormField, form, minLength, required} from '@angular/forms/signals';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SidebarList, FormField],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  display = input.required<boolean>();

  noteLists = liveQuery(() =>
    this.todoService.getAllLists())

  closeSidebar = output();

  showListForm = false;

  errorMessage = signal<string | null>(null);

  listModel = signal<NoteList>({
    title: "",
    protected: false,
    noteCount: 0
  })

  listForm = form(this.listModel, (f) => {
    required(f.title);
    minLength(f.title, 3, {message: "Must be at least 3 characters long"});
    f.protected;
    f.noteCount;
  })


  constructor(private todoService: TodoService) {}

  onSubmit(event: Event) {
    event.preventDefault()
    if (this.listForm().valid()) {
      console.log("VALID FORM PROCEEDING!!!")
      this.todoService.addList(this.listModel()).then(() => {
        this.clearName()
        this.toggleListForm()
        console.log("SUCCESS")
      }).catch(error => {
        if(error.name === "ConstraintError") {
          this.errorMessage.set(`'${this.listForm.title().value()}' list already exists!`)
        }
        else {
          console.log(error)
        }
      })
    }
  }

  clearName() {
    if(this.listForm.title().value() === ""){
      return;
    }
    this.listModel.set({
    title: "",
    protected: false,
    noteCount: 0
    })
  }

  toggleListForm() {
    this.showListForm = !this.showListForm;
  }

}
