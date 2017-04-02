import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';

// Importing Pages
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/login/reset-password/reset-password';
import { SignupPage } from '../pages/login/signup/signup';

import { TabsPage } from '../pages/tabs/tabs';
import { AddButtonPopover } from '../pages/tabs/add-button-popover/add-button-popover';
import { AddListModal } from "../pages/tabs/add-list-modal/add-list-modal";


import { HomePage } from '../pages/home/home';
import { ForYouPage } from '../pages/home/for-you/for-you'
import { NewsfeedPage } from '../pages/home/newsfeed/newsfeed'

import { ListsPage } from '../pages/lists/lists';

import { PlacesPage } from '../pages/places/places';
import { PlaceDetailPage } from '../pages/places/place-detail/place-detail';


import { PlacelistPage } from '../pages/placelist/placelist';
import { AddPlaceModal } from '../pages/placelist/add-place-modal/add-place-modal';


import { AccountPage } from '../pages/account/account';



import { KSSwiperModule } from 'angular2-swiper';
import { SuperTabsModule } from 'ionic2-super-tabs';



// Importing Providers
import { AuthData } from '../providers/auth-data';
import { AuthenticationService } from '../providers/auth-data-token';
import { ListsData } from '../providers/lists-data';
import { ListsData2 } from '../providers/lists-data-2';
import { PlacesData } from '../providers/places-data';
import { ListType } from '../providers/objects/listType';
import { ListTypes_data } from '../providers/objects/listTypes_data';

// Importing AF2 Module

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {NavController} from "ionic-angular/index";

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
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    TabsPage,
    AddButtonPopover,
    HomePage,
    ForYouPage,
    NewsfeedPage,
    ListsPage,
    PlacelistPage,
    PlaceDetailPage,
    PlacesPage,
    AccountPage,
    AddPlaceModal,
    AddListModal
    //CandTLeafletComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      swipeBackEnabled: false
    }),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    SuperTabsModule,
    KSSwiperModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    TabsPage,
    AddButtonPopover,
    HomePage,
    ForYouPage,
    NewsfeedPage,
    ListsPage,
    PlacelistPage,
    PlaceDetailPage,
    PlacesPage,
    AccountPage,
    AddPlaceModal,
    AddListModal
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    AuthenticationService,
    ListsData,
    ListsData2,
    PlacesData,
    Keyboard,
    ListType,
    ListTypes_data
  ]
})
export class AppModule {}
