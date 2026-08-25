---
description: Query epoch digests, audit proofs, and publication constraints.
title: Epochs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/key-transparency/llms.txt
> Use this file to discover all available pages before exploring further.

# Epochs

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/key-transparency/api/epochs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Get an epoch

```sh
curl 'https://plexi.key-transparency.cloudflare.com/namespaces/{namespace}/audits/1'
{
  "namespace": "your.new.log.com",
  "timestamp": 1717084639921,
  "epoch": 1,
  "digest": "1111111111111111111111111111111111111111111111111111111111111111",
  "signature": "f6a51443bb6703813b330959d9d97471bc06464142165e59733fa102a18b052782a5307d59c31b8b13c1af7dfff6f6e7bf44e880d44e26e96c50a72f72a30c07"
}
```

## Publish a new epoch

Refer to the example below to publish a new epoch by requesting its signature.

This API is authenticated via [mTLS ↗](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/), so that only a Log owner can publish new epochs.

```sh
curl 'https://plexi.key-transparency.cloudflare.com/namespaces/{namespace}/audits' \
      --header 'Content-Type: application/json' \
      --data '{"epoch": 1, "digest": "1111111111111111111111111111111111111111111111111111111111111111"}'
{
  "namespace": "your.new.log.com",
  "timestamp": 1717084639921,
  "epoch": 1,
  "digest": "1111111111111111111111111111111111111111111111111111111111111111",
  "signature": "f6a51443bb6703813b330959d9d97471bc06464142165e59733fa102a18b052782a5307d59c31b8b13c1af7dfff6f6e7bf44e880d44e26e96c50a72f72a30c07",
  "key_id": 74,
}
```

### Constraints

* If `root` is defined for the namespace, the first epoch must match it (number and digest).
* Epochs must be increasing. Second epoch is 2, third is 3, etc.
* Epochs must have a unique digest or it will be rejected.
* Epochs cannot be republished.
* Digest must be a 32 byte string hex encoded (length 64).

If a namespace is disabled, you receive the following error:

```txt
HTTP 400 Bad Request
Namespace is disabled and read-only.
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/key-transparency/api/epochs/#page","headline":"Epochs · Cloudflare Key Transparency Auditor docs","description":"Query epoch digests, audit proofs, and publication constraints.","url":"https://developers.cloudflare.com/key-transparency/api/epochs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API","mTLS"]}
```
