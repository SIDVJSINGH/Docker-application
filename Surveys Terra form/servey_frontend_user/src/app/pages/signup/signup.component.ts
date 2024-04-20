import { DatePipe } from '@angular/common';
import { TermsModalComponent } from '../terms-modal/terms-modal.component';
import { PrivacyModalComponent } from '../privacy-modal/privacy-modal.component';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { timer, subscribeOn, Subscription } from 'rxjs';
import { WebService } from 'src/app/Services/web.service';
import * as intlTelInput from 'intl-tel-input';
import { MatDialog } from '@angular/material/dialog';
import { TermsAndConditionsComponent } from 'src/app/components/terms-and-conditions/terms-and-conditions.component';
import Swal from 'sweetalert2';
import { MatDatepickerInputEvent } from '@angular/material/datepicker'; // Import MatDatepickerInputEvent
import { ToastrService } from 'ngx-toastr';
import { EmailverifyComponent } from '../emailverify/emailverify.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  
  @ViewChild('Otp1', { read: ElementRef }) otpInput!: ElementRef;
  @ViewChild('Otp11', { read: ElementRef }) otpInput1!: ElementRef;
  
  // states = [
  //   {
  //     "name": "Alabama",
  //     "abbreviation": "AL"
  //   },
  //   {
  //     "name": "Alaska",
  //     "abbreviation": "AK"
  //   },
  //   {
  //     "name": "American Samoa",
  //     "abbreviation": "AS"
  //   },
  //   {
  //     "name": "Arizona",
  //     "abbreviation": "AZ"
  //   },
  //   {
  //     "name": "Arkansas",
  //     "abbreviation": "AR"
  //   },
  //   {
  //     "name": "California",
  //     "abbreviation": "CA"
  //   },
  //   {
  //     "name": "Colorado",
  //     "abbreviation": "CO"
  //   },
  //   {
  //     "name": "Connecticut",
  //     "abbreviation": "CT"
  //   },
  //   {
  //     "name": "Delaware",
  //     "abbreviation": "DE"
  //   },
  //   {
  //     "name": "District Of Columbia",
  //     "abbreviation": "DC"
  //   },
  //   {
  //     "name": "Federated States Of Micronesia",
  //     "abbreviation": "FM"
  //   },
  //   {
  //     "name": "Florida",
  //     "abbreviation": "FL"
  //   },
  //   {
  //     "name": "Georgia",
  //     "abbreviation": "GA"
  //   },
  //   {
  //     "name": "Guam",
  //     "abbreviation": "GU"
  //   },
  //   {
  //     "name": "Hawaii",
  //     "abbreviation": "HI"
  //   },
  //   {
  //     "name": "Idaho",
  //     "abbreviation": "ID"
  //   },
  //   {
  //     "name": "Illinois",
  //     "abbreviation": "IL"
  //   },
  //   {
  //     "name": "Indiana",
  //     "abbreviation": "IN"
  //   },
  //   {
  //     "name": "Iowa",
  //     "abbreviation": "IA"
  //   },
  //   {
  //     "name": "Kansas",
  //     "abbreviation": "KS"
  //   },
  //   {
  //     "name": "Kentucky",
  //     "abbreviation": "KY"
  //   },
  //   {
  //     "name": "Louisiana",
  //     "abbreviation": "LA"
  //   },
  //   {
  //     "name": "Maine",
  //     "abbreviation": "ME"
  //   },
   
  //   {
  //     "name": "Maryland",
  //     "abbreviation": "MD"
  //   },
  //   {
  //     "name": "Massachusetts",
  //     "abbreviation": "MA"
  //   },
  //   {
  //     "name": "Michigan",
  //     "abbreviation": "MI"
  //   },
  //   {
  //     "name": "Minnesota",
  //     "abbreviation": "MN"
  //   },
  //   {
  //     "name": "Mississippi",
  //     "abbreviation": "MS"
  //   },
  //   {
  //     "name": "Missouri",
  //     "abbreviation": "MO"
  //   },
  //   {
  //     "name": "Montana",
  //     "abbreviation": "MT"
  //   },
  //   {
  //     "name": "Nebraska",
  //     "abbreviation": "NE"
  //   },
  //   {
  //     "name": "Nevada",
  //     "abbreviation": "NV"
  //   },
  //   {
  //     "name": "New Hampshire",
  //     "abbreviation": "NH"
  //   },
  //   {
  //     "name": "New Jersey",
  //     "abbreviation": "NJ"
  //   },
  //   {
  //     "name": "New Mexico",
  //     "abbreviation": "NM"
  //   },
  //   {
  //     "name": "New York",
  //     "abbreviation": "NY"
  //   },
  //   {
  //     "name": "North Carolina",
  //     "abbreviation": "NC"
  //   },
  //   {
  //     "name": "North Dakota",
  //     "abbreviation": "ND"
  //   },
 
  //   {
  //     "name": "Ohio",
  //     "abbreviation": "OH"
  //   },
  //   {
  //     "name": "Oklahoma",
  //     "abbreviation": "OK"
  //   },
  //   {
  //     "name": "Oregon",
  //     "abbreviation": "OR"
  //   },
   
  //   {
  //     "name": "Pennsylvania",
  //     "abbreviation": "PA"
  //   },
  //   {
  //     "name": "Puerto Rico",
  //     "abbreviation": "PR"
  //   },
  //   {
  //     "name": "Rhode Island",
  //     "abbreviation": "RI"
  //   },
  //   {
  //     "name": "South Carolina",
  //     "abbreviation": "SC"
  //   },
  //   {
  //     "name": "South Dakota",
  //     "abbreviation": "SD"
  //   },
  //   {
  //     "name": "Tennessee",
  //     "abbreviation": "TN"
  //   },
  //   {
  //     "name": "Texas",
  //     "abbreviation": "TX"
  //   },
  //   {
  //     "name": "Utah",
  //     "abbreviation": "UT"
  //   },
  //   {
  //     "name": "Vermont",
  //     "abbreviation": "VT"
  //   },
  //   {
  //     "name": "Virgin Islands",
  //     "abbreviation": "VI"
  //   },
  //   {
  //     "name": "Virginia",
  //     "abbreviation": "VA"
  //   },
  //   {
  //     "name": "Washington",
  //     "abbreviation": "WA"
  //   },
  //   {
  //     "name": "West Virginia",
  //     "abbreviation": "WV"
  //   },
  //   {
  //     "name": "Wisconsin",
  //     "abbreviation": "WI"
  //   },
  //   {
  //     "name": "Wyoming",
  //     "abbreviation": "WY"
  //   }
  // ]
  
  isReadOnly: boolean = false; // Set this based on your logic
  selectedDate:any= Date;

  password: boolean = true;
  confirmPassword: boolean = true;
  btnDisable: boolean = false;
  showEmailOtp: boolean = false;
  showPhoneOtp: boolean = false;
  mainphoneshow: boolean = false;
  creteshow: boolean = false;
  selectFile: any;
  fileName: any;
  // emailBtnText: any = 'Send OTP';
  // timeLeft: number = 10;
  // subscribeTimer: any = 20;
  form: FormGroup;
  is_accept_terms_and_conditions: boolean = false;


  showphoneOtp: boolean = false;
  timeLeft: number = 180;

  subscribeTimer: number | undefined;
  emailBtnText: any = 'Submit';
  emailBtnText1:any="Submit"
  phoneBtnText: any = 'Send';
  phoneBtnText1: any = 'Submit';
  isemailvarified: any;
  isphonevarified: any;
  emailInputReadOnly: boolean = false;
  phoneInputReadOnly: boolean = false;
  emailshow: boolean = true;
  mainemailshow: boolean = false;
  emailotpshow: boolean = false;
  emailtimer:boolean=true;
  resendotp:boolean=false;
  phonetimer:boolean=true;
  resendotp1:boolean=false;
  phoneshow1: boolean = false;
  otpphone: boolean = false;
  showemail: boolean = false;
  passwordRegex =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;

  showPhone: boolean = false;
  private timerSubscription!: Subscription;
  constructor(
    private webservice: WebService,
    private fb: FormBuilder,
    private route: Router,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private toastr: ToastrService,
  
  ) {
    this.form = this.fb.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        // address: ['', [Validators.required]],
        //zip_code: ['', [Validators.required,this.positiveNumberValidator]],
        dob: ['', [Validators.required, this.dateOfBirthValidator ]],
        gender: ['', [Validators.required]],
        // image: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
        confirmPassword: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
        country:['', [Validators.required]],
        state: ['', [Validators.required]],
        is_accept_terms_and_conditions: [false, [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator, // Custom validator function
      }
    );
  }
  openTermsModal() {
    this.dialog.open(TermsModalComponent);
  }
  openPrivacyModal() {
    this.dialog.open(PrivacyModalComponent);
  }
  private iti: any; // Reference to intlTelInput instance

  ngOnInit(): void {
    this.getcountry();
    this.getstate();
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
 
  onDateChange(event: any): void {
    const selectedDate = event.value;
    console.log('Selected date:', selectedDate);
  }

 getTextColor(): string {
    return this.emailBtnText < 20 ? 'red' : 'green';
    
  }
  getTextColor1(): string {
    return this.phoneBtnText < 20 ? 'red' : 'green';
    
  }

  image1(event: any) {
    const input = event.target as HTMLInputElement;
    console.log(input);
    console.log(event);
    if (input.files && input.files.length > 0) {
      this.selectFile = input.files[0];

      this.fileName = input.files[0].name;
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
  // positiveNumberValidator(control: FormControl) {
  //   const value = control.value;
  
  //   if (value === null || value === undefined) {
  //     return null; // Valid if the value is not set
  //   }
  
  //   const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
  //   const isPositive = value >= 0;
  
  //   return isNumeric && isPositive ? null : { 'positiveNumber': true };
  // }
  
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null; // Valid
  }
  // emailOtp() {
  //   this.showEmailOtp = true;

  //   const source = timer(1000, 2000);
  //   const abc = source.subscribe((val) => {
  //     console.log(val, '-');
  //     this.subscribeTimer = this.timeLeft - val;
  //     this.emailBtnText = this.subscribeTimer;
  //   });
  //   // this.emailBtnText = 'Verified';
  // }
  showDiv: boolean = true;
  emailOtp() {
 
     
    console.log(this.form.value);
    // this.emailInputReadOnly = true;
    this.subscribeTimer = this.timeLeft;
    this.emailBtnText = this.subscribeTimer;

    // Start the timer using RxJS timer
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(1000, 1000).subscribe((val) => {
      this.subscribeTimer = this.timeLeft - val;
      if (this.subscribeTimer === 0) {
        // this.showEmailOtp = false;
        this.emailInputReadOnly = false;
        this.isReadOnly = false; // Set this based on your logic


      
         this.resendotp=true;
        this.emailtimer=false;
        this.emailotpshow = true;

        this.emailBtnText1 = 'Resend';
        this.timerSubscription.unsubscribe();
      } else {
        this.emailBtnText = this.subscribeTimer.toString();
      }
    });
    console.log(this.form.value);
    if (this.form.valid) {
      const payload = {
        email: this.form.value['email'],
      };
      this.webservice.sendEmail(payload).subscribe(
        (response: any) => {
          if (response.status == true) {
            // this.showEmailOtp = true;
            this.emailInputReadOnly = true;
            this.isReadOnly = true; // Set this based on your logic

            this.emailshow = false;
            this.resendotp=false;
            this.emailtimer=true;
            this.showemail = true;

            this.emailotpshow = true;
            this.webservice.notifySuccess("We have sent you a six digit One Time Password (OTP) to your registered email address");
          }
          else {
            this.timerSubscription.unsubscribe();

            // this.showEmailOtp = false;
            this.emailInputReadOnly = false;
            this.isReadOnly = false; // Set this based on your logic

            this.emailshow = true;

            this.showemail = false;

        

          }
        },
        (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.webservice.notifyError(
              errorResponse.error.message 
            );
            // this.showEmailOtp = false;
            this.timerSubscription.unsubscribe();

            this.emailInputReadOnly = false;
          } else {
            this.webservice.notifyError(
              'An error occurred. Please try again later.'
            );
          }
        }
      );
    }
    else {
      // Show a message to the user to fill out all the required fields
      this.webservice.notifyError1('Please fill out all the required fields and age should be above 16.');
    }

  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  public get phone() {
    return this.form.get('password') as FormControl;
  }
  phoneOtp() {
    this.phoneInputReadOnly = true;

    this.subscribeTimer = this.timeLeft;
    this.phoneBtnText = this.subscribeTimer;

    // Start the timer using RxJS timer
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(1000, 1000).subscribe((val) => {
      this.subscribeTimer = this.timeLeft - val;
      if (this.subscribeTimer === 0) {
        // this.showPhoneOtp = false;

        this.phoneBtnText1 = 'Resend';
      this.resendotp1=true;
      this.phonetimer=false;
        this.showPhone = true;
     
        this.timerSubscription.unsubscribe();
      } else {
        this.phoneBtnText = this.subscribeTimer.toString();
      }
    }); if (this.iti) {
      // Get the selected phone number and country code
      const selectedCountryData = this.iti.getSelectedCountryData();
      const countryCode = selectedCountryData.dialCode;
      this.phoneNumber = this.iti.getNumber();
      const payload1 = {
        phone: this.phoneNumber,
      };
      this.webservice.sendPhone(payload1).subscribe(
        (response: any) => {
          if (response.status == true) {
            // this.showPhoneOtp=true
            this.phoneBtnText = 'Send';
            this.otpphone = true;
            this.showPhone = true;
            this.phoneshow1 = false;
            this.webservice.notifySuccess("We have sent you a six digit One Time Password (OTP)");

          } else {
            // this.showPhoneOtp = false;
            this.timerSubscription.unsubscribe();

          }
        },
        (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            // this.showPhoneOtp=false;
            this.timerSubscription.unsubscribe();

            this.webservice.notifyError(
              'Phone is not allowed to be empty'
            );

          } else {
            this.webservice.notifyError(
              'Phone is not allowed to be empty'
            );
          }
        }
      );
    }
  }

  emailVerify() {

    const payload11 = {
      email: this.form.value['email'],
      otp: this.otpInput.nativeElement.value
    };
    this.webservice.emailVarification(payload11).subscribe(
      (response: any) => {
        if (response.status == true) {
          this.emailBtnText = 'Verified';
          this.isemailvarified = response.status;
          // this.showEmailOtp = false;
          this.emailotpshow = false;
          this.phoneshow1 = true;
          this.mainemailshow = true;
          this.showemail = false;
          this.creteshow = true;
          this.showDiv = !this.showDiv;
          this.timerSubscription.unsubscribe();
          // this.webservice.notifySuccess(response.message);
          // Swal.fire("You have successfully verified your email address. Please put your phone number in the registration form field to continue the process.");
          const dialogRef = this.dialog.open(EmailverifyComponent, {
     
            data: {} // You can pass any data you want to the dialog here
          });
      
          dialogRef.componentInstance.dataUpdated.subscribe((result: string) => {
            if (result === 'refresh') {
              // Call the getcms method to refresh the data
             
            }
          });
          // this.webservice.notifySuccess("")
        }
      },
      (errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.webservice.notifyError(
            'Please enter valid OTP sent on your entered email address'
          );
        } else {
          this.webservice.notifyError(
            'Please enter valid OTP sent on your entered email address'
          );
        }
      }
    );
  }
  phoneVerify() {
    if (this.iti) {
      // Get the selected phone number and country code
      const selectedCountryData = this.iti.getSelectedCountryData();
      const countryCode = selectedCountryData.dialCode;
      this.phoneNumber = this.iti.getNumber();
      const payload12 = {
        phone: this.phoneNumber,
        otp: this.otpInput1.nativeElement.value
      };

      this.webservice.phoneVarification(payload12).subscribe(
        (response: any) => {
          if (response.status == true) {
            this.phoneBtnText = 'Verified';
            this.isphonevarified = response.status;
            this.showPhone = false;
            // this.showPhoneOtp = false;
            this.otpphone = false;
            this.mainphoneshow = true;
            this.creteshow = true;
            this.timerSubscription.unsubscribe();
            this.webservice.notifySuccess(response.message);
          }
        },
        (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.webservice.notifyError(
              'Please enter valid OTP sent on your entered phone number'
            );
          } else {
            this.webservice.notifyError(
              'Please enter valid OTP sent on your entered phone number'
            );
          }
        }
      );
    }
  }
  formatDate(inputDate: string): any {
    const formattedDate = this.datePipe.transform(inputDate, 'dd-MM-yyyy');
    return formattedDate;
  }
  phoneNumber: any;
  countryCode: any;
  onCreate() {

    // Save the registration data or perform other actions
    if (this.iti) {
      // Get the selected phone number and country code
      const selectedCountryData = this.iti.getSelectedCountryData();
      const countryCode = selectedCountryData.dialCode;
      this.phoneNumber = this.iti.getNumber();
      console.log("country", countryCode)
      console.log("phoneNumber", this.phoneNumber)
    }
    const formData = new FormData();
    formData.append('email', this.form.controls?.['email'].value);
    formData.append('password', this.form.controls?.['password'].value);
    formData.append(
      'confirm_password',
      this.form.controls?.['confirmPassword'].value
    );
    formData.append('first_name', this.form.controls?.['first_name'].value);
    formData.append('last_name', this.form.controls?.['last_name'].value);
    formData.append('country', this.form.controls?.['country'].value);
    formData.append('state', this.form.controls?.['state'].value);
    // formData.append('phone', this.phoneNumber);
    formData.append(
      'is_accept_terms_and_conditions',
      this.form.controls?.['is_accept_terms_and_conditions'].value
    );
    // formData.append('profile_image', this.selectFile);
    formData.append('zip_code', this.form.controls?.['zip_code'].value);
    const inpuDate = this.form.value['dob'];
    const Dob = this.formatDate(inpuDate);
    console.log(Dob);
    formData.append('dob', Dob);
    formData.append('gender', this.form.controls?.['gender'].value);
    formData.append('isEmailVerified', this.isemailvarified);
    // formData.append('isPhoneVerified', this.isphonevarified);

    this.webservice.showLoader();

    try {
      this.webservice.SignUp(formData).subscribe(
        (res: any) => {
          console.log(res);
          this.webservice.hideLoader();
          if (res.status) {
            this.webservice.notifySuccess(res.message);
            console.log(res.message);
            localStorage.setItem('user_list', JSON.stringify(res.user));
            localStorage.setItem('tokens', JSON.stringify(res.tokens));
            localStorage.setItem('token', res.tokens.access.token);
            localStorage.setItem('refreshtoken', res.tokens.refresh.token);
            localStorage.setItem('id', res.user.id);
            this.route.navigateByUrl('/survey-listing');
          } else {
            // Display the backend error message when login fails
            this.webservice.notifyError('Login failed. ' + res.message);
          }
        },
        (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.webservice.hideLoader();

            this.webservice.notifyError(
              'An error occurred. Please try again later.'
            );
          } else {
            this.webservice.notifyError(
              
              'An error occurred. Please try again later.'
            );
            this.webservice.hideLoader();

          }
        }
      );
    } catch (error) {
      this.webservice.notifyError('Something went wrong !');
    }
    console.log('Form data saved:', this.form.value);


  }

  openTermsConditions() {
    const dialogRef = this.dialog.open(TermsAndConditionsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  statedata:any='';

  getstate() {
    this.webservice.getstate().subscribe((res: any) => {
        if (res.status) {
        this.statedata = res.allOptionsList;
        console.log(this.statedata)
        } else {
        this.webservice.notifyError('Something went wrong');
      }

    })
   }
   countrydata:any='';

  getcountry() {
    this.webservice.getcountry().subscribe((res: any) => {
        if (res.status) {
        this.countrydata = res.allOptionsList;
        console.log(this.countrydata)
        } else {
        this.webservice.notifyError('Something went wrong');
      }

    })
   }
}
