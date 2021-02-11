import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CounterService } from '../../services/counter.service'
import { MetaversevmService } from '../../services/metaversevm.service'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  animateIndicator = false

  constructor(
    public counterService: CounterService,
    public metaversevmService: MetaversevmService,
    private snackbar: MatSnackBar,
  ) {
    this.counterService.value$.subscribe((value) => {
      if (value) {
        this.animateIndicator = true
        setInterval(() => {
          this.animateIndicator = false
        }, 2000)
      }
    })
  }

  ngOnInit(): void {
  }

  inc() {
    this.counterService.increment()
      .on('sending', () => {
        this.snackbar.open(
          `Transaction created. Please confirm on it on your browser extension.`,
          'Info',
          {
            duration: 2000,
          }
        )
        console.log('sending transaction')
      })
      .on('sent', () => {
        console.log('sent transaction')
      })
      .on('transactionHash', (hash: string) => {
        console.log('transaction hash:', hash)
      })

      .on('receipt', (receipt: any) => {
        this.snackbar.open(
          `Transaction confirmed`,
          'Success'
        )
        console.log('transaction receipt', receipt)
      })
  }
  deploy() {
    this.counterService.deploy('0xD78ceA77cb890A5e6Eff2B4C31f24e61C27f9Baa')
  }

}
