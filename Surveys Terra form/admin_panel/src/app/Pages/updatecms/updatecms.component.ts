import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
function hasText(element:any) {
  // Check if the element has non-empty text content
  return element.textContent.trim().length > 0;
}
function RichTextRequiredValidator(control: FormControl) {
  let div=document.createElement('div');
  div.innerHTML=control.value;
  if(!hasText(div))
    return {
      content: 'Content is required'
    }
  return null;
}

@Component({
  selector: 'app-updatecms',
  templateUrl: './updatecms.component.html',
  styleUrls: ['./updatecms.component.css']
})
export class UpdatecmsComponent implements OnInit {
  selectFile: any;
  cmsId:any='';
  cmsContent:any='';
  pagename:string='...';
  editorConfig: AngularEditorConfig = {
    editable: true,
    uploadUrl: this.adminService.apiUrl+'/cms/add/new-cms'
  };
  formGroup!:FormGroup;
  plainText=false;

  constructor(private adminService:AdminserviceService,
    private route: ActivatedRoute, private fb:FormBuilder, private router:Router) {
      this.cmsId=this.route.snapshot.paramMap.get('id');
      this.editorConfig.uploadUrl+=this.cmsId;
     
  }


  ngOnInit() {
    this.formGroup=this.fb.group({
      text: ['', [Validators.required, RichTextRequiredValidator]],
      title:[''],
   email:['']
    })
    // this.loadData();
    this.getCmsbyId();
 
  }

  sendImage() {
    const formData = this.formGroup.value;
    // Handle sending the image data

  }

 
  onGalary(){
    this.router.navigate(['/main/cms/edit/image',this.cmsId])
  }
  contact:any;
getCmsbyId(){
this.adminService.showLoader();
  try{
   this.adminService.getCmsByid(this.cmsId)
   .subscribe((response:any)=>{
   this.adminService.hideLoader();
    if(response.status){
      // this.adminService.notifySuccess(response.message);
   this.contact=response.cms.name;
      this.formGroup.patchValue({text: response.cms.content})
      this.formGroup.patchValue({title: response.cms.title})
      this.formGroup.patchValue({email: response.cms.email})
      //this.cmsContent=;
      this.pagename=response.cms.title;
      this.plainText=(response.cms.name.startsWith('welcome-message'));
    }else{
      this.adminService.notifyError(response.message);
    }
   },(errorResponse) => {
    // Handle HTTP error response (e.g., 401 Unauthorized)
    if (errorResponse.status) {
      this.adminService.hideLoader();

      this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
    } else {
      this.adminService.notifyError("An error occurred. Please try again later.");
    }
  });
 
   
  }catch(e){
  

    this.adminService.notifyError('Internal Server Error');
  }
}

image1(event: any) {

  this.selectFile = event.target.files[0];

  


  // this.updateuserForm.get('profile_image')?.setValue(this.selectFile) as unknown as FormControl;




}
 
  savecms(){
   
     try{
     const payload={
      "content":this.formGroup.value['text'],
      "title":this.formGroup.value['title']
     }
     const fdata=new FormData();

   
     if (this.selectFile) {
 
       fdata.append('images', this.selectFile);
     }
     fdata.append('content', this.formGroup.controls?.["text"].value);
     fdata.append('title', this.formGroup.controls?.["title"].value);
     fdata.append('email', this.formGroup.controls?.["email"].value);

     this.adminService.cmsUpdate(this.cmsId,fdata).subscribe
     ((response:any)=>{
  
      if(response.status){
        this.adminService.notifySuccess(response.message);
        this.router.navigateByUrl('/main/cms');
     
      }else{
        this.adminService.notifyError(response.message);
      }
     },(errorResponse) => {
      // Handle HTTP error response (e.g., 401 Unauthorized)
      if (errorResponse.status) {

        this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
      } else {
        this.adminService.notifyError("An error occurred. Please try again later.");
      }
    });
     
    }catch(e){
 

      this.adminService.notifyError("Internal server error");
    }
  }
}

