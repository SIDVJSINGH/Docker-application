import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { MainComponent } from './Pages/main/main.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { ForgotpassComponent } from './Pages/forgotpass/forgotpass.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { UserComponent } from './Pages/user/user.component';
import { SurveytemplComponent } from './Pages/surveytempl/surveytempl.component';
import { CategoryComponent } from './Pages/category/category.component';
import { SurveyformComponent } from './Pages/surveyform/surveyform.component';
import { RewardsComponent } from './Pages/rewards/rewards.component';
import { NotificationComponent } from './Pages/notification/notification.component';
import { VpasswordComponent } from './Pages/vpassword/vpassword.component';
import { NewpassComponent } from './Pages/newpass/newpass.component';
import { loginGuard } from './loginguard/login.guard';
import { authGuard } from './auth.guard';
import { dashGuard } from './dashguard/dash.guard';
import { CmsComponent } from './Pages/cms/cms.component';
import { DialogcmsComponent } from './Pages/dialogcms/dialogcms.component';
import { UpdatecmsComponent } from './Pages/updatecms/updatecms.component';
import { DialogcreateuserComponent } from './Pages/dialogcreateuser/dialogcreateuser.component';
import { UserdeatialsComponent } from './Pages/userdeatials/userdeatials.component';
import { UpdatesurveyComponent } from './Pages/updatesurvey/updatesurvey.component';
import { SurveytypeComponent } from './Pages/surveytype/surveytype.component';
import { UpdatesurveytypeComponent } from './Pages/updatesurveytype/updatesurveytype.component';
import { SurveycategoryComponent } from './Pages/surveycategory/surveycategory.component';
import { UpdatesurvtagComponent } from './Pages/updatesurvtag/updatesurvtag.component';
import { CompleteComponent } from './Pages/complete/complete.component';
import { UsercontactComponent } from './Pages/usercontact/usercontact.component';
import { TermsandconditionComponent } from './Pages/termsandcondition/termsandcondition.component';
import { SettingsComponent } from './Pages/settings/settings.component';
import { UsereditComponent } from './Pages/useredit/useredit.component';
import { OptionsComponent } from './Pages/options/options.component';
import { AdminuserComponent } from './Pages/adminuser/adminuser.component';
import { SportsComponent } from './Pages/sports/sports.component';
import { AthleticsComponent } from './Pages/athletics/athletics.component';
import { EthniityComponent } from './Pages/ethniity/ethniity.component';
import { IncomeComponent } from './Pages/income/income.component';
import { PartyComponent } from './Pages/party/party.component';
import { RaceComponent } from './Pages/race/race.component';

const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'login' },
{ path: 'login', component: LoginComponent,canActivate:[loginGuard] },
{ path: 'forgotpass', component: ForgotpassComponent },
{ path: 'vpassword/:email', component: VpasswordComponent },
{ path: 'newpass/:email', component: NewpassComponent },
// {path:'signup',component:SignupComponent},
{path:'terms',component:TermsandconditionComponent},


{
  path: 'main', component: MainComponent,canActivate:[dashGuard],
  children: [
    { path: 'dashboard', component: DashboardComponent },

    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: UserComponent },
    { path: 'surveytempl', component: SurveytemplComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'surveyform', component: SurveyformComponent },
    { path: 'surveyform/rewards/:id', component: RewardsComponent },
    { path: 'notification', component: NotificationComponent },
    {path:'cms', component:CmsComponent},
    {path:'dialogcms', component:DialogcmsComponent},
    {path:'cms/updatecms/:id',component:UpdatecmsComponent},
    {path:'settings',component:SettingsComponent},
    {path:'user/view/:id',component:UserdeatialsComponent},
    { path: 'surveyform/updatesurvey/:id', component: UpdatesurveyComponent },
    {path:'surveytype',component:SurveytypeComponent},
    {path:'surveytype/updatesurveytype/:id',component:UpdatesurveytypeComponent},
    {path:'surveycategory',component:SurveycategoryComponent},
    {path:'surveycategory/updatesurvtag/:id',component:UpdatesurvtagComponent},
    {path:'surveyform/complete/:id', component:CompleteComponent},
    {path:'usercontact', component:UsercontactComponent},
    {path:'user/edit',component:UsereditComponent},
    {path:'options',component:OptionsComponent},
    {path:'adminuser', component:AdminuserComponent},
    {path:'sports', component:SportsComponent},
    {path:'ethnicity',component:EthniityComponent},
    {path:'income',component:IncomeComponent},
    {path:'party',component:PartyComponent},
    {path:'race',component:RaceComponent},
    {path:'athletics',component:AthleticsComponent}
   

  
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
