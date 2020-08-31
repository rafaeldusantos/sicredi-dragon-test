import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { SharedModule } from '../../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { ListDragonComponent } from './dragon/list/listDragon.component';
import { CreateDragonComponent } from './dragon/create/createDragon.component';
import { PanelComponent } from './panel.component';


@NgModule({
  declarations: [
    ListDragonComponent,
    CreateDragonComponent,
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
          distance: 25
        },
        vertical: {
          position: 'top',
          distance: 100,
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
