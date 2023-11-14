import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-address',
  templateUrl: './saved-address.page.html',
  styleUrls: ['./saved-address.page.scss'],
})
export class SavedAddressPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  onAddNew()
  {
    this.router.navigate(['/add-address']);
  }

}
