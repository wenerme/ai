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

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If Cloudflare is providing [authoritative DNS](https://developers.cloudflare.com/dns/zone-setups/full-setup/) for your domain, Cloudflare will issue a backup [Universal SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) for every standard Universal certificate issued.

Backup certificates are wrapped with a different private key and issued from a different Certificate Authority — either Google Trust Services, Let's Encrypt, Sectigo, or SSL.com — than your domain's primary Universal SSL certificate.

These backup certificates are not normally deployed, but they will be deployed automatically by Cloudflare in the event of a certificate revocation or key compromise.

For additional details, refer to the [introductory blog post ↗](https://blog.cloudflare.com/introducing-backup-certificates/).

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |
| Can opt out? | No   | No  | No       | Yes        |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/#page","headline":"Backup certificates · Cloudflare SSL/TLS docs","description":"How Cloudflare issues backup certificates for redundancy.","url":"https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
