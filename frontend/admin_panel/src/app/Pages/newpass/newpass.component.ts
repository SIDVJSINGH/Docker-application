import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
// import { AdminService } from '../../services/adminservice.service';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css']
})
export class NewpassComponent {
  changepasswordForm: any = '';
  public email: any = '';
  changetype: boolean = true;
  visible: boolean = true;
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    public formbuilder: FormBuilder,
    public adminservice: AdminserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email');

    });
    this.changepasswordForm = this.formbuilder.group({

      email: [this.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator // Custom validator function
    });

  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null; // Valid
  }

  hidePassword = true;
  hidePassword1 = true;
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }



  public get password() {
    return this.changepasswordForm.get('email') as FormControl;
  }
  public get confirmPassword() {
    return this.changepasswordForm.get('email') as FormControl;
  }




  onreset() {
    this.adminservice.showLoader();
    this.adminservice.resetpass(this.changepasswordForm.value)
      .subscribe((res: any) => {
        this.adminservice.hideLoader();
        this.adminservice.notifySuccess(res.message);
        this.router.navigateByUrl('/login');
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
    this.router.navigateByUrl('/login');
  }

}
