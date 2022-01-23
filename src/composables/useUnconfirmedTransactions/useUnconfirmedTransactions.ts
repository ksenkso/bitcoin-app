import { markRaw, ref } from 'vue'
import { useWebSocket } from '@/composables/useWebSocket/useWebSocket'
import {
  BTCMessage,
  TransactionRow,
  UnconfirmedTransaction,
  UnconfirmedTransactionsHook,
} from '@/composables/useUnconfirmedTransactions/types'

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
