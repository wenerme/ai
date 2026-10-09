---
description: Record when and why a sandbox stops, including stops that happen while no requests arrive.
title: Run code when a sandbox stops
image: https://developers.cloudflare.com/sandbox/manage/run-code-when-a-sandbox-stops/og.png?v=a0191d0c5616d943
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run code when a sandbox stops

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/manage/run-code-when-a-sandbox-stops/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The runtime does not wake a Durable Object when its container stops. Your Durable Object watches the container while the Durable Object is in memory, and checks for a missed stop on every command and alarm. In this example, the Durable Object also stops idle sandboxes itself, so the record shows why each one stopped.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).

## Record each stop

1. At the top of `src/index.ts`, define the check interval, the idle limit, the inactivity timeout, and the record your Durable Object keeps:

   *src/index.tsts*



   ```ts
   const CHECK_INTERVAL_MS = 60 * 1000;
   // Stop a sandbox after this long without requests
   const IDLE_LIMIT_MS = 10 * 60 * 1000;
   const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;

   interface SandboxRecord {
   	state: "running" | "stopped";
   	lastActivity: number;
   	reason?: string;
   	exitCode?: number | null;
   	stoppedAt?: number;
   }
   ```

   Keep the inactivity timeout longer than the check interval, so the container keeps running between alarms. While `monitor()` waits, the inactivity timeout does not start, so the alarm enforces the idle limit. If the alarms stop, the timeout still stops the container after the Durable Object leaves memory. For more information, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#activity-keeps-an-instance-running).
2. In `MyContainer`, add a constructor, a method that watches the container, and a method that records the stop:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	constructor(ctx: DurableObjectState, env: Env) {
   		super(ctx, env);
   		const container = ctx.container;
   		// A restarted Durable Object loses the earlier `monitor()` call and the
   		// inactivity timeout
   		if (container?.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
   			);
   			this.watch();
   		}
   	}

   	watch() {
   		this.ctx.container?.monitor().then(
   			() => this.onStop("exited", 0),
   			(error: unknown) => {
   				const exitCode = (error as { exitCode?: number }).exitCode;
   				if (exitCode === undefined) {
   					return this.onStop(String(error), null);
   				}
   				return this.onStop("exited", exitCode);
   			},
   		);
   	}

   	async onStop(reason: string, exitCode: number | null) {
   		const record = await this.ctx.storage.get<SandboxRecord>("sandbox");
   		// Record each stop once, even when two checks report it
   		if (record?.state !== "running") {
   			return;
   		}

   		await this.ctx.storage.put<SandboxRecord>("sandbox", {
   			...record,
   			state: "stopped",
   			reason,
   			exitCode,
   			stoppedAt: Date.now(),
   		});
   		await this.ctx.storage.deleteAlarm();
   		console.log(JSON.stringify({ event: "sandbox.stopped", reason, exitCode }));
   	}
   }
   ```

   When the main process fails, [`monitor()`](https://developers.cloudflare.com/containers/api/durable-object-container/#monitor) rejects with an error that has an `exitCode`. When your code calls `destroy()` with a reason, `monitor()` rejects with that reason. Put your own code after the record is saved.
3. Add a method that records a stop that `monitor()` missed:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async reconcile() {
   		const record = await this.ctx.storage.get<SandboxRecord>("sandbox");
   		if (record?.state === "running" && !this.ctx.container?.running) {
   			// A stop that happened while the Durable Object was not in memory has
   			// no exit code
   			await this.onStop("unknown", null);
   		}
   	}
   }
   ```

