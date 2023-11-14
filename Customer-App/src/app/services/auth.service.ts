import { Injectable } from '@angular/core';
import { INTRO_KEY } from '../otp/otp.page';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }

  itemService()
  {
    return this.http.get<any>(environment.apiurl+`items/`);
  }

  loggedIn()
  {
    return !!localStorage.getItem(INTRO_KEY);
  }



}
