import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Contract, } from 'web3-eth-contract'
import { map } from 'rxjs/operators'


export interface TransactionReceipt {
  blockHash: string
  blockNumber: number
  contractAddress: string | null
  cumulativeGasUsed: number
  from: string
  logsBloom: string
  gasUsed: number
  status: boolean
  to: string
  transactionHash: string
  transactionIndex: number
}

declare let window: { ethereum: any }

@Injectable({
  providedIn: 'root'
})
export class MetaversevmService {

  web3: Web3 | undefined

  accounts$ = new Subject<string[]>()
  ready$ = new BehaviorSubject<boolean>(false)

  connected$ = this.accounts$.pipe(map(accounts => accounts.length > 0))

  selectedAccount$ = new BehaviorSubject<string | undefined>(undefined)

  supportedNetwork = 23
  connectedToNetwork$ = new BehaviorSubject<boolean>(false)

  constructor() {
    this.init()
    this.accounts$.subscribe((accounts) => {
      this.selectedAccount$.next(accounts[0])
    })
  }

  async init() {
    if (window.ethereum) {
      const provider = window.ethereum
      provider.on('accountsChanged', (accounts: string[]) => {
        this.accounts$.next(accounts)
      })
      provider.on('networkChanged', (network: any) => {
          this.connectedToNetwork$.next(parseInt(network)===this.supportedNetwork)
      })
      this.web3 = new Web3(provider)

      this.connectedToNetwork$.next((await this.web3?.eth.getChainId())===this.supportedNetwork)
      this.accounts$.next(await this.web3.eth.getAccounts())
    } else {
      throw Error('ERR_METAVERSEVM_NOT_AVAILABLE')
    }
  }

  async requestAccounts() {
    if (this.web3 === undefined) {
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
