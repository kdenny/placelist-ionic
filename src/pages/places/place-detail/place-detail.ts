import { Component, ViewChild, OnInit } from '@angular/core';
import { App } from 'ionic-angular'
import { Config, NavController, NavParams, AlertController } from 'ionic-angular';

import { ListsData2 } from '../../../providers/lists-data-2';
import { PlacesData } from '../../../providers/places-data';

import 'leaflet';

//import {KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';
//
//import { AddPlaceModal } from '../add-place-modal/add-place-modal';
//import {ModalController} from "ionic-angular/index";


/*
  Generated class for the Placelist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'place-detail',
  templateUrl: 'place-detail.html'
})

export class PlaceDetailPage implements OnInit {

  placelist;

  place;

  currentPlace;
  currentSlide;

  listCenter;

  swipeStarted;

  viewMode;
  map;



  constructor(
    public nav: NavController, private app: App, public alertCtrl : AlertController, public navParams: NavParams, private placesData: PlacesData
  ) {
  }

  ngOnInit() {
    let aList = this.placesData.getPlace(this.navParams.get('place_id'))
      .then(result => {
        this.place = result;

      });
   }

  dismiss() {
   let data = { 'foo': 'bar' };
   this.nav.pop();
  }


}
