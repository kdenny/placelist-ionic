import { Component, ViewChild } from '@angular/core';

import { PopoverController, NavController, Nav } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ListsPage } from '../lists/lists';
import { PlacesPage } from '../places/places';
import { AccountPage } from '../account/account';

import { AddButtonPopover } from './add-button-popover/add-button-popover'

@Component({
  selector: 'tabs-bar',
  templateUrl: 'tabs.html'
})

export class TabsPage {
  @ViewChild(Nav) nav: Nav;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ListsPage;
  tab3Root: any = PlacesPage;
  tab4Root: any = AccountPage;

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController) {

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(AddButtonPopover);
    popover.present({
      ev: myEvent
    });
  }


}
