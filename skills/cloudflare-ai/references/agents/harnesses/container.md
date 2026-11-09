---
description: Run Claude Code or Codex in a Linux container with durable sessions, event replay, and recovery coordinated by the Agents SDK.
title: Container harness
image: https://developers.cloudflare.com/agents/harnesses/container/og.png?v=aa6905cd5a3c4e9f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Container harness

Last updated Nov 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/harnesses/container/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`ContainerHarness` runs a coding agent CLI in a [Cloudflare Container](https://developers.cloudflare.com/containers/), driven by a Durable Object. Use it when you need Claude Code or Codex with its native tools, shell, and session format. The API is experimental and may change.

The CLI owns the agent loop. The harness stores sessions, operations, transcripts, and CLI resume state in the Durable Object's SQLite database. [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) jobs reconnect to running containers and recover queued work.

Start from the [complete Container harness example ↗︎](https://github.com/cloudflare/agents/tree/main/examples/next/harnesses/container) for HTTP routes, event streaming, and both CLI presets. For a new agent whose loop runs inside a Durable Object, start with [Pi](https://developers.cloudflare.com/agents/harnesses/pi/).

## Create a project

You need Node.js 24 or later, the [Cloudflare CLI](https://developers.cloudflare.com/cf/get-started/), and a provider API key. Local container development also requires Docker running. Deployment requires a Cloudflare account with [Containers](https://developers.cloudflare.com/containers/get-started/).

1. Create a Worker project:

   ```sh
   cf init container-agent
   cd container-agent
   ```

2. Install the Agents SDK:npmyarnpnpmbun

   ```
   npm i agents@latest
   ```

   ```
   yarn add agents@latest
   ```

   ```
   pnpm add agents@latest
   ```

   ```
   bun add agents@latest
   ```

## Configure the project

Replace `cloudflare.config.ts` with this configuration. It declares a SQLite-backed Durable Object and attaches a container with the [`durable_object` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy), which is in public beta.

*cloudflare.config.tsts*

```ts
import { bindings, defineConfig, defineContainer, exports } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

const container = defineContainer({
	name: "coding-agent",
	schedulingPolicy: "durable-object",
});

export default defineConfig({
	worker: {
		name: "container-agent",
		entrypoint,
		compatibilityDate: "2026-11-06",
		compatibilityFlags: ["nodejs_compat"],
		exports: {
			CodingAgent: exports.durableObject({ storage: "sqlite", container }),
			ContainerEgress: exports.worker(),
		},
		env: {
			ANTHROPIC_API_KEY: bindings.secret(),
		},
	},
	containers: [container],
});
```

`exports.durableObject({ storage: "sqlite", container })` declares the object's storage and container lifecycle. No Dockerfile is needed for the built-in CLI presets. The harness starts `cloudflare/debian-trixie`, installs the CLI and its daemon, and snapshots the filesystem for later starts.

## Create the agent

Replace `src/index.ts` with a plain Durable Object that installs the harness:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { ContainerHarness, claudeCode } from "agents/harness/container";
import { Lifecycle } from "agents/lifecycle";

export { ContainerEgress } from "agents/harness/container";

export class CodingAgent extends DurableObject {
	harness = new ContainerHarness({
		container: containerOf(this.ctx),
		agent: claudeCode({ apiKey: this.env.ANTHROPIC_API_KEY }),
		egress: this.ctx.exports.ContainerEgress,
	});

	lifecycle = Lifecycle.install(this).use(this.harness);

	async onRequest(request) {
		if (request.method === "POST") {
			const { prompt } = await request.json();
			if (typeof prompt !== "string" || !prompt.trim()) {
				return new Response("prompt is required", { status: 400 });
			}
			return Response.json(await this.harness.submit(prompt), { status: 202 });
		}
		if (request.method === "GET") {
			const operationId = new URL(request.url).searchParams.get("operationId");
			return Response.json(
				operationId
					? await this.harness.wait(operationId, { signal: request.signal })
					: await this.harness.messages(),
			);
		}
		return new Response("Method not allowed", { status: 405 });
	}
}

function containerOf(ctx) {
	if (!ctx.container) throw new Error("Configure a container for CodingAgent");
	return ctx.container;
}

export default {
	async fetch(request, _env, ctx) {
		return ctx.exports.CodingAgent.getByName("demo").fetch(request);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { ContainerHarness, claudeCode } from "agents/harness/container";
import { Lifecycle } from "agents/lifecycle";

export { ContainerEgress } from "agents/harness/container";

export class CodingAgent extends DurableObject<Env> {
	harness = new ContainerHarness({
		container: containerOf(this.ctx),
		agent: claudeCode({ apiKey: this.env.ANTHROPIC_API_KEY }),
		egress: this.ctx.exports.ContainerEgress,
	});

	lifecycle = Lifecycle.install(this).use(this.harness);

	async onRequest(request: Request): Promise<Response> {
		if (request.method === "POST") {
			const { prompt } = await request.json<{ prompt?: string }>();
			if (typeof prompt !== "string" || !prompt.trim()) {
				return new Response("prompt is required", { status: 400 });
			}
			return Response.json(await this.harness.submit(prompt), { status: 202 });
		}
		if (request.method === "GET") {
			const operationId = new URL(request.url).searchParams.get("operationId");
			return Response.json(
				operationId
					? await this.harness.wait(operationId, { signal: request.signal })
					: await this.harness.messages(),
			);
		}
		return new Response("Method not allowed", { status: 405 });
	}
}

function containerOf(ctx: DurableObjectState): Container {
	if (!ctx.container) throw new Error("Configure a container for CodingAgent");
	return ctx.container;
}

export default {
	async fetch(request: Request, _env: Env, ctx: ExecutionContext) {
		return ctx.exports.CodingAgent.getByName("demo").fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

The Worker forwards requests through the `ctx.exports.CodingAgent` namespace to an object named `demo`. The configuration declares the SQLite-backed export, so no separate Durable Object binding is needed.

The harness uses a `HarnessStore` in the object's SQLite database. You do not need to install the separate `Sessions`, `Tasks`, or `Streams` capabilities.

Export `ContainerEgress` from the Worker's main module and pass `this.ctx.exports.ContainerEgress` to the harness. The CLI calls a placeholder host with a placeholder key. The harness intercepts those requests, and `ContainerEgress` adds the configured provider credentials outside the container.

### Choose a CLI and provider

The `claudeCode()` and `codex()` presets select the CLI and adapter. To use Codex, import `codex` from `agents/harness/container`, replace `claudeCode()` with `codex({ apiKey: this.env.OPENAI_API_KEY })`, and replace the secret binding with `OPENAI_API_KEY`.

Both presets accept `baseUrl` and `headers` for [AI Gateway](https://developers.cloudflare.com/ai-gateway/). With [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), pass the gateway token as `apiKey` and the gateway's provider URL as `baseUrl`, ending in `/anthropic` or `/openai`. For [stored provider keys](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/), pass the gateway token in the `cf-aig-authorization` header.

Use `version` to select a CLI version and `setup` to install additional packages or CLI configuration. Setup runs on first start and its result is snapshotted. Changing the setup takes effect when a new container starts and invalidates the previous workspace snapshot. Secrets written by setup commands can remain in that snapshot.

For another CLI, use `containerAgent()` with your own image and an adapter built with `agents/harness/container/runtime`. Refer to the [custom CLI example ↗︎](https://github.com/cloudflare/agents/tree/main/examples/next/harnesses/container#another-cli).

## Run locally

Add your provider key to `.dev.vars`, which must be excluded from version control:

*.dev.varstxt*

```txt
ANTHROPIC_API_KEY="<PROVIDER_API_KEY>"
```

Start Docker, then run:

```sh
cf dev
```

The development server generates the binding and runtime types. Send a prompt to the agent named `demo`:

```sh
curl http://localhost:5173/ \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"Write hello.txt containing hi, then read it back."}'
```

Use the port printed by `cf dev`. The response contains `operationId`, `session`, and `accepted`. To wait for that operation, send a GET request to the same URL with `?operationId=<OPERATION_ID>`. A GET request without that parameter returns the root session's transcript.

These example routes are unauthenticated. Add authentication and choose object names for authenticated users before deploying public sessions. Each prompt can run commands and spend model credit.

## Submit work and manage sessions

Inside a method on your Durable Object, `prompt()` submits work and waits for the result and transcript:

```js
const result = await this.harness.prompt("Summarize the repository");
if (result.status === "done") {
	console.log(result.text);
} else {
	console.log(result.reason);
}
```

```ts
const result = await this.harness.prompt("Summarize the repository");
if (result.status === "done") {
	console.log(result.text);
} else {
	console.log(result.reason);
}
```

`status: "done"` means answered. `status: "unanswered"` includes aborted work, adapter failures, and container loss. Check `reason` before treating the operation as successful.

For background work, submit and wait separately:

```js
const receipt = await this.harness.submit("Add tests for parse()", {
	operationId: "parse-tests-1",
});

// In a later request to the same Durable Object:
const result = await this.harness.wait(receipt.operationId, {
	session: receipt.session,
});
```

```ts
const receipt = await this.harness.submit("Add tests for parse()", {
	operationId: "parse-tests-1",
});

// In a later request to the same Durable Object:
const result = await this.harness.wait(receipt.operationId, {
	session: receipt.session,
});
```

A receipt means the prompt is durably accepted, before the CLI finishes. Reuse `operationId` to deduplicate a submission within a session; an existing operation returns `accepted: false`. Deduplication does not make the CLI's external side effects safe to repeat.

`harness.session()` addresses the root session. Create independent sessions with `harness.sessions.create()`:

```js
const session = await this.harness.sessions.create();
const receipt = await session.submit("Inspect the project");
const result = await session.wait(receipt.operationId);
const messages = await session.messages();
```

```ts
const session = await this.harness.sessions.create();
const receipt = await session.submit("Inspect the project");
const result = await session.wait(receipt.operationId);
const messages = await session.messages();
```

Use `harness.session(id)` to reopen a session, `harness.sessions.list()` to list sessions, and `harness.sessions.fork(id)` to branch a session's history. `session.abort()` aborts its open operations; `harness.pending()` lists queued and running operations. Inputs submitted to a busy session queue as follow-ups. Steering joins the current turn only when the adapter supports it; otherwise it queues a follow-up.

## Receive events

`session.events()` returns a snapshot and live event batches. Open a new stream after a client reconnects:

```js
const stream = await this.harness.session().events();
console.log(stream.snapshot.messages, stream.snapshot.pending);
stream.start((events) => {
	for (const event of events) console.log(event);
});

// When the client disconnects:
await stream.stop();
```

```ts
const stream = await this.harness.session().events();
console.log(stream.snapshot.messages, stream.snapshot.pending);
stream.start((events) => {
	for (const event of events) console.log(event);
});

// When the client disconnects:
await stream.stop();
```

The snapshot includes messages, pending operations, and whether the session is busy. Events can repeat messages in the snapshot; reconcile messages by ID. Live listeners belong to the current Durable Object instance. The harness's internal replay after reconnecting to its daemon is separate from client subscriptions. Refer to the [complete example's Server-Sent Events route ↗︎](https://github.com/cloudflare/agents/blob/main/examples/next/harnesses/container/src/index.ts) to forward events to a client.

## Recovery

Recovery depends on which part of the application stopped:

| Interruption | Recovery behavior |
| --- | --- |
| Durable Object eviction or deployment | A Lifecycle wake job reattaches to the surviving container and replays missed events from the stored cursor. |
| Connection to the container daemon drops | A later heartbeat reconnects and replays missed events. |
| Idle timeout | The harness snapshots the filesystem and stops the container. The next prompt restores the snapshot and resumes the CLI's session. The default idle timeout is five minutes. |
| Container loss during a turn | By default, the running operation settles with `status: "unanswered"` and `reason: "container_lost"`. Sessions survive, and queued operations run in a replacement container. |
| Container loss with `onContainerLost: "retry"` | The interrupted operation runs again from the start. Use this only when its tools and external side effects can safely repeat. |

CLI session files are mirrored to the Durable Object while turns run. Workspace files are recovered from the last filesystem snapshot. A container crash can lose edits made after that snapshot, even when the conversation survives.

Call `await this.harness.stop()` to snapshot and stop a container explicitly. Prefer stopping after its work finishes: running operations are reconciled as container loss. The next prompt starts a replacement and resumes the saved session.

[Container snapshots](https://developers.cloudflare.com/containers/guides/snapshots/) preserve files, not memory or running processes. They expire 30 days after their last restore and are tied to an image version. If a snapshot expires, fails, or no longer matches the setup, startup may fall back to a clean filesystem. Keep files that must survive these cases in separate durable storage.

The built-in presets use the container's filesystem. They do not include a [Cloudflare Computer Workspace integration](https://developers.cloudflare.com/agents/tools/filesystem/).

## Deploy

After adding authentication, sign in and deploy with the [Cloudflare CLI](https://developers.cloudflare.com/cf/get-started/). Supply the declared provider secret through a [secrets file](https://developers.cloudflare.com/cf/projects/#deploy):

```sh
cf auth login
cf deploy --secrets-file .dev.vars
```

For a Codex configuration, supply `OPENAI_API_KEY` instead of `ANTHROPIC_API_KEY`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/harnesses/container/#page","headline":"Container harness","description":"Run Claude Code or Codex in a Linux container with durable sessions, event replay, and recovery coordinated by the Agents SDK.","url":"https://developers.cloudflare.com/agents/harnesses/container/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/container/og.png?v=aa6905cd5a3c4e9f","dateModified":"2026-11-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
