---
description: Normalize incoming request URLs before they reach other Cloudflare Rules.
title: URL normalization
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# URL normalization

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/normalization/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare provides a URL normalization feature to modify the URLs of incoming requests so that they conform to a consistent formatting standard. This is important because the same resource can be requested using different URL formats (for example, `/hello` and `/%68ello` refer to the same path), and without normalization, security rules and other features might not match all variations of a URL.

When you enable URL normalization, all incoming URLs are normalized before they pass to subsequent global network features that accept a URL input, such as WAF custom rules, Workers, and Access. Rule expressions that filter traffic based on URLs will therefore trigger correctly, regardless of the format of the incoming URL. When URL normalization is disabled, Cloudflare forwards the URL to origin in its original form.

Caution

When traffic is proxied through Cloudflare, certain baseline URL normalization steps are always applied, even if you turn off URL normalization for your zone. For example, Cloudflare always converts two or more adjacent slashes into a single slash (such as `//page` to `/page`). You cannot disable these baseline normalizations.

URL normalization does not perform any redirects, and therefore it will not change the address displayed in the visitor's browser. The normalization operation, when enabled, occurs on the global network and affects Cloudflare features executed later and (optionally) the URL received at the origin server.

Note

URL normalization requires that you [proxy the DNS records](https://developers.cloudflare.com/dns/proxy-status/) of your domain (or subdomain) through Cloudflare.

---

## Availability

URL normalization is available in all Cloudflare plans.

## Get started

Learn more about [URL normalization](https://developers.cloudflare.com/rules/normalization/how-it-works/) and how to [configure URL normalization](https://developers.cloudflare.com/rules/normalization/manage/) in the Cloudflare dashboard.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/normalization/#page","headline":"URL normalization · Cloudflare Rules docs","description":"Normalize incoming request URLs before they reach other Cloudflare Rules.","url":"https://developers.cloudflare.com/rules/normalization/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
