import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthServiceService } from './myservices/auth-service.service';
import { RegisterComponent } from './register/register.component';
import { ViewNotFoundComponent } from './view-not-found/view-not-found.component';

const routes: Routes = [
{ path:'home',   component:HomeComponent, 
  children:[
    {  path:'companydetails', component:CompanyDetailsComponent}
  ]      
},
{ path:'departments', component:DepartmentComponent },
{ path:'login', component:LoginComponent },
{ path:'register', component:RegisterComponent},
{ path:'register/:eid', component:RegisterComponent },
{path:'employees', component:EmployeeDetailsComponent, canActivate:[AuthServiceService] },

{path:'', component:HomeComponent},
{path:'**', component: ViewNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
