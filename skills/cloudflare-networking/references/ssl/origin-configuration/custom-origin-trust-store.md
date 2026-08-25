---
description: Custom Origin Trust Store allows you to upload certificate authorities (CAs) that Cloudflare will use to authenticate connections to your origin server.
title: Custom Origin Trust Store
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Origin Trust Store

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/origin-configuration/custom-origin-trust-store/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

By default, Cloudflare's global network maintains [a list of publicly trusted certificate authorities ↗](https://github.com/cloudflare/cfssl%5Ftrust). This means that when using [Full (strict) encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/), Cloudflare will only trust origin server certificates issued by a CA included in this trust store.

Custom Origin Trust Store allows you to upload certificate authorities (CAs) that Cloudflare will use to authenticate connections to your origin server. Use this feature to override the default trust store with your preferred CA or CAs.


When a CA has been uploaded to Custom Origin Trust Store, Cloudflare will ignore all default publicly trusted CAs and exclusively use the CA or CAs that have been uploaded to authenticate the origin server.

## Availability

To get access to Custom Origin Trust Store, [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) must be enabled on the zone.

## Post-quantum certificate authorities

Custom Origin Trust Store accepts ML-DSA (FIPS 204) post-quantum certificate authorities. Refer to [Post-quantum signatures](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-to-origin/#post-quantum-signatures) for certificate generation and upload guidance.

## How to

To manage origin trust stores in the dashboard:

1. Go to the **Origin Server** page.
[Go to **Origin Server** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. Select the **Custom Origin Trust Store** tab.
3. Select **Upload trust store** to add a CA certificate, or use the table to manage existing trust stores.

To manage origin trust stores using the API, refer to the [API commands](#api-commands).

## Limitations

With [Full (strict) encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) enabled, if your uploaded CA expires and no alternative CAs are valid within the trust store, Cloudflare will not be able to properly authenticate connections to the origin server.

## API commands

#### List Custom Origin Trust Store Details

* API documentation: [List Custom Origin Trust Store Details](https://developers.cloudflare.com/api/resources/acm/subresources/custom%5Ftrust%5Fstore/methods/list/)
* Method: `GET`
* Endpoint: `/zones/$ZONE_ID/acm/custom_trust_store`

#### Custom Origin Trust Store Details

* API documentation: [Custom Origin Trust Store Details](https://developers.cloudflare.com/api/resources/acm/subresources/custom%5Ftrust%5Fstore/methods/get/)
* Method: `GET`
* Endpoint: `/zones/$ZONE_ID/acm/custom_trust_store/$CUSTOM_ORIGIN_TRUST_STORE_ID`
Note
The `$CUSTOM_ORIGIN_TRUST_STORE_ID` can be found via the [List command](#list-custom-origin-trust-store-details).

#### Upload Custom Origin Trust Store

* API documentation: [Upload Custom Origin Trust Store](https://developers.cloudflare.com/api/resources/acm/subresources/custom%5Ftrust%5Fstore/methods/create/)
* Method: `POST`
* Endpoint: `/zones/$ZONE_ID/acm/custom_trust_store`

#### Delete Custom Origin Trust Store

* API documentation: [Delete Custom Origin Trust Store](https://developers.cloudflare.com/api/resources/acm/subresources/custom%5Ftrust%5Fstore/methods/delete/)
* Method: `DELETE`
* Endpoint: `/zones/$ZONE_ID/acm/custom_trust_store/$CUSTOM_ORIGIN_TRUST_STORE_ID`
Note
The `$CUSTOM_ORIGIN_TRUST_STORE_ID` can be found via the [List command](#list-custom-origin-trust-store-details).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/custom-origin-trust-store/#page","headline":"Custom Origin Trust Store · Cloudflare SSL/TLS docs","description":"Custom Origin Trust Store allows you to upload certificate authorities (CAs) that Cloudflare will use to authenticate connections to your origin server.","url":"https://developers.cloudflare.com/ssl/origin-configuration/custom-origin-trust-store/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
