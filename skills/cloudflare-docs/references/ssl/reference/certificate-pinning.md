---
title: Certificate pinning
description: Learn why Cloudflare does not support HTTP public key pinning (HPKP) and consider an alternative solution to prevent certificate misissuance.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/reference/certificate-pinning.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Certificate pinning

Cloudflare does not support HTTP public key pinning (HPKP)[1](#user-content-fn-1) for Universal, Advanced, or Custom Hostname certificates.

Cloudflare regularly rotates the edge certificates provisioned for your domain. If HPKP were enabled, your domain would go offline each time a certificate rotates because the new certificate would not match the pinned key. Additionally, [industry experts ↗](https://scotthelme.co.uk/im-giving-up-on-hpkp/) discourage using HPKP. For a detailed overview, refer to the Cloudflare blog post on [why certificate pinning is outdated ↗](https://blog.cloudflare.com/why-certificate-pinning-is-outdated/).

## Recommended alternative

The problem HPKP tries to solve is preventing certificate misissuance. A safer way to detect misissuance without risking downtime is [Certificate Transparency Monitoring](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/), which alerts you when a certificate is issued for your domain.

## If you must pin certificates

If your use case requires certificate pinning, the only advisable approach is to upload a [custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) to Cloudflare and pin to that certificate. Because you control the certificate lifecycle — including renewal timing, CA selection, and key material — you can ensure pin continuity. However, pinning still carries outage risk: if a renewal deploys a new key, clients pinned to the old key will fail TLS. If you need pin continuity, you must intentionally reuse the same key material during renewal. Test renewed certificates in the [staging environment](https://developers.cloudflare.com/ssl/edge-certificates/staging-environment/) before production.

Select the [**user-defined** bundle method](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/bundling-methodologies/#user-defined) so that you control exactly which CA, intermediate, and leaf certificate are served.

## Footnotes

1. Key pinning allows a host to instruct a browser to only accept certain public keys when communicating with it for a given period of time. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/reference/certificate-pinning/","name":"Certificate pinning"}}]}
```
