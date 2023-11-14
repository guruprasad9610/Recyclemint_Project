import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INTRO_KEY } from '../login/login.page';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }

  loggedIn()
  {
    return !!localStorage.getItem(INTRO_KEY);
  }
}
