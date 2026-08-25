---
description: Configure cache-control settings for Cloudflare Images at the account or variant level.
title: Browser TTL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Browser TTL

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/optimization/hosted-images/browser-ttl/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Browser TTL controls how long an image stays in a browser's cache and specifically configures the `cache-control` response header.

### Default TTL

By default, an image's TTL is set to two days to meet user needs, such as re-uploading an image under the same [Custom ID](https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/).

## Custom setting

You can use two custom settings to control the Browser TTL, an account or a named variant. To adjust how long a browser should keep an image in the cache, set the TTL in seconds, similar to how the `max-age` header is set. The value should be an interval between one hour to one year.

### Browser TTL for an account

Setting the Browser TTL per account overrides the default TTL.

```bash
curl --request PATCH 'https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/config' \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "browser_ttl": 31536000
}'
```

When the Browser TTL is set to one year for all images, the response for the `cache-control` header is essentially `public`, `max-age=31536000`, `stale-while-revalidate=7200`.

### Browser TTL for a named variant

Setting the Browser TTL for a named variant is a more granular option that overrides all of the above when creating or updating an image variant, specifically the `browser_ttl` option in seconds.

```bash
curl 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_TAG>/images/v1/variants' \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "id":"avatar",
  "options": {
    "width":100,
    "browser_ttl": 86400
  }
}'
```

When the Browser TTL is set to one day for images requested with this variant, the response for the `cache-control` header is essentially `public`, `max-age=86400`, `stale-while-revalidate=7200`.

Note

[Private images](https://developers.cloudflare.com/images/optimization/hosted-images/serve-private-images/) do not respect default or custom TTL settings. The private images cache time is set according to the expiration time and can be as short as one hour.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/hosted-images/browser-ttl/#page","headline":"Browser TTL · Cloudflare Images docs","description":"Configure cache-control settings for Cloudflare Images at the account or variant level.","url":"https://developers.cloudflare.com/images/optimization/hosted-images/browser-ttl/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
