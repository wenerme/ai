---
description: Execute Workers code in reaction to Container status changes
title: Status Hooks
image: https://developers.cloudflare.com/containers/examples/status-hooks/og.png?v=3560c99df3dbc646
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Status Hooks

Execute Workers code in reaction to Container status changes

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/examples/status-hooks/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use `monitor()` with the Durable Object Container API to run code after the Container exits or errors. The `Container` class adds named lifecycle hooks and an inactivity callback.

The direct API example requires the Container to expose `GET /health` on port `4000`. The endpoint must return a successful response when the application is ready. Because `container.start()` does not wait for readiness, the Worker polls this endpoint before forwarding requests.

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
		this.ready ??= this.startAndMonitor().catch((error) => {
			this.ready = undefined;
			throw error;
		});
		await this.ready;

		const url = new URL(request.url);
		url.protocol = "http:";
		url.host = "container";
		const forwarded = new Request(url, request);
		forwarded.headers.delete("host");
		return container.getTcpPort(4000).fetch(forwarded);
	}

	async startAndMonitor() {
		const container = this.ctx.container;
		await container.setInactivityTimeout(5 * 60 * 1000);
		if (!container.running) {
			container.start();
		}

		this.ctx.waitUntil(
			container
				.monitor()
				.then(() => console.log("Container stopped"))
				.catch((error) => console.error("Container error:", error)),
		);

		const port = container.getTcpPort(4000);
		let lastError;
		for (let attempt = 0; attempt < 100; attempt++) {
			try {
				const response = await port.fetch("http://container/health");
				if (!response.ok) {
					throw new Error(`Health check returned ${response.status}`);
				}
				console.log("Container successfully started");
				return;
			} catch (error) {
				lastError = error;
				await scheduler.wait(200);
			}
		}
		throw new Error("Container did not become ready on port 4000", {
			cause: lastError,
		});
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

interface Env {}

export class MyContainer extends DurableObject<Env> {
	private ready: Promise<void> | undefined;

	async fetch(request: Request): Promise<Response> {
		const container = this.ctx.container!;
		if (!container.running) {
			this.ready = undefined;
		}
		this.ready ??= this.startAndMonitor().catch((error: unknown) => {
			this.ready = undefined;
			throw error;
		});
		await this.ready;

		const url = new URL(request.url);
		url.protocol = "http:";
		url.host = "container";
		const forwarded = new Request(url, request);
		forwarded.headers.delete("host");
		return container.getTcpPort(4000).fetch(forwarded);
	}

	private async startAndMonitor(): Promise<void> {
		const container = this.ctx.container!;
		await container.setInactivityTimeout(5 * 60 * 1000);
		if (!container.running) {
			container.start();
		}

		this.ctx.waitUntil(
			container
				.monitor()
				.then(() => console.log("Container stopped"))
				.catch((error: unknown) => console.error("Container error:", error)),
		);

		const port = container.getTcpPort(4000);
		let lastError: unknown;
		for (let attempt = 0; attempt < 100; attempt++) {
			try {
				const response = await port.fetch("http://container/health");
				if (!response.ok) {
					throw new Error(`Health check returned ${response.status}`);
				}
				console.log("Container successfully started");
				return;
			} catch (error) {
				lastError = error;
				await scheduler.wait(200);
			}
		}
		throw new Error("Container did not become ready on port 4000", {
			cause: lastError,
		});
	}
}
```

*src/index.jsjs*

```js
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 4000;
	sleepAfter = "5m";

	onStart() {
		console.log("Container successfully started");
	}

	onStop(stopParams) {
		if (stopParams.exitCode === 0) {
			console.log("Container stopped gracefully");
		} else {
			console.log("Container stopped with exit code:", stopParams.exitCode);
		}

		console.log("Container stop reason:", stopParams.reason);
	}

	async onActivityExpired() {
		console.log("Container became idle, stopping it now");
		await this.stop();
	}

	onError(error) {
		console.log("Container error:", error);
	}
}
```

*src/index.tsts*

```ts
import { Container, type StopParams } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 4000;
	sleepAfter = "5m";

	override onStart() {
		console.log("Container successfully started");
	}

	override onStop(stopParams: StopParams) {
		if (stopParams.exitCode === 0) {
			console.log("Container stopped gracefully");
		} else {
			console.log("Container stopped with exit code:", stopParams.exitCode);
		}

		console.log("Container stop reason:", stopParams.reason);
	}

	override async onActivityExpired() {
		console.log("Container became idle, stopping it now");
		await this.stop();
	}

	override onError(error: unknown) {
		console.log("Container error:", error);
	}
}
```

The `monitor()` promise resolves without a value when the container exits successfully. For nonzero exits, it rejects with an error containing the exit code. The `setInactivityTimeout()` method does not invoke a callback when the timeout expires. Use the [`Container` class lifecycle hooks](https://developers.cloudflare.com/containers/api/container-class/#lifecycle-hooks) for structured stop parameters and an inactivity callback.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/status-hooks/#page","headline":"Status Hooks","description":"Execute Workers code in reaction to Container status changes","url":"https://developers.cloudflare.com/containers/examples/status-hooks/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/examples/status-hooks/og.png?v=3560c99df3dbc646","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
