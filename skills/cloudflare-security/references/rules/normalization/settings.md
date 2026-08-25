---
description: Available URL normalization types and configuration settings.
title: URL normalization settings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# URL normalization settings

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/normalization/settings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Cloudflare dashboard provides the following settings to manage URL normalization:

## Normalization type

Default value: _RFC-3986_

Selects the type of normalization to perform:

* _RFC-3986_ – Applies URL normalization strictly according to [RFC 3986 ↗](https://datatracker.ietf.org/doc/html/rfc3986).
* _Cloudflare_ – In addition to what is defined in RFC 3986, applies [extra URL normalization techniques](https://developers.cloudflare.com/rules/normalization/how-it-works/#cloudflare-normalization).

## Normalize incoming URLs

Default value: _On_

Configures the URLs of all incoming traffic to Cloudflare:

* When enabled, all incoming URLs are normalized before they pass to subsequent Cloudflare features that can receive a URL as input, such as Page Rules, WAF custom rules, Workers, and Access.
* When disabled, incoming URLs are not normalized before passing to subsequent Cloudflare features.

## Normalize URLs to origin

Default value: _Off_

Configures URLs sent to the origin:

* When enabled, requests sent to the origin are normalized.
* When disabled, requests sent to the origin are not modified.

You can only view and enable this option when **Normalize incoming URLs** is enabled.

For examples of how these settings affect URL normalization, refer to the [URL normalization examples](https://developers.cloudflare.com/rules/normalization/examples/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/normalization/settings/#page","headline":"URL normalization settings · Cloudflare Rules docs","description":"Available URL normalization types and configuration settings.","url":"https://developers.cloudflare.com/rules/normalization/settings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
