import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { BrowserModule } from '@angular/platform-browser';

import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { PreloaderComponent } from './components/preloader/preloader.component';

@NgModule({
  declarations: [
    ModalDialogComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    ModalDialogComponent,
    PreloaderComponent
  ]
})
export class SharedModule { }
