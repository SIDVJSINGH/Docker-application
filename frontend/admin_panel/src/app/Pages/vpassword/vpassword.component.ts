import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { ForgotpassComponent } from '../forgotpass/forgotpass.component';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { AdminService } from '../../services/adminservice.service';
// import { TextInputDialogComponent } from 'src/app/components/text-input-dialog/text-input-dialog.component';
import { HttpClient } from '@angular/common/http';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vpassword',
  templateUrl: './vpassword.component.html',
  styleUrls: ['./vpassword.component.css']
})
export class VpasswordComponent {

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
      role: ['admin'],
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
    public adminservice: AdminserviceService,
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
    this.route.paramMap.subscribe((params) => {
      this.snapshotEmail = params.get('email');
    
      
    });
   }

  onBack(){
    this.router.navigateByUrl('/forgotpass');
}

  onreset(){
    this.adminservice.showLoader();
    var email: any = this.forgotForm.controls?.["email"].value;
   var token:any='';

    this.adminservice.verifypass(this.forgotForm.value)
    .subscribe((response:any)=>{
this.adminservice.hideLoader();
      if(response.status){
        this.adminservice.notifySuccess(response.message)
        this.router.navigate(['/newpass', email]);
      } else{
        this.adminservice.notifySuccess(response.message)
  
      }
    },(errorResponse) => {
      // Handle HTTP error response (e.g., 401 Unauthorized)
      if (errorResponse.status) {
        this.adminservice.hideLoader();

        this.adminservice.notifyError("Unauthorized: " + errorResponse.error.message);
      } else {
        this.adminservice.notifyError("An error occurred. Please try again later.");
      }
    });
  }
       
}
