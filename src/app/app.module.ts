import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { HomeComponent } from './Components/home/home.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { AddGenreComponent } from './Components/add-genre/add-genre.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { LoginComponent } from './Components/login/login.component';

const routesApp: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crear-libros', component: AddBookComponent },
  { path: 'crear-generos', component: AddGenreComponent },
  { path: 'crear-usuario', component: AddUserComponent },
  { path: 'iniciar-sesión', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AddBookComponent,
    AddGenreComponent,
    AddUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routesApp),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
