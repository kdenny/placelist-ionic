import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { Subject }    from 'rxjs/Subject';


import { FormBuilder, Validators } from '@angular/forms';
import { Place } from './objects/place'


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class PlacesData {

  places:any;
  currentPlace:any;

  currentList:any;

 private apiUrl = 'http://placelist.pythonanywhere.com/places/';

 private headers = new Headers({'Content-Type': 'application/json'});
 queries;

  private subject:  Subject<Place[]> = new Subject<Place[]>();


 constructor(private http: Http) {
   //this.lists = this.getLists();

 }

 getPlaces(): Promise<Place[]> {
   let options = new RequestOptions({ headers: this.headers});
  return this.http.get(this.apiUrl, options).toPromise()
   .then(response => this.places = response.json() as Place[])
   .catch(this.handleError)
 }


  getPlace(place_id) {
    let options = new RequestOptions({ headers: this.headers});
    let apiUrlPlace = this.apiUrl + place_id + '/';
    return this.http.get(apiUrlPlace, options)
      .map(response => response.json())
      .toPromise();
  }


 private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
 }
}
