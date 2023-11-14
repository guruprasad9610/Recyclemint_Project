import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  public buffer = 0.06;
  public progress = 0;
  orderDetails: any;
  itemDetails:any = [];
  total:any = 0;
  address:any

  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);

      let x = JSON.parse(params.x)
      console.log(x);

      this.orderDetails = x;


    });
    this.http.get(environment.apiurl+"orders/indhistorder/65155e61132d526a4eb79d52").subscribe((response: any) => {
      console.log(response.data.result[0].item);
      console.log(response.data.result[0].itemDetails);

      let item = response.data.result[0]?.item;
      this.itemDetails = response.data.result[0]?.itemDetails;
      this.address = response.data

      console.log(this.address);



      this.itemDetails[0]?.forEach((element: any) => {
        let weight = item[0].find((x: any) => x.itemid == element._id)?.weight
        element['weight'] = weight


        this.total = this.total + (element.price * element.weight);

      });
      console.log(this.total);

    })

   if(this.orderDetails.status == 0)
   {
     this.progress = .16;
   }
   else if (this.orderDetails.status == 1)
   {
    this.progress = 0.16*2
   }
   else if (this.orderDetails.status == 2)
   {
    this.progress = 0.16*3
   }
   else if (this.orderDetails.status == 3)
   {
    this.progress = 0.16*4
   }
   else if (this.orderDetails.status == 4)
   {
    this.progress = 0.16*5
   }
   else if (this.orderDetails.status == 5)
   {
    this.progress = 0.16*6
   }


  }



}
