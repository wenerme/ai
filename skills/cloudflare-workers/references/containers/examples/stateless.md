---
description: Run multiple instances across Cloudflare's network
title: Stateless Instances
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Stateless Instances

Run multiple instances across Cloudflare's network

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/examples/stateless/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To simply proxy requests to one of multiple instances of a container, you can use the `getRandom` function:

```ts
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

Note

This example uses `getRandom`, which randomly selects one of a fixed number of Container instances for each request.

In the future, we will provide improved latency-aware load balancing and autoscaling.

This will make scaling stateless instances simple and routing more efficient. See the [autoscaling documentation](https://developers.cloudflare.com/containers/platform-details/scaling-and-routing) for more details.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/stateless/#page","headline":"Stateless Instances · Cloudflare Containers docs","description":"Run multiple instances across Cloudflare's network","url":"https://developers.cloudflare.com/containers/examples/stateless/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
