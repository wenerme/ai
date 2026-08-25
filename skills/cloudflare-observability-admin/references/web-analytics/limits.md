---
description: Rate limits and data retention for Web Analytics.
title: Limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Aug 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web-analytics/limits/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare limits the number of sites for which you can track web analytics, as well as the number of rules allowed for each plan type. Refer to the following tables for more information.

## Site limits

Cloudflare limits the number of sites for which you can track web analytics when they are not proxied by Cloudflare.

| Site type                      | Limit    |
| ------------------------------ | -------- |
| Not proxied through Cloudflare | 10       |
| Proxied through Cloudflare     | No limit |

Note

To provide a reliable and fast experience, viewing aggregate data is limited to 1,000 websites in parallel in the dashboard. Customers with large volumes of tracked websites can workaround this restriction by selecting specific websites or using the GraphQL API to extract data.

## Rules limits

Cloudflare limits the number of Web Analytics rules you can have by plan type. For plans with a limit of zero, Web Analytics injects the JS snippet on all subdomains.

Rules are only available for sites proxied through Cloudflare.

| Plan type  | Rules limit |
| ---------- | ----------- |
| Free       | 0           |
| Pro        | 5           |
| Business   | 20          |
| Enterprise | 100         |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-analytics/limits/#page","headline":"Web Analytics - Limits · Cloudflare Web Analytics docs","description":"Rate limits and data retention for Web Analytics.","url":"https://developers.cloudflare.com/web-analytics/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
