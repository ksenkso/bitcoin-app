import { ref } from 'vue'
import { useWebSocket } from '@/composables/useWebSocket/useWebSocket'
import {
  BTCMessage,
  TransactionHandler,
  UnconfirmedTransaction,
  UnconfirmedTransactionsHook,
} from '@/composables/useUnconfirmedTransactions/types'

const isUnconfirmedTransaction = (message: BTCMessage): message is UnconfirmedTransaction => message.op === 'utx'

const PING_INTERVAL = 3000

export function useUnconfirmedTransactions (transactionHandler?: TransactionHandler): UnconfirmedTransactionsHook {
  const websocket = useWebSocket('wss://ws.blockchain.info/inv')

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
      websocket.addEventListener('message', messageHandler)
    }
  }

  const stop = () => {
    if (websocket.ready.value) {
      websocket.send({
        op: 'unconfirmed_unsub',
      })
      listening.value = false
      websocket.removeEventListener('message', messageHandler)
    }
  }

  function messageHandler (event: MessageEvent) {
    const message = JSON.parse(event.data) as BTCMessage

    if (isUnconfirmedTransaction(message)) {
      if (transactionHandler) {
        transactionHandler(message)
      }
    }
  }

  websocket.onError((event: Event) => {
    error.value = event
  })

  return {
    listening,
    error,
    start,
    stop,
    keepAlive,
    websocket,
  }
}
