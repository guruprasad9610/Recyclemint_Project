import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './AuthGuard/auth.guard';
import { AuthService } from './services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { NgOtpInputModule } from  'ng-otp-input';


import { fas} from '@fortawesome/free-solid-svg-icons';
library.add(fas);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule, FontAwesomeModule, NgOtpInputModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthGuard, AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
