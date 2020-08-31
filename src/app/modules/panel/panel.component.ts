import { Component, OnInit } from '@angular/core';

import { AppEventDispatcher } from 'src/app/shared/AppEventDispatcher';
import { EventTypes } from 'src/app/shared/eventTypes';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {}

}
