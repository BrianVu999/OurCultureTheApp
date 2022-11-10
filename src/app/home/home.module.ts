import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../components/components.module';
import { CalModalPageModule } from '../pages/cal-modal/cal-modal.module';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

import { NgCalendarModule  } from 'ionic2-calendar';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
registerLocaleData(localeEn);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CalModalPageModule,
    ComponentsModule,
    NgCalendarModule
  ],

  declarations: [HomePage],
  
  providers: [
    { provide: LOCALE_ID, useValue: 'en-CA' }
  ]
})
export class HomePageModule {}