import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MetaversevmService } from '../../services/metaversevm.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  selectedAccount: string | undefined

  constructor(
    public metaversevmService: MetaversevmService,
    private snackbar: MatSnackBar,
  ) {
    this.metaversevmService.accounts$.subscribe(accounts => {
      this.selectedAccount = accounts[0]
    })
  }

  async connect() {
    try {
      await this.metaversevmService.requestAccounts()
    } catch (error) {
      if (error.message === 'ERR_METAVERSEVM_NOT_AVAILABLE') {
        this.snackbar.open('MetaverseVM Extension not available', 'Error', {})
      }
    }
  }

  ngOnInit(): void {
  }

}
