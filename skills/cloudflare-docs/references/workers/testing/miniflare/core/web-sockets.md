---
title: WebSockets
description: Miniflare will always upgrade Web Socket connections. The Worker must respond
with a status 101 Switching Protocols response including a webSocket. For
example, the Worker below implements an echo WebSocket server:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/testing/miniflare/core/web-sockets.md) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# WebSockets

* [WebSockets Reference](https://developers.cloudflare.com/workers/runtime-apis/websockets)
* [Using WebSockets](https://developers.cloudflare.com/workers/examples/websockets/)

## Server

Miniflare will always upgrade Web Socket connections. The Worker must respond with a status `101 Switching Protocols` response including a `webSocket`. For example, the Worker below implements an echo WebSocket server:

JavaScript

```

export default {

  fetch(request) {

    const [client, server] = Object.values(new WebSocketPair());


    server.accept();

    server.addEventListener("message", (event) => {

      server.send(event.data);

    });


    return new Response(null, {

      status: 101,

      webSocket: client,

    });

  },

};


```

Explain Code

When using `dispatchFetch`, you are responsible for handling WebSockets by using the `webSocket` property on `Response`. As an example, if the above worker script was stored in `echo.mjs`:

JavaScript

```

import { Miniflare } from "miniflare";


const mf = new Miniflare({

  modules: true,

  scriptPath: "echo.mjs",

});


const res = await mf.dispatchFetch("https://example.com", {

  headers: {

    Upgrade: "websocket",

  },

});

const webSocket = res.webSocket;

webSocket.accept();

webSocket.addEventListener("message", (event) => {

  console.log(event.data);

});


webSocket.send("Hello!"); // Above listener logs "Hello!"


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/core/","name":"Core"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/core/web-sockets/","name":"WebSockets"}}]}
```
