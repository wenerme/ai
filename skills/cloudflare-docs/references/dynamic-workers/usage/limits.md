---
title: Custom limits
description: Limit resource usage of dynamic Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dynamic-workers/usage/limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Custom limits

Custom limits allow you to programmatically enforce limits on the dynamic Worker's resource usage. You can set limits for the maximum CPU time and number of subrequests per invocation. If a dynamic Worker hits either of these limits, it will immediately throw an exception.

## Set custom limits

Custom limits can be specified as part of the worker code:

JavaScript

```

const worker = env.LOADER.get("my-worker", async () => {

  return {

    compatibilityDate: "$today",

    mainModule: "index.js",

    modules: { "index.js": code },

    limits: { cpuMs: 10, subRequests: 5 },

  };

});


```

They can also be specified as part of the `getEntrypoint()` call:

JavaScript

```

// get the worker's default entrypoint with custom limits

// if limits were already specified as part of the worker code, the lower of the two limits is used

const entrypoint = worker.getEntrypoint(null, { limits: { cpuMs: 10, subRequests: 5 } });

await entrypoint.fetch(...);


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dynamic-workers/","name":"Dynamic Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/dynamic-workers/usage/","name":"Usage"}},{"@type":"ListItem","position":4,"item":{"@id":"/dynamic-workers/usage/limits/","name":"Custom limits"}}]}
```
