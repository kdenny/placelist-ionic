import { Component, ViewChild, OnInit } from '@angular/core';
import { App } from 'ionic-angular'
import { Config, Nav, NavController, NavParams, AlertController } from 'ionic-angular';
import { IonicApp, IonicModule } from 'ionic-angular';

import { ListsData2 } from '../../providers/lists-data-2';
import { PlacesData } from '../../providers/places-data';

import { AuthData } from '../../providers/auth-data';

import 'leaflet';

import {KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';

import { AddPlaceModal } from './add-place-modal/add-place-modal';
import { PlaceDetailPage } from '../places/place-detail/place-detail';

import {ModalController} from "ionic-angular/index";


/*
  Generated class for the Placelist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-placelist',
  templateUrl: 'placelist.html'
})

export class PlacelistPage implements OnInit {

  placelist;
  featureGroup = L.featureGroup([]);

  places;
  title;

  currentPlace;
  currentSlide;

  placesAdded;

  addingPlacesFlag;

  mapClicked;

  listCenter;

  currentCenterPlace;

  swipeStarted;

  viewMode;
  map;
  author;

  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  example1SwipeOptions: any;
  pictures;


  constructor(
    public nav: NavController, public realNav: Nav, public placesDataset: PlacesData, public listsDataset2: ListsData2, private app: App, public authData : AuthData, public alertCtrl : AlertController, public navParams: NavParams, public modalCtrl : ModalController
  ) {
      this.viewMode = 'map';
      this.currentSlide = 1;
      this.placesAdded = false;
      this.swipeStarted = false;
      this.addingPlacesFlag = false;
  }

  ionViewWillEnter() { this.realNav.swipeBackEnabled = false; }
  ionViewWillLeave() { this.realNav.swipeBackEnabled = true; }

  ngOnInit() {
    this.realNav.swipeBackEnabled = false;
    let aList = this.listsDataset2.getPlacelist(this.navParams.get('list_id'))
      .then(result => {
        this.placelist = result;
        this.listsDataset2.currentList = this.placelist;
        this.title = this.placelist.title;
        this.author = this.placelist.author.username;
        this.places = this.placelist.places;
        if (this.places.length > 0) {

          this.showMap();

          this.example1SwipeOptions = {
            slidesPerView: 3,
            loop: true,
            initialSlide: (this.places.length - 1),
            spaceBetween: 225,
            onSlideChangeEnd: (slider) => {
              this.currentSlide = slider.realIndex + 1;
              if (this.currentSlide >= this.places.length) {
                this.currentSlide = 0;
              }

              this.currentPlace = this.places[this.currentSlide];
              console.log(this.currentPlace)

              if (this.currentSlide != 0) {
                this.swipeStarted = true;
              }

              this.updateMarkers();
              if (this.map) {
                if (this.swipeStarted) {

                  if (this.currentCenterPlace) {
                    if (this.currentPlace.name != this.currentCenterPlace.name) {
                      this.updateMap(this.currentPlace);
                    }
                  }

                  else {
                    this.updateMap(this.currentPlace);
                  }



                }
              }
            }
          };
      }
      });
   }

  dismiss() {
   let data = { 'foo': 'bar' };
   this.nav.pop();
  }

  showMap() {
        setTimeout(() => {

          this.map = L.map("map").setView([38.900221, -76.996895], 14);
          L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(this.map);
          if (this.featureGroup && this.places.length > 0) {
            this.map.removeLayer(this.featureGroup);
            this.map.addLayer(this.featureGroup);
          }
          this.showMarkers();
          this.map.addLayer(this.featureGroup);
          this.map.fitBounds(this.featureGroup.getBounds(), {
            padding : [50, 50]
          });

          this.listCenter = this.map.getCenter();

        });


    }

  updateMarkers() {
    if (this.places.length > 0) {

      if (!this.map) {
        this.showMap();
      }

      else {

        if (this.featureGroup) {
          this.map.removeLayer(this.featureGroup);
          var count = 0;
          if (!this.currentPlace) {
            let currentPlace = this.places[0];
            this.currentCenterPlace = this.places[0];
          }
          this.places.forEach(place => {
            count++;

            if (this.currentPlace) {
              // Open popup if selected in slider
              if (place.id == this.currentPlace.id) {
                let marker:any = L.marker([place.lat, place.lon])
                  .bindPopup(count + "<br>" + place.name + "<br>" + place.street_address);
                marker.data = place;
                marker.data.count = count;
                marker.on('click', ()=> {
                  this.moveToSlide(marker.data);
                });
                marker.data = place;
                this.featureGroup.addLayer(marker);
              }
              // Don't open popup if not selected
            }
            else {
                let marker:any = L.marker([place.lat, place.lon])
                  .bindPopup(count + "<br>" + place.name + "<br>" + place.street_address);
                marker.data = place;
                marker.data.lat = place.lat;
                marker.data.lon = place.lon;
                marker.data.count = count;

                marker.on('click', ()=> {
                  this.moveToSlide(marker.data)
                });
                this.featureGroup.addLayer(marker);
            }


          });
          this.map.addLayer(this.featureGroup);

        }
      }
    }


  }

  showMarkers() {
    if (this.places.length > 0) {
      var count = 0;
      this.places.forEach(place => {
        count++;
        let marker:any = L.marker([place.lat, place.lon])
                  .bindPopup(count + "<br>" + place.name + "<br>" + place.street_address);
                marker.data = place;
                marker.data.lat = place.lat;
                marker.data.lon = place.lon;
                marker.data.count = count;
                marker.on('click', ()=> {
                  this.moveToSlide(marker.data)
                });

        if (this.currentPlace) {
          if (place.id == this.currentPlace.id) {

            marker.openPopup();
          }
        }
        else {
          this.currentPlace = this.places[0];
          if (place.id == this.currentPlace.id) {

            marker.openPopup();
          }

        }
        marker.data = place;
        this.featureGroup.addLayer(marker);

      });

    }
  }

  moveNext() {
    this.swiperContainer.swiper.slideNext();
  }

  movePrev() {
    this.swiperContainer.swiper.slidePrev();
  }

  updateMap(data) {
    var loc = [data.lat, data.lon];
    var currentZoom = this.map.getZoom();

    var center = this.map.getCenter();

    var newZoom;
    if (this.mapClicked) {
      newZoom = currentZoom;
      this.mapClicked = false;
    }
    else {
      newZoom = 15;
    }

    this.currentCenterPlace = data;
    this.map.setView(loc, newZoom);

  }

  moveToBase() {
    this.addingPlacesFlag = false;
    if (this.featureGroup && this.map) {
      this.map.fitBounds(this.featureGroup.getBounds(), {
        padding: [50, 50]
      });
    }
  }

  moveToSlide(data) {
    this.mapClicked = true;
    //if (this.currentCenterPlace.name != data.name) {

      if (this.places.length > 0) {
        console.log(data.count)
        if (this.places.length > 3) {
          if (data.count < this.places.length) {
            console.log("Normal Swipe")
            this.swiperContainer.swiper.slideTo(data.count + 1);
          }
          else {
            if (!this.placesAdded) {
              console.log("Swipe to beginning")
              this.swiperContainer.swiper.slideTo(1);
            }
            if (this.placesAdded) {
              console.log("Swipe to new card")
              this.swiperContainer.swiper.slideTo(data.count + 1);
            }
          }
        }
        else {
          if (this.places.length == 2) {
            if (this.placesAdded) {
              if (data.count == 1) {
                this.swiperContainer.swiper.slideTo(1);
              }
              else {
                this.swiperContainer.swiper.slideTo(0);
              }
            }
            else {
              if (data.count == 2) {
                this.swiperContainer.swiper.slideTo(0);
              }
              if (data.count == 1) {
                this.swiperContainer.swiper.slideTo(1);
              }
            }
          }
          if (this.places.length == 3) {
            if (data.count == 3) {
                this.swiperContainer.swiper.slideTo(1);
              }
            else {
                this.swiperContainer.swiper.slideTo(data.count+1);
            }
          }

        }
        console.log(this.currentPlace)
        console.log(this.currentSlide)
        this.updateMap(data);
      }
  }

  swapView() {
    if (this.viewMode == 'map') {
      this.viewMode = 'detail';
    }
    else {
      this.viewMode = 'map';
      this.showMap();
      this.showMarkers();
      this.updateMarkers();
    }
  }

  removePlace(place) {
    let list_id = this.navParams.get('list_id');
    let place_id = place['id'];
    let newl = this.listsDataset2.removePlaceFromList(list_id, place_id)
      .then(result => {
        console.log(result)
      });
  }



  addPlaceModal() {
    this.addingPlacesFlag = true;
    let addPlaceModal = this.modalCtrl.create(AddPlaceModal, {
      list_id: this.navParams.get('list_id')
    });
     addPlaceModal.onDidDismiss(data => {
       console.log(data);
       if (data) {
         if (!data['id']) {
           if (this.places) {
             data['id'] = this.places.length + 1;
           }
           else {
             data['id'] = 1;
           }
         }

         this.places.push(data);
         this.placesAdded = true;
         this.showMarkers();
         this.updateMarkers();
         this.moveToBase();
       }
     });

   addPlaceModal.present();
  }

  goToPlace(place_id:string) {
    this.placesDataset.currentList = this.placelist;
    this.nav.push(PlaceDetailPage, {
      place_id: place_id
    });
  }


}
