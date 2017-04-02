import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlacesData } from '../../providers/places-data'

import { ListsPage } from '../lists/lists'

import { PlaceDetailPage } from './place-detail/place-detail';


/*
  Generated class for the Places page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-places',
  templateUrl: 'places.html'
})
export class PlacesPage {

  places:any;
  //page1: any = ListsPage;
  //page2: any = ListsPage;
  //page3: any = ListsPage;
  //
  //showIcons: boolean = true;
  //showTitles: boolean = true;
  //pageTitle: string = 'Full Example';


  constructor(public nav: NavController, public navParams: NavParams, private placesData: PlacesData) {
    placesData.places = placesData.getPlaces()
      .then(
        data => {
          this.places = data;
          console.log(this.places)
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
  }

  goToPlace(place_id:string) {
    this.placesData.currentList = null;
    console.log(place_id);
    this.nav.push(PlaceDetailPage, {
      place_id: place_id,
    });
  }

}
