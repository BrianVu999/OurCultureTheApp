import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContributionPageRoutingModule } from './contribution-routing.module';

import { ContributionPage } from './contribution.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContributionPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ContributionPage]
})
export class ContributionPageModule {}
