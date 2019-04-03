import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, NgForm, Validators} from '@angular/forms';
import {ExpenseService} from '../expense.service';

import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public service:ExpenseService ,private dialog :MatDialogRef<SidenavComponent >) {
    

  }
  ngOnInit() {
  this.service.getEmployees();
   }

  Add()
  {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertEmployee(this.service.form.value);
      else
      this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }

  }


  onClose()
  {
   
    this.dialog.close();
  }
  onClear() {
    this.service.form.reset();
  }

}
