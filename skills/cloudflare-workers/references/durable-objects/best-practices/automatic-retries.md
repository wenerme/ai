---
description: How the runtime retries failed calls to Durable Objects, and how to mark methods as safe to retry and set retry limits per stub.
title: Automatic retries
image: https://developers.cloudflare.com/durable-objects/best-practices/automatic-retries/og.png?v=757c7fff96189b33
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt
> Use this file to discover all available pages before exploring further.

# Automatic retries

Last updated Nov 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/durable-objects/best-practices/automatic-retries/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The runtime retries some failed calls to a Durable Object. This covers `fetch()` and RPC method calls through a stub, whether the caller is a Worker or another Durable Object. You do not need to change your code to get these retries.

## Which failures the runtime retries

The runtime retries a call when it fails with an error whose `.retryable` property is `true`, and one of the following is true:

- The request never reached the Durable Object. For example, the Durable Object was restarting or moving to another machine.
- The connection dropped, and the runtime cannot tell whether the Durable Object received the request.

In the second case, the runtime sends the retry with the same request identity as the first attempt. If the Durable Object already received the first attempt, it rejects the retry, and the call fails with the original error. A method never runs twice because of a retry, unless you mark it with [`retryable()`](#mark-methods-as-safe-to-run-more-than-once).

The runtime does not retry:

- Errors thrown by your Durable Object code.
- Errors that happen after the request reaches the Durable Object.
- Errors with `.overloaded` set to `true`. Retrying would add load to a Durable Object that cannot keep up.
- HTTP error responses, such as a `500`. These are responses, not errors.

## Default limits

By default, the runtime makes up to five attempts in total, which is the first attempt plus four retries. No retry starts more than 10 seconds after the initial call starts. The runtime never cancels the first attempt, but it cancels a retry that is still running when the 10 seconds run out.

The runtime spaces out retries with exponential backoff and jitter.

When the runtime stops retrying, the call fails with the error from the first failed attempt. If a later attempt fails with an error that the runtime does not retry, the call fails with that error instead.

Retries do not count toward the [subrequest limit](https://developers.cloudflare.com/workers/platform/limits/#subrequests), including when you change the retry limits for a stub. Only the first attempt does.

To change these limits for a stub, refer to [Set retry limits for a stub](#set-retry-limits-for-a-stub).

## Calls that are not retried

The runtime only retries a call that it can send again unchanged. It does not retry:

- A `fetch()` call whose request body is a `ReadableStream`. Bodies such as strings, `ArrayBuffer`, `Blob`, `FormData`, and `URLSearchParams` can be sent again.
- An RPC call whose arguments include a stream, a stub, a function, or an [`RpcTarget`](https://developers.cloudflare.com/workers/runtime-apis/rpc/#class-instances). Arguments made only of [structured cloneable](https://developers.cloudflare.com/workers/runtime-apis/rpc/#structured-cloneable-types-and-more) values can be sent again.
- A call that uses [promise pipelining](https://developers.cloudflare.com/workers/runtime-apis/rpc/#promise-pipelining). This covers calls on an unresolved result, and calls on stubs that a Durable Object method returns. After you pipeline a call on a result, the runtime also stops retrying the call that produces that result.
- A call through a stub that your Worker received as an RPC argument or return value. Only stubs that you create with a Durable Object namespace, such as with [`getByName()`](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname), retry calls.

## Mark methods as safe to run more than once

If the connection drops after a method starts, the runtime cannot tell whether the method ran. By default, the Durable Object rejects the retry, and your code receives the error.

If a method is idempotent, mark it with `retryable()` from `cloudflare:durable-objects`. The Durable Object then runs the retry even if it already received the call, so the call can succeed instead of failing. Call `retryable()` with the methods on the class prototype, for example from a static block:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { retryable } from "cloudflare:durable-objects";

export class Cart extends DurableObject {
	static {
		retryable(this.prototype.setQuantity);
	}
	// Idempotent: a second run sets the same quantity.
	async setQuantity(itemId, quantity) {
		await this.ctx.storage.put(itemId, quantity);
	}

	// Not retryable: a second run would add another item.
	async addOne(itemId) {
		const quantity = (await this.ctx.storage.get(itemId)) ?? 0;
		await this.ctx.storage.put(itemId, quantity + 1);
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { retryable } from "cloudflare:durable-objects";

export class Cart extends DurableObject {
	static {
		retryable(this.prototype.setQuantity);
	}
	// Idempotent: a second run sets the same quantity.
	async setQuantity(itemId: string, quantity: number): Promise<void> {
		await this.ctx.storage.put(itemId, quantity);
	}

	// Not retryable: a second run would add another item.
	async addOne(itemId: string): Promise<void> {
		const quantity = (await this.ctx.storage.get<number>(itemId)) ?? 0;
		await this.ctx.storage.put(itemId, quantity + 1);
	}
}
```

`retryable()` does not change which failures the runtime retries or how many retries it makes. It only lets a marked method run again when the runtime cannot tell whether the first attempt reached it.

The mark belongs to the function. A subclass inherits a marked method. An override, a bound copy, or a wrapper is not marked unless you also pass it to `retryable()`.

You can mark the `fetch()` handler with `retryable(this.prototype.fetch)`.

Each attempt creates its own return value. If a marked method returns an `RpcTarget`, its `[Symbol.dispose]()` method can run once for each attempt.

`retryable()` throws a `TypeError` if any argument is not a function. In that case, it marks none of the functions.

## Set retry limits for a stub

To change the retry limits for calls through a stub, pass a `retry` object when you create the stub with [`get()`](https://developers.cloudflare.com/durable-objects/api/namespace/#get) or [`getByName()`](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname). The limits apply to every `fetch()` and RPC call through that stub.

*src/index.jsjs*

```js
export default {
	async fetch(request, env) {
		// Retry at most once, and start no retry after 2 seconds.
		const stub = env.CART.getByName("user-123", {
			retry: { maxRetries: 1, timeoutMs: 2000 },
		});

		await stub.setQuantity("item-1", 3);
		return new Response("OK");
	},
};
```

*src/index.tsts*

```ts
export interface Env {
	CART: DurableObjectNamespace<Cart>;
}

export default {
	async fetch(request, env): Promise<Response> {
		// Retry at most once, and start no retry after 2 seconds.
		const stub = env.CART.getByName("user-123", {
			retry: { maxRetries: 1, timeoutMs: 2000 },
		});

		await stub.setQuantity("item-1", 3);
		return new Response("OK");
	},
} satisfies ExportedHandler<Env>;
```

The `retry` object has two optional keys:

| Key | Description | Allowed values | Default |
| --- | --- | --- | --- |
| `maxRetries` | Number of retries after the first attempt. Set to `0` to turn off retries for the stub. | Integer from `0` to `10` | `4` |
| `timeoutMs` | Time in milliseconds from the start of a call after which no retry starts. | Integer from `500` to `60000` | `10000` |

A key that you leave out uses its default.

If a value is not a number, `get()` and `getByName()` throw a `TypeError`. If a value is a number outside its allowed range or is not an integer, they throw a `RangeError`.

## Handle errors that reach your code

Your code still receives errors that the runtime does not retry, and errors from calls where the runtime ran out of retries. For how to handle them, refer to [Error handling](https://developers.cloudflare.com/durable-objects/best-practices/error-handling/).

If you also retry calls in your own code, each of your attempts can include retries by the runtime, up to five attempts in total by default. Keep your own retry count low, and use exponential backoff.

## Related resources

- [Error handling](https://developers.cloudflare.com/durable-objects/best-practices/error-handling/)
- [Durable Object Namespace](https://developers.cloudflare.com/durable-objects/api/namespace/)
- [Workers RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/best-practices/automatic-retries/#page","headline":"Automatic retries","description":"How the runtime retries failed calls to Durable Objects, and how to mark methods as safe to retry and set retry limits per stub.","url":"https://developers.cloudflare.com/durable-objects/best-practices/automatic-retries/","inLanguage":"en","image":"https://developers.cloudflare.com/durable-objects/best-practices/automatic-retries/og.png?v=757c7fff96189b33","dateModified":"2026-11-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
