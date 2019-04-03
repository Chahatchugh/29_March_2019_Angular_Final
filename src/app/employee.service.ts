import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Observable, Subject } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  user: Observable<firebase.User>;

private response = new Subject();

  constructor(private firebaseAuth: AngularFireAuth) { }


  form: FormGroup = new FormGroup({
  
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    
  });

  initializeFormGroup() {
    this.form.setValue({
    
      name: '',
      email: '',
      password: '',
    });
  }



  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }
  login(email: string, password: string):Observable<any> {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        console.log(value);
        this.response.next({success:value});
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.response.next({error :err.message})
      });
      return this.response.asObservable();
  }
  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }
}
