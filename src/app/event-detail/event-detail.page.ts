import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { FacebookAuthProvider } from '@angular/fire/auth';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  selectedEvent:any;
  text :String;
  constructor(private dbService: DatabaseService,private socialSharing: SocialSharing, 
    private localNotifications: LocalNotifications, private plt : Platform
    ) { 
    this.selectedEvent = dbService.selectedEvent.getValue;
    dbService.selectedEvent.subscribe(result => {

      this.selectedEvent = result;
    })

    this.plt.ready().then(() =>{
    this.localNotifications.on('click').subscribe(res =>{
let msg = res.data? res.data.mydata : '';
console.log("Click: ",res.title , msg, res.text);

    });

    this.localNotifications.on('trigger').subscribe(res =>{
      let msg = res.data? res.data.mydata : '';
      console.log("Trigger: ", res.title , msg, res.text);
      
          });

  
  


   } );
  }
  messageDate=" "
  messageTitle=" "
  messageType=" "
  messageActivity=" "
  messageReason=" "
  eventMessage=" "

  ngOnInit() {
  }

  getMessage(){
  this.messageDate=this.selectedEvent.date
  this.messageTitle=this.selectedEvent.name
  this.messageType=this.selectedEvent.eventType
  this.messageActivity=this.selectedEvent.activity
  this.messageReason=this.selectedEvent.reason
  this.eventMessage="Event: "+this.messageTitle+"\n"+
                    "Date: "+this.messageDate+"\n"+
                    "Type: "+this.messageType+"\n"+
                    "Things to do: "+this.messageActivity+"\n"+
                    "BY: #OURCULTUREAPP"
  }

  shareViaTwitter() {
    this.getMessage()
    console.log(this.eventMessage);
    this.socialSharing.shareViaTwitter(this.eventMessage, this.messageTitle, null)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
  }

  shareViaEmail() {
    this.getMessage()
    console.log(this.eventMessage);
    this.socialSharing.shareViaEmail(this.eventMessage,this.messageTitle, null)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
  }

  shareViaWhatsapp() {
    this.socialSharing.shareViaWhatsApp(this.eventMessage,this.messageTitle)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
  }

  notify(){
  this.localNotifications.schedule({
id : 1,
title: 'Reminder',
text: 'Event is coming',
data : {mydata: 'My hidden message'},
trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND},

  });
  }
}
