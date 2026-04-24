---
title: Stateless Instances
description: Run multiple instances across Cloudflare's network
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/containers/examples/stateless.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Stateless Instances

**Last reviewed:**  10 months ago 

Run multiple instances across Cloudflare's network

To simply proxy requests to one of multiple instances of a container, you can use the `getRandom` function:

TypeScript

```

import { Container, getRandom } from "@cloudflare/containers";


const INSTANCE_COUNT = 3;


class Backend extends Container {

  defaultPort = 8080;

  sleepAfter = "2h";

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const containerInstance = await getRandom(env.BACKEND, INSTANCE_COUNT);

    return containerInstance.fetch(request);

  },

};


```

Explain Code

Note

This example uses `getRandom`, which randomly selects one of a fixed number of Container instances for each request.

In the future, we will provide improved latency-aware load balancing and autoscaling.

This will make scaling stateless instances simple and routing more efficient. See the[autoscaling documentation](https://developers.cloudflare.com/containers/platform-details/scaling-and-routing) for more details.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/examples/stateless/","name":"Stateless Instances"}}]}
```
