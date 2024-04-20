import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminserviceService } from 'src/app/Services/adminservice.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  public profileImageUrl: string = 'assets/logo/defaultlogo5.png'; // Initial image URL
  public url: string = '';
  list: any;
  form: any;
  Id: any = '';
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private adminService: AdminserviceService) {
    const queryParams = this.route.snapshot.queryParams;
    this.Id = queryParams['id'];
    console.log(this.Id);

    this.form = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      phone: [''],
      address: [''],
      zip_code: [''],
      height: [''],
      weight: [''],
      dob: [''],
      gender: [''],
      ethnicity: [''],
      marital_status: [''],
      education: [''],
      occupation: [''],
      race: [''],
      income: [''],
      sports: [''],
      athletics: [''],
      party: [''],
      climbing: [''],
      outing: [''],
      cycling: [''],
      paypal_id: [''],

      profile_image: [''],
      state: ['']

    })
  }


  ngOnInit(): void {

    this.getdeatials();
    this.getStateList();
    this.getRace();
    this.getEthniCity();
    this.getIncomeList();
    this.getSportsList();
    this.getAthletics();
    this.getParty();

  }
  datalist: any = '';
  profile_image: any;
  stateList:any='';
  raceList:any='';
  ethnicitylist:any='';
  incomeList:any='';
  sportsList:any='';
  athleticsList:any='';
  partyList:any='';


  getdeatials() {
    this.adminService.showLoader()
    this.adminService.getUserbyid(this.Id)
      .subscribe((res: any) => {
        this.datalist = res;
        this.adminService.hideLoader();
        this.profile_image = res.profile_image;
        this.form.patchValue(this.datalist);
      }, (errorResponse) => {
        // Handle HTTP error response (e.g., 401 Unauthorized)
        if (errorResponse.status) {
          this.adminService.hideLoader();
          this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
        } else {
          this.adminService.notifyError("An error occurred. Please try again later.");
          this.adminService.hideLoader();
        }
      });
  }
  onsave() {
    console.log(this.form.value);
  }
  selectFile:any='';
  
  onFileSelected(event: any): void {
    this.selectFile = event.target.files[0];
    var reader = new FileReader
    reader.readAsDataURL(this.selectFile);
    reader.onload = (event: any) => {
      this.url =
        this.url = event.target.result;
    }

    this.form.get('profile_image')?.setValue(this.selectFile) as unknown as FormControl;



  }

  getStateList(){

    this.adminService.getstate()
    .subscribe((res:any)=>{
      this.stateList=res.allOptionsList;
      console.log('the stateList are',this.stateList);
    })
  }

  getRace(){
    this.adminService.getrace()
    .subscribe((res:any)=>{
      // console.log('The raceList are',res);
      this.raceList=res.allOptionsList;
      console.log('the raceList are',this.raceList);
    })
  }

  getEthniCity(){
    this.adminService.getEthnicity()
    .subscribe((res:any)=>{
      this.ethnicitylist=res.allOptionsList;
      console.log('the ethnicityList are',this.ethnicitylist);

    })
  }

  getIncomeList(){
    this.adminService.getincome()
    .subscribe((res:any)=>{
     this.incomeList=res.allOptionsList;
     console.log('the incomeList are',this.incomeList);

    })
  }

  getSportsList(){
    this.adminService.getsports()
    .subscribe((res:any)=>{
     this.sportsList=res.allOptionsList;
     console.log('the sportsList are',this.sportsList);

    })
  }
  getAthletics(){
    this.adminService.getathletics()
    .subscribe((res:any)=>{
     this.athleticsList=res.allOptionsList;
     console.log('the athleticsList are',this.athleticsList)
    })
  }

  getParty(){
    this.adminService.getparty()
    .subscribe((res:any)=>{
     this.partyList=res.allOptionsList;
     console.log('the partyList are',this.partyList)
    })
  }

  formData:any;
  saveProfile() {
    console.log(this.form.value['zip_code'])
 
    this.formData = new FormData();
    this.formData.append('first_name', this.form.controls?.['first_name'].value);
    this.formData.append('state', this.form.controls?.['state'].value);
    this.formData.append('last_name',  this.form.controls?.['last_name'].value);
    // this.formData.append('email', this.form.controls?.['email'].value);
    // this.formData.append('phone', this.form.controls?.['phone'].value);
    this.formData.append('address', this.form.controls?.['address'].value);
    this.formData.append('zip_code', this.form.controls?.['zip_code'].value);
    this.formData.append('height', this.form.controls?.['height'].value);
    this.formData.append('weight', this.form.controls?.['weight'].value);
    //   const inpuDate = this.form.value['dob']
    //   const  Dob = this.formatDate(inpuDate);
    // console.log(Dob)
    //   this.formData.append('dob', Dob);

    this.formData.append('ethnicity', this.form.controls?.['ethnicity'].value);
    this.formData.append('marital_status', this.form.controls?.['marital_status'].value);
    this.formData.append('education', this.form.controls?.['education'].value);
    this.formData.append('occupation', this.form.controls?.['occupation'].value);
    this.formData.append('race', this.form.controls?.['race'].value);
    this.formData.append('income', this.form.controls?.['income'].value);
    this.formData.append('sports', this.form.controls?.['sports'].value);
    this.formData.append('athletics', this.form.controls?.['athletics'].value);
    this.formData.append('party', this.form.controls?.['party'].value);
    this.formData.append('climbing', this.form.controls?.['climbing'].value);
    this.formData.append('outing', this.form.controls?.['outing'].value);
    this.formData.append('cycling', this.form.controls?.['cycling'].value);
    this.formData.append('paypal_id', this.form.controls?.['paypal_id'].value);
    this.formData.append('gender', this.form.controls?.['gender'].value);
    this.formData.append('profile_image', this.selectFile);
    

    // for (const [key, value] of Object.entries(Object.fromEntries(this.formData))) {
    //   console.log(key, value);
    // }
 

    this.adminService.showLoader();
    try {

      this.adminService.updateuser(this.Id,this.formData)
        .subscribe((res: any) => {
          console.log(res);
          this.adminService.hideLoader();
          if (res) {
            this.adminService.notifySuccess(res.message);

           this.getdeatials();
          } else {
            this.adminService.notifyError(res.message);
          }
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.adminService.hideLoader();
            this.adminService.notifyError("Unauthorized: " + errorResponse.error.message);
          } else {
            this.adminService.notifyError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      this.adminService.notifyError("Internal server error");
    }
  }
}
