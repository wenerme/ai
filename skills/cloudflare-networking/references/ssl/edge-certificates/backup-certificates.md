---
description: How Cloudflare issues backup certificates for redundancy.
title: Backup certificates
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Backup certificates

Last updated Sep 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If Cloudflare is providing [authoritative DNS](https://developers.cloudflare.com/dns/zone-setups/full-setup/) for your domain, Cloudflare will issue a backup [Universal SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) for every standard Universal certificate issued.

Backup certificates are wrapped with a different private key and issued from a different Certificate Authority — either Google Trust Services, Let's Encrypt, Sectigo, or SSL.com — than your domain's primary Universal SSL certificate.

These backup certificates are not normally deployed, but they will be deployed automatically by Cloudflare in the event of a certificate revocation or key compromise.

For additional details, refer to the [introductory blog post ↗](https://blog.cloudflare.com/introducing-backup-certificates/).

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |
| Can opt out? | No   | No  | No       | Yes        |

## Opt out

Enterprise customers can request to opt out of backup certificates by opening a support case. Opting out removes the backup-certificate redundancy for your domain.

## Troubleshooting

### Backup certificate deleted after turning Universal SSL back on

After you turn off and quickly turn Universal SSL back on, your domain may end up without a backup certificate.

When Universal SSL is toggled off and on in quick succession, certificate processing jobs are not guaranteed to run in the order they were submitted. This race condition can cause a newly issued backup certificate to be deleted before it becomes active.

To recover your backup certificate:

1. Turn Universal SSL off again.
2. Wait several minutes.
3. Turn Universal SSL back on, then allow time for Cloudflare to issue a new backup certificate.

If you need uninterrupted certificate coverage, consider ordering an [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) certificate before toggling Universal SSL.

For more troubleshooting help, refer to [Troubleshooting SSL errors](https://developers.cloudflare.com/ssl/troubleshooting/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/#page","headline":"Backup certificates · Cloudflare SSL/TLS docs","description":"How Cloudflare issues backup certificates for redundancy.","url":"https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