4. Replace `exec()`. It checks for a missed stop, watches a container it starts, schedules the next check, and records activity when the command finishes:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	// Count the commands that are running. A request in progress keeps the
   	// Durable Object in memory, so the count does not need storage
   	busy = 0;

   	async exec(argv: string[]) {
   		const container = this.ctx.container;
   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		await this.reconcile();
   		if (!container.running) {
   			container.start({
   				image: "cloudflare/debian-trixie",
   				entrypoint: ["sleep", "infinity"],
   				enableInternet: false,
   			});
   			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   			this.watch();
   		}
   		await this.ctx.storage.put<SandboxRecord>("sandbox", {
   			state: "running",
   			lastActivity: Date.now(),
   		});
   		await this.ctx.storage.setAlarm(Date.now() + CHECK_INTERVAL_MS);

   		this.busy++;
   		try {
   			const process = await container.exec(argv);
   			const output = await process.output();
   			return {
   				stdout: new TextDecoder().decode(output.stdout),
   				exitCode: output.exitCode,
   			};
   		} finally {
   			this.busy--;
   			const record = await this.ctx.storage.get<SandboxRecord>("sandbox");
   			if (record?.state === "running") {
   				await this.ctx.storage.put<SandboxRecord>("sandbox", {
   					...record,
   					lastActivity: Date.now(),
   				});
   			}
   		}
   	}
   }
   ```

   The alarm does not stop the sandbox while a command is running, even when the command runs longer than the idle limit.
5. Add an alarm handler that checks the sandbox and stops it after `IDLE_LIMIT_MS` without requests. Then add methods that return the record and stop the sandbox:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async alarm() {
   		await this.reconcile();
   		const record = await this.ctx.storage.get<SandboxRecord>("sandbox");
   		if (record?.state !== "running") {
   			return;
   		}

   		if (this.busy === 0 && Date.now() - record.lastActivity > IDLE_LIMIT_MS) {
   			await this.ctx.container?.destroy("idle");
   			return;
   		}
   		await this.ctx.storage.setAlarm(Date.now() + CHECK_INTERVAL_MS);
   	}

   	async status() {
   		return (await this.ctx.storage.get<SandboxRecord>("sandbox")) ?? null;
   	}

   	async stop() {
   		await this.ctx.container?.destroy("stopped");
   	}
   }
   ```

   The reason passed to `destroy()` reaches `monitor()`, so an idle stop records `idle` and a stop through `stop()` records `stopped`.

   A Durable Object has one alarm. If your class already has an `alarm()` handler, merge the stop and idle checks into it, and set the alarm to the earliest time that any check needs. For more information, refer to [Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/).
6. Add routes to your Worker. `GET` returns the record, `DELETE` stops the sandbox, and `POST` runs a command:

   *src/index.tsts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const sandbox = env.MY_CONTAINER.getByName("sandbox");

   		if (request.method === "GET") {
   			return Response.json(await sandbox.status());
   		}

   		if (request.method === "DELETE") {
   			await sandbox.stop();
   			return new Response(null, { status: 204 });
   		}

   		const { argv } = (await request.json()) as { argv: string[] };
   		return Response.json(await sandbox.exec(argv));
   	},
   };
   ```

   Authenticate callers first, so other people cannot use or stop the sandbox. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/).
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

8. Run a command, stop the sandbox, and read the record, on the `workers.dev` URL that Wrangler prints:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev --request POST --json '{"argv":["uname","-s"]}'
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev --request DELETE
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev
   ```

   ```json
   {
   	"state": "stopped",
   	"lastActivity": 1790270030663,
   	"reason": "stopped",
   	"exitCode": null,
   	"stoppedAt": 1790270031496
   }
   ```

   Run another command and send no requests for 10 minutes. The next alarm stops the sandbox, and the record shows `"reason": "idle"`. A deploy while the sandbox runs does not record a stop.

## Reasons in the record

The `reason` field shows how the sandbox stopped:

| Reason | Meaning |
| --- | --- |
| `exited` | The main process exited. `exitCode` holds its exit code. |
| `idle` or `stopped` | Your Durable Object called `destroy()` with this reason. |
| `unknown` | The container stopped while the Durable Object was not in memory, and a later command or alarm found it stopped. The exit code is not available. |
| Any other text | The error from `monitor()` when the container failed. |

## Related resources

- [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/): what keeps a sandbox running, and what stops it.
- [Save a sandbox automatically](https://developers.cloudflare.com/sandbox/files/save-a-sandbox-automatically/): save a snapshot before an idle stop.
- [List a user's sandboxes](https://developers.cloudflare.com/sandbox/manage/list-sandboxes/)
- [`monitor()`](https://developers.cloudflare.com/containers/api/durable-object-container/#monitor) and [`destroy()`](https://developers.cloudflare.com/containers/api/durable-object-container/#destroy)
- [Durable Object alarms](https://developers.cloudflare.com/durable-objects/api/alarms/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/manage/run-code-when-a-sandbox-stops/#page","headline":"Run code when a sandbox stops","description":"Record when and why a sandbox stops, including stops that happen while no requests arrive.","url":"https://developers.cloudflare.com/sandbox/manage/run-code-when-a-sandbox-stops/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/manage/run-code-when-a-sandbox-stops/og.png?v=a0191d0c5616d943","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
