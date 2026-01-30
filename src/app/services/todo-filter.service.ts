import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoFilterService {
  private listIDSignal = signal<number>(-1);

  private viewingText = signal<string>("All Notes");

  readonly listID = this.listIDSignal.asReadonly();

  readonly currentText = this.viewingText.asReadonly();

  setListID(listID: number, listTitle: string) {
    this.viewingText.set(`${listTitle} Notes`);
    this.listIDSignal.set(listID);
  }

  resetToDefault() {
    this.viewingText.set("All Notes")
    this.listIDSignal.set(-1);
    }
}
