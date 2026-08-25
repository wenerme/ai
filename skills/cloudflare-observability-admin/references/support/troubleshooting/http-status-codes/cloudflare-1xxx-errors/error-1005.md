---
description: Troubleshoot Cloudflare 1005 error code.
title: Error 1005
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1005

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1005/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Errors 1005 Access Denied: Autonomous System Number (ASN) banned

This error indicates that access to the website is denied due to the banning of the Autonomous System Number (ASN).

### Common causes

The owner of the website (for example, `example.com`) has banned the autonomous system number (ASN) from accessing the website.

### Resolution

If you are not the website owner, provide the website owner with a screenshot of the 1005 error message you received.

If you are the website owner:

1. Retrieve a screenshot of the `1005` error from your customer
2. Search the [**Security Events log**](https://developers.cloudflare.com/waf/analytics/security-events/) (available at **Security** \> **Events**) for the [**Ray ID**](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/), or client IP Address from the visitor's 1005 error message.

Note

Convert the UTC timestamp of the `1005` error to your local timezone when searching in the **Security Events log**.

1. Assess the cause of the block and ensure the ASN is allowed under the [IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) security feature.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1005/#page","headline":"Error 1005 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1005 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1005/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
