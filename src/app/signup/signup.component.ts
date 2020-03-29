import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule, FirebaseApp } from "angularfire2";
import { AngularFireAuthProvider , AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { moveIn, fallIn } from '../router.animate';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {
  state: string = '';
  email: any;
  password: any;
  error: any;

  constructor(public af: AngularFireAuth, private router: Router) { }

  onSubmit(formData){
    if(formData.valid){
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword( formData.value.email,formData.value.password)
      .then(
        (success)=> {
          console.log(success);
          this.router.navigate(['/login']);
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
