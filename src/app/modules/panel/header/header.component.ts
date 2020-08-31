import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  open: boolean;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.open = false;
  }

  ngOnInit() {
  }

  openDropdown() {
    this.open = !this.open;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
