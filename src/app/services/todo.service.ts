import { Injectable } from '@angular/core';
import { db } from "../db";
import { NoteList, StickyNote } from '../types';


@Injectable({
  providedIn: 'root',
})
export class TodoService {

  getAllNotes() {
    return db.notes.toArray();
  }

  getAllLists() {
    return db.lists.toArray();
  }

  async getNotesByList(listID: number) {
    console.log("HERE", listID)
    const list = await db.lists.get(listID)
    if(list === undefined) {
      console.log("Does not exists")
      return []
    }

    const notes = await db.notes.where("listID").equals(listID).toArray()
    return notes
  }

  getNoteByID(noteID: number) {
    return db.notes.get(noteID);
  }

  getListByID(listID: number) {
    return db.lists.get(listID)
  }

  async addNote(newNote: StickyNote) {
    await db.notes.add(newNote);
    return newNote.id;
  }

  async addList(newList: NoteList) {
    await db.lists.add(newList)
    return newList.id;
  }

  deleteNote(noteID: number) {
    db.notes.delete(noteID)
    return noteID;
  }

  async deleteList(listID: number) {

    await db.transaction("rw", db.notes, db.lists, async () => {
      await db.notes.where("listID").equals(listID).delete();
      await db.lists.where("listID").equals(listID).delete();
    })
  }

  async updateNote(updatedNote: StickyNote) {
    let updated = await db.notes.upsert(updatedNote.id!, updatedNote);
    if (updated) {
      console.log("Note updated")
    }
    return updated;
  } 
}
