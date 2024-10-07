import { Component, ViewChild } from '@angular/core';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { NotesFormComponent } from '../notes-form/notes-form.component';
import { Subject } from 'rxjs';

@Component({

  selector: 'app-notes-tab',
  templateUrl: './notes-tab.component.html',
  styleUrl: './notes-tab.component.css'
})
export class NotesTabComponent {

  public tabActiveIndex: number = 0;

  public ngUnsubscribe: Subject<void> = new Subject<void>();

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

  public updateItem(id:number){
    this.notesFormComponent.loadValues(id);
    this.tabActiveIndex = 1;
  }


}
