import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

import { AppEventDispatcher } from '../../../shared/AppEventDispatcher';
import { EventTypes } from '../../../shared/eventTypes';

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class LoginComponent implements OnInit {
  active: Boolean;
  loginForm: FormGroup;
  returnUrl: string;
  sendForm: Boolean;
  openError: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService
  ) { 
    this.active = false;
    this.sendForm = false;
    this.openError = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.active = true;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.sendForm = true;
    if (this.loginForm.invalid) {
        return;
    }
    AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'show');
    if (this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)) {
      setTimeout(() => {
        this.router.navigate([this.returnUrl]);
      }, 2000);
    } else {
      this.openError = !this.openError;
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
    }
  }

  focusInput() {
    this.active = true;
  }

 
}
