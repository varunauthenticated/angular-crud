import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm', {static: true}) public createEmployeeForm: NgForm;

  previewPhoto = false;
  panelTitle: string;
  datePickerConfig: Partial<BsDatepickerConfig>;
  // pth = 'assets/images/2.jpg';
  employee: Employee;

  departments: Department[] = [
    {id: 1, name: 'Help Desk'},
    {id: 2, name: 'HR'},
    {id: 3, name: 'IT'},
    {id: 4, name: 'Paroll'},
  ];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.datePickerConfig = Object.assign({}, {
      isAnimated: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this.employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }

  saveEmployee(): void {
    if (this.employee.id == null) {
    this.employeeService.addEmployee(this.employee).subscribe(
      (data: Employee) => {
        console.log(data);
        this.createEmployeeForm.reset();
        this.router.navigate(['list']);
      },
      (error: any) => console.log(error)
    );
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this.router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
  }

  togglePhotoPreview(imgPath: string) {
    // this.pth = imgPath;
    this.previewPhoto = !this.previewPhoto;
  }

}
