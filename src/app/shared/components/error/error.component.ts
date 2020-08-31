import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AppEventDispatcher } from '../../AppEventDispatcher';
import { EventTypes } from '../../eventTypes';

import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() hide: boolean;
  show: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    ) {
      this.show = false;
    }

  ngOnInit() {
    AppEventDispatcher.listen(EventTypes.ERROR, (event) => {
      if (event === 'show') {
        this.show = true;
      } else if (event === 'hide') {
        this.show = false;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
