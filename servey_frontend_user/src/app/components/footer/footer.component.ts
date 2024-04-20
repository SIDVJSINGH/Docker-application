import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/Services/web.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  linkdin:any;
  threads:any;
  constructor(private webservice:WebService){}
ngOnInit(): void {
  this.webservice.getsociallink()
  .subscribe((res:any)=>{
this.linkdin=res.socialLinkData[0].linkedin_link;
this.threads=res.socialLinkData[0].threads_link;

  })
}
}
