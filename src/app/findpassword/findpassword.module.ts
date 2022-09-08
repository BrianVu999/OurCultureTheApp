import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindpasswordPageRoutingModule } from './findpassword-routing.module';

import { FindpasswordPage } from './findpassword.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindpasswordPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FindpasswordPage]
})
export class FindpasswordPageModule {}
