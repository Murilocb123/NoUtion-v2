import { NoteStatus } from "../enum/note-status";

export interface NoteDto {
    id: number | null;
    title: string;
    content: string;
    tags: string[];
    status: NoteStatus;
}
