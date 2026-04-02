---
title: Rollbacks
description: Revert to an older version of your Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/configuration/versions-and-deployments/rollbacks.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Rollbacks

You can roll back to a previously deployed [version](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#versions) of your Worker using [Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/general/#rollback) or the Cloudflare dashboard. Rolling back to a previous version of your Worker will immediately create a new [deployment](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#deployments) with the version specified and become the active deployment across all your deployed routes and domains.

## Via Wrangler

To roll back to a specified version of your Worker via Wrangler, use the [wrangler rollback](https://developers.cloudflare.com/workers/wrangler/commands/general/#rollback) command.

## Via the Cloudflare Dashboard

To roll back to a specified version of your Worker via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker > **Deployments**.
3. Select the three dot icon on the right of the version you would like to roll back to and select **Rollback**.

Warning

**[Resources connected to your Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/) will not be changed during a rollback.**

Errors could occur if using code for a prior version if the structure of data has changed between the version in the active deployment and the version selected to rollback to.

## Limits

### Rollbacks limit

You can only roll back to the 100 most recently published versions.

Note

When using Wrangler in interactive mode, only the 10 most recent versions will be displayed for selection. To roll back to an older version (beyond the 10 most recent), you must specify the version ID directly on the command line. Refer to the [wrangler versions deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-deploy) documentation for details on specifying version IDs.

We plan to address this limitation soon to allow displaying all 100 available versions in interactive mode.

### Bindings

You cannot roll back to a previous version of your Worker if the [Cloudflare Developer Platform resources](https://developers.cloudflare.com/workers/runtime-apis/bindings/) (such as [KV](https://developers.cloudflare.com/kv/) and [D1](https://developers.cloudflare.com/d1/)) have been deleted or modified between the version selected to roll back to and the version in the active deployment. Specifically, rollbacks will not be allowed if:

* A [Durable Object migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) has occurred between the version in the active deployment and the version selected to roll back to.
* If the target deployment has a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to an R2 bucket, KV namespace, or queue that no longer exists.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/versions-and-deployments/","name":"Versions & Deployments"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/configuration/versions-and-deployments/rollbacks/","name":"Rollbacks"}}]}
```
