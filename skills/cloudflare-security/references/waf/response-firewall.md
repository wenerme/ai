---
description: Apply default protections and custom rules to HTTP responses with the Cloudflare response firewall.
title: Response firewall
image: https://developers.cloudflare.com/waf/response-firewall/og.png?v=5a72527e21cee120
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Response firewall

Last updated Nov 12, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/response-firewall/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The response firewall applies security rules to HTTP responses. Cloudflare turns on default protections for everyone, on every plan.

You can create response custom rules to block responses or log matches. These rules run in the `http_response_firewall_custom` [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/).

## Availability

Every plan includes three response custom rules per zone. All rules count toward this allowance, including disabled rules.

You can include at most one rule with the `execute` action. An `execute` rule leaves two slots for `block` or `log` rules.

## Supported actions

Response custom rules support the following actions:

| Action | Behavior |
| --- | --- |
| `block` | Block a matching response. |
| `log` | Log a match. |
| `execute` | Run the default protections alongside your custom rules. |

## Supported fields

Response custom rules support the request fields available in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). The same field entitlements apply to response custom rules.

You can also match on the following response fields:

| Field | Supported raw variant |
| --- | --- |
| `http.response.code` | — |
| `http.response.content_type.media_type` | — |
| `http.response.headers` | `raw.http.response.headers` |
| `http.response.headers.names` | `raw.http.response.headers.names` |
| `http.response.headers.values` | `raw.http.response.headers.values` |
| `http.response.set_cookies` | `raw.http.response.set_cookies` |

For requests to `/api/` paths, this expression matches responses with status code `500`:

```txt
starts_with(http.request.uri.path, "/api/") and http.response.code eq 500
```

Response custom rules do not support matching on `http.response.body.raw`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/waf/response-firewall/#page","headline":"Response firewall","description":"Apply default protections and custom rules to HTTP responses with the Cloudflare response firewall.","url":"https://developers.cloudflare.com/waf/response-firewall/","inLanguage":"en","image":"https://developers.cloudflare.com/waf/response-firewall/og.png?v=5a72527e21cee120","dateModified":"2026-11-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
