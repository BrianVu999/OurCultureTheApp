import { AlertController, ModalController, RefresherEventDetail } from '@ionic/angular';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';

import { CalendarComponent } from 'ionic2-calendar';
import { formatDate } from '@angular/common';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})

export class HomePage implements OnInit {


  @ViewChild(CalendarComponent) myCal: CalendarComponent; //@ViewChild to get access to the calendar component

  @Input()
  eventSource = []; //array to store the events
  viewTitle: string; //calendar title for the calendar view

  eventTypeTitle:string;
  eventName: string;

  eventsArray = ['Oct 8 Milad un Nabi (Mawlid), Muslim', 'Oct 10 First day of Sukkot, Jewish Holiday', 'Oct 10 Thanksgiving Day, Statutory Holiday']

  //setup the format for the calendar
  calendar = {
    mode: 'month', //Calendar Mode
    currentDate: new Date(), //Instance menthod to find the current day
    startingDayMonth: 1, // 0: Sunday, 1: Monday

    formatDayHeader: "EEEEEE", //Format tge monthly calendar Day Header, EEE=>Mon, EEEE=>Monday, EEEEE=>M, EEEEEE=>Mo
    formatMonthTitle: "MMM yyyy",//Format the Monthly Calendar Title

    formatWeekViewDayHeader: "EEEEEE d",
    formatWeekTitle: "MMM yyyy, 'Week'w",
    startingDayWeek: 1,

    allDayLabel:"Item"

  };

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,


    @Inject(LOCALE_ID) private locale: string,
  ) { }

  ngOnInit() {
    this.getFreshData(null)
  }

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

  getFreshData(event) {
    this.createRandomEvents()
    if (event)
      event.target.complete()

  }

  getColor(eventTypeTitle) { 
    switch (eventTypeTitle) {
      case 'Statutory':
        return '#3171e0';
      case 'Celebration':
        return '#36abe0';
      case 'Local':
        return '#28ba62';
    }
  }

  createRandomEvents() {
    var events = [];
    
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 3);
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
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        
        events.push({
          eventName: 'C ' +i,
          title: 'event '+i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          eventTypeTitle:'Celebration' 
        });
      }
      else if (eventType === 1) {
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
          eventName: 'L' +i,
          title: 'event '+i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          eventTypeTitle:'Local'
        });
      }


      else {
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
          eventName: 'S '+i,
          title: 'event '+i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          eventTypeTitle:'Statutory'
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
    header: event.eventName,
    subHeader: event.title,
    message: event.eventTypeTitle +", "+ start,
    buttons: ['OK'],
  });
  alert.present();
}


}
