import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Genre } from '../Models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  apiUrl = 'https://bitbero.herokuapp.com'

  constructor(
    private http: HttpClient
  ) { }


  createGenre(formData){
    return this.http.post<Genre>(`${this.apiUrl}/genre/create`, formData) //altgr + } ó alt + 96
  }

  getAll(){
    return this.http.get(`${this.apiUrl}/genre/getAll`)
  }

}
