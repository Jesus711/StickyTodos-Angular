export interface StickyNote {
    id?: number,
    title: string,
    description: string,
    created_date: string,
    completed: boolean,
    completed_date: string | "",
    color: string,
    listID: number
}

export interface NoteList {
    id?: number,
    title: string,
    protected: boolean
}