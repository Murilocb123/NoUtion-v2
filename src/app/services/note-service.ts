import { BehaviorSubject, Subject } from "rxjs";
import { NoteDto } from "../dto/note-dto";
import { NoteStatus } from "../enum/note-status";
import { LocalStorageServiceBase } from "./local-storage-service-base";




export class NoteService extends LocalStorageServiceBase<NoteDto[]> {


  protected readonly storageKey = 'notes';

  constructor() {
    super();
    if (!this.get()){
      this.set(this.notesExample);
    }
  }

  private getAll(): NoteDto[] {
    return this.get() || [];
  }

  public getList(): Promise<NoteDto[]> {
    return Promise.resolve(this.getAll());
  }

  public save(note: NoteDto): void {
    const notes = this.getAll();
    if (!note.id) {
      note.id = notes.length + 1;
    }
    const index = notes.findIndex(n => n.id === note.id);


    if (index === -1) {
      notes.push(note);
    } else {
      notes[index] = note;
    }
    this.set(notes);
  }

  public getById(id: number): Promise<NoteDto> {
    const note = this.getAll().find(n => n.id === id);
    if (!note) {
      throw new Error('Note not found');
    }
    return Promise.resolve(note);
  }

  public remove(id: number): Promise<void> {
    return Promise.resolve(this.delete(id));
  }

  public updateStatus(id: number | null, status: NoteStatus): Promise<void> {
    if (!id) {
      throw new Error('Note not found');
    }
    return Promise.resolve(this.revertStatus(id, status));
  }


  private revertStatus(id: number, status:NoteStatus): void {
    const note = this.getAll().find(n => n.id === id);
    if (!note) {
      throw new Error('Note not found');
    }
    note.status = status;
    this.save(note);
  }

  private delete(id: number): void {
    const notes = this.getAll();
    const index = notes.findIndex(n => n.id === id);
    if (index === -1) {
      throw new Error('Note not found');
    }
    notes.splice(index, 1);
    this.set(notes);
  }

  private notesExample: NoteDto[] = [
    {
      id: 1,
      title: 'Primeira tarefa',
      content: 'Conteúdo da primeira tarefa',
      tags: ['Primeira', 'Tarefa'],
      status: NoteStatus.ACTIVE,

    },
    {
      id: 2,
      title: 'Segunda tarefa',
      content: 'Conteúdo da segunda tarefa',
      tags: ['Segunda', 'Tarefa'],
      status: NoteStatus.INACTIVE,

    },
    {
      id: 3,
      title: 'Terceira tarefa',
      content: 'Conteúdo da terceira tarefa',
      tags: ['Terceira', 'Tarefa'],
      status: NoteStatus.ACTIVE,

    }
  ];
}
