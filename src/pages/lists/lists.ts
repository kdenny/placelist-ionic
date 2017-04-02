import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//import { ListsData } from '../../providers/lists-data';

import { PlacelistPage } from '../placelist/placelist';

import { ListsData2 } from '../../providers/lists-data-2';

import { AuthenticationService } from '../../providers/auth-data-token';


/*
  Generated class for the Lists page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  userlists;
  lists;
  currentUser;

  constructor(public nav: NavController, public listsData2: ListsData2, public authService: AuthenticationService) {

      this.listsData2.getLists()
      .then(data => {this.lists = data;
        this.listsData2.lists = data;});
      this.currentUser = this.authService.currentUsername;

    };

  goToList(list_id:string) {
    console.log(list_id);
    this.nav.push(PlacelistPage, {
      list_id: list_id,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsPage');
  }

}
