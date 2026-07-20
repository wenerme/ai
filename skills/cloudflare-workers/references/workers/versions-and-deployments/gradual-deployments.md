---
title: Gradual deployments
description: Incrementally deploy code changes to your Workers with gradual deployments.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Gradual deployments

Gradual deployments let you incrementally deploy new [versions](https://developers.cloudflare.com/workers/versions-and-deployments/#versions) of your Worker by splitting traffic across versions. Instead of shifting all traffic to a new version at once, you can route a percentage of requests to the new version while the rest continue to be handled by the previous version.

![Gradual Deployments](https://developers.cloudflare.com/_astro/gradual-deployments.C6F9MQ6U_ZVKcdL.webp)

Using gradual deployments, you can:

* Gradually shift traffic to a newer version of your Worker
* Monitor error rates and exceptions across versions using [observability](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/#observability) tooling
* [Roll back](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/) to a previously stable version if you notice issues

## Use gradual deployments

The following section guides you through an example usage of gradual deployments.

### Via Wrangler

Note

Minimum required Wrangler version: 3.40.0\. Versions before 3.73.0 require you to specify a `--x-versions` flag.

#### 1\. Create and deploy a new Worker

Create a new `"Hello World"` Worker using the [create-cloudflare CLI (C3)](https://developers.cloudflare.com/pages/get-started/c3/) and deploy it.

 npm  yarn  pnpm

```
npm create cloudflare@latest -- <NAME> -- --type=hello-world
```

```
yarn create cloudflare <NAME> -- --type=hello-world
```

```
pnpm create cloudflare@latest <NAME> -- --type=hello-world
```

Answer `yes` or `no` to using TypeScript. Answer `yes` to deploying your application. This is the first version of your Worker.

#### 2\. Create a new version of the Worker

Edit the Worker code by changing the `Response` content and upload the Worker using the [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-upload) command.

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

This will create a new version of the Worker that is not automatically deployed.

#### 3\. Create a new deployment

Use the [wrangler versions deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-deploy) command to create a new deployment that splits traffic between two versions. Follow the interactive prompts to select your desired percentages for each version.

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

#### 4\. Test the split deployment

Run a cURL command on your Worker to test the split deployment.

```bash
for j in {1..10}
do
    curl -s https://$WORKER_NAME.$SUBDOMAIN.workers.dev
done
```

You should see 10 responses. Responses will vary depending on the percentages configured in [step #3](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/#3-create-a-new-deployment).

You can also target a specific version using [version overrides](https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/).

#### 5\. Set your new version to 100% deployment

Run `wrangler versions deploy` again and follow the interactive prompts. Select the new version and set it to 100%.

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

### Via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application** \> **Hello World** template > deploy your Worker.
3. Once the Worker is deployed, go to the online code editor through **Edit code**. Edit the Worker code (change the `Response` content).
4. To save changes without deploying, select the **down arrow** next to **Deploy** \> **Save**. This will create a new version of your Worker.
5. Go to **Deployments** and select **Promote deployment** to create a split between the two versions.

## Version skew

Because gradual deployments mean multiple versions of your Worker serve traffic simultaneously, clients and services can end up interacting with more than one version in ways that produce errors or inconsistent behavior. This is called **version skew**.

### Version skew within a Worker

By default, each request is independently routed to a version based on the configured percentages. This means consecutive requests from the same user - including page reloads and asset fetches - can be handled by different versions.

If you want to pin a user to a consistent version for the duration of the gradual deployment, you can use [version affinity](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/version-affinity/).

### Version skew between Workers

When one Worker calls another via a [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/), the two Workers may be at different points in their own gradual deployment. Worker A (on its new version) might call Worker B, but the request lands on Worker B's old version where the API contract is different.

You can use [version overrides](https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/) to pin a downstream Worker to a specific version during a subrequest.

## Durable Objects

Gradual deployments work differently for [Durable Objects](https://developers.cloudflare.com/durable-objects/) because only one version of each Durable Object can run at a time. Refer to [Gradual Deployments with Durable Objects](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/with-durable-objects/) for details on version assignment, guarantees, and migrations.

## Observability

When using gradual deployments, you may want to attribute Workers invocations to a specific version in order to get visibility into the impact of deploying new versions.

### Logpush

A new `ScriptVersion` object is available in [Workers Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/). `ScriptVersion` can only be added through the Logpush API right now. Sample API call:

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs' \
-H 'Authorization: Bearer <TOKEN>' \
-H 'Content-Type: application/json' \
-d '{
"name": "workers-logpush",
"output_options": {
    "field_names": ["Event", "EventTimestampMs", "Outcome", "Logs", "ScriptName", "ScriptVersion"]
},
"destination_conf": "<DESTINATION_URL>",
"dataset": "workers_trace_events",
"enabled": true
}'| jq .
```

`ScriptVersion` is an object with the following structure:

```json
{
  "ScriptVersion": {
    "id": "<UUID>",
    "message": "<MESSAGE>",
    "tag": "<TAG>"
  }
}
```

### Runtime binding

Use the [Version metadata binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/) to access version ID or version tag in your Worker.

## Limits

### Deployments limit

You can only create a gradual deployment with the last 100 uploaded versions of your Worker.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/#page","headline":"Gradual deployments · Cloudflare Workers docs","description":"Incrementally deploy code changes to your Workers with gradual deployments.","url":"https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/versions-and-deployments/","name":"Versions & deployments"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/versions-and-deployments/gradual-deployments/","name":"Gradual deployments"}}]}
```
