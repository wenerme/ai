---
title: With Durable Objects
description: How gradual deployments work with Durable Objects, including version assignment, migrations, and guarantees.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# With Durable Objects

To provide [global uniqueness](https://developers.cloudflare.com/durable-objects/platform/known-issues/#global-uniqueness), only one version of each [Durable Object](https://developers.cloudflare.com/durable-objects/) can run at a time. This means that gradual deployments work slightly differently for Durable Objects.

When you create a new gradual deployment for a Worker with Durable Objects, each Durable Object is assigned a Worker version based on the percentages you configured in your [deployment](https://developers.cloudflare.com/workers/versions-and-deployments/#deployments). This version will not change until you create a new deployment.

![Gradual Deployments Durable Objects](https://developers.cloudflare.com/_astro/durable-objects.D92CiuSQ_1zYrvV.webp)

## Example

This example assumes that you have previously created three Durable Object instances with names "foo", "bar", and "baz".

Your Worker is currently on a version that we will call version "A" and you want to gradually deploy a new version "B" of your Worker.

Here is how the versions of your Durable Objects might change as you progress your gradual deployment:

| Deployment config              | "foo" | "bar" | "baz" |
| ------------------------------ | ----- | ----- | ----- |
| Version A: 100%                | A     | A     | A     |
| Version B: 20%  Version A: 80% | B     | A     | A     |
| Version B: 50%  Version A: 50% | B     | B     | A     |
| Version B: 100%                | B     | B     | B     |

This is only an example, so the versions assigned to your Durable Objects may be different. However, the following is guaranteed:

* For a given deployment, requests to each Durable Object will always use the same Worker version.
* When you specify each version in the same order as the previous deployment and increase the percentage of a version, Durable Objects which were previously assigned that version will not be assigned a different version. In this example, Durable Object "foo" would never revert from version "B" to version "A".
* The Durable Object will only be [reset](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/#durable-object-reset-because-its-code-was-updated) when it is assigned a different version, so each Durable Object will only be reset once in this example.

Note

Typically, a Worker bundle will define both the Durable Object class and a Worker that interacts with it. In this case, you cannot deploy changes to your Durable Object and its Worker independently.

You should ensure that API changes between your Durable Object and its Worker are [forwards and backwards compatible](https://developers.cloudflare.com/durable-objects/platform/known-issues/#code-updates) whether you are using gradual deployments or not. However, using gradual deployments will make it even more likely that different versions of your Durable Objects and its Worker will interact with each other.

## Durable Object class lifecycle changes

Versions of Worker bundles that change Durable Object class lifecycle cannot be uploaded. This applies to both the declarative [exports](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) field and the legacy [migrations](https://developers.cloudflare.com/durable-objects/reference/durable-object-class-migrations-legacy/) array. This is because Durable Object lifecycle changes are atomic operations. Once a lifecycle change is deployed, rollbacks cannot take place to any version prior to the one that included the change.

Durable Object lifecycle changes can be deployed with the following command:

 npm  yarn  pnpm

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

To limit the blast radius of these deployments, Durable Object lifecycle changes should be deployed independently of other code changes.

To understand why Durable Object lifecycle changes are atomic operations, consider the hypothetical example of gradually deploying a class deletion. If a delete were applied to 50% of Durable Object instances, then Workers requesting those Durable Object instances would fail because they would have been deleted.

To do this without producing errors, a version of the Worker which does not depend on any of the Durable Objects to be deleted would have to have already been rolled out. Then, you can deploy the class deletion without affecting any traffic and there is no reason to do so gradually.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/with-durable-objects/#page","headline":"With Durable Objects · Cloudflare Workers docs","description":"How gradual deployments work with Durable Objects, including version assignment, migrations, and guarantees.","url":"https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/with-durable-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/versions-and-deployments/","name":"Versions & deployments"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/versions-and-deployments/gradual-deployments/","name":"Gradual deployments"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/versions-and-deployments/gradual-deployments/with-durable-objects/","name":"With Durable Objects"}}]}
```
