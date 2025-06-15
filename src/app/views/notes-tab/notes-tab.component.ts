import { Component, inject, ViewChild } from '@angular/core';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { NotesFormComponent } from '../notes-form/notes-form.component';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({

  selector: 'app-notes-tab',
  templateUrl: './notes-tab.component.html',
  styleUrl: './notes-tab.component.css'
})
export class NotesTabComponent {

  public tabActiveIndex: number = 0;

  public ngUnsubscribe: Subject<void> = new Subject<void>();
  #document = inject(DOCUMENT);
  public isDarkMode = true;

  @ViewChild('notesListComponent', {static: false}) public notesListComponent!: NotesListComponent;
  @ViewChild('notesFormComponent', {static: false}) public notesFormComponent!: NotesFormComponent;

  public updateComponentList(): void {
    this.notesListComponent.externalLoadNotes();
  }

  public onChange(): void {
    if(this.tabActiveIndex === 0){
      this.updateComponentList();
    }
  }

  public updateItem(id:string){
    this.notesFormComponent.loadValues(id);
    this.tabActiveIndex = 1;
  }

  toggleLightDark() {
    const linkElement = this.#document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;
    if (linkElement.href.includes('light')) {
      linkElement.href = 'dark.css';
      this.isDarkMode = true;
    } else {
      linkElement.href = 'light.css';
      this.isDarkMode = false;
    }
  }

}
