import { Injectable } from '@angular/core';
import { db } from "../db";
import { StickyNote } from '../types';


@Injectable({
  providedIn: 'root',
})
export class TodoService {

  getAllNotes() {
    return db.notes.toArray();
  }

  getNoteByID(noteID: number) {
    return db.notes.get(noteID);
  }

  async addNote(newNote: StickyNote) {
    await db.notes.add(newNote);
    return newNote.id;
  }

  deleteNote(noteID: number) {
    db.notes.delete(noteID)
    return noteID;
  }

  async updateNote(updatedNote: StickyNote) {
    let updated = await db.notes.upsert(updatedNote.id!, updatedNote);
    if (updated) {
      console.log("Note updated")
    }
    return updated;
  }  
}
