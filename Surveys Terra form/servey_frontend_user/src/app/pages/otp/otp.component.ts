import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { ForgotpassComponent } from '../forgotpass/forgotpass.component';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { AdminService } from '../../services/adminservice.service';
// import { TextInputDialogComponent } from 'src/app/components/text-input-dialog/text-input-dialog.component';
import { HttpClient } from '@angular/common/http';
import { WebService } from 'src/app/Services/web.service';

//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {

  base_url = '';
  forgotForm: any;
  public snapshotEmail: any;
  otp: any='';
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  onOtpChange(otp:any) {
    this.otp = otp;
  
    this.forgotForm = this.formbuilder.group({
      email: [this.snapshotEmail],
      
      otp: this.otp,
    });

  }



  toggleDisable(){
    if(this.ngOtpInput.otpForm){
      if(this.ngOtpInput.otpForm.disabled){
        this.ngOtpInput.otpForm.enable();
      }else{
        this.ngOtpInput.otpForm.disable();
      }
    }
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
  constructor(
    public formbuilder: FormBuilder,
    public dialog: MatDialog,
    public webservice:WebService,
    private router: Router,
    private route: ActivatedRoute,
    //public toastr: ToastrService, 
    //vcr: ViewContainerRef,
    // private spinnerService: NgxSpinnerService,
    // private http:HttpClient
  ) {
 
    //this.toastr.(vcr);
 
  }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    
       this.snapshotEmail = queryParams['email'];
   
   }



   onsave(){
    this. webservice.showLoader();
    var email: any = this.forgotForm.controls?.["email"].value;
   var token:any='';

    this. webservice.verifypass(this.forgotForm.value)
    .subscribe((response:any)=>{
this. webservice.hideLoader();
      if(response.status){
        this. webservice.notifySuccess(response.message)
        this.router.navigate(['/reset-password'], {
          queryParams: {
           
            email:email ,
          },
        });
      } else{
        this. webservice.notifySuccess(response.message)
  
      }
    },(errorResponse) => {
      // Handle HTTP error response (e.g., 401 Unauthorized)
      if (errorResponse.status) {
        this. webservice.hideLoader();

        this. webservice.notifyError( errorResponse.error.message);
      } else {
        this. webservice.notifyError("An error occurred. Please try again later.");
      }
    });
  }
       
}

