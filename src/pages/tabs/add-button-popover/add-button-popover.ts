import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavController, IonicApp, App } from 'ionic-angular';

import { ListsData2 } from '../../../providers/lists-data-2';

import { AuthenticationService } from '../../../providers/auth-data-token';


import { AddListModal } from '../add-list-modal/add-list-modal'

import { PlacelistPage } from '../../placelist/placelist';


import { List } from '../../../providers/objects/list'

import { ListType } from '../../../providers/objects/listType'
import { ListTypes_data } from '../../../providers/objects/listTypes_data'


@Component({
  selector: 'add-button-popover',
  templateUrl: 'add-button-popover.html'
})

export class AddButtonPopover {
  constructor(private authService: AuthenticationService, private nav: NavController, public viewCtrl: ViewController, public listsData2: ListsData2, public modalCtrl: ModalController, public appCtrl: App) {
    this.nav = nav;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  addList(data) {
    console.log(this.authService.currentUsername);
    if (this.authService.currentUsername) {
      let addedList = {
        title: data.title,
        list_type: data.type[0],
        author: this.authService.currentUsername
      };
      return this.listsData2.newList(addedList);
    }
    else {
      let addedList = {
        title: data.title,
        list_type: data.type[0],
        author: 'kdenny'
      };
      return this.listsData2.newList(addedList);
    }

  }

  newList() {
    this.viewCtrl.dismiss();
    let addListModal = this.modalCtrl.create(AddListModal);
     addListModal.onDidDismiss(data => {
       console.log(data);
       if (data) {
         this.addList(data).then(list => {
           this.listsData2.lists.unshift(list);
           this.appCtrl.getRootNav().push(PlacelistPage, {
             list_id: list.id,
           });
          // this.nav.push(PlacelistPage, {
          //  list_id: list.id,
          //});
         })
       }
     });

   addListModal.present();
  }
}
