import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {
  constructor(private employeeService: EmployeeService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const employeeExists =  !!this.employeeService.getEmployee(+route.paramMap.get('id'));

    if (employeeExists) {
      return true;
    } else {
      this.router.navigate(['/notfound']);
      return false;
    }
  }
 }
