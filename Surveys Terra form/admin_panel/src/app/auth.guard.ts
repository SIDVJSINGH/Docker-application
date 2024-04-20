import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate{

  canActivate():boolean{
    let token = localStorage.getItem('Accesstoken');
    if(!token)
    {
    alert('Please Login to View This Page !');  
    return false;
    }
    else{
     
      return true;
    }
   }
 
};
