import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  pickupDetails:any

  constructor(private router: Router , private http:HttpClient) { }

  ngOnInit() {

   }

   ionViewWillEnter(){
    this.http.get(environment.apiurl +"orders/historder/651568a42957ad172df9c135").subscribe((response:any)=>{
      console.log(response.data);

      this.pickupDetails = response.data

     })
   }

  onNotice()
  {
    this.router.navigate(['/notifications']);
  }

  onDetails(data:object)
  {
    let x = JSON.stringify(data)
    this.router.navigate(['/tabs/tab4/order-details'] , {queryParams: {x}});
  }
}
