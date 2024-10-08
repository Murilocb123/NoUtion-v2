import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { NoteDto } from '../../dto/note-dto';
import { NoteService } from '../../services/note-service';
import { NoteStatus } from '../../enum/note-status';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
  providers: [NoteService],
})
export class NotesListComponent  implements OnInit, OnDestroy{
    public layout: string = 'list';
    public updated: boolean = false;

    public notes!: NoteDto[];


    @Output("parentFun") parentFun: EventEmitter<any> = new EventEmitter();
    @Output("updateItem") updateEvent: EventEmitter<any> = new EventEmitter();


    constructor(private noteService: NoteService) {

    }

    ngOnInit(): void {
      this.loadNotes();
    }

    ngOnDestroy(): void {
    }

    public externalLoadNotes(): void{
      console.log('externalLoadNotes');
      this.loadNotes();
    }

    public loadNotesWithLoading(): void {
      console.log('loadNotes');
      this.updated = true;
      this.noteService.getList().then(notes => {
        setTimeout(() => {
          this.updated = false;
        }, 1500);
        this.notes = notes;
      });
    }

    public loadNotes(): void {
      console.log('loadNotes');
      this.noteService.getList().then(notes => {
        this.notes = notes;
      });
    }

    public isNoteActive(note: NoteDto): boolean {
        return note.status === NoteStatus.ACTIVE;
    }

    public updateNote(id: number): void {
      this.updateEvent.emit(id);
    }
    public deleteNote(id:number): void {
      this.noteService.remove(id).then(() => {
        this.loadNotes();
      });
    }

    public updateStatus(item:NoteDto): void {
      var newStatus = item.status === NoteStatus.ACTIVE ? NoteStatus.INACTIVE : NoteStatus.ACTIVE;

      this.noteService.updateStatus(item.id ,newStatus).then(() => {
        this.loadNotes();
      });
    }


    public reduceContent(content: string): string {
      const div = document.createElement('div');
      div.innerHTML = content;
      let text = div.textContent || div.innerText || '';

      if (text.length <= 50) {
        return content;
      }

      text = text.slice(0, 50) + '...';

      return text;
    }
}

