import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';



import { ViewController } from "ionic-angular/index";

import { ListTypes_data } from '../../../providers/objects/listTypes_data'


@Component({
  selector: 'page-add-list-modal',
  templateUrl: 'add-list-modal.html'
})
export class AddListModal {
  private newList : FormGroup;
  listSubtypes;


  listTypes;
  userFriends;

  constructor( public nav: NavController, private formBuilder: FormBuilder, public viewCtrl : ViewController, public typesProvider: ListTypes_data, public keyboard: Keyboard ) {
    this.listSubtypes = typesProvider.subtypes;
    this.listTypes = typesProvider.types2;
    this.newList = this.formBuilder.group({
      title: ['', Validators.required],
      type: [''],
    });

    this.userFriends = [
      'kdenny',
      'krabmoney',
      'realabutta'
    ]

  }


  onSelect(countryid) {
    //this.states = this._dataService.getStates().filter((item)=> item.countryid == countryid);
  }


  logForm(){
    console.log(this.newList.value);
    let data = this.newList.value;
    console.log(data)
    this.keyboard.close();
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
   let data = null;
   this.keyboard.close();
   this.viewCtrl.dismiss(data);
  }

}
