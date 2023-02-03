import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {Employee} from "./list-employees.component";
import {EmployeeDataService} from "../service/data/employee-data.service";

export class EmployeesDataSource implements DataSource<Employee> {

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalNumberOfEmployeesSubject = new BehaviorSubject<number>(30);

  public loading$ = this.loadingSubject.asObservable();
  public totalNumberOfEmployees$ = this.totalNumberOfEmployeesSubject.asObservable();

  constructor(private employeeDataService: EmployeeDataService) {}

  connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.employeesSubject.complete();
    this.loadingSubject.complete();
    this.totalNumberOfEmployeesSubject.complete();
  }

  loadEmployees(minSalary= 0, maxSalary = 99999999,
              sort = 'asc', pageIndex = 0, pageSize = 30, sortActive="id") {

    this.loadingSubject.next(true);

    this.employeeDataService.retrieveAllEmployees(minSalary, maxSalary, sort,
      pageIndex, pageSize, sortActive).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(response => {
        this.employeesSubject.next(response["results"]);
        this.totalNumberOfEmployeesSubject.next(response["totalNumberOfEmployees"])
      });
  }
}
