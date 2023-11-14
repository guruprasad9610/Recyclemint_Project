import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INTRO_KEY } from '../otp/otp.page';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit
{

  constructor(private router: Router) { }

  ngOnInit() { }

  onNotice()
  {
    this.router.navigate(['/notifications']);
  }

  toProfile()
  {
    this.router.navigate(['/edit-profile']);
  }

  toAddress()
  {
    this.router.navigate(['/saved-address']);
  }

  toPrivacy()
  {
    this.router.navigate(['/privacy']);
  }

  toAbout()
  {
    this.router.navigate(['/about']);
  }

  toSupport()
  {
    this.router.navigate(['/support']);
  }

  onLogout()
  {
    localStorage.removeItem(INTRO_KEY);
    this.router.navigate(['/login']);
  }

}
