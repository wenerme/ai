---
description: Replace the Sandbox class from @cloudflare/sandbox 0.12, or your subclass of it, with a Durable Object class that starts its own container.
title: Replace the Sandbox class
image: https://developers.cloudflare.com/sandbox/sdk/migrate/replace-the-sandbox-class/og.png?v=5defa52ddfaf0224
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Replace the Sandbox class

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/migrate/replace-the-sandbox-class/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Replace the 0.12 `Sandbox` class with a Durable Object class that you write. In 0.12, your Worker calls package methods through `getSandbox()`. In 1.0, your class starts the container through `this.ctx.container`, and your Worker calls the methods that your class defines.

## Before you start

Your application runs `@cloudflare/sandbox` 0.12.10. This page replaces the `Sandbox` class, whether you export it from the package or extend it. It also replaces `getSandbox()` and its options, class fields such as `sleepAfter` and `envVars`, and the hooks `onStart()`, `onStop()`, `onError()`, and `onActivityExpired()`.

The page ends with the Worker running under `wrangler dev`. You cannot undo the deploy that switches your sandboxes to 1.0. Before you deploy, follow [Plan the move to Sandbox SDK 1.0](https://developers.cloudflare.com/sandbox/sdk/migrate/plan-the-move/).

The steps keep your class name, which moves every sandbox in place. To move sandboxes side by side, write the class under a new name, such as `SandboxV1`, and add its Wrangler configuration as [Move sandboxes side by side](https://developers.cloudflare.com/sandbox/sdk/migrate/move-side-by-side/) describes.

## Replace the class

1. Install version 1 of the package:npmyarnpnpmbun

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


2. Replace the `FROM docker.io/cloudflare/sandbox` line in your `Dockerfile` with a base image that has the tools your commands use, and copy the `sandbox-shim` helper into it:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   RUN apt-get update \
   	&& apt-get install -y --no-install-recommends \
   		ca-certificates git python3 \
   	&& rm -rf /var/lib/apt/lists/*

   COPY --from=docker.io/cloudflare/sandbox:1.0.0 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

   WORKDIR /workspace
   CMD ["sleep", "infinity"]
   ```

   The 0.12 image included Python, Node.js, and Git. Keep the ones your commands use. `Files` and `S3Mount` need `sandbox-shim`. Match its tag to the `@cloudflare/sandbox` version that you installed. Remove `EXPOSE` lines, which 1.0 does not use. Commands that `exec()` runs do not see `ENV` lines, so pass those values in the `env` option instead.
3. Change the `containers` entry for your class in the Wrangler configuration. Keep your class name and its binding, so each name reaches the Durable Object and storage it reached in 0.12. Replace `my-worker-mysandbox-v2` with a name that your account does not use yet:

   ```jsonc
   {
   	"containers": [
   		{
   			"class_name": "MySandbox",
   			"name": "my-worker-mysandbox-v2",
   			"scheduling_policy": "durable_object",
   			"images": {
   				"sandbox": {
   					"dockerfile": "./Dockerfile",
   				},
   			},
   		},
   	],
   }
   ```

   ```toml
   [[containers]]
   class_name = "MySandbox"
   name = "my-worker-mysandbox-v2"
   scheduling_policy = "durable_object"

   [containers.images.sandbox]
   dockerfile = "./Dockerfile"
   ```

   The new entry makes these changes:
   - `scheduling_policy: "durable_object"` lets each Durable Object start its own container. This policy does not accept `image`, `instance_type`, or `max_instances`, so remove them. The `Dockerfile` moves to `images`, and the instance type moves to `start()`.
   - The container application gets a new `name`. Without one, the new application takes the name that Wrangler generated for the old application, and the deploy fails after the new Worker version is already live.
   - Leave `durable_objects` and your `migrations` or `exports` as they are. The class keeps its name, so it needs no class migration.

   Also remove `SANDBOX_TRANSPORT`, `SANDBOX_INSTANCE_TIMEOUT_MS`, `SANDBOX_PORT_TIMEOUT_MS`, and `SANDBOX_POLL_INTERVAL_MS` from `vars`, and keep `nodejs_compat`, which 1.0 requires.
4. Check your compatibility date.

   Note

   `this.ctx.exports` is `undefined` before compatibility date `2025-11-17`, unless you add the `enable_ctx_exports` compatibility flag. The migration pages for outbound rules and bucket mounts use it. Several 0.12 templates set `2025-05-06`.
5. Generate types for the new configuration:npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```


6. Write the class. In this example, the 0.12 subclass sets a lifetime and environment variables, and overrides `onStart()`:

   *src/index.ts (0.12)ts*



   ```ts
   import { getSandbox, Sandbox } from "@cloudflare/sandbox";

   export class MySandbox extends Sandbox<Env> {
   	sleepAfter = "30m";
   	envVars = { NODE_ENV: "test" };

   	override async onStart() {
   		await this.ctx.storage.put("startedAt", Date.now());
   	}
   }
   ```

   In 1.0, the class extends `DurableObject` and starts the container itself:

   *src/index.ts (1.0)ts*



   ```ts
   import { DurableObject } from "cloudflare:workers";

   // Replaces sleepAfter and envVars.
   const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;
   const ENV = { NODE_ENV: "test" };

   export class MySandbox extends DurableObject<Env> {
   	constructor(ctx: DurableObjectState, env: Env) {
   		super(ctx, env);
   		const container = ctx.container;
   		// A restarted Durable Object sets the timeout again.
   		if (container?.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(
   					INACTIVITY_TIMEOUT_MS,
   				),
   			);
   		}
   	}

   	private get container(): Container {
   		const container = this.ctx.container;

   		if (!container) {
   			throw new Error(
   				"The container binding is not configured",
   			);
   		}

   		return container;
   	}

   	private setup: Promise<void> | null = null;

   	private ensureRunning(): Promise<void> {
   		// Set up each new container, and a running container
   		// after this Durable Object restarts.
   		if (this.setup === null || !this.container.running) {
   			this.setup = this.startContainer().catch((error) => {
   				this.setup = null;
   				throw error;
   			});
   		}
   		return this.setup;
   	}

   	private async startContainer(): Promise<void> {
   		const newContainer = !this.container.running;

   		if (newContainer) {
   			this.container.start({
   				image: this.container.images.sandbox,
   				instance: "standard-1",
   				env: ENV,
   				// 0.12 allowed Internet access by default.
   				enableInternet: true,
   			});
   		}

   		try {
   			if (newContainer) {
   				// Replaces onStart().
   				await this.ctx.storage.put("startedAt", Date.now());
   			}
   			await this.container.setInactivityTimeout(
   				INACTIVITY_TIMEOUT_MS,
   			);
   		} catch (error) {
   			// The next request starts a new container.
   			await this.container.destroy();
   			throw error;
   		}
   	}
   }
   ```

   Call `ensureRunning()` before each use of the container. It runs `startContainer()` once for each new container, and once more when a restarted Durable Object finds the container running. A deploy restarts the Durable Object and can stop setup partway, so every step after `start()` must be safe to run again. `running` is `true` as soon as `start()` returns, so requests that arrive during setup wait for the same `startContainer()` call. If a setup step throws, `startContainer()` stops the container, so no request runs commands in a container that is not set up.

   `start()` returns before the container is ready, and the first `exec()` waits for it. The inactivity timeout does not survive a Durable Object restart. The constructor sets it again when a restarted Durable Object finds the container running. The timeout accepts at most 6 hours. If your commands do not need the Internet, set `enableInternet` to `false`.
7. Replace each class field and `getSandbox()` option that your code sets:

   | 0.12 | 1.0 |
   | --- | --- |
   | `sleepAfter` | `setInactivityTimeout()` after `start()`, and again in the constructor. |
   | `keepAlive` | An [alarm](https://developers.cloudflare.com/durable-objects/api/alarms/) that runs more often than the inactivity timeout while work remains. |
   | `envVars`, `setEnvVars()` | `env` on `start()` for the main process, and `env` on each `exec()` call. Commands do not inherit the `start()` variables, except `PATH`. |
   | `entrypoint` | `entrypoint` on `start()`, or `CMD` in the image. |
   | `enableInternet` | `enableInternet` on `start()`, which every call must pass. 0.12 defaulted to `true`. |
   | `labels`, `setLabels()` | `labels` on `start()`. |
   | `defaultPort`, `requiredPorts` | `this.container.getTcpPort(port)`. Refer to [Move preview URLs](https://developers.cloudflare.com/sandbox/sdk/migrate/preview-urls/). |
   | `allowedHosts`, `deniedHosts`, `outboundByHost`, `outbound`, `interceptHttps` | Refer to [Move outbound rules](https://developers.cloudflare.com/sandbox/sdk/migrate/outbound-traffic/). |
   | `normalizeId` | Lowercase the name before `getByName()`. |
   | `containerTimeouts` | An `AbortSignal` on the calls that need a deadline. Refer to [Replace timeouts](https://developers.cloudflare.com/sandbox/sdk/migrate/commands/#replace-timeouts). |
   | `enableDefaultSession` | Nothing. Each `exec()` call is its own process. Refer to [Replace sessions](https://developers.cloudflare.com/sandbox/sdk/migrate/commands/#replace-sessions). |
   | `transport`, `pingEndpoint` | Nothing. Remove them. |
8. Replace the hooks your subclass overrides:
   - `onStart()`: run the code in `startContainer()`, inside `if (newContainer)`, as in the class from the previous step.
   - `onStop()` and `onError()`: watch the container with [`monitor()`](https://developers.cloudflare.com/containers/api/durable-object-container/#monitor), and catch errors where you call `start()` and `exec()`.
   - `onActivityExpired()`: no code runs before the inactivity timeout stops the container. To run code first, keep your own idle deadline in an alarm, and call `this.container.destroy()` when it passes. For an example that saves the sandbox before it stops, refer to [Save a sandbox automatically](https://developers.cloudflare.com/sandbox/files/save-a-sandbox-automatically/).

   To watch the container, call a method like this one in the `try` block of `startContainer()`. A restarted Durable Object runs `startContainer()` again, so it watches the running container too:

   *src/index.tsts*



   ```ts
   export class MySandbox extends DurableObject<Env> {
   	// ...

   	private watch(): void {
   		this.container.monitor().then(
   			() => console.log("Exited with code 0"),
   			(error: unknown) => console.error("Stopped", error),
   		);
   	}
   }
   ```

   `monitor()` resolves when the main process exits with code `0` or `destroy()` stops the container without a reason. It rejects when the process fails or `destroy()` passes a reason. The call ends when the Durable Object restarts, so it misses a stop that happens before the next request. While the call waits, the inactivity timeout does not start, so a watched container keeps running past the timeout. For more information, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#activity-keeps-an-instance-running). For a record of every stop, refer to [Run code when a sandbox stops](https://developers.cloudflare.com/sandbox/manage/run-code-when-a-sandbox-stops/).
9. Move the calls your Worker makes into methods on the class. In 0.12, the Worker calls package methods on the stub that `getSandbox()` returns:

   *src/index.ts (0.12)ts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const id = new URL(request.url).pathname.slice(1);
   		const sandbox = getSandbox(env.MY_SANDBOX, id, {
   			normalizeId: true,
   		});
   		const result = await sandbox.exec("npm test", {
   			cwd: "/workspace/app",
   		});

   		return Response.json({
   			exitCode: result.exitCode,
   			output: result.stdout,
   		});
   	},
   };
   ```

   In 1.0, the stub has only the methods your class defines. Add a method to `MySandbox`, and call it from the Worker:

   *src/index.ts (1.0)ts*



   ```ts
   export class MySandbox extends DurableObject<Env> {
   	// ...

   	async test(): Promise<{ exitCode: number; output: string }> {
   		await this.ensureRunning();

   		const process = await this.container.exec(["npm", "test"], {
   			cwd: "/workspace/app",
   			env: ENV,
   		});
   		const result = await process.output();

   		return {
   			exitCode: result.exitCode,
   			output: new TextDecoder().decode(result.stdout),
   		};
   	}
   }
   ```

   *src/index.ts (1.0)ts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const id = new URL(request.url).pathname.slice(1);
   		// Replaces normalizeId: true.
   		const sandbox = env.MY_SANDBOX.getByName(id.toLowerCase());

   		return Response.json(await sandbox.test());
   	},
   } satisfies ExportedHandler<Env>;
   ```

   Move the methods that your 0.12 subclass defines into the 1.0 class. Your Worker calls them on the stub as it did in 0.12. Inside those methods, replace `this.exec()` and other package calls with calls on `this.container`. For each kind of call, refer to [Change command calls](https://developers.cloudflare.com/sandbox/sdk/migrate/commands/) and the feature pages in [Migrate from Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/migrate/).

## Check the class

Start your Worker locally:

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

Wrangler builds the image when it starts. Send a request to each route that uses a sandbox. The first request for each name starts a container and waits for it. Each route returns what it returned on 0.12.

## Next steps

- To deploy the new class, follow [Plan the move to Sandbox SDK 1.0](https://developers.cloudflare.com/sandbox/sdk/migrate/plan-the-move/).
- To change `exec()` and sessions, refer to [Change command calls](https://developers.cloudflare.com/sandbox/sdk/migrate/commands/).
- To change file calls, refer to [Change file calls](https://developers.cloudflare.com/sandbox/sdk/migrate/files/).
- For the methods on `this.ctx.container`, refer to the [Container API](https://developers.cloudflare.com/containers/api/durable-object-container/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/sdk/migrate/replace-the-sandbox-class/#page","headline":"Replace the Sandbox class","description":"Replace the Sandbox class from @cloudflare/sandbox 0.12, or your subclass of it, with a Durable Object class that starts its own container.","url":"https://developers.cloudflare.com/sandbox/sdk/migrate/replace-the-sandbox-class/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/migrate/replace-the-sandbox-class/og.png?v=5defa52ddfaf0224","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
