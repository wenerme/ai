---
description: Verify paid requests and report variable settlements.
title: Payment validation
image: https://developers.cloudflare.com/monetization-gateway/configuration/payment-validation/og.png?v=d0d090985e3607f0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/monetization-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Payment validation

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/monetization-gateway/configuration/payment-validation/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Your origin receives payment authorization in the `PAYMENT-CONTEXT` header. Validate this context before serving paid content.

## Validate the context

The header contains a JSON Web Token (JWT). Validate it with a recommended JWT library.

Use only the [pinned JSON Web Key Set (JWKS) ↗︎](https://payments.cloudflare.com/certs). Require Ed25519 signatures, and cache keys according to the endpoint's `Cache-Control` header.

Do not parse the token without verifying its signature. Reject requests when JWT validation fails.

Recommended libraries include:

| Language | Library |
| --- | --- |
| JavaScript, TypeScript, and [Cloudflare Workers](https://developers.cloudflare.com/workers/) | `jose` |
| Python | `PyJWT` with `cryptography` |
| Java | Nimbus JOSE + JWT |
| Go | `github.com/golang-jwt/jwt/v5` |
| Rust | `jsonwebtoken` |

Caution

If `PAYMENT-CONTEXT` is absent, treat the request as unpaid and unverified. Do not serve paid content or set `PAYMENT-SETTLEMENT`.

## Read fixed claims

Fixed pricing uses the x402 `exact` scheme. The following decoded example authorizes 25,000 atomic units for one audience:

```json
{
	"iat": 1770000000,
	"nbf": 1770000000,
	"exp": 1770000120,
	"aud": "https://api.example.com/premium-data",
	"scheme": "exact",
	"amount": "25000"
}
```

Do not set `PAYMENT-SETTLEMENT` for fixed pricing. Monetization Gateway settles the signed amount.

## Read variable claims

Variable pricing uses the x402 `upto` scheme. The `amount` claim contains the authorized maximum.

The following decoded example authorizes up to 100,000 atomic units:

```json
{
	"iat": 1770000000,
	"nbf": 1770000000,
	"exp": 1770000120,
	"aud": "https://api.example.com/generate",
	"scheme": "upto",
	"amount": "100000"
}
```

Calculate an actual amount where `0 <= actual <= authorized maximum`. Express the amount in atomic units.

If the actual amount exceeds the authorized maximum, Monetization Gateway settles the authorized maximum instead. Nothing will be settled if the specified amount is zero.

## Report variable settlement

Set `PAYMENT-SETTLEMENT` only for a successful `upto` response. Set it before sending response headers.

Use a JSON value containing the actual amount as a string. This standalone example reports 1,000,000 atomic units:

```json
{ "amount": "1000000" }
```

Do not set `PAYMENT-SETTLEMENT` when the response status is `400` or greater. Do not create a `PAYMENT-RESPONSE` header.

Monetization Gateway creates the payment receipt after settlement. It removes `PAYMENT-SETTLEMENT` from the response sent to the buyer.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/monetization-gateway/configuration/payment-validation/#page","headline":"Payment validation","description":"Verify paid requests and report variable settlements.","url":"https://developers.cloudflare.com/monetization-gateway/configuration/payment-validation/","inLanguage":"en","image":"https://developers.cloudflare.com/monetization-gateway/configuration/payment-validation/og.png?v=d0d090985e3607f0","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
