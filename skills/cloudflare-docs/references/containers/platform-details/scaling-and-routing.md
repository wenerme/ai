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

This section uses helpers from the [Container package](https://developers.cloudflare.com/containers/container-package).

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

We have provided the getRandom function as a stopgap solution to route to multiple stateless container instances. It will randomly select one of N instances for each request and route to it. Unfortunately, it has two major downsides:

* It requires that the user set a fixed number of instances to route to.
* It will randomly select each instance, regardless of location.

We plan to fix these issues with built-in autoscaling and routing features in the near future.

### Autoscaling and routing (unreleased)

Note

This is an unreleased feature. It is subject to change.

You will be able to turn autoscaling on for a Container, by setting the `autoscale` property to on the Container class:

JavaScript

```

class MyBackend extends Container {

  autoscale = true;

  defaultPort = 8080;

}


```

This instructs the platform to automatically scale instances based on incoming traffic and resource usage (memory, CPU).

Container instances will be launched automatically to serve local traffic, and will be stopped when they are no longer needed.

To route requests to the correct instance, you will use the `getContainer()` helper function to get a container instance, then pass requests to it:

JavaScript

```

export default {

  async fetch(request, env) {

    return getContainer(env.MY_BACKEND).fetch(request);

  },

};


```

This will send traffic to the nearest ready instance of a container. If a container is overloaded or has not yet launched, requests will be routed to potentially more distant container. Container readiness can be automatically determined based on resource use, but will also be configurable with custom readiness checks.

Autoscaling and latency-aware routing will be available in the near future, and will be documented in more detail when released. Until then, you can use the `getRandom` helper function to route requests to multiple container instances.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/platform-details/","name":"Platform Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/platform-details/scaling-and-routing/","name":"Scaling and Routing"}}]}
```
