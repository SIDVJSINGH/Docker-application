import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
// import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// import {Component} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';






@Component({
  selector: 'app-surveyform',
  templateUrl: './surveyform.component.html',
  styleUrls: ['./surveyform.component.css']
})
export class SurveyformComponent implements OnInit {

  displayedColumns: string[] = ['position', 'profilepic', 'name', 'weight', 'symbol', 'sym', 'status', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  surveyForm!: FormGroup
  public userData: any = {};
  list: any;

  selectFile: any;
  url: any;
  uId: any
  backendDate: string = '';
  category: any = 'action'
  tagList: any;
  typelist: any;
  selectedData: any;
  public array: any[] = [];
  public showRange1: number = 16;
  public showRange2: number = 100;

  surveyarray: any;
  searchList: any = []

  dateFormat = 'dd/MM/yyyy';

  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router, private survService: AdminserviceService) { }

  ngOnInit(): void {
    this.surveyList();
    this.getTypeSurvey();
    this.getSurveyTag();

    this.surveyForm = this.formBuilder.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      survey_category: ['', Validators.required],
      survey_type_id: ['', Validators.required],
      survey_description: ['', Validators.required],
      start_date_time: ['', [Validators.required,this.futureDateValidator()]],
      end_date_time: ['', [Validators.required,this.futureDateValidator()]],
      complete_time: ['', Validators.required],
      min_age_range: ['16', Validators.required],
      max_age_range: ['100', Validators.required],
      // status:['', Validators.required],
      url: ['', Validators.required]


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


  formatDate(inputDate: string): any {
    const formattedDate = this.datePipe.transform(inputDate, 'dd-MM-yyyy,hh:mm a');
    return formattedDate;
  }
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
  onclear(input: any) {
    input.value = '';
    this.surveyList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSurvey() {
  }
  onViewItem(data: any) {
    this.userData = data;
  }

  surveyList() {
    this.survService.showLoader();
    this.survService.getSurveyList()
      .subscribe((res: any) => {
        this.survService.hideLoader();
        // this.survService.notifySuccess(res.message);
        this.list = res.allCategory;
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        // const date = new Date(this.backendDate);
        // const formattedDate = this.datePipe.transform(date, 'dd/MM/yy, hh:mm a');


        // this.dataSource.sort = this.sort;
        // this.totalTodoRecords = res.results.length;
      })
  }

  onCreate(lim1: any, lim2: any) {
 
    const fdata = new FormData();
    if (this.selectFile) {

      fdata.append('image', this.selectFile);
    }
    fdata.append('title', this.surveyForm.controls?.["title"].value);
    fdata.append('survey_tag_id', this.surveyForm.controls?.["survey_category"].value);
    fdata.append('survey_type_id', this.surveyForm.controls?.["survey_type_id"].value);

    fdata.append('survey_description', this.surveyForm.controls?.["survey_description"].value);
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

    this.survService.createSurvey(fdata)
      .subscribe((res: any) => {
        this.surveyList();
        this.closeModal();
        this.survService.notifySuccess(res.message);
        this.surveyarray = res.surveyCategory;
        this.array.push(this.surveyarray)
        this.router.navigateByUrl('/main/surveyform');


      }, (errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          // this.survService.notifyError("Unauthorized: " + errorResponse.error.message);
          this.survService.notifyError("Please fill out all input field");
        } else {
          this.survService.notifyError("An error occurred. Please try again later.");
        }
      });


    const searchItem = this.array.filter((item: any) => {
      return (item.max_age_range >= lim1.value && item.min_age_range <= lim2.value);
    });
    this.searchList = searchItem;

    // fdata.append('userId', this.uId);
  }

  onPageChange(event: any) {
    // Reset the paginator's index to 0 when changing the page
    this.paginator.pageIndex = event.pageIndex;
  }

  getAdjustedIndex(index: number): number {
    // Calculate the adjusted index based on the current page and number of items per page
    return index + this.paginator.pageIndex * this.paginator.pageSize;
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

  onDelete(element: any) {

    const payload = {
      category_id: element._id
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'


    }).then((result) => {
      if (result.isConfirmed) {

        try {

          this.survService.deleteSurvey(payload)
            .subscribe((res: any) => {
              this.survService.hideLoader();
              setTimeout(() => {
                Swal.fire(
                  'Deleted successfully',
                  "",
                  'success'
                ).then((swalResult) => {
                  if (swalResult.isConfirmed) {
                    this.surveyList();
                  }
                });
              }, 10);
            })

        } catch (e) {
          // this.survService.hideLoader();

          this.survService.notifyError('Something went wrong');
        }




      }
    })


  }

  edit(id: any) {

    this.router.navigateByUrl('/main/surveyform/updatesurvey/' + id)
  }

  getTypeSurvey() {
    this.survService.showLoader();
    this.survService.getSurveyType()
      .subscribe((res: any) => {
        this.survService.hideLoader();
        this.typelist = res.allSurveyType;
      })
  }

  getSurveyTag() {
    this.survService.showLoader();
    this.survService.getAllSurveyTag()
      .subscribe((res: any) => {
        this.survService.hideLoader();
        this.tagList = res.allSurveyType;

      })
  }
  selectedItemId: any;

  selectItem(itemId: number) {
    this.selectedItemId = itemId;
  }

  onSelectionChange(event: any) {
    this.selectedData = event.value;
  }

  onparticipation(id: any) {
    this.router.navigateByUrl('/main/surveyform/rewards/' + id);
  }



  showVal1(lim1: any) {
    this.showRange1 = parseInt(lim1.value);
  }
  showVal2(lim2: any) {
    this.showRange2 = parseInt(lim2.value);
  }

  closeModal() {
    const button = document.getElementById("bootstrapClose");

    // Check if the button element exists
    if (button) {
      // Simulate a click on the button
      button.click();
    } else {
      console.error("Button not found.");
    }
  }
}









