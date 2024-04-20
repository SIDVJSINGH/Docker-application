import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
@Component({
  selector: 'app-updatesurveytype',
  templateUrl: './updatesurveytype.component.html',
  styleUrls: ['./updatesurveytype.component.css']
})
export class UpdatesurveytypeComponent {
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
      type_name: [''],

      // survey_category:[''],
      // survey_description:[''],
      // start_date_time:[''],
      // end_date_time:[''],
      // complete_time:[''],
      // // status:[''],
      // url:['']


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
    this.updateService.getSurveyTypeById(this.updateId)
    .subscribe((res:any)=>{
      this.surveyList=res.surveyType;

      this.surveyForm.patchValue(this.surveyList);

    },
    (errorResponse) => {
      // Handle HTTP error response (e.g., 401 Unauthorized)
      if (errorResponse.status) {
        this.updateService.hideLoader();

        this.updateService.notifyError("This title already exist,please enter unique title");
      } else {
        this.updateService.notifyError("This title already exist,please enter unique title");
      }
    });
  
  }

  onUpdate(){
    const fdata = new FormData();
    
    if (this.selectFile) {

      fdata.append('image', this.selectFile);
    }
    fdata.append('type_name', this.surveyForm.controls?.["type_name"].value);
    // fdata.append('survey_description', this.surveyForm.controls?.["survey_description"].value);
    // fdata.append('survey_category', this.surveyForm.controls?.["survey_category"].value);
    // fdata.append('start_date_time', this.surveyForm.controls?.["start_date_time"].value);
    // fdata.append('end_date_time', this.surveyForm.controls?.["end_date_time"].value);
    // fdata.append('complete_time', this.surveyForm.controls?.["complete_time"].value);
    // fdata.append('url', this.surveyForm.controls?.["url"].value);

    this.updateService.getSurveyTypeUpdate(this.updateId,fdata)
    .subscribe((res:any)=>{
      this.updateService.notifySuccess(res.message);
    
      
    })

  }

}
