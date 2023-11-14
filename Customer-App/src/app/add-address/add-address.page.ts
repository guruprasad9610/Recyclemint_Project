import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit
{
  userAddress: any = {}
  session: any;
  loginDetails:any;
  constructor(private router: Router , private http:HttpClient) { }

  ngOnInit() { }

  onAddress()
  {
    this.loginDetails = localStorage.getItem("loginDetails")
    this.loginDetails = JSON.parse(this.loginDetails)

    console.log(this.loginDetails);
    if(this.loginDetails.message == "Saved successfully")
    {
      this.userAddress.customer_Id = this.loginDetails.customerDetails._id
    }
    else if(this.loginDetails.message == "LoggedIn successfully")
    {
      this.userAddress.customer_Id = this.loginDetails._id
    }


    this.userAddress.latitude = "234.75"
    this.userAddress.longitude = "876.55"

    console.log(this.userAddress);

    this.http.post("http://localhost:6001/api/address/create" , this.userAddress).subscribe((response:any)=>{
      console.log(response);

      if(response.message == "saved successfully")
      {
        this.router.navigate(['/tabs']);
      }


    })
    // localStorage.setItem('session' ,JSON.stringify(userAddress));

  }

  showAddress()
  {


    let userAddress: any = localStorage.getItem('session');
    this.session = JSON.parse(userAddress);
    this.userAddress.patchValue();

  }

  onSkip()
  {
    this.router.navigate(['/tabs']);
  }

}

// handleChange(e: any)
// {
//   console.log('ionChange fired with value: ' + e.detail.value);
// }

// handleCancel()
// {
//   console.log('ionCancel fired');
// }

// handleDismiss()
// {
//   console.log('ionDismiss fired');
// }
