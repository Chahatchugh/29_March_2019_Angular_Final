import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs';
import { Expense } from './expense';
import * as _ from 'lodash';



@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private _url: string = 'https://final-4184f.firebaseio.com/expense.json';

  constructor(private http: HttpClient,private firebase: AngularFireDatabase) { }

  expenseList: AngularFireList<any>;
  
  form: FormGroup =new FormGroup
  ({
    $key:new FormControl(null),
    merchant:new FormControl('',[Validators.required,Validators.minLength(4),this.noWhitespaceValidator]),
    total:new FormControl('',[Validators.required,this.noWhitespaceValidator]),
    status:new FormControl('',[Validators.required,Validators.minLength(4),this.noWhitespaceValidator]),
    date:new FormControl('',[Validators.required,this.noWhitespaceValidator]),
    comment:new FormControl('',[this.noWhitespaceValidator])
  })

initializeFormGroup(){
  this.form.setValue({
    $key:null,
    merchant: '',
    total: '',
    status: '',
    date: '',
    comment: ''
  });
}
getEmployees() {
  this.expenseList = this.firebase.list('expenses');
  return this.expenseList.snapshotChanges();
}

insertEmployee(employee)
  {
    this.expenseList.push({
      merchant: employee.merchant,
      total:employee.total,
      status:employee.status,
      date:employee.date,
      comment:employee.comment
      
    });
  }

  updateEmployee(employee)
  {
    this.expenseList.update(employee.$key,
      {
        merchant:employee.merchant,
        total:employee.total,
        status:employee.status,
      date:employee.date,
      comment:employee.comment

      })
  }
   public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
 
  deleteEmployee($key: string)
  {
    this.expenseList.remove($key);
  }

  populateform(employee)
  {
    this.form.setValue(_.omit(employee));
    
  }

  

}
