---
description: Resolve conflicts with existing NS records.
title: NS records already exist
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# NS records already exist

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/existing-ns-record/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

As you try to create a new DNS record, Cloudflare displays the following error:

```txt
NS records with that host already exist. (Code:81056)
```

## Causes

When a child domain (`blog.example.com`) of your domain (`example.com`) has been set up as a separate [subdomain zone](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/), corresponding `NS` records must have been placed within the parent zone.

When you are managing DNS records for the parent zone (in this example, `example.com`), you cannot create IP address resolution records (`A`, `AAAA`, or `CNAME`) with a name that specifies the same subdomain that already exists as a separate subdomain zone.

| Type | Name | Content   | TTL  |
| ---- | ---- | --------- | ---- |
| A    | blog | 192.0.2.0 | Auto |

## Solution

Before creating such records, remove any `NS` records with the same name.

Important

This action might be reverting an existing subdomain setup and may incur in downtime. Refer to [Rollback subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/rollback/) for more guidance.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/existing-ns-record/#page","headline":"Existing NS records block new record creation · Cloudflare DNS docs","description":"Resolve conflicts with existing NS records.","url":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/existing-ns-record/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
