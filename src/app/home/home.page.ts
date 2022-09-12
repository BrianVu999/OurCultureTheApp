import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar'
import { ModalController } from '@ionic/angular';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  dateRange: { from: string; to: string; };
  type: 'string';

  optionsRange: CalendarComponentOptions = {
    monthFormat: 'YYYY MMM',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekStart: 1
  };
  
  onChange($event) {
    console.log($event);
  }

  onDaySelect($event) {
    console.log($event);
  }

  constructor(
    public modalCtrl: ModalController,
  ) { }
  
  ngOnInit() {
  }

  
}

