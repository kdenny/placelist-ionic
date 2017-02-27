import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { Subject }    from 'rxjs/Subject';


import { FormBuilder, Validators } from '@angular/forms';
import { List } from './list'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class ListsData2 {

 lists:any;
 currentList:any;
  postResult:any;
  placelist:any;
  places:any;
 private apiUrl = 'http://placelist.pythonanywhere.com/lists/';

 private headers = new Headers({'Content-Type': 'application/json'});
 queries;

  private subject:  Subject<List[]> = new Subject<List[]>();


 constructor(private http: Http) {
   //this.lists = this.getLists();

 }

 getLists(): Promise<List[]> {
   let options = new RequestOptions({ headers: this.headers});
  return this.http.get(this.apiUrl, options).toPromise()
   .then(response => this.lists = response.json() as List[])
   .catch(this.handleError)
 }


 newList(list) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(list);
    return this.http.post(this.apiUrl, body, options).toPromise()
   .then(response => this.currentList = response.json() as List)
   .catch(this.handleError);
  }

  addPlaceToList(list_id, placeData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(placeData);
    let apiUrlList = this.apiUrl + list_id + '/';

    return this.http.post(apiUrlList, body, options).toPromise()
   .then(response => this.postResult = response.json())
   .catch(this.handleError);
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


 // announceQuery(queries: Query[]) {
 //   this.queries = queries;
 //   this.subject.next(queries);
 // }
 //
 // getAnnouncedQueries(): Observable<Query[]> {
 //   return this.subject.asObservable();
 // }
 //
 // removeByAttr(arr, attr, value, data) {
 //   var i = arr.length;
 //   var oldId;
 //   while(i--){
 //      if( arr[i]
 //          && arr[i].hasOwnProperty(attr)
 //          && (arguments.length > 2 && arr[i][attr] === value ) ){
 //
 //           oldId = arr[i]['id'];
 //
 //          arr.splice(i,1);
 //
 //      }
 //   }
 //   data['id'] = oldId;
 //   // arr.push(data);
 //   return arr;
 // }
 //
 // updateByAttr(arr, attr, value, data) {
 //   this.removeByAttr(arr, attr, value, data);
 //   arr.push(data);
 //   return arr;
 // }
 //
 //
 //
 //addQuery(query) {
 //   let headers = new Headers({ 'Content-Type': 'application/json' });
 //   let options = new RequestOptions({ headers: headers });
 //   let body = JSON.stringify(query);
 //   return this.http.post(this.apiUrl, body, options).map((res: Response) => res.json());
 // }
 //
 // deleteQuery(query) {
 //   let headers = new Headers({ 'Content-Type': 'application/json' });
 //   let body = JSON.stringify(query);
 //   let options = new RequestOptions({ headers: headers, body: body });
 //
 //   return this.http.delete(this.apiUrl, options).map((res: Response) => res.json());
 // }
 //
 // selectQuery(selected) {
 //   this.currentQuery = selected;
 //   this.queryForm.patchValue({
 //     sql_query: this.currentQuery.sql_query,
 //     filename: this.currentQuery.filename
 //   });
 // }


 private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
 }
}
