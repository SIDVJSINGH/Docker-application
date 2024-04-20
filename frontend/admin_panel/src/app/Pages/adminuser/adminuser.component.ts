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
import { DialogcreateuserComponent } from '../dialogcreateuser/dialogcreateuser.component';
import { DialogComponent } from '../dialog/dialog.component';
import { AddadminComponent } from './addadmin/addadmin.component';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {
 
  list = [];
  userlist: any = '';
  cmsedit: any = '';


  displayedColumns: string[] = ['id','pic', 'name', 'email','active','action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  unblockresult: any;
  hiddenAdminId:any; // ID to be hidden

  constructor(
    private adminService: AdminserviceService,
    private router: Router, private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { 
    this.hiddenAdminId=localStorage.getItem("Id");
    console.log(this.hiddenAdminId)
  }

  ngOnInit() {
    this.getuser();

  }


  block(data: any) {

    this.router.navigateByUrl('/main/cms/updatecms/' + data.id)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddadminComponent, {
      width: '500px',
      data: {} // You can pass any data you want to the dialog here
    });

    dialogRef.componentInstance.dataUpdated.subscribe((result: string) => {
      if (result === 'refresh') {
        // Call the getcms method to refresh the data
        this.getuser();
      }
    });
  }

  openDialog1(userId: number): void {
    const dialogRef = this.dialog.open(DialogcreateuserComponent, {
      width: '700px',
      data: {
        userId: userId

      } // You can pass any data you want to the dialog here
    });

    dialogRef.componentInstance.dataUpdated.subscribe((result: string) => {
      if (result === 'refresh') {
        // Call the getcms method to refresh the data
        this.getuser();
      }
    });
  }


  
  edit(id:any){
    this.router.navigate(['/main/user/edit'], {
      queryParams: {
        id: id,
       
      },
    });
  }
create(){
  this.router.navigateByUrl('/main/user/create')
}
onBlock(element: any) {
  const payload={
    isActive:false
  }
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, block it!'
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        this.adminService.blockuser(element.id, payload).subscribe((result: any) => {
          this.unblockresult = result;
          // console.log("The user's block id is", this.blockresult);
          setTimeout(() => {
            Swal.fire(
              'User has been Blocked.',
              "",
              'success'
            ).then((swalResult) => {
              if (swalResult.isConfirmed) {
                this.getuser();
              }
            });
          }, 10);
        
        },(errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
  
            this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
          } else {
            this.adminService.notifyError("An error occurred. Please try again later.");
          }
        });
      } catch (e) {
     
        this.adminService.notifyError('Something went wrong');
      }
    }
  });
}

onunBlock(element:any){
  
  const payload={
    isActive:true
  }
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, unblock it!'


  }).then((result) => {
    if (result.isConfirmed) {

      try{
       
        this.adminService.blockuser(element.id,payload)
        .subscribe((res:any)=>{
          this.unblockresult=res;
          setTimeout(() => {
            Swal.fire(
              'User has been Unblocked.',
              "",
              'success'
            ).then((swalResult) => {
              if (swalResult.isConfirmed) {
                this.getuser();
              }
            });
          }, 10);
          // console.log("The user's Unblock id is", this.unblockresult)
        },(errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
  
            this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
          } else {
            this.adminService.notifyError("An error occurred. Please try again later.");
          }
        });
  
     }catch(e){
           this.adminService.hideLoader();
          
           this.adminService.notifyError('Something went wrong');
         }
     

  
    
    }
  })

}

  getuser() {

    this.adminService.showLoader();
    try {
      this.adminService.getadmin().subscribe((res: any) => {
        this.adminService.hideLoader();

        if (res) {
          this.userlist = res.allAdminLists;
         
         this.dataSource = new MatTableDataSource(this.userlist);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

          // this.adminService.notifySuccess(res.message);


        } else {
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
      });



    } catch (e) {


      this.adminService.notifyError('Something went wrong');
    }
  }


  filteredAdmins: any[] = [];
  filterAdmins(): void {
    this.filteredAdmins = this.userlist.filter((admin:any) => admin.id !== this.hiddenAdminId);
   
  }
unblock(element:any){

}

  delete(userId: any) {

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

          this.adminService.deleteadmin(userId.id,{})
            .subscribe((res: any) => {
              setTimeout(() => {
                Swal.fire(
                  'Deleted successfully',
                  "",
                  'success'
                ).then((swalResult) => {
                  if (swalResult.isConfirmed) {
                    this.getuser();
                  }
                });
              }, 10);
            },(errorResponse) => {
              // Handle HTTP error response (e.g., 401 Unauthorized)
              if (errorResponse.status) {
      
                this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
              } else {
                this.adminService.notifyError("An error occurred. Please try again later.");
              }
            });

        } catch (e) {
          this.adminService.hideLoader();

          this.adminService.notifyError('Something went wrong');
        }




      }
    })

  }
  onclear(input:any){
    input.value = '';
  this.getuser();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


  pageSize = 10; // Set the initial number of items per page
  pageSizeOptions: number[] = [10, 20, 30, 50, 100, 200]; // Set the available options for items per page

  onPageChange(event: any) {
    // Reset the paginator's index to 0 when changing the page
    this.paginator.pageIndex = event.pageIndex;
  }

  getAdjustedIndex(index: number): number {
    // Calculate the adjusted index based on the current page and number of items per page
    return index + this.paginator.pageIndex * this.paginator.pageSize;
  }


}
