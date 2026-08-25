---
description: Retain C2PA metadata and provenance data on images delivered from Cloudflare Images.
title: Preserve Content Credentials
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Preserve Content Credentials

Last updated Jul 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/optimization/hosted-images/preserve-content-credentials/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Content Credentials ↗](https://contentcredentials.org/) (or C2PA metadata) are a type of metadata that includes the full provenance chain of a digital asset. This provides information about an image's creation, authorship, and editing flow. This data is cryptographically authenticated and can be verified using an [open-source verification service ↗](https://contentcredentials.org/verify).

You can preserve Content Credentials on images uploaded to and delivered from Cloudflare Images.

## Enable

Content Credentials preservation is an account-wide setting that applies to every image delivered from `imagedelivery.net` (and any custom domains configured for your Images account).

1. In the Cloudflare dashboard, go to the **Hosted Images** page.
[Go to **Hosted images** ↗](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select the **Delivery** tab.
3. Enable **Preserve Content Credentials**.

You can also enable it via the API by making a `PATCH` request to the [images config endpoint](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/variants/methods/edit/):

```bash
curl --request PATCH https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/config \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"preserve_content_credentials": true}'
```

The behavior of this setting is determined by the [metadata](https://developers.cloudflare.com/images/optimization/features/#metadata) parameter applied to each delivered image or variant.

For example, if a variant specifies `metadata=copyright` (the default), then the EXIF copyright tag and all Content Credentials will be preserved in the resulting image and all other metadata will be discarded.

When Content Credentials are preserved during delivery, Cloudflare will keep any existing Content Credentials embedded in the source image and automatically append and cryptographically sign additional actions describing the transformations it applied (such as resizing or format conversion).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/hosted-images/preserve-content-credentials/#page","headline":"Preserve Content Credentials · Cloudflare Images docs","description":"Retain C2PA metadata and provenance data on images delivered from Cloudflare Images.","url":"https://developers.cloudflare.com/images/optimization/hosted-images/preserve-content-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
