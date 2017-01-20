import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ListsData } from '../../providers/lists-data';

import { PlacelistPage } from '../placelist/placelist';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lists;

  constructor(public nav: NavController, public listsDataset: ListsData, public navParams: NavParams) {

      this.lists = listsDataset.lists;
      console.log(this.lists)

    };

  goToList(list_id:string) {
    console.log(list_id);
    this.nav.push(PlacelistPage, {
      list_id: list_id,
    });
  }



  }






