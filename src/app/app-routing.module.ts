import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {DataTableComponent} from './data-table/data-table.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'Signup',component:EmployeeListComponent},
  {path:'Signin',component:DataTableComponent},
  {path :'',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
