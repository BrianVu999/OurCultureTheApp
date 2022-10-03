import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularEventsPageRoutingModule } from './popular-events-routing.module';

import { PopularEventsPage } from './popular-events.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularEventsPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [PopularEventsPage]
})
export class PopularEventsPageModule {}
