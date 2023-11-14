import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { register } from 'swiper/element/bundle';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  imgBaseURL = environment.apiurl_base
  Items: any = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit()
  {
    this.loadAllItems();
  }

  loadAllItems()
  {
    this.authService.itemService().subscribe(res=>{
      console.log(res);
      this.Items = res;
    })
  }

  logScrollStart(){ }

  logScrolling(event:Event)
  {
    console.log(event.target)
  }
  logScrollEnd(){ }

  onSell()
  {
    this.router.navigate(['/tabs/tab3']);
  }

  onNotice()
  {
    this.router.navigate(['/notifications']);
  }

  viewAll()
  {
    this.router.navigate(['/tabs/tab2']);
  }

}
