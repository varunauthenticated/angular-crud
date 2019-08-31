import { Employee } from '../models/employee.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) { }
  baseUrl = 'http://localhost:3000/employees';

  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'Varun',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'varunstar93@gmail.com',
      dateOfBirth: new Date('12/28/1993'),
      department: '3',
      isActive: true,
      photoPath: 'assets/images/1.jpg',
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 9090908080,
      dateOfBirth: new Date('10/28/1995'),
      department: '2',
      isActive: true,
      photoPath: 'assets/images/2.jpg',
    },
    {
      id: 3,
      name: 'Ranjeet',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 2929808070,
      dateOfBirth: new Date('3/20/1992'),
      department: '3',
      isActive: false,
      photoPath: 'assets/images/3.jpg',
    },
  ];

  getEmployees(): Observable<Employee[]> {
    // return of(this.listEmployees).pipe(delay(2000));
    return this.httpClient.get<Employee[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('There is a problem with the service. We are notified and working on it. Please try again later');
  }

  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseUrl, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));

  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
}
