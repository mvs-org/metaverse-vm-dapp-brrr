import { Injectable } from '@angular/core'
import { BehaviorSubject, interval, } from 'rxjs'
import { MetaversevmService } from './metaversevm.service'
const abi = require('../../assets/counter.abi.json')

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  value$ = new BehaviorSubject<number | undefined>(undefined)
  contractId = '0xdd943dd6cD425833a9B4935E88542684fFa9BA3E'

  constructor(private metaversevmService: MetaversevmService) {
    interval(2000).subscribe(() => this.updateValue())
  }

  private async updateValue() {
    console.log('update value')
    try {
      const contract = this.metaversevmService.getContract(
        abi,
        this.contractId,
      )
      const value = await contract.methods.val().call()
      if (value !== this.value$.value) {
        this.value$.next(value)
      }
    } catch (error) { }
  }

  increment() {
    const fromAddress = this.metaversevmService.selectedAccount$.value
    console.log({ fromAddress })
    const contract = this.metaversevmService.getContract(
      abi,
      this.contractId,
    )
    return contract.methods.inc()
      .send({
        from: fromAddress,
      })
  }


  deploy(fromAddress: string) {
    this.metaversevmService.deployContract(fromAddress, [0], abi, '0x608060405234801561001057600080fd5b506040516102563803806102568339818101604052602081101561003357600080fd5b81019080805190602001909291905050508060008190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506101ba8061009c6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063371303c0146100465780633c6bb4361461005057806360fe47b11461006e575b600080fd5b61004e61009c565b005b6100586100af565b6040518082815260200191505060405180910390f35b61009a6004803603602081101561008457600080fd5b81019080803590602001909291905050506100b8565b005b6000808154809291906001019190505550565b60008054905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461017b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b806000819055505056fea265627a7a72315820a39ec12f659930c2372109b86c611f3e2719c4f5b54cfc64528d00f3618f7f5464736f6c63430005100032')
  }

}
