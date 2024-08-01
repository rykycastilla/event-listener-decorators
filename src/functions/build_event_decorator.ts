import { EventDecorator, HandlerDescriptor } from '../types/decorators'
import { EventRef, EventStack } from '../types/Listener'

/**
 * Creates a decorator function for methods that adds event metadata to a class.
 * The metadata includes the event type and the handler method name, which
 * will be used by the `ListenerDecorator` to subscribe the handler.
 *
 * @template T - The type of arguments passed to the event handlers.
 * @template U - The type of event names.
 * @template K - The return type of the event handlers.
 * @param {symbol} eventsId - A symbol used to identify the event metadata.
 * @returns {EventDecorator<T, U, K>} - The decorator function for methods.
 */
export function buildEventDecorator<T extends unknown[], U extends string, K>( eventsId:symbol ): EventDecorator<T,U,K> {
  return ( type:U ) => {
    // eslint-disable-next-line
    return ( target:unknown, propertyKey:string, descriptor:HandlerDescriptor<T,K> ) => {
      const stack = target as EventStack<U>
      stack[ eventsId ] = stack[ eventsId ] ?? []
      const event: EventRef<U> = {
        type,
        handlerName: propertyKey,
      }
      stack[ eventsId ]!.push( event )
    }
  }
}
