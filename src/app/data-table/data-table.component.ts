import { Component, OnInit, ViewChild } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ExpenseService} from '../expense.service';
import {FormControl} from '@angular/forms';
import {MatTableDataSource, MatSort, MatDialogConfig} from '@angular/material';
import {MatDialog,MatDialogModule} from '@angular/material'
import { DataSource } from '@angular/cdk/table';
import { SidenavComponent } from '../sidenav/sidenav.component';
import{AuthService} from '../auth.service';
import {EmployeeService} from '../employee.service'




@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  
  searchKey: string;
  fromKey:string;
  merchantKey:string;
  minKey:number;
  maxKey:number;
  statusKey:string;
  dataSource:MatTableDataSource<any>;  
  displayedColumns = ['date','merchant','total','status','comment','actions'];
 

fromFilter = new FormControl('');
toFilter = new FormControl('');
minFilter = new FormControl('');
maxFilter = new FormControl('');
merchantFilter = new FormControl('');


checked;

  
  constructor(private employeeserv:EmployeeService,public authService: AuthService, private ExpenseService: ExpenseService,private route:ActivatedRoute,private router:Router,private dialog : MatDialog) {
  
   }

  private name:string;
  private value:number;
  data=["new","in progress","reimbursed"];

  @ViewChild(MatSort) sort: MatSort;
  allitems;

employee;
  ngOnInit() {
 
    this.ExpenseService.getEmployees().subscribe(
      list=>{
      var array = list.map(item => {
          
          return {
            $key: item.key,
           ...item.payload.val()
          
          };
        });
        this.employee=array;
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.sort=this.sort;
        this.dataSource.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
        console.log(this.dataSource)
      
      });

} 
  

 Logout()
 {
  this.employeeserv.logout();
   this.router.navigate(['/login']);
 }

OnSearchClear1()
{
  
    this.minKey=0;
    this.maxKey=0;
  
      this.applyFilter1();

    
}
applyFilter1()
{
  this.dataSource.data=this.employee;
var x = this.dataSource.filteredData.filter(item=> item.total >=this.minKey && item.total<=this.maxKey)
 this.dataSource.data=x;
 console.log(this.dataSource);

 if(!!this.minKey==false || !!this.maxKey==false)
 {
   this.dataSource.data=this.employee;
 }

}



onSearchClear() {
    if(this.searchKey)
    {
    this.searchKey = "";
    this.applyFilter();
    }
  
    else if (this.fromKey)
    {
      this.fromKey="";
      this.applyFilter();
    }
    else if (this.merchantKey)
    {
      this.merchantKey="";
      this.applyFilter();
    }
    else if(this.statusKey)
    {
      this.statusKey="";
      this.applyFilter();
    }
}
  applyFilter() {
    if(this.searchKey)
    {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
    }
    else if(this.fromKey)
    {
      this.dataSource.filter = this.fromKey.trim().toLowerCase();
    }
    else if(this.merchantKey)
    {
      this.dataSource.filter = this.merchantKey.trim().toLowerCase();
    }
    else if(this.statusKey)
    {
      this.dataSource.filter = this.statusKey.trim().toLowerCase();
    }
   
  }
 
  oncreate()
  {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose =true;
    dialogConfig.autoFocus=true;
    dialogConfig.width= "40%";
    this.dialog.open(SidenavComponent,dialogConfig);

  }
  onEdit(row)
  {
    console.log(row);
    this.ExpenseService.populateform(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(SidenavComponent,dialogConfig);
  }
  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
     this.ExpenseService.deleteEmployee($key);
    }
  }
}
