import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickupDetailsPage } from './pickup-details.page';

const routes: Routes = [
  {
    path: '',
    component: PickupDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickupDetailsPageRoutingModule {}
