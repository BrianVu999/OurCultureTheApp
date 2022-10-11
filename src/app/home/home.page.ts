import {
  AlertController,
  ModalController,
  RefresherEventDetail,
} from '@ionic/angular';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';

import { CalendarComponent } from 'ionic2-calendar';
import { formatDate, WeekDay } from '@angular/common';
import {
  Component,
  ViewChild,
  OnInit,
  Inject,
  LOCALE_ID,
  Input,
} from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(CalendarComponent) myCal: CalendarComponent; //@ViewChild to get access to the calendar component

  @Input()
  viewTitle: string; //calendar title for the calendar view

  selectValue: string
  eventSource = []

  // The list of events for incoming week
  eventsInComingWeek :any;
  eventsInComingWeekWithoutFilter :any;

  event = {
    title: '',
    startTime: null,
    endTime: '',
    allDay: true,
  };

  //setup the format for the calendar
  calendar = {
    mode: 'month', //Calendar Mode
    currentDate: new Date(), //Instance menthod to find the current day
    startingDayMonth: 1, // 0: Sunday, 1: Monday

    formatDayHeader: 'EEEEEE', //Format tge monthly calendar Day Header, EEE=>Mon, EEEE=>Monday, EEEEE=>M, EEEEEE=>Mo
    formatMonthTitle: 'MMM yyyy', //Format the Monthly Calendar Title

    formatWeekViewDayHeader: 'EEEEEE d',
    formatWeekTitle: "MMM yyyy, 'Week'w",
    startingDayWeek: 1,

    allDayLabel: 'Item',
    showEventDetail: true,
  };

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private dbService: DatabaseService,
    private router: Router,

    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.dbService.loadAllEvents();
    this.dbService.allEvents.subscribe((data) => {
      data.forEach((element, index) => {
        let tempTime = new Date(
          new Date().getFullYear(),
          element.date.substring(5, 7) - 1,
          element.date.substring(8, 10)
        );

        let endTime = new Date();
        endTime.setTime(tempTime.getTime() + 8 * 60 * 60 * 1000);

        let startTime = new Date();
        startTime.setTime(endTime.getTime() - 4 * 60 * 60 * 1000);
        data[index]['startTime'] = startTime;
        data[index]['endTime'] = endTime;
        data[index]['allDay'] = true;
        data[index]['title'] = element.name;
        data[index]['eventType'] = element.eventType;
      });
      this.eventSource = data;
      this.getFreshData(null);
    });
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
    this.eventsInComingWeek = this.eventSource.filter((item) => {
      return (
        // get events in upcoming week (7 days including today)
        item.endTime >= Date.now() &&
        item.endTime <= new Date().setTime(Date.now() + 6*24*60*60*1000 ) &&
        (this.eventsInComingWeek = this.eventSource)
      );
    });
    if (event) event.target.complete();
    this.eventsInComingWeekWithoutFilter = this.eventsInComingWeek;
  }

  //get the event type color showing on the weekday calendar
  getColor(eventType) {
    switch (eventType) {
      case 'local':
        return '#3171e0';
      case 'celebration':
        return '#36abe0';
      case 'statutory':
        return '#28ba62';
    }
  }

  //Filter works now!!! But can't identify LocalDay()

  upDate(sel: any) {
    this.selectValue = sel.target.value;

    if (!this.selectValue || this.selectValue == 'all') {
      this.eventsInComingWeek = this.eventsInComingWeekWithoutFilter;
    } else{
      this.eventsInComingWeek = this.eventsInComingWeekWithoutFilter.filter((item) => {
        return item.endTime >= Date.now() && 
        item.eventType == this.selectValue && 
        (this.eventsInComingWeek = this.eventSource);
      });
    }
  }

  createRandomEvents() {
    var events = [];

    for (var i = 0; i < 50; i += 1) {
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
          title: 'Event Example ' + (i + 1),
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          eventType: 'Celebration',
        });
      } else if (eventType === 1) {
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
          title: 'Event Example ' + (i + 1),
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          eventType: 'Local Holiday',
        });
      } else {
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
          title: 'Event Example ' + (i + 1),
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          eventType: 'Statutory Holiday',
        });
      }
    }
    this.eventSource = events;
  }

  removeEvents() {
    this.eventSource = [];
  }

  // Calendar event was clicked
  async onEventSelected(selectedEvent) {
    this.router.navigate(['/event-detail'])
    this.dbService.updateSelectedEvent(selectedEvent)
  }

  //No need so far
  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,
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
  eventClick(selectedEvent){
    this.dbService.updateSelectedEvent(selectedEvent);
  }
}
