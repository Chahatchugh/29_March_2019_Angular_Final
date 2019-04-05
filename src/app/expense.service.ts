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
    merchant:new FormControl('',[Validators.required,Validators.minLength(4)]),
    total:new FormControl('',[Validators.required]),
    status:new FormControl('',[Validators.required,Validators.minLength(5)]),
    date:new FormControl('',[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
    comment:new FormControl('')
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
  
 
  deleteEmployee($key: string)
  {
    return this.expenseList.remove($key);
  }

  populateform(employee)
  {
    this.form.setValue(_.omit(employee));
    
  }

  

}
