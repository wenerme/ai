---
title: How Workers for Platforms works
description: Understand the architecture of Workers for Platforms, including dispatch namespaces, dynamic dispatch Workers, user Workers, and outbound Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# How Workers for Platforms works

## Architecture

If you are familiar with [Workers](https://developers.cloudflare.com/workers/), Workers for Platforms introduces four key components: dispatch namespaces, dynamic dispatch Workers, user Workers, and optionally outbound Workers.

![Workers for Platforms architecture](https://developers.cloudflare.com/_astro/programmable-platforms-1.BCCEhzLr_2d88FE.svg) 

### Dispatch namespace

A dispatch namespace is a container that holds all of your customers' Workers. Your platform takes the code your customers write, and then makes an API request to deploy that code as a user Worker to a namespace — for example `staging` or `production`. Compared to [Workers](https://developers.cloudflare.com/workers/), this provides:

* **Unlimited number of Workers** \- No per-account script limits apply to Workers in a namespace
* **Isolation by default** \- Each user Worker in a namespace runs in [untrusted mode](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/worker-isolation/) — user Workers never share a cache even when running on the same Cloudflare zone, and cannot access the `request.cf` object
* **Dynamic invocation** \- Your dynamic dispatch Worker can call any Worker in the namespace using `env.DISPATCHER.get("worker-name")`

Best practice

All your customers' Workers should live in a single namespace (for example, `production`). Do not create a namespace per customer.

If you need to test changes safely, create a separate `staging` namespace.

### Dynamic dispatch Worker

A dynamic dispatch Worker is the entry point for all requests to your platform. Your dynamic dispatch Worker:

* **Routes requests** \- Determines which customer Worker should handle each request based on hostname, path, headers, or any other criteria
* **Runs platform logic** \- Executes authentication, rate limiting, or request validation before customer code runs
* **Sets per-customer limits** \- Enforces [custom limits](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/) on CPU time and subrequests based on plan type
* **Sanitizes responses** \- Modifies or filters responses from customer Workers

The dynamic dispatch Worker uses a [dispatch namespace binding](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/) to invoke user Workers:

JavaScript

```

export default {

  async fetch(request, env) {

    // Determine which customer Worker to call

    const customerName = new URL(request.url).hostname.split(".")[0];


    // Get and invoke the customer's Worker

    const userWorker = env.DISPATCHER.get(customerName);

    return userWorker.fetch(request);

  },

};


```

Explain Code

### User Workers

User Workers contain code written by your customers. Your customer sends their code to your platform, and then you make an API request to deploy a user Worker on their behalf. User Workers are deployed to a dispatch namespace and invoked by your dynamic dispatch Worker. You can provide user Workers with [bindings](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/) to access KV, D1, R2, and other Cloudflare resources.

![Deployment and management flow](https://developers.cloudflare.com/_astro/programmable-platforms-6.BfYznbr5_2d88FE.svg) 

### Outbound Worker (optional)

An [outbound Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/) intercepts [fetch()](https://developers.cloudflare.com/workers/runtime-apis/fetch/) requests made by user Workers. Use it to:

* **Control egress** \- Block or allow external API calls from customer code
* **Log requests** \- Track what external services customers are calling
* **Modify requests** \- Add authentication headers or transform requests before they leave your platform
![Outbound Worker egress control pattern](https://developers.cloudflare.com/_astro/programmable-platforms-3.C-LkeZtS_Z19nioR.svg) 

### Request lifecycle

1. A request arrives at your dynamic dispatch Worker (for example, `customer-a.example.com/api`)
2. Your dynamic dispatch Worker determines which user Worker should handle the request
3. The dynamic dispatch Worker calls `env.DISPATCHER.get("customer-a")` to get the user Worker
4. The user Worker executes. If it makes external `fetch()` calls and an outbound Worker is configured, those requests pass through the outbound Worker first.
5. The user Worker returns a response
6. Your dynamic dispatch Worker can optionally modify the response before returning it

---

## Workers for Platforms versus Service bindings

Both Workers for Platforms and [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) enable Worker-to-Worker communication. Use Service bindings when you know exactly which Workers need to communicate. Use Workers for Platforms when user Workers are uploaded dynamically by your customers.

You can use both simultaneously - your dynamic dispatch Worker can use Service bindings to call internal services while also dispatching to user Workers in a namespace.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/","name":"Workers for Platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/","name":"How Workers for Platforms works"}}]}
```
