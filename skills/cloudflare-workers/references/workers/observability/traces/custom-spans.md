---
description: Create custom spans to trace your own application logic alongside Cloudflare's automatic instrumentation.
title: Custom spans
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom spans

Last updated Sep 25, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/observability/traces/custom-spans/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Workers [automatically instruments](https://developers.cloudflare.com/workers/observability/traces/spans-and-attributes/) platform operations like fetch calls, KV reads, and D1 queries. Custom spans let you extend this visibility into your own application logic, so you can trace custom code paths alongside the built-in instrumentation.

The custom spans API is available in two ways — both provide the same methods and behave identically:

- **`import { tracing } from "cloudflare:workers"`** — works anywhere in your codebase, including utility functions, libraries, and modules that do not have access to the handler context.
- **`ctx.tracing`** — available on the [`ExecutionContext`](https://developers.cloudflare.com/workers/runtime-apis/context/) passed to your handler, convenient when you are already working within a handler.

There are three span creation methods:

- **`enterSpan()`** — creates a span that automatically ends when the callback returns or its returned promise settles. Use this for most instrumentation.
- **`startActiveSpan()`** — creates a span that is active during a callback, and that you end manually by calling `span.end()`. Use this when the span must outlive the callback, such as when instrumenting streams or other long-lived operations.
- **`startSpan()`** — creates a span without making it active, and that you end manually by calling `span.end()`. Use this to time an operation when you do not need other spans to nest under it.

You can also call **`getActiveSpan()`** to get the currently active span, so you can add attributes or record exceptions without passing the span object through your code.

## Enable tracing

Custom spans require tracing to be enabled on your Worker. If you have not already done so, set `observability.traces.enabled` to `true` in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/#observability):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "observability": {
    "traces": {
      "enabled": true
    }
  }
}
```

```toml
[observability.traces]
enabled = true
```

## Create a custom span

Use `tracing.enterSpan()` to wrap a section of code in a named span. The span automatically becomes a child of whichever span is currently active, and ends when the callback returns or its returned promise settles.

The following example uses both access methods — the `cloudflare:workers` import and `ctx.tracing` — to show that they are interchangeable:

*src/index.jsjs*

```js
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request, env, ctx) {
		// Using the import
		return tracing.enterSpan("handleRequest", async (span) => {
			span.setAttribute("url.path", new URL(request.url).pathname);

			const user = await ctx.tracing.enterSpan("auth", async () => {
				// Using ctx.tracing
				return authenticate(request, env);
			});

			return buildResponse(user);
		});
	},
};
```

*src/index.tsts*

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		// Using the import
		return tracing.enterSpan("handleRequest", async (span) => {
			span.setAttribute("url.path", new URL(request.url).pathname);

			const user = await ctx.tracing.enterSpan("auth", async () => {
				// Using ctx.tracing
				return authenticate(request, env);
			});

			return buildResponse(user);
		});
	},
};
```

## API reference

### `tracing.enterSpan(name, callback, ...args)`

Creates a new span and runs `callback` inside it. The span is automatically ended when the callback returns (synchronous or asynchronous) or throws.

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the span. This appears in trace visualizations. |
| `callback` | `(span: Span, ...args: A) => T` | The function to execute within the span. Receives the `Span` object as its first argument, followed by any additional arguments passed to `enterSpan`. |
| `...args` | `A` | Optional additional arguments forwarded to the callback after the `span` parameter. |

**Returns:** The return value of `callback`.

**Behavior:**

- The new span is a child of whichever span is currently active on the async context. If no span is active, it becomes a child of the request's root span.
- Nested `enterSpan` calls and runtime-created spans (such as `fetch` or KV operations) that run inside the callback automatically become children of this span.
- The span ends when the callback returns synchronously, throws synchronously, or when its returned promise fulfills or rejects.

