import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminserviceService } from '../Services/adminservice.service';


@Injectable({
  providedIn: 'root'
})
export class loginGuard implements CanActivate {

  authlog: any
  constructor(private router: Router, private adminservice: AdminserviceService) {

  }
  canActivate(route: ActivatedRouteSnapshot) {
    this.authlog = localStorage.getItem('Accesstoken')
    if (this.authlog) {
      this.router.navigate(['/main/dashboard']);
      return false;
    } else {

      return true;

    }
  }

}
