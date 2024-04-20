import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SurveyListComponent } from './pages/survey-list/survey-list.component';
import { ManageProfileComponent } from './pages/manage-profile/manage-profile.component';
import { ManageRewardsComponent } from './pages/manage-rewards/manage-rewards.component';
import { RedeemRewardsComponent } from './pages/redeem-rewards/redeem-rewards.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonTemplateComponent } from './components/common-template/common-template.component';
import { MaterialModules } from './modules/MaterialModules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './pages/otp/otp.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { EmailverifyComponent } from './pages/emailverify/emailverify.component';
import { TermsModalComponent } from './pages/terms-modal/terms-modal.component';
import { PrivacyModalComponent } from './pages/privacy-modal/privacy-modal.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    SurveyListComponent,
    ManageProfileComponent,
    ManageRewardsComponent,
    RedeemRewardsComponent,
    HeaderComponent,
    FooterComponent,
    CommonTemplateComponent,
    SideNavComponent,
    OtpComponent,
    AboutusComponent,
    ContactusComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    EmailverifyComponent,
    TermsModalComponent,
    PrivacyModalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    NgOtpInputModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
