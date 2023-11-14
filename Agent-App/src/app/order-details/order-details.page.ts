import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  ngOnInit() { }

  public buffer = 0.06;
  public progress = 0;

  constructor() {
    setInterval(() => {
      this.buffer += 0.06;
      this.progress += 0.06;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
        setTimeout(() => {
          this.buffer = 0.06;
          this.progress = 0;
        }, 1000);
      }
    }, 1000);
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'Request Not Send',
      handler: () => {
        console.warn('Order Confirmation Not Send');
      },
    },
    {
      text: 'SEND',
      role: 'Request Sent',
      handler: () => {
        console.warn('Order Confirmation Requset Sent');
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}
