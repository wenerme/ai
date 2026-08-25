---
description: Use your own branded nameservers with Cloudflare.
title: Custom nameservers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom nameservers

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With custom (or vanity) nameservers, a domain can use Cloudflare DNS without using Cloudflare-branded nameservers. For instance, you can configure `ns1.example.com` and `ns2.example.com` as nameservers for `example.com`.

To use custom nameservers, a zone must be using Cloudflare as Primary ([Full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/)) or [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) DNS provider.

## Configuration scope

* [Set up zone custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/zone-custom-nameservers/)
* [Set up account custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/)
* [Set up tenant custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/tenant-custom-nameservers/)

## Availability

* Zone custom nameservers are available for zones on Business or Enterprise plans. Via API or on the dashboard.
* Account custom nameservers are available for customers on Business (after [contacting Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/)) or Enterprise plans. Once configured, account custom nameservers can be used by all zones in the account, regardless of the zone plan. Via API or on the dashboard.
* Tenant custom nameservers, if created by the tenant owner, will be available to all zones belonging to any account that is part of the tenant. Via API only.

## Restrictions

Custom nameservers are organized in different sets (`ns_set`). Each namesever set must have at least two and no more than five custom nameserver names.

The advantages that come with Foundation DNS [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) are currently not available for [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/). Make sure you only use one at a time.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/#page","headline":"Custom nameservers · Cloudflare DNS docs","description":"Use your own branded nameservers with Cloudflare.","url":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
