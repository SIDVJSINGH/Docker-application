import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { hasText } from 'html-text-content';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
// function RichTextRequiredValidator(control: FormControl) {
//   let div=document.createElement('div');
//   div.innerHTML=control.value;
//   if(!hasText(div))
//     return {
//       content: 'Content is required'
//     }
//   return null;
// }

@Component({
  selector: 'app-dialogcms',
  templateUrl: './dialogcms.component.html',
  styleUrls: ['./dialogcms.component.css']
})
export class DialogcmsComponent {
  @Output() dataUpdated = new EventEmitter<string>();

  editorConfig: AngularEditorConfig = {
    editable: true,
    uploadUrl: this.adminService.apiUrl + '/cms/add/new-cms'
  };
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogcmsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder, private adminService: AdminserviceService,
  ) {
    // Create the form with the necessary form controls and validators
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-z]+$')]],
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      // You can access the form values using this.form.value

      this.dialogRef.close(this.form.value);

      const payload =
      {
        "name": this.form.value['name'],
        "title": this.form.value['title'],
        "content": this.form.value['text']
      }

      try {

        this.adminService.addCms(payload)
          .subscribe((res: any) => {
            this.dataUpdated.emit('refresh');

            this.adminService.notifySuccess("CMS updated successfully");
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
  }
}


