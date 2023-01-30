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

  retrieveAllEmployees(login: string) {
    return this.http.get<Employee[]>(`${EMPLOYEE_JPA_API_URL}/users/${login}/employees`);
    //console.log("Execute Hello World Bean Service")
  }

  deleteEmployee(login: string, id: any){
    return this.http.delete(`${EMPLOYEE_JPA_API_URL}/users/${login}/employees/${id}`);
  }

  retrieveEmployee(login: string, id: string){
    return this.http.get<Employee>(`${EMPLOYEE_JPA_API_URL}/users/${login}/employees/${id}`);
  }

  updateEmployee(login: string, id: string, employee: Employee | undefined){
    return this.http.put(
          `${EMPLOYEE_JPA_API_URL}/users/${login}/employees/${id}`
                , employee);
  }

  createEmployee(login: string, id: string, employee: Employee | undefined){
    return this.http.post(
              `${EMPLOYEE_JPA_API_URL}/users/${login}/employees/${id}`
                , employee);
  }

}
