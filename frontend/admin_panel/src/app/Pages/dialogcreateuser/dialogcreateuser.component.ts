import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { hasText } from 'html-text-content';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AdminserviceService } from 'src/app/Services/adminservice.service';

@Component({
  selector: 'app-dialogcreateuser',
  templateUrl: './dialogcreateuser.component.html',
  styleUrls: ['./dialogcreateuser.component.css']
})
export class DialogcreateuserComponent implements OnInit {
  @Output() dataUpdated = new EventEmitter<string>();
  datalist: any='';
  userId: any;


  constructor(
    private dialogRef: MatDialogRef<DialogcreateuserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder, private adminService: AdminserviceService,
  ) {
    // Create the form with the necessary form controls and validators
    this.userId = data.userId; // Assigning the userId from the data object

  }
  ngOnInit(): void {
    this.getdeatials()
  }
  onCancel(): void {
    this.dialogRef.close();
  }
Image:any;
  getdeatials() {
    this.adminService.getUserbyid(this.userId)
      .subscribe((res: any) => {
        this.datalist = res;
        this.Image=res.profile_image;
      }, (errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {

          this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
        } else {
          this.adminService.notifyError("An error occurred. Please try again later.");
        }
      });
  }


}

