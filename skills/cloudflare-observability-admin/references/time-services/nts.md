---
description: Secure time synchronization with NTS protocol.
title: Network Time Security
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/time-services/llms.txt
> Use this file to discover all available pages before exploring further.

#  Network Time Security

Last updated Apr 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/time-services/nts/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[Network Time Security ↗](https://datatracker.ietf.org/doc/html/rfc8915) (NTS) provides cryptographic security for the client-server mode of the Network Time Protocol (NTP). This allows users to obtain time in an authenticated manner.

## Background

The NTS protocol is divided into two phases:

1. **NTS Key Exchange**: Establishes the necessary key material between the NTP client and the server, using a [Transport Layer Security (TLS) handshake ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) (the same public key infrastructure as the web). Once the keys are exchanged, the TLS channel is closed and the protocol enters the second phase.
2. **NTS Extension Fields for NTPv4**: Authenticates NTP time synchronization packets using previously established key material. For more information, refer to [RFC 8915 ↗](https://tools.ietf.org/html/rfc8915).

## Next steps

NTS is gaining support in many NTP implementations, including [Chrony ↗](https://chrony-project.org/documentation.html), [NTPsec ↗](https://www.ntpsec.org/), and [ntpd-rs ↗](https://github.com/pendulum-project/ntpd-rs). Read the relevant documentation for guidance on setting them up to point to our time service, `time.cloudflare.com`. Also see [Netnod's documentation ↗](https://www.netnod.se/netnod-time/how-to-use-nts) for configuring NTS clients.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/time-services/nts/#page","headline":"Network Time Security · Cloudflare Time Services docs","description":"Secure time synchronization with NTS protocol.","url":"https://developers.cloudflare.com/time-services/nts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
