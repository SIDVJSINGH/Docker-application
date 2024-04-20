import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { WebService } from 'src/app/Services/web.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideUpDown', [
      state('0', style({ opacity: 0 })),
      state('1', style({ opacity: 1 })),
      transition(':enter', animate('400ms ease-in-out')),
      transition('* => *', animate('400ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  scrolled: boolean = false;
  hide: boolean = false;
  imageUrl: any = 'assets/img/avatar.jpg';
  getlist:any;
  profile_image:any;
  public loggedUser: any = '';
  public loggedUserLastName: any = ''
 
  public url:any;
  profileData:any='';
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 0;
  }
  constructor(private webservice:WebService){
    this.hide = false;
    const profileDataString = localStorage.getItem('user_list');
    if (profileDataString) {
      const profileData = JSON.parse(profileDataString);
      this.loggedUser =profileData.first_name;
      this.loggedUserLastName=profileData.last_name;
      this.profile_image = profileData.profile_image;
    }
  }
  ngAfterViewInit(): void {
   
  }
  
  ngOnInit() {

   
    if(localStorage.getItem('status')){
      this.webservice.profileData$.subscribe((data:any)=>{
      if(data.status==true){
        this.profileData = data.user;
  console.log(this.profileData);
        this.loggedUser= this.profileData.first_name;
  
        this.loggedUserLastName =this.profileData.last_name;
        this.profile_image=this.profileData.profile_image;
  
      }
      })
    }
     

  }

  loggedIn(){

    if(localStorage.getItem('token')){
      return true;
    }
    else{
      return false;
    }

  }
  logout(){
    this.webservice.logout();
  }
  getprofile() {
 
    try {
      this.webservice.getProfile()
        .subscribe((res: any) => {
       
          if (res.status) {
            this.getlist = res.user;
            this.profile_image=this.getlist.profile_image;
          
          } else {
            this.webservice.notifyError('Something went wrong');
          }
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
           

            this.webservice.notifyError( errorResponse.error.message);
          } else {
            this.webservice.notifyError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      this.webservice.notifyError('Something went wrong');
    }
  }
}
