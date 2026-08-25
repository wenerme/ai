---
description: Review WAF action and rule field values in logs.
title: WAF fields
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# WAF fields

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/reference/waf-fields/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Web Application Firewall (WAF) contains rules managed by Cloudflare to block requests that contain malicious content.

## WAF Action

| Value | Action          | Description                                  |
| ----- | --------------- | -------------------------------------------- |
| 0     | Unknown         | Take no other action.                        |
| 1     | Allow           | Bypass all subsequent WAF rules.             |
| 2     | Drop            | Block with an HTTP 403 response.             |
| 3     | Challenge Allow | Issue a Managed Challenge.                   |
| 4     | Challenge Drop  | Unused.                                      |
| 5     | Log             | Take no action other than logging the event. |

## Deprecated fields for internal Cloudflare use

The values of these fields are subject to change by Cloudflare at any time and are irrelevant for customer data analysis:

* WAFFlags
* WAFMatchedVar

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/reference/waf-fields/#page","headline":"WAF fields · Cloudflare Logs docs","description":"Review WAF action and rule field values in logs.","url":"https://developers.cloudflare.com/logs/reference/waf-fields/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
