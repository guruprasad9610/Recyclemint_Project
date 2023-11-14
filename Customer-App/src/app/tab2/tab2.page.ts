import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  imgBaseURL = environment.apiurl_base
  Items: any = [];
  constructor(private router: Router,
    private authService: AuthService) {}

    ngOnInit()
    {
      this.loadAllItems();
    }

    loadAllItems()
    {
      this.authService.itemService().subscribe(res=>{
        console.log(res);
        this.Items = res;
      })
    }

  onNotice()
  {
    this.router.navigate(['/notifications']);
  }

}
