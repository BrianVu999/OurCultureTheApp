import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx'; //import the social sharing module then we can sue it

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  selectedEvent:any;
  constructor(private dbService: DatabaseService,private socialSharing: SocialSharing) { 
    //get the selected the event from the database
    this.selectedEvent = dbService.selectedEvent.getValue;
    dbService.selectedEvent.subscribe(result => {

      this.selectedEvent = result;
    })
  }
  //set up variables
  messageDate=" "
  messageTitle=" "
  messageType=" "
  messageActivity=" "
  messageReason=" "
  eventMessage=" "

  ngOnInit() {
  }
  
  //method to read the event detail form the selected event that in the database
  getMessage(){
  this.messageDate=this.selectedEvent.date
  this.messageTitle=this.selectedEvent.name
  this.messageType=this.selectedEvent.eventType
  this.messageActivity=this.selectedEvent.activity
  this.messageReason=this.selectedEvent.reason
  //format the message that we would send to the social media
  this.eventMessage="Event: "+this.messageTitle+"\n"+"Date: "+this.messageDate+"\n"+
                    "Type: "+this.messageType+"\n"+this.messageActivity+"\n"+"BY: #OURCULTURESTHEAPP"
  }
  //method to send the message to Twitter
  shareViaTwitter() {
    //get the message of the slected event
    this.getMessage()
    console.log(this.eventMessage);
    //interface to send the messgae to twitter
    this.socialSharing.shareViaTwitter(this.eventMessage, this.messageTitle, null)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
  }
 //method to send the message by email
  shareViaEmail() {
    //get the message of the slected event
    this.getMessage()
    console.log(this.eventMessage);
    //interface to send the messgae by email
    this.socialSharing.shareViaEmail(this.eventMessage,this.messageTitle, null)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
  }
  //method to send the message by whatsapp
  
  shareViaWhatsapp() {
    //get the message of the slected event
    this.getMessage()
    //interface to send the messgae by whatsapp
    this.socialSharing.shareViaWhatsApp(this.eventMessage,this.messageTitle)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
  }
}
