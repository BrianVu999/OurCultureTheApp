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
  viewTitle: string; //calendar title for the calendar view

  selectValue: string;
  eventSource = [ ]

  event = {
    title: '',
    startTime: null,
    endTime: '',
    allDay: true
  };

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

    allDayLabel: "Item",
    showEventDetail:true
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

  //refresh the data
  getFreshData(event) {
    this.createRandomEvents()
    this.allItems = this.eventSource;
    if (event)
      event.target.complete()
      

  }

  //get the event type color showing on the weekday calendar
  getColor(eventType) {
    switch (eventType) {
      case 'Local Holiday':
        return '#3171e0';
      case 'Celebration':
        return '#36abe0';
      case 'Statutory Holiday':
        return '#28ba62';
    }
  }

  //Filter works now!!! But can't identify LocalDay()
  allItems = this.eventSource;

  upDate(sel: any) {
    this.selectValue = sel.target.value;

    if (this.selectValue && this.selectValue.trim() !== '') {
      this.allItems = this.eventSource.filter((item) => {
        return (item.eventType.toLowerCase().indexOf(this.selectValue.toLowerCase()) > -1);
      });
    } else {
      this.eventSource = this.allItems;
    }

    if (this.selectValue == 'all') {
      this.allItems = this.eventSource;
    }
  }

  createRandomEvents() {
    var events = [];

    for (var i = 0; i < 300; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 3);
      var startDay = Math.floor(Math.random() * 60) - 45;
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
          title: 'Event Example ' + (i+1),
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          eventType: 'Celebration'
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
          title: 'Event Example ' + (i+1),
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          eventType: 'Local Holiday'
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
          title: 'Event Example ' + (i+1),
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          eventType: 'Statutory Holiday'
        });
      }

    }

    this.eventSource = events;
  }


  removeEvents() {
    this.eventSource = [];
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'short', this.locale);
    let end = formatDate(event.endTime, 'short', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      message: event.eventType + ", " + end,
      buttons: ['OK'],
    });
    alert.present();
  }


  //No need so far
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

}
