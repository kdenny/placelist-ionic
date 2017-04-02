import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { Subject }    from 'rxjs/Subject';


import { FormBuilder, Validators } from '@angular/forms';
import { List } from './objects/list'

import { AuthenticationService } from './auth-data-token';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class ListsData2 {

 lists: List[];
 currentList:any;
  postResult:any;
  placelist:any;
  places:any;

 private apiUrl = 'http://placelist.pythonanywhere.com/lists/';

 private headers = new Headers({'Content-Type': 'application/json'});
 queries;

  private subject:  Subject<List[]> = new Subject<List[]>();


 constructor(private http: Http, public authService: AuthenticationService) {
   //this.lists = this.getLists();

 }

 getLists(): Promise<List[]> {
   let options = new RequestOptions({ headers: this.headers});
  return this.http.get(this.apiUrl, options).toPromise()
   .then(response => this.lists = response.json() as List[])
   .catch(this.handleError)
 }


 newList(list) {
    list.author = this.authService.currentUsername;
    if (!list.author) {
      console.log(this.authService.currentUsername);
      list.author = 'kdenny';
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(list);
    console.log(body);
    return this.http.post(this.apiUrl, body, options).toPromise()
   .then(response => this.currentList = response.json() as List)
   .catch(this.handleError);
  }

  addPlaceToList(list_id, placeData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(placeData);
    console.log(body);
    let apiUrlList = this.apiUrl + list_id + '/';
    console.log(apiUrlList);
    return this.http.post(apiUrlList, body, options).toPromise();
  }

  getPlacelist(list_id) {
    let options = new RequestOptions({ headers: this.headers});
    let apiUrlList = this.apiUrl + list_id + '/';
    return this.http.get(apiUrlList, options)
      .map(response => response.json())
      .toPromise();
  }

  processPlacelist() {
    let pl;
    this.currentList.subscribe(snapshot => {
        pl = snapshot;
        console.log(pl);
      });
    return pl;

  }

  removePlaceFromList(list_id, place_id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiUrlRemovePlace = this.apiUrl + list_id + '/places/' + place_id + '/';
    console.log(apiUrlRemovePlace);
    return this.http.delete(apiUrlRemovePlace, options).toPromise();
  }


 private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
 }
}
