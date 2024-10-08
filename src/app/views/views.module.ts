import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { NotesTabComponent } from './notes-tab/notes-tab.component';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { NoteService } from '../services/note-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { EditorModule } from 'primeng/editor';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { MessagesModule } from 'primeng/messages';
import { Toast, ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';




@NgModule({
  declarations: [
    NotesListComponent,
    NotesFormComponent,
    NotesTabComponent,

    ],
  imports: [
    CommonModule,
    ChipModule,
    PanelModule,
    TabViewModule,
    ButtonModule,
    DataViewModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    FieldsetModule,
    EditorModule,
    ChipsModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule,
    MessagesModule,
    ToastModule,
    InputSwitchModule
  ],
  providers: [],
  exports: [
    NotesTabComponent
  ]
})
export class ViewsModule { }
