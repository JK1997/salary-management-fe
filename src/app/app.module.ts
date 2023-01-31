import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { EmployeeComponent } from './employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListEmployeesComponent,
    MenuComponent,
    LogoutComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
