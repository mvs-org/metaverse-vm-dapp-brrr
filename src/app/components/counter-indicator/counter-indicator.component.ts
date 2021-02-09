import { Component, Input, } from '@angular/core';

@Component({
  selector: 'app-counter-indicator',
  templateUrl: './counter-indicator.component.html',
  styleUrls: ['./counter-indicator.component.scss']
})
export class CounterIndicatorComponent {

  @Input('jumping')
  jumping = false

  constructor() { }

}
