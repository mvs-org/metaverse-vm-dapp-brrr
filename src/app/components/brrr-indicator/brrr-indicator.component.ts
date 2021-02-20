import { SimpleChanges } from '@angular/core'
import { Component, Input, } from '@angular/core'

@Component({
  selector: 'app-brrr-indicator',
  templateUrl: './brrr-indicator.component.html',
  styleUrls: ['./brrr-indicator.component.scss']
})
export class BrrrIndicatorComponent {

  @Input() supply: number = 0

  video = document.getElementById("video1") as HTMLMediaElement

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.supply.previousValue!==undefined) {
      this.play()
    }
  }

  play() {
    this.video = document.getElementById("video1") as HTMLMediaElement
    this.video.play()
  }

}
