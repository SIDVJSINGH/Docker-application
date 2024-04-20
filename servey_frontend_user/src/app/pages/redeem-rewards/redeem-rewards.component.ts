import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/Services/web.service';

@Component({
  selector: 'app-redeem-rewards',
  templateUrl: './redeem-rewards.component.html',
  styleUrls: ['./redeem-rewards.component.scss'],
})
export class RedeemRewardsComponent  implements OnInit{
  isActive: boolean = true;
  getreward:any;
  constructor(private webservice:WebService){}
  ngOnInit(): void {
    this.getrewards();
  }
  getrewards() {
    this.webservice.showLoader();
    try {
      this.webservice.getRewards()
        .subscribe((res: any) => {
          this.webservice.hideLoader();
          if (res.status) {
            this.getreward = res.allRewardLists.total_Reward_Value;
           console.log(this.getreward)
          
           
          } else {
            this.webservice.notifyError('Something went wrong');
          }
        }, (errorResponse) => {
          // Handle HTTP error response (e.g., 401 Unauthorized)
          if (errorResponse.status) {
            this.webservice.hideLoader();

            this.webservice.notifyError( errorResponse.error.message);
          } else {
            this.webservice.notifyError("An error occurred. Please try again later.");
          }
        });
    } catch (error) {
      this.webservice.notifyError('Something went wrong');
    }
  }
}
