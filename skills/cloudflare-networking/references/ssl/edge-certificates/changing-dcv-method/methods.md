---
description: Review different methods to perform Domain Control Validation when using Cloudflare SSL/TLS.
title: Methods
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Methods

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Before a certificate authority (CA) will issue a certificate for a domain, the requester must prove they have control over that domain. This process is known as domain control validation (DCV).

## Perform DCV

For details on each method available for DCV, refer to the following resources:

* [Delegated](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/)
* [TXT](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/txt/)
* [HTTP](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/http/)

Note

For guidance on when you need to perform DCV, refer to [Domain Control Validation](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/).

---

## Verify DCV status

To verify the [DCV status](https://developers.cloudflare.com/ssl/reference/certificate-statuses/) of a certificate, either monitor the certificate's status on the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page or use the [Verification Status endpoint](https://developers.cloudflare.com/api/resources/ssl/subresources/verification/methods/get/).

A status of `active` means that the certificate has been deployed to Cloudflare’s global network and will be served as soon as HTTP traffic is proxied to Cloudflare.

## Update DCV methods

You cannot update the DCV method for an active certificate. To update the DCV method for a subdomain, wait until the DCV expires and then change the DCV method.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/#page","headline":"Methods — Domain Control Validation · Cloudflare SSL/TLS docs","description":"Review different methods to perform Domain Control Validation when using Cloudflare SSL/TLS.","url":"https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
