import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  fullName: string = '';
  streetAddress: string = '';
  city: string = '';
  state: string = '';
  postalCode: string = '';

  constructor(private router:Router) { }



  ngOnInit() {
  }

  onSubmit() {
    const address = {
      fullName: this.fullName,
      streetAddress: this.streetAddress,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode,
    };

    console.log('Submitted Address:', address);

    this.router.navigate(['/tabs/tab3/adress-picker'])
  }

}
