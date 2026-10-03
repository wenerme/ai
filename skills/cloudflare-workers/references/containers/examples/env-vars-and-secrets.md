---
description: Pass in environment variables and secrets to your container
title: Environment variables and secrets
image: https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/og.png?v=d15710cc7365b856
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Environment variables and secrets

Pass in environment variables and secrets to your container

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Pass runtime environment variables through `env` in `ctx.container.start()`. Read Worker secrets, Secrets Store values, and KV data inside the Durable Object before starting its Container.

This example passes four values to the container process: `ENV_VAR`, `WORKER_SECRET`, `SECRET_STORE_SECRET`, and `KV_VALUE`. The HTTP response includes only the two non-secret values.

## Configure bindings

Create a [KV namespace](https://developers.cloudflare.com/kv/get-started/) and a [Secrets Store secret](https://developers.cloudflare.com/secrets-store/integrations/workers/). Use a secret named `SECRET_STORE_SECRET` with the `workers` scope. Replace the namespace and store IDs in this configuration with the IDs returned during setup.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "container-environment",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-10-02",
  "observability": {
    "enabled": true
  },
  "containers": [
    {
      "class_name": "MyContainer",
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
        "name": "MY_CONTAINER",
        "class_name": "MyContainer"
      }
    ]
  },
  "exports": {
    "MyContainer": {
      "type": "durable-object",
      "storage": "sqlite"
    }
  },
  "vars": {
    "ENV_VAR": "demo"
  },
  "kv_namespaces": [
    {
      "binding": "DEMO_KV",
      "id": "<KV_NAMESPACE_ID>"
    }
  ],
  "secrets_store_secrets": [
    {
      "binding": "SECRET_STORE",
      "store_id": "<STORE_ID>",
      "secret_name": "SECRET_STORE_SECRET"
    }
  ]
}
```

```toml
name = "container-environment"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-10-02"

[observability]
enabled = true

[[containers]]
class_name = "MyContainer"
scheduling_policy = "durable_object"

[containers.images.base]
dockerfile = "./Dockerfile"

[[durable_objects.bindings]]
name = "MY_CONTAINER"
class_name = "MyContainer"

[exports.MyContainer]
type = "durable-object"
storage = "sqlite"

[vars]
ENV_VAR = "demo"

[[kv_namespaces]]
binding = "DEMO_KV"
id = "<KV_NAMESPACE_ID>"

[[secrets_store_secrets]]
binding = "SECRET_STORE"
store_id = "<STORE_ID>"
secret_name = "SECRET_STORE_SECRET"
```

Create the Worker secret, then populate the KV key for deployment:

npmyarnpnpm

```
npx wrangler secret put WORKER_SECRET
```

```
yarn wrangler secret put WORKER_SECRET
```

```
pnpm wrangler secret put WORKER_SECRET
```

npmyarnpnpm

```
npx wrangler kv key put --binding DEMO_KV KV_VALUE 'Hello from KV!' --remote
```

```
yarn wrangler kv key put --binding DEMO_KV KV_VALUE 'Hello from KV!' --remote
```

```
pnpm wrangler kv key put --binding DEMO_KV KV_VALUE 'Hello from KV!' --remote
```

`WORKER_SECRET` is available through the Worker environment without a `vars` entry. Store IDs identify stores; they are not store names.

## Pass values at startup

`start()` initiates startup. The Worker waits for a successful `/health` response before forwarding traffic. Concurrent requests share that readiness check, and a failed check can be retried by the next request.

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

const INACTIVITY_TIMEOUT_MS = 60 * 1000;

export class MyContainer extends DurableObject {
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
			const [storedSecret, kvValue] = await Promise.all([
				this.env.SECRET_STORE.get(),
				this.env.DEMO_KV.get("KV_VALUE"),
			]);
			if (storedSecret === null || kvValue === null) {
				throw new Error(
					"Create the secret and KV value before starting the container",
				);
			}
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
				env: {
					ENV_VAR: this.env.ENV_VAR,
					WORKER_SECRET: this.env.WORKER_SECRET,
					SECRET_STORE_SECRET: storedSecret,
					KV_VALUE: kvValue,
				},
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
		return env.MY_CONTAINER.getByName("demo").fetch(request);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

interface Env {
	MY_CONTAINER: DurableObjectNamespace<MyContainer>;
	ENV_VAR: string;
	WORKER_SECRET: string;
	SECRET_STORE: SecretsStoreSecret;
	DEMO_KV: KVNamespace;
}

const INACTIVITY_TIMEOUT_MS = 60 * 1000;

export class MyContainer extends DurableObject<Env> {
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
			const [storedSecret, kvValue] = await Promise.all([
				this.env.SECRET_STORE.get(),
				this.env.DEMO_KV.get("KV_VALUE"),
			]);
			if (storedSecret === null || kvValue === null) {
				throw new Error(
					"Create the secret and KV value before starting the container",
				);
			}
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
				env: {
					ENV_VAR: this.env.ENV_VAR,
					WORKER_SECRET: this.env.WORKER_SECRET,
					SECRET_STORE_SECRET: storedSecret,
					KV_VALUE: kvValue,
				},
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
		return env.MY_CONTAINER.getByName("demo").fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

Each named Durable Object reads the values when starting its Container. A running process keeps its startup environment. Updating a secret or KV value does not change that process's environment; the updated value is read on its next start.

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

## Test locally

For local development, create a `.dev.vars` file with test values. Do not commit this file.

*.dev.varstxt*

```txt
WORKER_SECRET="local-worker-secret"
```

Create a local Secrets Store value using the same store ID and secret name as the configuration. Enter a test value at the prompt:

npmyarnpnpm

```
npx wrangler secrets-store secret create <STORE_ID> --name SECRET_STORE_SECRET --scopes workers
```

```
yarn wrangler secrets-store secret create <STORE_ID> --name SECRET_STORE_SECRET --scopes workers
```

```
pnpm wrangler secrets-store secret create <STORE_ID> --name SECRET_STORE_SECRET --scopes workers
```

This command creates local data. It does not read or update the deployed secret.

Populate the local KV namespace:

npmyarnpnpm

```
npx wrangler kv key put --binding DEMO_KV KV_VALUE 'Hello from local KV!' --local
```

```
yarn wrangler kv key put --binding DEMO_KV KV_VALUE 'Hello from local KV!' --local
```

```
pnpm wrangler kv key put --binding DEMO_KV KV_VALUE 'Hello from local KV!' --local
```

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

Visit `http://localhost:8787/`. The response shows `demo` and the local KV value, without exposing either secret.

## Set build variables

Use `build_vars` on a named image for non-secret Docker build arguments. For example, replace the `containers` entry in the configuration and declare `ARG APP_VERSION` in your Dockerfile:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "containers": [
    {
      "class_name": "MyContainer",
      "scheduling_policy": "durable_object",
      "images": {
        "base": {
          "dockerfile": "./Dockerfile",
          "build_vars": {
            "APP_VERSION": "1.0.0"
          }
        }
      }
    }
  ]
}
```

```toml
[[containers]]
class_name = "MyContainer"
scheduling_policy = "durable_object"

[containers.images.base]
dockerfile = "./Dockerfile"
build_vars = { APP_VERSION = "1.0.0" }
```

Build arguments do not automatically become runtime environment variables. Keep secrets out of build arguments and container images.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/#page","headline":"Environment variables and secrets","description":"Pass in environment variables and secrets to your container","url":"https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/og.png?v=d15710cc7365b856","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
