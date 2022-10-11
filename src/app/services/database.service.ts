import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { query, where } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  userdb = this.db.collection('user');
  eventdb = this.db.collection('event');
  allEvents = new Subject<any>();
  selectedEvent = new BehaviorSubject<any>("");

  constructor(
    private db: AngularFirestore,
    private nativeStorage: NativeStorage
  ) {
    this.loadEventsBasedOnMonth("09");
  }
  saveUser(uid, email, password, name) {
    this.userdb.doc(uid).set({
      email: email,
      password: password,
      name: name,
      isAdmin: false,
    });
  }
  saveEvent(newEvent) {
    let user = JSON.parse(localStorage.getItem('user'));
    let event = {
      creatorID: user.uid,
      name: newEvent.name,
      date: newEvent.date,
      dateDetermination: newEvent.dateDetermination,
      religious: newEvent.religious,
      eventType: newEvent.eventType,
      canadaObservedPlace: newEvent.canadaObservedPlace,
      reason: newEvent.reason,
      activity: newEvent.activity,
      isApproved: false,
      isApprovedBy: '',
    };
    console.log(event);

    this.eventdb.add(event);
  }

  async loadEventsBasedOnMonth(mm:string) {
    let events = [];
    const db = getFirestore();
    const eventRef = collection(db, 'event');
    // *** TO_DO *** Change the filter isApproved to true
    const q = query(
      eventRef,
      where('isApproved', '==', false),
      where('dateMM', '==', mm)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      events.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return events;
  }

  async loadAllEvents(){
    let events = [];
    const db = getFirestore();
    const eventRef = collection(db, 'event');
    // *** TO_DO *** Change the filter isApproved to true
    const q = query(
      eventRef,
      where('isApproved', '==', false)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      events.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    this.allEvents.next(events);
  }

  updateSelectedEvent(event:any){
    this.selectedEvent.next(event);
  }


}
