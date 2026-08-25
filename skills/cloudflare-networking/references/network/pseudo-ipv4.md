---
description: Map IPv6 addresses to IPv4 for legacy origin servers.
title: Pseudo IPv4
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network/llms.txt
> Use this file to discover all available pages before exploring further.

# Pseudo IPv4

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network/pseudo-ipv4/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare customers can use **Pseudo IPv4** if their origin web server only understands IPv4 formatted IP addresses (meaning it would not support Cloudflare's default [IPv6 compatibility](https://developers.cloudflare.com/network/ipv6-compatibility/)).

Note

To allow IPv6-only clients to connect to IPv4-only origin web servers, keep [IPv6 compatibility](https://developers.cloudflare.com/network/ipv6-compatibility/) enabled and configure Pseudo IPv4.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## Background

Some older origin server analytics and fraud detection software expect IP addresses in an IPv4 format and do not support IPv6 addresses.

**Pseudo IPv4** uses the [Class E IPv4 address space ↗](https://tools.ietf.org/html/rfc1112#section-4) to provide as many unique IPv4 addresses corresponding to IPv6 addresses as possible.

* Example Class E IPv4 address: `240.16.0.1`
* Example IPv6 address: `2400:cb00:f00d:dead:beef:1111:2222:3333`

Note

Class E IPv4 addresses are designated as experimental and are not used for production Internet traffic.

## Configure Pseudo IPv4

Cloudflare offers three options for configuring **Pseudo IPv4**:

* **Off**: Default value.
* **Add Header**: Cloudflare automatically adds the `Cf-Pseudo-IPv4` header with a Class E IPv4 address hashed from the original IPv6 address.
* **Overwrite Headers**:
If **Pseudo IPv4** is set to `Overwrite Headers` \- Cloudflare overwrites the existing `Cf-Connecting-IP` and `X-Forwarded-For` headers with a pseudo IPv4 address while preserving the real IPv6 address in `CF-Connecting-IPv6` header.

Note

When using _Overwrite Headers_, no software changes are necessary in your origin web server.

To configure **Pseudo IPv4**:

To change the **Pseudo IPv4** setting in the dashboard:

1. In the Cloudflare dashboard, go to the **Network** page.
[Go to **Network** ↗](https://dash.cloudflare.com/?to=/:account/:zone/network)
2. For **Pseudo IPv4**, choose your desired setting.

To change **Pseudo IPv4** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `pseudo_ipv4` as the setting name in the URI path, and the `value` parameter set to your desired value: `"off"`, `"add_header"`, or `"overwrite_header"`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network/pseudo-ipv4/#page","headline":"Pseudo IPv4 · Cloudflare Network settings docs","description":"Map IPv6 addresses to IPv4 for legacy origin servers.","url":"https://developers.cloudflare.com/network/pseudo-ipv4/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
