---
description: Retrieve or change your Cloudflare Origin CA key used to authenticate Origin CA certificate API requests.
title: Get Origin CA keys
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Origin CA keys

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Deprecated

Origin CA keys (Service Keys) are deprecated and will be removed on September 30, 2026\. Use an [API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Zone`\-`SSL and Certificates`\-`Edit` permissions instead. For more information, refer to [API deprecations](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/).

Origin CA keys are often used as the value of header `X-AUTH-USER-SERVICE-KEY` when interacting with [Origin CA certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) API. It is also used by [Keyless SSL](https://developers.cloudflare.com/ssl/keyless-ssl/) key server.

The key value always starts with `v1.0-`.

## Limitations

* Changing the Origin CA key is not recorded by [Audit Logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).
* Each time you view the Origin CA key, it will be presented as a different value. All these different values are **simultaneously valid** until you click the `Change` button, which immediately invalidates all previously generated values.
* Origin CA keys have access to every account the user has access to.

## View/Change your Origin CA keys

To retrieve your Origin CA keys:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
[Go to **Account home** ↗](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **User Profile** \> **API Tokens**.
3. In the **API Keys** section, select `Origin CA Key`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/#page","headline":"Get Origin CA keys · Cloudflare Fundamentals docs","description":"Retrieve or change your Cloudflare Origin CA key used to authenticate Origin CA certificate API requests.","url":"https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
