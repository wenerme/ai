---
description: Retain C2PA metadata and provenance data when transforming remote images with Cloudflare Images.
title: Preserve Content Credentials
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Preserve Content Credentials

Last updated May 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/optimization/transformations/preserve-content-credentials/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Content Credentials ↗](https://contentcredentials.org/) (or C2PA metadata) are a type of metadata that includes the full provenance chain of a digital asset. This provides information about an image's creation, authorship, and editing flow. This data is cryptographically authenticated and can be verified using an [open-source verification service ↗](https://contentcredentials.org/verify).

You can preserve Content Credentials when optimizing images stored in remote sources.

## Enable

You can configure how Content Credentials are handled for each zone where transformations are served.

In the Cloudflare dashboard under **Images** \> **Transformations**, navigate to a specific zone and enable the toggle to preserve Content Credentials:

![Enable Preserving Content Credentials in the dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1632,height=350,format=webp/_astro/preserve-content-credentials.BDptgOn0.png)

The behavior of this setting is determined by the [metadata](https://developers.cloudflare.com/images/optimization/features/#metadata) parameter for each transformation.

For example, if a transformation specifies `metadata=copyright`, then the EXIF copyright tag and all Content Credentials will be preserved in the resulting image and all other metadata will be discarded.

When Content Credentials are preserved in a transformation, Cloudflare will keep any existing Content Credentials embedded in the source image and automatically append and cryptographically sign additional actions.

When this setting is disabled, any existing Content Credentials will always be discarded.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/transformations/preserve-content-credentials/#page","headline":"Preserve Content Credentials · Cloudflare Images docs","description":"Retain C2PA metadata and provenance data when transforming remote images with Cloudflare Images.","url":"https://developers.cloudflare.com/images/optimization/transformations/preserve-content-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
