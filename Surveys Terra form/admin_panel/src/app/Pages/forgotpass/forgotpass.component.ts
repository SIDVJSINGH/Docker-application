import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/Services/adminservice.service';



@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  myform: any;
  constructor(public fb: FormBuilder,
    private adminservice: AdminserviceService,
    private router: Router
  ) {
    this.myform = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      checkbox: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {

  }
  public get email() {
    return this.myform.get('email') as FormControl;
  }
  public get checkbox() {
    return this.myform.get('checkbox') as FormControl;
  }
  onreset() {
    this.adminservice.showLoader();
    var email: any = this.myform.controls?.["email"].value;
    const payload = {
      email: this.myform.value['email'],
      role: "admin"
    }
    this.adminservice.forgotpass(payload).
      subscribe((response: any) => {
        this.adminservice.hideLoader();
        if (response.status) {
          this.adminservice.notifySuccess(response.message)
          this.router.navigate(['/vpassword', email]);
        } else {
          this.adminservice.notifySuccess(response.message)

        }
      }, (errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.adminservice.hideLoader();

          this.adminservice.notifyError("Unauthorized: " + errorResponse.error.message);
        } else {
          this.adminservice.notifyError("An error occurred. Please try again later.");
        }
      });
  }

  onBack() {
    this.router.navigateByUrl('/login')
  }
}
