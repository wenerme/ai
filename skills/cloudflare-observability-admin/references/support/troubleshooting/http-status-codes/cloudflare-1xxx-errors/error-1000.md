---
description: Troubleshoot Cloudflare 1000 error code.
title: Error 1000
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1000

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1000/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1000: DNS points to prohibited IP

This error indicates that a Cloudflare DNS record points to a prohibited IP, blocking access to the requested domain.

### Common causes

Cloudflare halted the request for one of the following reasons:

* An A record within your Cloudflare DNS app points to a [Cloudflare IP address ↗](https://www.cloudflare.com/ips/), or a Load Balancer Origin points to a proxied record.
* Your Cloudflare DNS A or CNAME record references another reverse proxy (such as an nginx web server that uses the proxy\_pass function) that then proxies the request to Cloudflare a second time.
* The request `X-Forwarded-For` header is longer than 100 characters.
* The request includes two `X-Forwarded-For` headers.
* The request includes a `CF-Connecting-IP` header.
* A Server Name Indication (SNI) issue or mismatch at the origin.
* Your DNS record points to a SaaS provider that uses [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) with [BYOIP](https://developers.cloudflare.com/byoip/) (Bring Your Own IP). Because the provider's IP addresses are advertised through Cloudflare's network, requests resolve to Cloudflare infrastructure. If the provider has not configured a [custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) for your domain, this error is returned.

### Resolution

* If an A record within your Cloudflare DNS app points to a [Cloudflare IP address ↗](https://www.cloudflare.com/ips/), update the IP address to your origin web server IP address. Reach out to your hosting provider if you need help obtaining the origin IP address.
* There is a reverse-proxy at your origin that sends the request back through the Cloudflare proxy. Instead of using a reverse-proxy, contact your hosting provider or site administrator to configure an HTTP redirect at your origin.
* If your domain points to a SaaS provider that uses Cloudflare, contact the SaaS provider to verify that a custom hostname is properly configured for your domain. The error originates from the provider's Cloudflare account, not yours.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1000/#page","headline":"Error 1000 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1000 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1000/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
