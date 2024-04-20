import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WebService } from 'src/app/Services/web.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent  implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
    constructor(private webservice:WebService,private router:Router){}
    ngOnInit(): void {
      
    }
    delete() {

      Swal.fire({
        title: 'Are you sure?',
        text: "you want to delete your account",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
  
  
      }).then((result) => {
        if (result.isConfirmed) {
  
          try {
  
            this.webservice.deleteaccount({})
              .subscribe((res: any) => {
                setTimeout(() => {
                  Swal.fire(
                    'Deleted successfully',
                    "",
                    'success'
                  ).then((swalResult) => {
                    if (swalResult.isConfirmed) {
                      this.webservice.logout()
                      this.router.navigateByUrl('/login')
                    }
                  });
                }, 10);
              },(errorResponse) => {
                // Handle HTTP error response (e.g., 401 Unauthorized)
                if (errorResponse.status) {
        
                  this.webservice.notifyError( errorResponse.error.message);
                } else {
                  this.webservice.notifyError("An error occurred. Please try again later.");
                }
              });
  
          } catch (e) {
            this.webservice.hideLoader();
  
            this.webservice.notifyError('Something went wrong');
          }
  
  
  
  
        }
      })
  
    }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout it!'


    }).then((result) => {
      if (result.isConfirmed) {
       
        setTimeout(() => {
          Swal.fire(
            'logout successfully',
            "",
            'success'
          ).then((swalResult) => {
            if (swalResult.isConfirmed) {
              this.webservice.logout();
             
            }
          });
        }, 10);
      




      }
    })
   
  }


  name: string = 'hello';
}
