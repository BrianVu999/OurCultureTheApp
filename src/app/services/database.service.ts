import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  userdb = this.db.collection('user');
  eventdb = this.db.collection('event');

  constructor(private db: AngularFirestore) {}
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
}
