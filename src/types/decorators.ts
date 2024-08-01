import { Handler } from './Listener'

export interface HandlerDescriptor<T extends unknown[], U> extends PropertyDescriptor {
  value?: Handler<T,U>
}

type EventPlainDecorator<T extends unknown[], U> =
  ( target:unknown, propertyKey:string, descriptor:HandlerDescriptor<T,U> ) => void

export interface EventDecorator<T extends unknown[], U extends string, K> {
  ( type:U ): EventPlainDecorator<T,K>
}

// eslint-disable-next-line
export type ListenerDecorator = ( target:unknown ) => any