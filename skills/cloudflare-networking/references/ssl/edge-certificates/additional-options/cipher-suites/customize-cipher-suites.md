---
description: Restrict which cipher suites Cloudflare uses for edge connections.
title: Customize cipher suites
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

#  Customize cipher suites

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

With an [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) subscription, you can restrict connections between Cloudflare and clients — such as your visitor's browser — to specific [cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/).

You may want to do this to follow specific [recommendations](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/recommendations/), to [disable weak cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/troubleshooting/#ssl-labs-weak-ciphers-report), or to comply with [industry standards](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/).

Customizing cipher suites will not lead to any downtime in your SSL/TLS protection.

Cloudflare for SaaS

If you are a SaaS provider looking to restrict cipher suites for connections to [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/), this can be configured with a [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) subscription. Refer to [TLS management](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#cipher-suites) instead.

## How it works

Custom cipher suites is a hostname-level setting, which implies that:

* When you customize cipher suites for a zone, this will affect all hostnames within that zone. If you are not familiar with what a Cloudflare zone is, refer to [Fundamentals](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones).
* The configuration is applicable to all edge certificates used to connect to the hostname(s), regardless of the [certificate type](https://developers.cloudflare.com/ssl/edge-certificates/) (universal, advanced, or custom).
* If you need to use a per-hostname cipher suite customization, you must ensure that the hostname is specified on the certificate.

## Scope

Currently, you have the following options:

* Set custom cipher suites for a zone: either [via API](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/) or [on the dashboard](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/dashboard/).
* Set custom cipher suites per-hostname: only available [via API](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls/methods/update/). Refer to the [how-to](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/) for details.
* For guidance around custom hostnames, refer to [TLS settings - Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#cipher-suites).

Note

This documentation only refers to connections [between clients and the Cloudflare network](https://developers.cloudflare.com/ssl/concepts/#edge-certificate). For connections between Cloudflare and your origin server, refer to [Origin server > Cipher suites](https://developers.cloudflare.com/ssl/origin-configuration/cipher-suites/).

## Settings priority and ciphers order

Cloudflare uses the [hostname priority logic](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/) to determine which setting to apply.

ECDSA cipher suites are prioritized over RSA, and Cloudflare preserves the specified cipher suites in the order they are set. This means that, if both ECDSA and RSA are used, Cloudflare presents the ECDSA ciphers first - in the order they were set - and then the RSA ciphers, also in the order they were set.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/#page","headline":"Customize cipher suites · Cloudflare SSL/TLS docs","description":"Restrict which cipher suites Cloudflare uses for edge connections.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
```
