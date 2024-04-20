import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from 'src/app/Services/web.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  hide = true;
  form: FormGroup;
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

  constructor(private wesservice: WebService,
    private route:Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      message: [''],
    

    })
  }
  ngOnInit(): void {
  }
  oncontact() {
   
    console.log(this.form.value);
  
    try {
      this.wesservice.contactus(this.form.value)
        .subscribe((res: any) => {
          console.log(res);
         
          this.wesservice.hideLoader();
          if (res.status) {
            this.form.reset();
            this.wesservice.notifySuccess("Submitted successfully");
         
     
          } else {
            // Display the backend error message when login fails
            this.wesservice.notifyError("Login failed. " + res.message);
          }
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status ) {
            this.wesservice.hideLoader();

            this.wesservice.notifyError("Please fill out all the fields");
          } else {
            this.wesservice.notifyError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      this.wesservice.notifyError("Something went wrong !");
    }
  }
}
