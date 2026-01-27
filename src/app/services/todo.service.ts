import { Injectable } from '@angular/core';
import { db } from "../db";
import { NoteList, StickyNote } from '../types';


@Injectable({
  providedIn: 'root',
})
export class TodoService {

  async deleteTables() {
    await db.delete()
    await db.open()
  }

  getAllNotes() {
    return db.notes.toArray();
  }

  getAllLists() {
    return db.lists.toArray();
  }

  async getNotesByList(listID: number) {
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

    await db.transaction('rw', db.notes, db.lists, async() => {
      await db.notes.add(newNote);
      await db.lists.where("id").equals(newNote.listID).modify(list => {
        list.noteCount = (list.noteCount ?? 0) + 1
      })
    })
  }

  async addList(newList: NoteList) {
    return db.lists.add(newList)
  }

  async deleteNote(noteID: number, listID: number) {
    await db.transaction('rw', db.notes, db.lists, async() => {
    await db.notes.delete(noteID);
    await db.lists.where("id").equals(listID).modify(list => {
        list.noteCount = Math.max(0, ((list.noteCount ?? 0) - 1))
      })
    })
    return noteID;
  }

  async deleteList(listID: number) {

    await db.transaction("rw", db.notes, db.lists, async () => {
      await db.notes.where("listID").equals(listID).delete();
      await db.lists.where("id").equals(listID).delete();
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
