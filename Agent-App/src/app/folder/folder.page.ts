import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public screen !: Number;
  public rootScreen !: string;

  constructor(private router: Router, public menuCtrl: MenuController) {}

  ngOnInit() {
    this.rootScreen = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if(this.rootScreen == 'Dashboard')
    {
      this.screen=1
    }
    else if(this.rootScreen == 'Scrap Rates')
    {
      this.screen = 2
    }
    else if(this.rootScreen == 'Order History')
    {
      this.screen = 3
    }
    else if(this.rootScreen == 'Profile')
    {
      this.screen = 4
    }
    else if(this.rootScreen == 'Privacy & Security')
    {
      this.screen = 5
    }
    else if(this.rootScreen == 'About Application')
    {
      this.screen = 6
    }
    else if(this.rootScreen == 'Help & Support')
    {
      this.screen = 7
    }

    // console.log(screen)
    this.folder = this.rootScreen;
  }

  onNotice()
  {
    this.router.navigate(['/notifications']);
  }

  ionViewWillEnter()
  {
    this.menuCtrl.enable(true);
  }

}
