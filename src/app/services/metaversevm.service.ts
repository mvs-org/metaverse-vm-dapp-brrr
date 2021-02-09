import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Contract, } from 'web3-eth-contract'
import { map } from 'rxjs/operators'

declare let window: { metaversevm: any }

@Injectable({
  providedIn: 'root'
})
export class MetaversevmService {

  web3: Web3 | undefined

  accounts$ = new Subject<string[]>()
  ready$ = new BehaviorSubject<boolean>(false)

  connected$ = this.accounts$.pipe(map(accounts => accounts.length > 0))

  selectedAccount$ = new BehaviorSubject<string|undefined>(undefined)

  constructor() {
    this.init()
    this.connected$.subscribe(console.log)
    this.accounts$.subscribe((accounts)=>{
      this.selectedAccount$.next(accounts[0])
    })
  }

  async init() {
    if (window.metaversevm) {
      const provider = window.metaversevm
      provider.on('accountsChanged', (accounts: string[])=>{
        this.accounts$.next(accounts)
      })
      this.web3 = new Web3(provider)
      this.accounts$.next(await this.web3.eth.getAccounts())
    } else {
      throw Error('ERR_METAVERSEVM_NOT_AVAILABLE')
    }
  }

  async requestAccounts() {
    if(this.web3===undefined){
      await this.init()
    }
    if (this.web3) {
      await this.web3.eth.requestAccounts()
    }
  }

  getContract(abi: AbiItem | AbiItem[], contractId?: string, bytecode?: string): Contract {
    if (!this.web3) {
      throw Error('ERR_WEB3_UNAVAILABLE')
    }
    return new this.web3.eth.Contract(abi, contractId, { data: bytecode })
  }

  async deployContract(fromAddress: string, args: any[], abi: AbiItem | AbiItem[], bytecode: string, etpValue: number = 0) {
    if (!this.web3) {
      throw Error('ERR_WEB3_UNAVAILABLE')
    }
    const contract = new this.web3.eth.Contract(abi, '', { data: bytecode })
    const deployment = await contract.deploy({
      arguments: args,
      data: bytecode
    }).send({ from: fromAddress, value: etpValue })
    console.log({
      deployment
    })
    return deployment
  }


}
