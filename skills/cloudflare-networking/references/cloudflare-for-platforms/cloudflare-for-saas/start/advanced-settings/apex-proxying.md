---
description: Allow your customers to use apex domains with your SaaS application.
title: Apex proxying
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

#  Apex proxying

Last updated Jun 10, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Apex proxying allows your customers to use their apex domains (`example.com`) with your SaaS application.

Note

Only certain customers have access to this feature. For more details, see the [Plans page](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/).

## Benefits

In a normal Cloudflare for SaaS [setup](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/), your customers route traffic to your hostname by creating a `CNAME` record pointing to your CNAME target.

However, most DNS providers do not allow `CNAME` records at the zone's root[1](#user-content-fn-1). This means that your customers have to use a subdomain as a vanity domain (`shop.example.com`) instead of their domain apex (`example.com`).

This limitation does not apply with apex proxying. Cloudflare assigns a set of [Static IP prefixes](https://developers.cloudflare.com/byoip/concepts/static-ips/) \- cost associated, reach out to your account team - to your account (or uses your own if you have [BYOIP](https://developers.cloudflare.com/byoip/)). This means then that customers can create a standard `A` record to route traffic to your domain, which can support the domain apex.

## Setup

* [Set up Apex Proxying](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/setup/)

## Footnotes

1. Cloudflare offers this functionality through [CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/). [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/#page","headline":"Apex proxying · Cloudflare for Platforms docs","description":"Allow your customers to use apex domains with your SaaS application.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
