import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-updatesurvey',
  templateUrl: './updatesurvey.component.html',
  styleUrls: ['./updatesurvey.component.css']
})
export class UpdatesurveyComponent implements OnInit {
  surveyForm!: FormGroup
  selectFile: any;
  url: any;
  updateId: any;
  surveyList: any;

  public showRange1: number = 16;
  public showRange2: number = 100;
  public userData: any = {};
  typelist: any;
  tagList: any;
  imageUrl1: any = 'assets/logo/defaultlogo5.png';



  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder,private  route: ActivatedRoute,private router:Router, private updateService:AdminserviceService){
    this.updateId=this.route.snapshot.paramMap.get('id');


  }

  ngOnInit(): void {
    this.onEditDataget();
    this.getTypeSurvey();
    this.getSurveyTag();
 
    this.surveyForm = this.formBuilder.group({
      // image:[''],
      title: ['', Validators.required],
      survey_category:[''],
      survey_description:[''],
      start_date_time: ['', [this.futureDateValidator()]],
      end_date_time: ['', [this.futureDateValidator()]],
      complete_time:[''],
      status:[false],
      url:[''],
      min_age_range: ['16', Validators.required],
      max_age_range: ['100', Validators.required],
      survey_type_id:[],



    },{ validator: this.ageRangeValidator })
  }
  ageRangeValidator: any = (control: AbstractControl): ValidationErrors | null => {
    const minAge = control.get('min_age_range')?.value;
    const maxAge = control.get('max_age_range')?.value;
  
    // Check if min age is greater than max age
    if (minAge !== null && maxAge !== null && minAge >= maxAge) {
      return { ageRangeInvalid: true };
    }
  
    return null;
  };

  futureDateValidator() {
    return (control:any) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      // Set the current date to the start of the day to exclude the current date
      const startOfCurrentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      if (selectedDate <= startOfCurrentDate) {
        return { pastDate: true }; // Validation error if the date is in the past or equal to current date
      }

      return null; // Validation passes
    };
  }

  // Accessor function to simplify template code
  get startDateTime() {
    return this.surveyForm.get('start_date_time');
  }
  formatDate(inputDate: string): any {
    const formattedDate = this.datePipe.transform(inputDate, 'dd-MM-yyyy,hh:mm a');
    return formattedDate;
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
  
  formatDateForInput(dateString: string): string {
    // Assuming the date format is always 'DD-MM-YYYY,hh:mm A'
    // Adjust the format as needed
    const [datePart, timePart] = dateString.split(',');
    const [day, month, year] = datePart.split('-');
    const [hour, minutePart] = timePart.trim().split(':');
    
    // Remove AM/PM if present
    const [minute, period] = minutePart.split(' ');
    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;
    
    return formattedDate;
  }
  
  
  
  
  backendImageUrl:any='';
  onEditDataget(){
    this.updateService.getSurveyListById(this.updateId)
    .subscribe((res:any)=>{
      this.surveyList=res.surveyCategory;
 this.backendImageUrl=this.surveyList.image;

      // this.surveyForm.patchValue(this.surveyList);
      // this.surveyForm.setValue(this.surveyList.survey_type_id);
      this.surveyForm.patchValue({
        title: this.surveyList.title,
      survey_category:this.surveyList.survey_tag_id._id,
      survey_description:this.surveyList.survey_description,
      start_date_time: this.formatDateForInput(this.surveyList.start_date_time),
      end_date_time:this.formatDateForInput(this.surveyList.end_date_time),
      complete_time:this.surveyList.complete_time,
      url:this.surveyList.url,
      min_age_range: this.surveyList.min_age_range,
      max_age_range: this.surveyList.max_age_range,
      survey_type_id:this.surveyList.survey_type_id._id,
        
        // Patch other form controls
      });

    })
  
  }
 dt:any="22-11-2023, 6:11 PM";
 formatDateTime(inputDate: string): string {
  
   
  const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}${hours}:${minutes}`;
  }
  onUpdate(){
    const inputDate1 = "22-11-2023, 6:11 PM";
    const formattedDateTime = this.formatDateTime(inputDate1);
    
 
    console.log(formattedDateTime);
   console.log(this.surveyForm.value)
    const fdata = new FormData();
    // const payload={
    //   category_id:updateData._id
    // }
  
    if (this.selectFile) {

      fdata.append('image', this.selectFile);
    }
    fdata.append('title', this.surveyForm.controls?.["title"].value);
    fdata.append('survey_description', this.surveyForm.controls?.["survey_description"].value);
    fdata.append('survey_tag_id', this.surveyForm.controls?.["survey_category"].value);
    fdata.append('survey_type_id', this.surveyForm.controls?.["survey_type_id"].value);
    fdata.append('min_age_range', this.surveyForm.controls?.["min_age_range"].value);
    fdata.append('max_age_range', this.surveyForm.controls?.["max_age_range"].value);
    const inputDate = this.surveyForm.value['start_date_time']
    const startDate = this.formatDate(inputDate);
  
    const inpuDate = this.surveyForm.value['end_date_time']
    const endDate = this.formatDate(inpuDate);
    fdata.append('start_date_time', startDate);
    fdata.append('end_date_time', endDate);
    fdata.append('complete_time', this.surveyForm.controls?.["complete_time"].value);
    fdata.append('url', this.surveyForm.controls?.["url"].value);
    fdata.append('isStatusComplete', this.surveyForm.controls?.["status"].value);


  
    try {
      this.updateService.updateSurvey(this.updateId,fdata)
      .subscribe((res:any)=>{
        console.log('the updatesurvey data are............',res)
        this.updateService.notifySuccess(res.message);
        this.userData=res.updateCategory;
     this.router.navigateByUrl('/main/surveyform')
  
        
      },(errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.updateService.hideLoader();
  
          this.updateService.notifyError("This title already exist,please enter unique title");
        } else {
          this.updateService.notifyError("This title already exist,please enter unique title");
        }
      });
    } catch (error) {
      this.updateService.notifyError('Something went wrong');
    }
   

  }

  showVal1(lim1: any) {
    this.showRange1 = parseInt(lim1.value);
  }
  showVal2(lim2: any) {
    this.showRange2 = parseInt(lim2.value);
  }

  getTypeSurvey() {
    this.updateService.showLoader();
    this.updateService.getSurveyType()
      .subscribe((res: any) => {
        this.updateService.hideLoader();
        this.typelist = res.allSurveyType;
      })
  }

  getSurveyTag() {
    this.updateService.showLoader();
    this.updateService.getAllSurveyTag()
      .subscribe((res: any) => {
        this.updateService.hideLoader();
        this.tagList = res.allSurveyType;

      })
  }

}
