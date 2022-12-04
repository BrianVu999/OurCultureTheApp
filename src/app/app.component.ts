import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  active = '';

  NAV = [
    {
      name: 'Home',
      link: '/home',
      icon: 'calendar',
    },
    {
      name: 'Popular-events',
      link: '/popular-events',
      icon: 'list',
    },
    {
      name: 'Contribution',
      link: '/contribution',
      icon: 'person-circle',
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dbService: DatabaseService,
    private nativeStorage: NativeStorage
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url;
    });
  }

  ngOnInit() {}

  //Replace current calendar events with all events from database
  async refreshCalendar() {
    this.nativeStorage.remove('allEvents');
    this.dbService.loadAllEvents();
    const alert = await this.alertController.create({
      header: 'Update Successfully',
      message: 'Your calendar is up-to-date',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
