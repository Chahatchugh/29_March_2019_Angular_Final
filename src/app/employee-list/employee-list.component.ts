import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employee = [];
  employeeform:FormGroup;

  constructor(private employeeservice: EmployeeService) { }

  ngOnInit() {

    this.employeeform=this.employeeservice.form;
  }

get name()
{
  return this.employeeform.get('name');
}
get email()
{
  return this.employeeform.get('email');
}
get password()
{
  return this.employeeform.get('password');
}
  onSubmit(employeeform) {

    this.employeeservice.signup(this.employeeform.value.email, this.employeeform.value.password);
    this.employeeform.value.email = this.employeeform.value.password = '';

  }
  

}

