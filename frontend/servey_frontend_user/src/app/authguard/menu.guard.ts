import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WebService } from '../Services/web.service';


@Injectable({
  providedIn: 'root'
})
export class menuGuard implements CanActivate {
  authlog:any='';
  constructor( private router: Router, private webservice:WebService){

  }
 
  canActivate(): boolean {
    // Check if the user is authenticated (e.g., token exists in local storage)
    if (localStorage.getItem('token')) {
      return true; // User is authenticated, allow navigation
    }

    // If not authenticated, redirect to the login page
    this.webservice.notifyError("login first to view this page")
    this.router.navigate(['/login']);
    return false;
  }
  
}
