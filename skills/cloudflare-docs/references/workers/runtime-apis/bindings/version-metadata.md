---
title: Version metadata
description: Exposes Worker version metadata (`versionID` and `versionTag`). These fields can be added to events emitted from the Worker to send to downstream observability systems.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/runtime-apis/bindings/version-metadata.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Version metadata

The version metadata binding can be used to access metadata associated with a [version](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#versions) from inside the Workers runtime.

Worker version ID, version tag and timestamp of when the version was created are available through the version metadata binding. They can be used in events sent to [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) or to any third-party analytics/metrics service in order to aggregate by Worker version.

To use the version metadata binding, update your Worker's Wrangler file:

* [  wrangler.jsonc ](#tab-panel-7550)
* [  wrangler.toml ](#tab-panel-7551)

```

{

  "version_metadata": {

    "binding": "CF_VERSION_METADATA"

  }

}


```

```

[version_metadata]

binding = "CF_VERSION_METADATA"


```

### Interface

An example of how to access the version ID and version tag from within a Worker to send events to [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/):

* [  JavaScript ](#tab-panel-7548)
* [  TypeScript ](#tab-panel-7549)

JavaScript

```

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

TypeScript

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/bindings/","name":"Bindings (env)"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/bindings/version-metadata/","name":"Version metadata"}}]}
```
