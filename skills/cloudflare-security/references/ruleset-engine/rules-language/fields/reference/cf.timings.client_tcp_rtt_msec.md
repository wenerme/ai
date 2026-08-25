---
description: The smoothed TCP round-trip time (RTT) between Cloudflare and the client in milliseconds.
title: cf.timings.client_tcp_rtt_msec
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.timings.client\_tcp\_rtt\_msec

`cf.timings.client_tcp_rtt_msec` `Number`

The smoothed TCP round-trip time (RTT) between Cloudflare and the client in milliseconds.

This field is only populated for TCP (HTTP/1, HTTP/2) connections. For QUIC connections, the value is `0`.

Example value:

```txt
20
```

Example usage:

```txt
# Match requests over TCP where the RTT exceeds 200 ms
cf.timings.client_quic_rtt_msec > 200
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.client_tcp_rtt_msec/#page","headline":"cf.timings.client_tcp_rtt_msec · Cloudflare Ruleset Engine docs","description":"The smoothed TCP round-trip time (RTT) between Cloudflare and the client in milliseconds.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.client_tcp_rtt_msec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
