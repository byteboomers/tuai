# Tuai

> Asynchronous request–response iframe messaging

## About

The goal of Tuai is to facilitate asynchronous request–response iframe messaging.

### Sender:

The sender sends messages to the iframe.

```javascript
const response = await sender.send({ a: 5, b: 3 });
console.log("The sum of a and b is", response);
```

### Receiver

The receiver, inside the iframe, listens to incoming messages.

```javascript
receiver.addResponder(ctx => {
  return ctx.message.a + ctx.message.b;
});
```

## Installation

### NPM

```bash
npm install --save tuai
```

### CDN

```html
<script src="https://unpkg.com/tuai@latest"></script>
```

## Setup

### Sender

```javascript
import { Sender } from "tuai";
const sender = new Sender({
  querySelectors: ["#portal"],
  receiverOrigin: "https://receiver.fake"
});
```

_querySelectors_: array of selectors used to find the iframe of the receiver (delegated to [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector))

_receiverOrigin_: origin of the receiver

### Receiver

```javascript
import { Receiver } from "tuai";
const receiver = new Receiver();
```

## API

### Sender

#### sendMessage(message)

Sends a message (of any type) and returns a promise with the answer of the receiver.

```javascript
const response = await sender.send("Hello, World!");
console.log(response);
```

### Receiver

#### addResponder(responder)

Registers a responder that will respond to incomding messages.

```javascript
receiver.addResponder(function(ctx) {
  return "Goodbye, World!";
});
```

A reponder:

- Must be a function or a promise.
  - Function: the return value (if present) will be sent as the answer.
  - Promise: the resolved (or rejected) value will be sent as the answer.
- Has access to a ctx variable.
  - ctx.origin: the origin of sender, should most likely be used to verify the origin:
  ```javascript
  if (ctx.origin !== "https://sender.fake") {
    throw new Error("Do I know you?");
  }
  ```
  - ctx.message: the message it is responding to:
  ```javascript
  if (!ctx.mesage.startsWith("Hello,")) {
    throw new Error("Don't be so rude!");
  }
  ```
  
## Powered by

- Babel
- Webpack 4

## License

[MIT](http://opensource.org/licenses/MIT)

## Twitter

[Follow me on Twitter](https://twitter.com/KrolsBjorn)
