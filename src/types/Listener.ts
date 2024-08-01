export type Handler<T extends unknown[], U> = ( ...args:T ) => U

export interface EventRef<T extends string> {
  type: T
  handlerName: string
}

interface HandlersIndex<T extends unknown[], U> {
  [ handler:string ]: Handler<T,U>
}

export interface EventStack<T extends string> {
  [ eventsId:symbol ]: EventRef<T>[]
}

export type Listener<T extends unknown[], U extends string, K> =
  HandlersIndex<T,K> & EventStack<U>

export interface ListenerConstructor<T extends unknown[], U extends string, K> {
  new ( ...args:unknown[] ): Listener<T,U,K>
}
