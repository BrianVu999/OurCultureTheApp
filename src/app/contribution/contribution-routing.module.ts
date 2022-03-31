import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContributionPage } from './contribution.page';

const routes: Routes = [
  {
    path: '',
    component: ContributionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContributionPageRoutingModule {}
