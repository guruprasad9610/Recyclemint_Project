import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INTRO_KEY } from './login/login.page';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Dashboard', url: '/folder/Dashboard', icon: 'home' },
    { title: 'Scrap Rates', url: '/folder/Scrap Rates', icon: 'calculator' },
    { title: 'Order History', url: '/folder/Order History', icon: 'cart' },
    { title: 'Profile', url: '/folder/Profile', icon: 'person' },
    { title: 'Privacy & Security', url: '/folder/Privacy & Security', icon: 'shield-half' },
    { title: 'About Application', url: '/folder/About Application', icon: 'alert-circle' },
    { title: 'Help & Support', url: '/folder/Help & Support', icon: 'call' },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn()
  }


  onLogout()
  {
    localStorage.removeItem(INTRO_KEY);
    this.router.navigate(['/login']);
  }
}
