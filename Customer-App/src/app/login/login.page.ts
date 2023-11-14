import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userMobileNum: any = { }
  constructor(private router: Router , private http:HttpClient , ) { }

  ngOnInit() { }

  onSubmit()
  {

    this.http.post(environment.apiurl + "customers/login" , {mobile:this.userMobileNum.phone}).subscribe((response:any)=>{
      console.log(response);
      console.log(this.userMobileNum);

      let x = JSON.stringify(this.userMobileNum)
      localStorage.setItem("mobile" , this.userMobileNum.phone)
      localStorage.setItem("loginDetails" , JSON.stringify(response))

      // let iscomplete = JSON.stringify(response.isComplete)

      console.log(response.isComplete);

      sessionStorage.setItem("iscomplete" , response.isComplete)

      this.router.navigate(['/otp'] , {queryParams: {"mobile":x}});
    })

  }

}
