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
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

private response = new Subject();

  constructor(private firebaseAuth: AngularFireAuth) { }



  form: FormGroup = new FormGroup({
  
    name: new FormControl('', [Validators.required,this.noWhitespaceValidator]),
    email: new FormControl('', [Validators.required,Validators.pattern(this.emailPattern),this.noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),this.noWhitespaceValidator])   
  });

  initializeFormGroup() {
    this.form.setValue({
    
      name: '',
      email: '',
      password: '',
    });
  }
public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }



  signup(email: string, password: string):Observable<any> {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.response.next({success:value});
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.response.next({error :err.message})
      });   
      return this.response.asObservable(); 
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
