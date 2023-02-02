import { EMPLOYEE_JPA_API_URL } from './../../app.constants';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../list-employees/list-employees.component';
import {Observable} from "rxjs";
import {map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllEmployees(minSalary=0, maxSalary = 99999999, sort = 'asc',
                       pageNumber = 0, pageSize = 30):  Observable<any> {
    return this.http.get(`${EMPLOYEE_JPA_API_URL}/users/employees`, {
      params: new HttpParams()
        .set('minSalary', minSalary)
        .set('maxSalary', maxSalary)
        .set('sort', sort)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  deleteEmployee(id: any){
    return this.http.delete(`${EMPLOYEE_JPA_API_URL}/users/employees/${id}`);
  }

  retrieveEmployee(id: string){
    return this.http.get<Employee>(`${EMPLOYEE_JPA_API_URL}/users/employees/${id}`);
  }

  updateEmployee(id: string, employee: Employee | undefined){
    return this.http.put(
          `${EMPLOYEE_JPA_API_URL}/users/employees/${id}`
                , employee);
  }

  createEmployee(id: string, employee: Employee | undefined){
    return this.http.post(
              `${EMPLOYEE_JPA_API_URL}/users/employees/${id}`
                , employee);
  }

}