```ts
// Synchronous callback — span ends when the function returns
const result = tracing.enterSpan("parse", (span) => {
	span.setAttribute("format", "json");
	return JSON.parse(body);
});

// Async callback — span ends when the promise settles
const data = await tracing.enterSpan("fetchData", async (span) => {
	const res = await fetch("https://api.example.com/data");
	span.setAttribute("http.response.status_code", res.status);
	return res.json();
});

// Forwarding arguments
const doubled = tracing.enterSpan("compute", (span, x) => x * 2, 21);
```

### `tracing.startActiveSpan(name, callback, ...args)`

Creates a new span, makes it the active span while `callback` runs, and returns the callback result **without** automatically ending the span. You must call `span.end()` explicitly when the operation is complete.

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the span. This appears in trace visualizations. |
| `callback` | `(span: Span, ...args: A) => T` | The function to execute while the span is active. Receives the `Span` object as its first argument, followed by any additional arguments. |
| `...args` | `A` | Optional additional arguments forwarded to the callback after the `span` parameter. |

**Returns:** The return value of `callback`.

**Behavior:**

- Unlike `enterSpan`, the span is **not** automatically ended when the callback returns or throws. You are responsible for calling `span.end()`.
- If you forget to call `span.end()`, the span is still submitted when the request-owned span object is destroyed, as a backstop. Do not rely on this behavior — always call `span.end()` explicitly.

Caution

`startActiveSpan` gives you manual lifetime management, but **only in an "active during callback" shape**. The span is the active context parent during the callback, so any child spans or platform operations created inside the callback are correctly nested. After the callback returns, the span is no longer the active parent, even though it remains open. This means you cannot create child spans of a `startActiveSpan` span from outside the callback.

Use `startActiveSpan` when you need a span to cover an operation that extends beyond a single callback — for example, instrumenting a stream pipeline where the span should remain open until the stream is fully consumed:

*src/index.jsjs*

```js
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request, env, ctx) {
		const body = request.body;
		if (!body) return new Response("No body", { status: 400 });

		// The span is active during the callback, so the pipeThrough
		// operation is correctly nested. The span stays open after
		// the callback returns, until flush() calls span.end().
		const stream = tracing.startActiveSpan("process-stream", (span) => {
			span.setAttribute(
				"request.content_type",
				request.headers.get("content-type") ?? "unknown",
			);

			return body.pipeThrough(
				new TransformStream({
					transform(chunk, controller) {
						// Process each chunk
						controller.enqueue(chunk);
					},
					flush() {
						span.setAttribute("stream.status", "complete");
						span.end();
					},
					cancel() {
						span.setAttribute("stream.status", "cancelled");
						span.end();
					},
				}),
			);
		});

		return new Response(stream);
	},
};
```

*src/index.tsts*

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const body = request.body;
		if (!body) return new Response("No body", { status: 400 });

		// The span is active during the callback, so the pipeThrough
		// operation is correctly nested. The span stays open after
		// the callback returns, until flush() calls span.end().
		const stream = tracing.startActiveSpan("process-stream", (span) => {
			span.setAttribute(
				"request.content_type",
				request.headers.get("content-type") ?? "unknown",
			);

			return body.pipeThrough(
				new TransformStream({
					transform(chunk, controller) {
						// Process each chunk
						controller.enqueue(chunk);
					},
					flush() {
						span.setAttribute("stream.status", "complete");
						span.end();
					},
					cancel() {
						span.setAttribute("stream.status", "cancelled");
						span.end();
					},
				}),
			);
		});

		return new Response(stream);
	},
};
```

If you do not need the span to be active during a callback, use [`startSpan`](#tracingstartspanname) instead.

### `tracing.startSpan(name)`

Creates a new span and returns it **without** making it the active span. You must call `span.end()` explicitly when the operation is complete.

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the span. This appears in trace visualizations. |

**Returns:** A `Span`.

**Behavior:**

- The new span is a child of whichever span is currently active on the async context. If no span is active, it becomes a child of the request's root span.
- The span never becomes the active span. Spans created by `enterSpan`, `startActiveSpan`, and platform operations (such as `fetch` or KV operations) that run while it is open are **not** children of this span. They are siblings.
- If you forget to call `span.end()`, the span is still submitted when the request-owned span object is destroyed, as a backstop. Do not rely on this behavior — always call `span.end()` explicitly.

Use `startSpan` when you want to measure an operation whose start and end happen in different places, such as in event callbacks or across the methods of a class, and you do not need other spans nested under it:

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		// ...
		const span = tracing.startSpan("cache-warmup");
		span.setAttribute("cache.keys", keys.length);

		try {
			await warmCache(keys);
			span.setAttribute("cache.warmup.status", "complete");
		} catch (err) {
			span.recordException(err as Error);
			throw err;
		} finally {
			span.end();
		}
		// ...
	},
};
```

