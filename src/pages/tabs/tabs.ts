import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ListsPage } from '../lists/lists';
import { PlacesPage } from '../places/places';
import { AccountPage } from '../account/account';


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ListsPage;
  tab3Root: any = PlacesPage;
  tab4Root: any = AccountPage;

  constructor() {

  }
}
