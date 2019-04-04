import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {AppRoutingModule} from './app-routing.module';
import {DataTableComponent } from './data-table/data-table.component';
import { environment } from '../environments/environment';
import { EmployeeService } from './employee.service';
import {AuthGuard} from './auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {ExpenseService } from './expense.service'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {MatButtonModule,MatCheckboxModule,MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule, MatIconModule,MatDialogModule} from '@angular/material'
import { from } from 'rxjs';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    LoginComponent,
    DataTableComponent,
   
  ],
  imports: [
    BrowserModule,
     HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
],
  providers: [EmployeeService,ExpenseService],
  bootstrap: [AppComponent],
  entryComponents :[SidenavComponent]
})
export class AppModule { }
