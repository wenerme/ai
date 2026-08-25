---
description: Synchronize clocks using Cloudflare's NTP service.
title: Network Time Protocol
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/time-services/llms.txt
> Use this file to discover all available pages before exploring further.

# Network Time Protocol

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/time-services/ntp/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Network Time Protocol ↗](https://tools.ietf.org/html/rfc1305) (NTP) is an Internet protocol designed to synchronize time between computer systems communicating over unreliable and variable-latency network paths. Cloudflare offers its version of NTP for free so you can use our [global anycast network ↗](https://www.cloudflare.com/network/) to synchronize time from our closest server.

## Background

NTP works by having a client send a query packet out to an NTP server that then responds with its clock time. The client then computes an estimate of the difference between its clock and the remote clock and attempts to compensate for any network delay. The NTP client then queries multiple servers and implements algorithms to select the best estimate.

Cloudflare does not implement leap smearing: NTP includes a Leap Indicator field [spec ↗](https://tools.ietf.org/html/rfc5905#section-7.3) and the kernel will apply the leap second correction at the appropriate time. This is the behavior servers in `pool.ntp.org` share. Using servers that smear time along with servers that do not may lead to unpredictable and anomalous results.

## Next steps

For more background information about NTP, refer to the [introductory blog ↗](https://blog.cloudflare.com/secure-time/).

To enable NTP on your device, refer to our [Usage guide](https://developers.cloudflare.com/time-services/ntp/usage/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/time-services/ntp/#page","headline":"Network Time Protocol · Cloudflare Time Services docs","description":"Synchronize clocks using Cloudflare's NTP service.","url":"https://developers.cloudflare.com/time-services/ntp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
