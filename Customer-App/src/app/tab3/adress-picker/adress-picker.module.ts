import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdressPickerPageRoutingModule } from './adress-picker-routing.module';

import { AdressPickerPage } from './adress-picker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdressPickerPageRoutingModule
  ],
  declarations: [AdressPickerPage]
})
export class AdressPickerPageModule {}
