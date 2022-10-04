import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularEventsPage } from './popular-events.page';

const routes: Routes = [
  {
    path: '',
    component: PopularEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularEventsPageRoutingModule {}
