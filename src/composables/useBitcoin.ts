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

export type BTCTransaction = {
  op: string,
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

export type UnconfirmedBTCTransaction = {
  hash: string;
  from: string[];
  to: string[];
  value: number;
}

function extractFields (event: MessageEvent<string>): UnconfirmedBTCTransaction {
  const data = JSON.parse(event.data) as BTCTransaction

  return {
    hash: data.x.hash,
    from: data.x.inputs.map(input => input.prev_out.addr),
    to: data.x.out.map(out => out.addr),
    value: data.x.inputs.reduce((acc, input) => {
      return acc + intToFloatValue(input.prev_out.value)
    }, 0),
  }
}

function intToFloatValue (value: number) {
  const str = String(value).padStart(8, '0')
  return Number(`${str.substring(0, str.length - 8)}.${str.substring(str.length - 8)}`)
}

export type UnconfirmedTransactionsHook = {
  messages: Ref<UnconfirmedBTCTransaction[]>;
  listening: Ref<boolean>;
  error: Ref<Event | undefined>,
  start: () => void;
  stop: () => void;
  clear: () => void;
  websocket: WebSocketHook;
}

export function useUnconfirmedTransactions (): UnconfirmedTransactionsHook {
  const websocket = useWebSocket('wss://ws.blockchain.info/inv')

  const messages = ref<UnconfirmedBTCTransaction[]>([])
  const error = ref<Event>()
  const listening = ref<boolean>(false)

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
    messages.value.push(markRaw(extractFields(event)))
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
    websocket,
  }
}
