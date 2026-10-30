---
description: Write your own reusable Lifecycle capability with LifecycleCapability, including storage, durable jobs, request handling, events, and user callbacks.
title: Build a capability
image: https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/og.png?v=eb348b4f828444c9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a capability

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Build a capability to reuse a feature that participates in your agent's startup, request handling, or background work. The [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) starts the capability and calls the hooks it implements.

This guide builds an `UptimeMonitor` capability. It checks a URL periodically, saves each result, and serves the history over HTTP. When a check fails, it notifies your agent through a callback.

The monitor uses three Lifecycle features:

- **Tables** store check results in the object's SQLite database.
- **Jobs** record when the next check should run. Lifecycle manages the alarm and calls the monitor's `onJob()` hook when the check is due.
- **Request handling** serves the check history at `/uptime`. Other requests continue to the next capability or your agent's `onRequest()`.

A capability only implements the hooks it needs. For how capabilities share startup, storage, and the alarm, refer to [Why capabilities](https://developers.cloudflare.com/agents/runtime/capabilities/#why-capabilities).

## Choose a base

There are two ways to write a capability:

- **Extend `LifecycleCapability`.** The capability gets a stable ID and the standard Lifecycle services: storage, readiness, its own jobs, events, and a way to call user code in the host context. Use this for almost every capability.
- **Implement the `DurableObjectCapability` interface.** The capability is a plain object with the hooks it needs. It gets no services and no ID, so it cannot push jobs or emit events. Pass anything it needs through its constructor.

A capability built on the interface is enough for simple middleware:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

class HealthCheck {
	storage;

	constructor(storage) {
		this.storage = storage;
	}

	onStart() {
		this.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS health_checks (checked_at INTEGER NOT NULL)",
		);
	}

	onRequest({ request }) {
		if (!new URL(request.url).pathname.endsWith("/health")) return;
		this.storage.sql.exec(
			"INSERT INTO health_checks (checked_at) VALUES (?)",
			Date.now(),
		);
		return new Response("ok");
	}
}

export class MyAgent extends DurableObject {
	health = new HealthCheck(this.ctx.storage);
	lifecycle = Lifecycle.install(this).use(this.health);

	onRequest() {
		return new Response("application response");
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import {
	Lifecycle,
	type CapabilityRequestContext,
	type DurableObjectCapability,
} from "agents/lifecycle";

class HealthCheck implements DurableObjectCapability {
	readonly storage: DurableObjectStorage;

	constructor(storage: DurableObjectStorage) {
		this.storage = storage;
	}

	onStart(): void {
		this.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS health_checks (checked_at INTEGER NOT NULL)",
		);
	}

	onRequest({ request }: CapabilityRequestContext): Response | undefined {
		if (!new URL(request.url).pathname.endsWith("/health")) return;
		this.storage.sql.exec(
			"INSERT INTO health_checks (checked_at) VALUES (?)",
			Date.now(),
		);
		return new Response("ok");
	}
}

export class MyAgent extends DurableObject<Env> {
	readonly health = new HealthCheck(this.ctx.storage);
	readonly lifecycle = Lifecycle.install(this).use(this.health);

	onRequest(): Response {
		return new Response("application response");
	}
}
```

The rest of this guide extends `LifecycleCapability`.

## Extend `LifecycleCapability`

Pass a stable, non-empty ID to `super()`. The Lifecycle uses the ID to route jobs and events back to the capability. Do not change it after you deploy, or pending jobs lose their owner:

```js
import { LifecycleCapability } from "agents/lifecycle";

export class UptimeMonitor extends LifecycleCapability {
	options;

	constructor(options) {
		super("uptime-monitor");
		this.options = options;
	}
}
```

```ts
import { LifecycleCapability } from "agents/lifecycle";

type UptimeMonitorOptions = {
	url: string;
	intervalMs: number;
	onDown?: (status: number) => void | Promise<void>;
};

export class UptimeMonitor extends LifecycleCapability {
	readonly options: UptimeMonitorOptions;

	constructor(options: UptimeMonitorOptions) {
		super("uptime-monitor");
		this.options = options;
	}
}
```

Once you install the capability, `this.lifecycle` gives it the [Lifecycle services](https://developers.cloudflare.com/agents/runtime/lifecycle/api-reference/#lifecycleservices). The capability never receives the host object itself. Pass bindings and callbacks through its constructor.

`this.lifecycle` throws if the capability has not been installed with `use()`.

## Create tables on startup

The Lifecycle calls `onStart()` on every capability before the host's `onStart()`. Use it to create or migrate the capability's tables. Prefix table names so they do not collide with the host's tables or with other capabilities:

```js
class UptimeMonitor extends LifecycleCapability {
	// ...

