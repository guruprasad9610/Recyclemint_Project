import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  onSend()
  {
    this.router.navigate(['/change-password']);
  }

}
