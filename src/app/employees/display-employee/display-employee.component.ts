import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  // @Input() employee: Employee;
  // we use getter and setter method to get employeedata from input and set it to display

  // employeId: number;
  // employe: Employee;

  // @Input()
  // set employeeId(val: number) {
  //   this.employeId = val;
  // }

  // get employeeId(): number {
  //   return this.employeId;
  // }

  // @Input()
  // set employee(val: Employee) {
  //   // console.log('Previous : ' + (this.employe ? this.employe.name : 'NULL'));
  //   // console.log('Current : ' + val.name );
  //   this.employe = val;
  // }
  // get employee(): Employee {
  //   return this.employe;
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   for (const propName of Object.keys(changes)) {
  //     const change = changes[propName];
  //     const from = JSON.stringify(change.previousValue);
  //     const to = JSON.stringify(change.currentValue);

  //     console.log(propName + ' Changed from ' + from + ' to ' + to);

  //   }
  // }

  // to use ngOnChanges implement OnChanges template
  // ngOnChanges(changes: SimpleChanges) {
  //   const previousEmployee = changes.employee.previousValue as Employee;
  //   const currentEmployee = changes.employee.currentValue as Employee;
  //   console.log('Previous ' + (previousEmployee ? previousEmployee.name : 'NULL'));
  //   console.log('Current ' + currentEmployee.name);
  // }

  selectedEmployeeId: number;

  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.selectedEmployeeId = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this.router.navigate(['./employees', this.employee.id], {
      queryParams: { searchTerm: this.searchTerm }
    });
  }
  editEmployee() {
    this.router.navigate(['./edit', this.employee.id]);
  }
  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`employee with id = ${this.employee.id} deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }

}
