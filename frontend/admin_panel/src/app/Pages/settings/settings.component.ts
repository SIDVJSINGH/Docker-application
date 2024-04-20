import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminserviceService } from 'src/app/Services/adminservice.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  socialid:any;
  constructor(private adminService: AdminserviceService, private fb: FormBuilder) {
    this.form = this.fb.group(({
      threads_link: ['', Validators.required],
      linkedin_link: ['', Validators.required]

    }))
  }
  ngOnInit(): void {
this.getdata();
  }
  getdata(){
    this.adminService.showLoader();

    this.adminService.getsociallink()
    .subscribe((res:any)=>{
    this.socialid=res.socialLinkData[0]._id;
    this.adminService.hideLoader();

    console.log(this.socialid);
    this.form.patchValue(res.socialLinkData[0])
    },(errorResponse) => {
      // Handle HTTP error response (e.g., 401 Unauthorized)
      if (errorResponse.status) {
        this.adminService.hideLoader();

        this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
      } else {
        this.adminService.hideLoader();

        this.adminService.notifyError("An error occurred. Please try again later.");
      }
    });
  }
  id: any;
  onSubmit(): void {

this.adminService.showLoader();



    try {
      const payload = {
        threads_link: this.form.value['threads_link'],
        linkedin_link: this.form.value['linkedin_link']
      }
      this.adminService.Sociallink(this.socialid, payload)
        .subscribe((res: any) => {
          this.getdata();
          this.adminService.hideLoader();
          this.adminService.notifySuccess(res.message)
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.adminService.hideLoader();

            this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
          } else {
            this.adminService.hideLoader();

            this.adminService.notifyError("An error occurred. Please try again later.");
          }
        });

    } catch (e) {
      this.adminService.notifyError("something send wrong")
    }

  }
}

