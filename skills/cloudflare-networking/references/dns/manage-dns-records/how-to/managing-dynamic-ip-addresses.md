---
description: Update DNS records automatically for dynamic IP addresses.
title: Dynamically update DNS records
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Dynamically update DNS records

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/manage-dns-records/how-to/managing-dynamic-ip-addresses/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Most Internet service providers and some hosting providers dynamically update their customer's IP addresses. If this situation applies to you, you need an automated solution to dynamically update your DNS records in Cloudflare.

## Cloudflare API

Create a script to monitor IP address changes and then have that script push changes to the [Cloudflare API](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/update/).

## ddclient

[ddclient ↗](https://github.com/ddclient/ddclient) is a third-party Perl client used to update dynamic DNS entries for accounts on various DNS providers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/managing-dynamic-ip-addresses/#page","headline":"Dynamically update DNS records · Cloudflare DNS docs","description":"Update DNS records automatically for dynamic IP addresses.","url":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/managing-dynamic-ip-addresses/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
