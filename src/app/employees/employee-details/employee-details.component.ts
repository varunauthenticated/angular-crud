import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  private id: number;
  employee: Employee;

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.employee = this.employeeService.getEmployee(this.id);
    });
  }

  viewNextEmployee() {
    if (this.id < 3) {
      this.id += 1;
    } else {
      this.id = 1;
    }
    this.router.navigate(['/employees', this.id], {
      queryParamsHandling: 'preserve'
    });
  }

}
