---
description: Upload your own TLS certificates for custom hostnames that require custom key material.
title: Custom certificates
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom certificates

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If your customers need to provide their own key material, you may want to [upload a custom certificate](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/uploading-certificates/). Cloudflare will automatically bundle the certificate with a certificate chain [optimized for maximum browser compatibility](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/bundling-methodologies/#compatible).

As part of this process, you may also want to [generate a Certificate Signing Request (CSR)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/certificate-signing-requests/) for your customer so they do not have to manage the private key on their own.

Note

Only certain customers have access to this feature. For more details, see the [Plans page](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/).

## Use cases

This situation commonly occurs when your customers use Extended Validation (EV) certificates (the “green bar”) or when their information security policy prohibits third parties from generating private keys on their behalf.

## Limitations

If you use custom certificates, you are responsible for the entire certificate lifecycle (initial upload, renewal, subsequent upload).

Cloudflare also only accepts publicly trusted certificates of these types:

* `SHA256WithRSA`
* `SHA1WithRSA`
* `ECDSAWithSHA256`

If you attempt to upload another type of certificate or a certificate that has been self-signed, it will be rejected.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/#page","headline":"Custom certificates · Cloudflare for Platforms docs","description":"Upload your own TLS certificates for custom hostnames that require custom key material.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
```
