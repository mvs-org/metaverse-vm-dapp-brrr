import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BrrrService } from '../../services/brrr.service'
import { MetaversevmService, TransactionReceipt } from '../../services/metaversevm.service'

@Component({
  selector: 'app-brrr',
  templateUrl: './brrr.component.html',
  styleUrls: ['./brrr.component.scss']
})
export class BrrrComponent implements OnInit {

  animateIndicator = false
  pendingTransactions = 0

  constructor(
    public brrrService: BrrrService,
    public metaversevmService: MetaversevmService,
    private snackbar: MatSnackBar,
  ) {
    this.brrrService.totalSupply$.subscribe((totalSupply) => {
      if (totalSupply) {
        this.animateIndicator = true
        setInterval(() => {
          this.animateIndicator = false
        }, 1000)
      }
    })
  }

  ngOnInit(): void {
  }

  print() {
    this.brrrService.print()
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

}
