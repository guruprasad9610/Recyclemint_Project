import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router:Router) {}


  gottoTab(data:any)
  {
    if(data == 'tab4')
    {
      this.router.navigate(['/tabs/tab4'])
    }
    else if(data == 'tab1')
    {
      this.router.navigate(['/tabs/tab1'])
    }
    else if(data == 'tab2')
    {
      this.router.navigate(['/tabs/tab2'])
    }
    else if(data == 'tab3')
    {
      this.router.navigate(['/tabs/tab3'])
    }
    else if(data == 'tab5')
    {
      this.router.navigate(['/tabs/tab5'])
    }

  }

}
