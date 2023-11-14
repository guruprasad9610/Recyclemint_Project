import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupDetailsPageRoutingModule } from './pickup-details-routing.module';

import { PickupDetailsPage } from './pickup-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupDetailsPageRoutingModule
  ],
  declarations: [PickupDetailsPage]
})
export class PickupDetailsPageModule {}
