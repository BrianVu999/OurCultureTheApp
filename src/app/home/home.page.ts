import { AlertController, ModalController, RefresherEventDetail } from '@ionic/angular';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';

import { CalendarComponent } from 'ionic2-calendar';
import { formatDate } from '@angular/common';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID, Input } from '@angular/core';

interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail;
  target: HTMLIonRefresherElement;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {
  

  @ViewChild(CalendarComponent) myCal: CalendarComponent; //@ViewChild to get access to the calendar component

  @Input()
  eventSource = []; //array to store the events
  viewTitle: string; //calendar title for the calendar view
 
  //setup the format for the calendar
  calendar = {
    mode: 'month', //Calendar Mode
    currentDate: new Date(), //Instance menthod to find the current day
    startingDayMonth: 1, // 0: Sunday, 1: Monday
    formatDayHeader: "EEEEEE", //Format tge monthly calendar Day Header, EEE=>Mon, EEEE=>Monday, EEEEE=>M, EEEEEE=>Mo
    formatMonthTitle:"MMM yyyy",//Format the Monthly Calendar Title

    formatWeekViewDayHeader:"EEEEEE d",
    formatWeekTitle:"MMM yyyy, 'Week'w"
  };

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() { }

  // Change current month/week to next Month =>instance method 
  next() {
    this.myCal.slideNext();
  }

   // Change current month/week to previous Month =>instance method
  back() {
    this.myCal.slidePrev();
  }
  
  // Change the Monthy Calendar Title
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }


  
  // code under the construction for next sprint
  selectedDate: Date;

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    this.eventSource = events;
  }

  removeEvents() {
    this.eventSource = [];
  }
  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }
    });
  }
 
  
    // Calendar event was clicked
    async onEventSelected(event) {
      // Use Angular date pipe for conversion
      let start = formatDate(event.startTime, 'short', this.locale);
      let end = formatDate(event.endTime, 'short', this.locale);
  
      const alert = await this.alertCtrl.create({
        header: event.title,
        subHeader: event.desc,
        message: 'From: ' + start + '<br><br>To: ' + end,
        buttons: ['OK'],
      });
      alert.present();
    }

}
