import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ListsData } from '../../providers/lists-data';

import { PlacelistPage } from '../placelist/placelist';



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

  constructor(public nav: NavController, public listsDataset: ListsData) {

      this.userlists = listsDataset.userLists;
      console.log(this.userlists);

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
