import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { StorageService } from '../Services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public path;
   

  constructor (
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if(this.storageService.getToken() != null){
      if(this.isAdmin(route.data.only)){
        return true
      }else{
        this.router.navigate(['/']);
        return false;
      }
    }
    this.router.navigate(['/iniciar-sesion']);
    return false;
  }

  isAdmin(onlyData){
    const infoUser = this.storageService.dataUser();
    if((infoUser.role == 'Admin' && onlyData == 'Admin') || !onlyData){
      return true
    }
    
    
  }
  
}
