import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesTabComponent } from './views/notes-tab/notes-tab.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full'
  },
  {
    path: 'notes',
    component: NotesTabComponent,
    canActivate: [AuthGuard] // Ensure that the user is authenticated before accessing the notes tab
  }
  ,
  {
    path: 'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
