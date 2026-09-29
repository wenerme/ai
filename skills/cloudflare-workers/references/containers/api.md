---
description: Use the Durable Object Container API for new applications and compare it with the Container class.
title: API
image: https://developers.cloudflare.com/containers/api/og.png?v=b5325a11e1e8cc4d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# API

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Containers provide two APIs for managing a container from a Durable Object. Both APIs address the same container runtime.

For new applications, we recommend the Durable Object Container API. It lets you combine container workloads with the Durable Object's persistent storage, alarms, and request handling. Use `ctx.container` to control the container lifecycle while your Durable Object coordinates application state. The `Container` class remains documented for existing applications.

### [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/)

Start, stop, monitor, and connect to a container through `ctx.container`.

### [Container class](https://developers.cloudflare.com/containers/api/container-class/)

Reference the class and its routing, readiness checks, lifecycle hooks, and scheduling for existing applications.

## Choose an API

Inside a Durable Object, use `ctx.container` to control the container runtime directly. You can manage startup, shutdown, networking, and resource usage while using Durable Object storage and alarms for state and coordination. Add readiness checks, custom request routing, or lifecycle policies when needed.

The `Container` class extends `DurableObject` and wraps the container runtime API with convenience methods. Existing applications can use these methods for request proxying, readiness checks, lifecycle hooks, and scheduling. Durable Object storage and alarms remain available when needed.

The following examples compare the starting structure for each API:

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

interface Env {}

export class MyContainer extends DurableObject<Env> {
	fetch(): Response {
		const container = this.ctx.container;
		if (!container) {
			return new Response("No container is configured", { status: 500 });
		}
		if (container.running) {
			return new Response("Container is running");
		}
		container.start();
		return new Response("Container is starting", { status: 202 });
	}
}
```

*src/index.tsts*

```ts
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 8080;
	sleepAfter = "10m";
}
```

Starting a container through the Durable Object Container API does not mean its ports are ready. For request routing, use [`getTcpPort()`](https://developers.cloudflare.com/containers/api/durable-object-container/#gettcpport) after checking port readiness. For all direct methods, refer to the [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/). For convenience methods, refer to the [Container class API](https://developers.cloudflare.com/containers/api/container-class/).

The following table compares both options:

| Requirement | Durable Object Container API | `Container` class |
| --- | --- | --- |
| Start and stop a container | [`start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start), [`signal()`](https://developers.cloudflare.com/containers/api/durable-object-container/#signal), and [`destroy()`](https://developers.cloudflare.com/containers/api/durable-object-container/#destroy) | [`start()`](https://developers.cloudflare.com/containers/api/container-class/#start), [`stop()`](https://developers.cloudflare.com/containers/api/container-class/#stop), and [`destroy()`](https://developers.cloudflare.com/containers/api/container-class/#destroy) |
| Send and proxy traffic | [`getTcpPort(port).fetch()`](https://developers.cloudflare.com/containers/api/durable-object-container/#gettcpport) and [`getTcpPort(port).connect()`](https://developers.cloudflare.com/containers/api/durable-object-container/#gettcpport) | [`fetch()`](https://developers.cloudflare.com/containers/api/container-class/#fetch) and [`containerFetch()`](https://developers.cloudflare.com/containers/api/container-class/#containerfetch) |
| Execute another process | [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec) | [`ctx.container.exec()`](https://developers.cloudflare.com/containers/api/container-class/#execute-commands) |
| Check port readiness | Use [`getTcpPort()`](https://developers.cloudflare.com/containers/api/durable-object-container/#gettcpport) in application code | [`startAndWaitForPorts()`](https://developers.cloudflare.com/containers/api/container-class/#startandwaitforports) and [`waitForPort()`](https://developers.cloudflare.com/containers/api/container-class/#waitforport) |
| Handle concurrent starts | Coordinate calls to [`start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start) when needed | Handled by [`start()`](https://developers.cloudflare.com/containers/api/container-class/#start) and [`startAndWaitForPorts()`](https://developers.cloudflare.com/containers/api/container-class/#startandwaitforports) |
| Run lifecycle hooks | [`monitor()`](https://developers.cloudflare.com/containers/api/durable-object-container/#monitor) and application code | [`onStart()`](https://developers.cloudflare.com/containers/api/container-class/#onstart), [`onStop()`](https://developers.cloudflare.com/containers/api/container-class/#onstop), [`onError()`](https://developers.cloudflare.com/containers/api/container-class/#onerror), and [`onActivityExpired()`](https://developers.cloudflare.com/containers/api/container-class/#onactivityexpired) |
| Stop inactive containers | [`setInactivityTimeout()`](https://developers.cloudflare.com/containers/api/durable-object-container/#setinactivitytimeout) | [`sleepAfter`](https://developers.cloudflare.com/containers/api/container-class/#sleepafter) and [`onActivityExpired()`](https://developers.cloudflare.com/containers/api/container-class/#onactivityexpired) |
| Schedule callbacks | [`ctx.storage.setAlarm()`](https://developers.cloudflare.com/durable-objects/api/alarms/#setalarm) (Durable Object API) | [`schedule()`](https://developers.cloudflare.com/containers/api/container-class/#schedule) |

For new applications, use the Durable Object Container API to combine direct container control with Durable Object storage and coordination. It also supports latency-sensitive workloads and applications that need a smaller storage footprint.

If your application uses the `Container` class, refer to [Migrate to the Durable Object Container API](https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-container-api/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/containers/api/#page","headline":"API","description":"Use the Durable Object Container API for new applications and compare it with the Container class.","url":"https://developers.cloudflare.com/containers/api/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/api/og.png?v=b5325a11e1e8cc4d","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
