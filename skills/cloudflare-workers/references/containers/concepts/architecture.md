---
description: Understand how a Container is deployed, started, routed, and shut down across Cloudflare's network.
title: Lifecycle of a Container
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Lifecycle of a Container

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/concepts/architecture/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Deployment

After you deploy an application with a Container, your image is uploaded to [Cloudflare's Registry](https://developers.cloudflare.com/containers/guides/image-management/) and distributed globally to Cloudflare's Network. Cloudflare will pre-schedule instances and pre-fetch images across the globe to ensure quick start times when scaling up the number of concurrent container instances.

Worker code goes live on deploy. Container instances update with a [rollout](https://developers.cloudflare.com/containers/configuration/rollouts/). Refer to [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/).

## Lifecycle of a Request

### Client to Worker

Recall that Containers are backed by [Durable Objects](https://developers.cloudflare.com/durable-objects/) and [Workers](https://developers.cloudflare.com/workers/). Requests are first routed through a Worker, which is generally handled by a datacenter in a location with the best latency between itself and the requesting user. A different datacenter may be selected to optimize overall latency, if [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/)is on, or if the nearest location is under heavy load.

Because all Container requests are passed through a Worker, end-users cannot make non-HTTP TCP or UDP requests to a Container instance. If you have a use case that requires inbound TCP or UDP from an end-user, please [let us know ↗](https://forms.gle/AGSq54VvUje6kmKu8).

### Worker to Durable Object

From the Worker, a request passes through a Durable Object instance (the [Container class](https://developers.cloudflare.com/containers/reference/container-class/) extends a Durable Object class). Each Durable Object instance is a globally routable isolate that can execute code and store state. This allows developers to easily address and route to specific container instances (no matter where they are placed), define and run hooks on container status changes, execute recurring checks on the instance, and store persistent state associated with each instance.

### Starting a Container

When a Durable Object instance requests to start a new container instance, the **nearest location with a pre-fetched image** is selected.

Note

Durable Objects and their associated Container instances are not guaranteed to run in the same location.

Container placement is optimized for request routing and startup speed, so a Container may start in a different location than its Durable Object.

Starting additional container instances will use other locations with pre-fetched images, and Cloudflare will automatically begin prepping additional machines behind the scenes for additional scaling and quick cold starts. Because there are a finite number of pre-warmed locations, some container instances may be started in locations that are farther away from the end-user. This is done to ensure that the container instance starts quickly. You are only charged for actively running instances and not for any unused pre-warmed images.

#### Cold starts

A cold start is when a container instance is started from a completely stopped state. If you call `env.MY_CONTAINER.get(id)` with a completely novel ID and launch this instance for the first time, it will result in a cold start. This will start the container image from its entrypoint for the first time. Depending on what this entrypoint does, it will take a variable amount of time to start.

Container cold starts can often be in the 1-3 second range, but this is dependent on image size and code execution time, among other factors.

### Requests to running Containers

When a request _starts_ a new container instance, the nearest location with a pre-fetched image is selected. Subsequent requests to a particular instance, regardless of where they originate, will be routed to this location as long as the instance stays alive.

However, once that container instance stops and restarts, future requests could be routed to a _different_ location. This location will again be the nearest location to the originating request with a pre-fetched image.

### Container runtime

Each container instance runs inside its own VM, which provides strong isolation from other workloads running on Cloudflare's network. Containers should be built for the `linux/amd64` architecture, and should stay within [size limits](https://developers.cloudflare.com/containers/platform/limits/).

[Logging](https://developers.cloudflare.com/containers/faq/#how-do-container-logs-work), metrics collection, and [networking](https://developers.cloudflare.com/containers/faq/#how-do-i-allow-or-disallow-egress-from-my-container) are automatically set up on each container, as configured by the developer.

### Container shutdown

The Container class sets [sleepAfter](https://developers.cloudflare.com/containers/reference/container-class/#sleepafter) to 10 minutes by default. Its default [onActivityExpired()](https://developers.cloudflare.com/containers/reference/container-class/#onactivityexpired) implementation signals the container to stop after that period without activity. You can change the duration or override the hook.

You can stop a container instance yourself with [stop()](https://developers.cloudflare.com/containers/reference/container-class/#stop) or [destroy()](https://developers.cloudflare.com/containers/reference/container-class/#destroy).

When the platform is about to stop a container instance, it:

1. Sends `SIGTERM` to the main process in the container.
2. Waits up to 15 minutes for that process to exit.
3. Sends `SIGKILL` if the process is still running.

Handle `SIGTERM` in your image if you need cleanup before exit. The same sequence runs when a [rollout](https://developers.cloudflare.com/containers/configuration/rollouts/) replaces a container instance with a new image.

### Lifecycle hooks

The [Container class](https://developers.cloudflare.com/containers/reference/container-class/) provides hooks that run Worker code when the container changes state:

* [onStart()](https://developers.cloudflare.com/containers/reference/container-class/#onstart) — Runs after the container has started.
* [onStop()](https://developers.cloudflare.com/containers/reference/container-class/#onstop) — Runs after the container process exits. Receives the exit code and reason for the stop.
* [onActivityExpired()](https://developers.cloudflare.com/containers/reference/container-class/#onactivityexpired) — Runs when the [sleepAfter](https://developers.cloudflare.com/containers/reference/container-class/#sleepafter) timer expires with no incoming requests. The default implementation calls `stop()` to shut down the container. You can use this to only stop the container on certain conditions.
* [onError()](https://developers.cloudflare.com/containers/reference/container-class/#onerror) — Runs when the container exits with an error.

Refer to the [status hooks example](https://developers.cloudflare.com/containers/examples/status-hooks/) for a full implementation.

#### Persistent disk

All disk is ephemeral. When a Container instance goes to sleep, the next time it is started, it will have a fresh disk as defined by its container image.

Snapshots are coming soon, which allow the user to quickly persist and restore the disk from an entire container or a directory.

You can also use [FUSE](https://developers.cloudflare.com/containers/examples/r2-fuse-mount/) to persist disk to R2 or other object storage backends. Though you should not expect native SSD-like performance while using FUSE.

## An example request

* A developer deploys a Container. Cloudflare automatically readies instances across its Network.
* A request is made from a client in Bariloche, Argentina. It reaches the Worker in a nearby Cloudflare location in Neuquen, Argentina.
* This Worker request calls `getContainer(env.MY_CONTAINER, "session-1337")`. Under the hood, this brings up a Durable Object, which then calls `this.ctx.container.start`.
* This requests the nearest free Container instance. Cloudflare recognizes that an instance is free in Buenos Aires, Argentina, and starts it there.
* A different user needs to route to the same container. This user's request reaches the Worker running in Cloudflare's location in San Diego, US.
* The Worker again calls `getContainer(env.MY_CONTAINER, "session-1337")`.
* If the initial container instance is still running, the request is routed to the original location in Buenos Aires. If the initial container has gone to sleep, Cloudflare will once again try to find the nearest "free" instance of the Container, likely one in North America, and start an instance there.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/concepts/architecture/#page","headline":"Lifecycle of a Container · Cloudflare Containers docs","description":"Understand how a Container is deployed, started, routed, and shut down across Cloudflare's network.","url":"https://developers.cloudflare.com/containers/concepts/architecture/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
