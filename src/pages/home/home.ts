import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, PopoverController, ModalController } from 'ionic-angular';

import { ListsData } from '../../providers/lists-data';

import { AuthData } from '../../providers/auth-data';

import { PlacelistPage } from '../placelist/placelist';

import { ListsData2 } from '../../providers/lists-data-2';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  lists;
  size;
  oLists;

  constructor(public nav: NavController, public listsDataset: ListsData, public authData : AuthData, public alertCtrl : AlertController, public navParams: NavParams, public modalCtrl: ModalController, public listsData2 : ListsData2) {
      this.lists = listsDataset.lists;
      listsData2.lists = listsData2.getLists();
      this.size = this.lists.length;
    };

  goToList(list_id:string) {
    console.log(list_id);
    this.nav.push(PlacelistPage, {
      list_id: list_id,
    });
  }

  addList(data) {
    let addedList = {
      title: data.title,
      list_type: data.type,
      author: 'kdenny'
    };
    var mark = this.listsData2.newList(addedList);
    //this.lists.push(addedList);
    console.log(mark);
  }

  newList() {
    let prompt = this.alertCtrl.create({
      title: 'List Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'type',
          placeholder: 'Type'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.addList(data);
          }
        }
      ]
    });
    prompt.present();

  }

}






