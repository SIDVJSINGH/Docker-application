import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebService {
  public apiUrl = environment.API_URL;
  private profileDataSubject = new BehaviorSubject<any>(null);
  profileData$ = this.profileDataSubject.asObservable();
  accesstoken:string='';
refreshtoken:string='';
  constructor(
    public http: HttpClient,
    private route: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService,
    private router:Router,


  ) {
    const storedTokensJSON = localStorage.getItem('tokens');
    if (storedTokensJSON) {
    const storedTokens = JSON.parse(storedTokensJSON);
    this.accesstoken=storedTokens.access.token;
    this.refreshtoken=storedTokens.refresh.token;
    
    
    } 
    const profileDataString = localStorage.getItem('user_list');
    if (profileDataString) {
      const user_list = JSON.parse(profileDataString);
      this.profileDataSubject.next(user_list);
    }
   }

  showLoader() {
    this.spinner.show()
  }
  hideLoader() {
    this.spinner.hide()
  }
  notifySuccess(msg: string) {
    this.toastr.success(msg, 'Success', {
      closeButton: true,
      timeOut: 3000,
      tapToDismiss: true,
    });
  }
  notifyError(msg: string) {
    this.toastr.error(msg, 'Oops', {
      timeOut: 3000,
      closeButton: true,
    });
  }
  notifyError1(msg: string) {
    this.toastr.error(msg, 'Oops', {
      timeOut: 1500,
      closeButton: true,
      positionClass: 'custom-toast-container', // Use the custom CSS class for positioning

    });
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token'); // Replace with how you access your token
    // console.log(token);
    return this.jwtHelper.isTokenExpired(token);

  }
  getNewaccessToken() {
    const token = localStorage.getItem('refreshtoken'); // Replace with how you access your token
    const access = localStorage.getItem('token');
    // console.log(token);
    const isRfreshTokenExpire = this.jwtHelper.isTokenExpired(token);
    if (isRfreshTokenExpire) {
      return this.logout();
    }
    const refreshTokenUrl = this.apiUrl + '/auth/refresh-tokens';
    const refreshTokenPayload = { refreshToken: token };


    this.http.post<any>(refreshTokenUrl, refreshTokenPayload).
      subscribe((response) => {
        // console.log(response.access.token);

        // console.log(response.refresh.token)
        localStorage.setItem('token', response.access.token);
        localStorage.setItem('refreshtoken', response.refresh.token);

      })

  }
  SignUp(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/register`,data);
  } 

  login(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`,data);
  } 
  logout() {
    localStorage.clear();
    this.accesstoken = '';

    this.router.navigateByUrl('/login')
      .then(() => { window.location.reload(); })
  }

  deleteaccount(token1:any) {
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/auth/remove-account`,token1,{ headers })
  }
  forgptPass(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/forgot-password`,data)
   }
   verifypass(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/verify-otp`,data)
   }
  
   resetpass(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/reset-password`,data)
   }
  sendEmail(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/send-verification-email`,data);
  } 

  emailVarification(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/verify-email`,data);
  } 
  sendPhone(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/send-verification-phone`,data);
  } 

  phoneVarification(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/verify-phone`,data);
  } 
  getProfile():Observable<any>{
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`${this.apiUrl}/auth/user/get-profile-details/`, { headers })
  }
  UpdateProfile(data:any):Observable<any>{
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/auth/update-profile`,data, { headers })
  }
  changePassword(data:any):Observable<any>{
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/auth/change-password`,data, { headers })
  }

  getRewards():Observable<any>{
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`${this.apiUrl}/survey-category-management/get/user/AllRewardLists`, { headers })
  }
  userSurveyList():Observable<any>{

    const tokenss = this.isTokenExpired();
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`${this.apiUrl}/survey-category-management/get/user/AllActiveSurveyLists/`,{headers})
  }
  updateProfileData(user_list: any) {
    // Update the profile data in localStorage
            localStorage.setItem('user_list', JSON.stringify(user_list));
   
    // Emit the updated profile data
    this.profileDataSubject.next(user_list);
 }

 participate(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
  return this.http.post(`${this.apiUrl}/survey-category-management/add/user-survey-participation`,data, { headers })
}

contactus(data:any):Observable<any>{

  return this.http.post(`${this.apiUrl}/cms/user/contact-us`,data)
}
aboutUs():Observable<any>{

  return this.http.get(`${this.apiUrl}/cms/`)
}
getsociallink():Observable<any>{

  return this.http.get(`${this.apiUrl}/cms/get/all-user-social-link-data`)
}
getcountry():Observable<any>{
  return this.http.get(`${this.apiUrl}/options/get-country-option/`)

}

getstate():Observable<any>{
  return this.http.get(`${this.apiUrl}/options/get-state-option/`)

}
getsports():Observable<any>{
  return this.http.get(`${this.apiUrl}/options/get-sports-option/`)

}
getrace():Observable<any>{
  return this.http.get(`${this.apiUrl}/options/get-race-option/`)

}
getEthnicity():Observable<any>{
  return this.http.get(`${this.apiUrl}/options/get-ethinicity-option`)

}
getincome():Observable<any>{
  return this.http.get(`${this.apiUrl}/options/get-income-status-option/`)

}
getathletics():Observable<any>{
  return this.http.get(`${this.apiUrl}/options/get-athletics-status-option/`)

}
getparty():Observable<any>{
  return this.http.get(`${this.apiUrl}/options/get-party-status-option/`)

}
}
