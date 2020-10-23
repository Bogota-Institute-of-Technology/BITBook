//ng g service Services/user
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User';

import { StorageService } from '../Services/storage.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://bitbero.herokuapp.com'
  //apiUrl = 'http://localhost:3000'

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  prepareHeader () {
    return { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.storageService.getToken()}`
    }) }
  }


  createUser(formData){
    return this.http.post<User>(`${this.apiUrl}/user/create`, formData)
  }

  login(dataLogin){
    return this.http.post<User>(`${this.apiUrl}/login`, dataLogin)
  }

  updateUser(dataUser, id){
    return this.http.put<User>(`${this.apiUrl}/user/update/${id}`, dataUser, this.prepareHeader ())
  }
}
