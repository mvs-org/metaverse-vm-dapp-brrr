import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CounterService } from '../../services/counter.service'
import { MetaversevmService, TransactionReceipt } from '../../services/metaversevm.service'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  animateIndicator = false
  pendingTransactions = 0

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
        }, 1000)
      }
    })
  }

  ngOnInit(): void {
  }

  inc() {
    this.counterService.increment()
      .on('sent', () => {
        this.snackbar.open(
          `Transaction created. Please confirm on it on your browser extension.`,
          'Info',
          {
            duration: 2000,
          }
        )
        console.log('new transaction created')
      })
      .on('transactionHash', (txid: string) => {
        console.log('transaction hash:', txid)
        this.pendingTransactions++
      })
      .on('receipt', (receipt: any) => {
        console.log('transaction receipt', receipt)
      })
      .then((transaction: TransactionReceipt) => {
        this.snackbar.open(
          `Transaction confirmed at block ${transaction.blockNumber}`,
          'Success'
        )
        this.pendingTransactions--
      })
      .catch((error: { code: number, message: string }) => {
        switch (error.code) {
          case 4001:
            console.error('transaction rejected by client')
            break
          default:
            if (this.pendingTransactions) {
              this.pendingTransactions--
            }
            console.log('transaction error', error.message)
        }
      })
  }

  deploy() {
    this.counterService.deploy('0xD78ceA77cb890A5e6Eff2B4C31f24e61C27f9Baa')
  }

}
