---
description: Run multiple instances across Cloudflare's network
title: Stateless instances
image: https://developers.cloudflare.com/containers/examples/stateless/og.png?v=f01076b5fe66dd98
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Stateless instances

Run multiple instances across Cloudflare's network

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/examples/stateless/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Distribute HTTP requests across three named Container instances. Each Durable Object starts its Container with the `durable_object` scheduling policy.

The Worker chooses among `instance-0`, `instance-1`, and `instance-2`. This is a fixed pool, not automatic scaling. Requests can reach different instances, so keep shared application data outside the container filesystem.

## Configure the Worker

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "stateless-containers",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-10-02",
  "observability": {
    "enabled": true
  },
  "containers": [
    {
      "class_name": "Backend",
      "scheduling_policy": "durable_object",
      "images": {
        "base": {
          "dockerfile": "./Dockerfile"
        }
      }
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "BACKEND",
        "class_name": "Backend"
      }
    ]
  },
  "exports": {
    "Backend": {
      "type": "durable-object",
      "storage": "sqlite"
    }
  }
}
```

```toml
name = "stateless-containers"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-10-02"

[observability]
enabled = true

[[containers]]
class_name = "Backend"
scheduling_policy = "durable_object"

[containers.images.base]
dockerfile = "./Dockerfile"

[[durable_objects.bindings]]
name = "BACKEND"
class_name = "Backend"

[exports.Backend]
type = "durable-object"
storage = "sqlite"
```

## Route requests

`start()` initiates startup. The Worker waits for a successful `/health` response before forwarding traffic. Concurrent requests share that readiness check, and a failed check can be retried by the next request.

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

const INSTANCE_COUNT = 3;

const INACTIVITY_TIMEOUT_MS = 2 * 60 * 60 * 1000;

export class Backend extends DurableObject {
	starting;

	constructor(ctx, env) {
		super(ctx, env);
		const container = ctx.container;
		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	async fetch(request) {
		// Concurrent requests share startup and readiness checks.
		this.starting ??= this.startAndWaitForPort().finally(() => {
			this.starting = undefined;
		});
		await this.starting;

		const url = new URL(request.url);
		url.protocol = "http:";
		url.host = "container";
		const forwarded = new Request(url, request);
		forwarded.headers.delete("host");
		return this.ctx.container.getTcpPort(8080).fetch(forwarded);
	}

	async startAndWaitForPort() {
		const container = this.ctx.container;
		if (!container.running) {
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
			});
		}
		await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);

		const port = container.getTcpPort(8080);
		let lastError;
		for (let attempt = 0; attempt < 100; attempt++) {
			try {
				const response = await port.fetch("http://container/health", {
					signal: AbortSignal.timeout(1000),
				});
				await response.body?.cancel();
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
		const index = Math.floor(Math.random() * INSTANCE_COUNT);
		return env.BACKEND.getByName(`instance-${index}`).fetch(request);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

interface Env {
	BACKEND: DurableObjectNamespace<Backend>;
}

const INSTANCE_COUNT = 3;

const INACTIVITY_TIMEOUT_MS = 2 * 60 * 60 * 1000;

export class Backend extends DurableObject<Env> {
	private starting: Promise<void> | undefined;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container!;
		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	async fetch(request: Request): Promise<Response> {
		// Concurrent requests share startup and readiness checks.
		this.starting ??= this.startAndWaitForPort().finally(() => {
			this.starting = undefined;
		});
		await this.starting;

		const url = new URL(request.url);
		url.protocol = "http:";
		url.host = "container";
		const forwarded = new Request(url, request);
		forwarded.headers.delete("host");
		return this.ctx.container!.getTcpPort(8080).fetch(forwarded);
	}

	private async startAndWaitForPort(): Promise<void> {
		const container = this.ctx.container!;
		if (!container.running) {
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
			});
		}
		await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);

		const port = container.getTcpPort(8080);
		let lastError: unknown;
		for (let attempt = 0; attempt < 100; attempt++) {
			try {
				const response = await port.fetch("http://container/health", {
					signal: AbortSignal.timeout(1000),
				});
				await response.body?.cancel();
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
		const index = Math.floor(Math.random() * INSTANCE_COUNT);
		return env.BACKEND.getByName(`instance-${index}`).fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

## Define the container

Save these files in the project root. The server listens on `0.0.0.0:8080` and exposes a readiness endpoint at `/health`.

*server.mjsjs*

```js
import { createServer } from "node:http";

createServer((request, response) => {
	if (request.url === "/health") {
		response.writeHead(200).end();
		return;
	}
	response.setHeader("Content-Type", "application/json");
	response.end(
		JSON.stringify({
			message: "Hello from a Container",
			environment: process.env.ENV_VAR,
			kvValue: process.env.KV_VALUE,
		}),
	);
}).listen(8080, "0.0.0.0");
```

*Dockerfiledockerfile*

```dockerfile
FROM node:24-bookworm-slim
WORKDIR /app
COPY server.mjs .
EXPOSE 8080
CMD ["node", "server.mjs"]
```

## Run the example

Start a Docker-compatible engine. Install Wrangler in your project, using version 4.136.0 or later for [local development](https://developers.cloudflare.com/containers/guides/local-dev/).

npmyarnpnpmbun

```
npm i -D wrangler
```

```
yarn add -D wrangler
```

```
pnpm add -D wrangler
```

```
bun add -d wrangler
```

npmyarnpnpm

```
npx wrangler dev
```

```
yarn wrangler dev
```

```
pnpm wrangler dev
```

Visit `http://localhost:8787/` to receive the container response. Instances stop after their Durable Objects remain inactive for two hours.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/stateless/#page","headline":"Stateless instances","description":"Run multiple instances across Cloudflare's network","url":"https://developers.cloudflare.com/containers/examples/stateless/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/examples/stateless/og.png?v=f01076b5fe66dd98","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
