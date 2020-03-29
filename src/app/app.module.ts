import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {  FormsModule, NgForm } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import {  AuthGuard  } from "./auth.service";
import { routes } from "./app.routes";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { OtherComponent } from './other/other.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { fallIn, moveIn, moveInLeft } from './router.animate';
import {trigger, state, animate, style, transition} from '@angular/animations';
export const firebaseConfig = {
  apiKey: "AIzaSyCZNPZdPi8zvafmpawpBPAvXV-f6a3NYXk",
  authDomain: "teste-emprego.firebaseapp.com",
  databaseURL: "https://teste-emprego.firebaseio.com",
  projectId: "teste-emprego",
  storageBucket: "teste-emprego.appspot.com",
  messagingSenderId: "775254685868"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AngularFireAuth,AngularFireDatabase,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
