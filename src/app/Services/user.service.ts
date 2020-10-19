//ng g service Services/user
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://bitbero.herokuapp.com'

  constructor(
    private http: HttpClient
  ) { }


  createUser(formData){
    return this.http.post<User>(`${this.apiUrl}/user/create`, formData)
  }

  login(dataLogin){
    return this.http.post<User>(`${this.apiUrl}/login`, dataLogin)
  }
}
