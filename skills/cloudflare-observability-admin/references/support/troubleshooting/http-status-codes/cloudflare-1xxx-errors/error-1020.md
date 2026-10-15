---
description: Troubleshoot Cloudflare 1020 error code.
title: Error 1020
image: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/og.png?v=8c6de191aa58d314
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1020

Last updated Oct 14, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1020: Access denied

This error indicates that a Cloudflare security feature configured by the website owner blocked the request. Cloudflare returns it with an HTTP `403` status code.

### Common cause

A security rule with a *Block* action matched the request, and the rule has no custom response configured. For example, [API Shield schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) and [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/) can block requests with a 1020 error.

Requests blocked by [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [WAF managed rules](https://developers.cloudflare.com/waf/managed-rules/) do not get a 1020 error. These requests get the WAF block response instead. For details, refer to [Different error page for blocked requests](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/#different-error-page-for-blocked-requests).

### Resolution

If you are not the website owner, provide the website owner with a screenshot of the `1020` error message you received.

If you are the website owner:

1. Retrieve a screenshot of the 1020 error from your customer.
2. Search the [Security Events log](https://developers.cloudflare.com/waf/analytics/security-events/) (available at **Security** > **Analytics**, in the **Events** tab) for the [Ray ID](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/) or client IP address from the visitor's 1020 error message. The event shows which security feature and rule blocked the request. [Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)

   Note

   Convert the UTC timestamp of the `1020` error to your local timezone when searching in the Security Events log.
3. Assess the cause of the block and update the configuration of the security feature or rule that blocked the request.

To customize the 1020 error page that visitors receive, refer to the [custom error rule example for 1020 errors](https://developers.cloudflare.com/rules/custom-errors/example-rules/#custom-html-response-for-cloudflare-1020-errors).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/#page","headline":"Error 1020","description":"Troubleshoot Cloudflare 1020 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/","inLanguage":"en","image":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/og.png?v=8c6de191aa58d314","dateModified":"2026-10-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
