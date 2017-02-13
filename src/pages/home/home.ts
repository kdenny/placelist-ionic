import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, PopoverController, ModalController } from 'ionic-angular';

import { ListsData } from '../../providers/lists-data';

import { AuthData } from '../../providers/auth-data';

import { PlacelistPage } from '../placelist/placelist';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  lists;
  size;

  constructor(public nav: NavController, public listsDataset: ListsData, public authData : AuthData, public alertCtrl : AlertController, public navParams: NavParams, public modalCtrl: ModalController) {
      this.lists = listsDataset.lists;
      this.size = this.lists.length;
    };

  goToList(list_id:string) {
    console.log(list_id);
    this.nav.push(PlacelistPage, {
      list_id: list_id,
    });
  }

  newList() {
    //console.log(this.authData.fireAuth);
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
            this.listsDataset.newList(data, this.authData.fireAuth.email);
            //this.lists.push({
            //  id: this.size + 1,
            //  title: data.title,
            //  type: data.type,
            //  author: this.authData.fireAuth.email
            //});
          }
        }
      ]
    });
    prompt.present();

  }

}






