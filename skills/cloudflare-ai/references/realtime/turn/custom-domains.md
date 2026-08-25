---
description: Use custom domains with Cloudflare Realtime TURN via CNAME DNS records.
title: Custom TURN domains
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom TURN domains

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/turn/custom-domains/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Realtime TURN service supports using custom domains for UDP, and TCP - but not TLS protocols. Custom domains do not affect any of the performance of Cloudflare Realtime TURN and is set up via a simple CNAME DNS record on your domain.

| Protocol      | Custom domains | Primary port | Alternate port |
| ------------- | -------------- | ------------ | -------------- |
| STUN over UDP | ✅              | 3478/udp     | 53/udp         |
| TURN over UDP | ✅              | 3478/udp     | 53 udp         |
| TURN over TCP | ✅              | 3478/tcp     | 80/tcp         |
| TURN over TLS | No             | 5349/tcp     | 443/tcp        |

## Setting up a CNAME record

To use custom domains for TURN, you must create a CNAME DNS record pointing to `turn.cloudflare.com`.

Caution

Do not resolve the address of `turn.cloudflare.com` or `stun.cloudflare.com` or use an IP address as the value you input to your DNS record. Only CNAME records are supported.

Any DNS provider, including Cloudflare DNS can be used to set up a CNAME for custom domains.

Note

If Cloudflare's authoritative DNS service is used, the record must be set to [DNS-only or "grey cloud" mode](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records).\`

There is no additional charge to using a custom hostname with Cloudflare Realtime TURN.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/turn/custom-domains/#page","headline":"Custom TURN domains · Cloudflare Realtime docs","description":"Use custom domains with Cloudflare Realtime TURN via CNAME DNS records.","url":"https://developers.cloudflare.com/realtime/turn/custom-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
