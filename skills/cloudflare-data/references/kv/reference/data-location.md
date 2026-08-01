---
description: Learn how the location of data stored in Workers KV is determined, including how you can restrict a namespace to a specific jurisdiction.
title: Data location
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

# Data location

Last updated Jul 31, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/kv/reference/data-location/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Jurisdictions for Workers KV are currently in private beta. To enroll, contact your Cloudflare account team or [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

Learn how the location of data stored in Workers KV is determined, including how you can restrict a namespace to a specific jurisdiction.

## Automatic (default)

By default, data written to a Workers KV namespace is replicated globally across Cloudflare's network with no jurisdictional restriction, allowing your data to be read with low latency from anywhere in the world.

## Restrict a namespace to a jurisdiction

Jurisdictions are used to create Workers KV namespaces that only durably store data within a region, to help comply with data locality regulations such as the [GDPR ↗](https://gdpr-info.eu/) or [FedRAMP ↗](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/).

Workers may still access a namespace constrained to a jurisdiction from anywhere in the world, and KV data can be cached outside the jurisdiction location on Cloudflare's network. The jurisdiction constraint only controls where the namespace's data is durably stored. Consider using [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) to control the regions from which Cloudflare responds to requests.

Note

Jurisdictions can only be set when a namespace is created and cannot be added or changed afterwards.

### Supported jurisdictions

| Parameter | Location                       |
| --------- | ------------------------------ |
| eu        | The European Union             |
| fedramp   | FedRAMP-compliant data centers |
| us        | The United States of America   |

### Get access

Workers KV jurisdictions are in private beta. If you are interested in restricting your namespaces to a supported jurisdiction, contact your Cloudflare account team or [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to request access.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/reference/data-location/#page","headline":"Data location · Cloudflare Workers KV docs","description":"Learn how the location of data stored in Workers KV is determined, including how you can restrict a namespace to a specific jurisdiction.","url":"https://developers.cloudflare.com/kv/reference/data-location/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-31","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
