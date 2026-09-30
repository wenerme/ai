---
description: Save and restore Container filesystems with the Durable Object scheduling policy.
title: Use snapshots
image: https://developers.cloudflare.com/containers/guides/snapshots/og.png?v=74144dfc758483da
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Use snapshots

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/guides/snapshots/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Snapshots let you save point-in-time filesystem state from a running [Container](https://developers.cloudflare.com/containers/). The examples on this page use the [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/).

Scheduling policy requirement

Snapshots are only supported by Container applications that use the [`durable_object` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). Applications that use the `default` scheduling policy cannot create or restore snapshots.

## Create a container snapshot

Use `snapshotContainer()` to capture the full container filesystem. Snapshots are immutable. If you restore a snapshot and then change files, create a new snapshot to persist those changes.

Snapshot image compatibility

Snapshots capture the Container's complete filesystem state, but not its memory or running processes. A snapshot is tied to the Container image version it was created from and is not portable to a different image. After updating the image, create a new snapshot from a Container running that image.

The returned snapshot handle is a plain data object. You can store it and restore it later, including from another Durable Object:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
	async saveContainer() {
		const containerSnapshot = await this.ctx.container.snapshotContainer({
			name: "before-upgrade",
		});

		await this.ctx.storage.put("containerSnapshot", containerSnapshot);
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
	async saveContainer() {
		const containerSnapshot = await this.ctx.container.snapshotContainer({
			name: "before-upgrade",
		});

		await this.ctx.storage.put("containerSnapshot", containerSnapshot);
	}
}
```

## Restore a container snapshot

Load the saved snapshot handle. Then, pass it to `this.ctx.container.start()` when you start another container:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
	async restoreContainer() {
		const containerSnapshot = await this.ctx.storage.get("containerSnapshot");

		if (!containerSnapshot) {
			return;
		}

		this.ctx.container.start({ containerSnapshot, enableInternet: false });
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
	async restoreContainer() {
		const containerSnapshot =
			await this.ctx.storage.get<ContainerSnapshot>("containerSnapshot");

		if (!containerSnapshot) {
			return;
		}

		this.ctx.container.start({ containerSnapshot, enableInternet: false });
	}
}
```

## Understand retention

Snapshots have an implicit [30-day time-to-live](https://developers.cloudflare.com/containers/platform/limits/#snapshot-limits). Each restore refreshes that time-to-live.

You cannot set a custom time-to-live yet.

## Related resources

- [Scheduling Policies](https://developers.cloudflare.com/containers/configuration/scheduling-policy/) - Choose how Container instances are configured and updated
- [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/) - Full `ctx.container` API reference
- [Lifecycle of a Container](https://developers.cloudflare.com/containers/concepts/architecture/) - Understand startup, sleep, and shutdown behavior

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/guides/snapshots/#page","headline":"Use snapshots","description":"Save and restore Container filesystems with the Durable Object scheduling policy.","url":"https://developers.cloudflare.com/containers/guides/snapshots/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/guides/snapshots/og.png?v=74144dfc758483da","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
