---
description: Stream a file from your Worker into a Linux sandbox, run a command on it, and stream the output file back to the caller.
title: Move files in and out of a sandbox
image: https://developers.cloudflare.com/sandbox/files/manage-files/og.png?v=145e8247eda37df9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Move files in and out of a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/files/manage-files/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide streams an uploaded file into a sandbox, compresses it with `gzip`, and streams the compressed file back to the caller.

The `Files` class from `@cloudflare/sandbox` reads and writes files in a running Linux instance, and [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec) runs the command. `Files` does not start the instance, so your Durable Object starts it before each file operation.

## Prerequisites

- A Worker project from [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/). This project uses a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy).

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗︎](https://docs.docker.com/desktop/). Other tools like [Colima ↗︎](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## Run a command on an uploaded file

1. Install the package:npmyarnpnpmbun

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


2. To give `Files` its helper binary, create a `Dockerfile` in the project root. If you already have one, add the `COPY` line to it:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   COPY --from=docker.io/cloudflare/sandbox:1.0.0 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

   RUN mkdir /workspace
   CMD ["sleep", "infinity"]
   ```

   The `cloudflare/sandbox` tag must match the installed package version. A mismatch causes `SandboxProtocolError`. Replace the `FROM` line with the base image your commands need.
3. To build the image, add the `nodejs_compat` flag to `wrangler.jsonc` and replace the `containers` entry:

   ```jsonc
   {
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
   }
   ```

   ```toml
   compatibility_flags = [ "nodejs_compat" ]

   [[containers]]
   class_name = "MyContainer"
   scheduling_policy = "durable_object"

   [containers.images.workspace]
   dockerfile = "./Dockerfile"
   ```

   The `workspace` key names the image. Your code starts it as `container.images.workspace`.
4. To start an instance before each file operation, replace `src/index.ts` with a `MyContainer` class that has a `startSandbox()` method:

   *src/index.jsjs*



   ```js
   import { Files } from "@cloudflare/sandbox";
   import { DurableObject } from "cloudflare:workers";

   const workspace = "/workspace";
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
   		this.files = new Files(container);

   		// A restarted Durable Object sets the timeout again.
   		if (container.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
   			);
   		}
   	}

   	// Files does not start an instance, so start one before each operation.
   	async startSandbox() {
   		if (!this.container.running) {
   			this.container.start({
   				image: this.container.images.workspace,
   				enableInternet: false,
   			});
   			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   		}
   	}
   }
   ```

   *src/index.tsts*



   ```ts
   import { Files } from "@cloudflare/sandbox";
   import { DurableObject } from "cloudflare:workers";

   const workspace = "/workspace";
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
   		this.files = new Files(container);

   		// A restarted Durable Object sets the timeout again.
   		if (container.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
   			);
   		}
   	}

   	// Files does not start an instance, so start one before each operation.
   	private async startSandbox(): Promise<void> {
   		if (!this.container.running) {
   			this.container.start({
   				image: this.container.images.workspace,
   				enableInternet: false,
   			});
   			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   		}
   	}
   }
   ```

   The constructor creates one `Files` object for the Durable Object, because `this.ctx.container` stays the same object for as long as the Durable Object runs. `startSandbox()` starts the `workspace` image when no instance is running, and sets the inactivity timeout after `start()`. For more information, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#the-timeout-does-not-survive-a-restart).
5. To write the upload, run the command, and return the output file, add a `compress()` method to `MyContainer`:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async compress(upload: ReadableStream<Uint8Array>): Promise<Response> {
   		await this.startSandbox();
   		const name = crypto.randomUUID();

   		await this.files.writeFile(name, upload, { cwd: workspace });

   		const process = await this.container.exec(["gzip", "--force", name], {
   			cwd: workspace,
   		});
   		const output = await process.output();

   		if (output.exitCode !== 0) {
   			throw new Error(new TextDecoder().decode(output.stderr));
   		}

   		return this.files.readFile(`${name}.gz`, { cwd: workspace });
   	}
   }
   ```

   `writeFile()` streams the upload into the file, and `readFile()` returns a `Response` that streams the output file back. Neither method holds a whole file in the memory of the Durable Object. `output()` holds only what `gzip` prints, and that output counts toward the [memory limit](https://developers.cloudflare.com/workers/platform/limits/#memory).

   A Linux failure, such as a full disk, throws `SandboxFileError`. Its `code` holds the Linux error name, such as `ENOSPC`. To handle other errors, refer to [Files errors](https://developers.cloudflare.com/sandbox/reference/files/#errors).
6. To send uploads to `compress()`, add a default export to `src/index.ts`:

   *src/index.jsjs*



   ```js
   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);
   		const match =
   			/^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/compress$/.exec(
   				url.pathname,
   			);

   		if (!match || request.method !== "POST" || !request.body) {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName(match[1]);
   		return sandbox.compress(request.body);
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const url = new URL(request.url);
   		const match = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/compress$/.exec(url.pathname);

   		if (!match || request.method !== "POST" || !request.body) {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName(match[1]);
   		return sandbox.compress(request.body);
   	},
   } satisfies ExportedHandler<Env>;
   ```

   Caution

   This route reads the sandbox name from the URL, so any caller can reach any sandbox. In production, derive the name from the authenticated caller. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#the-sandbox-name-decides-what-a-request-reaches).
7. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```


8. To test the Worker, upload a file to the sandbox named `ada` and save the response. Replace the hostname with the `workers.dev` URL that Wrangler prints:

   ```sh
   printf 'Ada Lovelace\nGrace Hopper\n' | curl \
     https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/compress \
     --data-binary @- \
     --fail-with-body \
     --output names.txt.gz
   ```


9. Decompress the response:

   ```sh
   gunzip --stdout names.txt.gz
   ```

   ```txt
   Ada Lovelace
   Grace Hopper
   ```



## List, rename, and remove files

`Files` has methods for other file operations. Each method accepts the same `cwd` option as `writeFile()` and `readFile()`:

| Method | Use it to |
| --- | --- |
| `readDirectory()` | List directory entries |
| `stat()` | Read the type, size, owner, and timestamps of a path |
| `mkdir()` | Create a directory |
| `rename()` | Rename or move a file or directory |
| `remove()` | Delete a file, or a directory with `recursive: true` |

Compressed files stay in `/workspace` until the instance stops. To delete a file sooner, call `remove()` after the caller has read the response.

For more information, refer to [Files API](https://developers.cloudflare.com/sandbox/reference/files/).

## Accept paths from callers

Some applications let callers choose paths, such as a file browser. `Files` does not restrict which paths it opens. To keep a request inside one directory, check each path before you pass it to `Files`.

This example adds a `download()` method that accepts only relative paths without `..`, and returns `404` for a missing file:

*src/index.jsjs*

```js
import { SandboxFileError } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

const workspace = "/workspace";

// Accept only relative paths that stay inside cwd.
function workspacePath(path) {
	if (
		path === "" ||
		path.startsWith("/") ||
		path.includes("\0") ||
		path.split("/").includes("..")
	) {
		return null;
	}

	return path;
}

export class MyContainer extends DurableObject {
	// ...

	async download(path) {
		const relativePath = workspacePath(path);

		if (!relativePath) {
			return new Response("Invalid path", { status: 400 });
		}

		await this.startSandbox();

		try {
			return await this.files.readFile(relativePath, { cwd: workspace });
		} catch (error) {
			if (SandboxFileError.is(error) && error.code === "ENOENT") {
				return new Response("Not found", { status: 404 });
			}

			throw error;
		}
	}
}
```

*src/index.tsts*

```ts
import { SandboxFileError } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

const workspace = "/workspace";

// Accept only relative paths that stay inside cwd.
function workspacePath(path: string): string | null {
	if (
		path === "" ||
		path.startsWith("/") ||
		path.includes("\0") ||
		path.split("/").includes("..")
	) {
		return null;
	}

	return path;
}

export class MyContainer extends DurableObject<Env> {
	// ...

	async download(path: string): Promise<Response> {
		const relativePath = workspacePath(path);

		if (!relativePath) {
			return new Response("Invalid path", { status: 400 });
		}

		await this.startSandbox();

		try {
			return await this.files.readFile(relativePath, { cwd: workspace });
		} catch (error) {
			if (SandboxFileError.is(error) && error.code === "ENOENT") {
				return new Response("Not found", { status: 404 });
			}

			throw error;
		}
	}
}
```

Caution

The check applies only to the path in the request. It does not isolate files inside the sandbox. Code in the sandbox can still create a symbolic link in `/workspace` that points elsewhere in the sandbox.

The `user` option, such as `user: "1000:1000"`, does not narrow access either. It sets the owner of files that `Files` creates. The helper can still open files that the user has no permission for.

For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#everything-in-one-sandbox-is-shared).

## Related resources

- [Files API](https://developers.cloudflare.com/sandbox/reference/files/): every method, including `readDirectory()`, `rename()`, and `remove()`.
- [Save and restore a sandbox with snapshots](https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/): keep the files after the instance stops.
- [Mount an R2 bucket](https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/): write files that other systems read.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/files/manage-files/#page","headline":"Move files in and out of a sandbox","description":"Stream a file from your Worker into a Linux sandbox, run a command on it, and stream the output file back to the caller.","url":"https://developers.cloudflare.com/sandbox/files/manage-files/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/files/manage-files/og.png?v=145e8247eda37df9","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
