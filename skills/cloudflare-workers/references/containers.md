---
description: Run serverless containers alongside Workers to handle resource-intensive workloads, custom runtimes, and existing container images on Cloudflare.
title: Containers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Containers

Last updated Aug 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Enhance your Workers with serverless containers

Available on Workers Paid plan

Run code written in any programming language, built for any runtime, as part of apps built on [Workers](https://developers.cloudflare.com/workers).

Deploy your container image to `Region:Earth` without worrying about managing infrastructure - just define your Worker and [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy).

With Containers you can run:

* Resource-intensive applications that require CPU cores running in parallel, large amounts of memory or disk space
* Applications and libraries that require a full filesystem, specific runtime, or Linux-like environment
* Existing applications and tools that have been distributed as container images

Container instances are spun up on-demand and controlled by code you write in your [Worker](https://developers.cloudflare.com/workers). Instead of chaining together API calls or writing Kubernetes operators, you just write JavaScript:

```js
import { Container, getContainer } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 4000; // Port the container is listening on
	sleepAfter = "10m"; // Stop the instance if requests not sent for 10 minutes
}

export default {
	async fetch(request, env) {
		const { "session-id": sessionId } = await request.json();
		// Get the container instance for the given session ID
		const containerInstance = getContainer(env.MY_CONTAINER, sessionId);
		// Pass the request to the container instance on its default port
		return containerInstance.fetch(request);
	},
};
```

```jsonc
{
	"name": "container-starter",
	"main": "src/index.js",
	// Set this to today's date
	"compatibility_date": "2026-08-25",
	"containers": [
		{
			"class_name": "MyContainer",
			"image": "./Dockerfile",
			"max_instances": 5
		}
	],
	"durable_objects": {
		"bindings": [
			{
				"class_name": "MyContainer",
				"name": "MY_CONTAINER"
			}
		]
	},
	"migrations": [
		{
			"new_sqlite_classes": ["MyContainer"],
			"tag": "v1"
		}
	]
}
```

```toml
name = "container-starter"
main = "src/index.js"
# Set this to today's date
compatibility_date = "2026-08-25"

[[containers]]
class_name = "MyContainer"
image = "./Dockerfile"
max_instances = 5

[[durable_objects.bindings]]
class_name = "MyContainer"
name = "MY_CONTAINER"

[[migrations]]
new_sqlite_classes = [ "MyContainer" ]
tag = "v1"
```

[Get started](https://developers.cloudflare.com/containers/get-started/) [Containers dashboard](https://dash.cloudflare.com/?to=/:account/workers/containers)

---

## Next steps

[Get started](https://developers.cloudflare.com/containers/get-started/)

Build and push an image, call a Container from a Worker, and try scaling and routing.

Deploy a Container

[Examples](https://developers.cloudflare.com/containers/examples/)

Stateless and stateful routing, regional placement, Workflow and Queue integrations, AI-generated code execution, and short-lived workloads.

See Examples

[Local development](https://developers.cloudflare.com/containers/local-dev/)

Run your Worker and container together with `wrangler dev` or `vite dev` before you deploy.

Develop locally

[Deploy](https://developers.cloudflare.com/containers/deploy/)

Ship from your machine or Workers Builds, and confirm the deploy.

Deploy Containers

---

## More resources

### [Rollouts](https://developers.cloudflare.com/containers/platform-details/rollouts/)

How container instances update after you deploy.

### [Image management](https://developers.cloudflare.com/containers/platform-details/image-management/)

Build, push, and pull images for Containers.

### [Lifecycle of a Container](https://developers.cloudflare.com/containers/platform-details/architecture/)

How a container is scheduled, started, routed, and shut down.

### [Limits](https://developers.cloudflare.com/containers/platform-details/limits/)

Instance counts, image size, and other platform limits.

### [Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/containers/#containers)

CLI commands for images and containers.

### [Durable Object Container API](https://developers.cloudflare.com/durable-objects/api/container/)

Start, stop, and talk to the container process from a Durable Object.

### [SSH](https://developers.cloudflare.com/containers/ssh/)

Connect to running container instances with SSH through Wrangler.

### [Containers Discord](https://discord.cloudflare.com)

Ask questions, show what you are building, and talk with other Containers developers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/containers/#page","headline":"Overview · Cloudflare Containers docs","description":"Run serverless containers alongside Workers to handle resource-intensive workloads, custom runtimes, and existing container images on Cloudflare.","url":"https://developers.cloudflare.com/containers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
