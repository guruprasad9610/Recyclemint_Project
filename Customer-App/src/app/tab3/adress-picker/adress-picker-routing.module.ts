import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdressPickerPage } from './adress-picker.page';

const routes: Routes = [
  {
    path: '',
    component: AdressPickerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdressPickerPageRoutingModule {}
