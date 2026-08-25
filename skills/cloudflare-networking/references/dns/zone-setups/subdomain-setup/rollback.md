---
description: Roll back a subdomain zone setup.
title: Rollback
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Rollback

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/rollback/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Refer to the following process to understand how you can rollback a [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) and recreate the corresponding subdomain DNS records in an existing parent zone within Cloudflare.

## Before you begin

* This guide assumes both your child domain (`blog.example.com`) and its parent domain (`example.com`) are in Cloudflare.
* In the child zone, review and [export](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/#export-records) the DNS records.

Important

This process may incur in downtime, as it is not possible to add address records (A/AAAA) while still having [corresponding NS records at the same name](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/existing-ns-record/) within the parent zone.

## Steps

1. (Optional) In the parent zone, migrate over any settings - [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), [Rules](https://developers.cloudflare.com/rules/), [Workers](https://developers.cloudflare.com/workers/), and more - that might be needed for the child domain.
2. (Optional) If necessary, [order an advanced SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) that covers the child domain and any deeper subdomains.
3. In the parent zone, go to the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page.
4. Delete one of the `NS` records defined for the child domain.
5. Edit the remaining `NS` record to create the subdomain address record.
6. [Import](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/#import-records) the records you had obtained [before you began](#before-you-begin).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/rollback/#page","headline":"Rollback subdomain setup · Cloudflare DNS docs","description":"Roll back a subdomain zone setup.","url":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/rollback/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
