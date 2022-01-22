import { markRaw, Ref, ref } from 'vue'
import { useWebSocket, WebSocketHook } from '@/composables/useWebSocket'

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
  messages: Ref<TransactionRow[]>;
  listening: Ref<boolean>;
  error: Ref<Event | undefined>,
  start: () => void;
  stop: () => void;
  clear: () => void;
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

const isUnconfirmedTransaction = (message: BTCMessage): message is UnconfirmedTransaction => message.x === 'utx'

function extractFields (transaction: UnconfirmedTransaction): TransactionRow {
  return {
    hash: transaction.x.hash,
    from: transaction.x.inputs.map(input => input.prev_out.addr),
    to: transaction.x.out.map(out => out.addr),
    value: transaction.x.inputs.reduce((acc, input) => {
      return acc + intToFloatValue(input.prev_out.value)
    }, 0),
  }
}

function intToFloatValue (value: number) {
  const str = String(value).padStart(8, '0')
  return Number(`${str.substring(0, str.length - 8)}.${str.substring(str.length - 8)}`)
}

const PING_INTERVAL = 3000

export function useUnconfirmedTransactions (): UnconfirmedTransactionsHook {
  const websocket = useWebSocket('wss://ws.blockchain.info/inv')

  const messages = ref<TransactionRow[]>([])
  const error = ref<Event>()
  const listening = ref<boolean>(false)

  const keepAlive = () => {
    const interval = setInterval(() => {
      websocket.send({
        op: 'ping',
      })
    }, PING_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }

  const start = () => {
    if (websocket.ready.value) {
      websocket.send({
        op: 'unconfirmed_sub',
      })
      listening.value = true
    }
  }

  const stop = () => {
    if (websocket.ready.value) {
      websocket.send({
        op: 'unconfirmed_unsub',
      })
      listening.value = false
    }
  }

  const clear = () => {
    messages.value = []
  }

  websocket.onMessage((event: MessageEvent) => {
    const message = JSON.parse(event.data) as BTCMessage

    if (isUnconfirmedTransaction(message)) {
      messages.value.push(markRaw(extractFields(message)))
    }
  })

  websocket.onError((event: Event) => {
    error.value = event
  })

  return {
    messages,
    listening,
    error,
    start,
    stop,
    clear,
    keepAlive,
    websocket,
  }
}
