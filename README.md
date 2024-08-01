# Event Listener Decorators Library

## Introduction

The Event Listener Decorators library provides a TypeScript-based solution for managing events using decorators. It includes two primary decorators: `EventDecorator` for methods and `ListenerDecorator` for classes. This library allows you to subscribe event handlers through a custom subscription function.

## Installation

To get started with the library, follow these steps:

1. **Install the Library**:
   ```bash
   npm install event-listener-decorators
   ```

2. **Configure TypeScript**:
   Ensure your `tsconfig.json` file is configured to enable decorators. Here is an example configuration:

   ```json
   {
     "compilerOptions": {
      ...
      "experimentalDecorators": true,
      ...
     },
   }
   ```

   In the `compilerOptions`, make sure to enable `experimentalDecorators`. The configuration above shows how to set this option. 

## Usage

### Setting Up Decorators

To use the decorators, you first need to configure the event decorators. Utilize the `setupEventDecorators` function to create the `ListenerDecorator` and `EventDecorator` functions.

```typescript
import { setupEventDecorators } from 'event-listener-decorators'

type WindowHandler = ( event:Event ) => void

// Suscribing generic event
const [ WindowListener, WindowEvent ] = setupEventDecorators( ( type:string, handler:WindowHandler ) => {
  window.addEventListener( type, handler )
} )
```

### Example Usage

Here is a complete example demonstrating how to apply the decorators to a class:

```typescript
// Setting the class as a listeners collection
@WindowListener
class WindowManager {

  @WindowEvent( 'load' )
  public onLoad() {
    console.log( 'Executing when DOM is loaded' )
  }

  @WindowEvent( 'resize' )
  public onResize() {
    console.log( 'Resizing browser window' )
  }

}

// Instantiate the class to activate the listeners
new WindowManager()
```

### Description of Decorators

- **`KeyEvent`**: Decorator applied to methods to define the key event type and associate the handler with the corresponding event.
- **`KeyListener`**: Decorator applied to a class to subscribe all event handlers defined with `KeyEvent`.