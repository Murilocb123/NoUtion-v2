import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { NoteDto } from '../../dto/note-dto';
import { NoteService } from '../../services/note-service';
import { NoteStatus } from '../../enum/note-status';
import { BehaviorSubject, catchError, pipe, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
    selector: 'app-notes-list',
    templateUrl: './notes-list.component.html',
    styleUrl: './notes-list.component.css',
})
export class NotesListComponent implements OnInit, OnDestroy {
    @Output("parentFun") parentFun: EventEmitter<any> = new EventEmitter();
    @Output("updateItem") updateEvent: EventEmitter<any> = new EventEmitter();

    public layout: string = 'list';
    public updated: boolean = false;
    public notes!: NoteDto[];

    private destroy$ = new Subject<void>();




    constructor(
        private noteService: NoteService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.loadNotes();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public externalLoadNotes(): void {
        console.log('externalLoadNotes');
        this.loadNotes();
    }

    public loadNotesWithLoading(): void {
        console.log('loadNotes');
        this.updated = true;
        this.noteService.getAll()
            .pipe(takeUntil(this.destroy$),
                catchError((error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro ao carregar notas',
                        detail: 'Ocorreu um erro ao carregar as notas. Por favor, tente novamente mais tarde.',
                    });
                    this.updated = false;
                    throw error; // Re-throw the error to handle it in the subscription
                })
            )
            .subscribe(notes => {
                setTimeout(() => {
                    this.updated = false;
                }, 1500);
                this.notes = notes;
            });
    }

    public loadNotes(): void {
        console.log('loadNotes');
        this.noteService.getAll()
            .pipe(takeUntil(this.destroy$),
                catchError((error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro ao carregar notas',
                        detail: 'Ocorreu um erro ao carregar as notas. Por favor, tente novamente mais tarde.',
                    });
                    this.updated = false;
                    throw error; // Re-throw the error to handle it in the subscription
                })
            )
            .subscribe(notes => {
                this.notes = notes;
                this.updated = false;
            });
    }

    public isNoteActive(note: NoteDto): boolean {
        return note.status === NoteStatus.CONCLUDED;
    }

    public updateNote(id: string): void {
        this.updateEvent.emit(id);
    }
    public deleteNote(id: number): void {
        this.noteService.remove(id)
            .pipe(
                takeUntil(this.destroy$),
                catchError((error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro ao excluir nota',
                        detail: 'Ocorreu um erro ao excluir a nota. Por favor, tente novamente mais tarde.',
                    });
                    throw error; // Re-throw the error to handle it in the subscription
                })
            )
            .subscribe(() => {
                this.loadNotes();
            });
    }

    public updateStatus(item: NoteDto): void {
        this.updated = true;
        var newStatus = item.status === NoteStatus.OPEN ? NoteStatus.CONCLUDED : NoteStatus.OPEN;

        this.noteService.updateStatus(item.id, newStatus).pipe(
            takeUntil(this.destroy$),
            catchError((error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao atualizar status',
                    detail: 'Ocorreu um erro ao atualizar o status da nota. Por favor, tente novamente mais tarde.',
                });
                throw error; // Re-throw the error to handle it in the subscription
            })
        ).subscribe(() => {
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

