import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adress-picker',
  templateUrl: './adress-picker.page.html',
  styleUrls: ['./adress-picker.page.scss'],
})
export class AdressPickerPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  gotoadd()
  {
     this.router.navigate(['/tabs/tab3/add-address'])
  }

  gotoNext()
  {
     this.router.navigate(['/tabs/tab3/pickup-details'])
  }

}
