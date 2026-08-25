---
description: Enable DNSSEC for a subdomain zone.
title: Enable DNSSEC
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable DNSSEC

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/dnssec/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

As opposed to the [normal process](https://developers.cloudflare.com/dns/dnssec/) for enabling DNSSEC, DNSSEC with a subdomain setup requires a few additional steps.

## Requirements

To use DNSSEC for a subdomain setup, DNSSEC must be enabled on the parent zone. After enabling DNSSEC on the parent zone, you should wait the minimum TTL value (specified in the [SOA record ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-soa-record/) of the parent zone) to ensure DNS resolvers provide the same DNS query responses.

## Setup

1. [Create](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/#how-to) the child zone.
2. Make sure the child zone is [active](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) on Cloudflare and that DNS resolution is working properly for your subdomain.
3. [Enable DNSSEC](https://developers.cloudflare.com/dns/dnssec/) for the child zone and save the information provided within the DS record output.
4. On the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page of the parent zone, [add the DS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) from the previous step.
![Screenshot showing how to add a DS record within Cloudflare](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2066,height=1040,format=webp/_astro/ds-record-example.eCudbis6.png)
5. Add an A record to the child zone to validate DNS resolution.
6. Wait two to six hours. Then, [test the A record](https://developers.cloudflare.com/dns/dnssec/troubleshooting/#test-dnssec-with-dig) added in the previous step using multiple DNS resolvers with DNSSEC validation (`1.1.1.1`, `8.8.8.8`, and `9.9.9.9`). For example, if the A record is for `test.child.example.com`: `dig test.child.example.com +dnssec @1.1.1.1`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/dnssec/#page","headline":"Enable DNSSEC - subdomain setup · Cloudflare DNS docs","description":"Enable DNSSEC for a subdomain zone.","url":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/dnssec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
