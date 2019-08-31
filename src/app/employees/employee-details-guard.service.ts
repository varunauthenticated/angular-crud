import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {
  constructor(private employeeService: EmployeeService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.employeeService.getEmployee(+route.paramMap.get('id')).pipe(
      map(employee => {
        const employeeExists = !!employee;
        if (employeeExists) {
          return true;
        } else {
          this.router.navigate(['/notfound']);
          return false;
        }
      })
    );

  }
}
