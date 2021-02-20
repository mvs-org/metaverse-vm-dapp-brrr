import { Component } from '@angular/core';
import { MetaversevmService } from './services/metaversevm.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'metaversevm-dapp-brrr';

  constructor(public metaversevmService: MetaversevmService){
  }
}
