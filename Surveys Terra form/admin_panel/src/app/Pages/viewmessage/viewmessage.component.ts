import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminserviceService } from 'src/app/Services/adminservice.service';

// import { hasText } from 'html-text-content';

@Component({
  selector: 'app-viewmessage',
  templateUrl: './viewmessage.component.html',
  styleUrls: ['./viewmessage.component.css']
})
export class ViewmessageComponent  implements OnInit{
  @Output() dataUpdated = new EventEmitter<string>();

 
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,private adminService:AdminserviceService,
  ) {
   
    // Create the form with the necessary form controls and validators
    this.form = this.fb.group({
      message:[this.data.message]
      
    });
  }
ngOnInit(): void {
  console.log(this.data.message);
    this.form.patchValue(this.data.message)
}
  onCancel(): void {
    this.dialogRef.close();
  }

 

}