### `tracing.getActiveSpan()`

Returns the span that is currently active on the async context.

**Returns:** A `Span`, or `undefined`.

**Behavior:**

- Inside a request, returns the `Span` that is currently considered active. If no spans have been explicitly created with `enterSpan` or `startActiveSpan` or the system itself, it will return the root span of the current invocation. You can use it to add attributes or record exceptions on the root span.
- Returns `undefined` outside a request, such as in the top-level scope of your module, or in code that runs in an async context captured outside a request.
- Spans created with `startSpan` never become active, so `getActiveSpan` never returns them.

Use `getActiveSpan` to annotate the current span without passing the span object through your code:

*src/index.jsjs*

```js
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request, env, ctx) {
		const user = await authenticate(request, env);

		// No custom span is active, so this annotates the root span
		tracing.getActiveSpan()?.setAttributes({
			"user.id": user.id,
			"user.plan": user.plan,
		});

		return tracing.enterSpan("render", async () => {
			// ...
			return new Response("OK");
		});
	},
};
```

*src/index.tsts*

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const user = await authenticate(request, env);

		// No custom span is active, so this annotates the root span
		tracing.getActiveSpan()?.setAttributes({
			"user.id": user.id,
			"user.plan": user.plan,
		});

		return tracing.enterSpan("render", async () => {
			// ...
			return new Response("OK");
		});
	},
};
```

### `Span`

`enterSpan` and `startActiveSpan` pass a `Span` object to their callbacks, and `startSpan` and `getActiveSpan` return one. It provides methods to annotate the span with metadata and control its lifecycle.

#### `span.setAttribute(key, value)`

Sets an attribute on the span.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | The attribute name. |
| `value` | `string \| number \| boolean \| undefined` | The attribute value. Passing `undefined` is a no-op. |

**Returns:** The same `Span`, so you can chain calls.

Attributes appear alongside the span in your traces and OpenTelemetry exports.

```ts
span
	.setAttribute("user.plan", "enterprise")
	.setAttribute("item.count", 42)
	.setAttribute("cache.hit", true);
