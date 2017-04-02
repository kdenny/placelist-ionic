import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MenuController, Nav, NavController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';

import { AngularFire } from 'angularfire2';

import { TabsPage } from '../pages/tabs/tabs';


declare var google: any;


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage: any;

  constructor(platform: Platform, public af: AngularFire, public menuController: MenuController) {


    af.auth.subscribe( user => {
            if (user) {
                this.rootPage = TabsPage;
                console.log("User found");
                console.log(user);
            } else {
              this.rootPage = LoginPage;
              //this.rootPage = TabsPage;
            }
        });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.menuController.swipeEnable(false);
    });
  }
}
