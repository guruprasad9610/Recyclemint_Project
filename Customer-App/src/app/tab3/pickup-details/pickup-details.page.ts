import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pickup-details',
  templateUrl: './pickup-details.page.html',
  styleUrls: ['./pickup-details.page.scss'],
})
export class PickupDetailsPage implements OnInit {
  sucessPage:boolean = false

  constructor(private router:Router) { }

  ngOnInit() {
  }

  confirm()
  {
    this.sucessPage = true
  }

  gotoPickup()
  {
    this.router.navigate(['/tabs/tab4'])
  }

}
