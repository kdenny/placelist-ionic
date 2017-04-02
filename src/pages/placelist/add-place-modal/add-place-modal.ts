import { Component, ViewChild, NgZone, OnInit } from '@angular/core';
import { Config, NavController, NavParams } from 'ionic-angular';
import {ViewController} from "ionic-angular/index";
import { Keyboard } from '@ionic-native/keyboard';


import { ListsData2 } from '../../../providers/lists-data-2';


declare var google:any;


/*
  Generated class for the PlacelistModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-place-modal',
  templateUrl: 'add-place-modal.html'
})
export class AddPlaceModal implements OnInit{

  placelist;

  address:any = {
        place: '',
        set: false,
    };
  placesService:any;
  placedetails: any;

  placeResult;


  autocompleteItems: any;
  autocomplete: any;
  acService:any;

  tap: any;

  newPlaces: any;

  loading;




  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public listsDataset2: ListsData2, public keyboard: Keyboard) {

    this.tap = new google.maps.Map(document.getElementById('tap'), {
          center: {lat: -33.866, lng: 151.196},
          zoom: 1
        });

    this.loading = false;
    this.autocompleteItems = [];
    this.newPlaces = [];
    this.autocomplete = {
      query: ''
    };


  }

  ngOnInit() {
    this.initPlacedetails();
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
        query: ''
    };
  }

  private reset() {
    this.initPlacedetails();
    this.address.place = '';
    this.address.set = false;
    this.autocompleteItems = [];
    this.autocomplete = {
        query: ''
    };
  }

  private getPlaceDetail(place_id:string):void {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(this.tap);
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                // set full address
                self.placedetails.address = place.formatted_address;
                self.placedetails.name = place.name;
                self.placedetails.photoUrl = place.photos[0].getUrl({'maxWidth': 900, 'maxHeight': 400});
                self.placedetails.photo = place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
                self.placedetails.lat = place.geometry.location.lat();
                self.placedetails.lon = place.geometry.location.lng();
                self.placedetails.state = 'DC';
                self.placedetails.place_type = 'restaurant';
                for (var i = 0; i < place.address_components.length; i++) {
                    let addressType = place.address_components[i].types[0];
                    let values = {
                        short_name: place.address_components[i]['short_name'],
                        long_name: place.address_components[i]['long_name']
                    }
                    if(self.placedetails.components[addressType]) {
                        self.placedetails.components[addressType].set = true;
                        self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                        self.placedetails.components[addressType].long = place.address_components[i]['long_name'];

                    }
                }

                self.placedetails.street_address = self.placedetails.components.street_number.short + " " + self.placedetails.components.route.short;
                // set place in map
                // populate
                self.address.set = true;
                self.newPlaces.pop();
                self.newPlaces.push(self.placedetails);
                self.reset();
            }else{
              console.log("Oops")
            }
        }
    }


  dismiss() {
   if (this.placeResult) {
     let data = this.placeResult;
     this.keyboard.close();
     this.viewCtrl.dismiss(data);
   }

  }

  close() {
   let data = null;
   this.keyboard.close();
   this.viewCtrl.dismiss(data);
  }

  private initPlacedetails() {
      this.placedetails = {
          address: '',
          lat: '',
          lng: '',
          name: '',
          short_address: '',
          photo: '',
          components: {
              route: { set: false, short:'', long:'' },                           // calle
              street_number: { set: false, short:'', long:'' },                   // numero
              sublocality_level_1: { set: false, short:'', long:'' },             // barrio
              locality: { set: false, short:'', long:'' },                        // localidad, ciudad
              administrative_area_level_2: { set: false, short:'', long:'' },     // zona/comuna/partido
              administrative_area_level_1: { set: false, short:'', long:'' },     // estado/provincia
              country: { set: false, short:'', long:'' },                         // pais
              postal_code: { set: false, short:'', long:'' },                     // codigo postal
              postal_code_suffix: { set: false, short:'', long:'' },              // codigo postal - sufijo
          }
      };
  }

  chooseItem(item: any) {
      this.keyboard.close();
      if (!this.loading) {

        var id = item.place_id;

        var placeName = item.terms[0].value;
        var thisPlace = {
          'name': placeName
        }
        this.newPlaces.push(thisPlace);
        console.log(thisPlace)

        this.loading = true;
        this.autocomplete.query = '';
        this.updateSearch();
        this.reset();
        this.getPlaceDetail(id);

        //this.viewCtrl.dismiss(item);
      }
  }

  updateSearch() {
      if (this.autocomplete.query == '') {
          this.autocompleteItems = [];
          return;
      }
      let self = this;
      let config = {
          types:  ['establishment'], // other types available in the API: 'establishment', 'regions', and 'cities'
          input: this.autocomplete.query,
          componentRestrictions: { country: 'US' }
      };
      this.acService.getPlacePredictions(config, function (predictions, status) {
          console.log('modal > getPlacePredictions > status > ', status);
          self.autocompleteItems = [];
          if (predictions) {
            predictions.forEach(function (prediction) {
              self.autocompleteItems.push(prediction);
            });
          }
      });
  }


  addToList() {
    this.keyboard.close();
    this.listsDataset2.addPlaceToList(this.navParams.get('list_id'), this.newPlaces[0])
      .then(response => {
        this.placeResult = response.json();
        console.log(this.placeResult);
        this.dismiss();
      });


  }




}
