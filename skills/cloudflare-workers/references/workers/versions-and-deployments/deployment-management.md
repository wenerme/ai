---
title: Deployment management
description: Upload versions independently and control when and how they are deployed to your Worker's traffic.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Deployment management

By default, a new version is created and immediately deployed to 100% of traffic when you use any of the following:

* [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy)
* [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
* The [Workers Script Upload API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/)

You can separate these steps so that uploading a version and deploying it are independent actions. This lets you control exactly when a new version goes live.

## Upload a version without deploying

### Via Wrangler

Use the [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-upload) command:

 npm  yarn  pnpm

```
npx wrangler versions upload
```

```
yarn wrangler versions upload
```

```
pnpm wrangler versions upload
```

Note

Wrangler versions before 3.73.0 require you to specify a `--x-versions` flag.

Note

To apply changes to a Worker's triggers ([routes, domains](https://developers.cloudflare.com/workers/configuration/routing/), or [cron triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)), use the [wrangler triggers deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#triggers-deploy) command.

### Via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker > **Edit code**.
3. Make your changes, then select the **down arrow** next to **Deploy** \> **Save**.

Note

New versions are not created when you make changes to [resources connected to your Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/). For example, if two Workers (Worker A and Worker B) are connected via a [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/), changing the code of Worker B will not create a new version of Worker A. Changes to the service binding configuration (such as deleting the binding or updating the [environment](https://developers.cloudflare.com/workers/wrangler/environments/) it points to) on Worker A will also not create a new version of Worker B.

## Deploy an uploaded version

Once you have uploaded a version, you can create a deployment that routes traffic to it.

### Via Wrangler

Use the [wrangler versions deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-deploy) command and follow the interactive prompts to select the version and set it to 100%:

 npm  yarn  pnpm

```
npx wrangler versions deploy
```

```
yarn wrangler versions deploy
```

```
pnpm wrangler versions deploy
```

You can also set the traffic percentage to less than 100% to start a [gradual deployment](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/).

### Via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker > **Deployments**.
3. Select **Promote deployment** and choose the version you want to deploy.

### Via Infrastructure as Code

You can also create versions and deployments directly with the API, library SDKs, and Terraform. Refer to [Infrastructure as Code](https://developers.cloudflare.com/workers/platform/infrastructure-as-code/) for examples.

## Limits

### Deployments limit

You can only create a deployment with the last 100 uploaded versions of your Worker.

### First upload

You must use [C3](https://developers.cloudflare.com/workers/get-started/guide/#1-create-a-new-worker-project) or [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) the first time you create a new Workers project. Using [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-upload) the first time you upload a Worker will fail.

### Service worker syntax

Service worker syntax is not supported for versions that are uploaded through [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-upload). You must use ES modules format.

Refer to [Migrate from Service Workers to ES modules](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/#advantages-of-migrating) to learn how to migrate your Workers from the service worker format to the ES modules format.

### Durable Object migrations

Uploading a version with [Durable Object migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) is not supported. Use [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) if you are applying a [Durable Object migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/versions-and-deployments/deployment-management/#page","headline":"Deployment management · Cloudflare Workers docs","description":"Upload versions independently and control when and how they are deployed to your Worker's traffic.","url":"https://developers.cloudflare.com/workers/versions-and-deployments/deployment-management/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/versions-and-deployments/","name":"Versions & deployments"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/versions-and-deployments/deployment-management/","name":"Deployment management"}}]}
```
