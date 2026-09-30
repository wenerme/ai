---
description: Choose whether Container configuration is managed centrally or by each Durable Object at runtime.
title: Scheduling Policies
image: https://developers.cloudflare.com/containers/configuration/scheduling-policy/og.png?v=d30120184c1c529d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Scheduling Policies

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/configuration/scheduling-policy/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A scheduling policy determines where you configure a Container image and [instance size](https://developers.cloudflare.com/containers/platform/limits/#instance-types). It also determines how image updates and [rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/) apply. Choose the policy when you create the Container application.

| Policy | Configure image and instance size | Image updates | Best for |
| --- | --- | --- | --- |
| `default` | In Wrangler configuration | Cloudflare applies application-wide configuration changes with [rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/) | Services whose instances use the same image and instance size |
| `durable_object` (beta) | In Durable Object code when calling `ctx.container.start()` | Application code selects an image each time it starts an instance | Sandboxes, agent environments, and other workloads that need per-instance configuration |

Note

The `durable_object` scheduling policy is in public beta.

One Wrangler configuration can contain applications with both policies. This lets a Worker use centrally managed service Containers alongside Durable Object-managed sandboxes.

The scheduling policy is immutable. To use a different policy, create a new Container application. Deleting an application also deletes its Container instances, so switching policies means replacing every running instance. To move an existing application, refer to [Migrate to the Durable Object scheduling policy](https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-scheduling-policy/).

## Use the default scheduling policy

With the `default` policy, Wrangler configuration defines one application-wide `image`, one [`instance_type`](https://developers.cloudflare.com/containers/platform/limits/#instance-types), and settings such as `max_instances`. Omitting `scheduling_policy` selects `default`.

```jsonc
{
	"containers": [
		{
			"class_name": "ApiContainer",
			"scheduling_policy": "default",
			"image": "./api/Dockerfile",
			"instance_type": "standard-1",
			"max_instances": 5,
		},
	],
}
```

```toml
[[containers]]
class_name = "ApiContainer"
scheduling_policy = "default"
image = "./api/Dockerfile"
instance_type = "standard-1"
max_instances = 5
```

When you change the image or instance type and deploy, Cloudflare rolls out that change across the application. Refer to [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/).

## Use the Durable Object scheduling policy

The `durable_object` policy moves per-instance decisions into your Durable Object. Wrangler associates the Container application with the Durable Object class, and your code supplies a startup image or snapshot and an optional instance size to `ctx.container.start()`.

Configure the policy. To use custom images, add the images that the Durable Object can start:

```jsonc
{
	"name": "agent-computer",
	"main": "src/index.ts",
	"compatibility_date": "2026-09-29",
	"containers": [
		{
			"class_name": "AgentComputer",
			"scheduling_policy": "durable_object",
			"images": {
				"base": {
					"dockerfile": "./container/Dockerfile",
				},
			},
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"name": "AGENT_COMPUTER",
				"class_name": "AgentComputer",
			},
		],
	},
	"exports": {
		"AgentComputer": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

```toml
name = "agent-computer"
main = "src/index.ts"
compatibility_date = "2026-09-29"

[[containers]]
class_name = "AgentComputer"
scheduling_policy = "durable_object"

[containers.images.base]
dockerfile = "./container/Dockerfile"

[[durable_objects.bindings]]
name = "AGENT_COMPUTER"
class_name = "AgentComputer"

[exports.AgentComputer]
type = "durable-object"
storage = "sqlite"
```

Wrangler builds or resolves each named image, prepares it for the Containers runtime, and exposes its digest-pinned reference on `ctx.container.images`. Select an image and instance size when the Durable Object starts its Container:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

export class AgentComputer extends DurableObject {
	startContainer() {
		if (this.ctx.container.running) {
			return;
		}

		this.ctx.container.start({
			image: this.ctx.container.images.base,
			instance: "standard-2",
			enableInternet: false,
		});
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

export class AgentComputer extends DurableObject {
	startContainer() {
		if (this.ctx.container.running) {
			return;
		}

		this.ctx.container.start({
			image: this.ctx.container.images.base,
			instance: "standard-2",
			enableInternet: false,
		});
	}
}
```

`ctx.container.start()` initiates startup and returns before the Container is ready to accept requests. Add an application-specific readiness check before sending traffic or calling [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec).

The `durable_object` policy does not support `max_instances`. Running instances count toward your [account limits](https://developers.cloudflare.com/containers/platform/limits/#account-limits).

### Use the Cloudflare-managed image

If you do not need a custom image, start the [`cloudflare/debian-trixie` Cloudflare-managed image](https://developers.cloudflare.com/containers/guides/image-management/#use-the-cloudflare-managed-image) directly without adding a named image to Wrangler. It includes Node.js 24.20.0 on Debian Trixie slim:

*src/index.jsjs*

```js
this.ctx.container.start({
	image: "cloudflare/debian-trixie",
	instance: "standard-2",
	enableInternet: false,
});
```

*src/index.tsts*

```ts
this.ctx.container.start({
	image: "cloudflare/debian-trixie",
	instance: "standard-2",
	enableInternet: false,
});
```

### Configure named images

Each key under `containers[].images` in your Wrangler configuration becomes a property on `ctx.container.images`. For example, `containers[].images.base` is available to the Durable Object as `ctx.container.images.base`. Each value must specify exactly one image source. Use `dockerfile` for a path to a Dockerfile. When you run `wrangler deploy`, Wrangler builds and uploads that image. You can also set `build_context` and `build_vars` for that image.

Use `image` for a digest-pinned image in the Cloudflare managed registry. Use the form `registry.cloudflare.com/<ACCOUNT_ID>/<REPOSITORY>@sha256:<DIGEST>`. Direct references to Docker Hub, Amazon ECR, or Google Artifact Registry are not supported. To use an image from another registry, [push it to the Cloudflare managed registry](https://developers.cloudflare.com/containers/guides/image-management/#use-an-external-image) first.

A configuration can contain up to 100 named images. An image name must contain between 1 and 128 characters.

The image map is uploaded with the Worker version. Updating the map does not restart or replace running Container instances. Your application selects an image from the map when it starts an instance. During a [gradual deployment](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/), `ctx.container.images` reflects the image map of the Worker version that runs the Durable Object, so different Durable Objects can start different images until the deployment completes.

### Choose an instance size at runtime

Set `instance` in `ctx.container.start()` to one of the following [named instance types](https://developers.cloudflare.com/containers/platform/limits/#instance-types):

- `lite`
- `standard-1`
- `standard-2`
- `standard-3`
- `standard-4`

The runtime does not accept `basic` or the legacy `dev` and `standard` aliases.

If you omit `instance`, the Container uses `lite`. You can also supply a custom instance object that meets the [custom instance type constraints](https://developers.cloudflare.com/containers/platform/limits/#custom-instance-types):

*src/index.jsjs*

```js
this.ctx.container.start({
	image: this.ctx.container.images.base,
	enableInternet: false,
	instance: {
		vcpu: 1,
		memoryMib: 4096,
		diskMb: 8000,
	},
});
```

*src/index.tsts*

```ts
this.ctx.container.start({
	image: this.ctx.container.images.base,
	enableInternet: false,
	instance: {
		vcpu: 1,
		memoryMib: 4096,
		diskMb: 8000,
	},
});
```

The runtime uses camel case (`memoryMib` and `diskMb`). Wrangler's application-level `instance_type` object uses snake case (`memory_mib` and `disk_mb`) and only applies to the `default` policy.

### Start from an image or snapshot

For a new filesystem, pass `image` to `ctx.container.start()`. To restore a full filesystem snapshot, pass `containerSnapshot` instead. `image` and `containerSnapshot` are mutually exclusive because a snapshot already identifies the filesystem to restore.

Snapshots are only supported with the `durable_object` policy. A snapshot is tied to the image it was created from. After you update an image, create new snapshots from Containers running that image.

Refer to [Snapshots](https://developers.cloudflare.com/containers/guides/snapshots/) for the complete save and restore flow.

### Manage updates from application code

Container instances that use the `durable_object` policy do not participate in application-wide image rollouts. A running instance continues to use its startup image. Your application decides when to stop that instance and start it with another configured image. For an example that compares the running image with the configured image, refer to [Roll out a named image update](https://developers.cloudflare.com/containers/guides/image-management/#roll-out-a-named-image-update).

### Configure SSH

The `durable_object` policy supports the `ssh` and `authorized_keys` fields. Refer to [SSH](https://developers.cloudflare.com/containers/guides/ssh/).

## Related resources

- [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/)
- [Lifecycle of a Container](https://developers.cloudflare.com/containers/concepts/architecture/)
- [Image Management](https://developers.cloudflare.com/containers/guides/image-management/)
- [Wrangler Containers configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#containers)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/configuration/scheduling-policy/#page","headline":"Scheduling Policies","description":"Choose whether Container configuration is managed centrally or by each Durable Object at runtime.","url":"https://developers.cloudflare.com/containers/configuration/scheduling-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/configuration/scheduling-policy/og.png?v=d30120184c1c529d","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
