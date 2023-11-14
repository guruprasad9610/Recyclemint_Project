import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },

  {
    path: 'order-details',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
