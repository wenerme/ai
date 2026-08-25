---
description: Serve HTTP sites over an encrypted TLS channel.
title: Opportunistic Encryption
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Opportunistic Encryption

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/opportunistic-encryption/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel. It's not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.

Use HTTPS when both strong encryption and authentication are required. HTTP Opportunistic Encryption provides a means of enabling TLS when needed for other protocols such as HTTP/2\. It does not provide the same indications of security as HTTPS (the green lock icon in most browser address bars).

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## Enable Opportunistic Encryption

You do not need to configure your origin web server to support Opportunistic Encryption. All it requires is updating your settings in the Cloudflare dashboard.

To enable Opportunistic Encryption in the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.
[Go to **Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Opportunistic Encryption**, switch the toggle to **On**.

To adjust your Opportunistic Encryption settings with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `opportunistic_encryption` as the setting name in the URI path, and specify the `value` parameter with your desired setting (`"on"` or `"off"`).

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/opportunistic-encryption/#page","headline":"Opportunistic Encryption · Cloudflare SSL/TLS docs","description":"Serve HTTP sites over an encrypted TLS channel.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/opportunistic-encryption/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
