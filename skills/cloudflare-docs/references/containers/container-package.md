---
title: Container Package
description: When writing code that interacts with a container instance, you can either use a
Durable Object directly or use the Container class
importable from @cloudflare/containers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/containers/container-package.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Container Package

When writing code that interacts with a container instance, you can either use a[Durable Object directly](https://developers.cloudflare.com/containers/platform-details/durable-object-methods) or use the [Container class ↗](https://github.com/cloudflare/containers)importable from [@cloudflare/containers ↗](https://www.npmjs.com/package/@cloudflare/containers).

We recommend using the `Container` class for most use cases.

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/containers
```

```
yarn add @cloudflare/containers
```

```
pnpm add @cloudflare/containers
```

```
bun add @cloudflare/containers
```

Then, you can define a class that extends `Container`, and use it in your Worker:

JavaScript

```

import { Container } from "@cloudflare/containers";


class MyContainer extends Container {

  defaultPort = 8080;

  sleepAfter = "5m";

}


export default {

  async fetch(request, env) {

    // gets default instance and forwards request from outside Worker

    return env.MY_CONTAINER.getByName("hello").fetch(request);

  },

};


```

The `Container` class extends `DurableObject` so all [Durable Object](https://developers.cloudflare.com/durable-objects) functionality is available. It also provides additional functionality and a nice interface for common container behaviors, such as:

* sleeping instances after an inactivity timeout
* making requests to specific ports
* running status hooks on startup, stop, or error
* awaiting specific ports before making requests
* setting environment variables and secrets

See the [Containers GitHub repo ↗](https://github.com/cloudflare/containers) for more details and the complete API.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/container-package/","name":"Container Package"}}]}
```