	onStart() {
		this.lifecycle.storage.sql.exec(`
			CREATE TABLE IF NOT EXISTS uptime_checks (
				checked_at INTEGER NOT NULL,
				status INTEGER NOT NULL
			)
		`);
	}
}
```

```ts
class UptimeMonitor extends LifecycleCapability {
	// ...

	override onStart(): void {
		this.lifecycle.storage.sql.exec(`
			CREATE TABLE IF NOT EXISTS uptime_checks (
				checked_at INTEGER NOT NULL,
				status INTEGER NOT NULL
			)
		`);
	}
}
```

## Run work on a schedule

Push a job to wake the capability later, and handle it in `onJob()`. Return `{ rescheduleAt }` to run it again:

```js
import { LifecycleCapability } from "agents/lifecycle";

class UptimeMonitor extends LifecycleCapability {
	// ...

	async startMonitoring() {
		await this.lifecycle.ready();
		await this.lifecycle.jobs.push({
			id: "check",
			fn: "check",
			time: Date.now(),
		});
	}

	async onJob({ job }) {
		if (job.fn !== "check") return;
		const response = await fetch(this.options.url, { method: "HEAD" });
		this.lifecycle.storage.sql.exec(
			"INSERT INTO uptime_checks (checked_at, status) VALUES (?, ?)",
			Date.now(),
			response.status,
		);
		this.lifecycle.events.emit("uptime:check", { status: response.status });

		const { onDown } = this.options;
		if (!response.ok && onDown) {
			await this.lifecycle.runInHostContext(() => onDown(response.status));
		}
		return { rescheduleAt: Date.now() + this.options.intervalMs };
	}
}
```

```ts
import {
	LifecycleCapability,
	type LifecycleJobContext,
	type LifecycleJobOutcome,
} from "agents/lifecycle";

class UptimeMonitor extends LifecycleCapability {
	// ...

	async startMonitoring(): Promise<void> {
		await this.lifecycle.ready();
		await this.lifecycle.jobs.push({
			id: "check",
			fn: "check",
			time: Date.now(),
		});
	}

	async onJob({ job }: LifecycleJobContext): Promise<LifecycleJobOutcome> {
		if (job.fn !== "check") return;
		const response = await fetch(this.options.url, { method: "HEAD" });
		this.lifecycle.storage.sql.exec(
			"INSERT INTO uptime_checks (checked_at, status) VALUES (?, ?)",
			Date.now(),
			response.status,
		);
		this.lifecycle.events.emit("uptime:check", { status: response.status });

		const { onDown } = this.options;
		if (!response.ok && onDown) {
			await this.lifecycle.runInHostContext(() => onDown(response.status));
		}
		return { rescheduleAt: Date.now() + this.options.intervalMs };
	}
}
```

The job has a fixed ID, so calling `startMonitoring()` again replaces the pending check instead of adding a second one. Keep `onJob()` short. For work that takes longer, refer to [Run long work](https://developers.cloudflare.com/agents/runtime/lifecycle/job-queue/#run-long-work).

### Wait for startup in public methods

`startMonitoring()` awaits `this.lifecycle.ready()` first. A public method on a capability can run before startup, because [RPC calls](https://developers.cloudflare.com/agents/runtime/lifecycle/#start-from-an-rpc-method) do not start the object. Startup holds the object's input gate while `onStart()` runs. Work that begins outside startup, and that `onStart()` then awaits, cannot finish until startup times out after 30 seconds and the object resets. This shows up as an intermittent timeout, depending on whether an RPC call arrives first.

Await `ready()` at the top of any method that uses storage or jobs, or that starts work `onStart()` also starts. `ready()` resolves immediately inside startup, so `onStart()` can call the same method.

### Call user code in the host context

Capability hooks run outside the host's invocation context, so [`getCurrentAgent()`](https://developers.cloudflare.com/agents/runtime/lifecycle/get-current-agent/) returns `undefined` values inside them. Call user code through `runInHostContext()`, so that `getCurrentAgent()` returns the host inside it. `Scheduler` calls its callbacks the same way.

A capability that owns connections or requests can pass them as the second argument, `runInHostContext(fn, { connection, request })`, so the user code sees them through `getCurrentAgent()`.

### Emit events

`this.lifecycle.events.emit(type, payload)` publishes a best-effort event under the capability's ID. On a plain Durable Object, events go to the `agents:*` [diagnostics channels](https://developers.cloudflare.com/agents/runtime/observability/diagnostics-channels/). The channel depends on the prefix of the event type. For example, `schedule:` events go to `agents:schedule`. A type with a prefix the SDK does not recognize, such as `uptime:check`, goes to `agents:lifecycle`.

Events emitted during startup are held until startup finishes. They are telemetry, not a durable outbox. If delivery is part of your business logic, store an outbox in the capability's own table.

## Handle requests

Implement `onRequest()` to act as middleware in front of the host. Return a `Response` to handle the request, or `undefined` to pass it on:

```js
import { LifecycleCapability } from "agents/lifecycle";

class UptimeMonitor extends LifecycleCapability {
	// ...

