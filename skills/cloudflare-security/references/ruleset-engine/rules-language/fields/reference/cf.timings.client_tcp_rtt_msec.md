---
description: The smoothed TCP round-trip time (RTT) between Cloudflare and the client in milliseconds.
title: cf.timings.client_tcp_rtt_msec
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.timings.client\_tcp\_rtt\_msec

`cf.timings.client_tcp_rtt_msec` ` Number `

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

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.client_tcp_rtt_msec/#page","headline":"cf.timings.client_tcp_rtt_msec · Cloudflare Ruleset Engine docs","description":"The smoothed TCP round-trip time (RTT) between Cloudflare and the client in milliseconds.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.client_tcp_rtt_msec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
