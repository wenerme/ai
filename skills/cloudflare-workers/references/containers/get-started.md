---
description: Deploy your first Container on Cloudflare by building an image, configuring a Worker, and routing requests to container instances.
title: Get started
image: https://developers.cloudflare.com/containers/get-started/og.png?v=82557fc11168d06b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Nov 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/get-started/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

In this guide, you will deploy a Worker that can make requests to one or more Containers in response to end-user requests. In this example, each container runs a small webserver written in Go.

This example Worker should give you a sense for simple Container use, and provide a starting point for more complex use cases.

This guide uses the [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/). A Durable Object starts its container through `ctx.container` and forwards requests to it.

## Prerequisites

### Ensure Docker is running locally

In this guide, we will build and push a container image alongside your Worker code. By default, this process uses [Docker ↗︎](https://www.docker.com/) to do so.

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗︎](https://docs.docker.com/desktop/). Other tools like [Colima ↗︎](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## Deploy your first Container

Run the following command to create and deploy a new Worker with a container, from the starter template:

npmyarnpnpm

```
npm create cloudflare@latest -- --template=cloudflare/templates/containers-template
```

```
yarn create cloudflare --template=cloudflare/templates/containers-template
```

```
pnpm create cloudflare@latest --template=cloudflare/templates/containers-template
```

When you want to deploy a code change to either the Worker or Container code, you can run the following command using [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/):

npmyarnpnpm

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

On deploy, Wrangler uploads your Worker, builds and pushes the container image with Docker, and updates container instances on Cloudflare's network. The first build and push usually take the longest. Later deploys [reuse cached image layers ↗︎](https://docs.docker.com/build/cache/).

Note

After you deploy your Worker for the first time, wait several minutes before you expect container requests to succeed. The Worker URL may respond while Cloudflare is still provisioning containers. During that time, calls into the container can error.

### Check deployment status

After deploying, list containers in your account and their status:

npmyarnpnpm

```
npx wrangler containers list
```

```
yarn wrangler containers list
```

```
pnpm wrangler containers list
```

List images in the Cloudflare Registry:

npmyarnpnpm

```
npx wrangler containers images list
```

```
yarn wrangler containers images list
```

```
pnpm wrangler containers images list
```

### Make requests to Containers

Open the URL for your Worker. It should look like `https://hello-containers.<YOUR_WORKERS_SUBDOMAIN>.workers.dev`.

- Requests to `/container/1` or `/container/2` route to specific containers. Each path after `/container/` maps to a unique container.
- Requests to `/lb` load-balance across three containers chosen at random.
- Requests to `/singleton` always route to the same container.
- Requests to `/error` make a dedicated test container exit with an error.

Read the response body to confirm which instance handled the request. If the Worker responds but container routes still error, wait for provisioning, then check [Containers ↗︎](https://dash.cloudflare.com/?to=/:account/workers/containers) logs in the dashboard.

## Understanding the Code

Now that you've deployed your first container, let's explain what is happening in your Worker's code, in your configuration file, in your container's code, and how requests are routed.

### Configuration

Your [Wrangler configuration file](https://developers.cloudflare.com/containers/configuration/wrangler/) defines the configuration for both your Worker and your container:

```jsonc
{
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
			"images": {
				"base": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_CONTAINER",
				"class_name": "MyContainer",
			},
		],
	},
	"exports": {
		"MyContainer": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

```toml
[[containers]]
class_name = "MyContainer"
scheduling_policy = "durable_object"

[containers.images.base]
dockerfile = "./Dockerfile"

[[durable_objects.bindings]]
name = "MY_CONTAINER"
class_name = "MyContainer"

[exports.MyContainer]
type = "durable-object"
storage = "sqlite"
```

Important points about this config:

- `class_name` must be a [Durable Object class name](https://developers.cloudflare.com/durable-objects/api/base/).
- `scheduling_policy` is `durable_object`, so the Durable Object chooses the image and instance type each time it starts a container. Refer to [Scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/).
- `images.base` names an image that Wrangler builds from the Dockerfile. The Durable Object passes it to `start()` as `ctx.container.images.base`.
- The `exports` entry declares the Durable Object class with SQLite storage. Existing applications that use the legacy `migrations` array can continue to use it, but `exports` and `migrations` cannot be combined.

### The Container Image

Your container image must be able to run on the `linux/amd64` architecture, but aside from that, has few limitations.

In the example you just deployed, it is a simple Golang server that responds to requests on port 8080 using the `MESSAGE` and `INSTANCE_ID` environment variables that the Durable Object passes when it starts the container. It also answers `/health` so the Durable Object can check that the server is ready.

```go
func handler(w http.ResponseWriter, r *http.Request) {
	message := os.Getenv("MESSAGE")
	instanceId := os.Getenv("INSTANCE_ID")
	fmt.Fprintf(w, "Hi, I'm a container and this is my message: \"%s\", my instance ID is: %s", message, instanceId)
}
```

Note

After deploying the example code, to deploy a different image, you can replace the provided image with one of your own.

### Worker code

#### Container configuration

`MyContainer` extends [`DurableObject`](https://developers.cloudflare.com/durable-objects/api/base/). It starts its container on the first request, waits for the container's HTTP server, and forwards requests to it:

```ts
const PORT = 8080;
const INACTIVITY_TIMEOUT_MS = 2 * 60 * 1000;

export class MyContainer extends DurableObject<Env> {
	private starting: Promise<void> | undefined;
	private monitoring: Promise<void> | undefined;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;
		if (container?.running) {
			// Restore the timeout and exit monitoring after a DO restart.
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
			this.observeExit();
		}
	}

	async fetch(request: Request): Promise<Response> {
		// Share startup across concurrent requests, including after a failed attempt.
		this.starting ??= this.startAndWaitForPort().finally(() => {
			this.starting = undefined;
		});
		await this.starting;

		const url = new URL(request.url);
		url.protocol = "http:";
		url.host = "container";
		const forwarded = new Request(url, request);
		forwarded.headers.delete("host");
		return this.ctx.container!.getTcpPort(PORT).fetch(forwarded);
	}

	private async startAndWaitForPort(): Promise<void> {
		const container = this.ctx.container!;
		if (!container.running) {
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
				env: {
					MESSAGE: "I was passed in when the Durable Object started me!",
					INSTANCE_ID: this.ctx.id.toString(),
				},
			});
		}
		this.observeExit();
		await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);

		// running means startup was requested, not that the HTTP server is ready.
		const port = container.getTcpPort(PORT);
		for (let attempt = 0; attempt < 100; attempt++) {
			try {
				const response = await port.fetch("http://container/health", {
					signal: AbortSignal.timeout(1000),
				});
				await response.body?.cancel();
				if (response.ok) return;
			} catch {
				// The port may not be listening yet. Retry the readiness probe only.
			}
			await scheduler.wait(200);
		}
		throw new Error("Container did not become ready on port 8080");
	}

	private observeExit(): void {
		if (this.monitoring) return;
		this.monitoring = this.ctx
			.container!.monitor()
			.then(() => console.log("Container exited successfully"))
			.catch((error: unknown) => console.error("Container failed:", error))
			.finally(() => {
				this.monitoring = undefined;
			});
		this.ctx.waitUntil(this.monitoring);
	}
}
```

This code does the following:

- [`start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start) boots the container with the `base` image, the `lite` instance type, no Internet access, and two environment variables. It returns before the container is ready.
- The readiness loop sends requests to `/health` through [`getTcpPort()`](https://developers.cloudflare.com/containers/api/durable-object-container/#gettcpport) until the server answers.
- [`setInactivityTimeout()`](https://developers.cloudflare.com/containers/api/durable-object-container/#setinactivitytimeout) keeps the container running for two minutes after the Durable Object becomes inactive. The constructor sets the timeout again when the Durable Object restarts while its container runs.
- `getTcpPort(PORT).fetch()` forwards each request to the container.
- [`monitor()`](https://developers.cloudflare.com/containers/api/durable-object-container/#monitor) logs when the container exits. On the `/error` route, the container exits with code `1`, and `monitor()` rejects with the error.

Because `MyContainer` is a Durable Object, it has access to the full Durable Object API. The Durable Object handles routing, lifecycle, and persistent state, while the container process runs your image inside a Linux VM. This means you can use [`this.ctx.storage`](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) to persist data that survives container restarts and resides close to the container itself.

For all properties and methods, refer to the [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/).

#### Routing to Containers

When a request enters Cloudflare, your Worker's [`fetch` handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/) is invoked. This is the code that handles the incoming request. The example code uses the [Hono ↗︎](https://hono.dev/) framework to route requests. It launches containers in two ways, on different routes:

- Making requests to `/container/` passes requests to a new container for each path. This is done by spinning up a new Container instance. You may note that the first request to a new path takes longer than subsequent requests, this is because a new container is booting.

  ```ts
  app.get("/container/:id", (c) =>
  	c.env.MY_CONTAINER.getByName(`/container/${c.req.param("id")}`).fetch(
  		c.req.raw,
  	),
  );
  ```

- Making requests to `/lb` will load balance requests across several containers. The Worker picks a name at random from a fixed pool (in this case three), then routes to that Container instance. You can replace this with any routing or load balancing logic you choose to implement:

  ```ts
  const POOL_SIZE = 3;

  app.get("/lb", (c) => {
  	const index = Math.floor(Math.random() * POOL_SIZE);
  	return c.env.MY_CONTAINER.getByName(`pool-${index}`).fetch(c.req.raw);
  });
  ```

This allows for multiple ways of using Containers:

- If you simply want to send requests to many stateless and interchangeable containers, you should load balance.
- If you have stateful services or need individually addressable containers, you should request specific Container instances.
- If you are running short-lived jobs, want fine-grained control over the container lifecycle, want to parameterize container entrypoint or env vars, or want to chain together multiple container calls, you should request specific Container instances.

## View Containers in your Dashboard

The [Containers Dashboard ↗︎](https://dash.cloudflare.com/?to=/:account/workers/containers) shows you helpful information about your Containers, including:

- Status and Health
- Metrics
- Logs

After launching your Worker, go to the Containers Dashboard by selecting **Workers & Pages** > **Containers** in the dashboard sidebar.

## Next Steps

To do more:

- Modify the image by changing the Dockerfile and running `wrangler deploy`
- Refer to [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/) for Workers Builds and rollout behavior
- Browse [examples](https://developers.cloudflare.com/containers/examples/) for more patterns
- Check the [Frequently Asked Questions](https://developers.cloudflare.com/containers/faq/) for platform behavior and limitations

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/get-started/#page","headline":"Get started","description":"Deploy your first Container on Cloudflare by building an image, configuring a Worker, and routing requests to container instances.","url":"https://developers.cloudflare.com/containers/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/get-started/og.png?v=82557fc11168d06b","dateModified":"2026-11-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
