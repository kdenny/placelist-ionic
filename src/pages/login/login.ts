import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  AlertController
} from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';

import { AuthData } from '../../providers/auth-data';
import { AuthenticationService } from '../../providers/auth-data-token'

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs'
import { SignupPage } from './signup/signup';
import { ResetPasswordPage } from './reset-password/reset-password';

import { EmailValidator } from '../../validators/email';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})


export class LoginPage {

  loginForm: any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public nav: NavController, public authData: AuthData,
    public formBuilder: FormBuilder, public alertCtrl: AlertController, public authService: AuthenticationService,
    public loadingCtrl: LoadingController) {

        this.loginForm = formBuilder.group({
            username: [''],
            password: ['', Validators.compose([Validators.minLength(6),
            Validators.required])]
        });

  }

  goToResetPassword(){
      //this.nav.push(ResetPasswordPage);
      this.nav.setRoot(TabsPage);
  }

  createAccount(){
      this.nav.push(SignupPage);
  }

  elementChanged(input){
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
  }

  loginUser(){
      this.submitAttempt = true;

      this.authService.login(this.loginForm.value.username,
          this.loginForm.value.password)
        .subscribe(result => {
            if (result === true) {
                // login successful
                this.nav.setRoot(TabsPage);
            } else {
                // login failed
                console.log("Failed!")
            }
        });

      //if (!this.loginForm.valid){
      //  console.log(this.loginForm.value);
      //} else {
      //  this.authService.login().then( authData => {
      //
      //}
      //    , error => {
      ////  this.loading.dismiss().then( () => {
      ////    let alert = this.alertCtrl.create({
      ////      message: error.message,
      ////      buttons: [
      ////      {
      ////        text: "Ok",
      ////        role: 'cancel'
      ////      }
      ////      ]
      //});
      ////  alert.present();
      ////});
      //}

      //this.loading = this.loadingCtrl.create({
      //  dismissOnPageChange: true,
      //});
      //this.loading.present();
      //}
    }




}

//import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
//
//import { AuthenticationService } from '../shared-services/user-auth.service';
//
//@Component({
//    templateUrl: 'login.component.html'
//})
//
//export class LoginComponent implements OnInit {
//    model: any = {};
//    loading = false;
//    error = '';
//
//    constructor(
//        private router: Router,
//        private authenticationService: AuthenticationService) { }
//
//    ngOnInit() {
//        // reset login status
//        this.authenticationService.logout();
//    }
//
//    login() {
//        this.loading = true;
//        this.authenticationService.login(this.model.username, this.model.password)
//            .subscribe(result => {
//                if (result === true) {
//                    // login successful
//                    this.router.navigate(['/']);
//                } else {
//                    // login failed
//                    this.error = 'Username or password is incorrect';
//                    this.loading = false;
//                }
//            });
//    }
//}
