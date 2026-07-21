---
description: Rate limits and data retention for Web Analytics.
title: Limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-analytics/llms.txt
> Use this file to discover all available pages before exploring further.

#  Limits

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/web-analytics/limits/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare limits the number of sites for which you can track web analytics, as well as the number of rules allowed for each plan type. Refer to the following tables for more information.

## Site limits

Cloudflare limits the number of sites for which you can track web analytics when they are not proxied by Cloudflare.

| Site type                      | Limit    |
| ------------------------------ | -------- |
| Not proxied through Cloudflare | 10       |
| Proxied through Cloudflare     | No limit |

## Rules limits

Cloudflare limits the number of Web Analytics rules you can have by plan type. For plans with a limit of zero, Web Analytics injects the JS snippet on all subdomains.

Rules are only available for sites proxied through Cloudflare.

| Plan type  | Rules limit |
| ---------- | ----------- |
| Free       | 0           |
| Pro        | 5           |
| Business   | 20          |
| Enterprise | 100         |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-analytics/limits/#page","headline":"Web Analytics - Limits · Cloudflare Web Analytics docs","description":"Rate limits and data retention for Web Analytics.","url":"https://developers.cloudflare.com/web-analytics/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
