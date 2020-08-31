import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AppEventDispatcher } from '../../AppEventDispatcher';
import { EventTypes } from '../../eventTypes';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(250)),
    ]),
  ]
})
export class PreloaderComponent implements OnInit {

  @Input() hide: boolean;
  comp: string;
  time: number;
  show: boolean;
  constructor() {
    this.show = false;
  }

  ngOnInit() {
    AppEventDispatcher.listen(EventTypes.PRELOADER, (event) => {
      if (event === 'show') {
        this.show = true;
      } else if (event === 'hide') {
        this.show = false;
      }
    });
  }

}
