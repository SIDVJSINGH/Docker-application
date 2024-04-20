import { Component, Input, OnInit } from '@angular/core';
import { WebService } from 'src/app/Services/web.service';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  public totalRows2: number = 0;
  public startLinkIndex2: number = 1;
  surveyListArray: any[] = []; // Input for the survey list
  FilterListArray: any[] = []; // Input for the survey list
  filterTagListArray: any = '';
  //  x:any= [''];
  x: any[] = [];
  // Filtered list
  filteredList: any[] = [];

  // Filter options
  filterOptions = ['Latest', 'Oldest', 'Tag'];

  tagCategory: any = [];

  selectedFilter: string = this.filterOptions[0];

  public surveyListArr: any = '';
  isActive = true;
userid:any;
  constructor(private webService: WebService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getSurveyList();
    this.userid=localStorage.getItem('id')
    console.log(this.userid)
  }
paricipate:any;
isUserParticipant(alllistItem: any): boolean {
  return alllistItem.user_id === this.userid;
}
  getSurveyList() {
    this.webService.showLoader();
    this.webService.userSurveyList()
      .subscribe((res: any) => {
        this.webService.hideLoader();
        this.surveyListArr = res.allActiveCategory;
        this.paricipate=res.allActiveCategory[0].participants_list;
        console.log('SurveyList reponse', res.allActiveCategory[0].participants_list);
        this.surveyListArr.forEach((ele: any) => {
          if (this.tagCategory.indexOf(ele.survey_tag_id.tag_name) == -1) {
            this.tagCategory.push(ele.survey_tag_id.tag_name)
          }
        });
        console.log('tag category', this.tagCategory);

        // this.x = this.surveyListArr.map((item: any) => item.survey_tag_id);

        // survey_tag_id
        // this.filterTagListArray=res.allActiveCategory[0].survey_tag_id;
        // console.log('Survey tag name array',this.filterTagListArray)
        // console.log('SurveyList reponse',this.surveyListArr);
        // this.filterList('Latest');
        this.FilterListArray = this.surveyListArr.slice();
      }, (errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.webService.hideLoader();

          this.webService.notifyError( errorResponse.error.message);
        } else {
          this.webService.notifyError("An error occurred. Please try again later.");
        }
      });
  }



  allActiveCategory: any[] = [];  // Assuming this is where you have your data
   // Replace 'your_user_id' with the actual user ID

  hasUserParticipated(survey: any): boolean {
    return survey.participants_list.some((participant: any) => participant.user_id === this.userid);
  }

  filterList(param: any) {
    if (param == 'Latest') {
      this.FilterListArray = this.surveyListArr.slice(); // Create a shallow copy
      this.FilterListArray.sort((a, b) => {
        const dateA: any = new Date(a.created_at);
        const dateB: any = new Date(b.created_at);
        return dateB - dateA;
      });
    }
    else if (param == 'Oldest') {
      this.FilterListArray = this.surveyListArr.slice(); // Create a shallow copy
      this.FilterListArray.sort((a, b) => {
        const dateA: any = new Date(a.created_at);
        const dateB: any = new Date(b.created_at);
        return dateA - dateB;
      });
    }
    //  else if (this.selectedFilter == 'Tag Wise') {

    // }
  }
  participateButton: any;
  tagWiseFilter(item: any) {
    console.log('filter function execute');

    this.FilterListArray = this.surveyListArr.filter((ele: any) => { return ele.survey_tag_id.tag_name == item });
  }
  formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy,h:mm a');
    return formattedDate;
  }
  Onparticipate(item: any) {
    const currentDate = new Date();
    const currentDateTime = currentDate.toISOString(); 
    const time = this.formatDate(currentDateTime);

   

    const payload = {
      survey_id: item._id,
      submitted_date_time: time
    }
    this.webService.participate(payload)
      .subscribe((res: any) => {
        if (res.status == true) {
          this.webService.notifySuccess(res.message)
          Swal.fire({
            title: `<span class="text-success" style="text-align:center;">Participation Successful</span>`,
            html: `
      <img src="${item.image}" alt="Category Image" style="width: 200px; height:200px; text-align:center; " />
        <p>${item.title}</p>
        <a href="${item.url}" target="_blank" class="btn btn-link">Go to link</a>
       
      `,
            icon: 'success',
            allowOutsideClick: false,
            showCancelButton: true,
            showConfirmButton: false
          });
      
          // Add a click event listener to the "Participate" button
          const element = document.getElementById('participateButton');
          if (element) {
            element.addEventListener('click', () => {
              // Event handling logic
           
              Swal.close();
            });
          }
          this.getSurveyList()
        }
      }, (errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.webService.hideLoader();

          this.webService.notifyError( errorResponse.error.message);
        } else {
          this.webService.notifyError("An error occurred. Please try again later.");
        }
      });
  }

  link(item:any){
   `<a href="${item.url}" target="_blank" class="btn btn-link"></a>` 

  }
}

