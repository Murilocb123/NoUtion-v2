import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesTabComponent } from './notes-tab/notes-tab.component';
import { LoginComponent } from './login/login.component';
import { PasswordModule } from 'primeng/password';
import { NoteService } from '../services/note-service';
import { MessageService } from 'primeng/api';





@NgModule({
  declarations: [
    NotesListComponent,
    NotesFormComponent,
    NotesTabComponent,
    LoginComponent
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
    InputSwitchModule,
    ProgressSpinnerModule,
    PasswordModule
    ],
  providers: [
    NoteService,
    MessageService
  ],
  exports: [
    NotesTabComponent,
    LoginComponent
  ]
})
export class ViewsModule { }
