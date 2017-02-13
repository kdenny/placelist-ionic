import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Importing Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';

import { TabsPage } from '../pages/tabs/tabs';
import { ListsPage } from '../pages/lists/lists';
import { PlacesPage } from '../pages/places/places';
import { PlacelistPage } from '../pages/placelist/placelist';
import { AccountPage } from '../pages/account/account';

import { AddPlaceModal } from '../pages/add-place-modal/add-place-modal';

import { KSSwiperModule } from 'angular2-swiper';

//import { CandTLeafletComponent  } from 'angular2.leaflet.components';
//import { CandTLeafletService } from 'angular2.leaflet.components';



// Importing Providers
import { AuthData } from '../providers/auth-data';
import { ListsData } from '../providers/lists-data';


// Importing AF2 Module

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
const firebaseConfig = {
    apiKey: "AIzaSyCtzDPi8VG3Y0I7iWVt4bSSs-l3_jrU1OY",
    authDomain: "marcopolo-1278.firebaseapp.com",
    databaseURL: "https://marcopolo-1278.firebaseio.com",
    storageBucket: "marcopolo-1278.appspot.com",
    messagingSenderId: "339507446225"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    TabsPage,
    ListsPage,
    PlacelistPage,
    PlacesPage,
    AccountPage,
    AddPlaceModal
    //CandTLeafletComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    KSSwiperModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    TabsPage,
    ListsPage,
    PlacelistPage,
    PlacesPage,
    AccountPage,
    AddPlaceModal
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    ListsData,
    //CandTLeafletService
  ]
})
export class AppModule {}
