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
import { WebService } from 'src/app/Services/web.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  newPassword = true;
  confirmPassword = true;
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
    public webservice:WebService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    
    this.email = queryParams['email'];
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
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }





  onreset() {
this.webservice.showLoader();
    this.webservice.resetpass(this.changepasswordForm.value)
      .subscribe((res: any) => {
this.webservice.hideLoader();
        this.webservice.notifySuccess(res.message);
        this.router.navigateByUrl('/login');
      },(errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.webservice.hideLoader();

          this.webservice.notifyError( errorResponse.error.message);
        } else {
          this.webservice.notifyError("An error occurred. Please try again later.");
        }
      });
  }
  onBack() {
    this.router.navigateByUrl('/login');
  }

}

