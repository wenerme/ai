---
description: Authenticated time synchronization with Roughtime protocol.
title: Roughtime
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/time-services/llms.txt
> Use this file to discover all available pages before exploring further.

# Roughtime

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/time-services/roughtime/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Roughtime ↗](https://roughtime.googlesource.com/roughtime) is a simple, flexible, and secure authenticated time protocol developed by Google.

## Background

Endpoints on the Internet often synchronize their clocks using the [Network Time Protocol (NTP)](https://developers.cloudflare.com/time-services/ntp/). NTP provides precise synchronization, but is frequently deployed without a means of authentication. This is due to a [combination of issues ↗](https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/dowling).

As a result, a man-in-the-middle attacker can easily influence a victim’s clock. By moving them back in time, the attacker can, for example, force a victim to accept an expired (and possibly compromised) TLS certificate or session ticket.

For many applications, _precise_ network time is not essential. It is sufficient to have _accurate_ time to mitigate these kinds of attacks, such as within 10 seconds of real time. This observation is the primary motivation behind Roughtime.

## Next steps

For more technical details on Roughtime, refer to the [introductory blog post ↗](https://blog.cloudflare.com/roughtime/).

To get started, refer to [Get the Roughtime](https://developers.cloudflare.com/time-services/roughtime/usage/). For more practical guidance on using the Roughtime, refer to our [how-to guide](https://developers.cloudflare.com/time-services/roughtime/recipes/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/time-services/roughtime/#page","headline":"Roughtime · Cloudflare Time Services docs","description":"Authenticated time synchronization with Roughtime protocol.","url":"https://developers.cloudflare.com/time-services/roughtime/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
