import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name','tag', 'weight', 'symbol','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  updateForm!: FormGroup;
  public userData:any={};

  constructor( private fBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.updateForm=this.fBuilder.group({
      tagName:['']
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdate(){
  }
  onViewItem(data:any){
    this.userData=data
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status:string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',status:'Active'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',status:'Inactive'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',status:'Active'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',status:'Inactive'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',status:'Active'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',status:'Inactive'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',status:'Active'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',status:'Inactive'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',status:'Active'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',status:'Inactive'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na',status:'Active'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg',status:'Inactive'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al',status:'Active'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si',status:'Inactive'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P',status:'Active'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S',status:'Inactive'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl',status:'Active'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar',status:'Inactive'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K',status:'Active'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca',status:'Inactive'},
];




  

