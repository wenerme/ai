---
description: Control cache access using WAF custom rules and Snippets.
title: Control cache access with WAF and Snippets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Control cache access with WAF and Snippets

Last updated May 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/interaction-cloudflare-products/waf-snippets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you make an R2 bucket publicly accessible for caching (via a [Custom Domain](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains)), anyone who knows the URL can access the content. To restrict access, you can use Cloudflare's [WAF](https://developers.cloudflare.com/waf/custom-rules/use-cases/configure-token-authentication/) to validate requests before they reach the cache or your bucket.

The following diagram illustrates the flow of a request through WAF, Cache, and R2\. WAF custom rules run before cache rules in the [request pipeline](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/), so invalid requests are blocked before consuming cache resources.

flowchart LR
accTitle: Connections with Cloudflare
A[User's request] --> B[WAF] --> C[Cache] --> D[R2]


## Presigned URLs

A presigned URL is a regular URL with a cryptographic token appended to it. The token contains a hash-based message authentication code (HMAC) computed from the URL path, a timestamp, and a secret key shared between the signing service and the validator. Anyone with the URL can access the content until the token expires, but the token cannot be reused for a different URL path.

You can presign URLs similar to [S3 ↗](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html), enabling you to share direct access to your content with an associated timeout. This approach can be implemented using a combination of Snippets, Rules, or Cloudflare Workers.

For optimal performance, we recommend separating the creation and validation processes:

* [Snippets](https://developers.cloudflare.com/rules/snippets/examples/signing-requests/) for HMAC creation (signing the URL)
* [WAF custom rules](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#hmac-validation) for HMAC validation (verifying the token on each request)

In the Workers documentation, the [Signing requests](https://developers.cloudflare.com/workers/examples/signing-requests/) example shows how to both generate and verify signed requests using HMAC. The Workers implementation is compatible with the WAF's [is\_timed\_hmac\_valid\_v0() validation function](https://developers.cloudflare.com/waf/custom-rules/use-cases/configure-token-authentication/), so you can sign with Workers and validate with WAF custom rules, or handle both in Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/interaction-cloudflare-products/waf-snippets/#page","headline":"Control cache access with WAF and Snippets · Cloudflare Cache (CDN) docs","description":"Control cache access using WAF custom rules and Snippets.","url":"https://developers.cloudflare.com/cache/interaction-cloudflare-products/waf-snippets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["S3"]}
```
