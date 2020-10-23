import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/*import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';*/

import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { HomeComponent } from './Components/home/home.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { AddGenreComponent } from './Components/add-genre/add-genre.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { LoginComponent } from './Components/login/login.component';

import { AuthGuard } from './Guards/auth.guard';
import { BookListComponent } from './Components/book-list/book-list.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';
import { UpdateBookComponent } from './Components/update-book/update-book.component';

const routesApp: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crear-libros', canActivate: [AuthGuard], data: {only: 'Admin'}, component: AddBookComponent },
  { path: 'crear-generos', canActivate: [AuthGuard], data: {only: 'Admin'}, component: AddGenreComponent },
  { path: 'crear-usuario', component: AddUserComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'lista-libros', component: BookListComponent },
  { path: 'modificar-usuario', canActivate: [AuthGuard], component: UpdateUserComponent },
  { path: 'modificar-libro/:id', canActivate: [AuthGuard], data: {only: 'Admin'}, component: UpdateBookComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AddBookComponent,
    AddGenreComponent,
    AddUserComponent,
    LoginComponent,
    BookListComponent,
    UpdateUserComponent,
    UpdateBookComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routesApp),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    /*AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
