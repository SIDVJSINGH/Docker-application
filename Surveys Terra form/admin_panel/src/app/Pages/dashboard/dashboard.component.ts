import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminserviceService } from 'src/app/Services/adminservice.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  userlist: any;
  surveycompletelist: any;
  surveycreatelist: any;
  typelist: any;
  categorylist: any;
  cmslist: any;
  constructor(private adminservice: AdminserviceService) {

  }

  ngOnInit(): void {
    this.gettotaluser();
    this.getsurveycomplete();
    this.getsurveycreate();
    this.surveytype();
    this.surveycategory();
    this.cms();
  }
  gettotaluser() {
    try {
      this.adminservice.getUser()
        .subscribe((res: any) => {
       
          this.userlist = res.userList.length;
         
        })
    } catch (error) {
      this.adminservice.notifyError("something went wrong")
    }

  }

  getsurveycomplete() {
    try {
      this.adminservice.getUsercontact()
        .subscribe((res: any) => {
          this.surveycompletelist = res.contactUsData.length;
        })
    } catch (error) {
      this.adminservice.notifyError("something went wrong")
    }

  }

  getsurveycreate() {
    try {
      this.adminservice.totalDashsurveycrete()
        .subscribe((res: any) => {
          this.surveycreatelist = res.totalNoSurveyCreated;
        })
    } catch (error) {
      this.adminservice.notifyError("something went wrong")
    }

  }
  surveytype() {
    this.adminservice.getSurveyType()
      .subscribe((res: any) => {

        this.typelist = res.allSurveyType.length;

      })
  }
  surveycategory() {
    this.adminservice.getAllSurveyTag()
      .subscribe((res: any) => {

        this.categorylist = res.allSurveyType.length;

      })
  }
  cms() {
    this.adminservice.getCms()
      .subscribe((res: any) => {
        this.cmslist = res.allCms.length;

      })
  }

}
