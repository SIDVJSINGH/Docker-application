import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WebService } from 'src/app/Services/web.service';
export interface PeriodicElement {
  id: number;
  survey_title: string;
  tag_category: string;
  submitted_date: string;
  status: string;
  reward_earned: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    survey_title: 'Lorem ipsum dolor sit',
    tag_category: 'Entertainment',
    submitted_date: '10/09/2023',
    status: 'completed',
    reward_earned: 50,
  },
  {
    id: 2,
    survey_title: 'Lorem ipsum dolor sit',
    tag_category: 'Entertainment',
    submitted_date: '10/09/2023',
    status: 'rejected',
    reward_earned: 'nil',
  },
  {
    id: 2,
    survey_title: 'Lorem ipsum dolor sit',
    tag_category: 'Entertainment',
    submitted_date: '10/09/2023',
    status: 'completed',
    reward_earned: 'nil',
  },
  {
    id: 2,
    survey_title: 'Lorem ipsum dolor sit',
    tag_category: 'Entertainment',
    submitted_date: '10/09/2023',
    status: 'rejected',
    reward_earned: '50',
  },
];

@Component({
  selector: 'app-manage-rewards',
  templateUrl: './manage-rewards.component.html',
  styleUrls: ['./manage-rewards.component.scss'],
})
export class ManageRewardsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  isActive: boolean = true;
  getlist:any;
  displayedColumns: string[] = [
    'id',
    'survey_title',
    'tag_category',
    'submitted_date',
    'status',
    'reward_earned',
  ];
  dataSource: any;
  newstatus: any = ELEMENT_DATA[1].status;
  dateFormat = 'dd/MM/yyyy ';
  constructor(
    private webservice:WebService,
    private route:Router
  ){}
  ngOnInit(): void {
    this.getrewards();
  }
  getrewards() {
    this.webservice.showLoader();
    try {
      this.webservice.getRewards()
        .subscribe((res: any) => {
          this.webservice.hideLoader();
          if (res.status) {
            this.getlist = res.allRewardLists.reward_details;
           console.log(this.getlist)
           this.dataSource = new MatTableDataSource(this.getlist);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
           
          } else {
            this.webservice.notifyError('Something went wrong');
          }
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.webservice.hideLoader();

            this.webservice.notifyError( errorResponse.error.message);
          } else {
            this.webservice.notifyError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      this.webservice.notifyError('Something went wrong');
    }
  }
  pageSize = 5; // Set the initial number of items per page
  pageSizeOptions: number[] = [5, 10, 50,]; // Set the available options for items per page

  onPageChange(event: any) {
    // Reset the paginator's index to 0 when changing the page
    this.paginator.pageIndex = event.pageIndex;
  }

  getAdjustedIndex(index: number): number {
    // Calculate the adjusted index based on the current page and number of items per page
    return index + this.paginator.pageIndex * this.paginator.pageSize;
  }
  goredem(){

  }
}
