# Tuai

> TODO

## About

TODO

## Installation & setup

### Option 1: module bundler

Install the latest version from npm:

```
npm install --save tuai
```

#### Sender

```javascript
import { Sender } from "tuai";
const sender = new Tuai.Sender({
  querySelectors: ["#portal"],
  targetOrigin: "https://receiver.fake"
});
```

#### Receiver

```javascript
import { Receiver } from "tuai";
const receiver = new Receiver();
receiver.addResponder({ origin } => {
  if (origin !== "https://sender.fake") {
    throw new Error("Illegal origin");
  }
  return 10;
});
```

### Option 2: direct script tag

The latest version of Tuai can be found at:

```
http://unpkg.com/tuai@latest
```

#### Sender

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Sender</title>
  </head>
  <body>
    <button id="send-message">Send message</button>
    <iframe
      id="portal"
      src="https://receiver.fake"
      style="display: none;"
    ></iframe>
    <script src="http://unpkg.com/tuai@latest"></script>
    <script>
      var sender = new Tuai.Sender({
        querySelectors: ["#portal"],
        targetOrigin: "https://receiver.fake"
      });
      document
        .getElementById("send-message")
        .addEventListener("click", function() {
          sender.send("What is 5 + 5?").then(response => {
            console.log(response);
          });
        });
    </script>
  </body>
</html>
```

#### Receiver

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Receiver</title>
    <script src="http://unpkg.com/tuai@latest"></script>
    <script>
      var receiver = new Tuai.Receiver();
      receiver.addResponder(function(ctx) {
        if (ctx.origin !== "https://sender.fake") {
          throw new Error("Illegal origin");
        }
        return 10;
      });
    </script>
  </head>
</html>
```

## API

TODO

## Powered by

- Babel
- Webpack 4

## License

[MIT](http://opensource.org/licenses/MIT)

## Twitter

[Follow me on Twitter](https://twitter.com/KrolsBjorn)
