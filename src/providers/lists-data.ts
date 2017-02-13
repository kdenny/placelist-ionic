/**
* This should come as no surprise, we need to import Injectable so we can use this provider as an injectable.
* We also need to import firebase so we can talk to our DB.
*/
import { Injectable } from '@angular/core';
//import * as firebase from 'firebase';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {Platform} from 'ionic-angular/index';
import {Observable} from 'rxjs/Observable';
import {FirebaseObjectObservable} from "angularfire2/index";



@Injectable()
export class ListsData {

  lists:any;
  size:any;
  userLists:any;

  placelist:any;

  currentList:any;

  // We'll use this to create an auth reference to the logged in user.
  currentUser:any;

  fireAuth:any;

  listsArray:Array<any>;

  userListsArray:Array<any>;


  constructor(public af:AngularFire, private platform : Platform) {
    /**
     * Here we create the references I told you about 2 seconds ago 😛
     */
    af.auth.subscribe(user => {
      if (user) {
        this.fireAuth = user.auth;

      }
    });

    this.lists = af.database.list('https://marcopolo-1278.firebaseio.com/lists/');


    this.currentUser = af.auth;


    this.userLists = af.database.list('https://marcopolo-1278.firebaseio.com/lists/',
      {
        query: {
          orderByChild: 'author',
          equalTo: 'earldeezy'
        }
      }
    );

    this.lists.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
      })
    });

    this.userLists.subscribe(snapshots => {
      snapshots.forEach(snapshot => {

      })
    });

  }


  getLists():any {

    return this.lists;
  }

  getPlacelist(list_id: string):any {

    this.placelist = this.af.database.object('https://marcopolo-1278.firebaseio.com/lists/' + list_id);

    this.placelist.subscribe(snapshot => {
      this.currentList = snapshot;
    });

    //this.item.set({ name: newName });
    return this.currentList;
  }

  newList(data, author) {

    var listKey = this.lists.push({
        title: data.title,
        type: data.type,
        author: author
    });
    var addedList = {
      title: data.title,
      type: data.type,
      author: author,
      _id: listKey.path.o[1]
    };
    console.log(addedList);
    this.af.database.object('https://marcopolo-1278.firebaseio.com/lists/'+addedList._id).set(addedList);
  }


  addPlaceToList(list_id, placeData) {
    let o = this.af.database.list('https://marcopolo-1278.firebaseio.com/lists/' + list_id + '/places/');
    o.push(placeData);
  }


}
