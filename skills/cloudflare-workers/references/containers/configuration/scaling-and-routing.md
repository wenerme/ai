---
description: Scale Container instances with named Durable Objects and route stateless requests across a fixed pool.
title: Scaling and Routing
image: https://developers.cloudflare.com/containers/configuration/scaling-and-routing/og.png?v=d0d420b171f18fca
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Scaling and Routing

Last updated Nov 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/configuration/scaling-and-routing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Scale container instances with explicit names

Each container instance belongs to one Durable Object. To run more container instances, address more Durable Objects by name with [`getByName()`](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname). Getting a Durable Object does not start its container. The container starts when the Durable Object calls [`ctx.container.start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start).

```ts
// Get two Durable Objects. Each one starts its own container instance.
const containerOne = env.MY_CONTAINER.getByName(nameOne);
const containerTwo = env.MY_CONTAINER.getByName(nameTwo);

// The Durable Object starts its container when it handles a request.
const response = await containerOne.fetch(request);
```

Each instance runs until the Durable Object stops it, or until the [inactivity timeout](https://developers.cloudflare.com/containers/api/durable-object-container/#setinactivitytimeout) that the Durable Object sets elapses. Without a timeout, Cloudflare stops the container shortly after the Durable Object becomes inactive.

This behavior is very useful when you want explicit control over the lifecycle of container instances. For instance, you may want to spin up a container backend instance for a specific user, or you may briefly run a code sandbox to isolate AI-generated code, or you may want to run a short-lived batch job.

### Route across a fixed pool of instances

To run multiple instances of a container and route requests between them, choose a name at random from a fixed pool:

```js
const INSTANCE_COUNT = 3;

export default {
	async fetch(request, env) {
		const index = Math.floor(Math.random() * INSTANCE_COUNT);
		return env.BACKEND.getByName(`instance-${index}`).fetch(request);
	},
};
```

```ts
const INSTANCE_COUNT = 3;

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const index = Math.floor(Math.random() * INSTANCE_COUNT);
		return env.BACKEND.getByName(`instance-${index}`).fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

Random selection from a fixed pool means:

- You set a fixed number of instances to route to.
- Each request goes to a random instance, regardless of location.

For the Durable Object that starts the container, waits for its port, and forwards the request, refer to [Stateless instances](https://developers.cloudflare.com/containers/examples/stateless/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/configuration/scaling-and-routing/#page","headline":"Scaling and Routing","description":"Scale Container instances with named Durable Objects and route stateless requests across a fixed pool.","url":"https://developers.cloudflare.com/containers/configuration/scaling-and-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/configuration/scaling-and-routing/og.png?v=d0d420b171f18fca","dateModified":"2026-11-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
