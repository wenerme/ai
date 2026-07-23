---
description: Privacy Gateway is a managed Oblivious HTTP (OHTTP) relay service that hides client IP addresses from application backends.
title: Cloudflare Privacy Gateway
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/privacy-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Privacy Gateway

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/privacy-gateway/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Implements the Oblivious HTTP IETF standard to improve client privacy.

Enterprise-only

[Privacy Gateway ↗](https://blog.cloudflare.com/building-privacy-into-internet-standards-and-how-to-make-your-app-more-private-today/) is a managed service deployed on Cloudflare’s global network that implements part of the [Oblivious HTTP (OHTTP) IETF ↗](https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html) standard. The goal of Privacy Gateway and Oblivious HTTP is to hide the client's IP address when interacting with an application backend.

OHTTP introduces a trusted third party between client and server, called a relay, whose purpose is to forward encrypted requests and responses between client and server. These messages are encrypted between client and server such that the relay learns nothing of the application data, beyond the length of the encrypted message and the server the client is interacting with.

---

## Availability

Privacy Gateway is currently in closed beta – available to select privacy-oriented companies and partners. If you are interested, [contact us ↗](https://www.cloudflare.com/lp/privacy-edge/).

---

## Features

[Get started](https://developers.cloudflare.com/privacy-gateway/get-started/)

Learn how to set up Privacy Gateway for your application.

Get started

[Legal](https://developers.cloudflare.com/privacy-gateway/reference/legal/)

Learn about the different parties and data shared in Privacy Gateway.

Learn more

[Metrics](https://developers.cloudflare.com/privacy-gateway/reference/metrics/)

Learn about how to query Privacy Gateway metrics.

Learn more

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/privacy-gateway/#page","headline":"Overview · Cloudflare Privacy Gateway docs","description":"Privacy Gateway is a managed Oblivious HTTP (OHTTP) relay service that hides client IP addresses from application backends.","url":"https://developers.cloudflare.com/privacy-gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
