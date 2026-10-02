---
description: Answers to common questions about Containers, including logging, scaling, cold starts, disk persistence, and rollouts.
title: Frequently Asked Questions
image: https://developers.cloudflare.com/containers/faq/og.png?v=54d27de1bf2e71bb
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Frequently Asked Questions

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/faq/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## How do Container logs work?

To get logs in the Dashboard, including live tailing of logs, toggle `observability` to true in your Worker's wrangler config:

```jsonc
{
	"observability": {
		"enabled": true
	}
}
```

```toml
[observability]
enabled = true
```

Logs are subject to the same [limits as Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#limits) and are retained for seven days.

Beginning December 1, 2026, Container logs use [Cloudflare Observability pricing](https://developers.cloudflare.com/observability/pricing/).

You can export container logs via [Logpush](https://developers.cloudflare.com/logs/logpush/) to your preferred destination.

## How are container instance locations selected?

When initially deploying a Container, Cloudflare will select various locations across our network to deploy instances to. These locations will span multiple regions.

When a Container instance is requested with `this.ctx.container.start`, the nearest free container instance will be selected from the pre-initialized locations. This will likely be in the same region as the external request, but may not be. Once the container instance is running, any future requests will be routed to the initial location.

An Example:

- A user deploys a Container. Cloudflare automatically readies instances across its Network.
- A request is made from a client in Bariloche, Argentina. It reaches the Worker in Cloudflare's location in Neuquen, Argentina.
- This Worker request calls `MY_CONTAINER.get("session-1337")` which brings up a Durable Object, which then calls `this.ctx.container.start`.
- This requests the nearest free Container instance.
- Cloudflare recognizes that an instance is free in Buenos Aires, Argentina, and starts it there.
- A different user needs to route to the same container. This user's request reaches the Worker running in Cloudflare's location in San Diego.
- The Worker again calls `MY_CONTAINER.get("session-1337")`.
- If the initial container instance is still running, the request is routed to the location in Buenos Aires. If the initial container has gone to sleep, Cloudflare will once again try to find the nearest "free" instance of the Container, likely one in North America, and start an instance there.

## How do container updates and rollouts work?

On `wrangler deploy`, the Worker goes live first. Container instances update with a gradual rollout by default. Refer to [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/) for steps, grace periods, and modes. Refer to [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/) to run a deploy.

## How do Workers Builds work with Containers?

On the production branch, Workers Builds should run `wrangler deploy` so images and container instances can update. Non-production Workers Builds defaults to `wrangler versions upload`, which does not update images. Containers Workers implement Durable Objects, so preview URLs are not generated for them. Refer to [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/#before-production).

## How does scaling work?

Containers scale by creating or addressing specific instances. For stateless routing across a fixed number of interchangeable instances, use the `getRandom` helper.

Refer to [scaling and routing](https://developers.cloudflare.com/containers/configuration/scaling-and-routing/) for details.

### Is built-in autoscaling for stateless applications available?

Not today, though Cloudflare plans to add built-in autoscaling in a future release.

Until then, use `getRandom` for simple stateless routing and specific instance IDs when you need explicit control over container lifecycle.

## What are cold starts? How fast are they?

A cold start is when a container instance is started from a completely stopped state.

If you call `env.MY_CONTAINER.get(id)` with a completely novel ID and launch this instance for the first time, it will result in a cold start.

This will start the container image from its entrypoint for the first time. Depending on what this entrypoint does, it will take a variable amount of time to start.

Container cold starts can often be in the 1-3 second range, but this is dependent on image size and code execution time, among other factors.

## How do I use an existing container image?

Refer to [image management](https://developers.cloudflare.com/containers/guides/image-management/#use-pre-built-container-images).

## Is disk persistent? What happens to my disk when my container sleeps?

All disk is ephemeral by default. When a Container instance goes to sleep, the next time it starts, it uses a fresh disk from the container image.

If you need point-in-time filesystem state, Container applications that use the [`durable_object` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy) can create and restore a snapshot. Snapshots are immutable, so later file changes require a new snapshot. For more information, refer to [Snapshots](https://developers.cloudflare.com/containers/guides/snapshots/).

You can also use [FUSE](https://developers.cloudflare.com/containers/examples/r2-fuse-mount/) to persist disk to R2 or other object storage backends. Though you should not expect native SSD-like performance while using FUSE.

## What happens if I run out of memory?

If you run out of memory, your instance will throw an Out of Memory (OOM) error and will be restarted.

Containers do not use swap memory.

## How long can instances run for? What happens when a host server is shut down?

Cloudflare does not stop a container instance after a fixed maximum runtime. With the Durable Object Container API, call [`setInactivityTimeout()`](https://developers.cloudflare.com/containers/api/durable-object-container/#setinactivitytimeout) to stop an inactive container. The `Container` class sets [`sleepAfter`](https://developers.cloudflare.com/containers/api/container-class/#sleepafter) to 10 minutes by default. Its [`onActivityExpired()`](https://developers.cloudflare.com/containers/api/container-class/#onactivityexpired) implementation signals the container to stop after that period without activity. You can change the duration or override the hook.

Another platform event can stop an active container. For example, a host server restart happens on an irregular cadence. Cloudflare does not guarantee that any container instance will run for a set period.

When the platform is about to stop a container instance (including before a host moves work off a server), it:

1. Sends `SIGTERM` to the main process in the container.
2. Waits up to 15 minutes for that process to exit.
3. Sends `SIGKILL` if the process is still running.

Handle `SIGTERM` in your image if you need cleanup before exit. After a host stop, a new container instance may start on a different server when traffic needs it again.

Image updates during a deploy use the same stop sequence. Refer to [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/).

## How can I pass secrets to my container?

You can use [Worker Secrets](https://developers.cloudflare.com/workers/configuration/secrets/) or the [Secrets Store](https://developers.cloudflare.com/secrets-store/integrations/workers/) to define secrets for your Workers.

For implementation details, refer to [Environment variables and secrets](https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/).

## Can I run Docker inside a container (Docker-in-Docker)?

Yes. Use the `docker:dind` image, and start the Docker daemon with iptables and IP forwarding turned off:

*Dockerfiledockerfile*

```dockerfile
FROM docker:dind

# Start dockerd with iptables and IP forwarding turned off, then run your app
ENTRYPOINT ["sh", "-c", "dockerd-entrypoint.sh dockerd --iptables=false --ip6tables=false --ip-forward=false & exec /path/to/your-app"]
```

This Dockerfile works with both [scheduling policies](https://developers.cloudflare.com/containers/configuration/scheduling-policy/). Containers that use the `durable_object` policy cannot turn on IP forwarding. In those containers, the Docker daemon exits on startup unless you pass `--ip-forward=false`.

Run the Docker daemon as `root`. Rootless Docker does not start in Containers.

If your application needs to wait for dockerd to become ready before using Docker, use an entrypoint script instead of the inline command above:

*entrypoint.shsh*

```sh
#!/bin/sh
set -eu

# Wait for dockerd to be ready
until docker version >/dev/null 2>&1; do
  sleep 0.2
done

exec /path/to/your-app
```

Working with disabled iptables

Cloudflare Containers do not support iptables manipulation. The `--iptables=false` and `--ip6tables=false` flags prevent Docker from attempting to configure network rules, which would otherwise fail.

To send or receive traffic from a container running within Docker-in-Docker, use the `--network=host` flag with `docker run`. A `docker build` step that uses the network, such as a package install, also needs `docker build --network=host`.

This allows you to connect to the container, but it means each inner container has access to your outer container's network stack. Ensure you understand the security implications of this setup before proceeding.

For a complete working example, refer to the [Docker-in-Docker Containers example ↗︎](https://github.com/th0m/containers-dind). The example uses the `default` scheduling policy. To run it with `scheduling_policy: "durable_object"`, add `--ip-forward=false` to its `dockerd` flags.

## How do I allow or disallow egress from my container?

Refer to [Handle outbound traffic](https://developers.cloudflare.com/containers/configuration/outbound-traffic/) for how to control outbound traffic and internet access.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/faq/#page","headline":"Frequently Asked Questions","description":"Answers to common questions about Containers, including logging, scaling, cold starts, disk persistence, and rollouts.","url":"https://developers.cloudflare.com/containers/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/faq/og.png?v=54d27de1bf2e71bb","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
