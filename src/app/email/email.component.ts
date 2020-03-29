import { Component, OnInit } from '@angular/core';
import {  FormsModule, NgForm } from '@angular/forms';
import { AngularFireModule, FirebaseApp } from "angularfire2";
import { AngularFireAuthProvider , AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { fallIn, moveIn } from '../router.animate';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {
  state: string = '';
  email: any;
  password: any;
  error;

  constructor(public af: AngularFireAuth, private router: Router) {
     this.af.authState.subscribe(auth => {
        if(auth){
          this.router.navigateByUrl('/members');
        }
     });

   }

   onSubmit(formData){
    console.log(formData); 
    if(formData.valid){
       console.log(formData.value);
       this.af.auth.signInWithEmailAndPassword(formData.value.email,formData.value.password)
        .then(
          (success) => {
            console.log(success);
            this.router.navigate(['/members']);
          }).catch(
            (err) => {
              console.log(err);
              this.error = err;
            });
     }
   }
  ngOnInit() {
  }

}
