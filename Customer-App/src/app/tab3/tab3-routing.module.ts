import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [

  {
    path: '',
    component: Tab3Page,
    pathMatch: 'full'
  },

  {
    path: 'date-picker',
    loadChildren: () => import('./date-picker/date-picker.module').then(m => m.DatePickerPageModule)
  },
  {
    path: 'adress-picker',
    loadChildren: () => import('./adress-picker/adress-picker.module').then( m => m.AdressPickerPageModule)
  },  {
    path: 'add-address',
    loadChildren: () => import('./add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'pickup-details',
    loadChildren: () => import('./pickup-details/pickup-details.module').then( m => m.PickupDetailsPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule { }
