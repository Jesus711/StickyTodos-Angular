import { Dexie, Table } from "dexie";
import { StickyNote } from "./types";

export class StickyNoteDB extends Dexie {

  notes!: Table<StickyNote, number>;

  constructor() {
    super("ngdexieliveQuery")

    this.version(1).stores({
      notes: '++id'
    })
  }
}

export const db = new StickyNoteDB();