import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminserviceService } from 'src/app/Services/adminservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-surveycategory',
  templateUrl: './surveycategory.component.html',
  styleUrls: ['./surveycategory.component.css']
})
export class SurveycategoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'status', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  surveyForm!: FormGroup
  public userData: any = {};
  list: any;
  surveytypelist: any;
  selectFile: any;
  url: any;
  tagList: any;
  surveytaglist: any;
  constructor(private formBuilder: FormBuilder, private adminService: AdminserviceService, private router: Router) {

  }
  ngOnInit(): void {
    this.getSurveyTag();
    this.surveyForm = this.formBuilder.group({
      tag_name: ['', Validators.required]
      // image: ['', Validators.required],

    })
  }


  onclear(input: any) {
    input.value = '';
    this.getSurveyTag();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  getSurveyTag() {
    this.adminService.showLoader();
    this.adminService.getAllSurveyTag()
      .subscribe((res: any) => {
        this.adminService.hideLoader();
        this.tagList = res.allSurveyType;
        this.dataSource = new MatTableDataSource(this.tagList);
        this.dataSource.paginator = this.paginator;
      })
  }

  onDelete(element: any) {

    const payload = {
      tag_id: element._id
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

          this.adminService.surveyTagDelete(payload)
            .subscribe((res: any) => {
              setTimeout(() => {
                Swal.fire(
                  'Deleted successfully',
                  "",
                  'success'
                ).then((swalResult) => {
                  if (swalResult.isConfirmed) {
                    this.getSurveyTag();
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
    this.router.navigateByUrl('/main/surveycategory/updatesurvtag/' + id);

  }

  onViewItem(data: any) {
    this.userData = data;
  }
  onAddSurveyTag() {
    const payload = {
      tag_name: this.surveyForm.value['tag_name']
    }
    this.adminService.addSurveyTag(payload)
      .subscribe((res: any) => {
        this.getSurveyTag();
        this.surveytaglist = res.surveyType;
        this.adminService.notifySuccess(res.message);
        // this.router.navigateByUrl('/main/surveytype');
        this.closeModal();

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

  onPageChange(event: any) {
    // Reset the paginator's index to 0 when changing the page
    this.paginator.pageIndex = event.pageIndex;
  }

  getAdjustedIndex(index: number): number {
    // Calculate the adjusted index based on the current page and number of items per page
    return index + this.paginator.pageIndex * this.paginator.pageSize;
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
