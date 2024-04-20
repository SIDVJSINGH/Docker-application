import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-emailverify',
  templateUrl: './emailverify.component.html',
  styleUrls: ['./emailverify.component.scss']
})
export class EmailverifyComponent {

  @Output() dataUpdated = new EventEmitter<string>();

 
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder
  ) {
    // Create the form with the necessary form controls and validators
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-z]+$')]],
      content: [''],
      
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}