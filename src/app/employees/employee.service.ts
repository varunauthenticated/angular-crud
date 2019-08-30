import { Employee } from '../models/employee.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
  private listEmployees: Employee[]  = [
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
    return of(this.listEmployees).pipe(delay(2000));
  }

  getEmployee(id: number): Employee {
    return this.listEmployees.find(e => e.id === id);
  }

  save(employee: Employee) {
    if (employee.id === null) {
      const maxId = this.listEmployees.reduce((e1, e2) => {
        return (e1.id > e2.id) ? e1 : e2;
      }).id;
      employee.id = maxId + 1;
      this.listEmployees.push(employee);
    } else {
      const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
      this.listEmployees[foundIndex] = employee;
    }
  }

  deleteEmployee(id: number) {
    const i = this.listEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.listEmployees.splice(i, 1);
    }
  }
}
