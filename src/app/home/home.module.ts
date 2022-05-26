import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../components/components.module';


import { CalendarModule } from 'ion2-calendar';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  declarations: [HomePage],
  providers: [{ provide: LOCALE_ID, useValue: 'ca-EN' }]
})
export class HomePageModule {}
