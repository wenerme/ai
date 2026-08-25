---
description: Traffic from visitors to Cloudflare can be encrypted via HTTPS, but traffic from Cloudflare to the origin server is not. This mode is common for origins that do not support TLS, though upgrading the origin configuration is recommended whenever possible.
title: Flexible
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Flexible

Last updated Jul 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Setting your encryption mode to **Flexible** makes your site partially secure. Cloudflare allows HTTPS connections between your visitor and Cloudflare, but all connections between Cloudflare and your origin are made through HTTP. As a result, an SSL certificate is not required on your origin.

flowchart LR
    accTitle: Flexible SSL/TLS Encryption
    accDescr: With an encryption mode of Flexible, your application encrypts traffic between the visitor and Cloudflare, but not between Cloudflare and your server.
    A[Visitor] <--Encrypted--> B((Cloudflare))<--Unencrypted--> C[(Origin server)]

## Use when

Choose this option when you cannot set up an SSL certificate on your origin or your origin does not support SSL/TLS.

## Required setup

### Prerequisites

Depending on your origin configuration, you may have to adjust settings to avoid [Mixed Content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/) or [redirect loops](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/).

### Process

To change your encryption mode in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.
[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Choose an encryption mode.

To adjust your encryption mode with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `ssl` as the setting name in the URI path, and the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`, or `origin_pull`).

## Limitations

Flexible mode is only supported for HTTPS connections on port 443 (default port). Other ports using HTTPS will fall back to [**Full** mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/).

If your application contains sensitive information (personalized data, user login), use [**Full**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or [**Full (Strict)**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) modes instead.

[Authenticated Origin Pull](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) does not work when your [**SSL/TLS encryption mode**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) is set to **Off** or **Flexible**.


Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/#page","headline":"Flexible - SSL/TLS encryption modes · Cloudflare SSL/TLS docs","description":"Traffic from visitors to Cloudflare can be encrypted via HTTPS, but traffic from Cloudflare to the origin server is not. This mode is common for origins that do not support TLS, though upgrading the origin configuration is recommended whenever possible.","url":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
