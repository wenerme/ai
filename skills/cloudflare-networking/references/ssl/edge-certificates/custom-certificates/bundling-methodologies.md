---
description: Certificate chain bundling options for custom certificates.
title: Bundle methodologies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Bundle methodologies

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/bundling-methodologies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When an SSL certificate is deployed to Cloudflare's global network, it may be augmented with intermediate and root certificates to assist the user agent in finding a chain to a publicly trusted root.

You can control the mechanics of how certificates are bundled by specifying a bundling methodology.

## Intermediate and root certificates

Cloudflare maintains intermediate and root certificates used for bundling on a [GitHub repository ↗](https://github.com/cloudflare/cfssl%5Ftrust). As the certificates expire or are removed by certificate authorities, Cloudflare removes and adds them accordingly.

Expiration values for these certificates may appear in the `expires_on` field when you use the [Analyze Certificate endpoint](https://developers.cloudflare.com/api/resources/ssl/subresources/analyze/methods/create/) \- often when the methodology you specify is [Compatible](#compatible). However, these expiration values reflect intermediate and root certificates - which are handled by Cloudflare -, not the leaf certificate you would have previously uploaded to Cloudflare.

Note

When using `compatible` or `modern`, a selection might be done on the intermediates you provide at upload time, meaning it is not guaranteed all of them will make it to the final chain. If you must ensure the chain you upload is the one used, select `user-defined`.

## Methodologies

### Compatible

Compatible is the default methodology and uses common and well distributed intermediate certificates to complete the chain. This ensures that the resulting bundle is compatible with as many clients as possible.

The related value for the `bundle_method` parameter when using the [API](https://developers.cloudflare.com/api/resources/custom%5Fcertificates/methods/create/) is `ubiquitous`.

### Modern

Modern consists of attempts to make the chain as efficient as possible, often by using newer or fewer intermediate certificates.

The related value for the `bundle_method` parameter when using the [API](https://developers.cloudflare.com/api/resources/custom%5Fcertificates/methods/create/) is `optimal`.

### User-defined

User-defined allows you to paste your own certificate chain and present that bundle to clients. If you are using a self-signed certificate (not recommended), you must use this mode.

The related value for the `bundle_method` parameter when using the [API](https://developers.cloudflare.com/api/resources/custom%5Fcertificates/methods/create/) is `force`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/bundling-methodologies/#page","headline":"Bundle methodologies · Cloudflare SSL/TLS docs","description":"Certificate chain bundling options for custom certificates.","url":"https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/bundling-methodologies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
