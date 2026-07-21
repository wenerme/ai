---
description: Authenticated Origin Pulls helps ensure requests to your origin server come from the Cloudflare network.
title: Authenticated Origin Pulls (mTLS)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

#  Authenticated Origin Pulls (mTLS)

Last updated Jun 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Authenticated Origin Pulls (AOP) helps ensure requests to your origin server come from the Cloudflare network, which provides an additional layer of security on top of [Full](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or [Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes.

Check your encryption mode

Authenticated Origin Pulls does not apply when your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) is set to **Off** or **Flexible**.

Without AOP, anyone who discovers your origin server's IP address can send requests directly, bypassing Cloudflare and all its protections. When you combine AOP with the [Cloudflare Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/), your origin only accepts requests that have passed through Cloudflare, which means every request is evaluated by the WAF before reaching your server.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## Configuration levels

AOP has three independent configuration levels. Each uses its own certificate and enablement setting, and each requires configuration on your origin server. Refer to the specific setup guides for details.

* [Global](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/): Uses a Cloudflare-provided certificate that is shared across all Cloudflare accounts. Applies to all proxied traffic on the zone. This is the simplest setup but only guarantees that a request is coming from the Cloudflare network.
* [Zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/): Uses a certificate that you upload. Applies to all proxied traffic on the zone. Provides stricter security because the certificate is exclusive to your account. Zone-level certificates take precedence over global certificates.
* [Per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/): Uses a certificate that you upload, applied to specific hostnames. Per-hostname certificates take precedence over zone-level and global certificates for the specified hostname.

Note

[Global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/), [zone-level AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/), and [per-hostname AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) are three independent configurations. Enabling or disabling one does not affect the others.

## When to use your own certificate

Global AOP uses a Cloudflare-provided certificate shared across all accounts, so it only proves a request came from the Cloudflare network — not from your account specifically. If you need to guarantee requests come from your account, set up [zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) or [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) AOP with your own certificate.

Using your own certificate is also required for [FIPS ↗](https://en.wikipedia.org/wiki/Federal%5FInformation%5FProcessing%5FStandards) compliance. For broader origin protection guidance, refer to [Protect your origin server](https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/).

## Post-quantum certificates

Zone-level and per-hostname AOP support ML-DSA (FIPS 204) post-quantum client certificates. Refer to [Post-quantum signatures](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-to-origin/#post-quantum-signatures) for certificate generation and upload guidance.

## Related topics

* [SSL/TLS Encryption Modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/)
* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/#page","headline":"Authenticated Origin Pulls (mTLS) · Cloudflare SSL/TLS docs","description":"Authenticated Origin Pulls helps ensure requests to your origin server come from the Cloudflare network.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
```
