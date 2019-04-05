import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm, FormGroup } from '@angular/forms';
import {AuthService} from '../auth.service';
import {ExpenseService} from '../expense.service';
import {Employee} from '../employee'

import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public employee = [];

  
employeeform:FormGroup;

  constructor(private expense:ExpenseService,private employeeservice: EmployeeService,private router: Router,public authService: AuthService) 
  {}

  onSubmit() {
    console.log(this.employeeform.value)
    this.employeeservice.login(this.employeeform.value.email, this.employeeform.value.password).subscribe(res=>
      {
        if(res.success) 
        {
         
        console.log("Login Success");
        localStorage.setItem('isLoggedIn',"true");
        localStorage.setItem('token',res.success);
        this.router.navigate(['/Signin'])

      }
      else {
        alert(res.error);
      }
      })
  
  this.employeeform.value.email =this.employeeform.value.password = ' ';   

   
 
     }


  ngOnInit() {
  this.employeeform=this.employeeservice.form;
  
 localStorage.getItem("isLoggedIn")==="true" && this.router.navigate(['/Signin']); 
  
    
}


  get email()
  {
    return this.employeeform.get('email');
  }

  get password()
  {
    return this.employeeform.get('password');
  }
 
 
 logout(): void{

  console.log("Logout");

  this.authService.logout();
  
  this.router.navigate(['/login']);
 
 }
}
