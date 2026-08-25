---
description: How the IETF MoQ working group developed a standardized protocol for efficient, low-latency media delivery over QUIC.
title: Background
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/moq/llms.txt
> Use this file to discover all available pages before exploring further.

# Background

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/moq/about/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Over the years, efficient delivery of live media content has attracted significant interest from the networking and media streaming community. Many applications, including live streaming platforms, real-time communication systems, gaming, and interactive media experiences, require low-latency media delivery. However, it remained a major challenge to deliver media content in a scalable, efficient, and robust way over the internet. Currently, most solutions rely on proprietary protocols or repurpose existing protocols like HTTP/2 or WebRTC that weren't specifically designed for media streaming use cases.

Realizing this gap, the IETF Media Over QUIC (MoQ) working group was formed to develop a standardized protocol for media delivery over QUIC transport. The working group brings together expertise from major technology companies, content delivery networks, and academic institutions to create a modern solution for media streaming.

The MoQ protocol leverages QUIC's advanced features such as multiplexing, connection migration, and built-in security to provide an efficient foundation for media delivery. Unlike traditional HTTP-based streaming that treats media as regular web content, MoQ is specifically designed to understand media semantics and optimize delivery accordingly.

Key benefits of MoQ include:

* **Low latency**: QUIC's 0-RTT connection establishment and reduced head-of-line blocking
* **Adaptive streaming**: Native support for different media qualities and bitrates
* **Reliability**: QUIC's connection migration and loss recovery mechanisms
* **Security**: Built-in encryption and authentication through QUIC
* **Efficiency**: Protocol designed specifically for media delivery patterns

The protocol addresses common challenges in live streaming such as handling network congestion, adapting to varying bandwidth conditions, and maintaining synchronization between audio and video streams. MoQ represents a significant step forward in standardizing media delivery for the modern internet.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/moq/about/#page","headline":"Background · Cloudflare MoQ docs","description":"How the IETF MoQ working group developed a standardized protocol for efficient, low-latency media delivery over QUIC.","url":"https://developers.cloudflare.com/moq/about/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