```

#### `span.setAttributes(attributes)`

Sets multiple attributes on the span at once. This works the same as calling `setAttribute` for each entry.

| Parameter | Type | Description |
| --- | --- | --- |
| `attributes` | `Record<string, string \| number \| boolean \| undefined>` | An object that maps attribute names to values. Entries with `undefined` values are ignored. |

**Returns:** The same `Span`, so you can chain calls.

```ts
span.setAttributes({
	"user.plan": "enterprise",
	"item.count": 42,
	"cache.hit": true,
	"optional.field": undefined, // ignored
});
```

#### `span.recordException(exception)`

Records an exception event on the span. The event includes a timestamp and appears in your traces and OpenTelemetry exports.

| Parameter | Type | Description |
| --- | --- | --- |
| `exception` | [`Exception`](#typescript-types) | The exception to record. |

You can pass any of the following:

- An `Error` object. The runtime records its `name`, `message`, and `stack`.
- A string, which the runtime records as the exception message.
- An object with at least one of `code`, `name`, or `message`, and an optional `stack`. `code` can be a string or a number.

The runtime ignores the call if the span is not being traced or has already ended, or if you pass an object that has none of `code`, `name`, or `message`.

Recording an exception does not end the span or change how it ends. It also does not catch or rethrow the error. You still handle the error in your own code.

```ts
await tracing.startActiveSpan("chargeCard", async (span) => {
	try {
		return await chargeCard(token, amount);
	} catch (err) {
		span.recordException(err as Error);
		throw err;
	} finally {
		span.end();
	}
});
```

```ts
// Strings and plain objects are also accepted
span.recordException("Upstream returned an empty body");
span.recordException({ code: "RATE_LIMITED", message: "Too many requests" });
```

#### `span.isTraced`

A `readonly boolean` indicating whether this invocation is being traced. When the request is not sampled (based on your [`head_sampling_rate`](https://developers.cloudflare.com/workers/observability/traces/#sampling)), `isTraced` is `false` and `enterSpan` still runs the callback but does not record any telemetry.

You can use this to skip expensive attribute computation when the request is not being traced:

```ts
tracing.enterSpan("process", (span) => {
	if (span.isTraced) {
		span.setAttribute(
			"request.body.preview",
			JSON.stringify(body).slice(0, 200),
		);
	}
	return processBody(body);
});
```

#### `span.end()`

Ends the span and submits its attributes to the tracing system. This method is idempotent. Calling it multiple times has no effect after the first call. After `end()` is called, `span.isTraced` returns `false` and any further method calls to annotate the span are silently ignored, including calls from in-flight async work that has not yet completed.

- For spans created with `enterSpan`, you do not need to call `end()`. The runtime calls it automatically. Calling `end()` yourself is safe, but could end the span early.
- For spans created with `startActiveSpan` or `startSpan`, you **must** call `end()` to submit the span.
- For the root span returned by `getActiveSpan()` outside any custom span, `end()` has no effect. The runtime ends the root span when the invocation completes.

```ts
const span = tracing.startSpan("manual-op");
span.setAttribute("step", "processing");
await doWork();

// Later, when the work is truly complete:
span.end(); // Span is submitted
span.end(); // No-op, safe to call again
```

## Nested spans

Spans nest automatically based on the JavaScript async context. Any `enterSpan` call or platform operation (such as `fetch` and `env.MY_KV.get()`) that runs inside a callback becomes a child of the enclosing span.

*src/index.jsjs*

```js
import { tracing } from "cloudflare:workers";

async function handleOrder(env, orderId) {
	return tracing.enterSpan("handleOrder", async (span) => {
		span.setAttribute("order.id", orderId);

		// This KV read is automatically a child of "handleOrder"
		const order = await env.ORDERS_KV.get(orderId, "json");

		// This nested span is also a child of "handleOrder"
		const total = tracing.enterSpan("calculateTotal", (innerSpan) => {
			innerSpan.setAttribute("item.count", order.items.length);
			return order.items.reduce((sum, item) => sum + item.price, 0);
		});

		// This fetch is a child of "handleOrder"
		await fetch("https://api.example.com/notify", {
			method: "POST",
			body: JSON.stringify({ orderId, total }),
		});

		return new Response(JSON.stringify({ orderId, total }));
	});
}
```

*src/index.tsts*

```ts
import { tracing } from "cloudflare:workers";

async function handleOrder(env: Env, orderId: string) {
	return tracing.enterSpan("handleOrder", async (span) => {
		span.setAttribute("order.id", orderId);

		// This KV read is automatically a child of "handleOrder"
		const order = await env.ORDERS_KV.get(orderId, "json");

		// This nested span is also a child of "handleOrder"
		const total = tracing.enterSpan("calculateTotal", (innerSpan) => {
			innerSpan.setAttribute("item.count", order.items.length);
			return order.items.reduce(
				(sum: number, item: any) => sum + item.price,
				0,
			);
		});

		// This fetch is a child of "handleOrder"
		await fetch("https://api.example.com/notify", {
			method: "POST",
			body: JSON.stringify({ orderId, total }),
		});

		return new Response(JSON.stringify({ orderId, total }));
	});
}
```

![Trace waterfall showing custom spans nested alongside automatic KV and fetch instrumentation](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1988,height=670,format=webp/_astro/wobs_custom_spans_screenshot.B-hsHjyv.png)

## Logging within spans

`console.log()` and other console methods emit log events that are automatically attributed to the currently active span. This means log output from inside an `enterSpan` or `startActiveSpan` callback is associated with that span in your traces and OpenTelemetry exports.

```ts
tracing.enterSpan("processPayment", async (span) => {
	console.log("Starting payment processing"); // attributed to "processPayment"
	const result = await chargeCard(token, amount);
	console.log("Payment complete", result.id); // also attributed to "processPayment"
});
```

## TypeScript types

The full type declarations for the custom spans API:

```ts
declare module "cloudflare:workers" {
	namespace tracing {
		function enterSpan<T, A extends unknown[]>(
			name: string,
			callback: (span: Span, ...args: A) => T,
			...args: A
		): T;

