import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
import { DialogcmsComponent } from '../dialogcms/dialogcms.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { UpdaterewardsComponent } from '../updaterewards/updaterewards.component';
import { SelectionModel } from '@angular/cdk/collections';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent {

  dataall: any;
  dateFormat = 'dd/MM/yy h/mm a'; // Define your desired date format
  selectedIds: number[] = [];
  rewardAmount: any;
  data: any;
  list = [];
  participationlist: any = '';
  cmsedit: any = '';
  numSelected: any;
  displayedColumns: string[] = ['select', 'id', 'name', 'title', 'email', 'submit', 'status',];
  displayedColumns1: string[] = ['id', 'name', 'title', 'email', 'submit', 'status', 'rewards'];

  dataSource: any;
  dataSource1: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator

 

  @ViewChild(MatSort) sort!: MatSort
  selection = new SelectionModel<any>(true, []);

  cmsId: any;
  ongoingSurveys: any[] = []; // Replace 'any' with the actual type of your survey data

  constructor(
    private adminService: AdminserviceService,
    private router: Router, private dialog: MatDialog,
    private spinner: NgxSpinnerService, private route: ActivatedRoute
  ) {
    this.cmsId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {

    this.filterData('all');
  }




  // openDialog1(userId: number): void {
  //   const dialogRef = this.dialog.open(UpdaterewardsComponent, {
  //     width: '400px',
  //     data: {
  //       userId: userId

  //     } 
  //   });

  //   dialogRef.componentInstance.dataUpdated.subscribe((result: string) => {
  //     if (result === 'refresh') {

  //       this.getallparicipation();
  //     }
  //   });
  // }





  onclear(input: any) {
    input.value = '';
    this.filterData('all');

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


  // edit(id: any) {

  //   this.router.navigateByUrl('/main/cms/updatecms/' + id)
  // }

  pageSize = 5; // Set the initial number of items per page
  pageSizeOptions: number[] = [5, 10, 20, 30, 50, 100, 200];
  // Set the available options for items per page

  onPageChange(event: any) {
    // Reset the paginator's index to 0 when changing the page
    this.paginator.pageIndex = event.pageIndex;
  }


  getAdjustedIndex(index: number): number {
    // Calculate the adjusted index based on the current page and number of items per page
    return index + this.paginator.pageIndex * this.paginator.pageSize;
  }









  selectedStatus = 'all';
  filteredParticipationList = [];


  filterData(status: string) {
    this.adminService.showLoader();
    try {
      this.adminService.Allparicipation(this.cmsId).subscribe((res: any) => {
        this.adminService.hideLoader();
        this.dataall = res.allParticipationList.filter((item: any) =>
          item.status === "completed" || item.status === "rejected"
        );
        if (status === 'all') {
          this.filteredParticipationList = this.dataall;
          console.log(this.filteredParticipationList)
          this.dataSource = new MatTableDataSource(this.filteredParticipationList);
          this.dataSource = new MatTableDataSource(this.filteredParticipationList);

          this.dataSource.paginator = this.paginator;;
          this.dataSource.sort = this.sort;
        } else {
          this.filteredParticipationList = this.dataall.filter((item: any) => item.status === status);
          console.log(this.filteredParticipationList)
          this.dataSource = new MatTableDataSource(this.filteredParticipationList);
          this.dataSource.paginator = this.paginator;;
          this.dataSource.sort = this.sort;
        }



      },
        (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.adminService.hideLoader();
            this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
          } else {
            this.adminService.notifyError("An error occurred. Please try again later.");
          }
        })



    } catch (e) {


      this.adminService.notifyError('Something went wrong');
    }

  }
  back() {
    this.router.navigateByUrl('/main/surveyform/rewards/' + this.cmsId)
  }
}



