import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { hasText } from 'html-text-content';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
import * as intlTelInput from 'intl-tel-input';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Output() dataUpdated = new EventEmitter<string>();

  editorConfig: AngularEditorConfig = {
    editable: true,
    uploadUrl: this.adminService.apiUrl + '/cms/add/new-cms'
  };
  form: FormGroup;
  passwordRegex =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;

  constructor(
    private dialogRef: MatDialogRef<Dialog>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder, private adminService: AdminserviceService,
  ) {
    // Create the form with the necessary form controls and validators
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],     state:[''],
      role: ['user'],
      // address: [''],
      is_accept_terms_and_conditions: [true],
   
      dob: ['', [Validators.required, this.dateOfBirthValidator ]],
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
  dateOfBirthValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const currentDate = new Date();
      const birthDate = new Date(control.value);

      // Calculate age in years
      const age = currentDate.getFullYear() - birthDate.getFullYear();
    
      if (age < 16) {
        Swal.fire({
          title: "Age must be above 16+",
          position: "center", // Set the position to "center"
          showConfirmButton: true
        });
        
        return { ageBelow16: true };
      
      }
    }

    return null; // Validation passed
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  phoneNumber:any;
  onDateChange(event: any): void {
    const selectedDate = event.value;
    console.log('Selected date:', selectedDate);
  }
  formatDate(inputDate: string): any {
    const formattedDate = this.datePipe.transform(inputDate, 'dd-MM-yyyy');
    return formattedDate;
  }
  inpuDate:any;
  Dob:any;
  onSubmit(): void {
    this.inpuDate = this.form.value['dob'];
    this.Dob = this.formatDate(this.inpuDate);
    
    if (this.iti) {
      // Get the selected phone number and country code
      const selectedCountryData = this.iti.getSelectedCountryData();
      const countryCode = selectedCountryData.dialCode;
      this.phoneNumber = this.iti.getNumber();
    const payload = {
 
      first_name: this.form.value['first_name'],
      last_name: this.form.value['last_name'],
      email: this.form.value['email'],
      // phone: this.phoneNumber,
      role: this.form.value['role'],
      password: this.form.value['password'],
      // address: this.form.value['address'],
     
   
      dob: this.Dob,
        state: this.form.value['state'],
      isEmailVerified: true,
      // isPhoneVerified: true,
      is_accept_terms_and_conditions: this.form.value['is_accept_terms_and_conditions'],

    }

      // You can access the form values using this.form.value

     





      try {

        this.adminService.createuser(payload)
          .subscribe((res: any) => {
            this.dataUpdated.emit('refresh');
            this.dialogRef.close(this.form.value);
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

