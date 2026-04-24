---
title: Limits
description: Resource limits for Sandbox SDK including vCPU, memory, disk, and container constraints.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/sandbox/platform/limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Limits

Since the Sandbox SDK is built on top of the [Containers](https://developers.cloudflare.com/containers/) platform, it shares the same underlying platform characteristics. Refer to these pages to understand how pricing and limits work for your sandbox deployments.

Sandbox also inherits current Containers lifecycle, placement, and routing behavior. For more detail, refer to [Lifecycle of a Container](https://developers.cloudflare.com/containers/platform-details/architecture/) and[Scaling and Routing](https://developers.cloudflare.com/containers/platform-details/scaling-and-routing/).

## Container limits

Refer to [Containers limits](https://developers.cloudflare.com/containers/platform-details/limits/) for complete details on:

* Memory, vCPU, and disk limits for concurrent container instances
* Instance types and their resource allocations
* Image size and storage limits

## Workers and Durable Objects limits

When using the Sandbox SDK from Workers or Durable Objects, you are subject to [Workers subrequest limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests). By default, the SDK uses HTTP transport where each operation (`exec()`, `readFile()`, `writeFile()`, etc.) counts as one subrequest.

### Subrequest limits

* **Workers Free**: 50 subrequests per request
* **Workers Paid**: 1,000 subrequests per request

### Avoid subrequest limits with WebSocket transport

Enable WebSocket transport to multiplex all SDK calls over a single persistent connection:

* [  wrangler.jsonc ](#tab-panel-8956)
* [  wrangler.toml ](#tab-panel-8957)

JSONC

```

{

  "vars": {

    "SANDBOX_TRANSPORT": "websocket"

  },

}


```

TOML

```

[vars]

SANDBOX_TRANSPORT = "websocket"


```

With WebSocket transport enabled:

* The WebSocket upgrade counts as one subrequest
* All subsequent SDK operations use the existing connection (no additional subrequests)
* Ideal for workflows with many SDK operations per request

See [Transport modes](https://developers.cloudflare.com/sandbox/configuration/transport/) for a complete guide.

## Best practices

To work within these limits:

* **Right-size your instances** \- Choose the appropriate [instance type](https://developers.cloudflare.com/containers/platform-details/limits/#instance-types) based on your workload requirements
* **Clean up unused sandboxes** \- Terminate sandbox sessions when they are no longer needed to free up resources
* **Optimize images** \- Keep your [custom Dockerfiles](https://developers.cloudflare.com/sandbox/configuration/dockerfile/) lean to reduce image size
* **Use WebSocket transport for high-frequency operations** \- Enable `SANDBOX_TRANSPORT=websocket` to avoid subrequest limits when making many SDK calls per request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/platform/limits/","name":"Limits"}}]}
```
