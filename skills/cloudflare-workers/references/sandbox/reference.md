---
description: Install @cloudflare/sandbox and prepare the container image and Worker that its classes require.
title: "@cloudflare/sandbox"
image: https://developers.cloudflare.com/sandbox/reference/og.png?v=257cc07fb6b73110
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# @cloudflare/sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/reference/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cloudflare/sandbox` works with a container you start from a Durable Object. Its classes run helper processes in the running container through [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec). The package does not start, stop, or monitor the container.

For `start()`, `exec()`, snapshots, and the other methods of the container itself, refer to the [Durable Object container API](https://developers.cloudflare.com/containers/api/durable-object-container/).

## Install

npmyarnpnpmbun

```
npm i @cloudflare/sandbox
```

```
yarn add @cloudflare/sandbox
```

```
pnpm add @cloudflare/sandbox
```

```
bun add @cloudflare/sandbox
```

## Requirements

Every class in the package has these requirements. A class page lists any others.

- The container image contains the helper binary at `/usr/local/bin/sandbox-shim`. Copy it from the `cloudflare/sandbox` image whose tag matches the installed `@cloudflare/sandbox` version:

  ```dockerfile
  COPY --from=docker.io/cloudflare/sandbox:<VERSION> /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim
  ```

  The helper is a statically linked `linux/amd64` binary. It runs in any `linux/amd64` image.
- The Worker has the [`nodejs_compat`](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) compatibility flag. The package reads Linux error names through `node:os`.
- The container is running when a method is called.

## Example configuration

This configuration meets every requirement. The `Dockerfile` copies the helper into a Debian Trixie image with Node.js 24, and `sleep infinity` keeps the container running:

*Dockerfiledockerfile*

```dockerfile
FROM node:24-trixie-slim

COPY --from=docker.io/cloudflare/sandbox:1.0.0 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

RUN mkdir /workspace
CMD ["sleep", "infinity"]
```

The Wrangler configuration sets `nodejs_compat`, builds the `Dockerfile` as the image named `workspace`, and declares `MyContainer` as a Durable Object class:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "sandbox-files",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-09-30",
	"compatibility_flags": ["nodejs_compat"],
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
			"images": {
				"workspace": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"class_name": "MyContainer",
				"name": "MY_CONTAINER",
			},
		],
	},
	"exports": {
		"MyContainer": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

```toml
"$schema" = "node_modules/wrangler/config-schema.json"
name = "sandbox-files"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-09-30"
compatibility_flags = [ "nodejs_compat" ]

[[containers]]
class_name = "MyContainer"
scheduling_policy = "durable_object"

[containers.images.workspace]
dockerfile = "./Dockerfile"

[[durable_objects.bindings]]
class_name = "MyContainer"
name = "MY_CONTAINER"

[exports.MyContainer]
type = "durable-object"
storage = "sqlite"
```

The Durable Object starts the `workspace` image and passes the container to a class from the package:

*src/index.jsjs*

```js
import { Files } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export class MyContainer extends DurableObject {
	container;
	files;

	constructor(ctx, env) {
		super(ctx, env);
		const container = ctx.container;

		if (!container) {
			throw new Error("The container binding is not configured");
		}

		this.container = container;
		// ctx.container stays the same object while the Durable Object runs.
		this.files = new Files(container);

		// A restarted Durable Object sets the timeout again.
		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	async listWorkspace() {
		// Files does not start the container.
		if (!this.container.running) {
			this.container.start({
				image: this.container.images.workspace,
				enableInternet: false,
			});
			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}

		return this.files.readDirectory("/workspace");
	}
}
```

*src/index.tsts*

```ts
import { Files } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export class MyContainer extends DurableObject<Env> {
	private readonly container: Container;
	private readonly files: Files;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;

		if (!container) {
			throw new Error("The container binding is not configured");
		}

		this.container = container;
		// ctx.container stays the same object while the Durable Object runs.
		this.files = new Files(container);

		// A restarted Durable Object sets the timeout again.
		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	async listWorkspace() {
		// Files does not start the container.
		if (!this.container.running) {
			this.container.start({
				image: this.container.images.workspace,
				enableInternet: false,
			});
			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}

		return this.files.readDirectory("/workspace");
	}
}
```

For more information about building images, refer to [`images`](https://developers.cloudflare.com/containers/api/durable-object-container/#images).

## Classes

- [Files API](https://developers.cloudflare.com/sandbox/reference/files/)
- [S3Mount API](https://developers.cloudflare.com/sandbox/reference/s3-mounts/)
- [DirectoryBackup API](https://developers.cloudflare.com/sandbox/reference/directory-backups/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/reference/#page","headline":"@cloudflare/sandbox","description":"Install @cloudflare/sandbox and prepare the container image and Worker that its classes require.","url":"https://developers.cloudflare.com/sandbox/reference/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/reference/og.png?v=257cc07fb6b73110","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
