---
description: Track the latest updates and changes to Cloudflare 1.1.1.1 features.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

Last updated Jul 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/1.1.1.1/changelog/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/changelog/rss/1.1.1.1.xml)

## 2026-07-28


**Improved DoH JSON formatting for additional record types**

Cloudflare is rolling out updated formatting for the `data` field in the 1.1.1.1 [DoH JSON API](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/) (`application/dns-json`). During the roll out responses may use either the old or new format.

Note

These are breaking changes. The DoH JSON format has no formal RFC and its schema is not guaranteed to be stable. If you need a stable format, use the [DoH wireformat](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/) instead.

#### Human-readable display for additional record types

Several record types previously returned their `data` field in [RFC 3597 ↗](https://datatracker.ietf.org/doc/html/rfc3597) generic hex encoding (`\# <length> <hex>`). These now use standard presentation format:

```txt
CAA:        0 issue "letsencrypt.org"
NAPTR:      100 10 "s" "SIP+D2U" "" _sip._udp.example.com.
RP:         admin.example.com. txt.example.com.
IPSECKEY:   10 1 2 192.0.2.1 AwEA...
SVCB:       1 target.example.com. alpn=h2
HTTPS:      1 . alpn=h3,h2 ipv4hint=192.0.2.1
TLSA:       3 1 1 aabbccdd...
SSHFP:      1 2 aabbccdd...
OPENPGPKEY: AwEA...
```

#### Numeric DNSSEC algorithm identifiers

DNSSEC-related records now use numeric algorithm identifiers as defined in [RFC 4034 ↗](https://datatracker.ietf.org/doc/html/rfc4034) instead of mnemonic names. This affects `RRSIG`, `DS`, `CDS`, `DNSKEY`, and `CDNSKEY` records. For example, `RSASHA256` becomes `8`, `ECDSAP256SHA256` becomes `13`, and `ED25519` becomes `15`. DS digest types also change from mnemonic to numeric: `SHA-256` becomes `2`.

```txt
RRSIG:  A RSASHA256 2 300 ...
DS:     12345 RSASHA256 SHA-256 aabb...
DNSKEY: 257 3 RSASHA256 AwEA...
```

```txt
RRSIG:  A 8 2 300 ...
DS:     12345 8 2 aabb...
DNSKEY: 257 3 8 AwEA...
```

#### Other formatting changes

`HINFO` character-strings are now individually quoted to remove ambiguity when values contain spaces:

```txt
"data": "Intel Xeon Linux"
```

```txt
"data": "\"Intel Xeon\" \"Linux\""
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/1.1.1.1/changelog/#page","headline":"Changelog · Cloudflare 1.1.1.1 docs","description":"Track the latest updates and changes to Cloudflare 1.1.1.1 features.","url":"https://developers.cloudflare.com/1.1.1.1/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
