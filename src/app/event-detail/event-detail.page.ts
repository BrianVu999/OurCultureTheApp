import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
// import { FacebookAuthProvider } from '@angular/fire/auth';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform } from '@ionic/angular';
import {addDays} from "date-fns";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  ids:number[]=[];
  alertMessage = '';
  @Input() selecteddays: any;
  selectedEvent:any;
  text :String;
  constructor(private dbService: DatabaseService,private socialSharing: SocialSharing, 
    private localNotifications: LocalNotifications, private plt : Platform, private alertControl : AlertController
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
                    this.messageActivity+"\n"+
                    "BY: #OURCULTURESAPP"
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

 /*  notify(){
  this.localNotifications.schedule({
id : 1,
title: 'Reminder',
text: 'Event is coming',
data : {mydata: 'My hidden message'},
trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND},

  });
  } */



  setNotification(days : any ){


   let id = this.ids.length;
    this.ids.push(id);
if(days.target.value == 4){

  this.localNotifications.schedule({
    id : id,
    title: 'Reminder',
    text: 'Event is coming(test 10 seconds)',
    data : {mydata: 'My hidden message'},
    trigger: {in: 10, unit: ELocalNotificationTriggerUnit.SECOND},
    
      });

      
}
else if(days.target.value == 5){

  this.localNotifications.schedule({
    id : id,
    title: 'Reminder',
    text: 'Event is coming(test 15 seconds)',
    data : {mydata: 'My hidden message'},
    trigger: {in: 15, unit: ELocalNotificationTriggerUnit.SECOND},
    
      });
}
else{
    this.selecteddays = days.target.value;
    console.log(days);
      var date = new Date(this.selectedEvent.date);
      let beforeDays = addDays(date, -(this.selecteddays));
      
      console.log(beforeDays + ' ' + id);

     
  
        this.localNotifications.schedule ({
        
        id : id,
        title: 'Reminder',
        text: this.selectedEvent.title + ' is coming in ' + this.selecteddays + ' days.',
        trigger: {at: beforeDays},
        data : {mydata: this.selectedEvent.title}
      
      });

      
}

this.showAlert('Notification', 'The event notification before ' + days.target.value + ' day(s) is added.');
     

    }

    async showAlert(header: string, msg: string) {
      const alert = await this.alertControl.create({
        header: header,
        subHeader: '',
        message: msg,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              
            },
          },
        ],
      });
      await alert.present();
    }

    } 

