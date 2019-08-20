import nanoid from "nanoid";

const POLL_INTERVAL = 60;
const REQUEST_TYPE = "request";
const RESPONSE_TYPE = "response";

export function Sender({ querySelectors, receiverOrigin, timeout = 15000 }) {
  if (!querySelectors || !querySelectors.length) {
    throw new Error("Missing 'querySelectors'");
  }
  if (!receiverOrigin) {
    throw new Error("Missing 'receiverOrigin'");
  }
  const responses = [];
  window.addEventListener("message", e => {
    const id = e.data.id;
    const origin = e.origin;
    const type = e.data.type;
    if (type === RESPONSE_TYPE && origin === receiverOrigin) {
      responses[id] = e.data;
    }
  });
  return {
    send: message => {
      return new Promise((resolve, reject) => {
        const id = nanoid();
        responses[id] = null;
        document.querySelector(querySelectors).contentWindow.postMessage(
          {
            id,
            type: REQUEST_TYPE,
            message
          },
          receiverOrigin
        );
        let attempts = 0;
        let maximumAttempts = timeout / POLL_INTERVAL;
        const interval = window.setInterval(function() {
          attempts++;
          const response = responses[id];
          if (response != null) {
            clearInterval(interval);
            if (response.error) {
              reject(response.message);
            } else {
              resolve(response.message);
            }
          }
          if (attempts >= maximumAttempts) {
            reject(new Error("Tuai message timed out"));
          }
        }, POLL_INTERVAL);
      });
    }
  };
}

export function Receiver() {
  const responders = [];
  window.addEventListener("message", e => {
    const id = e.data.id;
    const origin = e.origin;
    const source = e.source;
    const type = e.data.type;
    const message = e.data.message;
    if (type === REQUEST_TYPE) {
      responders.forEach(async responder => {
        try {
          const response = await Promise.resolve(
            responder({
              origin,
              message
            })
          );
          source.postMessage(
            {
              id,
              type: RESPONSE_TYPE,
              message: response
            },
            origin
          );
        } catch (error) {
          source.postMessage(
            {
              id,
              type: RESPONSE_TYPE,
              error: true,
              message: JSON.parse(JSON.stringify(error)) // Prevent serialization error
            },
            origin
          );
        }
      });
    }
  });
  return {
    addResponder: responder => {
      responders.push(responder);
    }
  };
}
