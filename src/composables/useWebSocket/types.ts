import { Ref } from 'vue'

export type WebSocketOptions = ConstructorParameters<typeof WebSocket>
export type WebSocketEvents = keyof WebSocketEventMap

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
