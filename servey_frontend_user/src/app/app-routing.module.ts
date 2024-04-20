import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SurveyListComponent } from './pages/survey-list/survey-list.component';
import { ManageProfileComponent } from './pages/manage-profile/manage-profile.component';
import { ManageRewardsComponent } from './pages/manage-rewards/manage-rewards.component';
import { RedeemRewardsComponent } from './pages/redeem-rewards/redeem-rewards.component';
import { loginGuard } from './authguard/login.guard';
import { menuGuard } from './authguard/menu.guard';
import { OtpverifiesComponent } from './pages/otpverifies/otpverifies.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full',canActivate: [loginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: 'registration',
    component: SignupComponent,
    canActivate: [loginGuard],
  },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'verify', component: OtpverifiesComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'survey-listing',
    component: SurveyListComponent,
    canActivate: [menuGuard],
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent,
    canActivate: [menuGuard],
  },
  {
    path: 'manage-rewards',
    children: [
      { path: '', component: ManageRewardsComponent, canActivate: [menuGuard] },
      {
        // path: 'manage-rewards/redeem-rewards',
        path: 'redeem-rewards',
        component: RedeemRewardsComponent,
        canActivate: [menuGuard],
      },
    ],
  },

  { path: 'contact-us', component: ContactusComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'terms-and-condition', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
