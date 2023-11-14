import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { INTRO_KEY } from '../login/login.page';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean>
  {
    if (this.authService.loggedIn())
    {
      this.router.navigate(['/folder/Dashboard']);
      return true;
    }
    else if(localStorage.getItem(INTRO_KEY))
    {
      this.router.navigate(['/login']);
      return false;
    }
    else {
      this.router.navigate(['/intro-page']);
      return false;
    }
  }

}
