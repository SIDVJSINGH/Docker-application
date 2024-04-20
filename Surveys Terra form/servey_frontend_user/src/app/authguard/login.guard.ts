import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class loginGuard implements CanActivate {

  authlog: any
  constructor(private router: Router) {

   }
  canActivate(route: ActivatedRouteSnapshot) {
    this.authlog =localStorage.getItem('token')
    if (this.authlog) {
      this.router.navigate(['/survey-listing']);
      return false;
    } else {
      
      return true;
     
    }
  }

}
