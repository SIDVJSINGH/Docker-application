import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  public apiUrl = environment.API_URL;
  logintoken: any=localStorage.getItem('Accesstoken')
  constructor(private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,

    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  showLoader() {
    this.spinner.show()
  }
  hideLoader() {
    this.spinner.hide()
  }
  notifySuccess(msg: string) {
    this.toastr.success(msg, 'Success', {
      closeButton: true,
      timeOut: 1600,
      tapToDismiss: true,
    });
  }
  notifyError(msg: string) {
    this.toastr.error(msg, 'Oops', {
      timeOut: 3000,
      closeButton: true,
    });
  }


  isTokenExpired(): boolean {
    const token = localStorage.getItem('Accesstoken'); // Replace with how you access your token
    // console.log(token);
    return this.jwtHelper.isTokenExpired(token);

  }
  getNewaccessToken() {
    const token = localStorage.getItem('Refreshtoken'); // Replace with how you access your token
    const access = localStorage.getItem('Accesstoken');
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
        localStorage.setItem('Accesstoken', response.access.token);
        localStorage.setItem('Refreshtoken', response.refresh.token);

      })

  }

  forgotpass(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, data);
  }

  verifypass(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/verify-otp`, data);
  }

  resetpass(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, data);
  }

  adminLogin(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data)
  }
  adminLogout(data:any){
    this.http.post(`${this.apiUrl}/auth/logout`,data)
  }
  logout() {
    localStorage.clear();
    this.logintoken = '';
    // this.userdata.next(null);
    this.router.navigateByUrl('/login')
      .then(() => { window.location.reload(); })
  }

  
  

  getSurveyList(){
    return this.http.get(`${this.apiUrl}/survey-category-management/`)
  }
  createSurvey(data:any){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/survey-category-management/add/new-survey-category`,data, { headers })
  }

  getSurveyListById(id:any){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    return this.http.get(`${this.apiUrl}/survey-category-management/${id}`)
  }

  deleteSurvey(data:any){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/survey-category-management/deleteSurveyCategory`, data, { headers });
  }

  updateSurvey(category_id:any,data:any){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    const params=new HttpParams().set('category_id',category_id.toString())
    return this.http.post(`${this.apiUrl}/survey-category-management/updateSurveyCategory?${params}`, data, { headers })
  }

  getProfile(){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`${this.apiUrl}/auth/user/get-profile-details/`,{headers})
  }

  updateProfile(data:any){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/auth/update-profile`, data, { headers })
  }

  getSurveyTypeById(id:any){
    return this.http.get(`${this.apiUrl}/survey-category-management/getAllSurveyType/${id}`)
  }
  getSurveyType(){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`${this.apiUrl}/survey-category-management/getAllSurveyType/`)
  }

  getSurveyTypeUpdate(type_id:any,data:any){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    const params=new HttpParams().set('type_id',type_id.toString())
    return this.http.post(`${this.apiUrl}/survey-category-management/updateSurveyType?${params}`, data, { headers })

  }

  surveyTypeDelete(data:any){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/survey-category-management/deleteSurveyType`, data, { headers });
  }

  AddSurveyType(data: any) {

    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/survey-category-management/add/new-survey-type`, data, { headers })
  }

  getAllSurveyTag(){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`${this.apiUrl}/survey-category-management/getAllSurveyTag/`) 
   }

   getAllSurveyTagById(id:any){
    return this.http.get(`${this.apiUrl}/survey-category-management/getAllSurveyTag/${id}`)
   }

   getSurveyTagUpdate(tag_id: any, data: any) {
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    const params = new HttpParams().set('tag_id', tag_id.toString())
    return this.http.post(`${this.apiUrl}/survey-category-management/updateSurveyTag?${params}`, data, { headers })

  }
  addSurveyTag(data:any){
    const tokenss = this.isTokenExpired();
    // console.log(tokenss);
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/survey-category-management/add/new-survey-tag`, data, { headers })
  }
  surveyTagDelete(data: any) {
    const tokenss = this.isTokenExpired();
    if (tokenss) {
      this.getNewaccessToken()

    }
    const token = localStorage.getItem('Accesstoken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.apiUrl}/survey-category-management/deleteSurveyTag`, data, { headers });
  }

  getUserLoggedIn() {
    return this.logintoken
  }
