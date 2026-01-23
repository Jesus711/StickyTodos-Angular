import { Dexie, Table } from "dexie";
import { StickyNote, NoteList } from "./types";

export class StickyNoteDB extends Dexie {

  notes!: Table<StickyNote, number>;
  lists!: Table<NoteList, number>;

  constructor() {
    super("ngdexieliveQuery")

    this.version(3).stores({
      notes: '++id, completed, listID, created_date',
      lists: '++id, noteCount'
    })

    this.on('populate', async (tx) => {
      const listID = await tx.table("lists").add({
        title: "General",
        protected: true,
        noteCount: 0,
      })
    })
  }

}

export const db = new StickyNoteDB();