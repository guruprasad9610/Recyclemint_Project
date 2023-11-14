import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwiperPagesPage } from './swiper-pages.page';

const routes: Routes = [
  {
    path: '',
    component: SwiperPagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwiperPagesPageRoutingModule {}
