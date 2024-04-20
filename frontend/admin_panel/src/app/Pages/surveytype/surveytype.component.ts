import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-surveytype',
  templateUrl: './surveytype.component.html',
  styleUrls: ['./surveytype.component.css']
})
export class SurveytypeComponent implements OnInit{

  displayedColumns: string[] = ['position', 'name', 'status','action'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  surveyForm!: FormGroup
  public userData: any = {};
  list: any;
  surveytypelist: any;
  selectFile: any;
  url: any;
  constructor(private formBuilder: FormBuilder,private adminService:AdminserviceService,private router:Router) {

  }
  ngOnInit(): void {
    this.getTypeSurvey();
    this.surveyForm = this.formBuilder.group({
      type_name: ['',Validators.required]
      // image:['',Validators.required],

    })
  }

 



  onclear(input:any){
    input.value = '';
    this.getTypeSurvey();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onPageChange(event: any) {
    // Reset the paginator's index to 0 when changing the page
    this.paginator.pageIndex = event.pageIndex;
  }

  getAdjustedIndex(index: number): number {
    // Calculate the adjusted index based on the current page and number of items per page
    return index + this.paginator.pageIndex * this.paginator.pageSize;
  }

  getTypeSurvey(){
    this.adminService.showLoader();
    this.adminService.getSurveyType()
    .subscribe((res:any)=>{
      this.adminService.hideLoader();
      this.list = res.allSurveyType;
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
    })
  }
  onDelete(element:any){

    const payload={
      type_id:element._id
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

          this.adminService.surveyTypeDelete(payload)
            .subscribe((res: any) => {
              setTimeout(() => {
                Swal.fire(
                  'Deleted successfully',
                  "",
                  'success'
                ).then((swalResult) => {
                  if (swalResult.isConfirmed) {
                    this.getTypeSurvey();
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
  onEdit(id: any) {

    this.router.navigateByUrl('/main/surveytype/updatesurveytype/' + id);
    // this.router.navigateByUrl('/main/surveytype');
  }
  onViewItem(data: any) {
    this.userData = data;
  }

  onAddSurveyType(){
    this.adminService.showLoader();
    const payload={
      type_name:this.surveyForm.value['type_name']
    }
    this.adminService.AddSurveyType(payload)
    .subscribe((res:any)=>{
      this.adminService.hideLoader();
      this.getTypeSurvey();
      this.surveytypelist=res.surveyType;
      this.adminService.notifySuccess(res.message);
      // this.router.navigateByUrl('/main/surveytype');
      this.closeModal();

    },
    (errorResponse) => {
      // Handle HTTP error response (e.g., 401 Unauthorized)
      if (errorResponse.status) {

        this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
      } else {
        this.adminService.notifyError("An error occurred. Please try again later.");
      }
    }
    )
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
