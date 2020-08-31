import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotifierModule } from "angular-notifier";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { SharedModule } from '../../shared/shared.module'

import { HeaderComponent } from './header/header.component';
import { ListComponent } from './dragon/list/list.component';
import { CreateComponent } from './dragon/create/create.component';
import { PanelComponent } from './panel.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    HeaderComponent,
    PanelComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig({
			position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 300,
          gap: 10
        }
      }
    }),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    }),
  ],
  exports: [ HeaderComponent ]
})
export class PanelModule { }
