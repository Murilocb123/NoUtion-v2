import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteStatus } from '../../enum/note-status';
import { NoteService } from '../../services/note-service';
import { NoteDto } from '../../dto/note-dto';
import { Observable, Subject, subscribeOn, Subscriber } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrl: './notes-form.component.css',
  providers: [NoteService, MessageService]
})
export class NotesFormComponent implements OnInit {
  public noteFormGroup: FormGroup;
  public statusOptions: any[] = [
    { key: NoteStatus.ACTIVE, value: 'Em Aberto' },
    { key: NoteStatus.INACTIVE, value: 'Concluído' },
  ];
  public isEdit: boolean = false;
  public title: string = 'Nova Tarefa';
  public newChip: string|null = null;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private messageService: MessageService
  ) {
    this.noteFormGroup = this.getFormGroup();
  }

  ngOnInit(): void {
  }

  public switchTitle(): void {
    this.title = this.isEdit ? 'Editar Tarefa' : 'Nova Tarefa';
  }

  public loadValues(noteId: number): void {
    this.noteService.getById(noteId).then((note) => {
      this.noteFormGroup.patchValue({
        id: note.id,
        title: note.title,
        content: note.content,
        status: { key: note.status, value: this.getStatusLabel(note.status) },
        tags: note.tags,
      });

      this.isEdit = true;
      this.switchTitle();
    });
  }

  private getStatusLabel(status: number): string {
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
    Promise.resolve(this.noteService.save(note)).catch((error) => {
      this.addMessage('Erro ao salvar Tarefa', 'error');
    }).then(() => {
      this.addMessage('Tarefa salva com sucesso', 'success');
      if (!this.isEdit) {
        this.noteFormGroup.reset();
      }
    });
  }

  private getNoteFromForm(): NoteDto {
    let statusValue: number;
    if(this.noteFormGroup.get('status')?.value){
       statusValue = Number.parseInt(this.noteFormGroup.get('status')?.value.key);
    }else{
       statusValue = NoteStatus.ACTIVE;
    }

    return {
      id:  this.noteFormGroup.get('id')?.value,
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
