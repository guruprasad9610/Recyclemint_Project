import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit
{
  userProfile: any = {}
  constructor(private router: Router , private http : HttpClient) {
    if(localStorage.getItem("profile"))
    {
      this.router.navigate(['/tabs'])
    }
  }

  ngOnInit() {

   }

  saveData()
  {
    this.userProfile.mobile = localStorage.getItem("mobile")

    console.log(this.userProfile);


    this.http.put(environment.apiurl + "customers/updateProfile" , this.userProfile ,  { responseType: 'text' }).subscribe((response:any)=>{
      console.log(response);

      if(response == "update success")
      {
          localStorage.setItem("profile" , "true")
          this.router.navigate(['/add-address']);
      }

    })

    console.log(this.userProfile);

  }
}
