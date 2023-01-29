import { EmployeeComponent } from './employee/employee.component';
import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';

// welcome
const routes: Routes = [
  { path: '', component: LoginComponent  },//canActivate, RouteGuardService
  { path: 'login', component: LoginComponent },
  { path: 'welcome/:name', component: WelcomeComponent, canActivate:[RouteGuardService]},
  { path: 'employees', component: ListEmployeesComponent, canActivate:[RouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService] },
  { path: 'employees/:id', component: EmployeeComponent, canActivate:[RouteGuardService] },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
