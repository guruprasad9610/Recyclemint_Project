import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  intro: any;

  constructor(private router: Router , private authService: AuthService) {
   const intro = localStorage.getItem("intro")

  //  if(intro)
  //  {
  //   this.router.navigate(['/login'])
  //  }
  }

  ngOnInit() {

  }

  public alertButtons = [
    {
      text: 'Deny',
      role: 'cancel',
      handler: () => {
        this.router.navigate(['/login']);
        console.log('Location Permission Denied');
      },
    },
    {
      text: 'Allow',
      role: 'confirm',
      handler: () => {
        this.router.navigate(['/swiper-pages']);
        console.log('Location Permission Allowed');
      },
    },
  ];

  setResult(ev: any)
  {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}
