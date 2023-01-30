import { EmployeeDataService } from '../service/data/employee-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class Employee {
  constructor(
    public id: number | undefined,
    public name: string,
    public login: string,
    public salary: number
  ){

  }
}

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[] | undefined

  message: string | undefined



  constructor(
    private employeeService:EmployeeDataService,
    private router : Router
  ) { }

  ngOnInit() {
    this.refreshEmployees();
  }

  refreshEmployees(){
    this.employeeService.retrieveAllEmployees('in28minutes').subscribe(
      response => {
        console.log(response);
        this.employees = response;
      }
    )
  }

  deleteEmployee(id: any) {
    console.log(`delete employee ${id}` )
    this.employeeService.deleteEmployee('in28minutes', id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of Employee ${id} Successful!`;
        this.refreshEmployees();
      }
    )
  }

  updateEmployee(id: any) {
    console.log(`update ${id}`)
    this.router.navigate(['employees',id])
  }

  addEmployee() {
    this.router.navigate(['employees',-1])
  }
}

