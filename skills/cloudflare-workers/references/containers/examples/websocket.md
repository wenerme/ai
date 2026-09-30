---
description: Forwarding a Websocket request to a Container
title: Websocket to Container
image: https://developers.cloudflare.com/containers/examples/websocket/og.png?v=d3a98cbc1a56b6e1
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Websocket to Container

Forwarding a Websocket request to a Container

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/examples/websocket/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Forward an incoming WebSocket upgrade request through the Durable Object to the listening port on the Container.

Because `container.start()` does not wait for readiness, this example polls `GET /health` before forwarding requests. Keep the WebSocket endpoint separate from the health check.

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	ready;

	async fetch(request) {
		const container = this.ctx.container;
		if (!container.running) {
			this.ready = undefined;
		}
		this.ready ??= this.startAndWaitForPort().catch((error) => {
			this.ready = undefined;
			throw error;
		});
		await this.ready;

		const url = new URL(request.url);
		url.protocol = "http:";
		url.host = "container";
		const forwarded = new Request(url, request);
		forwarded.headers.delete("host");
		return container.getTcpPort(8080).fetch(forwarded);
	}

	async startAndWaitForPort() {
		const container = this.ctx.container;
		await container.setInactivityTimeout(2 * 60 * 1000);
		if (!container.running) {
			container.start();
		}

		const port = container.getTcpPort(8080);
		let lastError;
		for (let attempt = 0; attempt < 100; attempt++) {
			try {
				const response = await port.fetch("http://container/health");
				if (!response.ok) {
					throw new Error(`Health check returned ${response.status}`);
				}
				return;
			} catch (error) {
				lastError = error;
				await scheduler.wait(200);
			}
		}
		throw new Error("Container did not become ready on port 8080", {
			cause: lastError,
		});
	}
}

export default {
	fetch(request, env) {
		return env.MY_CONTAINER.getByName("default").fetch(request);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

interface Env {
	MY_CONTAINER: DurableObjectNamespace<MyContainer>;
}

export class MyContainer extends DurableObject<Env> {
	private ready: Promise<void> | undefined;

	async fetch(request: Request): Promise<Response> {
		const container = this.ctx.container!;
		if (!container.running) {
			this.ready = undefined;
		}
		this.ready ??= this.startAndWaitForPort().catch((error: unknown) => {
			this.ready = undefined;
			throw error;
		});
		await this.ready;

		const url = new URL(request.url);
		url.protocol = "http:";
		url.host = "container";
		const forwarded = new Request(url, request);
		forwarded.headers.delete("host");
		return container.getTcpPort(8080).fetch(forwarded);
	}

	private async startAndWaitForPort(): Promise<void> {
		const container = this.ctx.container!;
		await container.setInactivityTimeout(2 * 60 * 1000);
		if (!container.running) {
			container.start();
		}

		const port = container.getTcpPort(8080);
		let lastError: unknown;
		for (let attempt = 0; attempt < 100; attempt++) {
			try {
				const response = await port.fetch("http://container/health");
				if (!response.ok) {
					throw new Error(`Health check returned ${response.status}`);
				}
				return;
			} catch (error) {
				lastError = error;
				await scheduler.wait(200);
			}
		}
		throw new Error("Container did not become ready on port 8080", {
			cause: lastError,
		});
	}
}

export default {
	fetch(request: Request, env: Env): Promise<Response> {
		return env.MY_CONTAINER.getByName("default").fetch(request);
	},
};
```

*src/index.jsjs*

```js
import { Container, getContainer } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 8080;
	sleepAfter = "2m";
}

export default {
	async fetch(request, env) {
		// gets default instance and forwards websocket from outside Worker
		return getContainer(env.MY_CONTAINER).fetch(request);
	},
};
```

*src/index.tsts*

```ts
import { Container, getContainer } from "@cloudflare/containers";

interface Env {
	MY_CONTAINER: DurableObjectNamespace<MyContainer>;
}

export class MyContainer extends Container<Env> {
	defaultPort = 8080;
	sleepAfter = "2m";
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// gets default instance and forwards websocket from outside Worker
		return getContainer(env.MY_CONTAINER).fetch(request);
	},
};
```

View a full example in the [Container class repository ↗︎](https://github.com/cloudflare/containers/tree/main/examples/websocket).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/websocket/#page","headline":"Websocket to Container","description":"Forwarding a Websocket request to a Container","url":"https://developers.cloudflare.com/containers/examples/websocket/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/examples/websocket/og.png?v=d3a98cbc1a56b6e1","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