	onRequest({ request }) {
		if (!new URL(request.url).pathname.endsWith("/uptime")) return;
		const checks = this.lifecycle.storage.sql
			.exec(
				"SELECT checked_at, status FROM uptime_checks ORDER BY checked_at DESC LIMIT 20",
			)
			.toArray();
		return Response.json(checks);
	}
}
```

```ts
import {
	LifecycleCapability,
	type CapabilityRequestContext,
} from "agents/lifecycle";

class UptimeMonitor extends LifecycleCapability {
	// ...

	onRequest({ request }: CapabilityRequestContext): Response | undefined {
		if (!new URL(request.url).pathname.endsWith("/uptime")) return;
		const checks = this.lifecycle.storage.sql
			.exec(
				"SELECT checked_at, status FROM uptime_checks ORDER BY checked_at DESC LIMIT 20",
			)
			.toArray();
		return Response.json(checks);
	}
}
```

Match only the routes the capability owns. A capability that handles every request should set `claims` to `"catch-all"`, so that the Lifecycle runs it after all other capabilities. For more information, refer to [Capability order](https://developers.cloudflare.com/agents/runtime/lifecycle/#request-dispatch).

## Install the capability

Install the capability like any other:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class SiteAgent extends DurableObject {
	uptime = new UptimeMonitor({
		url: "https://example.com/",
		intervalMs: 5 * 60_000,
		onDown: (status) => console.warn(`example.com returned ${status}`),
	});
	lifecycle = Lifecycle.install(this).use(this.uptime);

	async onRequest() {
		await this.uptime.startMonitoring();
		return new Response("Monitoring started", { status: 202 });
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class SiteAgent extends DurableObject<Env> {
	readonly uptime = new UptimeMonitor({
		url: "https://example.com/",
		intervalMs: 5 * 60_000,
		onDown: (status) => console.warn(`example.com returned ${status}`),
	});
	readonly lifecycle = Lifecycle.install(this).use(this.uptime);

	async onRequest(): Promise<Response> {
		await this.uptime.startMonitoring();
		return new Response("Monitoring started", { status: 202 });
	}
}
```

A request to `/agents/site-agent/example/uptime` returns the stored checks. Every other request reaches the host's `onRequest()`.

## Test the capability

Test a capability by installing it on a small Durable Object with a real Lifecycle, as in the `SiteAgent` example. Do not construct fake Lifecycle services. Run the tests with the [Workers Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/), so jobs, alarms, and storage behave as they do in production.

## Other hooks

A capability can also implement these hooks. For their full signatures, refer to [Lifecycle API](https://developers.cloudflare.com/agents/runtime/lifecycle/api-reference/#durableobjectcapability):

| Hook | Purpose |
| --- | --- |
| `onWebSocketUpgrade(context)` | Claim a WebSocket upgrade by returning a `Response` |
| `onWebSocketMessage`, `onWebSocketClose`, `onWebSocketError` | Handle events for sockets the capability owns, and return `true` |
| `onJobError(context, error)` | Decide what happens after a job fails its last retry |
| `onMemoryLimit(context)` | Apply policy after an alarm ends in a memory-limit reset |
| `onRoute(context)` | Handle a message routed to this capability's ID |
| `dispose()` | Release live resources during explicit teardown |

## On the `Agent` class

The same capability works on the [`Agent` class](https://developers.cloudflare.com/agents/agent-class/), which installs the same Lifecycle. Construct the capability as a field, and install it with `this.lifecycle.use(this.uptime)` in the Agent's constructor, after `super()`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/#page","headline":"Build a capability","description":"Write your own reusable Lifecycle capability with LifecycleCapability, including storage, durable jobs, request handling, events, and user callbacks.","url":"https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/og.png?v=eb348b4f828444c9","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
