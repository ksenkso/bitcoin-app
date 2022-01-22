import { Ref, ref } from 'vue'

export type WebSocketOptions = ConstructorParameters<typeof WebSocket>

export type WebSocketHook = {
  ready: Ref<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send: (data: any) => void;
  onOpen: (fn: (event: Event) => void) => void;
  onClose: (fn: (event: CloseEvent) => void) => void;
  onError: (fn: (event: Event) => void) => void;
  onMessage: (fn: (event: MessageEvent) => void) => void;
}

export function useWebSocket (...options: WebSocketOptions): WebSocketHook {
  const ready = ref<boolean>(false)

  const socket = new WebSocket(...options)

  socket.addEventListener('open', () => {
    ready.value = true
  })

  socket.addEventListener('close', () => {
    ready.value = false
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const send = (data: any) => {
    socket.send(JSON.stringify(data))
  }

  const onOpen = (fn: (event: Event) => void) => {
    socket.addEventListener('open', fn)
  }

  const onClose = (fn: (event: CloseEvent) => void) => {
    socket.addEventListener('close', fn)
  }

  const onError = (fn: (event: Event) => void) => {
    socket.addEventListener('error', fn)
  }

  const onMessage = (fn: (event: MessageEvent) => void) => {
    socket.addEventListener('message', fn)
  }

  return {
    ready,
    send,
    onOpen,
    onClose,
    onError,
    onMessage,
  }
}
