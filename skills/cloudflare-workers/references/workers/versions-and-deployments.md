---
description: Understand how Workers tracks changes with versions and releases them with deployments.
title: Versions &amp; deployments
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Versions & deployments

Last updated Jul 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/versions-and-deployments/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Every time you change your Worker's code or configuration, Workers creates a **version**. A **deployment** determines which version(s) are actively serving traffic.

![Versions and Deployments](https://developers.cloudflare.com/_astro/versions-and-deployments.Dnwtp7bX_1XrgKm.webp)

## Versions

A version captures the complete state of your Worker at a point in time: its [bundled code](https://developers.cloudflare.com/workers/wrangler/bundling/), [static assets](https://developers.cloudflare.com/workers/static-assets/), [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/), and [compatibility settings](https://developers.cloudflare.com/workers/configuration/compatibility-dates/). Each version has a unique ID and tracks who created it, when, and from where.

You can optionally attach a message and tag to a version when you upload it.

Note

State changes for associated [storage resources](https://developers.cloudflare.com/workers/platform/storage-options/) such as [KV](https://developers.cloudflare.com/kv/), [R2](https://developers.cloudflare.com/r2/), [Durable Objects](https://developers.cloudflare.com/durable-objects/), and [D1](https://developers.cloudflare.com/d1/) are not tracked with versions.

## Deployments

A deployment determines which version(s) of your Worker are actively serving traffic. A deployment can reference one version (serving 100% of traffic) or two versions (with traffic split between them during a [gradual deployment](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/)).

Each deployment tracks who created it, when, and which version(s) it includes.

## Default behavior

By default, these two concepts are coupled together - when you run [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy), Workers creates a new version and immediately deploys it to 100% of traffic in a single step.

You can decouple them so that uploading a version and deploying it are independent actions. This gives you control over when new code goes live, and lets you use strategies like [gradual deployments](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/) or manual promotion. Refer to [Deployment management](https://developers.cloudflare.com/workers/versions-and-deployments/deployment-management/) for details.

## View versions and deployments

### Via Wrangler

Wrangler allows you to view the 100 most recent versions and deployments. Refer to the [versions list](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-list) and [deployments list](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deployments-list) documentation for the commands.

### Via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker > **Deployments**.

## Next steps

* [Deployment management](https://developers.cloudflare.com/workers/versions-and-deployments/deployment-management/) \- Upload versions without deploying them and control when they go live
* [Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/) \- Test new versions before deploying them to production
* [Gradual deployments](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/) \- Split traffic between two versions using percentage-based routing
* [Version affinity](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/version-affinity/) \- Consistently route users to the same version across page loads during a gradual deployment
* [Version overrides](https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/) \- Send a request to a specific version by ID for smoke testing and pinning between Workers
* [Rollbacks](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/) \- Revert to a previously deployed version

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/versions-and-deployments/#page","headline":"Versions & deployments · Cloudflare Workers docs","description":"Understand how Workers tracks changes with versions and releases them with deployments.","url":"https://developers.cloudflare.com/workers/versions-and-deployments/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
