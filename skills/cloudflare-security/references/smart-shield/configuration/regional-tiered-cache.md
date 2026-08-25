---
description: Limit upper-tier data centers to your preferred region for data locality.
title: Regional Tiered Cache
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Regional Tiered Cache

Last updated Jun 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Availability

Regional Tiered Cache is included with Enterprise plans. Smart Shield Advanced, which includes Regional Tiered Cache, is currently only available to Enterprise customers. If you are interested in Smart Shield Advanced, contact our [Enterprise Sales team ↗](https://www.cloudflare.com/resource/contact-enterprise-sales/).

Regional Tiered Cache provides an additional layer of caching for customers who have a global traffic footprint and want to serve content faster by avoiding network latency when there is a cache `MISS` in a lower-tier, resulting in an upper-tier fetch in a data center located far away.

Regional Tiered Cache instructs Cloudflare to check a regional hub data center near the lower tier before going to the upper tier that may be outside of the region.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/#page","headline":"Regional Tiered Cache · Cloudflare Smart Shield docs","description":"Limit upper-tier data centers to your preferred region for data locality.","url":"https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Caching"]}
```
