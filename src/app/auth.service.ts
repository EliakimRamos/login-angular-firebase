import { CanActivate, Router } from '@angular/router';
import { AngularFireModule, FirebaseApp } from "angularfire2";
import { AngularFireAuthProvider , AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(public auth:AngularFireAuth, private router: Router) { }
  
  canActivate():Observable<boolean>{
    return this.auth.authState
    .take(1)
    .map(state => !!state)
    .do(authenticated => {
      if
        (!authenticated) this.router.navigate(['/login']);
    });
  }
}
