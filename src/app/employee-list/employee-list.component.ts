import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm, FormGroup } from '@angular/forms';
import {Router} from '@angular/router'
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employee = [];
  myemail: any;
  mypassword: any;
  obj = {
    email: ""
  }
  emails;
  passwords;


  employeeform:FormGroup;

  constructor(private employeeservice: EmployeeService,private router : Router) { 
    this.employeeform=this.employeeservice.form;
  }

  ngOnInit() {

       

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

    this.employeeservice.signup(employeeform.value.email, employeeform.value.password);
    employeeform.value.email = employeeform.value.password = '';

  }
  

}

