import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl = 'https://bitbero.herokuapp.com'

  constructor(
    private http: HttpClient
  ) { }

  createBook(formData){
    return this.http.post<Book>(`${this.apiUrl}/book/create`, formData) //altgr + } ó alt + 96
  }

  getAll(){
    return this.http.get(`${this.apiUrl}/book/getAll`)
  }
}
