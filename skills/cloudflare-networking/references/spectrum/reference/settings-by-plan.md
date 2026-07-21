---
description: Spectrum API fields and settings available by Cloudflare plan.
title: Settings by plan
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

#  Settings by plan

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/spectrum/reference/settings-by-plan/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Certain fields in Spectrum request and response bodies require an Enterprise plan. To upgrade your plan, contact your account team.

Spectrum properties requiring an Enterprise plan:

| Name                 | Type    | Description                                                                                                                                                                                                                                                                                          | Example                                                   |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| origin\_dns          | object  | Method and parameters used to discover the origin server address via DNS. Valid record types are A, AAAA, SRV and empty (both A and AAA).A request must contain either an origin\_dns parameter or an origin\_direct parameter. When both are specified the service returns an HTTP 400 Bad Request. | origin\_dns: {type: A, name: mqtt.example.com, ttl: 1200} |
| origin\_port         | integer | The destination port at the origin.                                                                                                                                                                                                                                                                  | 22                                                        |
| proxy\_protocol      | string  | Enables Proxy Protocol to the origin. Spectrum supports v1, v2, and simple proxy protocols. Refer to [Proxy Protocol](https://developers.cloudflare.com/spectrum/how-to/enable-proxy-protocol/) for more details.                                                                                    | off                                                       |
| ip\_firewall         | boolean | Enables IP Access rules for this application.                                                                                                                                                                                                                                                        | true                                                      |
| tls                  | string  | Type of TLS termination for the application. Options are off (default, also known as Passthrough), flexible, full, and strict. Refer to [Configuration Options](https://developers.cloudflare.com/spectrum/reference/configuration-options/) for descriptions of each.                               | full                                                      |
| argo\_smart\_routing | boolean | Enables Argo Smart Routing for the application. Note that it is only available for TCP applications with traffic\_type set to direct.                                                                                                                                                                | true                                                      |

Review the [Spectrum API documentation](https://developers.cloudflare.com/api/resources/spectrum/subresources/apps/methods/list/) for example API requests.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/reference/settings-by-plan/#page","headline":"Settings by plan · Cloudflare Spectrum docs","description":"Spectrum API fields and settings available by Cloudflare plan.","url":"https://developers.cloudflare.com/spectrum/reference/settings-by-plan/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
