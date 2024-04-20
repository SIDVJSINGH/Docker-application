import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/Services/web.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  constructor( private webservice:WebService){}

ngOnInit(): void {
  this.getdata();
}
aboutUsContent:any;
getdata(){
  this.webservice.showLoader();
  this.webservice.aboutUs()
  .subscribe((res:any)=>{
const cmsdata=res.allCms;
this.webservice.hideLoader();
const aboutUsData = cmsdata.find((cms:any) => cms.name === 'about-us');
if (aboutUsData) {
  this.aboutUsContent = aboutUsData.content;
  console.log(this.aboutUsContent)
}
 
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status ) {
            this.webservice.hideLoader();

            this.webservice.notifyError("An error occurred. Please try again later.");
          } else {
            this.webservice.notifyError("An error occurred. Please try again later.");
          }
        });
}
}
