import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { MainComponent } from './Pages/main/main.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotpassComponent } from './Pages/forgotpass/forgotpass.component';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './Pages/profile/profile.component';
import { UserComponent } from './Pages/user/user.component';
import { SurveytemplComponent } from './Pages/surveytempl/surveytempl.component';
import { CategoryComponent } from './Pages/category/category.component';
import { SurveyformComponent } from './Pages/surveyform/surveyform.component';
import { RewardsComponent } from './Pages/rewards/rewards.component';
import { NotificationComponent } from './Pages/notification/notification.component';
import { VpasswordComponent } from './Pages/vpassword/vpassword.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NewpassComponent } from './Pages/newpass/newpass.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CmsComponent } from './Pages/cms/cms.component';
import { DialogcmsComponent } from './Pages/dialogcms/dialogcms.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UpdatecmsComponent } from './Pages/updatecms/updatecms.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DialogcreateuserComponent } from './Pages/dialogcreateuser/dialogcreateuser.component';
import { AvatarModule } from 'ngx-avatars';
import { UserdeatialsComponent } from './Pages/userdeatials/userdeatials.component';
import { DialogComponent } from './Pages/dialog/dialog.component';
import { JwtModule } from "@auth0/angular-jwt";
import { UpdatesurveyComponent } from './Pages/updatesurvey/updatesurvey.component';
import { SurveytypeComponent } from './Pages/surveytype/surveytype.component';
import { UpdatesurveytypeComponent } from './Pages/updatesurveytype/updatesurveytype.component';
import { UpdaterewardsComponent } from './Pages/updaterewards/updaterewards.component';
import { SurveycategoryComponent } from './Pages/surveycategory/surveycategory.component';
import { UpdatesurvtagComponent } from './Pages/updatesurvtag/updatesurvtag.component';
import { DatePipe } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { CompleteComponent } from './Pages/complete/complete.component';
import { UsercontactComponent } from './Pages/usercontact/usercontact.component';
import { ViewmessageComponent } from './Pages/viewmessage/viewmessage.component';
import { TermsandconditionComponent } from './Pages/termsandcondition/termsandcondition.component';
import { SettingsComponent } from './Pages/settings/settings.component';

import { UsereditComponent } from './Pages/useredit/useredit.component';
import { OptionsComponent } from './Pages/options/options.component';
import { AdminuserComponent } from './Pages/adminuser/adminuser.component';
import { AthleticsComponent } from './Pages/athletics/athletics.component';
import { EthniityComponent } from './Pages/ethniity/ethniity.component';
import { IncomeComponent } from './Pages/income/income.component';
import { PartyComponent } from './Pages/party/party.component';
import { RaceComponent } from './Pages/race/race.component';
import { SportsComponent } from './Pages/sports/sports.component';
import { AddathleticsComponent } from './Pages/athletics/addathletics/addathletics.component';
import { EditathleticsComponent } from './Pages/athletics/editathletics/editathletics.component';
import { AddethnicityComponent } from './Pages/ethniity/addethnicity/addethnicity.component';
import { EditethnicityComponent } from './Pages/ethniity/editethnicity/editethnicity.component';
import { AddincomeComponent } from './Pages/income/addincome/addincome.component';
import { EditincomeComponent } from './Pages/income/editincome/editincome.component';
import { AddpartyComponent } from './Pages/party/addparty/addparty.component';
import { EditpartyComponent } from './Pages/party/editparty/editparty.component';
import { AddraceComponent } from './Pages/race/addrace/addrace.component';
import { EditraceComponent } from './Pages/race/editrace/editrace.component';
import { AddsportsComponent } from './Pages/sports/addsports/addsports.component';
import { EditsportsComponent } from './Pages/sports/editsports/editsports.component';
import { AddstateComponent } from './Pages/options/addstate/addstate.component';
import { EditstateComponent } from './Pages/options/editstate/editstate.component';
import { AddadminComponent } from './Pages/adminuser/addadmin/addadmin.component';


export function tokenGetter() {
  return localStorage.getItem("Accesstoken");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    SignupComponent,
    ForgotpassComponent,
    ProfileComponent,
    UserComponent,
    SurveytemplComponent,
    CategoryComponent,
    SurveyformComponent,
    RewardsComponent,
    NotificationComponent,
    VpasswordComponent,
    NewpassComponent,
    CmsComponent,
    DialogcmsComponent,
    UpdatecmsComponent,
    DialogcreateuserComponent,
    UserdeatialsComponent,
    DialogComponent,
    UpdatesurveyComponent,
    SurveytypeComponent,
    UpdatesurveytypeComponent,
    UpdaterewardsComponent,
    SurveycategoryComponent,
    UpdatesurvtagComponent,
    CompleteComponent,
    UsercontactComponent,
    ViewmessageComponent,
    TermsandconditionComponent,
    SettingsComponent,

    UsereditComponent,
     OptionsComponent,
     AdminuserComponent,
     AthleticsComponent,
     EthniityComponent,
     IncomeComponent,
     PartyComponent,
     RaceComponent,
     SportsComponent,
     AddathleticsComponent,
     EditathleticsComponent,
     AddethnicityComponent,
     EditethnicityComponent,
     AddincomeComponent,
     EditincomeComponent,
     AddpartyComponent,
     EditpartyComponent,
     AddraceComponent,
     EditraceComponent,
     AddsportsComponent,
     EditsportsComponent,
     AddstateComponent,
     EditstateComponent,
     AddadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatExpansionModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    NgOtpInputModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularEditorModule,
    NgxSpinnerModule,
    AvatarModule,
    MatTabsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() { 
        return localStorage.getItem('Accesstoken');
        } 
     }
    }),


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
