---
description: Troubleshoot Cloudflare 1020 error code.
title: Error 1020
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1020

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1020: Access denied

This error indicates that access to the website is denied by a Cloudflare firewall rule.

### Common cause

A client or browser is blocked by a Cloudflare customer's Firewall Rules (deprecated).

### Resolution

If you are not the website owner, provide the website owner with a screenshot of the `1020` error message you received.

If you are the website owner:

1. Retrieve a screenshot of the 1020 error from your customer.
2. Search the [Security Events log](https://developers.cloudflare.com/waf/analytics/security-events/) (available at **Security** \> **Analytics**, in the **Events** tab) for the [Ray ID](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/) or client IP address from the visitor's 1020 error message.
[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
Note
Convert the UTC timestamp of the `1020` error to your local timezone when searching in the Security Events log.
3. Assess the cause of the block and either update the Firewall Rule or allow the visitor's IP address in [IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/#page","headline":"Error 1020 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1020 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
