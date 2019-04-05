import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort, MatDialogConfig } from '@angular/material';
import { MatDialog, MatDialogModule } from '@angular/material'
import { DataSource } from '@angular/cdk/table';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service'


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  searchKey: string;
  fromKey: string;
  merchantKey: string;
  minKey: number;
  maxKey: number;
  value: number = 0;
  statusKey: string;
  range: number;
  toKey: number;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['date', 'merchant', 'total', 'status', 'comment', 'actions'];


  fromFilter = new FormControl('');
  toFilter = new FormControl('');
  minFilter = new FormControl('');
  maxFilter = new FormControl('');
  merchantFilter = new FormControl('');


  checked;



  constructor(private employeeserv: EmployeeService, public authService: AuthService, private ExpenseService: ExpenseService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {

  }

  private name: string;


  data = ["new", "in progress", "reimbursed"];

  @ViewChild(MatSort) sort: MatSort;
  allitems;

  employee;
  ngOnInit() {
    


    this.ExpenseService.getEmployees().subscribe(
      list => {
        this.employee = list.map(item => {

          return {

            $key: item.key,

            ...item.payload.val()

          };
        });

        this.dataSource = new MatTableDataSource(this.employee);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
        console.log(this.dataSource);
        this.value = 0;
        this.dataSource.filteredData.forEach((key) => {
          if (key.status === "reimbursed") {
            let num = parseInt(key.total);
            this.value = this.value + num;
          }
        })

      });

  if(localStorage.getItem("isLoggedIn")=="true")
  {
    this.router.navigate(['/Signin']);
    }
 

  }


  Logout() {
    this.employeeserv.logout();
  
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

  onSearchClear1(field) {
    this[field] = '';
    this.applyFilter2();
  }

  applyFilter2() {
    let data = this.employee;

    if (this.range) {
      let from = new Date(this.range);
      data = data.filter(item => new Date(item.date) >= from);
    }
    if (this.toKey) {
      let to = new Date(this.toKey);
      data = data.filter(item => new Date(item.date) <= to);
    }
    if (this.minKey) {
      data = data.filter(item => item.total >= this.minKey);
    }
    if (this.maxKey) {
      data = data.filter(item => item.total <= this.maxKey);
    }
    if (this.merchantKey) {
      data = data.filter(item => item.merchant == this.merchantKey);
    }
    if (this.statusKey) {
      data = data.filter(item => item.status == this.statusKey);
    }

    this.dataSource.data = data;
  }

  oncreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(SidenavComponent, dialogConfig);

  }
  onEdit(row) {

    console.log(row);
    this.ExpenseService.populateform(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(SidenavComponent, dialogConfig);
  }
  onDelete($key) {

    if (confirm('Are you sure to delete this record ?')) {
      this.ExpenseService.deleteEmployee($key);
    }
  }


}