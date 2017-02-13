import { Component, ViewChild } from '@angular/core';
import { Config, NavController, NavParams, AlertController } from 'ionic-angular';

import { ListsData } from '../../providers/lists-data';
import { AuthData } from '../../providers/auth-data';

import 'leaflet';

import {KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';

import { AddPlaceModal } from '../add-place-modal/add-place-modal';
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

export class PlacelistPage {

  placelist;
  featureGroup = L.featureGroup([]);

  places;
  currentList;
  listTitle;

  currentPlace;
  currentSlide;

  listCenter;

  swipeStarted;


  viewMode;
  map;

  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  example1SwipeOptions: any;
  pictures;


  constructor(
    public nav: NavController, public listsDataset: ListsData, public authData : AuthData, public alertCtrl : AlertController, public navParams: NavParams, public modalCtrl : ModalController
  ) {

      this.viewMode = 'map';

      this.placelist = listsDataset.getPlacelist(this.navParams.get('list_id'));

      this.currentList = this.navParams.get('list_id');
      this.listTitle = this.placelist.title;
      this.currentSlide = 1;

      this.places = this.placelist.places;

      this.swipeStarted = false;

      if (this.places) {

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

            if (this.currentSlide != 0) {
              this.swipeStarted = true;
            }


            this.updateMarkers();
            if (this.map) {
              if (this.swipeStarted) {
                //console.log(this.map.getCenter());
                //console.log(this.listCenter);
                this.updateMap(this.currentPlace);
              }
            }
          }
        };

      }
  }

  dismiss() {
   let data = { 'foo': 'bar' };
   this.nav.pop();
  }

  showMap() {
        setTimeout(() => {

          this.map = L.map("map").setView([38.900221, -76.996895], 14);
          L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(this.map);
          if (this.featureGroup) {
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
    if (this.featureGroup) {
      this.map.removeLayer(this.featureGroup);
      var count = 0;
      this.places.forEach(place => {
          count++;

          // Open popup if selected in slider
          if (place._id == this.currentPlace._id) {
            let marker: any = L.marker([place.lat, place.lon])
            .bindPopup(place.realName + "<br>" + place.address);
            marker.data = place;
            marker.data.count = count;
            marker.on('click', ()=> {
              this.moveToSlide(marker.data);
            });
            marker.data = place;
            this.featureGroup.addLayer(marker);
          }
          // Don't open popup if not selected
          else {
            let marker: any = L.marker([place.lat, place.lon])
            .bindPopup(place.realName + "<br>" + place.address);
            marker.data = place;
            marker.data.lat = place.lat;
            marker.data.lon = place.lon;
            marker.data.count = count;

            marker.on('click', ()=> {this.moveToSlide(marker.data)});
            this.featureGroup.addLayer(marker);
          }


      });
      this.map.addLayer(this.featureGroup);

    }


  }

  showMarkers() {

        this.places.forEach(place => {
            let marker: any = L.marker([place.lat, place.lon])
              .bindPopup(place.realName + "<br>" + place.address).openPopup();

            if (this.currentPlace) {
              if (place._id == this.currentPlace._id) {

                marker.openPopup();
              }
            }
            marker.data = place;
            this.featureGroup.addLayer(marker);

        });

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
    console.log(currentZoom);
    var newZoom;
    if (currentZoom < 12) {
      newZoom = 12;
    }
    else {
      newZoom = currentZoom + 2;
      if (newZoom > 16) {
        newZoom = 16;
      }
      if (currentZoom > 16) {
        newZoom = currentZoom;
      }
    }
    this.map.setView(loc, newZoom);

  }

  moveToBase() {
    this.map.fitBounds(this.featureGroup.getBounds(), {
      padding : [50, 50]
    });
  }

  moveToSlide(data) {
    if (data.count < this.places.length) {
      this.swiperContainer.swiper.slideTo(data.count + 1);
    }
    else {
      this.swiperContainer.swiper.slideTo(1);
    }

    this.updateMap(data);
  }

  addPlace() {
    console.log(this.authData.fireAuth);
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
            this.listsDataset.addPlaceToList(this.navParams.get('list_id'), data);
            //this.placelist.places.push({
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

  addPlaceModal() {
    let addPlaceModal = this.modalCtrl.create(AddPlaceModal, {
      list_id: this.navParams.get('list_id')
    });

   addPlaceModal.present();
  }


}
