import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent {
  dataall: any;
  dateFormat = 'dd/MM/yy h/mm a'; // Define your desired date format
  selectedIds: number[] = [];
  rewardAmount: any;
  data: any;
  list = [];
  participationlist: any = '';
  cmsedit: any = '';
  numSelected: number = 0;
  displayedColumns: string[] = ['select', 'id', 'name', 'title', 'email', 'submit', 'status',];
  displayedColumns1: string[] = ['id', 'name', 'title', 'email', 'submit', 'status', 'rewards'];

  dataSource: any;
  dataSource1: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatPaginator) paginator1 !: MatPaginator
  @ViewChild('paginatorSecond') paginatorSecond !: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort
  selection = new SelectionModel<any>(true, []);

  cmsId: any;
  ongoingSurveys: any[] = []; // Replace 'any' with the actual type of your survey data
  rewardAmountControl:any;
  rewardAmountError: boolean = false;

  validateRewardAmount() {
    const isNumeric = !isNaN(parseFloat(this.rewardAmount)) && isFinite(this.rewardAmount);
    const isPositive = this.rewardAmount >= 0;

    this.rewardAmountError = !(isNumeric && isPositive);
  }
  constructor(
    private adminService: AdminserviceService,
    private router: Router, private dialog: MatDialog,
    private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    this.cmsId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.getallparicipation();
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


  getallparicipation() {

    this.adminService.showLoader();
    try {
      this.adminService.Allparicipation(this.cmsId).subscribe((res: any) => {
        this.adminService.hideLoader();

        if (res.status) {
          this.participationlist = res.allParticipationList;
          this.ongoingSurveys = this.participationlist.filter(
            (survey: any) => survey.status === 'ongoing'
          );
          console.log(this.ongoingSurveys);
          this.dataSource = new MatTableDataSource(this.ongoingSurveys);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // this.adminService.notifySuccess(res.message);


        } else {
          this.adminService.notifyError('Something went wrong');
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

  
  onclear(input: any) {
    input.value = '';
    this.getallparicipation();
    this.filterData('all');

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onclear1(input1: any) {
    input1.value = '';
    this.filterData('all');
    this.getallparicipation();
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
console.log(this.dataSource1)
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
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

  onPageChange1(event: any) {
    // Reset the paginator's index to 0 when changing the page
    this.paginatorSecond.pageIndex = event.pageIndex;
  }
  getAdjustedIndex(index: number): number {
    // Calculate the adjusted index based on the current page and number of items per page
    return index + this.paginator.pageIndex * this.paginator.pageSize;
  }
  getAdjustedIndex1(index: number): number {
    // Calculate the adjusted index based on the current page and number of items per page
    return index + this.paginatorSecond.pageIndex * this.paginatorSecond.pageSize;
  }

  isAllSelected() {
    this.numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;



    return this.numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);

  }



  // ...

  giveRewards() {
    this.selectedIds = this.selection.selected.map((row) => row.id);
    console.log(this.selectedIds);

    const updateRequests = this.selectedIds.map((id) => {
      const data = { reward_earned_value: this.rewardAmount, status: 'completed',reward_status: 'paid' };
      const data1 = id;
      return this.adminService.updateRewards(data1, data);
    });

    forkJoin(updateRequests).subscribe((responses: any[]) => {
      // Handle the API responses here, responses is an array of responses from all requests

      this.getallparicipation();
      this.filterData('all');
      this.selection.clear();

      console.log('All rewards updated successfully:', responses);
      this.adminService.notifySuccess('Rewards updated successfully');
    });
  }

  //   giveRewards() {

  //     this.selectedIds = this.selection.selected.map(row => row.id);
  // console.log(this.selectedIds)

  // for (const id of this.selectedIds) {
  //   this.data = { id: id };
  //   console.log(this.data)
  // try{
  //   const payload={

  //     reward_earned_value: this.rewardAmount
  //   }
  //   console.log(payload)
  //     this.adminService.updateRewards(this.data,payload)
  //     .subscribe((res:any)=>{


  //       this.adminService.notifySuccess(res.message)
  //     },(errorResponse) => {
  //       // Handle HTTP error response (e.g., 401 Unauthorized)
  //       if (errorResponse.status) {

  //         this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
  //       } else {
  //         this.adminService.notifyError("An error occurred. Please try again later.");
  //       }
  //     });

  //   }catch(e){
  //   this.adminService.notifyError("something send wrong")
  //   }}

  //       }


  //     giveRewards() {
  //       this.selectedIds = this.selection.selected.map(row => row.id);
  //       console.log(this.selectedIds)
  //       const payload={

  //         reward_earned_value: this.rewardAmount
  //       }
  //       this.selectedIds.forEach((id) => {
  //         const data = { reward_earned_value: this.rewardAmount,status:'complete' };
  //         const data1 =id;
  //         return this.adminService.updateRewards(data1, data);

  //         this.adminService.updateRewards(data1, data).subscribe((response:any) => {
  //           // Handle the API response for each ID
  //           this.getallparicipation();
  //           console.log(`Reward for ID ${id}:`, response);
  //           this.adminService.notifySuccess(response.message)
  //         });
  //       });
  //       this.getallparicipation();
  //       this.filterData('all');
  //       this.selection.clear() ;

  // }


  //   giveReject() {
  //     this.selectedIds = this.selection.selected.map(row => row.id);
  //     console.log(this.selectedIds)
  //     const payload={

  //       reward_earned_value: this.rewardAmount
  //     }
  //     this.selectedIds.forEach((id) => {
  //       const data = { status:'rejected' };
  //       const data1 =id;
  //       this.adminService.updateRewards(data1, data).subscribe((response:any) => {
  //         // Handle the API response for each ID
  //         this.getallparicipation();
  //         console.log(`Reward for ID ${id}:`, response);
  //         this.adminService.notifySuccess(response.message)
  //       });
  //     });
  //     this.getallparicipation();
  //     this.filterData('all');

  //     this.selection.clear() ;

  // }

  positiveNumberValidator(control: FormControl) {
    const value = control.value;
  
    if (value === null || value === undefined) {
      return null; // Valid if the value is not set
    }
  
    const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    const isPositive = value >= 0;
  
    return isNumeric && isPositive ? null : { 'positiveNumber': true };
  }
  giveReject() {
    this.selectedIds = this.selection.selected.map(row => row.id);
    console.log(this.selectedIds)
    const payload = {

      reward_earned_value: this.rewardAmount
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'


    }).then((result) => {
      if (result.isConfirmed) {

        const updateRequests = this.selectedIds.map((id) => {
          const data = { status: 'rejected',reward_status: 'unpaid' };
          const data1 = id;
          return this.adminService.updateRewards(data1, data);
        });

        forkJoin(updateRequests).subscribe((responses: any[]) => {
          // Handle the API responses here, responses is an array of responses from all requests

          setTimeout(() => {
            Swal.fire(
              'Rejected successfully',
              "",
              'success'
            ).then((swalResult) => {
              if (swalResult.isConfirmed) {
                this.adminService.notifySuccess('Rewards updated successfully');

                this.getallparicipation();
                this.filterData('all');

                this.selection.clear();
              }
            });
          }, 10);
        });









      }
    })

  }

  // giveReject() {
  //   this.selectedIds = this.selection.selected.map(row => row.id);
  //       console.log(this.selectedIds)
  //       const payload={

  //         reward_earned_value: this.rewardAmount
  //       }
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, reject it!'


  //   }).then((result) => {
  //     if (result.isConfirmed) {

  //       this.selectedIds.forEach((id) => {
  //         const data = { status:'rejected' };
  //         const data1 =id;
  //         this.adminService.updateRewards(data1, data).subscribe((response:any) => {
  //           // Handle the API response for each ID
  //           setTimeout(() => {
  //             Swal.fire(
  //               'Rejected successfully',
  //               "",
  //               'success'
  //             ).then((swalResult) => {
  //               if (swalResult.isConfirmed) {
  //                 this.getallparicipation();
  //     this.filterData('all');

  //     this.selection.clear() ;
  //               }
  //             });
  //           }, 10);
  //           this.getallparicipation();
  //           console.log(`Reward for ID ${id}:`, response);
  //           this.adminService.notifySuccess(response.message)
  //         },(errorResponse) => {
  //           // Handle HTTP error response (e.g., 401 Unauthorized)
  //           if (errorResponse.status) {

  //             this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
  //           } else {
  //             this.adminService.notifyError("An error occurred. Please try again later.");
  //           }
  //         });
  //       });








  //     }
  //   })

  // }


  selectedStatus = 'all';
  filteredParticipationList = [];


  filterData(status: string) {

    try {
      this.adminService.Allparicipation(this.cmsId).subscribe((res: any) => {

        this.dataall = res.allParticipationList.filter((item: any) =>
          item.status === "completed" || item.status === "rejected"
        );
        if (status === 'all') {
          this.filteredParticipationList = this.dataall
          console.log(this.filteredParticipationList)
          this.dataSource1 = new MatTableDataSource(this.filteredParticipationList);
          this.dataSource1.paginator = this.paginatorSecond;;
          this.dataSource1.sort = this.sort;
        } else {
          this.filteredParticipationList = this.dataall.filter((item: any) => item.status === status);
          console.log(this.filteredParticipationList)
          this.dataSource1 = new MatTableDataSource(this.filteredParticipationList);
          this.dataSource1.paginator = this.paginatorSecond;;
          this.dataSource1.sort = this.sort;
        }

        //   if (res.status) {
        //     this.participationlist = res.allParticipationList;
        //     this.ongoingSurveys = this.participationlist.filter(
        //       (survey:any) => survey.status === 'ongoing'
        //     );
        //  console.log(this.ongoingSurveys);
        //     this.dataSource = new MatTableDataSource(this.ongoingSurveys);
        //     this.dataSource.paginator = this.paginator;
        //     this.dataSource.sort = this.sort;

        //     // this.adminService.notifySuccess(res.message);


        //   } else {
        //     this.adminService.notifyError('Something went wrong');
        //   }

      },
        (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {

            this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
          } else {
            this.adminService.notifyError("An error occurred. Please try again later.");
          }
        })



    } catch (e) {


      this.adminService.notifyError('Something went wrong');
    }

  }
  complete() {
    this.router.navigateByUrl('/main/surveyform/complete/' + this.cmsId)
  }
}


