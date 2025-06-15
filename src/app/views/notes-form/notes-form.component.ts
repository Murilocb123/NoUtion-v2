import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, Subject, takeUntil } from 'rxjs';
import { NoteDto } from '../../dto/note-dto';
import { NoteStatus } from '../../enum/note-status';
import { NoteService } from '../../services/note-service';

@Component({
    selector: 'app-notes-form',
    templateUrl: './notes-form.component.html',
    styleUrl: './notes-form.component.css',
})
export class NotesFormComponent implements OnInit, OnDestroy {
    public loadingState: boolean = false;
    public noteFormGroup: FormGroup;
    public statusOptions: any[] = [
        { key: NoteStatus.OPEN, value: 'Em Aberto' },
        { key: NoteStatus.CONCLUDED, value: 'Concluído' },
    ];
    public isEdit: boolean = false;
    public title: string = 'Nova Tarefa';
    public newChip: string | null = null;

    private destroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private noteService: NoteService,
        private messageService: MessageService
    ) {
        this.noteFormGroup = this.getFormGroup();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {

    }

    public switchTitle(): void {
        this.title = this.isEdit ? 'Editar Tarefa' : 'Nova Tarefa';
    }

    public loadValues(noteId: string): void {
        this.loadingState = true;
        this.noteService.getById(noteId)
            .pipe(
                takeUntil(this.destroy$),
                catchError((error) => {
                    this.addMessage('Erro ao carregar Tarefa', 'error');
                    this.loadingState = false;
                    throw error; // Re-throw the error to handle it in the subscription
                }
                ))
            .subscribe((note) => {
                this.noteFormGroup.patchValue({
                    id: note.id,
                    title: note.title,
                    content: note.content,
                    status: { key: note.status, value: this.getStatusLabel(note.status) },
                    tags: note.tags,
                });
                this.loadingState = false;
                this.isEdit = true;
                this.switchTitle();
            });
    }

    private getStatusLabel(status: NoteStatus): string {
        const statusOption = this.statusOptions.find(option => option.key === status);
        return statusOption ? statusOption.value : '';
    }

    private getFormGroup(): FormGroup {
        return this.formBuilder.group({
            id: [{ value: null, disabled: false }, Validators.compose([])],
            title: [{ value: null, disabled: false }, Validators.compose([Validators.required])],
            content: [{ value: "Digite aqui o conteudo...", disabled: false }, Validators.compose([Validators.required])],
            status: [{ value: null, disabled: false }, Validators.compose([Validators.required])],
            tags: [{ value: null, disabled: false }, Validators.compose([])],
        });
    }


    public saveNote(): void {

        const note = this.getNoteFromForm();
        console.log(note);
        this.noteService.save(note).pipe(
            takeUntil(this.destroy$),
            catchError((error) => {
                this.addMessage('Erro ao salvar Tarefa', 'error');
                this.loadingState = false;
                throw error; // Re-throw the error to handle it in the subscription
            })
        ).subscribe(() => {
            this.addMessage('Tarefa salva com sucesso', 'success');
            if (!this.isEdit) {
                this.noteFormGroup.reset();
            }
        });
    }

    private getNoteFromForm(): NoteDto {
        let statusValue: NoteStatus;
        if (this.noteFormGroup.get('status')?.value) {
            statusValue = this.noteFormGroup.get('status')?.value.key as NoteStatus;
        } else {
            statusValue = NoteStatus.OPEN;
        }

        return {
            id: this.noteFormGroup.get('id')?.value,
            title: this.noteFormGroup.get('title')?.value,
            content: this.noteFormGroup.get('content')?.value,
            status: statusValue,
            tags: this.noteFormGroup.get('tags')?.value,
        };
    }



    public addMessage(message: string, severity: string): void {

        const messageObj = { severity: severity, summary: message };
        this.messageService.add(messageObj);

    }

    public cancelarEdicao(): void {
        this.noteFormGroup.reset();
        this.isEdit = false;
        this.switchTitle()
    }
}
