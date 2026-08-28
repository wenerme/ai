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

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/examples/stateless/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

This will make scaling stateless instances simple and routing more efficient. See the [autoscaling documentation](https://developers.cloudflare.com/containers/configuration/scaling-and-routing) for more details.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/stateless/#page","headline":"Stateless Instances · Cloudflare Containers docs","description":"Run multiple instances across Cloudflare's network","url":"https://developers.cloudflare.com/containers/examples/stateless/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
