---
description: Cloudflare data center regions used for Health Checks monitoring.
title: Health Checks regions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/health-checks/llms.txt
> Use this file to discover all available pages before exploring further.

# Health Checks regions

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/health-checks/concepts/health-checks-regions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare has data centers in [hundreds of cities worldwide ↗](https://www.cloudflare.com/network/). Health checks do not run from every single of these data centers as this would result in numerous requests to your servers. Instead, you are able to choose between one and thirteen regions from which to run health checks. Cloudflare will run Health Checks from three data centers in each region that you select.

Note

The exact location of these data centers are subject to change at any moment.

The Internet is not the same everywhere around the world and your users may not have the same experience on your application according to where they are. Running Health Checks from different regions lets you know the health of your application from the point of view of the Cloudflare network in each of these regions.

Analytics are presented at two levels:

* Regional Aggregates: Combined results from the three data centers within a specific region.
* Global Aggregates: Total results across all configured regions and data centers.

In the event log, entries are labeled by region or as **Global**. We do not provide granular data for individual data centers.

If you select multiple regions or choose **All Regions** (Business and Enterprise Only), you may increase traffic to your servers. Each region sends individual health checks from three data centers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/health-checks/concepts/health-checks-regions/#page","headline":"Health Checks regions · Cloudflare Health Checks docs","description":"Cloudflare data center regions used for Health Checks monitoring.","url":"https://developers.cloudflare.com/health-checks/concepts/health-checks-regions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
