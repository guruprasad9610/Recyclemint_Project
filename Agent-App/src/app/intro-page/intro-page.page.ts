import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.page.html',
  styleUrls: ['./intro-page.page.scss'],
})
export class IntroPagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  onStart()
  {
    this.router.navigate(['/login']);
  }

}
