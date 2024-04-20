import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminserviceService } from '../Services/adminservice.service';


@Injectable({
  providedIn: 'root'
})
export class dashGuard implements CanActivate {
  authlog:any='';
  constructor(public adminservice: AdminserviceService, private router: Router){

  }
 
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authlog =localStorage.getItem('Accesstoken')
    if (! this.authlog) {
      return false;
    } else {
 
      return true;
    }
  }
  
}
