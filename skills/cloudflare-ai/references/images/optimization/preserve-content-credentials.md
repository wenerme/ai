---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Preserve existing Content Credentials and append signed optimization actions when Images processes remote or hosted images.
title: Preserve Content Credentials
image: https://developers.cloudflare.com/images/optimization/preserve-content-credentials/og.png?v=9d8e3cb651a51091
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Preserve Content Credentials

[Content Credentials ↗︎](https://contentcredentials.org/) use the Coalition for Content Provenance and Authenticity (C2PA) standard to provide cryptographically signed information about an image's origin and edit history.

You configure Content Credentials preservation separately for remote and hosted images:

| Image source | Setting scope |
| --- | --- |
| Remote images (transformations) | Each zone that serves image transformations |
| Hosted images | Each Cloudflare account |

When preservation is disabled, Images omits Content Credentials from the re-encoded output and does not sign optimization actions.

When preservation is enabled, use the [`metadata`](https://developers.cloudflare.com/images/optimization/features/#metadata) parameter to control whether Images preserves existing Content Credentials and appends cryptographically signed [optimization actions](https://developers.cloudflare.com/images/optimization/features/).

If the source image does not contain Content Credentials, then Images does not create them or append signed optimization actions. When Images returns the source image unchanged, its original Content Credentials remain embedded.

To inspect the resulting provenance chain, use the [Content Credentials verification service ↗︎](https://contentcredentials.org/verify).

## Turn on for remote images

### Use the cf CLI

With the [Cloudflare CLI](https://developers.cloudflare.com/cf/) (`cf`) installed and authenticated, turn on Content Credentials preservation for a zone:

```sh
cf zones transformations-c2pa edit --zone example.com --value on
```

The `--zone` flag accepts a zone ID or domain name. To turn the setting off, use `--value off`.

### Use the API

[Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the [Zone Settings Write permission](https://developers.cloudflare.com/fundamentals/api/reference/permissions/#zone-permissions) for the zone.

Use the [Change Image Transformations C2PA setting](https://developers.cloudflare.com/api/resources/zones/subresources/transformations_c2pa/methods/edit/) endpoint:

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/transformations_c2pa" \
  --request PATCH \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"value":"on"}'
```

To turn off Content Credentials preservation, set `value` to `off`.

### Use the dashboard

1. In the Cloudflare dashboard, go to **Images** > **Transformations**. [Go to **Transformations** ↗](https://dash.cloudflare.com/?to=/:account/images/transformations)
2. Select the zone that serves your transformations.
3. Turn on **Preserve Content Credentials**.![Preserve Content Credentials setting for an Images transformation zone](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1632,height=350,format=webp/_astro/preserve-content-credentials.BDptgOn0.png)

## Turn on for hosted images

For hosted images, Content Credentials preservation is an account-wide setting. It applies to every image delivered through `imagedelivery.net` or a custom domain configured for your Images account.

### Dashboard

1. In the Cloudflare dashboard, go to **Images** > **Hosted Images**. [Go to **Hosted images** ↗](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select **Delivery**.
3. Turn on **Preserve Content Credentials**.

### REST API

Use the [Images config ↗︎](https://developers.cloudflare.com/api/resources/images/) endpoint to set `preserve_content_credentials`:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/config" \
  --request PATCH \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"preserve_content_credentials": true}'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/preserve-content-credentials/#page","headline":"Preserve Content Credentials","description":"Preserve existing Content Credentials and append signed optimization actions when Images processes remote or hosted images.","url":"https://developers.cloudflare.com/images/optimization/preserve-content-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/images/optimization/preserve-content-credentials/og.png?v=9d8e3cb651a51091","dateModified":"2026-11-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
