import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from 'src/app/Services/web.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss'],
})
export class ManageProfileComponent implements OnInit {
  options = [
    { label: 'Athletics', value: 'Athletics' },
    { label: 'Baseball', value: 'Baseball' },
    { label: 'Basketball', value: 'Basketball' },
    { label: 'American football', value: 'American football' },
    { label: 'Soccer', value: 'Soccer' },
    { label: 'Ice hockey', value: 'Ice hockey' },
    { label: 'Tennis', value: 'Tennis' },
    { label: 'Golf', value: 'Golf' },
    { label: 'National Football League', value: 'National Football League' },
    { label: 'MLB', value: 'MLB' },
    { label: 'Boxing', value: 'Boxing' },
    { label: 'Hockey', value: 'Hockey' },
    { label: 'Motor Sports', value: 'Motor Sports' },
    { label: 'Others', value: 'Others' },

    // Add more options as needed
  ];
 













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
  passwordRegex =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
  isActive: boolean = true;
  currentPass: boolean = true;
  newPass: boolean = true;
  confirmPass: boolean = true;
  getlist: any;
  form: FormGroup;
  profile_image: any;
  url: any = '';
  imageUrl: any = 'assets/img/avatar.jpg';
  constructor(
    private webservice: WebService,
    private fb: FormBuilder,
    private route: Router, private datePipe: DatePipe) {
    this.form = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      phone: [''],
      address: [''],
      zip_code: [''],
      height: [''],
      weight: [''],
      dob: [''],
      gender: [''],
      ethnicity: [''],
      marital_status: [''],
      education: [''],
      occupation: [''],
      race: [''],
      income: [''],
      sports:[[]],
      athletics: [''],
      party: [''],
      climbing: [''],
      outing: [''],
      cycling: [''],
      paypal_id: [''],
      currentpassword: [''],
      newpassword: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      confirmpassword: ['',[Validators.required]],
      profile_image: [''],
      state: [''],
      country: ['']
    },{
      validator: this.passwordMatchValidator,
    })
  }
  ngOnInit(): void {
    this.getprofile();
    this.getcountry();
    this.getstate();
    this.getrace();
    this.getethnicity();
    this.getincome();
    this.getsports();
    this.getathletics();
    this.getparty();
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newpassword = control.get('newpassword');
    const confirmPassword = control.get('confirmpassword');

    if (
      newpassword &&
      confirmPassword &&
      newpassword.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null; // Valid
  }
  selectFile: any;
  image1(event: any) {
  const allowedExtensions = ['jpeg', 'png', 'jpg'];
  this.selectFile = event.target.files[0];

  if (this.selectFile) {
    const extension = this.getFileExtension(this.selectFile.name);

    if (allowedExtensions.includes(extension)) {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectFile);

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

      this.form.get('profile_image')?.setValue(this.selectFile);
    } else {
      // Handle invalid file type (not jpeg, png, or jpg)
      console.log('Invalid file type. Please choose a jpeg, png, or jpg file.');
      // You may also want to reset the input or display an error message to the user.
      // For example, clear the input value:
      // event.target.value = null;
    }
  }
}

getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

  getprofile() {
    this.webservice.showLoader();
    try {
      this.webservice.getProfile()
        .subscribe((res: any) => {
          this.webservice.hideLoader();
          if (res.status) {
            this.getlist = res.user;
            this.profile_image = this.getlist.profile_image;

            this.form.patchValue(this.getlist);
          } else {
            this.webservice.notifyError('Something went wrong');
          }
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.webservice.hideLoader();

            this.webservice.notifyError( errorResponse.error.message);
          } else {
            this.webservice.notifyError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      this.webservice.notifyError('Something went wrong');
    }
  }
  formatDate(inputDate: string): any {
    const formattedDate = this.datePipe.transform(inputDate, 'MM-dd-yyyy');
    return formattedDate;
  }
  saveProfile() {
    console.log(this.form.value)
    const payload = {
      password: this.form.value['currentpassword'],
      newPassword: this.form.value['newpassword'],
      confirmPassword: this.form.value['confirmpassword'],
    }
    const formData = new FormData();
    formData.append('first_name', this.form.controls?.['first_name'].value);
    formData.append('country', this.form.controls?.['country'].value);
    formData.append('state', this.form.controls?.['state'].value);
    formData.append('last_name', this.form.controls?.['last_name'].value);
    // formData.append('email', this.form.controls?.['email'].value);
    // formData.append('phone', this.form.controls?.['phone'].value);
    formData.append('address', this.form.controls?.['address'].value);
    formData.append('zip_code', this.form.controls?.['zip_code'].value);
    formData.append('height', this.form.controls?.['height'].value);
    formData.append('weight', this.form.controls?.['weight'].value);
    //   const inpuDate = this.form.value['dob']
    //   const  Dob = this.formatDate(inpuDate);
    // console.log(Dob)
    //   formData.append('dob', Dob);

    formData.append('ethnicity', this.form.controls?.['ethnicity'].value);
    formData.append('marital_status', this.form.controls?.['marital_status'].value);
    formData.append('education', this.form.controls?.['education'].value);
    formData.append('occupation', this.form.controls?.['occupation'].value);
    formData.append('race', this.form.controls?.['race'].value);
    formData.append('income', this.form.controls?.['income'].value);
    formData.append('sports', this.form.controls?.['sports'].value);
    formData.append('athletics', this.form.controls?.['athletics'].value);
    formData.append('party', this.form.controls?.['party'].value);
    formData.append('climbing', this.form.controls?.['climbing'].value);
    formData.append('outing', this.form.controls?.['outing'].value);
    formData.append('cycling', this.form.controls?.['cycling'].value);
    formData.append('paypal_id', this.form.controls?.['paypal_id'].value);
    formData.append('profile_image', this.selectFile);





    this.webservice.showLoader();
    try {
      this.webservice.UpdateProfile(formData)
        .subscribe((res: any) => {
          this.webservice.hideLoader();
          if (res.status == true) {
            localStorage.setItem('user_list', JSON.stringify(res.user));
            this.webservice.updateProfileData(res);
            this.webservice.notifySuccess(res.message);
            localStorage.setItem('status', res.status);
            // this.route.navigateByUrl('/survey-listing');
          } else {
            this.webservice.notifyError(res.message);
          }
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.webservice.hideLoader();
            this.webservice.notifyError( errorResponse.error.message);
          } else {
            this.webservice.notifyError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      this.webservice.notifyError("Internal server error");
    }
  }
  savepass() {
    const payload = {
      password: this.form.value['currentpassword'],
      newPassword: this.form.value['newpassword'],
      confirmPassword: this.form.value['confirmpassword'],
    }
    this.webservice.showLoader();
    try {
      this.webservice.changePassword(payload)
        .subscribe((res: any) => {
          this.webservice.hideLoader();
          if (res.status == true) {
            this.webservice.notifySuccess(res.message);
            this.route.navigateByUrl('/survey-listing');
          } else {
            this.webservice.notifyError(res.message);
          }
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.webservice.hideLoader();
            this.webservice.notifyError( errorResponse.error.message);
          } else {
            this.webservice.notifyError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      this.webservice.notifyError("Internal server error");
    }
  }
  countrydata:any='';
  statedata:any='';
  racedata:any='';
  ethnicity:any;
  incomedata:any='';
  sportsdata:any='';
  athleticsdata:any='';
  partydata:any='';

  getstate() {
    this.webservice.getstate().subscribe((res: any) => {
        if (res.status) {
        this.statedata = res.allOptionsList;
        } else {
        this.webservice.notifyError('Something went wrong');
      }

    })
   }
   getcountry() {
    this.webservice.getcountry().subscribe((res: any) => {
        if (res.status) {
        this.countrydata = res.allOptionsList;
        } else {
        this.webservice.notifyError('Something went wrong');
      }

    })
   }

   getrace() {
    this.webservice.getrace().subscribe((res: any) => {
        if (res.status) {
        this.racedata = res.allOptionsList;
        } else {
        this.webservice.notifyError('Something went wrong');
      }

    })
   }
   getethnicity() {
    this.webservice.getEthnicity().subscribe((res: any) => {
        if (res.status) {
        this.ethnicity = res.allOptionsList;
        } else {
        this.webservice.notifyError('Something went wrong');
      }

    })
   }

   getincome() {
    this.webservice.getincome().subscribe((res: any) => {
        if (res.status) {
        this.incomedata = res.allOptionsList;
        } else {
        this.webservice.notifyError('Something went wrong');
      }

    })
   }

   getsports() {
    this.webservice.getsports().subscribe((res: any) => {
        if (res.status) {
        this.sportsdata = res.allOptionsList;
        } else {
        this.webservice.notifyError('Something went wrong');
      }

    })
   }
   getathletics(){
    this.webservice.getathletics().subscribe((res: any) => {
      if (res.status) {
      this.athleticsdata = res.allOptionsList;
      } else {
      this.webservice.notifyError('Something went wrong');
    }

  })
   }

   getparty(){
    this.webservice.getparty().subscribe((res: any) => {
      if (res.status) {
      this.partydata = res.allOptionsList;
      } else {
      this.webservice.notifyError('Something went wrong');
    }

  })
   }

}
