---
title: Websocket to Container
description: Forwarding a Websocket request to a Container
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/containers/examples/websocket.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Websocket to Container

**Last reviewed:**  10 months ago 

Forwarding a Websocket request to a Container

WebSocket requests are automatically forwarded to a container using the default `fetch`method on the `Container` class:

JavaScript

```

import { Container, getContainer } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;

  sleepAfter = "2m";

}


export default {

  async fetch(request, env) {

    // gets default instance and forwards websocket from outside Worker

    return getContainer(env.MY_CONTAINER).fetch(request);

  },

};


```

Explain Code

View a full example in the [Container class repository ↗](https://github.com/cloudflare/containers/tree/main/examples/websocket).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/examples/websocket/","name":"Websocket to Container"}}]}
```
