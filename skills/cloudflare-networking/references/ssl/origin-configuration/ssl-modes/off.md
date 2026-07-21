---
description: No encryption is used for traffic between visitors and Cloudflare or between Cloudflare and origins. Everything is cleartext HTTP.
title: Off (no encryption)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

#  Off (no encryption)

Last updated Jul 9, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Setting your encryption mode to **Off (not recommended)** redirects any HTTPS request to plaintext HTTP.

    flowchart LR
        accTitle: No SSL/TLS Encryption
        accDescr: With an encryption mode of Off, your application does not encrypt traffic between the visitor and Cloudflare or between Cloudflare and your server.
        A[Visitor] <--Unencrypted--> B((Cloudflare))<--Unencrypted--> C[(Origin server)]

## Use when

Cloudflare does not recommend setting your encryption mode to **Off**.

## Required setup

To change your encryption mode in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.
[ Go to **Overview** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Choose an encryption mode.

To adjust your encryption mode with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `ssl` as the setting name in the URI path, and the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`, or `origin_pull`).

## Limitations

When you set your encryption mode to **Off**, your application:

* Leaves your visitors and your application [vulnerable to attacks ↗](https://www.cloudflare.com/learning/ssl/why-use-https/).
* Will be marked as "not secure" by Chrome and other browsers, reducing visitor trust.
* Will be penalized in [SEO rankings ↗](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).

### Incompatible settings

When you set your SSL/TLS encryption mode to **Off**, you will not see the options for [**Always Use HTTPS**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) or [**Onion Routing**](https://developers.cloudflare.com/network/onion-routing/).

[Authenticated Origin Pull](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) does not work when your [**SSL/TLS encryption mode**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) is set to **Off** or **Flexible**.


Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/#page","headline":"Off - SSL/TLS encryption modes · Cloudflare SSL/TLS docs","description":"No encryption is used for traffic between visitors and Cloudflare or between Cloudflare and origins. Everything is cleartext HTTP.","url":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
