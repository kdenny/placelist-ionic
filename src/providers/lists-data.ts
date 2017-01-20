/**
* This should come as no surprise, we need to import Injectable so we can use this provider as an injectable.
* We also need to import firebase so we can talk to our DB.
*/
import { Injectable } from '@angular/core';
//import * as firebase from 'firebase';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseObjectObservable} from "angularfire2/index";



@Injectable()
export class ListsData {
  // We'll use this to create a database reference to the userProfile node.

  lists:any;
  userLists:any;

  placelist:any;

  currentList:any;

  // We'll use this to create an auth reference to the logged in user.
  currentUser:any;

  fireAuth:any;

  listsArray:Array<any>;

  userListsArray:Array<any>;


  constructor(public af:AngularFire) {
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
        //console.log(snapshot.title);
      })
    });

    this.userLists.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        //console.log("User List");
        //console.log(snapshot.title);
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

    console.log(this.currentList);

    //this.item.set({ name: newName });
    return this.currentList;
  }

}



  //createEvent(eventName: string, eventDate: string,
  //    eventPrice: number, eventCost: number): any {
  //    return this.eventList.push({
  //      name: eventName,
  //      date: eventDate,
  //      price: eventPrice,
  //      cost: eventCost
  //    }).then( newEvent => {
  //      this.eventList.child(newEvent.key).child('id').set(newEvent.key);
  //    });
  //  }
