---
title: WebSockets
description: Communicate in real time with your Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/runtime-apis/websockets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# WebSockets

## Background

WebSockets allow you to communicate in real time with your Cloudflare Workers serverless functions. For a complete example, refer to [Using the WebSockets API](https://developers.cloudflare.com/workers/examples/websockets/).

Note

If your application needs to coordinate among multiple WebSocket connections, such as a chat room or game match, you will need clients to send messages to a single-point-of-coordination. Durable Objects provide a single-point-of-coordination for Cloudflare Workers, and are often used in parallel with WebSockets to persist state over multiple clients and connections. In this case, refer to [Durable Objects](https://developers.cloudflare.com/durable-objects/) to get started, and prefer using the Durable Objects' extended [WebSockets API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

## Constructor

JavaScript

```

// { 0: <WebSocket>, 1: <WebSocket> }

let websocketPair = new WebSocketPair();


```

The WebSocketPair returned from this constructor is an Object, with two WebSockets at keys `0` and `1`.

These WebSockets are commonly referred to as `client` and `server`. The below example combines `Object.values` and ES6 destructuring to retrieve the WebSockets as `client` and `server`:

JavaScript

```

let [client, server] = Object.values(new WebSocketPair());


```

## Methods

### accept

* `accept()`  
   * Accepts the WebSocket connection and begins terminating requests for the WebSocket on Cloudflare's global network. This effectively enables the Workers runtime to begin responding to and handling WebSocket requests.

### addEventListener

* `addEventListener(eventWebSocketEvent, callbackFunctionFunction)`  
   * Add callback functions to be executed when an event has occurred on the WebSocket.

#### Parameters

* `event` WebSocketEvent  
   * The WebSocket event (refer to [Events](https://developers.cloudflare.com/workers/runtime-apis/websockets/#events)) to listen to.
* `callbackFunction(messageMessage)` Function  
   * A function to be called when the WebSocket responds to a specific event.

### close

* `close(codenumber, reasonstring)`  
   * Close the WebSocket connection.

#### Parameters

* `codeinteger` optional  
   * An integer indicating the close code sent by the server. This should match an option from the [list of status codes ↗](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#status%5Fcodes) provided by the WebSocket spec.
* `reasonstring` optional  
   * A human-readable string indicating why the WebSocket connection was closed.

### send

* `send(messagestring | ArrayBuffer | ArrayBufferView)`  
   * Send a message to the other WebSocket in this WebSocket pair.

#### Parameters

* `messagestring`  
   * The message to send down the WebSocket connection to the corresponding client. This should be a string or something coercible into a string; for example, strings and numbers will be simply cast into strings, but objects and arrays should be cast to JSON strings using `JSON.stringify`, and parsed in the client.

---

## Events

* `close`  
   * An event indicating the WebSocket has closed.
* `error`  
   * An event indicating there was an error with the WebSocket.
* `message`  
   * An event indicating a new message received from the client, including the data passed by the client.

Note

WebSocket messages received by a Worker have a size limit of 32 MiB (33,554,432 bytes). If a larger message is sent, the WebSocket will be automatically closed with a `1009` "Message is too large" response.

## Types

### Message

* `data` any - The data passed back from the other WebSocket in your pair.
* `type` string - Defaults to `message`.

---

## Related resources

* [Mozilla Developer Network's (MDN) documentation on the WebSocket class ↗](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
* [Our WebSocket template for building applications on Workers using WebSockets ↗](https://github.com/cloudflare/websocket-template)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/websockets/","name":"WebSockets"}}]}
```
