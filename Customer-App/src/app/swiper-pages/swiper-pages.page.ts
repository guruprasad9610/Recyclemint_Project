import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-swiper-pages',
  templateUrl: './swiper-pages.page.html',
  styleUrls: ['./swiper-pages.page.scss'],
})
export class SwiperPagesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  onSubmit()
  {
    localStorage.setItem("intro" , "true")
    this.router.navigate(['/login']);
  }

}
