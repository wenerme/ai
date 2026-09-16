---
description: Create a dynamic dispatch Worker to route incoming requests to user Workers in your dispatch namespace.
title: Dynamic dispatch Worker
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Dynamic dispatch Worker

Last updated Sep 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A [dynamic dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dynamic-dispatch-worker) is a specialized routing Worker that directs incoming requests to the appropriate user Workers in your dispatch namespace. Instead of using [Workers Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/), dispatch Workers let you programmatically control request routing through code.

![Figure 1: Workers for Platforms: Main Flow](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1200,height=466,format=svg/_astro/programmable-platforms-1.BCCEhzLr.svg)

Note

You can also create a dispatch Worker from the Cloudflare dashboard. Go to **Workers for Platforms**, select your namespace, and click **Create** > **Dispatch Worker**. The dashboard provides templates for path-based and subdomain-based routing.

#### Why use a dynamic dispatch Worker?

- **Scale**: Route requests to millions of hostnames to different Workers, without defining [Workers Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) configuration for each one
- **Custom routing logic**: Write code to determine exactly how requests should be routed. For example:
  - Store hostname-to-Worker mappings in [Workers KV](https://developers.cloudflare.com/kv/) and look them up dynamically
  - Route requests based on subdomain, path, headers, or other request properties
  - Use [custom metadata](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/) attached to [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) for routing decisions
- **Add platform functionality**: Build additional features at the routing layer:
  - Run authentication checks before requests reach user Workers
  - Remove or add headers or metadata from incoming requests
  - Attach useful context like user IDs or account information
  - Transform requests or responses as needed

### Configure the dispatch namespace binding

To allow your dynamic dispatch Worker to dynamically route requests to Workers in a namespace, you need to configure a dispatch namespace [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/). This binding enables your dynamic dispatch Worker to call any user Worker within that namespace using `env.dispatcher.get()`.

```jsonc
{
	"dispatch_namespaces": [
		{
			"binding": "DISPATCHER",
			"namespace": "my-dispatch-namespace"
		}
	]
}
```

```toml
[[dispatch_namespaces]]
binding = "DISPATCHER"
namespace = "my-dispatch-namespace"
```

Once the binding is configured, your dynamic dispatch Worker can route requests to any Worker in the namespace. Below are common routing patterns you can implement in your dispatcher.

### Pass data and capabilities per request

When your dispatch Worker invokes a user Worker, it can send additional values with that invocation. For example, the dispatch Worker can authenticate a request and send the resulting user ID, permissions, or account information to the user Worker.

This is useful when the context should come from your platform code instead of directly from the incoming request. To send this context, add the values to [`props`](https://developers.cloudflare.com/workers/runtime-apis/context/#props) in the second argument to `env.DISPATCHER.get()`.

In the dispatch Worker, pass the user ID and permissions when you retrieve the user Worker from the dispatch namespace:

*dispatcher/src/index.jsjs*

```js
export default {
	async fetch(request, env) {
		const userId = "user-123";
		const permissions = ["read", "write"];

		const userWorker = env.DISPATCHER.get("user-worker", {
			props: { userId, permissions },
		});

		return userWorker.fetch(request);
	},
};
```

*dispatcher/src/index.tsts*

```ts
export default {
	async fetch(request, env): Promise<Response> {
		const userId = "user-123";
		const permissions = ["read", "write"];

		const userWorker = env.DISPATCHER.get("user-worker", {
			props: { userId, permissions },
		});

		return userWorker.fetch(request);
	},
} satisfies ExportedHandler<Cloudflare.Env>;
```

In the user Worker, receive these values through `ctx.props`. In a [`WorkerEntrypoint`](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/#the-workerentrypoint-class), access them through `this.ctx.props`:

*user-worker/src/index.jsjs*

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class UserWorker extends WorkerEntrypoint {
	async fetch(_request) {
		const { userId, permissions } = this.ctx.props;
		return Response.json({ userId, permissions });
	}
}
```

*user-worker/src/index.tsts*

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

interface UserWorkerProps {
	userId: string;
	permissions: string[];
}

export default class UserWorker extends WorkerEntrypoint<
	Cloudflare.Env,
	UserWorkerProps
> {
	async fetch(_request: Request): Promise<Response> {
		const { userId, permissions } = this.ctx.props;
		return Response.json({ userId, permissions });
	}
}
```

These data values are visible to the user code. The dispatch Worker can select different props for each invocation without changing or redeploying the user Worker.

#### Give access to specific platform functions

You may not want the user Worker to have direct access to all the context from the dispatch Worker. For example, authentication data is managed by your platform and should remain hidden from user code.

In this case, pass a **capability** instead of passing the data directly. A capability exposes specific methods that the user Worker can call, while the underlying data, credentials, and resources remain in the dispatch Worker. Workers passes the capability as an [RPC stub](https://developers.cloudflare.com/workers/runtime-apis/rpc/#structured-cloneable-types-and-more), which forwards method calls to your dispatch Worker.

To create a capability, export a `WorkerEntrypoint` class from your dispatch Worker. The [`ctx.exports`](https://developers.cloudflare.com/workers/runtime-apis/context/#exports) object lets the dispatch Worker create an RPC stub for that exported class, which it can then pass to the user Worker.

The following example shows this pattern. The dispatch Worker uses a site ID and visitor ID to create a `Connector` capability. It passes the capability to the user Worker through `props`, without passing those IDs as separate data values. The user Worker can then call the methods exposed by `Connector`.

In the dispatch Worker, define the `Connector` methods, configure the connector with the site and visitor IDs, and pass it to the user Worker:

*dispatcher/src/index.jsjs*

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class Connector extends WorkerEntrypoint {
	async invoke() {
		return `${this.ctx.props.siteId}:${this.ctx.props.visitorId}`;
	}
}

export default {
	async fetch(request, env, ctx) {
		const siteId = "site-123";
		const visitorId = "visitor-456";
		const connector = ctx.exports.Connector({
			// These props configure the Connector stub.
			// The user Worker cannot read them directly.
			props: { siteId, visitorId },
		});

		const userWorker = env.DISPATCHER.get("user-worker", {
			// The user Worker receives these values through ctx.props.
			props: {
				CONNECTOR: connector,
			},
		});

		return userWorker.fetch(request);
	},
};
```

*dispatcher/src/index.tsts*

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

interface ConnectorProps {
	siteId: string;
	visitorId: string;
}

export class Connector extends WorkerEntrypoint<
	Cloudflare.Env,
	ConnectorProps
> {
	async invoke(): Promise<string> {
		return `${this.ctx.props.siteId}:${this.ctx.props.visitorId}`;
	}
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const siteId = "site-123";
		const visitorId = "visitor-456";
		const connector = ctx.exports.Connector({
			// These props configure the Connector stub.
			// The user Worker cannot read them directly.
			props: { siteId, visitorId },
		});

		const userWorker = env.DISPATCHER.get("user-worker", {
			// The user Worker receives these values through ctx.props.
			props: {
				CONNECTOR: connector,
			},
		});

		return userWorker.fetch(request);
	},
} satisfies ExportedHandler<Cloudflare.Env>;
```

In the user Worker, receive the capability through `this.ctx.props` and call its exposed methods:

*user-worker/src/index.jsjs*

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class UserWorker extends WorkerEntrypoint {
	async fetch(_request) {
		return Response.json({
			connector: await this.ctx.props.CONNECTOR.invoke(),
		});
	}
}
```

*user-worker/src/index.tsts*

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

interface Connector {
	invoke(): Promise<string>;
}

interface UserWorkerProps {
	CONNECTOR: Connector;
}

export default class UserWorker extends WorkerEntrypoint<
	Cloudflare.Env,
	UserWorkerProps
> {
	async fetch(_request: Request): Promise<Response> {
		return Response.json({
			connector: await this.ctx.props.CONNECTOR.invoke(),
		});
	}
}
```

Note

An RPC stub passed through dynamic dispatch props is valid only during the request that received it. If a user Worker stores the stub and tries to invoke it during a later request, Workers rejects the cross-request I/O.

#### Pass data to an Outbound Worker

To send data from the dispatch Worker to an [Outbound Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/), first declare the parameter name in the dispatch namespace binding:

```jsonc
{
	"dispatch_namespaces": [
		{
			"binding": "DISPATCHER",
			"namespace": "my-dispatch-namespace",
			"outbound": {
				"service": "outbound-worker",
				"parameters": ["requestContext"]
			}
		}
	]
}
```

```toml
[[dispatch_namespaces]]
binding = "DISPATCHER"
namespace = "my-dispatch-namespace"

  [dispatch_namespaces.outbound]
  service = "outbound-worker"
  parameters = [ "requestContext" ]
```

In the dispatch Worker, pass a value with the same name through the `outbound` option in the third argument to `env.DISPATCHER.get()`:

*dispatcher/src/index.jsjs*

```js
export default {
	async fetch(request, env) {
		const userId = "user-123";

		const userWorker = env.DISPATCHER.get(
			"user-worker",
			{
				props: { userId },
			},
			{
				outbound: {
					requestContext: {
						userId,
						requestId: crypto.randomUUID(),
					},
				},
			},
		);

		return userWorker.fetch(request);
	},
};
```

*dispatcher/src/index.tsts*

```ts
export default {
	async fetch(request, env): Promise<Response> {
		const userId = "user-123";

		const userWorker = env.DISPATCHER.get(
			"user-worker",
			{
				props: { userId },
			},
			{
				outbound: {
					requestContext: {
						userId,
						requestId: crypto.randomUUID(),
					},
				},
			},
		);

		return userWorker.fetch(request);
	},
} satisfies ExportedHandler<Cloudflare.Env>;
```

In the Outbound Worker, access the value as an environment binding:

*outbound-worker/src/index.jsjs*

```js
export default {
	async fetch(request, env) {
		console.log(env.requestContext.userId, env.requestContext.requestId);
		return fetch(request);
	},
};
```

*outbound-worker/src/index.tsts*

```ts
interface Env {
	requestContext: {
		userId: string;
		requestId: string;
	};
}

export default {
	async fetch(request, env): Promise<Response> {
		console.log(env.requestContext.userId, env.requestContext.requestId);
		return fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

Outbound Worker parameters support JSON values. They are separate from the `props` in the second argument, which are passed to the user Worker.

### Routing examples

![Figure 2: Workers for Platforms: Main Flow](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1200,height=594,format=svg/_astro/programmable-platforms-2.DGAT6ZDR.svg)

#### KV-Based Routing

Store the routing mappings in [Workers KV](https://developers.cloudflare.com/kv/). This allows you to modify your routing logic without requiring you to change or redeploy the dynamic dispatch Worker.

```js
export default {
	async fetch(request, env) {
		try {
			const url = new URL(request.url);

			// Use hostname, path, or any combination as the routing key
			const routingKey = url.hostname;

			// Lookup user Worker name from KV store
			const userWorkerName = await env.USER_ROUTING.get(routingKey);

			if (!userWorkerName) {
				return new Response("Route not configured", { status: 404 });
			}

			// Optional: Cache the KV lookup result
			const userWorker = env.DISPATCHER.get(userWorkerName);
			return await userWorker.fetch(request);
		} catch (e) {
			if (e.message.startsWith("Worker not found")) {
				return new Response("", { status: 404 });
			}
			return new Response(e.message, { status: 500 });
		}
	},
};
```

#### Subdomain-Based Routing

Route subdomains to the corresponding Worker. For example, `my-customer.example.com` will route to the Worker named `my-customer` in the dispatch namespace.

```js
export default {
	async fetch(request, env) {
		try {
			// Extract user Worker name from subdomain
			// Example: customer1.example.com -> customer1
			const url = new URL(request.url);
			const userWorkerName = url.hostname.split(".")[0];

			// Get user Worker from dispatch namespace
			const userWorker = env.DISPATCHER.get(userWorkerName);
			return await userWorker.fetch(request);
		} catch (e) {
			if (e.message.startsWith("Worker not found")) {
				// User Worker doesn't exist in dispatch namespace
				return new Response("", { status: 404 });
			}
			// Could be any other exception from fetch() or from the dispatched Worker
			return new Response(e.message, { status: 500 });
		}
	},
};
```

#### Path-Based routing

Route URL paths to the corresponding Worker. For example, `example.com/customer-1` will route to the Worker named `customer-1` in the dispatch namespace.

```js
export default {
	async fetch(request, env) {
		try {
			const url = new URL(request.url);
			const pathParts = url.pathname.split("/").filter(Boolean);

			if (pathParts.length === 0) {
				return new Response("Invalid path", { status: 400 });
			}

			// example.com/customer-1 -> routes to 'customer-1' worker
			const userWorkerName = pathParts[0];

			const userWorker = env.DISPATCHER.get(userWorkerName);
			return await userWorker.fetch(request);
		} catch (e) {
			if (e.message.startsWith("Worker not found")) {
				return new Response("", { status: 404 });
			}
			return new Response(e.message, { status: 500 });
		}
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/#page","headline":"Dynamic dispatch Worker · Cloudflare for Platforms docs","description":"Create a dynamic dispatch Worker to route incoming requests to user Workers in your dispatch namespace.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
