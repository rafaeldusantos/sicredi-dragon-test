import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const accessToken = window.localStorage.getItem('userLogged');
      if (state.url.includes('login') && accessToken) {
        this.router.navigate(['']);
        return false;
      }else if (state.url.includes('login') && !accessToken) {
          return true;
      } else if (accessToken) {
          return true;
      } else {
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
    }
}
