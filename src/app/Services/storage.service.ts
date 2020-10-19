import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs' //Permite crerar una variable reactiva, esto quire decir que va estar escuchando los cambios de la variable

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private auth = new BehaviorSubject<{}>(null)

  auth$ = this.auth.asObservable();//Inidica que nos podemos suscribir, ósea escuchar los cambios de  la variable

  constructor() {
    this.auth.next(this.dataUser())
  }

  saveToken(data){
    localStorage.setItem('session', data)
    this.auth.next(this.dataUser())
  }

  getToken(){
    return localStorage.getItem('session');
  }

  dataUser() {
    const token = this.getToken();
    if(!token){
      return null;
    }

    /*Base64 es un grupo de esquemas de codificación de binario a texto que representa los datos binarios mediante una cadena ASCII, traduciéndolos en una representación radix-64. El término Base64 se origina de un sistema de codificación de transmisión de contenido MIME específico.*/

    /**La función atob() decodifica una cadena de datos que ha sido codificada usando la codificación en base 64.  */

    let urlBase64 = token.split('.')[1];
    let b64 = urlBase64.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(b64));
  }

  destruirSesion(){
    localStorage.removeItem('token')
    this.auth.next(null)
  }
}
