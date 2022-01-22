import { Ref, ref } from 'vue'
import { log } from '@/lib/logger'
import { AnyFunction } from '@/types'

export type WebSocketOptions = ConstructorParameters<typeof WebSocket>
type WebSocketEvents = keyof WebSocketEventMap

export type WebSocketHook = {
  ready: Ref<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send: (data: any) => void;
  close: () => void;
  reconnect: () => void;
  onOpen: (fn: (event: Event) => void) => void;
  onClose: (fn: (event: CloseEvent) => void) => void;
  onError: (fn: (event: Event) => void) => void;
  onMessage: (fn: (event: MessageEvent) => void) => void;
  addEventListener<T extends WebSocketEvents = WebSocketEvents> (event: T, fn: (e: WebSocketEventMap[T]) => void): void;
  removeEventListener<T extends WebSocketEvents = WebSocketEvents> (event: T, fn: (e: WebSocketEventMap[T]) => void): void;
}

export class RetryError extends Error {
  constructor (maxRetries: number) {
    super(`Maximum number of retries exceeded: ${maxRetries}`)
  }
}

export function useWebSocket (...options: WebSocketOptions): WebSocketHook {
  let retryCount = 0
  const ready = ref<boolean>(false)
  const listeners = new Map<keyof WebSocketEventMap, AnyFunction[]>([
    ['open', []],
    ['close', []],
    ['message', []],
    ['error', []],
  ])

  const addEventListener = <T extends WebSocketEvents = WebSocketEvents> (event: T, fn: (event: WebSocketEventMap[T]) => void) => {
    socket.addEventListener(event, fn)
    const eventListeners = listeners.get(event)
    if (eventListeners) {
      eventListeners.push(fn)
    }
  }

  const removeEventListener = <T extends WebSocketEvents = WebSocketEvents> (event: T, fn: (event: WebSocketEventMap[T]) => void) => {
    socket.removeEventListener(event, fn)
    const eventListeners = listeners.get(event)
    if (eventListeners) {
      const index = eventListeners.indexOf(fn)
      if (index !== -1) {
        eventListeners.splice(index, 1)
      }
    }
  }

  let socket = new WebSocket(...options)

  const reconnect = (retries = 3): void => {
    if (retryCount === retries) {
      throw new RetryError(retries)
    }

    retryCount++

    socket = new WebSocket(...options)
    for (const [event, handlers] of listeners.entries()) {
      handlers.forEach((handler) => socket.addEventListener(event, handler))
    }
  }

  const close = () => {
    listeners.clear()
    listeners.set('open', [])
    listeners.set('close', [])
    listeners.set('message', [])
    listeners.set('error', [])
    socket.close()
  }

  addEventListener('open', () => {
    ready.value = true
  })

  addEventListener('close', () => {
    ready.value = false
  })

  addEventListener('error', (event) => {
    if (socket.readyState !== socket.OPEN) {
      ready.value = false
    }

    log('error', 'socket', {
      socket,
      event,
      options,
    })
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const send = (data: any) => {
    socket.send(JSON.stringify(data))
  }

  const onOpen = (fn: (event: Event) => void) => {
    addEventListener('open', fn)
  }

  const onClose = (fn: (event: CloseEvent) => void) => {
    addEventListener('close', fn)
  }

  const onError = (fn: (event: Event) => void) => {
    addEventListener('error', fn)
  }

  const onMessage = (fn: (event: MessageEvent) => void) => {
    addEventListener('message', fn)
  }

  return {
    ready,
    send,
    close,
    reconnect,
    onOpen,
    onClose,
    onError,
    onMessage,
    addEventListener,
    removeEventListener,
  }
}
