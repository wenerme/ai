---
title: Custom limits
description: Set per-customer CPU time and subrequest limits on user Workers in Workers for Platforms.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Custom limits

Custom limits allow you to programmatically enforce limits on your customers' Workers' resource usage. You can set limits for the maximum CPU time and number of subrequests per invocation. If a user Worker hits either of these limits, the user Worker will immediately throw an exception.

## Set Custom limits

Custom limits can be set in the dynamic dispatch Worker:

JavaScript

```

export default {

  async fetch(request, env) {

    try {

      // parse the URL, read the subdomain

      let workerName = new URL(request.url).host.split(".")[0];

      let userWorker = env.dispatcher.get(

        workerName,

        {},

        {

          // set limits

          limits: { cpuMs: 10, subRequests: 5 },

        },

      );

      return await userWorker.fetch(request);

    } catch (e) {

      if (e.message.startsWith("Worker not found")) {

        // we tried to get a worker that doesn't exist in our dispatch namespace

        return new Response("", { status: 404 });

      }

      return new Response(e.message, { status: 500 });

    }

  },

};


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/","name":"Workers for Platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/","name":"Configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/","name":"Custom limits"}}]}
```
