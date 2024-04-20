import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from 'src/app/Services/web.service';
import { TermsModalComponent } from '../terms-modal/terms-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyModalComponent } from '../privacy-modal/privacy-modal.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;

  constructor(private wesservice: WebService,
    public dialog: MatDialog,
    private route:Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]]

    })
  }
  openTermsModal() {
    this.dialog.open(TermsModalComponent);
  }
  openPrivacyModal() {
    this.dialog.open(PrivacyModalComponent);
  }
  ngOnInit(): void {
  }
  onLogin() {
   
    console.log(this.form.value);
    try {
      this.wesservice.login(this.form.value)
        .subscribe((res: any) => {
          console.log(res);
          this.wesservice.hideLoader();
          if (res.status) {
            this.wesservice.notifySuccess(res.message);
            console.log(res.message);
            localStorage.setItem('user_list', JSON.stringify(res.user));
            localStorage.setItem('tokens', JSON.stringify(res.tokens));
            localStorage.setItem('token', res.tokens.access.token);
            localStorage.setItem('refreshtoken', res.tokens.refresh.token);
            localStorage.setItem('id', res.user.id);
            
            this.route.navigateByUrl('/survey-listing');
          } else {
            // Display the backend error message when login fails
            this.wesservice.notifyError("Login failed. " + res.message);
          }
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status ) {
            this.wesservice.hideLoader();

            this.wesservice.notifyError("The username and password you have entered are incorrect." );
          } else {
            this.wesservice.notifyError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      this.wesservice.notifyError("Something went wrong !");
    }
  }
  
}
