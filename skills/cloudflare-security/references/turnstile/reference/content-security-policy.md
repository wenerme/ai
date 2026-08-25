---
description: Content Security Policy directives required for Turnstile widgets.
title: Content Security Policy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt
> Use this file to discover all available pages before exploring further.

# Content Security Policy

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/turnstile/reference/content-security-policy/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If your website uses a [Content Security Policy (CSP) ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) header, you must configure it to allow Turnstile's scripts and iframes. Without the correct CSP directives, Turnstile may fail to load.

Cloudflare recommends using the nonce-based approach documented with [CSP3 ↗](https://w3c.github.io/webappsec-csp/#framework-directive-source-list). Include your nonce in the `api.js` script tag and Turnstile will propagate it to dynamically loaded resources. Turnstile works with [strict-dynamic ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#strict-dynamic).

Alternatively, add the following values to your CSP header:

* **script-src**: `https://challenges.cloudflare.com`
* **frame-src**: `https://challenges.cloudflare.com`

We recommend validating your CSP with [Google's CSP Evaluator ↗](https://csp-evaluator.withgoogle.com/).

Note

You cannot set your own CSP and/or Referer-Policy via meta tags or [Transform rules](https://developers.cloudflare.com/rules/transform/) in challenge pages.

## Pre-clearance support

If you are using [Turnstile in pre-clearance mode](https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/#pre-clearance-support-in-turnstile), Turnstile sets the `cf_clearance` cookie by doing a fetch request to a special endpoint in [/cdn-cgi/](https://developers.cloudflare.com/fundamentals/reference/cdn-cgi-endpoint/) of your domain.

For this request to succeed, your `connect-src` directive must include `'self'`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/reference/content-security-policy/#page","headline":"Content Security Policy · Cloudflare Turnstile docs","description":"Content Security Policy directives required for Turnstile widgets.","url":"https://developers.cloudflare.com/turnstile/reference/content-security-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CSP","Headers"]}
```
