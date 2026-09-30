---
description: Run multiple instances across Cloudflare's network
title: Stateless Instances
image: https://developers.cloudflare.com/containers/examples/stateless/og.png?v=8cb6f25e15b6e31e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Stateless Instances

Run multiple instances across Cloudflare's network

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/examples/stateless/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

To proxy requests across a fixed number of Container instances, select an instance name and forward the request through its Durable Object.

`container.start()` returns before the container is ready. The Durable Object Container API example polls `GET /health` on port `8080` before forwarding requests. The container must return a successful response only when it is ready to receive traffic.

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

const INSTANCE_COUNT = 3;

export class Backend extends DurableObject {
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
		await container.setInactivityTimeout(2 * 60 * 60 * 1000);
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
	async fetch(request, env) {
		const index = Math.floor(Math.random() * INSTANCE_COUNT);
		return env.BACKEND.getByName(`instance-${index}`).fetch(request);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

const INSTANCE_COUNT = 3;

interface Env {
	BACKEND: DurableObjectNamespace<Backend>;
}

export class Backend extends DurableObject<Env> {
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
		await container.setInactivityTimeout(2 * 60 * 60 * 1000);
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
	async fetch(request: Request, env: Env): Promise<Response> {
		const index = Math.floor(Math.random() * INSTANCE_COUNT);
		return env.BACKEND.getByName(`instance-${index}`).fetch(request);
	},
};
```

*src/index.jsjs*

```js
import { Container, getRandom } from "@cloudflare/containers";

const INSTANCE_COUNT = 3;

export class Backend extends Container {
	defaultPort = 8080;
	sleepAfter = "2h";
}

export default {
	async fetch(request, env) {
		const containerInstance = await getRandom(env.BACKEND, INSTANCE_COUNT);
		return containerInstance.fetch(request);
	},
};
```

*src/index.tsts*

```ts
import { Container, getRandom } from "@cloudflare/containers";

const INSTANCE_COUNT = 3;

interface Env {
	BACKEND: DurableObjectNamespace<Backend>;
}

export class Backend extends Container<Env> {
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

Both examples randomly select one of a fixed number of Container instances for each request. The `Container` class provides `getRandom()` as a helper.

See the [autoscaling documentation](https://developers.cloudflare.com/containers/configuration/scaling-and-routing/) for more details about scaling stateless instances and routing.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/stateless/#page","headline":"Stateless Instances","description":"Run multiple instances across Cloudflare's network","url":"https://developers.cloudflare.com/containers/examples/stateless/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/examples/stateless/og.png?v=8cb6f25e15b6e31e","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
