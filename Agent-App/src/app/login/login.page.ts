import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';

export const INTRO_KEY = 'recyclemint';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, public menuCtrl: MenuController) { }

  ngOnInit() { }

  onSubmit()
  {
    this.router.navigate(['/folder/Dashboard']);
    localStorage.setItem(INTRO_KEY, 'true');
  }

  onForget()
  {
    this.router.navigate(['/forget-password']);
  }

  ionViewWillEnter()
  {
    this.menuCtrl.enable(false);
  }

}
