import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  selectedEvent:any;
  constructor(private dbService: DatabaseService) { 
    this.selectedEvent = dbService.selectedEvent.getValue;
    dbService.selectedEvent.subscribe(result => {
      this.selectedEvent = result;
    })
  }

  ngOnInit() {
  }

}
