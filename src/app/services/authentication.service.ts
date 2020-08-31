import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(username: string, password: string): boolean {
    const token = btoa(`${username}:${password}`);

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
