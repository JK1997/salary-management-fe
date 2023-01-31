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

  retrieveAllEmployees() {
    return this.http.get<Employee[]>(`${EMPLOYEE_JPA_API_URL}/users/employees`);
    //console.log("Execute Hello World Bean Service")
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
