import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/Services/adminservice.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any = '';
  profileUpdatedData: any = '';
  profileForm!: FormGroup;
  fetchError = false;


  applicantForm: any;
  imageUrl: any;
  profile_image: any
  imageEdit: any;
  imageUrl1: any = 'assets/logo/defaultlogo5.png';

  selectFile: any;
  url: any;
  uId: any
  profileUpdate: any;
  updateuserForm: any;
  constructor(public formbuilder: FormBuilder, private adminService: AdminserviceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProfileData()
    // this.profileForm = this.formbuilder.group({
    //   address: [''],
    //   last_name: [''],//, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)])],
    //   email: [''],

    //   //profile: this.formbuilder.group({
    //   phone: ['', Validators.compose([Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)])],
    //   gender:[''],
    //   first_name: [''],
    //   profile_image: ['']


    //   //})
    // });
    this.profileForm = this.formbuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      // phone: [''],
      gender: [''],
      profile_image: [''],
      address: ['']

    })
  }
element:any;
  getProfileData() {
    this.adminService.getProfile()
      .subscribe((res: any) => {
        this.profileData = res.user;
        this.profileForm.patchValue(this.profileData);
this.element= res.user.profile_image;
      })
  }

  image1(event: any) {

    this.selectFile = event.target.files[0];
    var reader = new FileReader
    reader.readAsDataURL(this.selectFile);
    reader.onload = (event: any) => {
      this.url =
        this.url = event.target.result;
    }

    this.profileForm.get('profile_image')?.setValue(this.selectFile) as unknown as FormControl;



  }
  onUpdate(r1: any, r2: any) {
    let gender = '';
    if (r1.checked)
      gender = r1.value;
    else if (r2.checked)
      gender = r2.value;

    const fdata = new FormData();
    if (this.selectFile) {

      fdata.append('profile_image', this.selectFile);
    }
    fdata.append('first_name', this.profileForm.controls?.["first_name"].value);
    fdata.append('last_name', this.profileForm.controls?.["last_name"].value);
    // fdata.append('email', this.profileForm.controls?.["email"].value);
    // fdata.append('phone', this.profileForm.controls?.["phone"].value);
    fdata.append('gender', this.profileForm.controls?.["gender"].value);
    fdata.append('address', this.profileForm.controls?.["address"].value);

    // fdata.append('userId', this.uId);
    this.adminService.updateProfile(fdata)
      .subscribe((res: any) => {
        this.adminService.notifySuccess(res.message);
        this.getProfileData();
      })

  }

}
