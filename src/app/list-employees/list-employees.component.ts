import { EmployeeDataService } from '../service/data/employee-data.service';
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {EmployeesDataSource} from "./EmployeesDataSource";
import {MatPaginator} from "@angular/material/paginator";
import {debounceTime, distinctUntilChanged, fromEvent, merge, tap} from 'rxjs';
import {MatSort} from "@angular/material/sort";

export class Employee {

    public id!: string;
    public name!: string;
    public login!: string;
    public salary!: number;

}

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements AfterViewInit, OnInit {

  modalRef: BsModalRef | undefined;

  employees: Employee[] | undefined

  message: string | undefined
  fileName = '';

  employee: Employee | undefined;
  dataSource!: EmployeesDataSource;
  displayedColumns: string[] = ['id', 'name', 'login', 'salary', 'options'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('minSalary') minSalary: ElementRef | undefined;
  @ViewChild('maxSalary') maxSalary: ElementRef | undefined;

  constructor(
    private employeeService:EmployeeDataService,
    private router : Router,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.employee = this.route.snapshot.data["employee"];
    this.dataSource = new EmployeesDataSource(this.employeeService);
    // @ts-ignore
    this.dataSource.loadEmployees(0, 99999999, 'asc', 0, 30, 'id');
  }

  ngAfterViewInit() {

    // @ts-ignore
    merge(fromEvent(this.minSalary.nativeElement,'keyup'), fromEvent(this.maxSalary.nativeElement,'keyup'))
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          // @ts-ignore
          this.paginator.pageIndex = 0;
          this.loadEmployeesPage();
        })
      )
      .subscribe();

    // @ts-ignore
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // @ts-ignore
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadEmployeesPage())
      )
      .subscribe();
  }

  loadEmployeesPage() {
    // @ts-ignore
    this.dataSource.loadEmployees(this.minSalary.nativeElement.value, this.maxSalary.nativeElement.value, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.sort.active);
    console.log(this.dataSource.loadEmployees);

  }

  /*refreshEmployees(){
    this.employeeService.retrieveAllEmployees().subscribe(
      response => {
        this.dataSource = response;
        console.log(this.dataSource);
      }
    )
  }*/

  deleteEmployee(id: any) {
    console.log(`delete employee ${id}` )
    this.employeeService.deleteEmployee(id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of Employee ${id} Successful!`;
        this.loadEmployeesPage()
        // this.refreshEmployees();
        // @ts-ignore
        this.modalRef.hide();
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm modal-dialog-centered'});
  }

  decline(): void {
    // @ts-ignore
    this.modalRef.hide();
  }

  onFileSelected(event : any) {

    const file:File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("file", file);

      this.employeeService.uploadCSV(formData)
        .subscribe (
          data => {
            console.log(data)
            this.loadEmployeesPage()
          }
        )
    }
  }

}

