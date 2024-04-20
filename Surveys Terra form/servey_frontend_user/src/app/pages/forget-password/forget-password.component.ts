import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from 'src/app/Services/web.service';
;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  myform: any;
  welcomedata:any;
  constructor(public fb: FormBuilder,
    private webservice:WebService,
    private router: Router
  ) {
    this.myform = this.fb.group({
      email: ['',Validators.required],
   
    })
  }
  ngOnInit(): void {
this.getdata();
  }
  public get email() {
    return this.myform.get('email') as FormControl;
  }

  onsave() {
    this.webservice.showLoader();
    var email: any = this.myform.controls?.["email"].value;

    console.log(this.myform.value['email']);
    const payload = {
      email: this.myform.value['email'],
     
    }
    this.webservice.forgptPass(payload).
      subscribe((response: any) => {
        this.webservice.hideLoader();
        console.log(response);
        if (response.status) {
          this.webservice.notifySuccess(response.message)
          this.router.navigate(['/otp'], {
            queryParams: {
             
              email:email ,
            },
          });
        } else {
          this.webservice.notifySuccess(response.message)

        }
      }, (errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.webservice.hideLoader();

          this.webservice.notifyError(errorResponse.error.message);
        } else {
          this.webservice.notifyError("An error occurred. Please try again later.");
        }
      });
      
  }


  back() {
    this.router.navigateByUrl('/login')
  }
  getdata(){
   
    this.webservice.aboutUs()
    .subscribe((res:any)=>{
  const cmsdata=res.allCms;
  this.webservice.hideLoader();
  const aboutUsData = cmsdata.find((cms:any) => cms.name === 'welcome-message-customer');
  if (aboutUsData) {
    this.welcomedata = aboutUsData.content;
    console.log(this.welcomedata);
  }
   
          }, (errorResponse) => {
            // Handle HTTP error response (e.g., 401 Unauthorized)
            if (errorResponse.status ) {
              this.webservice.hideLoader();
  
              this.webservice.notifyError("An error occurred. Please try again later.");
            } else {
              this.webservice.notifyError("An error occurred. Please try again later.");
            }
          });
  }
}
