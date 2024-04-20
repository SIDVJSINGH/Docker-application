import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
import { AddathleticsComponent } from './addathletics/addathletics.component';
import { EditathleticsComponent } from './editathletics/editathletics.component';

@Component({
  selector: 'app-athletics',
  templateUrl: './athletics.component.html',
  styleUrls: ['./athletics.component.css']
})
export class AthleticsComponent {


  dateFormat = 'dd/MM/yyyy'; // Define your desired date format

  list = [];
  cmslist: any = '';
  cmsedit: any = '';

  displayedColumns: string[] = ['id', 'label', 'value', 'update', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  constructor(
    private adminService: AdminserviceService,
    private router: Router, private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getrace();

  }


  edit(data: any) {

    const dialogRef = this.dialog.open(EditathleticsComponent, {
      width: '500px',
      data: data // You can pass any data you want to the dialog here
    });

    dialogRef.componentInstance.dataUpdated.subscribe((result: string) => {
      if (result === 'refresh') {
        // Call the getcms method to refresh the data
        this.getrace();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddathleticsComponent, {
      width: '500px',
      data: {} // You can pass any data you want to the dialog here
    });

    dialogRef.componentInstance.dataUpdated.subscribe((result: string) => {
      if (result === 'refresh') {
        // Call the getcms method to refresh the data
        this.getrace();
      }
    });
  }




  getrace() {

    this.adminService.showLoader();
    try {
      this.adminService.getathletics().subscribe((res: any) => {
        this.adminService.hideLoader();

        if (res.status) {
          this.cmslist = res.allOptionsList;
          this.dataSource = new MatTableDataSource(this.cmslist);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // this.adminService.notifySuccess(res.message);


        } else {
          this.adminService.hideLoader();

          this.adminService.notifyError('Something went wrong');
        }

      },(errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.adminService.hideLoader();
          this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
        } else {
          this.adminService.notifyError("An error occurred. Please try again later.");
        }
      })



    } catch (e) {

      this.adminService.hideLoader();

      this.adminService.notifyError('Something went wrong');
    }
  }



  delete(element: any) {


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

          this.adminService.removeathletics(element._id,{})
            .subscribe((res: any) => {
              setTimeout(() => {
                Swal.fire(
                  'Deleted successfully',
                  "",
                  'success'
                ).then((swalResult) => {
                  if (swalResult.isConfirmed) {
                    this.getrace();
                  }
                });
              }, 10);
            })

        } catch (e) {
          this.adminService.hideLoader();

          this.adminService.notifyError('Something went wrong');
        }




      }
    })

  }
  onclear(input:any){
    input.value = '';
  this.getrace();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  pageSize = 5; // Set the initial number of items per page
  pageSizeOptions: number[] = [5, 10, 20, 30, 50, 100, 200]; // Set the available options for items per page

  onPageChange(event: any) {
    // Reset the paginator's index to 0 when changing the page
    this.paginator.pageIndex = event.pageIndex;
  }

  getAdjustedIndex(index: number): number {
    // Calculate the adjusted index based on the current page and number of items per page
    return index + this.paginator.pageIndex * this.paginator.pageSize;
  }


}




