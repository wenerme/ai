---
description: Send the visitor's IP to your origin via True-Client-IP header.
title: Understanding the True-Client-IP Header
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network/llms.txt
> Use this file to discover all available pages before exploring further.

# Understanding the True-Client-IP Header

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network/true-client-ip-header/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Enabling the True-Client-IP Header adds the [True-Client-IP header](https://developers.cloudflare.com/fundamentals/reference/http-headers/#true-client-ip-enterprise-plan-only) to all requests to your origin server, which includes the end user's IP address.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | No   | No  | No       | Yes        |

## Add True-Client-IP Header

The recommended procedure to access client IP information is to [enable the **Add "True-Client-IP" header** Managed Transform](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-true-client-ip-header).

Note

To use this data, you will need to then retrieve it from the [True-Client-IP header](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ipcountry).

## Additional resources

For additional guidance on using True-Client-IP Header with Cloudflare, refer to the following resources:

* [Available Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-true-client-ip-header)
* [Cloudflare HTTP headers](https://developers.cloudflare.com/fundamentals/reference/http-headers/#true-client-ip-enterprise-plan-only)
* [Restoring original visitor IPs](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network/true-client-ip-header/#page","headline":"Understanding the True-Client-IP Header · Cloudflare Network settings docs","description":"Send the visitor's IP to your origin via True-Client-IP header.","url":"https://developers.cloudflare.com/network/true-client-ip-header/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
