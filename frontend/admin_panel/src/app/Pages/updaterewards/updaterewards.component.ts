import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { hasText } from 'html-text-content';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AdminserviceService } from 'src/app/Services/adminservice.service';

@Component({
  selector: 'app-updaterewards',
  templateUrl: './updaterewards.component.html',
  styleUrls: ['./updaterewards.component.css']
})
export class UpdaterewardsComponent implements OnInit {


  @Output() dataUpdated = new EventEmitter<string>();
  Id: any;

  form: FormGroup;
alldata:any;
  constructor(
    private dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,private adminService:AdminserviceService,
  ) {
    this.Id = data.userId; // Assigning the userId from the data object

    // Create the form with the necessary form controls and validators
    this.form = this.fb.group({
      status:[''],
      reward_earned_value:['']
    });
  }
ngOnInit(): void {
  this.getrewards();
}
  onCancel(): void {
    this.dialogRef.close();
  }

  getrewards(){
    try{
   
        this.adminService.getRewardsbyid(this.Id)
        .subscribe((res:any)=>{
          this.dataUpdated.emit('refresh');
      this.alldata=res.getRewardDetails;
      this.form.patchValue(this.alldata)
          // this.adminService.notifySuccess(res.message)
        },(errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
      
            this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
          } else {
            this.adminService.notifyError("An error occurred. Please try again later.");
          }
        });
      
      }catch(e){
      this.adminService.notifyError("something send wrong")
      }
  }

  onSubmit(): void {
   
    if (this.form.valid) {
      // You can access the form values using this.form.value
    
      this.dialogRef.close(this.form.value);






try{
const payload={
  status:this.form.value['status'],
  reward_earned_value:this.form.value['reward_earned_value']
}
  this.adminService.updateRewards(this.Id,payload)
  .subscribe((res:any)=>{
    this.dataUpdated.emit('refresh');

    this.adminService.notifySuccess(res.message)
  },(errorResponse) => {
    // Handle HTTP error response (e.g., 401 Unauthorized)
    if (errorResponse.status) {

      this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
    } else {
      this.adminService.notifyError("An error occurred. Please try again later.");
    }
  });

}catch(e){
this.adminService.notifyError("something send wrong")
}
   
    }
  }
}

