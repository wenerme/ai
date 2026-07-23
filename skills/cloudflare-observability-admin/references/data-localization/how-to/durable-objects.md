---
description: Configure Durable Objects with Regional Services and Customer Metadata Boundary.
title: Durable Objects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# Durable Objects

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/data-localization/how-to/durable-objects/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following sections describe how to configure Durable Objects with Regional Services and Customer Metadata Boundary to control where your Durable Objects run, persist data, and where logs are stored.

## Regional Services

To configure Regional Services for hostnames [proxied](https://developers.cloudflare.com/dns/proxy-status/) (meaning traffic routes through Cloudflare) through Cloudflare and ensure that processing of a Durable Object (DO) occurs only in-region, follow these steps:

1. Follow the steps in the Durable Objects [Get Started](https://developers.cloudflare.com/durable-objects/get-started/) guide.
2. [Restrict Durable Objects to a jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction), in order to control where the DO itself runs and persists data, by creating a jurisidictional subnamespace in your Worker’s code.
3. Follow the [Workers guide](https://developers.cloudflare.com/data-localization/how-to/workers/#regional-services) to configure a custom domain with Regional Services, in order to control the regions from which Cloudflare responds to requests.

## Customer Metadata Boundary

DO Logs and Analytics are not available outside the US region when using Customer Metadata Boundary. With Customer Metadata Boundary set to `EU`, **Workers & Pages** \> **Workers** \> **Metrics** tab related to DO in the zone dashboard will not be populated.

Refer to the [Durable Objects documentation](https://developers.cloudflare.com/durable-objects/) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/how-to/durable-objects/#page","headline":"Durable Objects · Cloudflare Data Localization Suite docs","description":"Configure Durable Objects with Regional Services and Customer Metadata Boundary.","url":"https://developers.cloudflare.com/data-localization/how-to/durable-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
