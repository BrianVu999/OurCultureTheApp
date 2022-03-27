import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServerDownPageRoutingModule } from './server-down-routing.module';

import { ServerDownPage } from './server-down.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServerDownPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ServerDownPage]
})
export class ServerDownPageModule {}
