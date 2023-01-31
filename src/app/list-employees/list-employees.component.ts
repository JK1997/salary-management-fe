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

  dataSource: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'login', 'salary', 'options'];


  constructor(
    private employeeService:EmployeeDataService,
    private router : Router
  ) { }

  ngOnInit() {
    this.refreshEmployees();
  }

  refreshEmployees(){
    this.employeeService.retrieveAllEmployees().subscribe(
      response => {
        this.dataSource = response;
        console.log(this.dataSource);
      }
    )
  }

  deleteEmployee(id: any) {
    console.log(`delete employee ${id}` )
    this.employeeService.deleteEmployee(id).subscribe (
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

