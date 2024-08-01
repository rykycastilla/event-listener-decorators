import { buildEventDecorator } from './build_event_decorator'
import { buildListenerDecorator } from './build_listener_decorator'
import { EventDecorator, ListenerDecorator } from '../types/decorators'
import { Suscriber } from '../types/Suscriber'

/**
 * Sets up the event decorators by creating and returning the `ListenerDecorator`
 * and `EventDecorator` functions. The `ListenerDecorator` will use the provided
 * subscriber function to subscribe event handlers in the class, while the `EventDecorator`
 * will add event metadata (method name & event type to execute) to the class.
 *
 * @template T - The type of arguments passed to the event handlers.
 * @template U - The type of event names.
 * @template K - The return type of the event handlers.
 * @param {Suscriber<T, U, K>} suscriber - A callback function to subscribe event handlers.
 * @returns {[ListenerDecorator, EventDecorator<T, U, K>]} - An array containing the `ListenerDecorator`
 * and `EventDecorator` functions.
 */
export function setupEventDecorators<T extends unknown[], U extends string, K>( suscriber:Suscriber<T,U,K> ): [ ListenerDecorator, EventDecorator<T,U,K> ] {
  const eventsId = Symbol()
  const listenerDecorator: ListenerDecorator = buildListenerDecorator( eventsId, suscriber )
  const eventDecorator: EventDecorator<T,U,K> = buildEventDecorator( eventsId )
  return [ listenerDecorator, eventDecorator ]
}
