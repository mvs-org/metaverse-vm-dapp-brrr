import { Injectable } from '@angular/core'
import { BehaviorSubject, interval, } from 'rxjs'
import { MetaversevmService } from './metaversevm.service'
const abi = require('../../assets/brrr.abi.json')

@Injectable({
  providedIn: 'root'
})
export class BrrrService {

  decimals = 2
  totalSupply$ = new BehaviorSubject<number | undefined>(undefined)
  balance$ = new BehaviorSubject<number | undefined>(undefined)
  contractId = '0x03d7BD04B6fd597AeFd6FD7A5bbA645430F907D8'

  constructor(private metaversevmService: MetaversevmService) {
    interval(2000).subscribe(() => this.updateValue())
  }

  private async updateValue() {
    try {
      const contract = this.metaversevmService.getContract(
        abi,
        this.contractId,
      )
      const totalSupply = await contract.methods.totalSupply().call()
      if (totalSupply !== this.totalSupply$.value) {
        this.totalSupply$.next(totalSupply/10**this.decimals)
        const balance = await contract.methods.balanceOf(this.metaversevmService.selectedAccount$.value).call()
        if (balance !== this.balance$.value) {
          this.balance$.next(balance/10**this.decimals)
        }
      }
    } catch (error) { }
  }

  print() {
    const fromAddress = this.metaversevmService.selectedAccount$.value
    console.log({fromAddress})
    const contract = this.metaversevmService.getContract(
      abi,
      this.contractId,
    )
    return contract.methods.print()
      .send({
        from: fromAddress,
      })
  }

}
