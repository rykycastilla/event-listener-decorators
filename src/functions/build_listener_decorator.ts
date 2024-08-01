import { EventRef, Listener, ListenerConstructor } from '../types/Listener'
import { ListenerDecorator } from '../types/decorators'
import { Suscriber } from '../types/Suscriber'

/**
 * Subscribes event handlers defined in a class to the provided subscriber function.
 * This function reads the event metadata from the class and uses the subscriber callback
 * to register each event handler.
 *
 * @template T - The type of arguments passed to the event handlers.
 * @template U - The type of event names.
 * @template K - The return type of the event handlers.
 * @param {Listener<T, U, K>} context - An instance of the class containing event metadata.
 * @param {Suscriber<T, U, K>} suscriber - A callback function used to subscribe event handlers.
 * @param {symbol} eventsId - A symbol used to identify the event metadata in the class.
 */
function listenEvents<T extends unknown[], U extends string, K>( context:Listener<T,U,K>, suscriber:Suscriber<T,U,K>, eventsId:symbol ) {
  const events: EventRef<U>[] = context[ eventsId ] ?? []
  for( const { handlerName, type } of events ) {
    const handler = ( ...args:T ): K => ( context[ handlerName ]! )( ...args )
    suscriber( type, handler )
  }
}

export function buildListenerDecorator<T extends unknown[], U extends string, K>( eventsId:symbol, suscriber:Suscriber<T,U,K> ): ListenerDecorator {
  // eslint-disable-next-line
  return ( target:unknown ): any => {
    const DefaultConstructor = target as ListenerConstructor<T,U,K>
    function ListenerConstructor( ...args:unknown[] ) {
      const context = new DefaultConstructor( ...args )
      listenEvents( context, suscriber, eventsId )
      return context
    }
    return ListenerConstructor
  }
}
