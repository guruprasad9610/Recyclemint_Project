import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

export const INTRO_KEY = 'recyclemint';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  mobileNumber: string = ''
  customerDetails: object = {};
  submitBtn: boolean = false;

  verifyOTP: any = {}
  config = {
    length: 4,
    allowNumbersOnly: true,
    inputClass: 'otp-input-style',
  };

  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private route: ActivatedRoute, private toastController: ToastController) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);

      let x = params.mobile
      console.log(x);

      x = JSON.parse(x)
      this.mobileNumber = x.phone

      console.log(this.mobileNumber);

    });

    if (this.authService.loggedIn()) {
      this.router.navigate(['/']);
    }
    // else
    // {
    //   this.router.navigate(['/login']);
    // }
  }

  onLogin() {
    console.log(this.verifyOTP);


    this.customerDetails =
    {
      "mobile": this.mobileNumber,
      "OTP": this.verifyOTP
    }

    console.log(this.customerDetails);




    this.http.post(environment.apiurl + "customers/verifyOTP", this.customerDetails).subscribe((response: any) => {
      console.log(response);

      if (response.message == "Invalid OTP") {
        this.presentToast("Invalid OTP")
      }
      else if (response.message == "OTP verified") {
        this.presentToast("OTP verified")
        localStorage.setItem(INTRO_KEY, 'true');

        if (sessionStorage.getItem("iscomplete") == "true") {
          this.router.navigate(['/tabs'])
        }
        else {
          this.router.navigate(['/complete-profile']);

        }

      }

    })

  }

  onOtpChange(event: string) {
    if (event.length == 4) {
      console.log(event);
      this.verifyOTP = event
      this.submitBtn = true;
    }
    else {
      this.submitBtn = false;
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'danger',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

}
