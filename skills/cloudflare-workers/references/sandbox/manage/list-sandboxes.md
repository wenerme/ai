---
description: Record each user's sandboxes in a Durable Object, and report which ones are running.
title: List a user's sandboxes
image: https://developers.cloudflare.com/sandbox/manage/list-sandboxes/og.png?v=be39d7aa50959554
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# List a user's sandboxes

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/manage/list-sandboxes/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Each user gets a registry, a Durable Object that records the sandboxes of that user. In this example, the Worker adds a sandbox to the registry when the sandbox first runs a command. To report which sandboxes are running, the Worker asks the Durable Object of each sandbox whether its container is running.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).

## List the sandboxes

1. In `wrangler.jsonc`, add a binding for the registry class, and declare the class in `exports`:

   ```jsonc
   {
   	"durable_objects": {
   		"bindings": [
   			{
   				"class_name": "MyContainer",
   				"name": "MY_CONTAINER",
   			},
   			{
   				"class_name": "SandboxDirectory",
   				"name": "SANDBOX_DIRECTORY",
   			},
   		],
   	},
   	"exports": {
   		"MyContainer": {
   			"type": "durable-object",
   			"storage": "sqlite",
   		},
   		"SandboxDirectory": {
   			"type": "durable-object",
   			"storage": "sqlite",
   		},
   	},
   }
   ```

   ```toml
   [[durable_objects.bindings]]
   class_name = "MyContainer"
   name = "MY_CONTAINER"

   [[durable_objects.bindings]]
   class_name = "SandboxDirectory"
   name = "SANDBOX_DIRECTORY"

   [exports.MyContainer]
   type = "durable-object"
   storage = "sqlite"

   [exports.SandboxDirectory]
   type = "durable-object"
   storage = "sqlite"
   ```

   If your Worker declares its classes with a `migrations` array instead, add a migration with a new `tag` and `"new_sqlite_classes": ["SandboxDirectory"]`. For more information, refer to [Durable Object class migrations (legacy)](https://developers.cloudflare.com/durable-objects/reference/durable-object-class-migrations-legacy/).npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```


2. Add the registry class to your Worker. Each user gets one `SandboxDirectory`, which stores the user's sandbox sessions in SQLite:

   *src/index.tsts*



   ```ts
   export class SandboxDirectory extends DurableObject<Env> {
   	constructor(ctx: DurableObjectState, env: Env) {
   		super(ctx, env);
   		ctx.storage.sql.exec(
   			"CREATE TABLE IF NOT EXISTS sandboxes (session TEXT PRIMARY KEY, created_at INTEGER NOT NULL)",
   		);
   	}

   	add(session: string) {
   		// Keep the time of the first command when the same session runs again
   		this.ctx.storage.sql.exec(
   			"INSERT OR IGNORE INTO sandboxes (session, created_at) VALUES (?, ?)",
   			session,
   			Date.now(),
   		);
   	}

   	remove(session: string) {
   		this.ctx.storage.sql.exec("DELETE FROM sandboxes WHERE session = ?", session);
   	}

   	list() {
   		return this.ctx.storage.sql
   			.exec<{ session: string }>("SELECT session FROM sandboxes ORDER BY created_at")
   			.toArray()
   			.map((row) => row.session);
   	}
   }
   ```


3. In `MyContainer`, set an inactivity timeout, and add methods that report and stop the container. Define the timeout at the top of the file, and add a constructor that sets it when a restarted Durable Object finds the container running:

   *src/index.tsts*



   ```ts
   const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

   export class MyContainer extends DurableObject<Env> {
   	constructor(ctx: DurableObjectState, env: Env) {
   		super(ctx, env);
   		const container = ctx.container;
   		if (container?.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
   			);
   		}
   	}
   }
   ```

   In `exec()`, set the timeout after `start()`, inside the `if (!container.running)` block:

   *src/index.tsts*



   ```ts
   await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   ```

   Then add the two methods to `MyContainer`:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	isRunning() {
   		// Reading `running` does not start the container
   		return this.ctx.container?.running ?? false;
   	}

   	async destroy() {
   		await this.ctx.container?.destroy();
   	}
   }
   ```

   A listing request can wake a restarted Durable Object, which starts without the timeout that `exec()` set. The constructor sets the timeout again, so the sandbox does not stop shortly after the listing request ends. For more information, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#the-timeout-does-not-survive-a-restart).
4. Add routes to your Worker that name each sandbox `<OWNER>/<SESSION>`, record the session before running a command, list the sessions with their state, and remove a session after stopping its container:

   *src/index.tsts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const url = new URL(request.url);
   		const [, users, owner, sandboxes, session] = url.pathname.split("/");

   		if (users !== "users" || !owner || sandboxes !== "sandboxes") {
   			return new Response("Not found", { status: 404 });
   		}

   		const directory = env.SANDBOX_DIRECTORY.getByName(owner);

   		if (request.method === "GET" && !session) {
   			const sessions = await directory.list();
   			// Call the Durable Object of every session in parallel
   			const list = await Promise.all(
   				sessions.map(async (name) => ({
   					session: name,
   					running: await env.MY_CONTAINER.getByName(`${owner}/${name}`).isRunning(),
   				})),
   			);
   			return Response.json(list);
   		}

   		if (!session) {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName(`${owner}/${session}`);

   		if (request.method === "POST") {
   			const { argv } = (await request.json()) as { argv: string[] };
   			await directory.add(session);
   			return Response.json(await sandbox.exec(argv));
   		}

   		if (request.method === "DELETE") {
   			await sandbox.destroy();
   			await directory.remove(session);
   			return new Response(null, { status: 204 });
   		}

   		return new Response("Not found", { status: 404 });
   	},
   };
   ```

   A sandbox whose container stopped stays in the list with `running: false` until the Worker removes its session.

   Authenticate callers first, and derive the owner from their identity rather than from the URL. Otherwise anyone can list, use, or stop another user's sandboxes. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#the-sandbox-name-decides-what-a-request-reaches).
5. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```


6. Start two sandboxes for the user `ada`, on the `workers.dev` URL that Wrangler prints:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/users/ada/sandboxes/notes --request POST --json '{"argv":["uname","-s"]}'
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/users/ada/sandboxes/tests --request POST --json '{"argv":["uname","-s"]}'
   ```


7. List them:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/users/ada/sandboxes
   ```

   ```json
   [
   	{ "session": "notes", "running": true },
   	{ "session": "tests", "running": true }
   ]
   ```


8. Stop one of them, and list again:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/users/ada/sandboxes/tests --request DELETE
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/users/ada/sandboxes
   ```

   ```json
   [{ "session": "notes", "running": true }]
   ```



## List sandboxes across the account

The registry lists only the sandboxes that your Worker recorded. The Containers API lists every sandbox that a Container application started, including sandboxes that failed or that the registry missed. For each sandbox, the list of instances returns the name passed to `getByName()` and the state:

```sh
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/containers/applications/<APPLICATION_ID>/instances?name_prefix=ada/" \
	--header "Authorization: Bearer <API_TOKEN>"
```

- The application ID appears in `wrangler containers list`. The application is named after the Worker and the Durable Object class, such as `sandbox-linux-mycontainer`.
- The [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) needs the **Containers Read** permission, which covers every Container application in the account. Use it for administration and cleanup, not in routes that users call.
- `name_prefix` filters by the start of the name, and `state=active` returns only sandboxes that are starting, running, or stopping. Stopped sandboxes stay in the list.
- A new sandbox can take a few seconds to appear, and sandboxes that run under `wrangler dev` do not appear.

## Related resources

- [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/): what keeps a sandbox running, and what stops it.
- [Run code when a sandbox stops](https://developers.cloudflare.com/sandbox/manage/run-code-when-a-sandbox-stops/): record when and why each sandbox stops.
- [`destroy()`](https://developers.cloudflare.com/containers/api/durable-object-container/#destroy)
- [SQLite storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/manage/list-sandboxes/#page","headline":"List a user's sandboxes","description":"Record each user's sandboxes in a Durable Object, and report which ones are running.","url":"https://developers.cloudflare.com/sandbox/manage/list-sandboxes/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/manage/list-sandboxes/og.png?v=be39d7aa50959554","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
