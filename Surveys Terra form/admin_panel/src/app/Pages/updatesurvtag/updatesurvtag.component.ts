import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
@Component({
  selector: 'app-updatesurvtag',
  templateUrl: './updatesurvtag.component.html',
  styleUrls: ['./updatesurvtag.component.css']
})
export class UpdatesurvtagComponent {
  surveyForm!: FormGroup
  selectFile: any;
  url: any;
  updateId: any;
  surveyList: any;

  constructor(private formBuilder: FormBuilder,private  route: ActivatedRoute,private router:Router, private updateService:AdminserviceService){
    this.updateId=this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.onEditsurveyget();
    this.surveyForm = this.formBuilder.group({
      image:[''],
      tag_name: ['']

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
  }
  onEditsurveyget(){
    this.updateService.getAllSurveyTagById(this.updateId)
    .subscribe((res:any)=>{
      this.surveyList=res.surveyType;

      this.surveyForm.patchValue(this.surveyList);

    })
  
  }

  onUpdate(){
    const fdata = new FormData();
    
    if (this.selectFile) {

      fdata.append('image', this.selectFile);
    }
    fdata.append('tag_name', this.surveyForm.controls?.["tag_name"].value);
    this.updateService.getSurveyTagUpdate(this.updateId,fdata)
    .subscribe((res:any)=>{
      this.updateService.notifySuccess(res.message);
    
      
    },(errorResponse) => {
      // Handle HTTP error response (e.g., 401 Unauthorized)
      if (errorResponse.status) {
        this.updateService.hideLoader();

        this.updateService.notifyError("This title already exist,please enter unique title");
      } else {
        this.updateService.notifyError("This title already exist,please enter unique title");
      }
    });

  }
}
