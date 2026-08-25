---
description: Troubleshoot Cloudflare 1011 error code.
title: Error 1011
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1011

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1011/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1011: Access Denied (Hotlinking Denied)

This error indicates that access to the resource is denied due to hotlinking protection.

### Common cause

A request is made for a resource that uses [Cloudflare hotlink protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/).

### Resolution

Notify the website owner of the blocking. If you cannot determine how to contact the website owner, lookup contact information for the domain via the [Whois database ↗](https://lookup.icann.org/).

Note

Since the website owner performed the blocking, Cloudflare support cannot override a customer's security settings.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1011/#page","headline":"Error 1011 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1011 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1011/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
