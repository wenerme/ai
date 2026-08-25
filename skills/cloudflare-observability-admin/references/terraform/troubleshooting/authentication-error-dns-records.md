---
description: Fix the 403 authentication error caused by incorrect zone data source indexing in Terraform.
title: 403 Authentication error when creating DNS records
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt
> Use this file to discover all available pages before exploring further.

# 403 Authentication error when creating DNS records

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/terraform/troubleshooting/authentication-error-dns-records/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When creating DNS records using Terraform, the API returns the following error:

`Error: failed to create DNS record: HTTP status 403: Authentication error (10000)`

This is caused by an error in your code syntax, when you are not using index `[0]` for the zones. Find an example below and a more detailed thread on [GitHub ↗](https://github.com/cloudflare/terraform-provider-cloudflare/issues/913).

Instead of this:

```txt
zone_id = data.cloudflare_zones.example_com.id
```

Use this:

```txt
zone_id = data.cloudflare_zones.example_com.zones[0].id`
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/troubleshooting/authentication-error-dns-records/#page","headline":"403 Authentication error when creating DNS records · Cloudflare Terraform docs","description":"Fix the 403 authentication error caused by incorrect zone data source indexing in Terraform.","url":"https://developers.cloudflare.com/terraform/troubleshooting/authentication-error-dns-records/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
