import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindpasswordPage } from './findpassword.page';

const routes: Routes = [
  {
    path: '',
    component: FindpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindpasswordPageRoutingModule {}
