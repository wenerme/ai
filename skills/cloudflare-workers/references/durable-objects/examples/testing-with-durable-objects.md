---
description: Write tests for Durable Objects using the Workers Vitest integration.
title: Testing Durable Objects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt
> Use this file to discover all available pages before exploring further.

# Testing Durable Objects

Write tests for Durable Objects using the Workers Vitest integration.

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [@cloudflare/vitest-plugin ↗](https://www.npmjs.com/package/@cloudflare/vitest-plugin) package to write tests for your Durable Objects. This integration runs your tests inside the Workers runtime, giving you direct access to Durable Object bindings and APIs.

## Prerequisites

Install Vitest and the Workers Vitest integration as dev dependencies:

```sh
npm i -D vitest@^4.1.0 @cloudflare/vitest-plugin
```

```sh
pnpm add -D vitest@^4.1.0 @cloudflare/vitest-plugin
```

```sh
yarn add -D vitest@^4.1.0 @cloudflare/vitest-plugin
```

## Example Durable Object

This example tests a simple counter Durable Object with SQLite storage:

```js
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);

		ctx.blockConcurrencyWhile(async () => {
			this.ctx.storage.sql.exec(`
				CREATE TABLE IF NOT EXISTS counters (
					name TEXT PRIMARY KEY,
					value INTEGER NOT NULL DEFAULT 0
				)
			`);
		});
	}

	// In-memory only. This field lives on the instance and is not persisted
	// to storage, so it is reset whenever the Durable Object is evicted and
	// reconstructed.
	cachedHits = 0;

	recordHit() {
		return ++this.cachedHits;
	}

	getHits() {
		return this.cachedHits;
	}

	async increment(name = "default") {
		this.ctx.storage.sql.exec(
			`INSERT INTO counters (name, value) VALUES (?, 1)
			 ON CONFLICT(name) DO UPDATE SET value = value + 1`,
			name,
		);
		const result = this.ctx.storage.sql
			.exec("SELECT value FROM counters WHERE name = ?", name)
			.one();
		return result.value;
	}

	async getCount(name = "default") {
		const result = this.ctx.storage.sql
			.exec("SELECT value FROM counters WHERE name = ?", name)
			.toArray();
		return result[0]?.value ?? 0;
	}

	async reset(name = "default") {
		this.ctx.storage.sql.exec("DELETE FROM counters WHERE name = ?", name);
	}
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const counterId = url.searchParams.get("id") ?? "default";

		const id = env.COUNTER.idFromName(counterId);
		const stub = env.COUNTER.get(id);

		if (request.method === "POST") {
			const count = await stub.increment();
			return Response.json({ count });
		}

		const count = await stub.getCount();
		return Response.json({ count });
	},
};
```

```ts
import { DurableObject } from "cloudflare:workers";

export interface Env {
	COUNTER: DurableObjectNamespace<Counter>;
}

export class Counter extends DurableObject<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);

		ctx.blockConcurrencyWhile(async () => {
			this.ctx.storage.sql.exec(`
				CREATE TABLE IF NOT EXISTS counters (
					name TEXT PRIMARY KEY,
					value INTEGER NOT NULL DEFAULT 0
				)
			`);
		});
	}

	// In-memory only. This field lives on the instance and is not persisted
	// to storage, so it is reset whenever the Durable Object is evicted and
	// reconstructed.
	cachedHits = 0;

	recordHit(): number {
		return ++this.cachedHits;
	}

	getHits(): number {
		return this.cachedHits;
	}

	async increment(name: string = "default"): Promise<number> {
		this.ctx.storage.sql.exec(
			`INSERT INTO counters (name, value) VALUES (?, 1)
			 ON CONFLICT(name) DO UPDATE SET value = value + 1`,
			name
		);
		const result = this.ctx.storage.sql
			.exec<{ value: number }>("SELECT value FROM counters WHERE name = ?", name)
			.one();
		return result.value;
	}

	async getCount(name: string = "default"): Promise<number> {
		const result = this.ctx.storage.sql
			.exec<{ value: number }>("SELECT value FROM counters WHERE name = ?", name)
			.toArray();
		return result[0]?.value ?? 0;
	}

	async reset(name: string = "default"): Promise<void> {
		this.ctx.storage.sql.exec("DELETE FROM counters WHERE name = ?", name);
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const counterId = url.searchParams.get("id") ?? "default";

		const id = env.COUNTER.idFromName(counterId);
		const stub = env.COUNTER.get(id);

		if (request.method === "POST") {
			const count = await stub.increment();
			return Response.json({ count });
		}

		const count = await stub.getCount();
		return Response.json({ count });
	},
};
```

## Configure Vitest

Create a `vitest.config.ts` file that uses the `cloudflareTest()` plugin:

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
		}),
	],
});
```

Make sure your Wrangler configuration includes the Durable Object binding and SQLite migration:

```jsonc
{
  "name": "counter-worker",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-08-20",
  "durable_objects": {
    "bindings": [
      { "name": "COUNTER", "class_name": "Counter" }
    ]
  },
  "migrations": [
    { "tag": "v1", "new_sqlite_classes": ["Counter"] }
  ]
}
```

```toml
name = "counter-worker"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-08-20"

[[durable_objects.bindings]]
name = "COUNTER"
class_name = "Counter"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "Counter" ]
```

## Define types for tests

Create a `test/tsconfig.json` to configure TypeScript for your tests:

```jsonc
{
	"extends": "../tsconfig.json",
	"compilerOptions": {
		"moduleResolution": "bundler",
		"types": ["@cloudflare/vitest-plugin/types"]
	},
	"include": ["./**/*.ts", "../src/worker-configuration.d.ts"]
}
```

Create an `env.d.ts` file to type the test environment:

```ts
declare module "cloudflare:workers" {
	interface ProvidedEnv extends Env {}
}
```

## Writing tests

### Unit tests with direct Durable Object access

You can get a stub to a Durable Object directly from the `env` object provided by `cloudflare:workers`:

```js
import { env } from "cloudflare:workers";
import { describe, it, expect, beforeEach } from "vitest";

describe("Counter Durable Object", () => {
	it("should increment the counter", async () => {
		const id = env.COUNTER.idFromName("test-counter");
		const stub = env.COUNTER.get(id);

		// Call RPC methods directly on the stub
		const count1 = await stub.increment();
		expect(count1).toBe(1);

		const count2 = await stub.increment();
		expect(count2).toBe(2);

		const count3 = await stub.increment();
		expect(count3).toBe(3);
	});

	it("should persist storage within a test file", async () => {
		const id = env.COUNTER.idFromName("test-counter");
		const stub = env.COUNTER.get(id);

		expect(await stub.getCount()).toBe(3);
	});

	it("should reset a counter", async () => {
		const id = env.COUNTER.idFromName("test-counter");
		const stub = env.COUNTER.get(id);

		await stub.increment("my-counter");
		await stub.increment("my-counter");
		expect(await stub.getCount("my-counter")).toBe(2);

		await stub.reset("my-counter");
		expect(await stub.getCount("my-counter")).toBe(0);
	});

	it("should isolate different Durable Object instances", async () => {
		const id1 = env.COUNTER.idFromName("counter-1");
		const id2 = env.COUNTER.idFromName("counter-2");

		const stub1 = env.COUNTER.get(id1);
		const stub2 = env.COUNTER.get(id2);

		await stub1.increment();
		await stub1.increment();
		await stub2.increment();

		// Each Durable Object instance has its own storage
		expect(await stub1.getCount()).toBe(2);
		expect(await stub2.getCount()).toBe(1);
	});
});
```

```ts
import { env } from "cloudflare:workers";
import { describe, it, expect, beforeEach } from "vitest";

describe("Counter Durable Object", () => {
	it("should increment the counter", async () => {
		const id = env.COUNTER.idFromName("test-counter");
		const stub = env.COUNTER.get(id);

		// Call RPC methods directly on the stub
		const count1 = await stub.increment();
		expect(count1).toBe(1);

		const count2 = await stub.increment();
		expect(count2).toBe(2);

		const count3 = await stub.increment();
		expect(count3).toBe(3);
	});

	it("should persist storage within a test file", async () => {
		const id = env.COUNTER.idFromName("test-counter");
		const stub = env.COUNTER.get(id);

		expect(await stub.getCount()).toBe(3);
	});

	it("should reset a counter", async () => {
		const id = env.COUNTER.idFromName("test-counter");
		const stub = env.COUNTER.get(id);

		await stub.increment("my-counter");
		await stub.increment("my-counter");
		expect(await stub.getCount("my-counter")).toBe(2);

		await stub.reset("my-counter");
		expect(await stub.getCount("my-counter")).toBe(0);
	});

	it("should isolate different Durable Object instances", async () => {
		const id1 = env.COUNTER.idFromName("counter-1");
		const id2 = env.COUNTER.idFromName("counter-2");

		const stub1 = env.COUNTER.get(id1);
		const stub2 = env.COUNTER.get(id2);

		await stub1.increment();
		await stub1.increment();
		await stub2.increment();

		// Each Durable Object instance has its own storage
		expect(await stub1.getCount()).toBe(2);
		expect(await stub2.getCount()).toBe(1);
	});
});
```

### Integration tests with `exports`

Use `exports.default.fetch()` to test your Worker's HTTP handler, which routes requests to Durable Objects:

```js
import { exports } from "cloudflare:workers";
import { describe, it, expect } from "vitest";

describe("Counter Worker integration", () => {
	it("should increment via HTTP POST", async () => {
		const response = await exports.default.fetch(
			"http://example.com?id=http-test",
			{
				method: "POST",
			},
		);

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data.count).toBe(1);
	});

	it("should get count via HTTP GET", async () => {
		// First increment the counter
		await exports.default.fetch("http://example.com?id=get-test", {
			method: "POST",
		});
		await exports.default.fetch("http://example.com?id=get-test", {
			method: "POST",
		});

		// Then get the count
		const response = await exports.default.fetch(
			"http://example.com?id=get-test",
		);
		const data = await response.json();
		expect(data.count).toBe(2);
	});

	it("should use different counters for different IDs", async () => {
		await exports.default.fetch("http://example.com?id=counter-a", {
			method: "POST",
		});
		await exports.default.fetch("http://example.com?id=counter-a", {
			method: "POST",
		});
		await exports.default.fetch("http://example.com?id=counter-b", {
			method: "POST",
		});

		const responseA = await exports.default.fetch(
			"http://example.com?id=counter-a",
		);
		const responseB = await exports.default.fetch(
			"http://example.com?id=counter-b",
		);

		const dataA = await responseA.json();
		const dataB = await responseB.json();

		expect(dataA.count).toBe(2);
		expect(dataB.count).toBe(1);
	});
});
```

```ts
import { exports } from "cloudflare:workers";
import { describe, it, expect } from "vitest";

describe("Counter Worker integration", () => {
	it("should increment via HTTP POST", async () => {
		const response = await exports.default.fetch("http://example.com?id=http-test", {
			method: "POST",
		});

		expect(response.status).toBe(200);
		const data = await response.json<{ count: number }>();
		expect(data.count).toBe(1);
	});

	it("should get count via HTTP GET", async () => {
		// First increment the counter
		await exports.default.fetch("http://example.com?id=get-test", { method: "POST" });
		await exports.default.fetch("http://example.com?id=get-test", { method: "POST" });

		// Then get the count
		const response = await exports.default.fetch("http://example.com?id=get-test");
		const data = await response.json<{ count: number }>();
		expect(data.count).toBe(2);
	});

	it("should use different counters for different IDs", async () => {
		await exports.default.fetch("http://example.com?id=counter-a", { method: "POST" });
		await exports.default.fetch("http://example.com?id=counter-a", { method: "POST" });
		await exports.default.fetch("http://example.com?id=counter-b", { method: "POST" });

		const responseA = await exports.default.fetch("http://example.com?id=counter-a");
		const responseB = await exports.default.fetch("http://example.com?id=counter-b");

		const dataA = await responseA.json<{ count: number }>();
		const dataB = await responseB.json<{ count: number }>();

		expect(dataA.count).toBe(2);
		expect(dataB.count).toBe(1);
	});
});
```

### Direct access to Durable Object internals

Use `runInDurableObject()` to access instance properties and storage directly. This is useful for verifying internal state or testing private methods:

```js
import { env } from "cloudflare:workers";
import { runInDurableObject, listDurableObjectIds } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { Counter } from "../src";

describe("Direct Durable Object access", () => {
	it("can access instance internals and storage", async () => {
		const id = env.COUNTER.idFromName("direct-test");
		const stub = env.COUNTER.get(id);

		// First, interact normally via RPC
		await stub.increment();
		await stub.increment();

		// Then use runInDurableObject to inspect internals
		await runInDurableObject(stub, async (instance, state) => {
			// Access the exact same class instance
			expect(instance).toBeInstanceOf(Counter);

			// Access storage directly for verification
			const result = state.storage.sql
				.exec("SELECT value FROM counters WHERE name = ?", "default")
				.one();
			expect(result.value).toBe(2);
		});
	});

	it("can list all Durable Object IDs in a namespace", async () => {
		// Create some Durable Objects
		const id1 = env.COUNTER.idFromName("list-test-1");
		const id2 = env.COUNTER.idFromName("list-test-2");

		await env.COUNTER.get(id1).increment();
		await env.COUNTER.get(id2).increment();

		// List all IDs in the namespace
		const ids = await listDurableObjectIds(env.COUNTER);
		expect(ids.length).toBeGreaterThanOrEqual(2);
		expect(ids.some((id) => id.equals(id1))).toBe(true);
		expect(ids.some((id) => id.equals(id2))).toBe(true);
	});
});
```

```ts
import { env } from "cloudflare:workers";
import {
	runInDurableObject,
	listDurableObjectIds,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { Counter } from "../src";

describe("Direct Durable Object access", () => {
	it("can access instance internals and storage", async () => {
		const id = env.COUNTER.idFromName("direct-test");
		const stub = env.COUNTER.get(id);

		// First, interact normally via RPC
		await stub.increment();
		await stub.increment();

		// Then use runInDurableObject to inspect internals
		await runInDurableObject(stub, async (instance: Counter, state) => {
			// Access the exact same class instance
			expect(instance).toBeInstanceOf(Counter);

			// Access storage directly for verification
			const result = state.storage.sql
				.exec<{ value: number }>(
					"SELECT value FROM counters WHERE name = ?",
					"default"
				)
				.one();
			expect(result.value).toBe(2);
		});
	});

	it("can list all Durable Object IDs in a namespace", async () => {
		// Create some Durable Objects
		const id1 = env.COUNTER.idFromName("list-test-1");
		const id2 = env.COUNTER.idFromName("list-test-2");

		await env.COUNTER.get(id1).increment();
		await env.COUNTER.get(id2).increment();

		// List all IDs in the namespace
		const ids = await listDurableObjectIds(env.COUNTER);
		expect(ids.length).toBeGreaterThanOrEqual(2);
		expect(ids.some((id) => id.equals(id1))).toBe(true);
		expect(ids.some((id) => id.equals(id2))).toBe(true);
	});
});
```

### Testing SQLite storage

SQLite-backed Durable Objects work seamlessly in tests. The SQL API is available when your Durable Object class is configured with `new_sqlite_classes` in your Wrangler configuration:

```js
import { env } from "cloudflare:workers";
import { runInDurableObject } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("SQLite in Durable Objects", () => {
	it("can query and verify SQLite storage", async () => {
		const id = env.COUNTER.idFromName("sqlite-test");
		const stub = env.COUNTER.get(id);

		// Increment the counter a few times via RPC
		await stub.increment("page-views");
		await stub.increment("page-views");
		await stub.increment("api-calls");

		// Verify the data directly in SQLite
		await runInDurableObject(stub, async (instance, state) => {
			// Query the database directly
			const rows = state.storage.sql
				.exec("SELECT name, value FROM counters ORDER BY name")
				.toArray();

			expect(rows).toEqual([
				{ name: "api-calls", value: 1 },
				{ name: "page-views", value: 2 },
			]);

			// Check database size is non-zero
			expect(state.storage.sql.databaseSize).toBeGreaterThan(0);
		});
	});
});
```

```ts
import { env } from "cloudflare:workers";
import { runInDurableObject } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("SQLite in Durable Objects", () => {
	it("can query and verify SQLite storage", async () => {
		const id = env.COUNTER.idFromName("sqlite-test");
		const stub = env.COUNTER.get(id);

		// Increment the counter a few times via RPC
		await stub.increment("page-views");
		await stub.increment("page-views");
		await stub.increment("api-calls");

		// Verify the data directly in SQLite
		await runInDurableObject(stub, async (instance, state) => {
			// Query the database directly
			const rows = state.storage.sql
				.exec<{ name: string; value: number }>("SELECT name, value FROM counters ORDER BY name")
				.toArray();

			expect(rows).toEqual([
				{ name: "api-calls", value: 1 },
				{ name: "page-views", value: 2 },
			]);

			// Check database size is non-zero
			expect(state.storage.sql.databaseSize).toBeGreaterThan(0);
		});
	});
});
```

### Testing alarms

Use `runDurableObjectAlarm()` to immediately trigger a scheduled alarm without waiting for the timer. This allows you to test alarm handlers synchronously:

```js
import { env } from "cloudflare:workers";
import { runInDurableObject, runDurableObjectAlarm } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { Counter } from "../src";

describe("Durable Object alarms", () => {
	it("can trigger alarms immediately", async () => {
		const id = env.COUNTER.idFromName("alarm-test");
		const stub = env.COUNTER.get(id);

		// Increment counter and schedule a reset alarm
		await stub.increment();
		await stub.increment();
		expect(await stub.getCount()).toBe(2);

		// Schedule an alarm (in a real app, this might be hours in the future)
		await runInDurableObject(stub, async (instance, state) => {
			await state.storage.setAlarm(Date.now() + 60_000); // 1 minute from now
		});

		// Immediately execute the alarm without waiting
		const alarmRan = await runDurableObjectAlarm(stub);
		expect(alarmRan).toBe(true); // Alarm was scheduled and executed

		// Verify the alarm handler ran (assuming it resets the counter)
		// Note: You'll need an alarm() method in your Durable Object that handles resets
		// expect(await stub.getCount()).toBe(0);

		// Trying to run the alarm again returns false (no alarm scheduled)
		const alarmRanAgain = await runDurableObjectAlarm(stub);
		expect(alarmRanAgain).toBe(false);
	});
});
```

```ts
import { env } from "cloudflare:workers";
import {
	runInDurableObject,
	runDurableObjectAlarm,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { Counter } from "../src";

describe("Durable Object alarms", () => {
	it("can trigger alarms immediately", async () => {
		const id = env.COUNTER.idFromName("alarm-test");
		const stub = env.COUNTER.get(id);

		// Increment counter and schedule a reset alarm
		await stub.increment();
		await stub.increment();
		expect(await stub.getCount()).toBe(2);

		// Schedule an alarm (in a real app, this might be hours in the future)
		await runInDurableObject(stub, async (instance, state) => {
			await state.storage.setAlarm(Date.now() + 60_000); // 1 minute from now
		});

		// Immediately execute the alarm without waiting
		const alarmRan = await runDurableObjectAlarm(stub);
		expect(alarmRan).toBe(true); // Alarm was scheduled and executed

		// Verify the alarm handler ran (assuming it resets the counter)
		// Note: You'll need an alarm() method in your Durable Object that handles resets
		// expect(await stub.getCount()).toBe(0);

		// Trying to run the alarm again returns false (no alarm scheduled)
		const alarmRanAgain = await runDurableObjectAlarm(stub);
		expect(alarmRanAgain).toBe(false);
	});
});
```

To test alarms, add an `alarm()` method to your Durable Object:

```js
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
	// ... other methods ...

	async alarm() {
		// This method is called when the alarm fires
		// Reset all counters
		this.ctx.storage.sql.exec("DELETE FROM counters");
	}

	async scheduleReset(afterMs) {
		await this.ctx.storage.setAlarm(Date.now() + afterMs);
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
	// ... other methods ...

	async alarm() {
		// This method is called when the alarm fires
		// Reset all counters
		this.ctx.storage.sql.exec("DELETE FROM counters");
	}

	async scheduleReset(afterMs: number) {
		await this.ctx.storage.setAlarm(Date.now() + afterMs);
	}
}
```

### Testing eviction

Use `evictDurableObject()` to evict a Durable Object instance during tests. Eviction tears down the instance to reset its in-memory state. This lets you test how your Durable Object recovers state from storage after being evicted.

By default, hibernatable WebSockets are hibernated rather than closed, and eviction waits up to 30 seconds for in-flight requests to drain before tearing down the instance.

The following test sets both in-memory state (`cachedHits`) and durable storage (the counter value), evicts the Durable Object, and verifies that the in-memory state is wiped while the stored count survives:

```js
import { env } from "cloudflare:workers";
import { evictDurableObject } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("Durable Object eviction", () => {
	it("wipes in-memory state but preserves storage across eviction", async () => {
		const id = env.COUNTER.idFromName("evict-test");
		const stub = env.COUNTER.get(id);

		// Persist a value to SQLite storage
		await stub.increment();
		await stub.increment();
		expect(await stub.getCount()).toBe(2);

		// Set in-memory only state, which is not persisted to storage
		await stub.recordHit();
		await stub.recordHit();
		expect(await stub.getHits()).toBe(2);

		// Evict the Durable Object. The in-memory instance is torn down,
		// but durable storage is preserved.
		await evictDurableObject(stub);

		// In-memory state is wiped: the reconstructed instance starts fresh
		expect(await stub.getHits()).toBe(0);

		// Durable storage survives: the persisted count is read back
		expect(await stub.getCount()).toBe(2);
	});
});
```

```ts
import { env } from "cloudflare:workers";
import { evictDurableObject } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("Durable Object eviction", () => {
	it("wipes in-memory state but preserves storage across eviction", async () => {
		const id = env.COUNTER.idFromName("evict-test");
		const stub = env.COUNTER.get(id);

		// Persist a value to SQLite storage
		await stub.increment();
		await stub.increment();
		expect(await stub.getCount()).toBe(2);

		// Set in-memory only state, which is not persisted to storage
		await stub.recordHit();
		await stub.recordHit();
		expect(await stub.getHits()).toBe(2);

		// Evict the Durable Object. The in-memory instance is torn down,
		// but durable storage is preserved.
		await evictDurableObject(stub);

		// In-memory state is wiped: the reconstructed instance starts fresh
		expect(await stub.getHits()).toBe(0);

		// Durable storage survives: the persisted count is read back
		expect(await stub.getCount()).toBe(2);
	});
});
```

#### Testing WebSocket behavior across eviction

You can control what happens to hibernatable WebSockets when a Durable Object is evicted by passing the `options` parameter:

* `{ webSockets: "hibernate" }` (the default) hibernates WebSockets so they can resume after eviction.
* `{ webSockets: "close" }` closes WebSockets during eviction.

The following example uses a Durable Object that accepts WebSocket connections with the [hibernatable WebSockets API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/):

```js
import { DurableObject } from "cloudflare:workers";

export class WebSocketServer extends DurableObject {
	async fetch(request) {
		const [client, server] = Object.values(new WebSocketPair());

		// Accept the WebSocket as hibernatable so it can survive eviction
		this.ctx.acceptWebSocket(server);

		return new Response(null, { status: 101, webSocket: client });
	}

	webSocketMessage(ws, message) {
		// Echo the received message back to the client
		ws.send(message);
	}

	webSocketClose(ws, code, reason, wasClean) {
		// Handle WebSocket close events
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";

export class WebSocketServer extends DurableObject<Env> {
	async fetch(request: Request): Promise<Response> {
		const [client, server] = Object.values(new WebSocketPair());

		// Accept the WebSocket as hibernatable so it can survive eviction
		this.ctx.acceptWebSocket(server);

		return new Response(null, { status: 101, webSocket: client });
	}

	webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
		// Echo the received message back to the client
		ws.send(message);
	}

	webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
		// Handle WebSocket close events
	}
}
```

Add a binding and migration for the Durable Object in your Wrangler configuration, alongside the existing `COUNTER` binding:

```jsonc
{
  "durable_objects": {
    "bindings": [
      { "name": "WEBSOCKET_SERVER", "class_name": "WebSocketServer" }
    ]
  },
  "migrations": [
    { "tag": "v2", "new_sqlite_classes": ["WebSocketServer"] }
  ]
}
```

```toml
[[durable_objects.bindings]]
name = "WEBSOCKET_SERVER"
class_name = "WebSocketServer"

[[migrations]]
tag = "v2"
new_sqlite_classes = [ "WebSocketServer" ]
```

With the default options, hibernatable WebSockets remain open across eviction, so messages still round-trip afterwards. Passing `{ webSockets: "close" }` closes them instead:

```js
import { env } from "cloudflare:workers";
import { evictDurableObject } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("WebSocket eviction behavior", () => {
	it("hibernates WebSockets across eviction by default", async () => {
		const id = env.WEBSOCKET_SERVER.idFromName("ws-test");
		const stub = env.WEBSOCKET_SERVER.get(id);

		const response = await stub.fetch("https://example.com", {
			headers: { Upgrade: "websocket" },
		});
		const socket = response.webSocket;
		if (!socket) throw new Error("Expected WebSocket response");
		socket.accept();

		// Hibernatable WebSockets are hibernated, not closed
		await evictDurableObject(stub);

		// Messages still round-trip after eviction wakes the Durable Object
		const message = new Promise((resolve) => {
			socket.addEventListener("message", (event) => {
				resolve(event.data);
			});
		});
		socket.send("after-eviction");
		expect(await message).toBe("after-eviction");
		socket.close(1000, "done");
	});

	it("closes WebSockets when requested", async () => {
		const id = env.WEBSOCKET_SERVER.idFromName("ws-close-test");
		const stub = env.WEBSOCKET_SERVER.get(id);

		const response = await stub.fetch("https://example.com", {
			headers: { Upgrade: "websocket" },
		});
		const socket = response.webSocket;
		if (!socket) throw new Error("Expected WebSocket response");
		socket.accept();

		const closed = new Promise((resolve) => {
			socket.addEventListener("close", (event) => resolve(event));
		});

		// Close WebSockets instead of hibernating them
		await evictDurableObject(stub, { webSockets: "close" });
		expect(await closed).toBeDefined();
	});
});
```

```ts
import { env } from "cloudflare:workers";
import { evictDurableObject } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("WebSocket eviction behavior", () => {
	it("hibernates WebSockets across eviction by default", async () => {
		const id = env.WEBSOCKET_SERVER.idFromName("ws-test");
		const stub = env.WEBSOCKET_SERVER.get(id);

		const response = await stub.fetch("https://example.com", {
			headers: { Upgrade: "websocket" },
		});
		const socket = response.webSocket;
		if (!socket) throw new Error("Expected WebSocket response");
		socket.accept();

		// Hibernatable WebSockets are hibernated, not closed
		await evictDurableObject(stub);

		// Messages still round-trip after eviction wakes the Durable Object
		const message = new Promise<string>((resolve) => {
			socket.addEventListener("message", (event) => {
				resolve(event.data as string);
			});
		});
		socket.send("after-eviction");
		expect(await message).toBe("after-eviction");
		socket.close(1000, "done");
	});

	it("closes WebSockets when requested", async () => {
		const id = env.WEBSOCKET_SERVER.idFromName("ws-close-test");
		const stub = env.WEBSOCKET_SERVER.get(id);

		const response = await stub.fetch("https://example.com", {
			headers: { Upgrade: "websocket" },
		});
		const socket = response.webSocket;
		if (!socket) throw new Error("Expected WebSocket response");
		socket.accept();

		const closed = new Promise<CloseEvent>((resolve) => {
			socket.addEventListener("close", (event) => resolve(event));
		});

		// Close WebSockets instead of hibernating them
		await evictDurableObject(stub, { webSockets: "close" });
		expect(await closed).toBeDefined();
	});
});
```

To evict all currently-running Durable Objects at once (for example, to reset state between tests without deleting persisted data), use `evictAllDurableObjects()`:

```ts
import { evictAllDurableObjects } from "cloudflare:test";
import { afterEach } from "vitest";

afterEach(async () => {
	await evictAllDurableObjects();
});
```

For more details on the eviction helpers, including the `DurableObjectEvictionOptions` interface, refer to the [Test APIs reference](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/#durable-objects).

## Running tests

Run your tests with:

```sh
npx vitest
```

Or add a script to your `package.json`:

```json
{
	"scripts": {
		"test": "vitest"
	}
}
```

## Related resources

* [Workers Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/) \- Full documentation for the Vitest integration
* [Durable Objects testing recipe ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/durable-objects) \- Example from the Workers SDK
* [RPC testing recipe ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/rpc) \- Testing JSRPC with Durable Objects

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/#page","headline":"Testing Durable Objects · Cloudflare Durable Objects docs","description":"Write tests for Durable Objects using the Workers Vitest integration.","url":"https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
