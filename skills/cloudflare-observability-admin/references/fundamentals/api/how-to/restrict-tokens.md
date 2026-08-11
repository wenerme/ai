---
description: Limit Cloudflare API token usage by client IP address filtering and time-to-live (TTL) constraints.
title: Restrict tokens
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Restrict tokens

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/api/how-to/restrict-tokens/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

API tokens can be restricted at runtime in two ways:

* [Client IP address range filtering](#client-ip-address-range-filtering)
* [Time To Live (TTL) constraints](#time-to-live-ttl-constraints)

## Client IP address range filtering

Client IP address restrictions control which IP addresses can make API requests with this token. By default, if no filtering is applied, all IP addresses can use the token. Once an `Is in` rule is applied, the token can only be used from the defined IP addresses. Define ranges with [CIDR notation ↗](https://en.wikipedia.org/wiki/Classless%5FInter-Domain%5FRouting#CIDR%5Fnotation). To allow an IP range with exceptions, define `Is not in` to exempt specific IPs or smaller ranges.

![IP Address filtering options](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1802,height=442,format=webp/_astro/ip-filter.DbEuurVj.png)

Note

Client IP address range filtering is not applied to the [Verify Token ↗](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/verify/) endpoint.

## Time to live (TTL) constraints

By default, tokens do not expire and are long lived. Defining a TTL sets when a token starts being valid and when a token is no longer valid. This is often referred to as `notBefore` and `notAfter`. Setting these timestamps limits the lifetime of the token to the defined period. Not setting the start date or `notBefore` means the token is active as soon as it is created. Not setting the end date or `notAfter` means the token does not expire.

Note

Dates selected are defined as 00:00 UTC of that day. For finer grained time selection, use the [API](https://developers.cloudflare.com/fundamentals/api/).

![Time to Live selection calendar](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1280,height=836,format=webp/_astro/ttl.6XWjuAt_.png)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/how-to/restrict-tokens/#page","headline":"Restrict tokens · Cloudflare Fundamentals docs","description":"Limit Cloudflare API token usage by client IP address filtering and time-to-live (TTL) constraints.","url":"https://developers.cloudflare.com/fundamentals/api/how-to/restrict-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
