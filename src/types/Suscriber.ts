import { Handler } from './Listener'

export type Suscriber<T extends unknown[], U extends string, K> =
  ( type:U, handler:Handler<T,K> ) => void
