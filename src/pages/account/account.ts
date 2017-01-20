import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';

import { LoginPage } from '../login/login';



/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public nav: NavController, public navParams: NavParams, public authData: AuthData) {}

  logoutUser(){

      this.authData.logoutUser();
      this.nav.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
