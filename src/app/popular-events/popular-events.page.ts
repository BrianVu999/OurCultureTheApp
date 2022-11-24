import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-popular-events',
  templateUrl: './popular-events.page.html',
  styleUrls: ['./popular-events.page.scss'],
})
export class PopularEventsPage implements OnInit {
  topPopularEvents: any = [];

  constructor(
    public formBuilder: FormBuilder,
    public alertControl: AlertController,
    private db: DatabaseService
  ) {
    this.db.allEvents.subscribe((data) => {
      this.updateTopPopularEvents(data);
    });
  }

  item: any;

  updateTopPopularEvents(allEvents) {
    this.topPopularEvents = [];
    allEvents.forEach((element) => {
      if (element.isPopular == true) {
        this.topPopularEvents.push(element);
      }
    });
  }

  eventClick(selectedEvent) {
    this.db.updateSelectedEvent(selectedEvent);
  }

  ngOnInit() {
    this.getFreshData(null);
  }

  getFreshData(event) {
    if (event) event.target.complete();
  }
}
