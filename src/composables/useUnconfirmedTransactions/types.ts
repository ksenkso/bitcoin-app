import { Ref } from 'vue'
import { WebSocketHook } from '@/composables/useWebSocket/types'

export type BTCTransactionOut = {
  spent: boolean,
  // eslint-disable-next-line camelcase
  tx_index: number,
  type: number,
  addr: string,
  value: number,
  n: number,
  script: string,
}

export type TransactionRow = {
  hash: string;
  from: string[];
  to: string[];
  value: number;
}

export type UnconfirmedTransactionsHook = {
  listening: Ref<boolean>;
  error: Ref<Event | undefined>,
  start: () => void;
  stop: () => void;
  keepAlive: () => () => void;
  websocket: WebSocketHook;
}

export interface BTCMessage {
  op: string;
  x: unknown;
}

export interface UnconfirmedTransaction extends BTCMessage {
  op: 'utx';
  x: {
    // eslint-disable-next-line camelcase
    lock_time: number,
    ver: number,
    size: number,
    inputs: [
      {
        sequence: number,
        // eslint-disable-next-line camelcase
        prev_out: BTCTransactionOut,
        script: string,
      }
    ],
    time: number,
    // eslint-disable-next-line camelcase
    tx_index: number,
    // eslint-disable-next-line camelcase
    vin_sz: number,
    hash: string,
    // eslint-disable-next-line camelcase
    vout_sz: number,
    // eslint-disable-next-line camelcase
    relayed_by: string,
    out: BTCTransactionOut[]
  }
}

export type TransactionHandler = (transaction: UnconfirmedTransaction) => void