getCms():Observable<any>{
  return this.http.get(`${this.apiUrl}/cms/`)
}
addCms(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
  return this.http.post(`${this.apiUrl}/cms/add/new-cms`,data,{headers})
}
getCmsByid(id:any){
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
  return this.http.get(`${this.apiUrl}/cms/${id}`, { headers })
}
cmsUpdate(id:any,data: any,) {

  // console.log(tokenss);
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
  return this.http.post(`${this.apiUrl}/cms/update/${id}`, data, { headers })
}


deletecms(id:any,data:any){
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
  return this.http.post(`${this.apiUrl}/cms/remove/cms-data/${id}`,data, { headers })
}
 totalDashRegisterUser():Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/auth/user/get-total-registered-users/`,{headers})
 }

 totalDashsurveycomplete():Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/auth/user/get-total-survey-completed/`,{headers})
 }

 totalDashsurveycrete():Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/auth/user/get-total-survey-created/`,{headers})
 }


 getUser():Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/auth/user/all-user-lists/`,{headers})
 }

getUserbyid(id:any){
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/users/${id}`,{headers})
 }

 deleteuser(userId:number):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
  // const params = new HttpParams().set('userId', userId.toString());

return this.http.delete(`${this.apiUrl}/users/${userId}`,{headers})
 }
createuser(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/users/`,data,{headers})
}
blockuser(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.patch(`${this.apiUrl}/users/${id}`,data,{headers})
}


Allparicipation(id:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/survey-category-management/get/user/AllParticipationLists/${id}`,{headers})
}


updateRewards(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/survey-category-management/updateRewardCategory/${id}`,data,{headers})
}

getRewardsbyid(id:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/survey-category-management/getRewardCategory/${id}`,{headers})
}
getsociallink():Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/cms/get/all-user-social-link-data`)
}

Sociallink(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/cms/add/social-link/${id}`,data,{headers})
}
getUsercontact():Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/cms/get/all-user-contact-us-data`)
}

registration(data:any):Observable<any>{
  return this.http.post(`${this.apiUrl}/auth/register`,data)

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

addstate(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/add/new-state-option`,data,{headers})

}
addsports(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/add/new-sports-option`,data,{headers})

}
addrace(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/add/new-race-option`,data,{headers})

}
addEthnicity(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/add/new-ethinicity-option`,data,{headers})

}
addincome(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/add/new-income-status-option`,data,{headers})

}
addathletics(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/add/new-athletics-status-option`,data,{headers})

}
addparty(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/add/new-party-status-option`,data,{headers})

}


updatestate(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/update/state-option/${id}`,data,{headers})

}
updatesports(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/update/sports-option/${id}`,data,{headers})

}
updaterace(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/update/race-option/${id}`,data,{headers})

}
updateEthnicity(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/update/ethinicity-option/${id}`,data,{headers})

}
updateincome(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/update/income-status-option/${id}`,data,{headers})

}
updateathletics(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/update/athletics-status-option/${id}`,data,{headers})

}
updateparty(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/update/party-status-option/${id}`,data,{headers})

}


removestate(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/remove/state-option/${id}`,data,{headers})

}
removesports(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/remove/sports-option/${id}`,data,{headers})

}
removerace(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/remove/race-option/${id}`,data,{headers})

}
removeEthnicity(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/remove/ethinicity-option/${id}`,data,{headers})

}
removeincome(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/remove/income-status-option/${id}`,data,{headers})

}
removeathletics(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/remove/athletics-status-option/${id}`,data,{headers})

}
removeparty(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/options/remove/party-status-option/${id}`,data,{headers})

}

getadmin():Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.get(`${this.apiUrl}/auth/admin/get-all-admin-list/`,{headers})

}

addadmin(data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/auth/add-admin`,data,{headers})

}

updateuser(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
  // console.log("kjfkjj",data.profile_image)

  // if (!data.profile_image) {
  //   const formDataObject:any = {};
  //   data.forEach((value:any, key:any) => {
  //     formDataObject[key] = value;
  //     console.log("true")
  //   });
  //   return this.http.patch(`${this.apiUrl}/users/${id}`,formDataObject,{headers})

  // } else {
  //   console.log("false")

  //   return this.http.patch(`${this.apiUrl}/users/${id}`,data,{headers})

  // }
  return this.http.post(`${this.apiUrl}/auth/update-profile/${id}`,data,{headers})

}
deleteadmin(id:any,data:any):Observable<any>{
  const tokenss = this.isTokenExpired();
  // console.log(tokenss);
  if (tokenss) {
    this.getNewaccessToken()

  }
  const token = localStorage.getItem('Accesstoken');
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });
return this.http.post(`${this.apiUrl}/auth/delete-admin/${id}`,data,{headers})

}

}