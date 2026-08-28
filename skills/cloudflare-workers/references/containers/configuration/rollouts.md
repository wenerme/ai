---
description: How container instances update after a deploy, including step percentages, grace periods, and rollout modes.
title: Rollouts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Rollouts

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/configuration/rollouts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## How rollouts work

A **rollout** applies a target container application configuration after you [deploy](https://developers.cloudflare.com/containers/guides/deploy/) a Worker that uses Containers. The target can change the image, instance type, limits, placement, or other container settings.

A **container instance** is one running copy of your container image on Cloudflare's network. It runs the process your image starts (`ENTRYPOINT`/`CMD` in the Dockerfile, or the base image default). When the target changes the image, the rollout replaces container instances with copies that run the target image. Rollouts do not change Durable Object storage.

When an existing container application's effective configuration changes, `wrangler deploy`:

1. Uploads and activates the new Worker version, including Durable Object class code.
2. Builds and pushes a Dockerfile image when needed, or uses the configured registry image reference.
3. Starts a rollout to apply the target container configuration.

The Worker is active before the image and rollout steps begin. These steps are not transactional, so the Worker can remain active if a later image or rollout step fails. Deploy success means the rollout started, not that every container instance has finished replacing. The first deploy creates the container application directly, and a deploy with no effective container changes starts no rollout.

When the image changes, new Worker code can still reach container instances on the previous image until the rollout finishes. Prefer Worker and image changes that work together during that window, or choose [immediate](#immediate) when you need the shortest mixed window the platform allows.

Field names and allowed values are listed under [Containers configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#containers).

## Defaults

| Setting                                           | Default                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| rollout\_step\_percentage                         | 100 if max\_instances is omitted or less than 2; otherwise \[10, 100\]          |
| rollout\_active\_grace\_period                    | 0 seconds                                                                       |
| Stop sequence when replacing a container instance | SIGTERM to the main process, then SIGKILL after 15 minutes if it has not exited |

## Gradual rollouts

By default, Wrangler starts a rolling rollout using `rollout_step_percentage`. If `max_instances` is omitted or less than `2`, Wrangler uses one `100` step. Otherwise, Wrangler requests `[10, 100]`:

1. Request a target of about 10% of container instances with the new configuration. The platform raises this percentage when necessary so the step represents at least one instance at the configured `max_instances`.
2. Target 100% of container instances with the new configuration.

Configure the steps with `rollout_step_percentage` in Wrangler. Override the default plan for one deploy with [\--containers-rollout](#rollout-modes).

## How a container instance is replaced

When the rollout selects a container instance to update:

1. **Grace period (if configured).** If `rollout_active_grace_period` is greater than `0`, container instances that only recently became connected to their [Durable Object](https://developers.cloudflare.com/durable-objects/) are skipped until they pass that window. Default `0` means no extra wait. Refer to [Rollout active grace period](#rollout-active-grace-period).
2. **Signal stop.** The platform sends `SIGTERM` to the main process in the container so it can stop accepting new work and finish in-flight work. Handle `SIGTERM` in your image if that process needs cleanup before exit.
3. **Drain.** The process has up to 15 minutes to exit after `SIGTERM`.
4. **Force stop if needed.** If the process is still running after 15 minutes, the platform sends `SIGKILL`.
5. **After exit.** The Container class [onStop](https://developers.cloudflare.com/containers/reference/container-class/#onstop) hook can run in the Worker once the container process has exited.
6. **Start a new container instance** with the target image. Disk is [ephemeral](https://developers.cloudflare.com/containers/faq/#is-disk-persistent-what-happens-to-my-disk-when-my-container-sleeps) unless you store data outside the container filesystem.

Each selected container instance follows this sequence on its own schedule. The fleet does not restart in a single moment.

### Requests while a container instance starts

The new container instance must start its process. Startup often takes on the order of seconds, depending on image size and what runs at start. Refer to [cold starts](https://developers.cloudflare.com/containers/concepts/architecture/#starting-a-container).

A request that needs that container instance may wait until the container is ready, or fail if a client or Worker timeout is shorter than startup. Keep startup work fast, use port readiness checks if you configure them, and set timeouts with startup in mind.

## Rollout active grace period

`rollout_active_grace_period` applies only during a rollout, when the platform chooses which container instances to replace.

Containers are [backed by Durable Objects](https://developers.cloudflare.com/containers/concepts/architecture/#worker-to-durable-object). Each running container instance is associated with a Durable Object instance that starts it and sends it traffic. The grace period is how long that connection must already have been up before a rollout may shut the container down. It is not measured from deploy completion.

| Value                            | Effect                                                                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 0 (default)                      | No extra protection. Selected container instances may be replaced as soon as the rollout reaches them.                           |
| Greater than 0 (for example 300) | Container instances connected to their Durable Object for less than this many seconds are left alone until they pass the window. |

Use a non-zero value when short sessions should finish before a rollout replaces the container. Container instances that have been connected longer can still be replaced once they pass the window.

`rollout_active_grace_period` applies in every rollout mode, including [immediate](#immediate).

## Rollout modes

`--containers-rollout` applies to [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) only. It does not apply to [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions).

On a full deploy, Wrangler activates the Worker before it processes the container image and rollout. Rollout mode controls how the target container configuration is applied.

| Mode              | Flag                            | Container instances                                                             |
| ----------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| Gradual (default) | omit flag                       | Use rollout\_step\_percentage, which can contain one or multiple steps          |
| Immediate         | \--containers-rollout=immediate | Target 100% of container instances in one step                                  |
| None              | \--containers-rollout=none      | Leave images and running container instances unchanged; deploy Worker code only |

### Immediate

Immediate sets the rollout plan to a single step that targets 100% of container instances. There is no intermediate percentage hold.

npmyarnpnpm

```
npx wrangler deploy --containers-rollout=immediate
```

```
yarn wrangler deploy --containers-rollout=immediate
```

```
pnpm wrangler deploy --containers-rollout=immediate
```

Use immediate when Worker code and the container image need to stay compatible and you want the mixed window as short as the platform allows (for example a breaking change in how the Worker talks to the process in the image).

Behavior:

* The new Worker version is activated before the container image and rollout are processed.
* The rollout then replaces container instances toward 100% using the same [replace sequence](#how-a-container-instance-is-replaced) as gradual mode, including grace period when configured.
* Replacements complete over wall-clock time. How long depends on how many container instances are running, how long each takes to stop and start, and any grace period.
* When the image changes, immediate minimizes but does not eliminate the period when the new Worker can reach instances on the previous image.
* Deploy success means the rollout started, not that replacements finished.

### None

None leaves images and running container instances unchanged and deploys Worker code only.

Use none when the deploy should not publish a new image or start a container instance rollout. If `image` is a Dockerfile path and Docker is unavailable, Wrangler may require this flag or a working Docker setup so the deploy can skip container steps.

## Example configuration

`rollout_active_grace_period` of 300 seconds (five minutes) and steps `[10, 100]`:

```jsonc
{
	"containers": [
		{
			"max_instances": 10,
			"class_name": "MyContainer",
			"image": "./Dockerfile",
			"rollout_active_grace_period": 300,
			"rollout_step_percentage": [10, 100],
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
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": ["MyContainer"],
		},
	],
}
```

```toml
[[containers]]
max_instances = 10
class_name = "MyContainer"
image = "./Dockerfile"
rollout_active_grace_period = 300
rollout_step_percentage = [ 10, 100 ]

[[durable_objects.bindings]]
name = "MY_CONTAINER"
class_name = "MyContainer"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MyContainer" ]
```

## Related

* [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/)
* [Lifecycle of a Container](https://developers.cloudflare.com/containers/concepts/architecture/)
* [Image management](https://developers.cloudflare.com/containers/guides/image-management/)
* [Containers configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#containers)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/configuration/rollouts/#page","headline":"Rollouts · Cloudflare Containers docs","description":"How container instances update after a deploy, including step percentages, grace periods, and rollout modes.","url":"https://developers.cloudflare.com/containers/configuration/rollouts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
