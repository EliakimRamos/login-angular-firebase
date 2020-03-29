import { Component, OnInit } from '@angular/core';
import { AngularFireModule, FirebaseApp } from "angularfire2";
import { AngularFireAuthProvider , AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { fallIn, moveIn, moveInLeft } from '../router.animate';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit {
  name: any;
  state: string = '';

  constructor(public af: AngularFireAuth, private router:Router) {
    this.af.authState.subscribe(auth => {
      if(auth){
        this.name = auth;
      }
    })
   }

   logout(){
     this.af.auth.signOut();
     console.log('Saindo do sistema');
     this.router.navigateByUrl('/login');
   }
  ngOnInit() {
  }

}
