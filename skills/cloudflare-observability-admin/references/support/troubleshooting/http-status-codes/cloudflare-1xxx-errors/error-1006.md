---
description: Troubleshoot Cloudflare 1006 error code.
title: Error 1006, 1007, 1008 or 1106
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1006, 1007, 1008 or 1106

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1006/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Errors 1006, 1007, 1008 or 1106 Access Denied: Your IP address has been banned

This error indicates that access is denied because your IP address has been banned.

### Common causes

A Cloudflare customer blocked traffic from your client or browser.

Note

Error 1006 also occurs in the Cloudflare **Workers** app under the **Preview** tab when a customer uses **[Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/)** or any other Cloudflare security feature to block the Google Cloud Platform IPs that the **Preview** tab relies upon.

### Resolution

Request the website owner to investigate their Cloudflare security settings or allow your client IP address. Since the website owner blocked your request, Cloudflare support cannot override a customer's security settings.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1006/#page","headline":"Error 1006, 1007, 1008 or 1106 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1006 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1006/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
