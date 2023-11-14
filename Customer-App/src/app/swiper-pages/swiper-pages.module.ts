import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwiperPagesPageRoutingModule } from './swiper-pages-routing.module';

import { SwiperPagesPage } from './swiper-pages.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperPagesPageRoutingModule
  ],
  declarations: [SwiperPagesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperPagesPageModule {}
