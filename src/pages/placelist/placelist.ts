import { Component, ViewChild } from '@angular/core';
import { Config, NavController, NavParams } from 'ionic-angular';

import { ListsData } from '../../providers/lists-data';

import 'leaflet';

import {KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';




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


  viewMode;
  map;

  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  example1SwipeOptions: any;
  pictures;


  constructor(public nav: NavController, public listsDataset: ListsData, public navParams: NavParams) {

      this.viewMode = 'map';

      this.placelist = listsDataset.getPlacelist(this.navParams.get('list_id'));
      this.currentList = this.navParams.get('list_id');
      this.listTitle = this.placelist.title;
      this.currentSlide = 1;

      this.places = this.placelist.places;


      this.toggleMap();

      this.toggleMap();

      this.example1SwipeOptions = {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 225,
        onSlideChangeEnd: (slider) => {
          this.currentSlide = slider.realIndex + 1;
          if (this.currentSlide >= this.places.length) {
            this.currentSlide = 0;
          }

          this.currentPlace = this.places[this.currentSlide];

          this.updateMarkers();

          console.log(this.currentPlace);
        }
      };

      this.pictures = [
        'https://s27.postimg.org/ofnspemvn/puppy_1.jpg',
        'https://s27.postimg.org/bcwrjvm1f/puppy_2.jpg',
        'https://s27.postimg.org/4aytxoifn/puppy_3.jpg',
        'https://s27.postimg.org/s38597kgj/puppy_4.jpg'
      ];

  }

  toggleMap() {
    console.log(this.viewMode);
    if (this.viewMode == 'map') {
      this.viewMode = 'list';
      //this.getList();
    }

    else {
      this.viewMode = 'map';
      this.showMap();
      this.showMarkers();
      //this.getList();
    }

  }

  showMap() {
        console.log("Building map");
        setTimeout(() => {
            //this.getList();
            this.map = L.map("map").setView([38.900221, -76.996895], 14);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
            if (this.featureGroup) {
              this.map.removeLayer(this.featureGroup);
              this.map.addLayer(this.featureGroup);
            }
            this.showMarkers();
            this.map.addLayer(this.featureGroup);
            this.map.fitBounds(this.featureGroup.getBounds(), {
              padding : [50, 50]
            });


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
            .bindPopup(place.realName + "<br>" + place.address).openPopup();
            marker.data = place;
            marker.on('click', function (e) {
                marker.data.count = count;
            });
            marker.data = place;
            this.featureGroup.addLayer(marker);
          }
          // Don't open popup if not selected
          else {
            let marker: any = L.marker([place.lat, place.lon])
            .bindPopup(place.realName + "<br>" + place.address);
            marker.data = place;

            marker.on('click', function (e) {
                console.log(marker.data);
                marker.data.count = count;
            });
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

              //.on('click', event => this.openPropertyDetail(event.target.data));
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

  moveToSlide() {
    this.swiperContainer.swiper.slideTo(this.currentSlide);
  }


}
