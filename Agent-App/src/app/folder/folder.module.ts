import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { ScrapRatesComponent } from '../Components/scrap-rates/scrap-rates.component';
import { OrdersComponent } from '../Components/orders/orders.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { PrivacyComponent } from '../Components/privacy/privacy.component';
import { AboutComponent } from '../Components/about/about.component';
import { SupportComponent } from '../Components/support/support.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage, DashboardComponent, ScrapRatesComponent, OrdersComponent, ProfileComponent, PrivacyComponent, AboutComponent, SupportComponent]
})
export class FolderPageModule {}
