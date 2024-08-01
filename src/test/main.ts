import { setupEventDecorators } from '../index'

// Type aliases for handler and event type
type InputHandler = ( value:string ) => void
type InputEventType = 'add' | 'delete' | 'show' | 'default'

// Configure decorators with the subscription function directly as a callback
const [ InputListener, InputEvent ] = setupEventDecorators( ( type:InputEventType, handler:InputHandler ) => {
  process.stdin.on( 'data', ( data ) => {
    const input = data.toString().trim()
    const [eventType, ...valueParts] = input.split( ':' )
    const value = valueParts.join( ':' ).trim()
    if ( eventType!.trim() === type ) { handler( value ) }
  } )
} )

// Apply decorators to an example class
@InputListener
class InputManager {

  private items: string[] = []

  constructor() {
    console.log( 'Ready to receive instructions\n' )
  }

  @InputEvent( 'add' )
  onAdd( value:string ) {
    this.items.push( value )
    console.log( `Added: ${ value }\n` )
  }

  @InputEvent( 'delete' )
  onDelete( value:string ) {
    this.items = this.items.filter( ( item:string ) => item !== value )
    console.log( `Deleted: ${ value }\n` )
  }

  @InputEvent( 'show' )
  onShow() {
    console.log( 'Items:', this.items.join( ', ' ), '\n' )
  }

  @InputEvent( 'default' )
  onDefault() {
    console.log( 'Not a valid request\n' )
  }

}

// Create an instance of the class to test
// eslint-disable-next-line
const input = new InputManager()
