import { EMPLOYEE_JPA_API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../list-employees/list-employees.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllEmployees(username: string) {
    return this.http.get<Employee[]>(`${EMPLOYEE_JPA_API_URL}/users/${username}/employees`);
    //console.log("Execute Hello World Bean Service")
  }

  deleteEmployee(username: string, id: any){
    return this.http.delete(`${EMPLOYEE_JPA_API_URL}/users/${username}/employees/${id}`);
  }

  retrieveEmployee(username: string, id: number | undefined){
    return this.http.get<Employee>(`${EMPLOYEE_JPA_API_URL}/users/${username}/employees/${id}`);
  }

  updateEmployee(username: string, id: number | undefined, employee: Employee | undefined){
    return this.http.put(
          `${EMPLOYEE_JPA_API_URL}/users/${username}/employees/${id}`
                , employee);
  }

  createEmployee(username: string, employee: Employee | undefined){
    return this.http.post(
              `${EMPLOYEE_JPA_API_URL}/users/${username}/employees`
                , employee);
  }

}
