import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, AlertController, PopoverController, ModalController } from 'ionic-angular';

import { AuthData } from '../../../providers/auth-data';
import { ListsData2 } from '../../../providers/lists-data-2';

import { List } from '../../../providers/objects/list'
import { ListType } from '../../../providers/objects/listType'
import { ListTypes_data } from '../../../providers/objects/listTypes_data'

import { PlacelistPage } from '../../placelist/placelist';
import { AddListModal } from '../../tabs/add-list-modal/add-list-modal'


@Component({
  selector: 'page-for-you',
  templateUrl: 'for-you.html'
})


export class ForYouPage {
  @ViewChild(Nav) nav: Nav;
  lists: List[];
  size;
  oLists;





  constructor(public navCtrl: NavController,
              public authData : AuthData, public navParams: NavParams,
              public modalCtrl: ModalController, public listsData2 : ListsData2,
              public typesProvider: ListTypes_data) {
    this.listsData2.getLists()
      .then(data => {
        this.lists = data;
        this.listsData2.lists = data;});
  }

  goToList(list_id:string) {
    console.log(list_id);
    this.navCtrl.push(PlacelistPage, {
      list_id: list_id,
    });
  }

  addList(data) {
    let addedList = {
      title: data.title,
      list_type: data.type[0],
      author: 'kdenny'
    };
    return this.listsData2.newList(addedList);
  }

  newList() {
    let addListModal = this.modalCtrl.create(AddListModal);
     addListModal.onDidDismiss(data => {
       console.log(data);
       if (data) {
         data.author = {};
         data.author.username = 'deezy';

         console.log(this.lists);
         this.addList(data).then(list => {
           this.lists.unshift(list);
           console.log(list);
           this.listsData2.lists = this.lists;
           this.navCtrl.push(PlacelistPage, {
            list_id: list.id,
          });
         })
       }
     });

   addListModal.present();
  }

}






