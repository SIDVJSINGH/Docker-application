import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { hasText } from 'html-text-content';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
import * as intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  @Output() dataUpdated = new EventEmitter<string>();

  editorConfig: AngularEditorConfig = {
    editable: true,
    uploadUrl: this.adminService.apiUrl + '/cms/add/new-cms'
  };
  form: FormGroup;
  passwordRegex =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
  constructor(
    private dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder, private adminService: AdminserviceService,
  ) {
    // Create the form with the necessary form controls and validators
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
   
      role: ['admin'],
    
    

      
    });
  }
  private iti: any; // Reference to intlTelInput instance

  ngOnInit(): void {
    const inputTel = document.getElementById('phone');

    if (inputTel) {
      this.iti = intlTelInput(inputTel, {
        initialCountry: 'us',
        separateDialCode: true,
        // preferredCountries: ["dz", "in"],
        // nationalMode: true,
        //    defaultCountry: "auto",
  
        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js'
      });
     

    }

    
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  phoneNumber:any;
  onSubmit(): void {
    if (this.iti) {
      // Get the selected phone number and country code
      const selectedCountryData = this.iti.getSelectedCountryData();
      const countryCode = selectedCountryData.dialCode;
      this.phoneNumber = this.iti.getNumber();
    const payload = {
      first_name: this.form.value['first_name'],
      last_name: this.form.value['last_name'],
      email: this.form.value['email'],
      phone: this.phoneNumber,
      role: this.form.value['role'],
      password: this.form.value['password'],
  

    }}
    if (this.form.valid) {
      // You can access the form values using this.form.value

      this.dialogRef.close(this.form.value);

     

      const payload = {
        first_name: this.form.value['first_name'],
        last_name: this.form.value['last_name'],
        email: this.form.value['email'],
        // phone: this.phoneNumber,
        role: this.form.value['role'],
        password: this.form.value['password'],
    
  
      }


      try {

        this.adminService.addadmin(payload)
          .subscribe((res: any) => {
            this.dataUpdated.emit('refresh');

            this.adminService.notifySuccess(res.message)
          }, (errorResponse) => {
            // Handle HTTP error response (e.g., 401 Unauthorized)
            if (errorResponse.status) {

              this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
            } else {
              this.adminService.notifyError("An error occurred. Please try again later.");
            }
          });

      } catch (e) {
        this.adminService.notifyError("something send wrong")
      }

    }
  }}

