import { BooksComponent } from './components/books/books.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { UsersComponent } from './components/users/users.component';
import { authGuard, unAuthGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ unAuthGuard ] },

  { path: '', component: HomeComponent , canActivate: [ authGuard ] },
  { path: 'inicio', component: HomeComponent , canActivate: [ authGuard ] },
  { path: 'autores', component: AuthorsComponent , canActivate: [ authGuard ] },
  { path: 'libros', component: BooksComponent , canActivate: [ authGuard ] },
  { path: 'usuarios', component: UsersComponent, canActivate: [ authGuard, adminGuard ]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
