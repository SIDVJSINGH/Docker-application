import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdminserviceService } from 'src/app/Services/adminservice.service';


@Component({
  selector: 'app-addathletics',
  templateUrl: './addathletics.component.html',
  styleUrls: ['./addathletics.component.css']
})
export class AddathleticsComponent implements OnInit {

  @Output() dataUpdated = new EventEmitter<string>();

 
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder, private adminService: AdminserviceService,
  ) {
    // Create the form with the necessary form controls and validators
    this.form = this.fb.group({
      label: ['', Validators.required],
      value: ['', Validators.required],
     
    });
  }
  private iti: any; // Reference to intlTelInput instance

  ngOnInit(): void {
    

    
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  phoneNumber:any;
  onSubmit(): void {
   
    
    const payload = {
      label: this.form.value['label'],
      value: this.form.value['value'],
      

    }
    if (this.form.valid) {
     


      try {

        this.adminService.addathletics(payload)
          .subscribe((res: any) => {
            this.dataUpdated.emit('refresh');
            this.dialogRef.close();

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

