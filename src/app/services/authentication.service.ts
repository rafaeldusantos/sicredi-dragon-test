import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(username: string, password: string) : Boolean {
    const token = btoa(`${username}:${password}`);
    console.log(token)

    if (token === environment.accessToken) {
      localStorage.setItem('userLogged', token);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
  }
}
