---
description: Troubleshoot Cloudflare 1002 error code.
title: Error 1002
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1002

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1002/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1002: DNS points to Prohibited IP

This error indicates that a Cloudflare DNS record points to a prohibited IP, preventing proper domain resolution.

### Common causes

* A DNS record in your Cloudflare DNS app points to one of [Cloudflare's IP addresses ↗](https://www.cloudflare.com/ips/).
* An incorrect target is specified for a CNAME record in your Cloudflare DNS app.
* Your domain is not on Cloudflare but has a CNAME that refers to a Cloudflare domain.

### Resolution

Update your Cloudflare A or CNAME record to point to your origin IP address instead of a Cloudflare IP address:

1. Contact your hosting provider to confirm your origin IP address or CNAME record target.
2. In the Cloudflare dashboard, go to the **Records** page.
[Go to **Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
3. Select the domain that generates error 1002.
4. Select the **DNS** app.
5. Select **Value** for the A record to update.
6. Update the A record.

To ensure your origin web server does not proxy its own requests through Cloudflare, configure your origin webserver to resolve your Cloudflare domain to:

* The internal NAT'd IP address, or
* The public IP address of the origin web server.

## Error 1002: Restricted

This error indicates that the domain resolves to a restricted or disallowed IP address.

### Common cause

The Cloudflare domain resolves to a local or disallowed IP address or an IP address not associated with the domain.

### Resolution

If you own the website:

1. Confirm your origin web server IP addresses with your hosting provider,
2. Log in to your Cloudflare account, and
3. Update the A records in the Cloudflare DNS app to the IP address confirmed by your hosting provider.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1002/#page","headline":"Error 1002 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1002 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1002/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
