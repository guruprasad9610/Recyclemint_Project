import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate

{
  constructor (private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean>
  {
    if (this.authService.loggedIn())
    {

      return true;

    }
    else if(localStorage.getItem("intro"))
    {
      this.router.navigate(['/login']);
      return false;
    }
    else {
      this.router.navigate(['/intro']);
      return false;
    }
  }


}