		function startActiveSpan<T, A extends unknown[]>(
			name: string,
			callback: (span: Span, ...args: A) => T,
			...args: A
		): T;

		function startSpan(name: string): Span;

		function getActiveSpan(): Span | undefined;
	}

	type Exception =
		| string
		| { code: string | number; name?: string; message?: string; stack?: string }
		| { code?: string | number; name: string; message?: string; stack?: string }
		| { code?: string | number; name?: string; message: string; stack?: string };

	class Span {
		readonly isTraced: boolean;
		setAttribute(key: string, value: string | number | boolean): this;
		setAttributes(
			attributes: Record<string, string | number | boolean | undefined>,
		): this;
		recordException(exception: Exception): void;
		end(): void;
	}
}
```

The same API is available on the handler context as `ctx.tracing`, with the same types.

## Choosing a span creation method

|  | `enterSpan` | `startActiveSpan` | `startSpan` |
| --- | --- | --- | --- |
| Span ends | Automatically, when the callback returns, throws, or its returned promise settles | Manually, when you call `span.end()` | Manually, when you call `span.end()` |
| Active context scope | During the callback | During the callback | Never active |
| Use case | Most instrumentation — sync and async work that fits within a single callback | Operations that outlive the callback, such as stream pipelines | Timing an operation with no nested spans, when you manage the start and end yourself |
| Error handling | Span auto-ends on throw | Span stays open on throw. Call `span.end()` or rely on the runtime backstop | Span stays open on throw. Call `span.end()` or rely on the runtime backstop |

`enterSpan` and `startActiveSpan` set the span as the active context parent **only during the callback**. After the callback returns, the span is no longer the active parent. With `enterSpan`, this distinction does not matter because the span is also ended. With `startActiveSpan`, the span remains open but is no longer the context parent — new spans created after the callback returns are not children of this span. `startSpan` never sets the span as the active context parent, so no spans are ever created as its children.

## Data limits

The runtime limits how much data you can add to a custom span:

- **Span names are truncated to 64 bytes.**
- **Each span can hold approximately 64 KB of attribute and exception data.** Attribute keys and values, and the `code`, `name`, `message`, and `stack` of recorded exceptions, all count toward this limit.

After a span reaches its data limit, the runtime ignores further `setAttribute`, `setAttributes`, and `recordException` calls on that span. It adds two attributes to the span so you can tell that data was dropped:

| Attribute | Value |
| --- | --- |
| `cloudflare.warning.type` | `span_data_limit_exceeded` |
| `cloudflare.warning.message` | A description of the attribute or exception that was dropped, and its size. |

## Limitations

- **No manual parent-child wiring.** Parent-child relationships are determined by the JavaScript async context automatically.
- **No `spanContext()` (trace/span IDs) yet.** Access to trace and span identifiers for manual propagation across boundaries is planned for a future release.
- **No `setStatus` yet.** Setting span status is planned for a future release.

For other tracing limitations, refer to the [known limitations](https://developers.cloudflare.com/workers/observability/traces/known-limitations/) page.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/traces/custom-spans/#page","headline":"Custom spans","description":"Create custom spans to trace your own application logic alongside Cloudflare's automatic instrumentation.","url":"https://developers.cloudflare.com/workers/observability/traces/custom-spans/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
