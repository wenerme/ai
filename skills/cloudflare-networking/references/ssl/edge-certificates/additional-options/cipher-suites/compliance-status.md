---
description: Cipher suite compliance with FIPS 140-3, PCI DSS, and other standards.
title: Compliance standards
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Compliance standards

Last updated Jun 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Consider the following recommendations on custom [cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/) for when your organization needs to comply with regulatory standards.

Refer to [Customize cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) to learn how to specify cipher suites at zone level or per hostname.

Caution

Also [enable TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) on your zone and, when opting for [PCI DSS](#pci-dss), make sure to up your [Minimum TLS version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) to `1.2`. Refer to [Cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/) and [TLS protocols](https://developers.cloudflare.com/ssl/reference/protocols/) to learn more.

## PCI DSS

Recommended cipher suites for compliance with the [Payment Card Industry Data Security Standard (PCI DSS) ↗](https://www.pcisecuritystandards.org/standards/pci-dss/). Enhances payment card data security.

Cipher suites list

`AEAD-AES128-GCM-SHA256`[1](#user-content-fn-1), `AEAD-AES256-GCM-SHA384`[2](#user-content-fn-2), `AEAD-CHACHA20-POLY1305-SHA256`[3](#user-content-fn-3), `ECDHE-ECDSA-AES128-GCM-SHA256`, `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-ECDSA-CHACHA20-POLY1305`, `ECDHE-RSA-CHACHA20-POLY1305`

If you are customizing cipher suites via API, refer to [Steps and API examples](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/#steps-and-api-examples) for a snippet you can copy with the formatted array.

## FIPS-140-3

Recommended cipher suites for compliance with the [Federal Information Processing Standard (140-3) ↗](https://csrc.nist.gov/pubs/fips/140-3/final). Used to approve cryptographic modules.

Cipher suites list

`AES128-GCM-SHA256`, `AES128-SHA`, `AES128-SHA256`, `AES256-SHA`, `AES256-SHA256`, `DES-CBC3-SHA`, `ECDHE-ECDSA-AES128-GCM-SHA256`, `ECDHE-ECDSA-AES128-SHA`, `ECDHE-ECDSA-AES128-SHA256`, `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-ECDSA-AES256-SHA384`, `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-RSA-AES128-SHA`, `ECDHE-RSA-AES128-SHA256`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-SHA`, `ECDHE-RSA-AES256-SHA384`

If you are customizing cipher suites via API, refer to [Steps and API examples](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/#steps-and-api-examples) for a snippet you can copy with the formatted array.

## Footnotes

1. Same as `TLS_AES_128_GCM_SHA256`. Refer to [TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#tls-13) for details. [↩](#user-content-fnref-1)
2. Same as `TLS_AES_256_GCM_SHA384`. Refer to [TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#tls-13) for details. [↩](#user-content-fnref-2)
3. Same as `TLS_CHACHA20_POLY1305_SHA256`. Refer to [TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#tls-13) for details. [↩](#user-content-fnref-3)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/#page","headline":"Cipher suites compliance standards · Cloudflare SSL/TLS docs","description":"Cipher suite compliance with FIPS 140-3, PCI DSS, and other standards.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
```
