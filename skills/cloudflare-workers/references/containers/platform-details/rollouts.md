---
description: Configure rolling deployments for Containers, including step percentages and grace periods for active instances.
title: Rollouts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Rollouts

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/platform-details/rollouts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## How rollouts work

When you run `wrangler deploy`, the Worker code is updated immediately and Container instances are updated using a rolling deploy strategy. The default rollout configuration is two steps, where the first step updates 10% of the instances, and the second step updates the remaining 90%. This can be configured in your Wrangler config file using the [rollout\_step\_percentage](https://developers.cloudflare.com/workers/wrangler/configuration/#containers) property.

When deploying a change, you can also configure a [rollout\_active\_grace\_period](https://developers.cloudflare.com/workers/wrangler/configuration/#containers), which is the minimum number of seconds to wait before an active container instance becomes eligible for updating during a rollout. At that point, the container will be sent a `SIGTERM` signal and still has 15 minutes to shut down gracefully. If the instance does not stop within 15 minutes, it is forcefully stopped with a `SIGKILL` signal. If you have cleanup that must occur before a Container instance is stopped, you should do it during this 15 minute period.

Once stopped, the instance is replaced with a new instance running the updated code. Requests may hang while the container is starting up again.

Because Worker code updates immediately while container instances roll out gradually, keep changes backwards compatible across both versions until the rollout completes.

Here is an example configuration that sets a 5 minute grace period and a two step rollout where the first step updates 10% of instances and the second step updates 100% of instances:

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

## Immediate rollouts

If you need to do a one-off deployment that rolls out to 100% of container instances in one step, you can deploy with:

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

Note that `rollout_active_grace_period`, if configured, will still apply.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/platform-details/rollouts/#page","headline":"Rollouts · Cloudflare Containers docs","description":"Configure rolling deployments for Containers, including step percentages and grace periods for active instances.","url":"https://developers.cloudflare.com/containers/platform-details/rollouts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
