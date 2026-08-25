---
description: Troubleshoot Cloudflare 1001 error code.
title: Error 1001
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1001

Last updated Jun 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1001/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1001: DNS resolution error

This error indicates a DNS resolution failure preventing access to the requested domain.

### Common causes

* A web request was sent to a [Cloudflare IP address ↗](https://www.cloudflare.com/ips/) for a non-existent Cloudflare domain.
* An external domain that is not on using Cloudflare has a CNAME record to a domain active on Cloudflare
* The target of the DNS CNAME record does not resolve.
* A CNAME record in your Cloudflare DNS app requires resolution via a DNS provider that is currently offline.
* [Always Online](https://developers.cloudflare.com/cache/how-to/always-online/) is enabled for a [Custom Hostname (Cloudflare for SaaS)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) domain.

### Resolution

A non-Cloudflare domain cannot CNAME to a Cloudflare domain, unless the non-Cloudflare domain is added to a Cloudflare account.

Attempting to directly access DNS records used for [Cloudflare CNAME setups](https://developers.cloudflare.com/dns/zone-setups/partial-setup) also causes error 1001\. For example, `www.example.com.cdn.cloudflare.net`.

Disable [Always Online](https://developers.cloudflare.com/cache/how-to/always-online/#enable-always-online), if using [Custom Hostname (Cloudflare for SaaS)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) domain.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1001/#page","headline":"Error 1001 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1001 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1001/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
