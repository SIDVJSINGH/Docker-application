import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/Services/adminservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // eye icon //
  changetype: boolean = true;
  visible: boolean = true;
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  hidePassword = true;
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  loginForm: any;
  passwordRegex =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
  constructor(private route: Router,
    private adminService: AdminserviceService,
    public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      role: ['admin']
      // checkbox: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {

  }
  public get email() {
    return this.loginForm.get('email') as FormControl;
  }
  public get password() {
    return this.loginForm.get('password') as FormControl;
  }
  // public get checkbox() {
  //   return this.loginForm.get('checkbox') as FormControl;
  // }

  doLogin() {
    this.adminService.showLoader();
    let formValue = this.loginForm.value;
    this.adminService.adminLogin(formValue)
      .subscribe((res: any) => {
        this.adminService.hideLoader();
        this.adminService.notifySuccess(res.message);
        if (res.status) {
          localStorage.setItem('Id', res.user.id);
          localStorage.setItem('first_name', res.user.first_name);
          localStorage.setItem('last_name', res.user.last_name);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('Accesstoken', res.tokens.access.token);
          localStorage.setItem('Refreshtoken', res.tokens.refresh.token);
          this.route.navigateByUrl('/main/dashboard');

        }
      }, (errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.adminService.hideLoader();

          this.adminService.notifyError("The username and password you have entered are incorrect." );
        } else {
          this.adminService.notifyError("An error occurred. Please try again later.");
        }
      });

  }


}
