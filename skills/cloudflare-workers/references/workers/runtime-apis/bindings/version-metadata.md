---
description: Exposes Worker version metadata (`versionID` and `versionTag`). These fields can be added to events emitted from the Worker to send to downstream observability systems.
title: Version metadata
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Version metadata

Last updated Jul 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The version metadata binding can be used to access metadata associated with a [version](https://developers.cloudflare.com/workers/versions-and-deployments/#versions) from inside the Workers runtime.

Worker version ID, version tag and timestamp of when the version was created are available through the version metadata binding. They can be used in events sent to [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) or to any third-party analytics/metrics service in order to aggregate by Worker version.

To use the version metadata binding, update your Worker's Wrangler file:

```jsonc
{
	"version_metadata": {
		"binding": "CF_VERSION_METADATA"
	}
}
```

```toml
[version_metadata]
binding = "CF_VERSION_METADATA"
```

### Interface

An example of how to access the version ID and version tag from within a Worker to send events to [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/):

```js
export default {
  async fetch(request, env, ctx) {
    const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.CF_VERSION_METADATA;
    env.WAE.writeDataPoint({
      indexes: [versionId],
      blobs: [versionTag, versionTimestamp],
      //...
    });
    //...
  },
};
```

```ts
interface Environment {
  CF_VERSION_METADATA: WorkerVersionMetadata;
  WAE: AnalyticsEngineDataset;
}

export default {
  async fetch(request, env, ctx) {
    const { id: versionId, tag: versionTag } = env.CF_VERSION_METADATA;
    env.WAE.writeDataPoint({
      indexes: [versionId],
      blobs: [versionTag],
      //...
    });
    //...
  },
} satisfies ExportedHandler<Env>;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/#page","headline":"Version metadata binding · Cloudflare Workers docs","description":"Exposes Worker version metadata (versionID and versionTag). These fields can be added to events emitted from the Worker to send to downstream observability systems.","url":"https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
