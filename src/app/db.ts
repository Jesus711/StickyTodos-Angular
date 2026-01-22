import { Dexie, Table } from "dexie";
import { StickyNote, NoteList } from "./types";

export class StickyNoteDB extends Dexie {

  notes!: Table<StickyNote, number>;
  lists!: Table<NoteList, number>;

  constructor() {
    super("ngdexieliveQuery")

    this.version(2).stores({
      notes: '++id, completed',
      lists: '++id'
    })

    this.on('populate', async (tx) => {
      const listID = await tx.table("lists").add({
        title: "General",
        protected: true,
      })
    })
  }

}

export const db = new StickyNoteDB();