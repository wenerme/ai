---
title: Privacy Pass
description: Overview of entire document – what's in the docs, why Privacy Pass matters, high-level use case descriptions, and why customers can trust Cloudflare to run Privacy Pass infrastructure.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/privacy-pass/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Privacy Pass

Privacy Pass, an [IETF standard ↗](https://datatracker.ietf.org/doc/html/rfc9576) that Cloudflare helped pioneer in 2017, offers a way for users to prove something about themselves–that they have passed a CAPTCHA, are of age, are part of a subscription class–to the site they are accessing, without revealing an identifier. The main mechanic is Privacy Pass tokens, which are the cryptographic tool that lets a service provider verify information about a user without learning who that user is or being able to track them across requests.

---

## What's in these docs

* **[Getting started](https://developers.cloudflare.com/privacy-pass/getting-started/)** — two self-serve ways to see Privacy Pass work: get a real token with the demo tool, or run the issuance and redemption flow locally.
* **[Privacy Pass Protocol](https://developers.cloudflare.com/privacy-pass/concepts/privacy-pass-protocol/)** — the four roles, an architecture diagram, and the issuance and redemption flow.
* **[Deployment Models](https://developers.cloudflare.com/privacy-pass/concepts/deployment-models/)** — who operates each role, detailed example deployment models, and Privacy Pass as a part of other products.
* **[Production Deployment Testing](https://developers.cloudflare.com/privacy-pass/production-deployment-testing/)** — validate a real, Cloudflare-operated deployment end to end, once you and Cloudflare have built it together.
* **[References](https://developers.cloudflare.com/privacy-pass/references/)** — the external resources cited across these docs.

---

## Why it matters

Verifying users on the internet usually forces a trade-off between user experience and privacy, coming at the cost of either time spent solving CAPTCHAs or privacy lost to a trackable identifier. Privacy Pass eases that trade-off: a user proves a claim once, and receives tokens that can be redeemed later without revealing their identity or linking their activity.

So far, the main use cases have been providing a privacy-preserving CAPTCHA alternative, such as through [Turnstile](https://developers.cloudflare.com/turnstile/) and verification for Cloudflare's [Privacy Proxy](https://developers.cloudflare.com/privacy-proxy/) and [Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/) products. However, by adjusting the deployment, Privacy Pass tokens can attest to any other information a service provider wants to prove.

---

## Use cases

Every Privacy Pass use case comes down to the same idea: let clients prove something to an origin server without revealing any other information. Some examples include:

* **Authentication for other privacy products** – Privacy Pass can be used as a verification layer for other privacy products, such as Privacy Proxy and Privacy Gateway, to help them complete their functions while preserving the privacy of their users.
* **Privacy-preserving bot management** – Apple uses their token deployment, Private Access Tokens, to [automatically reduce CAPTCHAs ↗](https://blog.cloudflare.com/eliminating-captchas-on-iphones-and-macs-using-new-standard/) when using iOS 16+ devices on participating websites. Privacy Pass tokens are similarly [built into Turnstile ↗](https://blog.cloudflare.com/privacy-pass-standard/) as a signal in its application layer challenge decisions.
* **Attribute verification** – Privacy Pass can help attest to whether a user has a valid subscription to the service or meets age requirement without that service learning their identity or linking it to their activity.
* **Rate limiting**: While production use cases are still in development, Privacy Pass tokens can be used to meter usage without identifying users. See the [Batched Token issuance protocol ↗](https://datatracker.ietf.org/doc/draft-ietf-privacypass-batched-tokens/), [ARC issuance protocol ↗](https://datatracker.ietf.org/doc/draft-ietf-privacypass-arc-protocol/) and [Privacy Pass Reverse Flow ↗](https://datatracker.ietf.org/doc/draft-meunier-privacypass-reverse-flow/) IETF drafts.

---

## Why does Cloudflare operate Privacy Pass infrastructure?

* **Reliability and scale.** Issuers face high request volumes and must stay highly available so that user experience isn't affected by attacks or latency, something Cloudflare's global network is built to handle. Cloudflare is one of the few providers running Privacy Pass at scale.
* **Redemption at the edge.** Because Cloudflare sits in front of many origins, it can verify tokens at the edge on the Origin's behalf. Furthermore, Cloudflare Workers natively supports redemption, offering additional infrastructure to ease Privacy Pass integration.
* **A shared public issuer.** Rather than building and maintaining your own issuer, you can rely on Cloudflare's public, RFC 9578-compliant issuer deployments. We follow Privacy Pass guidelines and adhere to public, auditable commitments you can trust.

---

## Related products

**[Privacy Proxy](https://developers.cloudflare.com/privacy-proxy/)**

A MASQUE-based forward proxy that uses Privacy Pass tokens to authenticate users without revealing their identity.

**[Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/)**

Implements the Oblivious HTTP (OHTTP) standard for request-level privacy, hiding client IP addresses from application backends with Privacy Pass authentication.

**[Turnstile](https://developers.cloudflare.com/turnstile/)**

Cloudflare's smart CAPTCHA alternative that can be embedded into any website, using Privacy Pass tokens as one of the signals used to decide whether or not a challenge is shown to a visitor.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/privacy-pass/#page","headline":"Privacy Pass · Cloudflare Privacy Pass docs","description":"Overview of entire document – what's in the docs, why Privacy Pass matters, high-level use case descriptions, and why customers can trust Cloudflare to run Privacy Pass infrastructure.","url":"https://developers.cloudflare.com/privacy-pass/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-pass/","name":"Privacy Pass"}}]}
```
