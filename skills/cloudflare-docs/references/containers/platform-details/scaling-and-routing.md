---
title: Scaling and Routing
description: Currently, Containers are only scaled manually by getting containers with a unique ID, then
starting the container. Note that getting a container does not automatically start it.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/containers/platform-details/scaling-and-routing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Scaling and Routing

### Scaling container instances with `get()`

Note

This section uses helpers from the [Container class](https://developers.cloudflare.com/containers/container-class/).

Currently, Containers are only scaled manually by getting containers with a unique ID, then starting the container. Note that getting a container does not automatically start it.

TypeScript

```

// get and start two container instances

const containerOne = getContainer(

  env.MY_CONTAINER,

  idOne,

).startAndWaitForPorts();


const containerTwo = getContainer(

  env.MY_CONTAINER,

  idTwo,

).startAndWaitForPorts();


```

Explain Code

Each instance will run until its `sleepAfter` time has elapsed, or until it is manually stopped.

This behavior is very useful when you want explicit control over the lifecycle of container instances. For instance, you may want to spin up a container backend instance for a specific user, or you may briefly run a code sandbox to isolate AI-generated code, or you may want to run a short-lived batch job.

#### The `getRandom` helper function

However, sometimes you want to run multiple instances of a container and easily route requests to them.

Currently, the best way to achieve this is with the _temporary_ `getRandom` helper function:

JavaScript

```

import { Container, getRandom } from "@cloudflare/containers";


const INSTANCE_COUNT = 3;


class Backend extends Container {

  defaultPort = 8080;

  sleepAfter = "2h";

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    // note: "getRandom" to be replaced with latency-aware routing in the near future

    const containerInstance = getRandom(env.BACKEND, INSTANCE_COUNT)

    return containerInstance.fetch(request);

  },

};


```

Explain Code

We have provided the getRandom function as a stopgap solution to route to multiple stateless container instances. It will randomly select one of N instances for each request and route to it. Unfortunately, it has two major downsides:

* It requires that the user set a fixed number of instances to route to.
* It will randomly select each instance, regardless of location.

We plan to fix these issues with built-in autoscaling and routing features in the near future.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/platform-details/","name":"Platform Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/platform-details/scaling-and-routing/","name":"Scaling and Routing"}}]}
```
