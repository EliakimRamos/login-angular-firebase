import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule, FirebaseApp } from "angularfire2";
import { AngularFireAuthProvider , AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { moveIn } from '../router.animate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {"[@moveIn()]":''}
})
export class LoginComponent implements OnInit {
  error: any;
  authState: any = null;
  constructor(
                public af:AngularFireAuth,
                private db: AngularFireDatabase,
                private router:Router
            ){
    this.af.authState.subscribe((auth)=>{
      if(auth) {
        this.router.navigateByUrl('/members');
      }
    });
   }

   // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

   // Returns current user UID
   get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }


   loginFb(){
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
   }

   loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin(){
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

   private socialSignIn(provider) {
    return this.af.auth.signInWithPopup(provider)
      .then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      });
  }

  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
      let path = `users/${this.currentUserId}`; // Endpoint on firebase
      let data = {
                    email: this.authState.email,
                    name: this.authState.displayName
                  }
  
      this.db.object(path).update(data)
      .catch(error => console.log(error));
  
    }
  ngOnInit() {
  }

}
